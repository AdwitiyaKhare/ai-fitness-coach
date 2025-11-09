import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

/**
 * Application metadata used by Next.js to set the page title and description.
 * This information is embedded in the document head for SEO and browser display.
 */
export const metadata: Metadata = {
  title: "AI Fitness Coach",
  description:
    "AI-powered fitness and diet plan generator built by Adwitiya Khare.",
};

/**
 * The RootLayout component defines the global structure and styling
 * for every page in the application. It includes shared layout elements
 * such as the navigation bar and global background colors.
 *
 * The `suppressHydrationWarning` flag prevents React from showing
 * warnings during client-side hydration when dark/light mode classes
 * differ between server and client renders.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-14">
        {/* The navigation bar remains fixed at the top across all pages */}
        <Navbar />

        {/* The main content of each page is rendered here */}
        {children}
      </body>
    </html>
  );
}
