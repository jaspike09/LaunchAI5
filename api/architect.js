import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // 2. SAFETY CHECK: Is the API Key actually there?
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY in Vercel settings." });
  }

  const { message, agent, idea } = req.body;

  try {
    // 3. Initialize INSIDE the handler
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        systemInstruction: `You are ${agent} on the GEMS Board for the project "${idea}".
        
        PERSONA DATA:
        - MentorAI: High-level strategy.
        - CoachAI: Fast-paced, brutal 1-10 scores. 
        - AccountantAI: Use LaTeX for all math ($LTV$, $CAC$).
        - SecretaryAI: Summary and documentation.
        - LawyerAI: Liability and 2026 compliance.
        - MarketingAI: Virality and hooks.

        CRITICAL CAPABILITY - THE ROADMAP:
        If the user asks for a "roadmap," "plan," or "next steps," you MUST append a JSON task list at the very end of your response using the exact trigger word "TASK_LIST:".
        
        Example format to append:
        TASK_LIST:[{"title": "Register Domain", "days": "Day 1-2", "completed": false}, {"title": "Set up Supabase", "days": "Day 3", "completed": false}]

        Response Style: Concise, professional, and actionable.`
    });

    const result = await model.generateContent(message);
    const text = result.response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error("Vercel Function Error:", error);
    res.status(500).json({ error: "GEMS Board Connection Lost: " + error.message });
  }
}
