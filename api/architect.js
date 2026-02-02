import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    // FIX: Using the currently active 2026 model ID
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const { message, agent, idea } = req.body;

    // We bundle the persona instructions directly into the prompt
    const prompt = `You are ${agent} for the project "${idea}". 
    Evaluate: ${message}. 
    Return a score (0-100) and brief feedback.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error("GEMS_LOG:", error);
    res.status(500).json({ error: error.message });
  }
}
