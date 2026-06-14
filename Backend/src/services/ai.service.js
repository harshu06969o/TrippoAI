const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

// 1. Zod Schema for Trip Data 
const tripPlannerSchema = z.object({
    hotelOptions: z.array(z.object({
        name: z.string().describe("Name of the hotel or accommodation"),
        address: z.string().describe("Location or address of the hotel"),
        pricePerNight: z.string().describe("Estimated price per night in local currency or INR"),
        rating: z.string().describe("Average user rating, e.g., 4.5/5"),
        description: z.string().describe("Short 1-line description of why this is a good choice")
    })).describe("Top 3 accommodation options suitable for the given budget"),
    
    itinerary: z.array(z.object({
        day: z.number().describe("Day number of the trip"),
        theme: z.string().describe("Main theme of the day, e.g., Historical City Tour"),
        activities: z.array(z.object({
            time: z.string().describe("Time of day, e.g., Morning, Afternoon, Evening"),
            placeName: z.string().describe("Name of the place to visit"),
            details: z.string().describe("What to do there and why it's recommended"),
            ticketPrice: z.string().describe("Estimated entry fee or cost")
        })).describe("List of activities to do on this specific day")
    })).describe("A detailed day-by-day travel itinerary"),
    
    estimatedTotalCost: z.string().describe("Estimated total cost of the trip (excluding flights) based on the budget")
})

/**
 * @description Service to generate trip itinerary using Gemini AI
 */
/**
 * @description Service to generate trip itinerary using Gemini AI with Deep Prompt Engineering
 */
async function generateTripItinerary({ destination, days, budget, travelers }) {
    const prompt = `You are an elite, hyper-detail-oriented travel concierge and local expert for ${destination}. 
    Your task is to research and create a logically sequenced, highly practical, and immersive ${days}-day travel itinerary for ${travelers} people on a STRICTLY '${budget}' budget.

    CRITICAL INSTRUCTIONS & REAL-WORLD CONSTRAINTS:
    1. Geographical Clustering: Group daily activities by neighborhood or proximity to minimize transit time. Do NOT suggest places that are miles apart on the same half-day.
    2. Realistic Pacing: Factor in human constraints. Allocate realistic time for transit, specify meal breaks (suggesting local cuisine), and avoid overcrowding the schedule. Balance famous tourist spots with authentic local hidden gems.
    3. Strict Budget Adherence: Ensure the hotel options and ticket prices perfectly align with the '${budget}' tier. A 'Cheap' budget means hostels/budget stays and public transport; 'Luxury' means 5-star stays and premium experiences.
    4. Real-World Accuracy: Do not hallucinate places. Provide highly realistic pricing estimates in INR (₹) or the local currency. 
    5. Actionable Details: For each activity, explain *why* it is recommended and *what* makes it special.

    Analyze the geography, culture, and logistics of ${destination} deeply before generating the response. 
    Return the output EXCLUSIVELY as a valid JSON object matching the required schema.`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(tripPlannerSchema),
        }
    })

    return JSON.parse(response.text)
}

/**
 * @description Helper function to convert HTML to PDF
 */
async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] }) // Added args for better server deployment
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()
    return pdfBuffer
}

/**
 * @description Service to generate a beautifully formatted PDF of the trip itinerary
 */
async function generateTripPdf({ tripData }) {
    const tripPdfSchema = z.object({
        html: z.string().describe("The HTML content of the trip itinerary which can be converted to PDF using puppeteer")
    })

    const prompt = `Here is a JSON containing a travel itinerary: ${JSON.stringify(tripData)}
    
    The response should be a JSON object with a single field "html" which contains the HTML content of this itinerary.
    The HTML should be beautifully designed, modern, and visually appealing (using inline CSS). 
    It should look like a premium travel brochure. Highlight the hotels and day-by-day activities clearly.`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(tripPdfSchema),
        }
    })

    const jsonContent = JSON.parse(response.text)
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer
}

module.exports = { generateTripItinerary, generateTripPdf }