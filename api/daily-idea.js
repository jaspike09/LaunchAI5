import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { createClient } from '@supabase/supabase-js';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const { text } = await generateText({
      model: google('gemini-1.5-flash'), // Flash is safer for 504 errors
      system: "You are the Opportunity Scout. Provide a direct 2026 business gap and a 4-hour execution plan. End with: ✅ DOCTORATE DIRECTIVE: [Action Item]",
      prompt: "Identify today's highest-leverage venture opportunity.",
    });

    const { data, error } = await supabase
      .from('daily_ideas')
      .insert([{ content: text }])
      .select();

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
