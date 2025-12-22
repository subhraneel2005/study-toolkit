"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { fillMissingDays } from "@/lib/fillMissingDates";
import { headers } from "next/headers";

dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(timezone);

export type HeatmapType = {
  date: string;
  count: number;
};

export async function getAllDates(): Promise<HeatmapType[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  try {
    const [checklists, dailyLogs] = await Promise.all([
      prisma.dailyChecklist.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          date: true,
          _count: {
            select: {
              tasks: {
                where: {
                  isCompleted: true,
                },
              },
            },
          },
        },
      }),
      prisma.dailyLogs.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          _count: true,
          date: true,
        },
      }),
    ]);

    const map = new Map<string, number>();

    // checklist
    for (const checklist of checklists) {
      const dateKey = dayjs(checklist.date)
        .tz(userTimezone)
        .format("YYYY/MM/DD");

      map.set(dateKey, (map.get(dateKey) ?? 0) + checklist._count.tasks);
    }

    //dailylogs (1 log = 1 contribution)
    for (const log of dailyLogs) {
      const dateKey = dayjs(log.date).tz(userTimezone).format("YYYY/MM/DD");
      map.set(dateKey, (map.get(dateKey) ?? 0) + 1);
    }

    const aggregated = Array.from(map.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return fillMissingDays(aggregated, userTimezone);
  } catch (error) {
    console.error("getAllDates error: ", error);
    throw new Error("DATABASE_ERROR");
  }
}
