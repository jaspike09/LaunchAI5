export default async function handler(req, res) {
  const { message, idea, day } = JSON.parse(req.body);
  const apiKey = process.env.GEMINI_API_KEY;

  // 1. THE TRIAGE: Evaluating intent across ALL 6 GEMS
  const triagePrompt = `
    You are the Lead Orchestrator for LaunchAI. 
    Founder Message: "${message}"
    
    Assign this task to the correct GEM based on these definitions:
    - MENTOR: High-level strategy, "Big Picture" advice, and market wisdom.
    - COACH: Accountability, motivation, time-management, and mindset.
    - SECRETARY: Drafting, organizing, scraping, and administrative execution.
    - ACCOUNTANT: Budgeting, tools, ROI, and costs.
    - LAWYER: Legal structures, contracts, and compliance.
    - MARKETING: Copywriting, ads, and growth strategy.

    Respond with ONLY the name of the GEM.
  `;

  const triageResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: triagePrompt }] }] })
  });
  
  const triageData = await triageResponse.json();
  const assignedGem = triageData.candidates[0].content.parts[0].text.trim();

  // 2. THE EXECUTION: The chosen GEM responds
  const executionPrompt = `
    You are the ${assignedGem} for LaunchAI. 
    The Project: ${idea}.
    The Founder's Input: "${message}"
    
    Provide a concise, high-impact response in your specific persona. 
    If you are the Secretary, provide a draft. 
    If you are the Mentor, provide a strategic insight.
    If you are the Coach, provide a directive for today.
  `;

  const finalResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: executionPrompt }] }] })
  });

  const finalData = await finalResponse.json();
  
  res.status(200).json({
    role: assignedGem,
    text: finalData.candidates[0].content.parts[0].text
  });
}
