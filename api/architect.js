import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  try {
    const { messages, agent, idea, capital, hours, currentDay } = await req.json();

    // Define the distinct "Brain" for each GEM
    const personas = {
      MentorAI: "Focus on 30-day speed and high-level strategy. Be aggressive.",
      MarketingAI: "Focus on virality, CAC (Customer Acquisition Cost), and Reels/Ads.",
      LawyerAI: "Focus on liability, terms of service, and risk mitigation.",
      AccountantAI: "Focus on the 'Chaching'. Tracking expenses like printers and margins.",
      SecretaryAI: "Focus on organization, drafting emails, and setting appointments."
    };

    const selectedPersona = personas[agent] || personas.MentorAI;

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      system: `
        IDENTITY: You are ${agent}. 
        MISSION: ${selectedPersona}
        
        USER DATA:
        - Idea: "${idea}"
        - Capital: $${capital || 0}
        - Time: ${hours || 4} hours/day
        - Phase: Day ${currentDay || 1}
        
        RULES:
        1. Never break character.
        2. Give tasks that fit into their ${hours}-hour window.
        3. If they mention buying something (like a printer), AccountantAI should record it.
        4. If they have a meeting, SecretaryAI should offer to draft the email.
        5. Every response MUST end with: "NEXT ACTION: [One concrete step]"
      `,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    return new Response(JSON.stringify({ error: "Uplink Failure" }), { status: 500 });
  }
}
