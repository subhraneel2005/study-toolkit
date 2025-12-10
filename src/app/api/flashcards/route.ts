import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { topic } = await req.json();

  if (!topic || typeof topic !== "string") {
    return new Response("Invalid topic", {
      status: 400,
    });
  }

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
    
    Create clear, concise questions with accurate answers. 
    Each flashcard should test understanding of a key concept.
    Make the questions progressively challenging.`,
  });

  return new Response(JSON.stringify(object, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
