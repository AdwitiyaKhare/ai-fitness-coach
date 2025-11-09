"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Dumbbell, Sparkles, Stethoscope } from "lucide-react";

/**
 * InputForm Component
 *
 * This component is the primary user input interface of the AI Fitness Coach app.
 * It collects user details like name, age, weight, fitness goal, and diet preference.
 * Once submitted, the data is sent to the backend API to generate a personalized
 * AI-powered fitness and diet plan.
 */
export default function InputForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Single state object to manage all input fields in the form
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "Weight Loss",
    level: "Beginner",
    location: "Home",
    diet: "Veg",
    medical: "",
  });

  /**
   * Updates formData dynamically based on the input field name.
   * This allows all fields to share a common onChange handler.
   */
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission.
   * Sends the collected user data to the `/api/generate` route,
   * stores the returned AI plan in localStorage, and redirects to `/plan`.
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      localStorage.setItem("aiPlan", JSON.stringify(data));
      router.push("/plan");
    } catch (err) {
      alert("Error generating plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * The UI is built using Tailwind CSS for styling, Lucide React for icons,
   * and Framer Motion for smooth fade-in and tap animations.
   */
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto mt-16 p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
    >
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text">
          <Dumbbell className="w-6 h-6" /> AI Fitness Coach
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Get your personalized workout & diet plan powered by AI.
        </p>
      </div>

      {/* Input Fields Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: "name", placeholder: "Full Name" },
          { name: "age", placeholder: "Age", type: "number" },
          { name: "gender", placeholder: "Gender" },
          { name: "height", placeholder: "Height (cm)", type: "number" },
          { name: "weight", placeholder: "Weight (kg)", type: "number" },
        ].map((input, i) => (
          <input
            key={i}
            {...input}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 
                       text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 transition-all"
          />
        ))}

        {/* Fitness goal dropdown */}
        <select
          name="goal"
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 
                     focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option>Weight Loss</option>
          <option>Muscle Gain</option>
          <option>Maintenance</option>
        </select>

        {/* Fitness level dropdown */}
        <select
          name="level"
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 
                     focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        {/* Workout location dropdown */}
        <select
          name="location"
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 
                     focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option>Home</option>
          <option>Gym</option>
          <option>Outdoor</option>
        </select>

        {/* Diet preference dropdown */}
        <select
          name="diet"
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 
                     focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option>Veg</option>
          <option>Non-Veg</option>
          <option>Vegan</option>
          <option>Keto</option>
        </select>
      </div>

      {/* Medical History Section */}
      <div className="mt-4">
        <textarea
          name="medical"
          placeholder="Mention any medical history, stress level, or special notes..."
          className="w-full min-h-[80px] px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 
                     text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 transition-all flex items-start"
          onChange={handleChange}
        />
      </div>

      {/* Submit Button Section */}
      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: 0.97 }}
        className={`w-full mt-6 py-3 text-lg font-semibold text-white rounded-xl shadow-lg 
                    transition-all flex justify-center items-center gap-2 ${
                      loading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500"
                    }`}
      >
        {loading ? (
          <>
            <Sparkles className="w-5 h-5 animate-spin" />
            Generating Plan...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate My Plan
          </>
        )}
      </motion.button>

      {/* Footer Section */}
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-center gap-1">
        <Stethoscope className="w-4 h-4" />
        Powered by Hugging Face + Next.js · Created by{" "}
        <span className="font-medium text-blue-500">Adwitiya Khare</span>
      </p>
    </motion.form>
  );
}
