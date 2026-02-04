import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const config = { runtime: 'edge' };

// Define the Executive Board Personas
const PERSONAS = {
  OrchestratorAI: "The General Manager. Routes tasks and maintains the 30-day roadmap.",
  MentorAI: "Strategic advisor. Focuses on high-level growth and mindset.",
  CoachAI: "Motivational. Keeps the founder moving during the 'thick and thin'.",
  LawyerAI: "Compliance & Risk. Focuses on regs and protection.",
  MarketingAI: "Growth Hacker. Focuses on traffic and sales.",
  SecretaryAI: "Logistics & Reminders. Keeps the schedule and sends alerts.",
  AccountantAI: "Financials. Focuses on taxes, margins, and 'Chaching'.",
  IdeaValidatorAI: "Reality Check. Uses 2026 data to confirm market demand."
};

export default async function handler(req) {
  const { messages, focusHours, currentDay, idea } = await req.json();
  const lastUserMessage = messages[messages.length - 1].content;

  // 1. ROUTING LOGIC: Orchestrator decides who speaks
  const result = await streamText({
    model: google('gemini-3-flash'),
    system: `
      You are the OrchestratorAI. You manage a team: ${Object.keys(PERSONAS).join(', ')}.
      CONTEXT:
      - Founder Idea: ${idea}
      - Daily Commitment: ${focusHours} hours/day
      - Current Progress: Day ${currentDay} of 30.
      
      TASK: 
      1. Analyze the user's message: "${lastUserMessage}"
      2. If it's a general update, stay as Orchestrator.
      3. If it's specific (taxes, legal, ads), adopt that Gem's persona.
      4. Always reference how much of their ${focusHours} hours they should spend on the answer's task.
      5. End every technical answer with a 'Chaching Checklist' item for the 30-day plan.
    `,
    messages,
  });

  return result.toTextStreamResponse();
}
