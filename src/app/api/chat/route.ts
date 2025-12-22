import { GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
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

  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: provider("gemini-2.5-flash"),
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

  return result.toUIMessageStreamResponse();
}
