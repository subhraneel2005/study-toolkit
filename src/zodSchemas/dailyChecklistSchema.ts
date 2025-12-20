import z from "zod";

const PRIORITY = ["HIGH", "MEDIUM", "LOW"] as const;

const PriorityEnum = z.enum(PRIORITY);

const singleTaskSchema = z.object({
  priority: PriorityEnum.default("HIGH"),
  taskContent: z.string(),
});

const taskToggleSchema = z.object({
  isCompleted: z.boolean(),
  taskId: z.string(),
});

const dailyChecklistSchema = z.object({
  tasks: z.array(singleTaskSchema),
  date: z.date(),
});

type DailyChecklist = z.infer<typeof dailyChecklistSchema>;
type NewTask = z.infer<typeof singleTaskSchema>;
type Priority = z.infer<typeof PriorityEnum>;
type TaskToggle = z.infer<typeof taskToggleSchema>;

export type { NewTask, Priority, DailyChecklist, TaskToggle };
export { PRIORITY, singleTaskSchema, dailyChecklistSchema, taskToggleSchema };
