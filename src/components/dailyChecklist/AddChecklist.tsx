"use client";

import React, { useState } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Calendar, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewTask, Priority } from "@/zodSchemas/dailyChecklistSchema";
import { addChecklist } from "@/app/actions/addChecklist";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export default function AddChecklist({ currentDate }: { currentDate: Date }) {
  const [taskContent, setTaskContent] = useState<NewTask["taskContent"]>("");
  const [priority, setPriority] = useState<NewTask["priority"]>("HIGH");
  const [loading, setLoading] = useState(false);

  const handleCreateChecklist = async () => {
    try {
      setLoading(true);
      await addChecklist({
        date: currentDate,
        tasks: [
          {
            taskContent: taskContent,
            priority: priority,
          },
        ],
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
    <div className="min-h-screen w-full flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Calendar />
          </EmptyMedia>
          <EmptyTitle>No daily checklist for today</EmptyTitle>
          <EmptyDescription>
            Get started by creating today&apos;s checklist.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Checklist
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create today&apos;s first task</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <Input
                  placeholder="Task content"
                  name="taskContent"
                  required
                  value={taskContent}
                  onChange={(e) => setTaskContent(e.target.value)}
                />

                <Select
                  defaultValue={priority}
                  onValueChange={(value: Priority) => setPriority(value)}
                  name="priority"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  disabled={loading}
                  onClick={() => handleCreateChecklist()}
                  className="w-full"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <span>Creating</span>
                      <Spinner />
                    </div>
                  ) : (
                    "Create Checklist"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </EmptyContent>
      </Empty>
    </div>
  );
}
