import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use Service Key for backend write access
);

export default async function handler(req) {
  // 1. Generate a 2026-specific business idea
  try {
    const { text } = await generateText({
      model: google('gemini-3-flash'),
      system: "You are the IdeaValidatorAI. Your goal is to find one high-profit, zero-down business opportunity for February 2026.",
      prompt: "Generate a business idea that is expected to generate money today. Include: 1. The Idea, 2. The 2026 Market Why, and 3. A 'Get Started' link guide. Format as a clean summary.",
    });

    // 2. Save to Supabase (so your dashboard UI updates)
    const { error } = await supabase
      .from('daily_ideas')
      .insert([{ 
          content: text, 
          created_at: new Date().toISOString() 
      }]);

    if (error) throw error;

    // 3. Optional: Trigger Webhook to post to DailyIdeas4U Page
    // await fetch('https://your-webhook-url.com', { method: 'POST', body: JSON.stringify({ idea: text }) });

    return new Response(JSON.stringify({ success: true, idea: text }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
