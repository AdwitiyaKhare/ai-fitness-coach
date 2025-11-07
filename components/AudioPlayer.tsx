// components/AudioPlayer.tsx
"use client";
import { useState } from "react";

interface AudioPlayerProps {
  text: string;
}

export default function AudioPlayer({ text }: AudioPlayerProps) {
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={speaking ? stop : speak}
        className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {speaking ? "Stop" : "Read My Plan"}
      </button>
    </div>
  );
}
