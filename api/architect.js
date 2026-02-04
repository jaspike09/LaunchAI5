import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const { message, agent, idea } = req.body;
        
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ text: "Backend Error: Missing GEMINI_API_KEY." });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        /**
         * FIX: We use the stable 'v1' version. 
         * Note: Most SDKs default to v1 if you don't specify, 
         * but your error proves it was stuck on v1beta.
         */
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash"
        });

        const prompt = `Role: ${agent}. Context: Business idea is ${idea}. User says: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ text });

    } catch (error) {
        console.error("Gemini System Error:", error);
        return res.status(500).json({ 
            text: "The Board is currently offline.",
            details: error.message 
        });
    }
}
