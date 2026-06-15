const { GoogleGenAI } = require("@google/genai")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

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

 const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", // 👈 Use the current standard fast production model
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    })

    return JSON.parse(response.text)
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" }
    })

    await browser.close()
    return pdfBuffer
}

async function generateTripPdf({ tripData }) {
    const prompt = `Convert this trip itinerary data into a beautifully designed, modern HTML string with inline CSS so it looks like a premium travel brochure. 
    Data: ${JSON.stringify(tripData)}
    
    Return the output strictly as a JSON object containing a single 'html' key with the raw HTML string. Start directly with <!DOCTYPE html>.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", // 👈 Use the current standard fast production model
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    })

    const jsonContent = JSON.parse(response.text)
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer
}

module.exports = { generateTripItinerary, generateTripPdf }