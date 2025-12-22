import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function HeatmapSkeleton() {
  // width 750 / (rectSize 12 + gap 3) ≈ 50 columns
  const columns = Array.from({ length: 50 });
  const rows = Array.from({ length: 7 });

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* 1. The Main Heatmap Card */}
      <div className="rounded-xl p-4 bg-card border border-border sm:p-6 shadow-sm">
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[750px] flex gap-[3px]">
            {/* Left side day labels placeholders */}
            <div className="flex flex-col justify-between py-1 pr-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-2 w-5" />
              ))}
            </div>

            {/* The Grid Squares */}
            <div className="flex gap-[3px]">
              {columns.map((_, i) => (
                <div key={i} className="flex flex-col gap-[3px]">
                  {rows.map((_, j) => (
                    <Skeleton
                      key={j}
                      className="h-[12px] w-[12px] rounded-[2px] bg-muted/40"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. The Share Section Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 gap-4">
        {/* Text Group */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" /> {/* Title: Share Progress */}
          <Skeleton className="h-3 w-56" />{" "}
          {/* Subtitle: Download a high-res... */}
        </div>

        {/* Buttons Group */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Download Button Skeleton */}
          <Skeleton className="h-9 w-[120px] rounded-md" />

          {/* Vertical Separator Placeholder */}
          <div className="h-6 w-[1px] bg-border/50" />

          {/* X Button Skeleton */}
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </div>
  );
}
