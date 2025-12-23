/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

import {
  Search,
  FileText,
  Share2,
  Workflow,
  Shield,
  Brain,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function Features() {
  return (
    <section
      className="py-32 border-b border-white/10 bg-black relative overflow-hidden"
      id="features"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              The Operating System <br />
              <span className="text-zinc-500">for Knowledge Work.</span>
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Don&apos;t just chat with AI. Build powerful, reusable workflows
              that research, synthesize, and organize information for you while
              you sleep.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-4xl font-bold text-white mb-1">10x</div>
            <div className="text-sm text-zinc-500 font-mono uppercase tracking-wider">
              Faster Research
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          {/* Main Feature: Workflow Builder */}
          <Card className="md:col-span-2 md:row-span-2 bg-zinc-900/50 border-white/10 overflow-hidden group hover:border-white/20 transition-colors">
            <CardHeader>
              <Workflow className="w-8 h-8 text-blue-400 mb-4" />
              <CardTitle className="text-xl text-white">
                Visual Workflow Builder
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Drag and drop agents to create custom research pipelines.
                Connect web search to summarizers, citation managers to
                note-takers.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-4 relative h-64 md:h-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
              {/* Abstract Grid Visualization */}
              <div className="absolute inset-4 border border-dashed border-white/10 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-blue-500/20 rounded-lg border border-blue-500/50 flex items-center justify-center">
                  <Search className="w-4 h-4 text-blue-400" />
                </div>
                <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-white/10 -translate-x-1/2" />
                <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-purple-500/20 rounded-lg border border-purple-500/50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature: Web Search */}
          <Card className="md:col-span-1 md:row-span-2 bg-zinc-900/50 border-white/10 hover:border-white/20 transition-colors">
            <CardHeader>
              <Search className="w-6 h-6 text-emerald-400 mb-4" />
              <CardTitle className="text-white">Deep Web Agent</CardTitle>
              <CardDescription className="text-zinc-400 mt-2">
                Accesses academic databases and live web results. Filters for
                credibility and citation quality automatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-4 space-y-2">
                <div className="text-xs font-mono text-emerald-400/70 bg-emerald-950/30 p-2 rounded border border-emerald-500/20">
                  ✓ Verified Source
                </div>
                <div className="text-xs font-mono text-emerald-400/70 bg-emerald-950/30 p-2 rounded border border-emerald-500/20">
                  ✓ Peer Reviewed
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature: PDF Chat */}
          <Card className="md:col-span-1 bg-zinc-900/50 border-white/10 hover:border-white/20 transition-colors">
            <CardHeader>
              <FileText className="w-6 h-6 text-orange-400 mb-2" />
              <CardTitle className="text-white text-lg">
                PDF Interaction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-400">
              Upload 100+ page papers. Ask complex questions across multiple
              documents at once.
            </CardContent>
          </Card>

          {/* Feature: Flashcards */}
          <Card className="md:col-span-1 bg-zinc-900/50 border-white/10 hover:border-white/20 transition-colors">
            <CardHeader>
              <Brain className="w-6 h-6 text-pink-400 mb-2" />
              <CardTitle className="text-white text-lg">
                Auto-Flashcards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-400">
              Convert notes into spaced-repetition cards for Anki or Quizlet
              instantly.
            </CardContent>
          </Card>

          {/* Feature: Integration */}
          <Card className="md:col-span-2 bg-zinc-900/50 border-white/10 hover:border-white/20 transition-colors flex flex-col md:flex-row items-center">
            <div className="p-6 flex-1">
              <CardHeader className="p-0 mb-2">
                <Share2 className="w-6 h-6 text-white mb-2" />
                <CardTitle className="text-white">Export Anywhere</CardTitle>
              </CardHeader>
              <CardDescription className="text-zinc-400">
                Sync your research directly to Notion, Obsidian, Google Drive,
                or Zotero.
              </CardDescription>
            </div>
            <div className="p-6 flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Icons representing integrations */}
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-[10px] font-mono text-white/50">
                NT
              </div>
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-[10px] font-mono text-white/50">
                OB
              </div>
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-[10px] font-mono text-white/50">
                DR
              </div>
            </div>
          </Card>

          {/* Feature: Security */}
          <Card className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-black border-white/10 hover:border-white/20 transition-colors">
            <CardHeader className="flex flex-row items-center gap-4">
              <Shield className="w-8 h-8 text-zinc-200" />
              <div>
                <CardTitle className="text-white">
                  Enterprise-Grade Security
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  BYOK (Bring Your Own Key) architecture with encrypted storage.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
