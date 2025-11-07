// app/api/image/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: `Generate a realistic image of ${prompt}`,
        size: "512x512",
      }),
    });

    const data = await res.json();
    const imageUrl = data.data?.[0]?.url || null;
    return NextResponse.json({ image: imageUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
