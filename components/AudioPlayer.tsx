"use client";

import { useState } from "react";

/**
 * Props definition for the AudioPlayer component.
 * The component expects a single prop — the text string to be read aloud.
 */
interface AudioPlayerProps {
  text: string;
}

/**
 * AudioPlayer is a client-side component that uses the browser’s
 * built-in Web Speech API to convert text into speech.
 *
 * It allows the user to play or stop the narration of the provided text.
 * This feature is used to read the AI-generated fitness plan aloud
 * for accessibility and a more engaging user experience.
 */
export default function AudioPlayer({ text }: AudioPlayerProps) {
  const [speaking, setSpeaking] = useState(false);

  /**
   * Initiates speech synthesis using the browser's native SpeechSynthesis API.
   * Configures voice parameters like rate, pitch, and language for natural delivery.
   * Cancels any existing speech before starting a new one to prevent overlap.
   */
  const speak = () => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.lang = "en-US";

    // When narration completes, update the state
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);

    // Stop any current speech before starting new narration
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  /**
   * Stops the current speech immediately and resets the state.
   * This allows users to interrupt the narration at any point.
   */
  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  /**
   * Renders a single button that toggles between "Read" and "Stop" states
   * depending on whether speech is currently active.
   */
  return (
    <div className="flex gap-2 mt-4 justify-center">
      <button
        onClick={speaking ? stop : speak}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {speaking ? "Stop Reading" : "Read Full Plan"}
      </button>
    </div>
  );
}
