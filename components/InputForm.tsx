// components/InputForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InputForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      alert("Error generating plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md space-y-4"
    >
      <h1 className="text-2xl font-semibold text-center mb-2">
        💪 AI Fitness Coach
      </h1>
      <div className="grid grid-cols-2 gap-3">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="age"
          placeholder="Age"
          type="number"
          onChange={handleChange}
          required
        />
        <input
          name="gender"
          placeholder="Gender"
          onChange={handleChange}
          required
        />
        <input
          name="height"
          placeholder="Height (cm)"
          type="number"
          onChange={handleChange}
          required
        />
        <input
          name="weight"
          placeholder="Weight (kg)"
          type="number"
          onChange={handleChange}
          required
        />
        <select name="goal" onChange={handleChange}>
          <option>Weight Loss</option>
          <option>Muscle Gain</option>
          <option>Maintenance</option>
        </select>
        <select name="level" onChange={handleChange}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <select name="location" onChange={handleChange}>
          <option>Home</option>
          <option>Gym</option>
          <option>Outdoor</option>
        </select>
        <select name="diet" onChange={handleChange}>
          <option>Veg</option>
          <option>Non-Veg</option>
          <option>Vegan</option>
          <option>Keto</option>
        </select>
      </div>

      <textarea
        name="medical"
        placeholder="Medical history or notes"
        className="w-full"
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>
    </form>
  );
}
