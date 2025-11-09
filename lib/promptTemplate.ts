/**
 * generatePrompt
 *
 * This utility function dynamically creates a text prompt for the language model
 * to generate a personalized fitness and diet plan.
 *
 * It formats the user’s input data into a structured instruction for the AI model,
 * ensuring the response follows a strict JSON schema (no markdown or extra text).
 *
 * The generated prompt includes both the schema definition and the user’s details.
 * This consistent structure helps guide the model to produce valid, parsable JSON output.
 *
 * Parameters:
 *  - user: Object containing personal and fitness details (name, age, goal, etc.)
 *
 * Returns:
 *  - A string prompt ready to be passed to the model inference API.
 */
export const generatePrompt = (user: any) => {
  return `
You are an expert certified fitness coach and nutritionist. 
Return a JSON object only — do NOT include markdown or extra text.

Schema:
{
  "name": string,
  "fitness_goal": string,
  "workout_plan": [
    {
      "day": string,
      "exercises": [
        { "name": string, "sets": string, "reps": string, "rest": string }
      ]
    }
  ],
  "diet_plan": {
    "breakfast": string[],
    "lunch": string[],
    "dinner": string[],
    "snacks": string[]
  },
  "tips": string[],
  "motivation": string
}

Now generate a personalized 7-day plan for:
Name: ${user.name}
Age: ${user.age}
Gender: ${user.gender}
Height: ${user.height} cm
Weight: ${user.weight} kg
Goal: ${user.goal}
Fitness Level: ${user.level}
Workout Location: ${user.location}
Diet Preference: ${user.diet}
Medical Notes: ${user.medical || "None"}

Only respond with valid JSON strictly matching the schema.`;
};
