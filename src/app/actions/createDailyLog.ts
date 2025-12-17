"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  CATEGORY_SLUG_MAP,
  DailyLog,
  dailyLogSchema,
} from "@/zodSchemas/dailyLog.schema";
import { headers } from "next/headers";

export async function createDailyLog(payload: DailyLog) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  const parsed = dailyLogSchema.safeParse(payload);

  if (!parsed.success) {
    throw new Error("INVALID_INPUT");
  }

  try {
    await prisma.dailyLogs.create({
      data: {
        userId: session.user.id,
        log: parsed.data.log,
        date: parsed.data.date,
        categories: {
          connect: parsed.data.categories.map((category) => ({
            slug: CATEGORY_SLUG_MAP[category],
          })),
        },
      },
    });
  } catch (error) {
    console.error("createDailyLog error:", error);
    throw new Error("DATABASE_ERROR");
  }
}
