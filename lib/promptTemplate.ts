// lib/promptTemplate.ts
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
