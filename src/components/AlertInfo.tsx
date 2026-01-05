"use client";
import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { removeGeminiKey } from "@/app/actions/removeGeminiKey";
import { Info, Loader2 } from "lucide-react";

export default function AlertInfo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemoveKey = async () => {
    setLoading(true);
    try {
      const res = await removeGeminiKey();
      if (res.success) {
        toast.success("SUCCESS", {
          description: "Successfully removed your gemini key",
        });
      } else {
        toast.error("ERROR", {
          description: "Unable to remove your key. Please try again later",
        });
      }
    } catch (error) {
      toast.error("ERROR", {
        description: `Unable to remove your key. Please try again later ${error}`,
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Alert className="w-full py-3 px-5 border border-destructive/40 bg-red-300/10 flex items-center justify-between gap-4 ">
      <div className="flex items-center gap-3">
        {/* Icon and Title/Description all on one line */}

        <div className="flex flex-col items-center gap-2 text-sm">
          <div className="flex gap-1 justify-start items-start w-full">
            <Info className="h-4 w-4 text-info shrink-0" />
            <span className="font-semibold text-md whitespace-nowrap ">
              System Update:
            </span>
          </div>
          <p className="text-info/90">
            We&apos;ve switched to a <strong>Credits based system</strong>. You
            have <strong>300 credits</strong> ready to use.
          </p>
        </div>
      </div>

      <Button
        onClick={handleRemoveKey}
        variant="outline"
        size="sm"
        disabled={loading}
      >
        {loading ? (
          <div className="flex justify-center items-center gap-1">
            <Loader2 className="size-4 animate-spin" />
            Removing
          </div>
        ) : (
          "Remove my key"
        )}
      </Button>
    </Alert>
  );
}
