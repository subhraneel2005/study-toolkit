"use client";

import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface InputProps {
  onGenerate: (topic: string) => void;
  isLoading: boolean;
}

export default function FlashcardInputScreen({
  onGenerate,
  isLoading,
}: InputProps) {
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    if (topic.trim()) onGenerate(topic);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div>
          <Card className="rounded-2xl shadow-xl">
            <CardContent className="p-8">
              <h1 className="text-3xl font-bold text-foreground mb-2 text-center tracking-[-1.5px]">
                Flashcard Generator
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                Enter a topic to generate 10 educational flashcards
              </p>

              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="topic"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Topic
                  </Label>

                  <Input
                    id="topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g., Photosynthesis, WW2, Machine Learning"
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !topic.trim()}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Flashcards"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
