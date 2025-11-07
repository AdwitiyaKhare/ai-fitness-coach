// components/PDFExportButton.tsx
"use client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PDFExportButton() {
  const handleExport = async () => {
    const planElement = document.getElementById("plan-content");
    if (!planElement) return alert("Plan not found!");

    const canvas = await html2canvas(planElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("AI_Fitness_Plan.pdf");
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-1 mt-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
    >
      Export as PDF
    </button>
  );
}
