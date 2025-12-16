"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

const CATEGORIES = [
  "Deep Work",
  "Learning",
  "Meeting",
  "Planning",
  "Review",
  "Projects",
  "DSA",
];

export default function DailyLogScreen() {
  const [logContent, setLogContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [hasExistingLog, setHasExistingLog] = useState(false);

  // Simulation: Check for existing data on mount
  useEffect(() => {
    // In a real app, this would be an API call
    const mockExistingLog = {
      content: "", // Empty for this demo to show "Save", change to test "Update"
      categories: [],
    };

    if (mockExistingLog.content) {
      setLogContent(mockExistingLog.content);
      setSelectedCategories(mockExistingLog.categories);
      setHasExistingLog(true);
    }
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="min-h-screen w-full bg-background p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground tracking-[-1.4px]">
            Daily Log
          </h1>
          <p className="text-sm text-muted-foreground">{currentDate}</p>
        </header>

        {/* Main Card */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Reflection</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Text Input */}
            <div className="space-y-2">
              <Label htmlFor="log-content" className="sr-only">
                Log Content
              </Label>
              <Textarea
                id="log-content"
                placeholder="What did I accomplish today?"
                className="min-h-[240px] resize-y bg-transparent"
                value={logContent}
                onChange={(e) => setLogContent(e.target.value)}
              />
            </div>

            {/* Category Selector */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Categories</Label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => {
                  const isSelected = selectedCategories.includes(category);
                  return (
                    <Badge
                      key={category}
                      variant={isSelected ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/80 select-none px-3 py-1 font-normal transition-none"
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full" size="default">
              {hasExistingLog ? "Update Log" : "Save Log"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
