"use client";

import { useEffect, useState } from "react";
import PDFExportButton from "@/components/PDFExportButton";
import PlanDisplay from "@/components/PlanDisplay";

/**
 * The PlanPage component displays the user’s personalized AI-generated fitness plan.
 * It retrieves the plan data from localStorage, renders it in a formatted view,
 * and provides an option to listen to the plan narration or export it as a PDF.
 */
export default function PlanPage() {
  const [plan, setPlan] = useState<any>(null);

  // Load the saved AI-generated plan from localStorage when the page is first rendered.
  // This ensures the user can revisit their generated plan without regenerating it.
  useEffect(() => {
    const stored = localStorage.getItem("aiPlan");
    if (stored) setPlan(JSON.parse(stored));
  }, []);

  // If no plan exists in localStorage, show a user-friendly fallback message.
  if (!plan)
    return (
      <p className="text-center mt-10">
        No plan found. Please generate one first.
      </p>
    );

  /**
   * Construct a complete narration string that will be used by the AudioPlayer component.
   * This text includes a spoken summary of the user’s workout plan, diet plan, tips, and motivation.
   */
  const narrationText = `
Hi ${
    plan.name
  }, this is your personalized AI fitness plan to help you achieve your goal of ${
    plan.fitness_goal
  }.

Workout Plan:
${plan.workout_plan
  .map(
    (day: any) =>
      `On ${day.day}, you will perform: ${day.exercises
        .map(
          (ex: any) =>
            `${ex.name}, ${ex.sets} sets of ${ex.reps}, with ${ex.rest} rest`
        )
        .join("; ")}.`
  )
  .join("\n")}

Diet Plan:
${Object.entries(plan.diet_plan || {})
  .map(
    ([meal, items]: any) =>
      `${meal.charAt(0).toUpperCase() + meal.slice(1)} includes ${items.join(
        ", "
      )}.`
  )
  .join("\n")}

Tips:
${
  plan.tips?.join(". ") ||
  "Stay consistent, stay hydrated, and maintain good posture."
}

Motivation:
${plan.motivation || "Keep pushing forward — you’ve got this!"}
`;

  /**
   * Render the fitness plan display section and the PDF export button.
   * The PlanDisplay component is responsible for visualizing the plan data,
   * while the PDFExportButton allows the user to save their plan as a downloadable file.
   */
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div id="plan-content" className="max-w-4xl mx-auto">
        <PlanDisplay plan={plan} narrationText={narrationText} />
      </div>

      <div className="flex justify-center mt-8">
        <PDFExportButton />
      </div>
    </div>
  );
}
