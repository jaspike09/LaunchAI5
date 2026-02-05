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
    
    // 1. ISOLATE THE MODEL: This bypasses the bundling syntax error
    const modelInstance = google('gemini-1.5-flash');

    // 2. RUN THE STREAM
    const result = await streamText({
      model: modelInstance,
      system: `
        IDENTITY: You are ${agent || 'MentorAI'}, a Managing Partner & DBA. 
        CONTEXT: Day ${currentDay || 1}/30 of a launch for "${idea || 'Stealth Venture'}".
        PROTOCOL: ${ (currentDay || 1) <= 7 ? "COMMAND MODE: Assign a high-leverage task." : "STRATEGIC MODE: Advanced analysis." }
        GOAL: Ensure a win in a ${focusHours || 4}-hour block.
        TERMINATION: Always end with: "✅ DOCTORATE DIRECTIVE: [Task]"
      `,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Build/Runtime Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
