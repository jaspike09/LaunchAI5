import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  try {
    const { messages, agent, idea, focusHours, currentDay } = await req.json();

    const boardDefinitions = {
      MentorAI: "Venture Strategist. Focus: Scalability and 2026 Market Dominance.",
      IdeaValidatorAI: "Skeptical Analyst. Focus: Identifying business model flaws.",
      MarketingAI: "Growth Hacker. Focus: Virality and 2026 attention economy.",
      LawyerAI: "Compliance Expert. Focus: Digital regulations and protection.",
      AccountantAI: "Profit Specialist. Focus: Unit economics and 'Chaching' revenue.",
      SecretaryAI: "Accountability Officer. Focus: Schedule and 4-hour daily execution.",
      CoachAI: "Performance Psychologist. Focus: Grit and founder burnout prevention."
    };

    const result = await streamText({
      // FIXED MODEL STRING FOR FEB 2026
      model: google('gemini-3-flash-preview'), 
      
      // 2026 SPECIFIC: Enabling 'Thinking' for complex task orchestration
      providerOptions: {
        google: {
          thinkingLevel: 'medium', // Options: minimal, low, medium, high
        },
      },

      system: `
        You are ${agent}: ${boardDefinitions[agent] || 'Executive Advisor'}.
        
        CONTEXT:
        - Project: "${idea}"
        - Timeline: Day ${currentDay} of 30.
        - Daily Capacity: ${focusHours} hours.
        
        MISSION:
        1. Fully embody the ${agent} persona.
        2. Give the founder a specific task for their ${focusHours} hour block TODAY.
        3. End every message with: "✅ CHACHING CHECKLIST: [Specific Action Item]"
      `,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Board Meeting Interrupted:', error);
    return new Response(JSON.stringify({ 
      error: "The Board is currently re-calibrating. Error: " + error.message 
    }), { status: 500 });
  }
}
