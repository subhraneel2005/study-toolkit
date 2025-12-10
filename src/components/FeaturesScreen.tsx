"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Icons
import { Search, FileText, Sparkles, Layers, ArrowRight } from "lucide-react";

const tools = [
  {
    name: "Web Search Agent",
    description:
      "Access academic research papers and trusted sources instantly without hallucinations.",
    icon: Search,
    href: "/tools/webSearch",
    tag: "AI Powered",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
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
    name: "Summarizer Agent",
    description:
      "Instantly compress long documents, chapters, or articles into digestible insights.",
    icon: Sparkles,
    href: "/tools/summarizer",
    tag: "Productivity",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
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
];

export default function FeaturesSection() {
  return (
    <section
      id="explore-tools"
      className="relative w-full py-24 overflow-hidden bg-background"
    >
      {/* Background decoration (Optional - remove if you want pure white/black) */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="container px-4 md:px-6 mx-auto max-w-6xl space-y-16">
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link
                href={tool.href}
                key={tool.name}
                className="group block h-full"
              >
                <Card className="relative h-full border-muted/60 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      {/* Colored Icon Bubble */}
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

                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      {tool.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="text-base leading-relaxed">
                      {tool.description}
                    </CardDescription>

                    {/* Visual Call to Action */}
                    <div className="flex items-center text-sm font-medium text-primary pt-2">
                      Try {tool.name}
                      <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
