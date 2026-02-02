import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing API Key" });
  }

  const { message, agent, idea } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    /**
     * TRICK: Instead of "models/gemini-1.0-pro", we just use "gemini-pro"
     * but we ensure our package.json is updated to the latest.
     */
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Role: ${agent}. Context: ${idea}. Task: Analyze "${message}".`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error("LOG:", error);
    res.status(500).json({ error: error.message });
  }
}
