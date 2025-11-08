import { summarizerTool } from "@/tools/summarizer";
import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system:
        "You are a helpful assistant that can summarize text in various tones.",
      messages: convertToModelMessages(messages),
      tools: { summarizer: summarizerTool },
      stopWhen: stepCountIs(5),
      providerOptions: {
        google: {
          thinkingConfig: {
            includeThoughts: true,
          },
        } satisfies GoogleGenerativeAIProviderOptions,
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
