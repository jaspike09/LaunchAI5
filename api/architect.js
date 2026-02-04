import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  try {
    const body = await req.json();
    const messages = body.messages || (body.message ? [{ role: 'user', content: body.message }] : null);

    if (!messages) return new Response('No prompt', { status: 400 });

    // 2026 FIX: Gemini 1.5 is GONE. Using Gemini 3 Flash.
    const result = await streamText({
      model: google('gemini-3-flash-preview'), 
      messages: messages,
      // Optional: Add a small temperature for better "mentor" vibes
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Final API Attempt Error:', error);
    
    // EMERGENCY FALLBACK: If Gemini 3 is busy, try the stable 2.5
    try {
        const fallback = await streamText({
          model: google('gemini-2.5-flash'),
          messages: messages,
        });
        return fallback.toTextStreamResponse();
    } catch (fallbackError) {
        return new Response(JSON.stringify({ error: "All 2026 models failed. Check API Key." }), { status: 500 });
    }
  }
}
