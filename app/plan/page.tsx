"use client";
import { useEffect, useState } from "react";

export default function PlanPage() {
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("aiPlan");
    if (stored) setPlan(JSON.parse(stored));
  }, []);

  if (!plan)
    return (
      <p className="text-center mt-10">
        No plan found. Please generate one first.
      </p>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        🏋️ Your AI Fitness Plan
      </h1>
      <h2 className="text-lg mb-4 text-center text-gray-500">
        {plan.name} - {plan.fitness_goal}
      </h2>

      <section className="space-y-4">
        {plan.workout_plan?.map((day: any, idx: number) => (
          <div
            key={idx}
            className="border p-4 rounded-lg bg-white dark:bg-gray-800"
          >
            <h3 className="font-semibold mb-2">{day.day}</h3>
            <ul className="list-disc ml-6">
              {day.exercises.map((ex: any, i: number) => (
                <li key={i}>
                  {ex.name} — {ex.sets} x {ex.reps} (Rest: {ex.rest})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🥗 Diet Plan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(plan.diet_plan || {}).map(([meal, items]: any) => (
            <div
              key={meal}
              className="bg-white dark:bg-gray-800 p-3 rounded-lg"
            >
              <h4 className="font-semibold capitalize">{meal}</h4>
              <ul className="list-disc ml-5 text-sm">
                {items.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc ml-6">
          {plan.tips?.map((t: string, i: number) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
        <p className="italic mt-3 text-center text-green-600">
          {plan.motivation}
        </p>
      </section>
    </div>
  );
}
