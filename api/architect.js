import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const { message, agent, idea } = req.body;
        
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ text: "API Key missing in Vercel environment." });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        /**
         * THE FIX: 
         * Instead of just passing the model name string, 
         * we use the getGenerativeModel configuration object.
         */
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash" 
        });

        const prompt = `You are ${agent}. The business idea is: ${idea}. Founder says: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ text });

    } catch (error) {
        console.error("Gemini System Error:", error);
        // This will help you see if it's still a 404 or a new error
        return res.status(500).json({ 
            text: "The Board is currently unavailable.",
            error: error.message 
        });
    }
}
