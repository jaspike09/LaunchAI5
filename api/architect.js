import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    // FIX for "Method Not Allowed": Vercel functions sometimes need explicit method handling
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed. Use POST." });
    }

    try {
        const { message, agent, idea } = req.body;
        
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ text: "Missing GEMINI_API_KEY in Vercel." });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        /**
         * THE FIX: Specify gemini-1.5-flash. 
         * The latest SDK (v1.x.x) defaults to v1. 
         * If you are still on v0.2.1, you MUST update your package.json.
         */
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash" 
        });

        const prompt = `You are ${agent}. Startup idea: ${idea}. User message: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ text });

    } catch (error) {
        console.error("Gemini System Error:", error);
        return res.status(500).json({ 
            text: "The Board is unreachable.", 
            details: error.message 
        });
    }
}
