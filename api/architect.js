import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-1.5-flash'), // The AI SDK handles the 404/URL logic for you
      messages: messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Gemini Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
