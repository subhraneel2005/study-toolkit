import SummaryNode from "@/components/SummaryNode";
import toolsData from "@/utils/toolsData";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <SummaryNode data={toolsData[2]} />
    </div>
  );
}
