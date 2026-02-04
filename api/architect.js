import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const { message, agent, idea } = req.body;

        // The SDK automatically uses your GEMINI_API_KEY from environment variables
        const { text } = await generateText({
            model: google('gemini-1.5-flash'),
            system: `You are ${agent}, an elite startup board member. Context: The idea is ${idea}.`,
            prompt: message,
            // Vercel AI SDK handles retries and settings automatically
        });

        return res.status(200).json({ text });

    } catch (error) {
        console.error("AI Gateway Error:", error);
        return res.status(500).json({ text: "The board is unresponsive. Error: " + error.message });
    }
}
