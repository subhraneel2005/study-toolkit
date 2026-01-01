import React from "react";
import { hiringData } from "./hiringData";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";

export default function GridCard(props: (typeof hiringData)[0]) {
  return (
    <Card className="flex flex-col h-full hover:bg-accent/50 transition-colors">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="h-12 w-16 rounded-md border border-border bg-primary-foreground">
          <AvatarImage
            src={`/${props.logo}.png`}
            alt={props.company}
            className="object-contain p-1"
          />
          <AvatarFallback className="rounded-md">
            {props.company[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-lg">{props.company}</CardTitle>
          <Badge
            variant="secondary"
            className="w-fit mt-1 border border-border"
          >
            {props.month}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div>
          <p className="text-sm font-semibold">{props.program}</p>
          <p className="text-sm text-muted-foreground">{props.window}</p>
        </div>
        <div className="pt-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
            Target
          </p>
          <p className="text-sm">{props.target}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="outline"
          className="w-full cursor-not-allowed opacity-70"
          disabled
        >
          Application Opening Soon
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
