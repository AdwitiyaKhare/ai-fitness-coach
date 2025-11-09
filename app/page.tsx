// app/page.tsx
import InputForm from "@/components/InputForm";

/**
 * The HomePage component serves as the entry point of the application.
 * It renders the InputForm component, where users can provide personal
 * details such as age, weight, goals, and dietary preferences.
 *
 * The collected information is later used to generate a personalized
 * AI-powered fitness and diet plan.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      {/* The InputForm component is centered both vertically and horizontally */}
      <InputForm />
    </main>
  );
}
