// This API route generates images related to exercises or diet items
// by calling a Stable Diffusion model hosted on Hugging Face’s inference router.
// It accepts a prompt from the client, determines whether it describes food or a workout,
// and generates a realistic context-appropriate image.

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the request body to extract the input prompt
    const { prompt } = await req.json();
    const lower = prompt.toLowerCase();

    // Define a set of keywords that indicate food-related prompts
    const foodKeywords = [
      "salad",
      "chicken",
      "paneer",
      "tofu",
      "oats",
      "smoothie",
      "soup",
      "sandwich",
      "rice",
      "dal",
      "vegetable",
      "fruit",
      "juice",
      "snack",
      "meal",
      "breakfast",
      "lunch",
      "dinner",
    ];

    // Detect whether the prompt refers to a food item
    const isFood = foodKeywords.some((word) => lower.includes(word));

    // Based on the context, build a descriptive prompt for the model.
    // For food-related prompts, focus on presentation and realism.
    // For exercises, focus on human movement and correct form.
    const contextPrompt = isFood
      ? `High-quality, realistic food photography of ${prompt}. Focus on healthy, appetizing presentation suitable for a fitness diet plan.`
      : `High-quality realistic photograph of a person performing ${prompt} exercise in a gym or home workout setting. Focus on correct human posture and fitness environment.`;

    // Helper function to send a request to the image generation model
    async function callModel() {
      const res = await fetch(
        "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: contextPrompt,
          }),
        }
      );
      return res;
    }

    // Make the initial API call
    let response = await callModel();

    // If the model is still loading, wait and retry once after 20 seconds
    if (response.status !== 200) {
      const text = await response.text();
      if (text.includes("loading")) {
        console.log("Model is loading, retrying in 20 seconds...");
        await new Promise((r) => setTimeout(r, 20000));
        response = await callModel();
      } else {
        throw new Error(text);
      }
    }

    // If the response is not successful, throw an error with details
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Hugging Face Error: ${errText}`);
    }

    // Convert the binary image data returned by the model into a Base64-encoded string
    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");
    const imageUrl = `data:image/png;base64,${base64Image}`;

    // Return the generated image as a base64 data URL
    return NextResponse.json({ image: imageUrl });
  } catch (error: any) {
    // If the model call fails or the Hugging Face endpoint is unavailable,
    // return a placeholder image and include the error message for debugging.
    console.error("Image generation failed:", error.message);
    const fallback = "https://placehold.co/512x512?text=Image+Not+Available";
    return NextResponse.json(
      { image: fallback, error: error.message },
      { status: 200 }
    );
  }
}
