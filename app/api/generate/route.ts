// app/api/generate/route.ts
import { NextResponse } from "next/server";
import { generatePrompt } from "@/lib/promptTemplate";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = generatePrompt(body);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful fitness coach." },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim() || "{}";

    // try parsing JSON
    try {
      const json = JSON.parse(content);
      return NextResponse.json(json);
    } catch (err) {
      return NextResponse.json({ raw: content });
    }
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
