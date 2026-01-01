import React from "react";
import { List as ListIcon, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { hiringData } from "./hiringData";

export default function ListViewItem(props: (typeof hiringData)[0]) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <Avatar className="h-10 w-16 rounded-md border border-border bg-primary-foreground">
          <AvatarImage
            src={`/${props.logo}.png`}
            alt={props.company}
            className="object-contain p-1"
          />
          <AvatarFallback className="rounded-md">
            {props.company[0]}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <span className="font-bold">{props.company}</span>
            <Badge
              variant="secondary"
              className="text-[10px] py-0 border-border"
            >
              {props.month}
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground">{props.program}</span>
        </div>
      </div>

      <div className="flex-1 hidden lg:block">
        <p className="text-xs text-muted-foreground">Window</p>
        <p className="text-sm">{props.window}</p>
      </div>

      <div className="flex-1">
        <p className="text-xs text-muted-foreground">Target Audience</p>
        <p className="text-sm line-clamp-1">{props.target}</p>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-not-allowed">
              <Button
                variant="ghost"
                size="icon"
                disabled
                className="pointer-events-none"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Applications opening soon</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
