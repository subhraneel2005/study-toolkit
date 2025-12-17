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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  CATEGORIES,
  Category,
  DailyLog,
  dailyLogSchema,
} from "@/zodSchemas/dailyLog.schema";
import { createDailyLog } from "@/app/actions/createDailyLog";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export default function DailyLogScreen() {
  const [logContent, setLogContent] = useState<DailyLog["log"]>("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const currentDate = dayjs().tz(userTimezone).startOf("day").toDate();
  const formattedDate = dayjs(currentDate).format("DD MMM YYYY");

  const handleSubmitLog = async () => {
    try {
      setLoading(true);
      await createDailyLog({
        log: logContent,
        categories: selectedCategories,
        date: currentDate,
      });
      toast.success("LOG ADDED", {
        description: "Daily log successfully added",
      });
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case "UNAUTHORIZED":
            toast.error("UNAUTHORIZED", {
              description: "Please login to perform this action",
            });
            break;

          case "INVALID_INPUT":
            toast.error("INVALID_INPUT", {
              description: "Invalid form data",
            });
            break;

          case "DATABASE_ERROR":
            toast.error("DATABASE_ERROR", {
              description: "Failed to save log",
            });
            break;

          default:
            toast.error("Something went wrong");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground tracking-[-1.4px]">
            Daily Log
          </h1>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
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
            <Button
              onClick={() => handleSubmitLog()}
              className="w-full"
              size="default"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span>Saving</span>
                  <Spinner />
                </div>
              ) : (
                "Save Log"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
