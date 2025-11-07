// components/ImageGenerator.tsx
"use client";
import { useState } from "react";

export default function ImageGenerator({ prompt }: { prompt: string }) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setImgUrl(data.image);
    } catch {
      alert("Error generating image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={prompt}
          className="rounded-xl border shadow-md max-h-48 object-cover"
        />
      ) : (
        <button
          onClick={generateImage}
          disabled={loading}
          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          {loading ? "Loading..." : "Generate Image"}
        </button>
      )}
    </div>
  );
}
