"use client";

import { HeatmapType } from "@/app/actions/getAllDates";
import React, { useRef, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toPng } from "html-to-image";
import { Spinner } from "../ui/spinner";

export default function HeatmapBox({ data }: { data: HeatmapType[] }) {
  const heatmapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (heatmapRef.current === null) return;
    setLoading(true);

    try {
      // We force a "light mode" look for the exported image to ensure maximum readability.
      const dataUrl = await toPng(heatmapRef.current, {
        cacheBust: true,
        // FIX 1: Force a solid white background.
        backgroundColor: "#ffffff",
        style: {
          padding: "20px", // Adds nice frame padding
          // FIX 2: Explicitly force text and SVG fill colors to near-black.
          // This overrides CSS variables and ensures readability on the white bg.
          color: "#171717",
          fill: "#171717",
        },
      });

      const link = document.createElement("a");
      link.download = "my-activity-heatmap.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    } finally {
      setLoading(false);
    }
  };

  const handleShareX = () => {
    const text = encodeURIComponent(
      "Consistency is key! Check out my activity heatmap on study-toolkit. 🔥"
    );
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
    );
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="w-full max-w-4xl rounded-xl p-4 shadow-sm bg-background border border-border sm:p-6">
        {/* Heatmap Section */}
        <div
          ref={heatmapRef}
          className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 pt-4"
        >
          <div className="min-w-[750px]">
            <HeatMap
              value={data}
              width={750}
              rectSize={12}
              rectProps={{ rx: 2, ry: 2 }}
              style={{ color: "#888", fontSize: "12px" }}
              rectRender={(props, data) => (
                <Tooltip key={props.key}>
                  <TooltipTrigger asChild>
                    <rect {...props} />
                  </TooltipTrigger>
                  <TooltipContent className="px-3 py-1.5 text-xs font-medium">
                    <p>
                      {data.count || 0} tasks completed on {data.date}
                    </p>
                  </TooltipContent>
                </Tooltip>
              )}
            />
          </div>
        </div>

        <p className="mt-2 text-center text-xs text-muted-foreground md:hidden">
          ← Scroll to see more →
        </p>

        {/* --- Share Section --- */}
        <Separator className="my-6" />

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Share Heatmap
            </h3>
            <p className="text-xs text-muted-foreground">
              Show off your consistency to the world.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="h-9 gap-2"
              disabled={loading}
            >
              <Image
                src="/download.png"
                alt="Download"
                width={16}
                height={16}
                className="dark:invert"
              />
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span>Saving</span>
                  <Spinner />
                </div>
              ) : (
                <span className="text-xs">Save Image</span>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2"
              disabled={true}
            >
              <Image
                src="/twitter.png"
                alt="Share on X"
                width={18}
                height={18}
                className="dark:invert"
              />
              <span className="text-xs">Share on X (soon)</span>
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
