export default async function handler(req, res) {
  const { persona, idea, day } = JSON.parse(req.body);
  const apiKey = process.env.GEMINI_API_KEY; // This stays hidden!

  const prompt = `You are the ${persona} GEM for LaunchAI. The Founder's idea is: ${idea}. We are on Day ${day} of the 30-Day Success Plan. Provide a specific, agentic directive or draft.`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  const data = await response.json();
  res.status(200).json(data);
}
