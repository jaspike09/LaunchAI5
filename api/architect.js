import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  try {
    const body = await req.json();
    
    // Safety: Capture the message regardless of whether the frontend sends 'message' or 'messages'
    const userText = body.message || (body.messages && body.messages[body.messages.length - 1].content);

    if (!userText) {
      return new Response(JSON.stringify({ error: "No message found in request body" }), { status: 400 });
    }

    const result = await streamText({
      // Using the '-latest' suffix forces the API to find the active deployment on the v1beta endpoint
      model: google('gemini-1.5-flash-latest'), 
      messages: [
        { role: 'system', content: `You are ${body.agent || 'an AI assistant'}. Idea: ${body.idea || 'Business'}` },
        { role: 'user', content: userText }
      ],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
