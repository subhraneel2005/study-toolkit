import { summarizerAgent } from "@/agents/summarizerAgent";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UIMessage } from "@ai-sdk/react";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    // 🧠 Get last user message
    const lastMessage = messages?.at(-1);
    if (!lastMessage) {
      return new Response("No message found", { status: 400 });
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

    // 🧩 Extract text and tone (we sent JSON.stringified)
    let parsed;
    try {
      parsed = JSON.parse(
        lastMessage.parts[0].type === "text" ? lastMessage.parts[0].text : ""
      );
    } catch {
      return new Response("Invalid message format", { status: 400 });
    }

    const { text, tone } = parsed;

    const summary = summarizerAgent.stream({
      prompt: `Please summarize the following text in a ${tone} tone: ${text}`,
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

    return summary.toUIMessageStreamResponse();
  } catch (error) {
    return new Response("Error generating summary", { status: 500 });
  }
}
