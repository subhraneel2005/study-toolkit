/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

"use client";
import { Handle, Position } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import { Search } from "lucide-react";
import { useState } from "react";

type SearchResult = {
  title: string;
  url: string;
  snippet?: string;
  source?: string;
};

// TODO: fix any tyoe

const WebSearchNode = ({ data }: any) => {
  const [query, setQuery] = useState(data?.query || "");
  const [isSearching, setIsSearching] = useState(false);
  const [summary, setSummary] = useState("");
  const [sources, setSources] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setSummary("");
    setSources([]);
    setError(null);

    try {
      const response = await fetch("/api/tools/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("Failed to fetch search results");

      const text = await response.text();

      const summaryMatch = text.match(/Summary:\s*([\s\S]*?)\nResults:/);
      const resultsMatch = text.match(/Results:\s*(\[[\s\S]*\])$/);

      const extractedSummary = summaryMatch ? summaryMatch[1].trim() : "";
      let parsedResults: SearchResult[] = [];

      if (resultsMatch) parsedResults = JSON.parse(resultsMatch[1]);

      setSummary(extractedSummary);
      setSources(parsedResults);

      data?.onSearch?.(query, parsedResults);
    } catch {
      setError("Failed to fetch search results.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-96 md:w-[500px] bg-background border rounded-xl shadow-sm p-6 space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Search className="h-5 w-5" />
          {data?.defaultData.label}
        </h2>
        {data?.description && (
          <p className="text-sm text-muted-foreground mt-1">
            {data?.defaultData.description}
          </p>
        )}
      </div>

      {/* Search Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Search the web..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="text-sm"
        />
        <Button
          size="sm"
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
        >
          {isSearching ? (
            <div className="h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Status */}
      {isSearching && (
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <div className="h-3 w-3 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
          Searching...
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </p>
      )}

      {/* Summary */}
      {summary && (
        <div className="bg-muted/40 p-4 rounded-lg border text-sm leading-relaxed">
          <span className="font-semibold">Summary:</span> {summary}
        </div>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <div className="">
          <Sources>
            <SourcesTrigger count={sources.length} />
            <SourcesContent>
              {sources.map((source, i) => (
                <Source key={i} href={source.url} title={source.title} />
              ))}
            </SourcesContent>
          </Sources>
        </div>
      )}
    </div>
  );
};

export default WebSearchNode;
