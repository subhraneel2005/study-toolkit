"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Flashcard } from "@/stores/useFlashcardStore";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function FlashCard({ flashcard }: { flashcard: Flashcard }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full max-w-2xl h-80 cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <Card
          className="absolute w-full h-full bg-card border rounded-xl shadow-lg flex items-center justify-center p-8"
          style={{ backfaceVisibility: "hidden" }}
        >
          <CardContent className="text-center p-0">
            <div className="text-sm font-medium text-muted-foreground mb-4">
              QUESTION
            </div>
            <CardTitle className="text-xl font-semibold text-card-foreground">
              {flashcard.question}
            </CardTitle>
          </CardContent>
        </Card>

        {/* BACK */}
        <Card
          className="absolute w-full h-full bg-primary border border-primary rounded-xl shadow-lg flex items-center justify-center p-8"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CardContent className="text-center p-0">
            <div className="text-sm font-medium text-primary-foreground/70 mb-4">
              ANSWER
            </div>
            <CardTitle className="text-xl font-semibold text-primary-foreground">
              {flashcard.answer}
            </CardTitle>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
