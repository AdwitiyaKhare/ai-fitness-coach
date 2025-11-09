"use client";

import { ReactElement } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import ImageGenerator from "@/components/ImageGenerator";
import {
  Dumbbell,
  Salad,
  Lightbulb,
  Coffee,
  Sandwich,
  Soup,
  Cookie,
} from "lucide-react";

interface PlanDisplayProps {
  plan: any;
  narrationText: string;
}

/**
 * PlanDisplay Component
 *
 * Displays the AI-generated fitness plan, including:
 *  - A structured daily workout plan
 *  - A categorized diet plan (breakfast, lunch, dinner, snacks)
 *  - AI-generated images for exercises and meals
 *  - Helpful lifestyle tips and a motivational message
 *
 * The component integrates `ImageGenerator` for context-aware visuals
 * and `AudioPlayer` for full-plan narration.
 *
 * Layout is fully responsive and styled using TailwindCSS with subtle
 * hover animations and a gradient-accented design.
 */
export default function PlanDisplay({ plan, narrationText }: PlanDisplayProps) {
  /**
   * Maps each meal type to a specific Lucide icon with unique color accent.
   * Icons visually distinguish between different meals (breakfast, lunch, etc.).
   */
  const mealIcons: Record<string, ReactElement> = {
    breakfast: <Coffee className="w-5 h-5 text-orange-500" />,
    lunch: <Sandwich className="w-5 h-5 text-green-500" />,
    dinner: <Soup className="w-5 h-5 text-blue-500" />,
    snacks: <Cookie className="w-5 h-5 text-pink-500" />,
  };

  /**
   * Ensures a consistent display order for meal categories.
   * Filters out undefined values to avoid rendering empty sections.
   */
  const mealOrder = ["breakfast", "lunch", "dinner", "snacks"];
  const orderedMeals = mealOrder
    .map((key) => [key, plan.diet_plan?.[key]])
    .filter(([_, val]) => val);

  return (
    <>
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-center mb-2 flex items-center justify-center gap-2">
        <Dumbbell className="w-6 h-6 text-blue-600" /> Your AI Fitness Plan
      </h1>
      <h2 className="text-lg mb-4 text-center text-gray-500">
        {plan.name} — {plan.fitness_goal}
      </h2>

      {/* Narration Player (Text-to-Speech) */}
      <AudioPlayer text={narrationText} />

      {/* Workout Plan Section */}
      <section className="space-y-4 mt-6">
        {plan.workout_plan?.map((day: any, idx: number) => (
          <div
            key={idx}
            className="border p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold mb-2">{day.day}</h3>
            <ul className="list-disc ml-6 space-y-1">
              {day.exercises.map((ex: any, i: number) => (
                <li key={i}>
                  {ex.name} — {ex.sets} x {ex.reps} (Rest: {ex.rest})
                  <ImageGenerator prompt={ex.name} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Diet Plan Section */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Salad className="w-5 h-5 text-green-500" /> Diet Plan
        </h2>

        {/* First row: Breakfast + Lunch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {orderedMeals.slice(0, 2).map(([meal, items]: any) => (
            <div
              key={meal}
              className="relative rounded-2xl p-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group"
            >
              {/* Gradient accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500" />

              <div className="flex items-center gap-2 mb-3">
                {mealIcons[meal.toLowerCase()] || (
                  <Salad className="w-5 h-5 text-green-500" />
                )}
                <h4 className="text-lg font-semibold capitalize">{meal}</h4>
              </div>

              {/* List of meals with images */}
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 overflow-y-auto max-h-72 pr-1 custom-scrollbar">
                {items.map((item: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition break-words whitespace-normal"
                  >
                    <span className="text-sm leading-relaxed flex-1">
                      {item}
                    </span>
                    <ImageGenerator prompt={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Second row: Dinner + Snacks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {orderedMeals.slice(2).map(([meal, items]: any) => (
            <div
              key={meal}
              className="relative rounded-2xl p-5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group"
            >
              {/* Gradient accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500" />

              <div className="flex items-center gap-2 mb-3">
                {mealIcons[meal.toLowerCase()] || (
                  <Salad className="w-5 h-5 text-green-500" />
                )}
                <h4 className="text-lg font-semibold capitalize">{meal}</h4>
              </div>

              {/* List of meals with images */}
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 overflow-y-auto max-h-72 pr-1 custom-scrollbar">
                {items.map((item: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition break-words whitespace-normal"
                  >
                    <span className="text-sm leading-relaxed flex-1">
                      {item}
                    </span>
                    <ImageGenerator prompt={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tips & Motivation Section */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" /> Tips
        </h2>

        {/* List of helpful tips */}
        <ul className="list-disc ml-6 space-y-1">
          {plan.tips?.map((t: string, i: number) => (
            <li key={i}>{t}</li>
          ))}
        </ul>

        {/* Motivation message */}
        <p className="italic mt-5 text-center text-green-600 dark:text-green-400 text-lg">
          {plan.motivation}
        </p>
      </section>
    </>
  );
}
