import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    // 1. Security check
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    try {
        const { message, agent, idea } = req.body;
        
        // 2. Initialize with the stable v1 API version
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Use 'gemini-1.5-flash' with the explicit v1 version
        const model = genAI.getGenerativeModel(
            { model: "gemini-1.5-flash" }, 
            { apiVersion: 'v1' } 
        );

        const prompt = `Context: Startup Idea is "${idea}". 
                        Role: You are ${agent}, a world-class startup expert. 
                        Task: Respond to the founder's message: "${message}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ text });

    } catch (error) {
        console.error("Gemini Backend Error:", error);
        // This prevents the front-end from getting a "null" response
        return res.status(500).json({ 
            text: "The board is currently in a closed session (API Error). Please verify your API Key and Model settings.",
            details: error.message 
        });
    }
}
