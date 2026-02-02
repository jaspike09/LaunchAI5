import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  const { message, agent, idea } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    /** * FIX: We use 'gemini-1.5-pro' which is the current 
     * standard ID that avoids the 404 version error.
     */
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      You are ${agent} on the GEMS Board for "${idea}".
      Instructions: Be concise. If validating, give a score out of 100.
      
      User message: ${message}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error("Vercel Function Error:", error);
    // This sends the actual error back to your browser console
    res.status(500).json({ error: error.message });
  }
}
