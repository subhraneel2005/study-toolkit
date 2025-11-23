import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function WaitlistPage() {
  return (
    <div className="h-full w-full justify-center items-center flex flex-col">
      <h1 className="text-5xl md:text-6xl font-bold tracking-[-2.2px]">
        Join the Waitlist
      </h1>
      <p className="mt-4 mb-8 text-md text-center text-muted-foreground">
        <span className="block max-w-3xl mx-auto">
          A single intelligent workspace where students can search topics,
        </span>
        <span className="block max-w-2xl mx-auto">
          get research papers, web resources. Drag & drop PDFs of papers,
        </span>
        <span className="block max-w-xl mx-auto">
          directly chat with them Generate flashcards or summaries
        </span>
        <span className="block max-w-md mx-auto">from those papers.</span>
      </p>

      <div className="flex w-full gap-2 max-w-md">
        <Input placeholder="Enter your email" type="email" />
        <Button>Join Waitlist</Button>
      </div>
    </div>
  );
}
