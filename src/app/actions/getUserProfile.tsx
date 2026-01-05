"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function getUserProfile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        email: true,
        credits: true,
        geminiKey: true,
        image: true,
        lastCreditsReset: true,
        accountCompleted: true,
        name: true,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("INTERNAL_SERVER_ERROR_AT_getting_user_profile");
  }
}
