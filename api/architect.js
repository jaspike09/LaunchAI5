import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Guard: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Guard: Ensure API Key exists in Vercel Environment Variables
  if (!process.env.GEMINI_API_KEY) {
    console.error("CRITICAL: GEMINI_API_KEY is missing from Vercel Environment Variables.");
    return res.status(500).json({ text: "System Error: The Board's uplink is down (Missing API Key)." });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    const { message, agent, idea, context } = req.body;
    
    // 3. Initialize the 2026 Production Model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // 4. Enhanced System Prompting
    // We combine the Persona (agent), the Business Idea, and the current Progress (context)
    const systemInstruction = `
      You are the ${agent} for a startup venture.
      VENTURE IDEA: "${idea}"
      CURRENT PROGRESS: ${context || "Initial Planning Phase"}

      YOUR PERSONALITY:
      - If MentorAI: Strategic, visionary, but focused on lean foundations.
      - If MarketingAI: Growth-obsessed, focused on hooks and customer acquisition.
      - If CoachAI: High-energy, focus on daily execution and discipline.
      - If LawyerAI: Risk-averse, logical, focused on protection and compliance.

      TASK:
      Respond to the founder's message: "${message}".
      
      CONSTRAINTS:
      - Start your response with a "Viability Score: X/100" based on their message.
      - Provide exactly 2-3 sentences of sharp, executive feedback.
      - Be direct. No fluff.
    `;

    const result = await model.generateContent(systemInstruction);
    const response = await result.response;
    const aiText = response.text();

    // 5. Send successful response
    res.status(200).json({ text: aiText });

  } catch (error) {
    // 6. Detailed Error Logging for Vercel
    console.error("GEMINI_API_FAILURE:", error);
    
    // If the error is a 404, it usually means the model ID changed again
    const errorMessage = error.message.includes("404") 
      ? "Model version outdated. Update to latest Gemini ID." 
      : error.message;

    res.status(500).json({ text: "Board Error: " + errorMessage });
  }
}
