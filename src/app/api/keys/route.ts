import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const { geminiKey, serperKey } = await req.json();

  try {
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }
    const findUserInDb = await prisma.user.findUnique({
      where: { email: user?.email },
    });

    if (!findUserInDb) {
      return NextResponse.json(
        {
          message: "User is not added in database",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.user.update({
      where: {
        email: findUserInDb?.email,
      },
      data: {
        geminiKey: geminiKey,
        serperKey: serperKey,
      },
    });

    return NextResponse.json({ message: "API Keys updated" }, { status: 201 });
  } catch (error) {
    console.error("Internal server error at keys route", error);
    return NextResponse.json(
      { message: "Internal server error at keys route" + "\nError" + error },
      { status: 500 }
    );
  }
}
