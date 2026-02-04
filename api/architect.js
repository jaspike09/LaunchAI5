import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  try {
    const body = await req.json();
    
    // Defensive check: look for 'messages' or 'prompt'
    const messages = body.messages || [{ role: 'user', content: body.prompt }];

    if (!messages || (Array.isArray(messages) && messages.length === 0)) {
       return new Response(JSON.stringify({ error: "No messages provided" }), { status: 400 });
    }

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
