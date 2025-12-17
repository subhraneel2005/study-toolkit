"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  LucideSidebar,
  Search,
  MessageSquare,
  BookMarked,
  Notebook,
  FileText,
  HelpCircle,
  Pen,
  SquareCheckBig,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MinimapToggle from "./MinimapToggle";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";

export function Sidebar() {
  const [open, setOpen] = useState(true);

  const agents = [
    {
      name: "Daily Logs",
      description: "Document your daily work and learnings here.",
      icon: <Pen className="h-5 w-5 text-muted-foreground" />,
      type: "agentNode",
      href: "/tools/dailyLogs",
      defaultData: {
        label: "Daily Logs",
        description: "Document your daily work and learnings here",
      },
    },
    {
      name: "Daily Checklist",
      description: "Finish your todos with priority.",
      icon: <SquareCheckBig className="h-5 w-5 text-muted-foreground" />,
      type: "agentNode",
      href: "/tools/dailyChecklist",
      defaultData: {
        label: "Daily Checklist",
        description: "Finish your todos with priority",
      },
    },
    {
      name: "Web Search tool",
      description: "Searches relevant research papers.",
      icon: <Search className="h-5 w-5 text-muted-foreground" />,
      type: "webSearchNode",
      href: "/tools/webSearch",
      defaultData: {
        label: "Web Search Agent",
        description: "Searches the web for information",
        query: "",
        sources: [],
      },
    },
    {
      name: "Chat with PDF Agent",
      description: "Chat with your uploaded PDFs.",
      icon: <MessageSquare className="h-5 w-5 text-muted-foreground" />,
      type: "pdfNode",
      href: "/tools/chatWithPDF",
      defaultData: {
        label: "Chat with PDF Agent",
        description: "Chat with your uploaded PDFs",
      },
    },
    {
      name: "Summarizer tool",
      description: "Summarizes long text or documents.",
      icon: <BookMarked className="h-5 w-5 text-muted-foreground" />,
      type: "summaryNode",
      href: "/tools/summarizer",
      defaultData: {
        label: "Summarizer Agent",
        description: "Summarizes long text or documents",
      },
    },
    {
      name: "Flashcards Agent",
      description: "Generates study flashcards automatically.",
      icon: <Notebook className="h-5 w-5 text-muted-foreground" />,
      type: "agentNode",
      href: "/tools/flashcards",
      defaultData: {
        label: "Flashcards Generator Agent",
        description: "Generates study flashcards automatically",
      },
    },
  ];

  return (
    <Sheet modal={false} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <LucideSidebar />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[330px] top-16 fixed  h-[calc(100vh-4rem)] flex flex-col border-r border-border select-none"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader className="flex-shrink-0 px-4 py-3 border-b border-border">
          <SheetTitle className="text-3xl leading-[52.8px] tracking-[-1.5px] font-semibold">
            Agents
          </SheetTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Agents and Tools
            </span>
            <HoverCard>
              <HoverCardTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </HoverCardTrigger>
              <HoverCardContent side="right">
                <p className="text-sm">
                  Drag and drop agents into the canvas to build your AI
                  workflows.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 h-96 px-4 py-5 space-y-4">
          {agents.map((agent, index) => (
            <Link href={agent.href} key={index}>
              <Card
                className="border border-border shadow-none cursor-pointer my-4"
                // draggable
                // onDragStart={(e) => onDragStart(e, agent)}
              >
                <CardContent className="flex items-start gap-3">
                  <div className="flex-shrink-0">{agent.icon}</div>
                  <div>
                    <h3 className="text-sm font-medium">{agent.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {agent.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </ScrollArea>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
