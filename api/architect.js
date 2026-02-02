import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  const { message, agent, idea } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // We are using the 1.0 Pro model which has the highest 
    // compatibility with the 'v1' API version mentioned in your error.
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const prompt = `You are ${agent} on the GEMS Board for "${idea}". 
    Validate this vision with a score out of 100 and brief feedback.
    User input: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) throw new Error("Empty response from AI");

    res.status(200).json({ text });
  } catch (error) {
    console.error("Vercel Function Error:", error);
    res.status(500).json({ error: "GEMS Board Connection Lost: " + error.message });
  }
}
