"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle Component
 *
 * This component provides a light/dark mode switcher for the application.
 * It synchronizes with localStorage to remember the user's theme preference
 * and safely updates the document class list to trigger Tailwind's `dark` mode styles.
 *
 * Key Details:
 * - Fully client-side (`"use client"`) since it interacts with `window` and `document`.
 * - Detects system theme preference (`prefers-color-scheme`).
 * - Avoids hydration mismatch by rendering only after the component mounts.
 * - Uses minimal and semantic Tailwind classes for a polished UI toggle.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [ready, setReady] = useState(false); // Prevents theme flicker before mount

  /**
   * Runs once after the component mounts.
   * Determines the user's saved theme or system preference
   * and applies the correct theme class to the document root.
   */
  useEffect(() => {
    try {
      const saved =
        typeof window !== "undefined" ? localStorage.getItem("theme") : null;

      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const initial =
        saved === "dark" || (!saved && prefersDark) ? "dark" : "light";
      setTheme(initial);

      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", initial === "dark");
      }

      setReady(true);
    } catch (err) {
      console.error("Theme initialization error:", err);
      setReady(true);
    }
  }, []);

  /**
   * Toggles between light and dark themes.
   * Updates both local state and the `localStorage` key for persistence.
   * Ensures DOM class synchronization to apply Tailwind's dark mode immediately.
   */
  const toggleTheme = () => {
    try {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);

      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
      }

      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      }
    } catch (err) {
      console.error("Theme toggle error:", err);
    }
  };

  // Avoid rendering before initial theme detection completes
  if (!ready) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle light / dark theme"
      className="flex items-center gap-2 px-3 py-1 rounded-lg 
                 bg-gray-100 dark:bg-gray-700 
                 text-gray-800 dark:text-gray-100 
                 hover:bg-gray-200 dark:hover:bg-gray-600 
                 transition"
    >
      {theme === "light" ? (
        <>
          <Moon className="w-4 h-4" />
          <span className="hidden sm:inline">Dark</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4" />
          <span className="hidden sm:inline">Light</span>
        </>
      )}
    </button>
  );
}
