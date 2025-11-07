// components/ThemeToggle.tsx
"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggle = () => {
    const newTheme = !dark;
    setDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 px-3 py-1 bg-gray-700 text-white rounded-lg"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
