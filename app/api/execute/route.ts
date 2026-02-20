import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(req: Request) {
  const { command, businessIdea } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are the Lead Director of LaunchAI. The user's business is: ${businessIdea}. 
  The user has ordered the following action: ${command}. 
  Give a brief, 2-sentence executive update on what the agents are doing to complete this task. 
  Be professional, agentic, and decisive.`;

  const result = await model.generateContent(prompt);
  return NextResponse.json({ output: result.response.text() });
}