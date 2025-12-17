import React from "react";
import { Badge } from "../ui/badge";
import dayjs from "dayjs";

export default function TodayLog({ log, today }: { log: string; today: Date }) {
  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col space-y-4">
      <div className="space-y-2">
        <Badge>{dayjs(today).format("DD MMM YYYY")}</Badge>
        <p className="text-xl font-bold italic tracking-[-1.2px]">{log}</p>
      </div>
    </div>
  );
}
