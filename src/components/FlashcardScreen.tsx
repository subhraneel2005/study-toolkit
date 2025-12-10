"use client";

import useFlashcardsStore from "@/stores/useFlashcardStore";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import React, { useState } from "react";
import FlashCard from "./Flashcard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function FlashcardScreen() {
  const { flashcards, clearFlashcards } = useFlashcardsStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDispose = () => {
    clearFlashcards();
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Your Flashcards
            </h2>
            <p className="text-muted-foreground">
              Card {currentIndex + 1} of {flashcards.length}
            </p>
          </div>

          <Button
            onClick={handleDispose}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Dispose All
          </Button>
        </div>

        {/* Flashcard Container */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Previous Button */}
          <Button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            size="icon"
            variant="secondary"
            className="rounded-full shadow disabled:opacity-0 disabled:cursor-default"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </Button>

          {/* Flashcard */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex justify-center"
            >
              <FlashCard flashcard={flashcards[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            size="icon"
            variant="secondary"
            className="rounded-full shadow disabled:opacity-0 disabled:cursor-default"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2">
          {flashcards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Hint */}
        <p className="text-center text-muted-foreground mt-8">
          Click on the card to flip it
        </p>
      </div>
    </div>
  );
}
