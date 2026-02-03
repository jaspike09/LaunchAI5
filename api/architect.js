// api/architect.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    const { message, agent, idea } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Act as the ${agent} for the project: "${idea}". Respond to: "${message}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();

    // ERROR FIX: Ensure we send an object with the 'text' key
    res.status(200).json({ text: aiText || "The Board is speechless." });

  } catch (error) {
    console.error("DEBUG:", error);
    res.status(500).json({ text: "Error: The Board is currently offline." });
  }
}
