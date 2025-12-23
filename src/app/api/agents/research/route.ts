import { NextResponse } from "next/server";
import { webSearchAgent } from "@/agents/researchAgent";

export async function POST(req: Request) {
  const { query } = await req.json();

  const searchPrompt = `Perform a websearch on the latest news on ${query}
    `;

  try {
    const stream = webSearchAgent.stream({ prompt: searchPrompt });
    return new Response(stream.textStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    console.error("Research stream error:", err);
    return NextResponse.json(
      { error: "Failed to perform research." },
      { status: 500 }
    );
  }
}
