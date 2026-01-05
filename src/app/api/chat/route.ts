import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { decryptOnServer } from "@/lib/decryptOnServer";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  const userCredits = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      credits: true,
    },
  });

  if (!userCredits?.credits) {
    throw new Error("CREDITS_NOT_FOUND_FOR_THIS_USER");
  }

  if (userCredits.credits <= 0) {
    throw new Error("CREDITS_ARE_ZERO, LIMIT_REACHED");
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  try {
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: "You are a helpful assistant",
      messages: convertToModelMessages(messages),
      providerOptions: {
        google: {
          thinkingConfig: {
            includeThoughts: true,
          },
        } satisfies GoogleGenerativeAIProviderOptions,
      },
    });

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        credits: {
          decrement: 5,
        },
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("INTERNAL_ERROR_AT_CHAT_ROUTE" + error);
    throw new Error("INTERNAL_ERROR_AT_CHAT_ROUTE");
  }
}
