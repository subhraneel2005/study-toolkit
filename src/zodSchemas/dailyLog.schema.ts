import z from "zod";

const CATEGORIES = [
  "DeepWork",
  "Learning",
  "Meeting",
  "Planning",
  "Review",
  "Projects",
  "DSA",
] as const;

const CATEGORY_SLUG_MAP = {
  DeepWork: "deep-work",
  Learning: "learning",
  Meeting: "meeting",
  Planning: "planning",
  Review: "review",
  Projects: "projects",
  DSA: "dsa",
} as const;

const CategoryEnum = z.enum(CATEGORIES);

const dailyLogSchema = z.object({
  log: z.string().min(3, { message: "Please enter a valid log" }),
  categories: z
    .array(CategoryEnum)
    .min(1, { message: "Please select at least one category" }),
  date: z.date(),
});

type DailyLog = z.infer<typeof dailyLogSchema>;
type Category = z.infer<typeof CategoryEnum>;

export { dailyLogSchema, CategoryEnum, CATEGORIES, CATEGORY_SLUG_MAP };
export type { DailyLog, Category };
