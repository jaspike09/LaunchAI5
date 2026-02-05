import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  try {
    const body = await req.json();
    const { messages, agent, idea, focusHours, currentDay } = body;
    const isEarlyPhase = (currentDay || 1) <= 7;

    // We are using the explicit provider instance to bypass the syntax error
    const googleProvider = google('gemini-1.5-flash');

    const result = await streamText({
      model: googleProvider,
      system: `
        IDENTITY: You are ${agent || 'MentorAI'}, a Managing Partner & DBA. 
        CONTEXT: Day ${currentDay || 1}/30 for "${idea || 'Stealth Venture'}".
        PHASE: ${isEarlyPhase ? 'COMMAND MODE' : 'STRATEGIC MODE'}
        TERMINATION: Always end with: "✅ DOCTORATE DIRECTIVE: [One specific task]"
      `,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
