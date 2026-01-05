import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { headers } from "next/headers";
import { z } from "zod";

export async function POST(req: Request) {
  const { topic } = await req.json();

  if (!topic || typeof topic !== "string") {
    return new Response("Invalid topic", {
      status: 400,
    });
  }

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

  try {
    const { object } = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: z.object({
        flashcards: z.array(
          z.object({
            id: z.number(),
            question: z.string(),
            answer: z.string(),
          })
        ),
      }),
      prompt: `Generate 10 educational flashcards about: ${topic}. 
      
      Create clear, concise questions with concise accurate answers. 
      Each flashcard should test understanding of a key concept.
      Make the questions progressively challenging.`,
    });

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        credits: {
          decrement: 10,
        },
      },
    });

    return new Response(JSON.stringify(object, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("INTERNAL_ERROR_AT_FLASHCARDS_ROUTE" + error);
    throw new Error("INTERNAL_ERROR_AT_FLASHCARDS_ROUTE");
  }
}
