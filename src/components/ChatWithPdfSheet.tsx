"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ChatInterface from "./ChatInterface";
import { usePdfSheetStore } from "@/stores/usePdfSheetStore";

const ChatWithPdfSheet = ({ children }: { children: React.ReactNode }) => {
  const { open, setOpen } = usePdfSheetStore();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-hidden w-[40vw] max-w-6xl sm:max-w-6xl">
        <SheetHeader>
          <SheetTitle>Chat with PDF</SheetTitle>
          <SheetDescription>
            Ask questions about your PDF document and get instant answers.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 p-2 flex justify-center w-full items-center">
          <ChatInterface />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatWithPdfSheet;
