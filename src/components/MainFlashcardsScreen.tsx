"use client";

import useFlashcardsStore from "@/stores/useFlashcardStore";
import React, { useState } from "react";
import FlashcardInputScreen from "./FlashcardInputScreen";
import FlashcardScreen from "./FlashcardScreen";

export default function MainFlashcardsScreen() {
  const { flashcards, setFlashcards } = useFlashcardsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateFlashcards = async (topic: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data.flashcards);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setFlashcards([]);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (flashcards.length > 0) {
    return <FlashcardScreen />;
  }

  return (
    <FlashcardInputScreen
      onGenerate={generateFlashcards}
      isLoading={isLoading}
    />
  );
}
