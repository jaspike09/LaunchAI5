import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    // 1. Method Security
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const { message, agent, idea } = req.body;
        
        // 2. API Key Check
        if (!process.env.GEMINI_API_KEY) {
            console.error("CRITICAL: GEMINI_API_KEY is missing from Vercel Environment Variables.");
            return res.status(500).json({ text: "Board Offline: API Key missing in backend." });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        /**
         * 3. MODEL INITIALIZATION
         * Using 'gemini-1.5-flash' for speed and 'v1' for stability.
         * This bypasses the 404 error you saw earlier.
         */
        const model = genAI.getGenerativeModel(
            { model: "gemini-1.5-flash" }, 
            { apiVersion: 'v1' }
        );

        const prompt = `You are ${agent}, an elite startup board member. 
                        The founder's business idea is: ${idea}.
                        Current Objective: Provide sharp, actionable advice.
                        User Message: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ text });

    } catch (error) {
        console.error("Gemini Error:", error);
        return res.status(500).json({ 
            text: "The Board is currently in a private session. Error: " + error.message 
        });
    }
}
