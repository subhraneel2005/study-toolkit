import ChatInterface from "@/components/ChatInterface";
import React from "react";

export default function page() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col md:justify-center md:items-center bg-muted/10 p-2 md:p-4">
      <ChatInterface />
    </div>
  );
}
