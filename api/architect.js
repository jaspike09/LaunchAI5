import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    // Using the stable flash model for speed/reliability
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { message, agent, idea } = req.body;

    const prompt = `
      You are the ${agent} on a Board of Directors. 
      The project is: "${idea}". 
      
      Task: Respond to the following message from the founder: "${message}".
      
      Guidelines:
      1. Stay in character as a ${agent}.
      2. Provide a score (0-100) for the viability of their specific request.
      3. Give 2-3 sentences of sharp, executive-level feedback.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error("GEMS_LOG:", error);
    res.status(500).json({ error: "The Board is currently indisposed. Check API keys." });
  }
}
