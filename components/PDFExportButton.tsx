"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";

/**
 * PDFExportButton
 *
 * A simple and reliable export button that triggers the browser's
 * native print-to-PDF dialog. This preserves the exact page styling,
 * including Tailwind layouts, gradients, and dark mode colors.
 *
 * Unlike html2canvas + jsPDF, this approach ensures:
 *  - Pixel-perfect PDF (same as browser rendering)
 *  - Proper text rendering (not rasterized)
 *  - Full CSS and responsive design support
 */
export default function PDFExportButton() {
  const [downloading, setDownloading] = useState(false);

  const handleExport = async () => {
    try {
      setDownloading(true);

      // Scroll to top to ensure full content is visible for print
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Add a small delay to let scroll finish and content stabilize
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Trigger browser's print dialog
      window.print();
    } catch (err) {
      console.error("Print/PDF export failed:", err);
      alert("Unable to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={downloading}
      className={`px-5 py-2 mt-4 rounded-lg font-medium shadow-md flex items-center justify-center gap-2 transition-all ${
        downloading
          ? "bg-gray-400 cursor-not-allowed text-white"
          : "bg-purple-600 hover:bg-purple-700 text-white"
      }`}
    >
      <FileDown className="w-5 h-5" />
      {downloading ? "Preparing..." : "Export as PDF"}
    </button>
  );
}
