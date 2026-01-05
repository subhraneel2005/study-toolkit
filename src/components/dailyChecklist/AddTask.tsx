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
  DialogDescription,
} from "@/components/ui/dialog";
import { NewTask, Priority } from "@/zodSchemas/dailyChecklistSchema";
import dayjs from "dayjs";
import { Task } from "@/app/generated/prisma/client";
import { addTask } from "@/app/actions/addTask";
import { toast } from "sonner";
import { toggleTaskCompletetion } from "@/app/actions/toggleTaskCompletion";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

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

  const [open, setOpen] = useState(false);

  const formattedDate = dayjs(currentDate).format("DD MMM YYYY");

  const router = useRouter();

  const handleCreateNewTask = async () => {
    if (taskContent === "") {
      toast.error("Task cannot be emopty!");
      return;
    }
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
      setOpen(false);
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
            <div className="flex flex-row gap-4 justify-start items-center">
              <CardTitle className="text-xl font-bold tracking-[-1.5px]">
                My Tasks
              </CardTitle>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    aria-label="Add Task"
                    className="flex gap-2 items-center"
                  >
                    Add new
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to add a task to your list.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    {/* Task Input Group */}
                    <div className="grid gap-2">
                      <Input
                        id="task"
                        type="text"
                        placeholder="What needs to be done?"
                        value={taskContent}
                        onChange={(e) => setTaskContent(e.target.value)}
                        className="col-span-3"
                        autoFocus
                      />
                    </div>

                    {/* Settings Group */}
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Priority
                        </p>
                        <Select
                          value={priority}
                          onValueChange={(value: Priority) =>
                            setPriority(value)
                          }
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Set Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="HIGH">🔴 High</SelectItem>
                            <SelectItem value="MEDIUM">🟡 Medium</SelectItem>
                            <SelectItem value="LOW">🔵 Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="sm:justify-start flex-row gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !taskContent.trim()}
                      onClick={handleCreateNewTask}
                    >
                      {loading ? (
                        <>
                          <Spinner className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        "Add Task"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
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
