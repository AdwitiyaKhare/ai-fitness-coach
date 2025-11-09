// This API route is responsible for generating a personalized fitness and diet plan
// using a large language model hosted on the Hugging Face Router. It accepts user details
// from the request body, crafts a structured JSON prompt, and returns an AI-generated plan
// containing workouts, diet recommendations, and motivational tips.

import { NextResponse } from "next/server";
import OpenAI from "openai";
import JSON5 from "json5";

export async function POST(req: Request) {
  let body: any = {};

  try {
    // Retrieve the Hugging Face access token from environment variables
    const HF_TOKEN = process.env.HF_TOKEN;

    // Parse the incoming JSON request containing user data
    body = await req.json();

    // Initialize the OpenAI client to use Hugging Face’s inference router.
    // This allows us to call various Hugging Face models using a unified API format.
    const client = new OpenAI({
      baseURL: "https://router.huggingface.co/v1",
      apiKey: HF_TOKEN,
    });

    // The base prompt defines the role of the AI model and provides detailed user input.
    // The model is instructed to return a strictly valid JSON response following the schema below.
    const basePrompt = `
You are a professional AI fitness coach.
Generate a detailed personalized fitness and diet plan as VALID JSON only.
Follow strict JSON syntax (double quotes, no trailing commas, no markdown, no prose).

User details:
Name: ${body.name}
Age: ${body.age}
Gender: ${body.gender}
Height: ${body.height} cm
Weight: ${body.weight} kg
Goal: ${body.goal}
Fitness Level: ${body.level}
Workout Location: ${body.location}
Diet Preference: ${body.diet}

JSON schema example:
{
  "name": "",
  "fitness_goal": "",
  "workout_plan": [
    { "day": "", "exercises": [{ "name": "", "sets": "", "reps": "", "rest": "" }] }
  ],
  "diet_plan": { "breakfast": [], "lunch": [], "dinner": [], "snacks": [] },
  "tips": [],
  "motivation": ""
}
`;

    // The model is invoked through a chat completion request.
    // It uses the system prompt to enforce valid JSON output and avoid extraneous text.
    const completion = await client.chat.completions.create({
      model: "zai-org/GLM-4.6:novita",
      messages: [
        {
          role: "system",
          content:
            "You must reply ONLY with valid JSON — no markdown, no extra text, and no explanations.",
        },
        { role: "user", content: basePrompt },
      ],
      max_tokens: 1400,
      temperature: 0.5,
    });

    // Extract the model’s generated content
    const rawText = completion.choices?.[0]?.message?.content?.trim() || "";
    if (!rawText) throw new Error("Empty model output");

    // Search for the JSON block in the model’s response
    const match = rawText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON detected in response");

    let jsonString = match[0];

    // Clean up common formatting issues that may appear in the raw model output
    jsonString = jsonString
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]")
      .replace(/“|”/g, '"')
      .replace(/\\'/g, "'")
      .trim();

    // Attempt to parse the generated text into a valid JavaScript object.
    // Use JSON first, then JSON5 as a fallback in case of minor syntax errors.
    let plan;
    try {
      plan = JSON.parse(jsonString);
    } catch {
      try {
        plan = JSON5.parse(jsonString);
      } catch {
        // If the JSON is incomplete or truncated, attempt a minimal repair.
        const repaired = jsonString.replace(/[^{}\[\]]+$/, "").concat("}");
        plan = JSON5.parse(repaired);
      }
    }

    // Ensure that all necessary keys exist in the final response object.
    // Missing fields are filled with safe default values.
    plan = {
      name: plan.name || body.name || "User",
      fitness_goal: plan.fitness_goal || body.goal || "General Fitness",
      workout_plan: plan.workout_plan || [],
      diet_plan: plan.diet_plan || {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
      },
      tips: plan.tips || [],
      motivation: plan.motivation || "Keep pushing forward — you’ve got this!",
    };

    // Send the completed fitness plan as the JSON response
    return NextResponse.json(plan);
  } catch (error: any) {
    console.error("Generation Error:", error.message);

    // If there is an error while calling the model or parsing the response,
    // return a predefined fallback plan. This ensures the frontend can still render content.
    return NextResponse.json({
      name: body?.name || "User",
      fitness_goal: body?.goal || "General",
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
            { name: "Lunges", sets: "3", reps: "10 each leg", rest: "60 sec" },
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
        "Get 7–8 hours of sleep",
      ],
      motivation: "You're doing amazing! Keep pushing forward.",
    });
  }
}
