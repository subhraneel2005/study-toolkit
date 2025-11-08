import { tool } from "ai";
import { z } from "zod";

export const summarizerTool = tool({
  name: "summarizer",
  description: "Summarizes long text into a specified tone.",
  inputSchema: z.object({
    text: z
      .string()
      .min(50)
      .describe(
        "The text content to summarize. Should be at least 50 characters."
      ),
    tone: z
      .enum([
        "neutral",
        "formal",
        "casual",
        "friendly",
        "professional",
        "academic",
        "concise",
      ])
      .default("neutral")
      .describe("Tone of the summary to be generated."),
  }),
  execute: async ({ text, tone }) => {
    // Tool just returns the data needed - no LLM call
    return {
      text,
      tone,
      action: "summarize",
    };
  },
});
