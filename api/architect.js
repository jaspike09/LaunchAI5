export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // 1. Guard against non-POST requests
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { messages, agent, idea, capital, hours } = await req.json();

    // 2. Persona definitions baked-in (No external imports)
    const personas = {
      MentorAI: "Lead Advisor. Brutal, strategic, focused on high-level pivots.",
      MarketingAI: "Growth Hacker. Focus on viral loops and 2026 social arbitrage.",
      LawyerAI: "Risk Manager. Find legal holes, IP issues, and liability.",
      AccountantAI: "CFO. Focus on ROI, burn rate, and capital efficiency."
    };

    const systemPrompt = `You are ${agent} on the LaunchAI-4 GEMS Board.
    Mission: "${idea || 'Unspecified Venture'}".
    Constraints: $${capital || 0} budget, ${hours || 0} hrs/week.
    Persona: ${personas[agent] || personas.MentorAI}
    Context: Year 2026. Be blunt. No fluff. Stream your response.`;

    // 3. The Bare-Metal Fetch (No AI SDKs to break the build)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        stream: true,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return new Response(JSON.stringify({ error: err.error.message }), { status: 500 });
    }

    // 4. Pipe the stream directly
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Uplink Lost: " + error.message }), { status: 500 });
  }
}
