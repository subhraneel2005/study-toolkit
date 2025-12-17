"use server";

import { prisma } from "@/lib/prisma";

export async function getTodayLog(userId: string, date: Date) {
  if (!userId || !date) {
    throw new Error("PAYLOAD_IS_MISSING");
  }
  try {
    const todayLog = await prisma.dailyLogs.findUnique({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
      include: {
        categories: true,
      },
    });

    if (!todayLog) {
      return null;
    }

    return todayLog;
  } catch (error) {
    console.error("getDailyLog error:", error);
    throw new Error("DATABASE_ERROR");
  }
}
