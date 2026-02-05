// ... existing imports ...

export default async function handler(req) {
  const { messages, agent, idea, focusHours, currentDay } = await req.json();

  // Logic: Day 1-7 are "Direct Command" phase
  const isEarlyPhase = currentDay <= 7;
  
  const directiveStyle = isEarlyPhase 
    ? "COMMAND MODE: The user is in the critical takeoff phase. Do not ask for input. Assign the highest-leverage task immediately. Be high-energy and authoritative."
    : "STRATEGIC MODE: The user has momentum. Provide advanced analysis and ask one strategic question to refine the trajectory.";

  const result = await streamText({
    model: google('gemini-1.5-pro-latest'),
    system: `
      You are ${agent}, a Managing Partner with a DBA. 
      CURRENT VENTURE: "${idea}" | LAUNCH CLOCK: Day ${currentDay}/30.
      
      PHASE PROTOCOL:
      ${directiveStyle}
      
      MISSION:
      1. Ensure the user feels the "LaunchAI Magic" through precise, high-value orders.
      2. Every directive must result in a "win" that can be completed in ${focusHours} hours.
      3. Use terminology that makes them feel like a 2026 tech-disruptor.
      4. TERMINATION: End with: "✅ DOCTORATE DIRECTIVE: [One specific task]"
    `,
    messages,
  });

  return result.toTextStreamResponse();
}
