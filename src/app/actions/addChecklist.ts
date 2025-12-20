"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  DailyChecklist,
  dailyChecklistSchema,
} from "@/zodSchemas/dailyChecklistSchema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function addChecklist(payload: DailyChecklist) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  const parsed = dailyChecklistSchema.safeParse(payload);

  if (!parsed.success) {
    throw new Error("INVALID_INPUT");
  }

  try {
    await prisma.dailyChecklist.create({
      data: {
        userId: session.user.id,
        date: parsed.data.date,
        tasks: {
          create: parsed.data.tasks.map((task) => ({
            taskContent: task.taskContent,
            priority: task.priority,
          })),
        },
      },
    });

    revalidatePath("/tools/dailyChecklist");
    return { success: true };
  } catch (error) {
    console.error("createDailyChecklist error:", error);
    throw new Error("DATABASE_ERROR");
  }
}
