"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function removeGeminiKey() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        geminiKey: null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("createDailyChecklist error:", error);
    throw new Error("DATABASE_ERROR");
  }
}
