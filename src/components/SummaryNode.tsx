/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Check,
  CopyCheck,
  CopyCheckIcon,
  CopyIcon,
  Loader2,
  RefreshCcwIcon,
  SendIcon,
  Sparkles,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "./ui/input-group";

import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { PromptInputMessage } from "./ai-elements/prompt-input";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from "./ai-elements/message";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

enum Status {
  NEUTRAL = "neutral",
  FORMAL = "formal",
  CASUAL = "casual",
  FRIENDLY = "friendly",
  PROFESSIONAL = "professional",
  ACADEMIC = "academic",
  CONCISE = "concise",
}

const SummaryNode = ({ data }: any) => {
  const [loading, setLoading] = useState(false);
  const [toneStatus, setToneStatus] = useState<Status>(Status.NEUTRAL);
  const [input, setInput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const tones = Object.values(Status);
  const firstRow = tones.slice(0, 4);
  const secondRow = tones.slice(4);

  const maxLength = 5000;

  const { messages, setMessages, status, sendMessage, regenerate, stop } =
    useChat({
      transport: new DefaultChatTransport({
        api: "/api/agents/summary",
      }),
    });

  const handleSummarize = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      sendMessage({
        role: "user",
        parts: [
          {
            type: "text",
            text: JSON.stringify({
              text: input,
              tone: toneStatus,
            }),
          },
        ],
      });

      setInput("");
    } catch (error) {
      console.error("Error summarizing text:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    } finally {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };

  return (
    <Card className="w-[360px] md:w-[500px] shadow-md border-muted bg-card mt-16">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          {data?.defaultData.label}
        </CardTitle>
        <CardDescription className="text-xs">
          {data?.description}
        </CardDescription>
        <Alert className="bg-blue-500/5 border-blue-500/20">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <AlertTitle className="text-sm font-semibold">
            Generation Info
          </AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground">
            Summarizing a long text costs{" "}
            <span className="font-bold text-foreground">5 credits</span>
          </AlertDescription>
        </Alert>
      </CardHeader>

      {messages.length === 0 ? (
        <CardContent className="flex flex-col gap-2 items-center">
          <div className="space-y-1 w-full">
            <Label className="items-start justify-start w-full flex mb-2">
              Select tone
            </Label>
            <ButtonGroup className="flex flex-wrap justify-start items-start w-full">
              {firstRow.map((tone) => (
                <Button
                  key={tone}
                  onClick={() => setToneStatus(tone)}
                  size="sm"
                  variant={toneStatus === tone ? "default" : "outline"}
                >
                  {tone === "neutral" && "😐 Neutral"}
                  {tone === "formal" && "🎩 Formal"}
                  {tone === "casual" && "🧢 Casual"}
                  {tone === "friendly" && "😊 Friendly"}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup className="flex flex-wrap gap-2 justify-start items-start w-full">
              {secondRow.map((tone) => (
                <Button
                  key={tone}
                  onClick={() => setToneStatus(tone)}
                  size="sm"
                  variant={toneStatus === tone ? "default" : "outline"}
                >
                  {tone === "professional" && "💼 Professional"}
                  {tone === "academic" && "📚 Academic"}
                  {tone === "concise" && "✂️ Concise"}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <Label className="items-start justify-start w-full flex mt-4">
            Enter text
          </Label>
          <InputGroup className="bg-background w-full">
            <InputGroupTextarea
              className="min-h-[100px] max-h-[200px] overflow-y-auto resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={maxLength}
              placeholder="Long text goes here..."
            />
            <InputGroupAddon align="block-end">
              <InputGroupText>
                {input.length}/{maxLength}
              </InputGroupText>
              <InputGroupButton
                onClick={handleSummarize}
                className="ml-auto"
                size="sm"
                variant="default"
              >
                Summarize
                <SendIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </CardContent>
      ) : (
        <CardContent className="flex flex-col gap-2 items-center w-full">
          {messages
            .filter((message) => message.role === "assistant")
            .map((message) => (
              <div key={message.id} className="w-full">
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <MessageContent>
                          <MessageResponse key={`${message.id}-${i}`}>
                            {part.text}
                          </MessageResponse>
                          {message.role === "assistant" && (
                            <MessageActions>
                              <MessageAction
                                label="Retry"
                                onClick={() => regenerate()}
                                tooltip="Regenerate response"
                              >
                                <RefreshCcwIcon className="size-4" />
                              </MessageAction>
                              <MessageAction
                                label={isCopied ? "Copied" : "Copy"}
                                onClick={() => copyToClipboard(part.text)}
                                tooltip={
                                  isCopied
                                    ? "Copied to Clipboard"
                                    : "Copy to Clipboard"
                                }
                              >
                                {isCopied ? (
                                  <Check className="size-4" />
                                ) : (
                                  <CopyIcon className="size-4" />
                                )}
                              </MessageAction>
                            </MessageActions>
                          )}
                        </MessageContent>
                      );
                    // TODO: fix type any
                    case "tool-result":
                      return (
                        <MessageResponse key={`${message.id}-${i}`}>
                          {typeof part.output === "string"
                            ? part.output
                            : (part.output as any)?.text ||
                              JSON.stringify(part.output)}
                        </MessageResponse>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            ))}
          {status === "submitted" && (
            <div className="flex items-center gap-2 text-muted-foreground mt-4">
              <Loader2 className="size-4 animate-spin" />
              <span>Generating summary...</span>
            </div>
          )}
          {status === "ready" && (
            <Button
              onClick={() => {
                setMessages([]);
              }}
              className="w-full mt-4"
              variant="outline"
            >
              Summarize Again
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default SummaryNode;
