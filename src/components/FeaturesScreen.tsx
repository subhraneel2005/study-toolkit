"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Icons - Added Pen and SquareCheckBig
import {
  Search,
  FileText,
  Sparkles,
  Layers,
  ArrowRight,
  Pen,
  SquareCheckBig,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const tools = [
  {
    name: "Chat with PDF Agent",
    description:
      "Upload documents and have full conversational interaction with specific citations.",
    icon: FileText,
    href: "/tools/chatWithPDF",
    tag: "Document AI",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    name: "Flashcards Agent",
    description:
      "Turn your notes into high-quality active recall flashcards with spaced repetition logic.",
    icon: Layers,
    href: "/tools/flashcards",
    tag: "Memory Boost",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    name: "Daily Logs",
    description:
      "Document your daily work, technical learnings, and reflections in a structured way.",
    icon: Pen,
    href: "/tools/dailyLogs",
    tag: "Personal",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    name: "Daily Checklist",
    description:
      "Organize your study sessions and tasks with high-priority focus to stay on track.",
    icon: SquareCheckBig,
    href: "/tools/dailyChecklist",
    tag: "Organization",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },

  // {
  //   name: "Web Search Agent",
  //   description:
  //     "Access academic research papers and trusted sources instantly without hallucinations.",
  //   icon: Search,
  //   href: "/tools/webSearch",
  //   tag: "AI Powered",
  //   color: "text-blue-500",
  //   bgColor: "bg-blue-500/10",
  // },
  {
    name: "Summarizer Agent",
    description:
      "Instantly compress long documents, chapters, or articles into digestible insights.",
    icon: Sparkles,
    href: "/tools/summarizer",
    tag: "Productivity",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

export default function FeaturesSection() {
  const { data: session } = authClient.useSession();
  return (
    <section
      id="explore-tools"
      className="relative w-full py-24 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="container px-4 md:px-6 mx-auto max-w-7xl space-y-16">
        {/* Heading Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge
            variant="secondary"
            className="px-4 py-1.5 text-sm rounded-full"
          >
            Built for Students
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold tracking-[-1.5px]">
            Your Personal AI Study Agents
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Stop drowning in information. Use our suite of intelligent tools
            crafted to speed up learning and make studying effortless.
          </p>
        </div>

        {/* Grid - Updated to lg:grid-cols-3 to accommodate 6 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <div key={tool.name} className="group block h-full">
                <Card className="relative h-full border-muted/60 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`size-12 rounded-lg flex items-center justify-center ${tool.bgColor} ${tool.color}`}
                      >
                        <IconComponent className="size-6" />
                      </div>

                      <Badge
                        variant="outline"
                        className="font-normal text-muted-foreground bg-background"
                      >
                        {tool.tag}
                      </Badge>
                    </div>

                    <CardTitle className="text-xl font-semibold">
                      {tool.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                    <CardDescription className="text-base leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
