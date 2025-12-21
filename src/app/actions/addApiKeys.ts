"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiKeysPayload, apiKeysSchema } from "@/zodSchemas/apikeysSchema";
import { headers } from "next/headers";

export async function addApiKey(payload: ApiKeysPayload) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  const parsed = apiKeysSchema.safeParse(payload);

  if (!parsed.success) {
    throw new Error("INVALID_INPUT");
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        geminiKey: parsed.data.geminiKey,
        serperKey: parsed.data.serperKey,
        accountCompleted: true,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("addApiKeys error:", error);
    throw new Error("DATABASE_ERROR");
  }
}
