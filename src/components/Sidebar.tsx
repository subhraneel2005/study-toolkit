"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LucideSidebar,
  Search,
  MessageSquare,
  BookMarked,
  Notebook,
  HelpCircle,
  Pen,
  SquareCheckBig,
  GitGraph,
  LucideGitGraph,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const [open, setOpen] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/tools") {
      setOpen(false);
    }
  }, [pathname]);

  const personalTools = [
    {
      name: "Daily Logs",
      description: "Document your daily work and learnings here.",
      icon: <Pen className="h-5 w-5 text-muted-foreground" />,
      href: "/tools/dailyLogs",
    },

    {
      name: "Daily Checklist",
      description: "Finish your todos with priority.",
      icon: <SquareCheckBig className="h-5 w-5 text-muted-foreground" />,
      href: "/tools/dailyChecklist",
    },

    {
      name: "My Heatmap",
      description: "See your study streak in action.",
      icon: <LucideGitGraph className="h-5 w-5 text-muted-foreground" />,
      href: "/tools/heatmap",
    },
  ];

  const disposableTools = [
    {
      name: "Flashcards Agent",
      description: "Generates study flashcards automatically.",
      icon: <Notebook className="h-5 w-5 text-muted-foreground" />,
      href: "/tools/flashcards",
    },
    {
      name: "Chat with PDF Agent",
      description: "Chat with your uploaded PDFs.",
      icon: <MessageSquare className="h-5 w-5 text-muted-foreground" />,
      href: "/tools/chatWithPDF",
    },
    {
      name: "Summarizer tool",
      description: "Summarizes long text or documents.",
      icon: <BookMarked className="h-5 w-5 text-muted-foreground" />,
      href: "/tools/summarizer",
    },
    {
      name: "Web Search tool",
      description: "Searches relevant research papers.",
      icon: <Search className="h-5 w-5 text-muted-foreground" />,
      href: "/tools/webSearch",
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
        className="w-[330px] top-16 fixed h-[calc(100vh-4rem)] flex flex-col border-r border-border select-none p-0 overflow-hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader className="flex-shrink-0 px-4 py-3 border-b border-border">
          <SheetTitle className="text-3xl tracking-[-1.8px] font-semibold">
            Your Toolkit
          </SheetTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Personal & disposable tools
            </span>
            <HoverCard>
              <HoverCardTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </HoverCardTrigger>
              <HoverCardContent side="right">
                <p className="text-sm">
                  Personal tools store your data. Disposable tools are
                  temporary.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 min-h-0 w-full p-4">
          <div className="py-5 flex flex-col gap-6">
            {/* Personal tools */}
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Personal
              </p>
              <div className="flex flex-col gap-3">
                {personalTools.map((tool) => (
                  <Link href={tool.href} key={tool.name} className="block">
                    <Card className="border border-border shadow-none cursor-pointer hover:bg-accent/50 transition-colors">
                      <CardContent className="flex items-start gap-3 px-4 py-2">
                        <div className="mt-1">{tool.icon}</div>
                        <div>
                          <h3 className="text-sm font-medium">{tool.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {tool.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            <Separator />

            {/* Disposable tools */}
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Disposable
              </p>
              <div className="flex flex-col gap-3">
                {disposableTools.map((tool) => (
                  <Link href={tool.href} key={tool.name} className="block">
                    <Card className="border border-border shadow-none cursor-pointer hover:bg-accent/50 transition-colors">
                      <CardContent className="flex items-start gap-3 px-4 py-2">
                        <div className="mt-1">{tool.icon}</div>
                        <div>
                          <h3 className="text-sm font-medium">{tool.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {tool.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
