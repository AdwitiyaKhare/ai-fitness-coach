import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AI Fitness Coach",
  description:
    "AI-powered fitness & diet plan generator built by Adwitiya Khare",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-14">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
