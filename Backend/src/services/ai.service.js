const { GoogleGenAI } = require("@google/genai")
const puppeteer = require("puppeteer")

const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY

const ai = new GoogleGenAI({
    apiKey: apiKey
})

// Priority order: gemini-3.5-flash-lite -> gemini-3.1-flash-lite -> gemini-2.5-flash
const CANDIDATE_MODELS = [
    process.env.GEMINI_MODEL,
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash"
].filter(Boolean)

const UNIQUE_MODELS = [...new Set(CANDIDATE_MODELS)]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function cleanAndParseJSON(rawText) {
    if (!rawText) throw new Error("Empty response from AI model")
    let cleaned = rawText.trim()
    if (cleaned.startsWith("```json")) {
        cleaned = cleaned.replace(/^```json\s*/i, "").replace(/```$/, "").trim()
    } else if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```\s*/, "").replace(/```$/, "").trim()
    }
    return JSON.parse(cleaned)
}

async function generateTripItinerary({ destination, days, budget, travelers }) {
    const prompt = `You are an elite, hyper-detail-oriented travel concierge and local expert for ${destination}. 
    Your task is to research and create a logically sequenced, highly practical, and immersive ${days}-day travel itinerary for ${travelers} people on a STRICTLY '${budget}' budget.

    CRITICAL INSTRUCTIONS & REAL-WORLD CONSTRAINTS:
    1. Geographical Clustering: Group daily activities by neighborhood or proximity to minimize transit time. Do NOT suggest places that are miles apart on the same half-day.
    2. Realistic Pacing: Factor in human constraints. Allocate realistic time for transit, specify meal breaks, and avoid overcrowding the schedule. Balance famous tourist spots with authentic local hidden gems.
    3. Strict Budget Adherence: Ensure hotel options and ticket prices perfectly align with the '${budget}' tier. 
    4. Real-World Accuracy: Do not hallucinate places. Provide highly realistic pricing estimates.
    5. Actionable Details: For each activity, explain *why* it is recommended and *what* makes it special.

    Return the output EXCLUSIVELY as a valid JSON object with the following exact keys:
    - hotelOptions: Array of 3 objects containing name, address, pricePerNight, rating, description.
    - itinerary: Array of days, where each day has day (number), theme (string), and activities (array containing time, placeName, details, ticketPrice).
    - estimatedTotalCost: String showing the total estimated cost.
    Do not wrap the JSON in markdown backticks like \`\`\`json, just output the raw JSON directly.`;

    let lastError = null

    // Try each model in sequence: gemini-3.5-flash-lite -> gemini-3.1-flash-lite -> gemini-2.5-flash
    for (const model of UNIQUE_MODELS) {
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                console.log(`[AI Service] Attempting trip generation with model '${model}' (attempt ${attempt})...`)
                const response = await ai.models.generateContent({
                    model: model,
                    contents: prompt,
                    config: {
                        responseMimeType: "application/json"
                    }
                })

                if (response && response.text) {
                    console.log(`[AI Service] Trip itinerary generated successfully using '${model}'!`)
                    return cleanAndParseJSON(response.text)
                }
            } catch (error) {
                lastError = error
                const isUnavailableOrBusy = error.status === 503 || 
                                           error.status === 429 || 
                                           error.status === 404 ||
                                           error.message?.includes("503") || 
                                           error.message?.includes("high demand") ||
                                           error.message?.includes("UNAVAILABLE") ||
                                           error.message?.includes("not found")

                console.warn(`[AI Service] Model '${model}' attempt ${attempt} failed: ${error.message}`)

                // If busy and still has another attempt on this model, wait briefly and retry
                if (isUnavailableOrBusy && attempt < 2 && error.status !== 404) {
                    const delayMs = attempt * 1000
                    console.log(`[AI Service] Retrying '${model}' in ${delayMs}ms...`)
                    await sleep(delayMs)
                    continue
                }

                // Move on to next fallback model
                console.log(`[AI Service] Model '${model}' unavailable or congested. Moving to next fallback model...`)
                break
            }
        }
    }

    // All models exhausted or unavailable
    const serverLoadError = new Error("The server is currently experiencing high load and receiving too many requests. Please try again after a while.")
    serverLoadError.status = 503
    serverLoadError.originalError = lastError?.message
    throw serverLoadError
}

async function generatePdfFromHtml(htmlContent) {
    let browser;
    try {
        browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" })

        const pdfBuffer = await page.pdf({
            format: "A4", margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" }
        })

        return pdfBuffer
    } finally {
        if (browser) {
            await browser.close()
        }
    }
}

async function generateStaticPdf(tripData) {
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; }
                h1 { color: #2c3e50; text-align: center; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
                h2 { color: #2980b9; margin-top: 20px; }
                h3 { color: #16a085; }
                .container { max-width: 800px; margin: 0 auto; padding: 20px; }
                .summary { background: #ecf0f1; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
                .day-card { border: 1px solid #ddd; border-left: 4px solid #3498db; padding: 15px; margin-bottom: 20px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
                .activity { margin-bottom: 10px; padding-left: 10px; border-left: 2px solid #bdc3c7; }
                .hotel-card { background: #fdfbfb; border: 1px solid #e0e0e0; padding: 15px; margin-bottom: 15px; border-radius: 4px; }
                .price { font-weight: bold; color: #e74c3c; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Trip to ${tripData.destination || 'Unknown Destination'}</h1>
                
                <div class="summary">
                    <p><strong>Duration:</strong> ${tripData.days || 0} Days</p>
                    <p><strong>Travelers:</strong> ${tripData.travelers || 1}</p>
                    <p><strong>Budget Tier:</strong> ${tripData.budget || 'Standard'}</p>
                    <p><strong>Estimated Total Cost:</strong> ${tripData.estimatedTotalCost || 'N/A'}</p>
                </div>

                <h2>Recommended Hotels</h2>
                ${(tripData.hotelOptions || []).map(hotel => `
                    <div class="hotel-card">
                        <h3>${hotel.name}</h3>
                        <p><strong>Address:</strong> ${hotel.address}</p>
                        <p><strong>Rating:</strong> ${hotel.rating} / 5</p>
                        <p><strong>Price:</strong> <span class="price">${hotel.pricePerNight}</span> per night</p>
                        <p>${hotel.description}</p>
                    </div>
                `).join('')}

                <h2>Itinerary</h2>
                ${(tripData.itinerary || []).map(day => `
                    <div class="day-card">
                        <h3>Day ${day.day}: ${day.theme}</h3>
                        ${(day.activities || []).map(act => `
                            <div class="activity">
                                <p><strong>${act.time} - ${act.placeName}</strong></p>
                                <p>${act.details}</p>
                                <p><em>Cost: ${act.ticketPrice}</em></p>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        </body>
        </html>
    `;

    const pdfBuffer = await generatePdfFromHtml(html)

    return pdfBuffer
}

module.exports = { generateTripItinerary, generateStaticPdf }