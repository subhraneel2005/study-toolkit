/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageResponse,
  MessageContent,
  MessageActions,
  MessageAction,
} from "@/components/ai-elements/message";

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";

import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  PromptInputMessage,
  PromptInputButton,
  PromptInputHeader,
  PromptInputBody,
  PromptInputFooter,
} from "@/components/ai-elements/prompt-input";

import {
  Check,
  CopyIcon,
  ExternalLink,
  Loader2,
  MessageSquare,
  Plus,
  PlusIcon,
  RefreshCcwIcon,
  Trash2,
  X,
} from "lucide-react";
import { UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIDataTypes, UIMessagePart, UITools } from "ai";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useChatStore } from "@/stores/useChatStore";
import { usePdfDataStore } from "@/stores/usePdfDataStore";
import EmptyPDFstate from "./EmptyPDFstate";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import { Dialog, DialogContent } from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

async function convertFilesToDataURLs(
  files: FileList
): Promise<
  { type: "file"; filename: string; mediaType: string; url: string }[]
> {
  return Promise.all(
    Array.from(files).map(
      (file) =>
        new Promise<{
          type: "file";
          filename: string;
          mediaType: string;
          url: string;
        }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              type: "file",
              filename: file.name,
              mediaType: file.type,
              url: reader.result as string, // Data URL
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    )
  );
}

function getMessageText(parts: UIMessagePart<UIDataTypes, UITools>[]) {
  return (
    parts
      .filter((p) => p.type === "text" && typeof p.text === "string")
      // @ts-expect-error TypeScript doesn't narrow the union type after filter, but we've checked p.text exists
      .map((p) => p.text)
      .join("\n\n")
  );
}
export default function ChatInterface() {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 800);
  };
  const {
    pdfUploaded,
    setPdfUploaded,
    pdfDataUrl,
    pdfFile,
    setPdfDataUrl,
    pdfName,
    setPdfFile,
    setPdfName,
  } = usePdfDataStore();

  const {
    addMessage,
    setMessages: setStoredMessages,
    removeExpiredChat,
    messages: storedMessages,
    pdfAddedInChat,
    setPdfAddedInChat,
  } = useChatStore();

  const { messages, status, sendMessage, regenerate, stop, setMessages } =
    useChat({
      transport: new DefaultChatTransport({
        api: "/api/chat",
      }),
      messages: storedMessages as UIMessage[], // Load persisted messages on mount
    });

  const handleChange = () => {
    setLoading(true);
    try {
      setPdfUploaded(!pdfUploaded);
    } catch (error) {
      console.log("Some error occured at handleChange pdfUploaded state");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setStoredMessages(messages as any);
  }, [messages, setStoredMessages]);

  // useEffect(() => {
  //   removeExpiredChat();
  // }, []);

  const [input, setInput] = useState("");
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<
    Array<{ id: string; name: string; contentType: string; file: File }>
  >([]);

  const handleSubmit = async (
    message: PromptInputMessage,
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (input.trim() || attachments.length > 0) {
      const fileParts =
        attachments.length > 0
          ? await convertFilesToDataURLs(
              (() => {
                const dt = new DataTransfer();
                attachments.forEach((att) => dt.items.add(att.file));
                return dt.files;
              })()
            )
          : [];

      sendMessage({
        role: "user",
        parts: [{ type: "text", text: input }, ...fileParts],
      });

      setPdfAddedInChat(true);

      setInput("");
      // setAttachments([]);
      // setFiles(undefined);
      // if (fileInputRef.current) {
      //   fileInputRef.current.value = "";
      // }
    }
  };

  const handleRemoveAttachment = (fileId: string) => {
    setAttachments((prev) => prev.filter((f) => f.id !== fileId));
  };

  const actions = [
    {
      icon: RefreshCcwIcon,
      label: "Retry",
      onClick: () => regenerate(),
    },
    {
      icon: CopyIcon,
      label: "Copy",
      onClick: () => {},
    },
  ];

  useEffect(() => {
    if (pdfFile && pdfDataUrl) {
      setAttachments([
        {
          id: `pdf-${Date.now()}`,
          name: pdfName,
          contentType: pdfFile.type,
          file: pdfFile,
        },
      ]);
      setPdfUploaded(true);
    }
  }, [pdfFile, pdfName, pdfDataUrl]);

  useEffect(() => {
    if (status === "submitted") {
      setAttachments([]);
    }
  }, [status]);

  const router = useRouter();
  const disposeCurrentChatMessages = () => {
    setLoading(true);
    try {
      setStoredMessages([]);
      setMessages([]);
      setPdfAddedInChat(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!pdfUploaded && !pdfAddedInChat) {
    return <EmptyPDFstate handleChange={handleChange} />;
  }

  return (
    <div className="bg-background border border-accent w-full max-w-4xl mx-auto md:px-6 px-3 py-4 rounded-2xl shadow-lg space-y-4 md:space-y-6 mt-16">
      <Conversation
        className="relative w-full rounded-xl overflow-y-auto bg-card border"
        style={{
          height: "calc(100vh - 350px)",
          minHeight: "400px",
          maxHeight: "600px",
        }}
      >
        <ConversationContent className="p-2 md:p-4">
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<MessageSquare className="size-10 md:size-12" />}
              title="No messages yet"
              description="Start a conversation to see messages here"
            />
          ) : (
            messages.map((message) => (
              <div key={message.id} className="mb-4">
                <Message
                  from={message.role}
                  className="flex-1 flex-col max-w-[90%] md:max-w-full"
                >
                  <MessageContent className="mt-2 md:mt-4 break-words">
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <div
                              key={`${message.id}-${i}`}
                              className="text-sm md:text-base"
                            >
                              <MessageResponse>{part.text}</MessageResponse>
                            </div>
                          );
                        case "reasoning":
                          return (
                            <Reasoning
                              key={`${message.id}-${i}`}
                              className="w-full text-xs md:text-sm"
                              isStreaming={
                                message.parts[message.parts.length - 1]
                                  ?.type === "reasoning" &&
                                status === "streaming"
                              }
                            >
                              <ReasoningTrigger />
                              <ReasoningContent>{part.text}</ReasoningContent>
                            </Reasoning>
                          );
                        case "file":
                          return (
                            <Badge
                              key={`${message.id}-${i}`}
                              variant="secondary"
                              className="flex items-center gap-2 px-2 py-1.5 mb-2 max-w-full"
                            >
                              <img
                                src="/acrobat.png"
                                alt="PDF"
                                className="size-4 md:size-5 shrink-0"
                              />
                              <span className="text-xs md:text-sm font-medium truncate">
                                {part.filename}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-auto"
                                onClick={() => {
                                  const newWindow = window.open();
                                  if (newWindow) {
                                    newWindow.document.write(
                                      `<iframe src="${part.url}" width="100%" height="100%" style="border:none;"></iframe>`
                                    );
                                  }
                                }}
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Button>
                            </Badge>
                          );
                        default:
                          return null;
                      }
                    })}
                  </MessageContent>

                  {message.role === "assistant" && (
                    <MessageActions className="mt-1 flex-wrap">
                      <MessageAction
                        label="Retry"
                        onClick={() => regenerate()}
                        tooltip="Regenerate"
                      >
                        <RefreshCcwIcon className="size-3.5" />
                      </MessageAction>

                      <MessageAction
                        label={copied ? "Copied!" : "Copy"}
                        onClick={() =>
                          handleCopy(getMessageText(message.parts))
                        }
                      >
                        {copied ? (
                          <Check className="size-3.5 text-green-500" />
                        ) : (
                          <CopyIcon className="size-3.5" />
                        )}
                      </MessageAction>
                    </MessageActions>
                  )}
                </Message>
              </div>
            ))
          )}

          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent className="mt-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Generating...</span>
                </div>
              </MessageContent>
            </Message>
          )}
        </ConversationContent>
      </Conversation>

      <PromptInput
        onSubmit={status === "streaming" ? () => stop() : handleSubmit}
        className="mt-2"
      >
        <PromptInputHeader>
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2 max-h-32 overflow-y-auto">
              {attachments.map((file) => (
                <Badge
                  key={file.id}
                  variant="secondary"
                  className="flex items-center justify-between gap-2 px-2 py-1 w-full sm:w-auto"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src="/acrobat.png"
                      alt="PDF"
                      className="size-4 shrink-0"
                    />
                    <span className="text-xs font-medium truncate max-w-[120px]">
                      {file.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 shrink-0"
                    onClick={() => handleRemoveAttachment(file.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </PromptInputHeader>

        <PromptInputBody>
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[40px] text-sm md:text-base"
            placeholder="Type a message..."
          />
        </PromptInputBody>

        <PromptInputFooter>
          <PromptInputTools className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <PromptInputButton
                variant="secondary"
                className="size-9"
                onClick={() => fileInputRef?.current?.click()}
              >
                <PlusIcon className="size-4" />
              </PromptInputButton>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const file = e.target.files[0];
                    setAttachments([
                      {
                        id: `pdf-${Date.now()}`,
                        name: file.name,
                        contentType: file.type,
                        file,
                      },
                    ]);
                  }
                }}
                accept="application/pdf"
                ref={fileInputRef}
              />
            </div>
            <PromptInputSubmit
              disabled={!input && status !== "streaming"}
              status={status}
              className="size-9"
            />
          </PromptInputTools>
        </PromptInputFooter>
      </PromptInput>

      <footer className="flex justify-center md:justify-start pt-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <ButtonGroup className="w-full md:w-auto">
              <Button variant="destructive" className="px-3">
                <Trash2 className="size-4" />
              </Button>
              <ButtonGroupSeparator />
              <Button
                variant="destructive"
                className="flex-1 md:flex-none text-sm"
              >
                Dispose chat
              </Button>
            </ButtonGroup>
          </AlertDialogTrigger>
        </AlertDialog>
      </footer>
    </div>
  );
}
