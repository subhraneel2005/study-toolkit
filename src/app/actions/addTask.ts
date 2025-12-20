"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NewTask, singleTaskSchema } from "@/zodSchemas/dailyChecklistSchema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function addTask(payload: NewTask) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  const parsed = singleTaskSchema.safeParse(payload);

  if (!parsed.success) {
    throw new Error("INVALID_INPUT");
  }

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const todayDate = dayjs().tz(userTimezone).startOf("day").toDate();

  try {
    const todayChecklist = await prisma.dailyChecklist.findUnique({
      where: {
        userId_date: {
          userId: session.user.id,
          date: todayDate,
        },
      },
    });

    if (!todayChecklist) {
      throw new Error("TODAY_CHECKLIST_NOT_FOUND");
    }

    await prisma.task.create({
      data: {
        taskContent: parsed.data.taskContent,
        priority: parsed.data.priority,
        dailyChecklistId: todayChecklist.id,
      },
    });
    revalidatePath("/tools/dailyChecklist");
    return { success: true };
  } catch (error) {
    console.error("createDailyChecklist error:", error);
    throw new Error("DATABASE_ERROR");
  }
}
