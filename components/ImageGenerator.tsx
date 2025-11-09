// components/ImageGenerator.tsx
"use client";

import { useState } from "react";

/**
 * ImageGenerator Component
 *
 * This component is responsible for generating a relevant image
 * based on the given `prompt` using the backend image generation API.
 *
 * When the user clicks the "Generate Image" button, it sends a request
 * to the `/api/image` endpoint, retrieves the AI-generated image,
 * and displays it once ready.
 */
export default function ImageGenerator({ prompt }: { prompt: string }) {
  // Holds the generated image URL or null if no image is available
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  // Indicates whether an image is currently being generated
  const [loading, setLoading] = useState(false);

  /**
   * Sends the input prompt to the backend API and retrieves the image.
   * Displays a loading state while the image is being generated.
   * If an error occurs, the user is notified with an alert.
   */
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

  /**
   * Renders either the generated image or the "Generate Image" button,
   * depending on the current state.
   * The button is disabled during image generation to prevent multiple requests.
   */
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
          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Loading..." : "Generate Image"}
        </button>
      )}
    </div>
  );
}
