// lib/promptTemplate.ts
export const generatePrompt = (user: any) => {
  return `
You are an expert fitness coach and dietitian.
Generate a personalized 7-day workout and diet plan in strict JSON only.

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

User details:
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

Generate the plan as valid JSON, no extra text.`;
};
