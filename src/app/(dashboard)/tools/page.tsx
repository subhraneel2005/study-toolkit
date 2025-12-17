import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Inbox } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen w-full justify-center items-center flex">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Inbox />
          </EmptyMedia>
          <EmptyTitle>No tools selected yet</EmptyTitle>
          <EmptyDescription>
            Get started by selecting an AI tool from the sidebar.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
