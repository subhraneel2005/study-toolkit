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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewTask, Priority } from "@/zodSchemas/dailyChecklistSchema";
import dayjs from "dayjs";
import { Task } from "@/app/generated/prisma/client";
import { addTask } from "@/app/actions/addTask";
import { toast } from "sonner";
import { toggleTaskCompletetion } from "@/app/actions/toggleTaskCompletion";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

const PRIORITY_STYLES: Record<Priority, string> = {
  HIGH: "text-red-800 bg-red-300 border-red-200 hover:bg-red-100 hover:border-red-300",
  MEDIUM:
    "text-orange-800 bg-orange-300 border-orange-200 hover:bg-orange-100 hover:border-orange-300",
  LOW: "text-green-800 bg-green-300 border-green-200 hover:bg-green-100 hover:border-green-300",
};

export default function AddTaskScreen({
  currentDate,
  allTasks,
}: {
  currentDate: Date;
  allTasks: Task[];
}) {
  const [taskContent, setTaskContent] = useState<NewTask["taskContent"]>("");
  const [priority, setPriority] = useState<NewTask["priority"]>("HIGH");
  const [loading, setLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);

  const [openDialogTaskId, setOpenDialogTaskId] = useState<string | null>(null);

  const formattedDate = dayjs(currentDate).format("DD MMM YYYY");

  const router = useRouter();

  const handleCreateNewTask = async () => {
    try {
      setLoading(true);
      await addTask({
        taskContent: taskContent,
        priority: priority,
      });
      router.refresh();
      setTaskContent("");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId: string, isCompleted: boolean) => {
    try {
      setToggleLoading(true);
      await toggleTaskCompletetion({
        isCompleted: isCompleted,
        taskId: taskId,
      });
      toast.success("Task updated", {
        description: isCompleted
          ? "Congratulations! You just completed a milestone!"
          : "Task marked as incomplete",
      });
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      console.error(error);
    } finally {
      setToggleLoading(false);
      setOpenDialogTaskId(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <header className="space-y-1">
          <h2 className="text-3xl font-bold text-foreground tracking-[-1.4px]">
            Daily Checklist
          </h2>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </header>

        {/* Main Card */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input Area */}
            <div className="md:flex flex-col space-y-2 w-full items-center gap-2">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={taskContent}
                onChange={(e) => setTaskContent(e.target.value)}
                className="flex-1 py-3"
              />

              <div className="flex gap-2 justify-start w-full">
                <Select
                  value={priority}
                  onValueChange={(value: Priority) => setPriority(value)}
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

                <Button
                  disabled={loading}
                  onClick={() => handleCreateNewTask()}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <span>Adding</span>
                      <Spinner />
                    </div>
                  ) : (
                    "Add"
                  )}
                </Button>
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {allTasks.length === 0 && (
                <p className="text-sm text-muted-foreground italic text-center py-4">
                  No tasks planned for today.
                </p>
              )}

              {allTasks.map((task) => (
                <div
                  key={task.id}
                  className="group flex items-center space-x-3 p-2 rounded-md hover:bg-muted/40 transition-colors"
                >
                  <Dialog
                    open={openDialogTaskId === task.id}
                    onOpenChange={(isOpen) =>
                      setOpenDialogTaskId(isOpen ? task.id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Checkbox id={task.id} checked={task.isCompleted} />
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Did you{" "}
                          {task.isCompleted ? "want to undo" : "finished"} this
                          task?
                        </DialogTitle>
                      </DialogHeader>

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setOpenDialogTaskId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant={task.isCompleted ? `destructive` : `default`}
                          disabled={toggleLoading}
                          onClick={() =>
                            handleToggleTask(task.id, !task.isCompleted)
                          }
                        >
                          {toggleLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <span>Updating status</span>
                              <Spinner />
                            </div>
                          ) : task.isCompleted ? (
                            "Mark as not completed"
                          ) : (
                            "Mark as completed"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Priority Badge */}
                  <Badge
                    variant="outline"
                    className={`text-[10px] uppercase tracking-wider h-5 px-1.5 ${
                      task.isCompleted
                        ? "border-transparent bg-muted text-muted-foreground line-through opacity-50"
                        : PRIORITY_STYLES[task.priority]
                    }`}
                  >
                    {task.priority}
                  </Badge>

                  <Label
                    htmlFor={task.id}
                    className={`text-sm font-normal leading-none cursor-pointer flex-1 ${
                      task.isCompleted
                        ? "text-muted-foreground line-through opacity-50"
                        : "text-foreground"
                    }`}
                  >
                    {task.taskContent}
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
