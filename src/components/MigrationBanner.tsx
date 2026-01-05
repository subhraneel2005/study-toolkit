"use client";

import React, { useState } from "react";
import { Sparkles, KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { removeGeminiKey } from "@/app/actions/removeGeminiKey";
import { toast } from "sonner";

export function MigrationBanner() {
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
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction="bottom"
      dismissible={false}
    >
      <DrawerTrigger asChild>
        <Button variant="outline">Remove gemini key</Button>
      </DrawerTrigger>
      <DrawerContent>
        {/* Max-width container keeps it looking like a notification on large screens */}
        <div className="mx-auto w-full max-w-lg md:max-w-2xl">
          <DrawerHeader className="text-left">
            <div className="flex items-center gap-2 mb-1">
              <div className="rounded-full bg-primary/10 p-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <DrawerTitle className="text-base font-bold">
                System Migration
              </DrawerTitle>
            </div>
            <DrawerDescription className="text-sm leading-relaxed text-left text-foreground">
              We&apos;ve switched to a <span>Credits based system</span>. You
              have been granted <strong>300 initial credits</strong> to use
              immediately.
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 py-2">
            <div className="rounded-xl bg-muted/50 border p-4 flex gap-4 items-start">
              <div className="mt-1">
                <KeyRound className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Legacy Key Cleanup</p>
                <p className="text-xs text-muted-foreground">
                  To ensure the new system works correctly, please remove any
                  previously saved Gemini API keys from your settings.
                </p>
              </div>
            </div>
          </div>

          <DrawerFooter className="md:flex-row flex-col gap-3 pt-4">
            <Button
              disabled={loading}
              variant="destructive"
              className="flex-1 font-semibold"
              onClick={handleRemoveKey}
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
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                I don&apos;t have any saved Keys
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MigrationBanner;
