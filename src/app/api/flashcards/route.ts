import { auth } from "@/lib/auth";
import { decryptOnServer } from "@/lib/decryptOnServer";
import { prisma } from "@/lib/prisma";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
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
  const encryptedGeminiKey = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      geminiKey: true,
    },
  });

  if (!encryptedGeminiKey) {
    throw new Error("PLEASE_PROPERLY_SET_YOUR_GEMINI_KEY");
  }

  const decryptedGeminiKey = decryptOnServer(encryptedGeminiKey.geminiKey!);

  const provider = createGoogleGenerativeAI({ apiKey: decryptedGeminiKey });
  provider("gemini-2.5-flash");

  const { object } = await generateObject({
    model: provider("gemini-2.5-flash"),
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
    
    Create clear, concise questions with accurate answers. 
    Each flashcard should test understanding of a key concept.
    Make the questions progressively challenging.`,
  });

  return new Response(JSON.stringify(object, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
