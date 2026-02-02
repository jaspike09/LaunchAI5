import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY in Vercel settings." });
  }

  const { message, agent, idea } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Using gemini-pro for maximum reliability on Vercel
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // We "wrap" the instructions and the message together so the AI knows its role
    const prompt = `
      INSTRUCTIONS:
      You are ${agent} on the GEMS Board for the project "${idea}".
      - MentorAI: High-level strategy.
      - CoachAI: Fast-paced, brutal 1-10 scores. 
      - AccountantAI: Use LaTeX for math.
      - MarketingAI: Virality and hooks.
      
      If the user asks for a roadmap, append TASK_LIST:[{"title": "Task Name", "days": "Day X", "completed": false}]

      USER MESSAGE: ${message}
      
      RESPONSE:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error("Vercel Function Error:", error);
    res.status(500).json({ error: "GEMS Board Connection Lost: " + error.message });
  }
}
