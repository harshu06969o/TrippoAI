# TrippoAI — AI Travel Intelligence Platform

TrippoAI is a full-stack AI travel planner that generates hyper-personalized, geographically clustered travel itineraries based on real-world constraints like budget, pace, and local preferences.

## 🚀 Key Features
- **Intelligent Itinerary Generation:** Leverages Google Gemini 2.5 Flash to create detailed daily plans.
- **Geographical Clustering:** Activities are grouped by proximity to minimize transit time.
- **Dynamic PDF Generation:** High-fidelity, vector-based PDF itinerary brochures generated via Headless Puppeteer.
- **Secure Authentication:** JWT-based session management with HTTP-only cookies and token blacklisting for enhanced security.

## 🛠️ Tech Stack
- **Frontend:** React.js+Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **AI/LLM:** Google Gemini 2.5 Flash
- **Utility:** Puppeteer (for PDF generation), Zod (for schema validation)

## 🏗️ Architecture
- **Data Pipeline:** We enforce strict JSON schemas via `Zod`, ensuring the frontend receives predictable, crash-free data from the LLM.
- **Asset Delivery:** PDFs are rendered from dynamic HTML templates using Puppeteer, bypassing rasterization to keep document payloads lean and vector-perfect.

## ⚙️ Setup
1. Clone the repo: `git clone (https://github.com/harshu06969o/TrippoAI)`
2. Install dependencies: `npm install`
3. Add your `.env` file (GEMINI_API_KEY, MONGO_URI, JWT_SECRET).
4. Run server: `npm run dev`
