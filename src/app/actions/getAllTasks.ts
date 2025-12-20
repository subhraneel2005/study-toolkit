"use server";

import { prisma } from "@/lib/prisma";

export async function getAllTodayTasks(date: Date, userId: string) {
  if (!date || !userId) {
    throw new Error("INVALID_PAYLOAD");
  }

  try {
    const checklist = await prisma.dailyChecklist.findUnique({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
      include: {
        tasks: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!checklist) {
      return null;
    }

    return checklist.tasks;
  } catch (error) {
    console.error("getAllTodayTasks error: ", error);
    throw new Error("DATABASE_ERROR");
  }
}
