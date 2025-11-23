import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Database, Search } from "lucide-react";
import { Badge } from "./ui/badge";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/10 bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.05] -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <Badge
            className="inline-flex items-center gap-2 px-4 py-2 mb-8"
            variant={"outline"}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Now with Multi-Step Workflows
          </Badge>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-[-2.5px] md:tracking-[-4px] text-white pb-2">
            Build AI Workflows for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white">
              Deep Research
            </span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            The visual platform for students and researchers. Connect autonomous
            agents to search, analyze, and synthesize knowledge—no coding
            required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button size="lg" className="text-base font-medium">
              Start Building Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base font-medium"
            >
              View Templates
            </Button>
          </div>
        </div>

        {/* Visual Workflow Builder Mockup */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 blur-lg" />
          <div className="relative rounded-xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="h-4 w-[1px] bg-white/10 mx-2" />
                <span className="text-xs text-zinc-400 font-mono">
                  My Research Workflow / Thesis_Literature_Review
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs text-zinc-400 hover:text-white"
                >
                  Run Test
                </Button>
                <Button
                  size="sm"
                  className="h-7 text-xs bg-blue-600 hover:bg-blue-500 text-white border-0"
                >
                  Publish
                </Button>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="relative h-[400px] w-full bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px] p-8 overflow-hidden">
              {/* Connecting Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <path
                  d="M220 200 L 400 200"
                  stroke="#334155"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M580 200 L 760 200"
                  stroke="#334155"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 4"
                  className="animate-[flow-line_1s_linear_infinite]"
                />
                <circle cx="400" cy="200" r="4" fill="#60A5FA" />
                <circle cx="580" cy="200" r="4" fill="#60A5FA" />
              </svg>

              {/* Nodes */}
              <div className="flex items-center justify-between max-w-4xl mx-auto h-full relative z-10">
                {/* Node 1: Trigger */}
                <div className="w-48 bg-zinc-900 border border-zinc-800 rounded-lg p-4 shadow-lg hover:border-blue-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/10 rounded-md">
                      <Search className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-zinc-200">
                      Web Search
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 w-12 bg-zinc-800 rounded-full" />
                    <div className="text-xs text-zinc-500 font-mono bg-black/50 p-2 rounded border border-white/5">
                      query: "CRISPR advancements 2024"
                    </div>
                  </div>
                </div>

                {/* Node 2: Process */}
                <div className="w-48 bg-zinc-900 border border-zinc-800 rounded-lg p-4 shadow-lg hover:border-purple-500/50 transition-colors cursor-pointer group relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-zinc-800 text-[10px] text-zinc-400 rounded-full border border-zinc-700">
                    Processing
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/10 rounded-md">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-sm font-medium text-zinc-200">
                      Summarizer
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-zinc-500 font-mono bg-black/50 p-2 rounded border border-white/5">
                      format: "bullet_points"
                      <br />
                      depth: "academic"
                    </div>
                  </div>
                </div>

                {/* Node 3: Action */}
                <div className="w-48 bg-zinc-900 border border-zinc-800 rounded-lg p-4 shadow-lg hover:border-green-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/10 rounded-md">
                      <Database className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-sm font-medium text-zinc-200">
                      Save to Notion
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs text-zinc-500">Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
