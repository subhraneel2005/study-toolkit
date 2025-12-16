"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Priority = "HIGH" | "MEDIUM" | "LOW";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
}

// Color mappings using standard Tailwind utilities
const PRIORITY_STYLES: Record<Priority, string> = {
  HIGH: "text-red-800 bg-red-300 border-red-200 hover:bg-red-100 hover:border-red-300",
  MEDIUM:
    "text-orange-800 bg-orange-300 border-orange-200 hover:bg-orange-100 hover:border-orange-300",
  LOW: "text-green-800 bg-green-300 border-green-200 hover:bg-green-100 hover:border-green-300",
};

export default function DailyChecklistScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      text: "Fix critical production bug",
      completed: false,
      priority: "HIGH",
    },
    { id: "2", text: "Update documentation", completed: true, priority: "LOW" },
  ]);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("MEDIUM");

  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: crypto.randomUUID(),
      text: newTask,
      completed: false,
      priority: newPriority,
    };
    // Add new task to the top of the list
    setTasks([task, ...tasks]);
    setNewTask("");
    setNewPriority("MEDIUM"); // Reset to default
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="min-h-screen w-full bg-background p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground tracking-[-1.4px]">
            Daily Checklist
          </h1>
          <p className="text-sm text-muted-foreground">{currentDate}</p>
        </header>

        {/* Main Card */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input Area */}
            <div className="flex w-full items-center gap-2">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />

              <Select
                value={newPriority}
                onValueChange={(val: Priority) => setNewPriority(val)}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>

              <Button type="submit" onClick={addTask}>
                Add
              </Button>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {tasks.length === 0 && (
                <p className="text-sm text-muted-foreground italic text-center py-4">
                  No tasks planned for today.
                </p>
              )}

              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="group flex items-center space-x-3 p-2 rounded-md hover:bg-muted/40 transition-colors"
                >
                  <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />

                  {/* Priority Badge */}
                  <Badge
                    variant="outline"
                    className={`text-[10px] uppercase tracking-wider h-5 px-1.5 ${
                      task.completed
                        ? "border-transparent bg-muted text-muted-foreground line-through opacity-50"
                        : PRIORITY_STYLES[task.priority]
                    }`}
                  >
                    {task.priority}
                  </Badge>

                  <Label
                    htmlFor={task.id}
                    className={`text-sm font-normal leading-none cursor-pointer flex-1 ${
                      task.completed
                        ? "text-muted-foreground line-through opacity-50"
                        : "text-foreground"
                    }`}
                  >
                    {task.text}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
