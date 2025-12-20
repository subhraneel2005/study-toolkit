"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  TaskToggle,
  taskToggleSchema,
} from "@/zodSchemas/dailyChecklistSchema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function toggleTaskCompletetion(payload: TaskToggle) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  const parsed = taskToggleSchema.safeParse(payload);

  if (!parsed.success) {
    throw new Error("INVALID_INPUT");
  }

  try {
    //verifying ownership
    const task = await prisma.task.findUnique({
      where: {
        id: parsed.data.taskId,
        dailyChecklist: {
          userId: session.user.id,
        },
      },
    });

    if (!task) {
      throw new Error("TASK_NOT_FOUND");
    }

    await prisma.task.update({
      where: {
        id: parsed.data.taskId,
      },
      data: {
        isCompleted: parsed.data.isCompleted,
      },
    });

    revalidatePath("/tools/dailyChecklist");
    return { success: true };
  } catch (error) {
    console.error("createDailyChecklist error:", error);
    throw new Error("DATABASE_ERROR");
  }
}
