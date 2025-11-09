"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import {
  Dumbbell,
  Github,
  Linkedin,
  Globe,
  Phone,
  Mail,
  Code,
} from "lucide-react";

/**
 * Navbar Component
 *
 * This is a responsive navigation bar that appears at the top of every page.
 * It provides quick access to key links like GitHub, LinkedIn, Portfolio, LeetCode,
 * as well as contact options such as phone and email.
 *
 * It also integrates the ThemeToggle component inline to allow users
 * to easily switch between light and dark modes without layout overlap.
 *
 * The component uses Lucide React icons for a clean, minimal, and scalable visual style.
 * On smaller screens, text labels for links are hidden to maintain compact spacing.
 */
export default function Navbar() {
  return (
    <nav className="w-full bg-white dark:bg-gray-800 py-3 px-6 flex flex-wrap justify-between items-center shadow-md fixed top-0 z-50">
      {/* Brand section with icon and app title */}
      <Link
        href="/"
        className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2"
      >
        <Dumbbell className="w-5 h-5 text-blue-600" />
        <span>AI Fitness Coach</span>
      </Link>

      {/* Navigation links and theme toggle */}
      <div className="flex items-center gap-4">
        {/* External links section */}
        <div className="flex flex-wrap gap-3 items-center text-gray-600 dark:text-gray-300 text-sm">
          {/* GitHub profile */}
          <Link
            href="https://github.com/AdwitiyaKhare"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>

          {/* LinkedIn profile */}
          <Link
            href="https://linkedin.com/in/adwitiyakhare"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <Linkedin className="w-4 h-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </Link>

          {/* Personal portfolio link */}
          <Link
            href="https://adwitiyakhare.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>

          {/* LeetCode profile link */}
          <Link
            href="https://leetcode.com/u/adwitiyakhare/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">LeetCode</span>
          </Link>

          {/* Phone contact */}
          <Link
            href="tel:+919993256153"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+91 99932 56153</span>
          </Link>

          {/* Email contact */}
          <Link
            href="mailto:adwitiyakhare222004@gmail.com"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Email</span>
          </Link>
        </div>

        {/* Inline ThemeToggle to avoid fixed positioning or overlap issues */}
        <div className="ml-3">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
