import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ text: "API Key missing in Vercel settings." });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    const { message, agent, idea } = req.body;
    
    // UPDATED MODEL ID FOR 2026
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(`You are ${agent}. Startup: ${idea}. User: ${message}`);
    const response = await result.response;
    const aiText = response.text();

    res.status(200).json({ text: aiText });

  } catch (error) {
    console.error("DEBUG:", error);
    res.status(500).json({ text: "Board error: " + error.message });
  }
}
