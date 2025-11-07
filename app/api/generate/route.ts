// app/api/generate/route.ts
import { NextResponse } from "next/server";
import { generatePrompt } from "@/lib/promptTemplate";

export async function POST(req: Request) {
  try {
    const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
    const body = await req.json();
    const prompt = generatePrompt(body);

    // helper to call the model
    async function callModel() {
      const res = await fetch(
        "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 700,
              temperature: 0.7,
              return_full_text: false,
            },
          }),
        }
      );

      // Return parsed JSON data
      const data = await res.json();
      console.log("🧠 HF returned:", JSON.stringify(data, null, 2));
      return data;
    }

    // first API call
    let data = await callModel();

    // if model is loading, retry once after delay
    if (data?.error?.includes("loading")) {
      console.log("⏳ Model loading... retrying in 15 seconds");
      await new Promise((resolve) => setTimeout(resolve, 15000));
      data = await callModel();
    }

    // handle completely empty response or unexpected structure
    if (!Array.isArray(data) || !data[0]?.generated_text) {
      console.warn(
        "⚠️ Empty or invalid output from model, returning fallback plan"
      );
      return NextResponse.json({
        name: body.name,
        fitness_goal: body.goal,
        workout_plan: [
          {
            day: "Day 1",
            exercises: [
              { name: "Push-ups", sets: "3", reps: "12", rest: "60 sec" },
              { name: "Squats", sets: "3", reps: "15", rest: "60 sec" },
            ],
          },
          {
            day: "Day 2",
            exercises: [
              { name: "Plank", sets: "3", reps: "30 sec", rest: "45 sec" },
              {
                name: "Lunges",
                sets: "3",
                reps: "10 each leg",
                rest: "60 sec",
              },
            ],
          },
        ],
        diet_plan: {
          breakfast: ["Oats with banana", "Green tea"],
          lunch: ["Grilled paneer or chicken with veggies"],
          dinner: ["Salad with olive oil dressing"],
          snacks: ["Mixed nuts", "Fruit smoothie"],
        },
        tips: [
          "Stay hydrated",
          "Maintain proper form during exercises",
          "Get 7-8 hours of sleep",
        ],
        motivation: "You're doing amazing! Keep pushing forward 💪",
      });
    }

    // Extract the model output
    const rawText = data[0].generated_text;
    let jsonStr = "{}";
    const match = rawText.match(/\{[\s\S]*\}/);
    if (match) jsonStr = match[0];

    // Try parsing JSON, otherwise fallback
    let plan: any;
    try {
      plan = JSON.parse(jsonStr);
    } catch (err) {
      console.warn("⚠️ JSON parse failed. Returning fallback plan.");
      plan = {
        name: body.name,
        fitness_goal: body.goal,
        workout_plan: [
          {
            day: "Day 1",
            exercises: [
              { name: "Push-ups", sets: "3", reps: "12", rest: "60 sec" },
              { name: "Squats", sets: "3", reps: "15", rest: "60 sec" },
            ],
          },
        ],
        diet_plan: {
          breakfast: ["Oats with banana"],
          lunch: ["Grilled chicken with veggies"],
          dinner: ["Paneer salad or tofu stir fry"],
          snacks: ["Mixed nuts", "Fruit smoothie"],
        },
        tips: ["Stay hydrated", "Stretch before and after workouts"],
        motivation: "You’ve got this! Small steps lead to big changes.",
      };
    }

    // Return the final plan
    return NextResponse.json(plan);
  } catch (error: any) {
    console.error("❌ Generation Error:", error.message);
    return NextResponse.json(
      { error: "Failed to generate plan", details: error.message },
      { status: 500 }
    );
  }
}
