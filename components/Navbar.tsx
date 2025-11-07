// components/Navbar.tsx
"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white dark:bg-gray-800 py-3 px-6 flex justify-between items-center shadow-md fixed top-0 z-50">
      <Link href="/" className="text-lg font-semibold">
        💪 AI Fitness Coach
      </Link>
      <div className="text-sm text-gray-500 dark:text-gray-300">
        by Adwitiya Khare
      </div>
    </nav>
  );
}
