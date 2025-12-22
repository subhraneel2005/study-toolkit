import { HeatmapSkeleton } from "@/components/heatmap/HeatmapSkeleton";
import HeatmapWrapper from "@/components/heatmap/HeatmapWrapper";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-4 p-4">
      <div className="flex flex-col space-y-2 justify-start w-full max-w-4xl ">
        <h2 className="text-3xl font-bold text-foreground tracking-[-1.4px]">
          Your Heatmap
        </h2>
        <p className="text-muted-foreground text-sm">
          Data is calculated on your daily logs and tasks. Data is updated
          daily.
        </p>
      </div>
      <Suspense fallback={<HeatmapSkeleton />}>
        <HeatmapWrapper />
      </Suspense>
    </div>
  );
}
