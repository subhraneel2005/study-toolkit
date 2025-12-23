/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR
import { Handle, Position } from "@xyflow/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

// --- Custom Node Component ---
const AgentNode = ({ data }: any) => {
  return (
    <Card className="w-72 shadow-md border-muted bg-card">
      {!data.isFirst && <Handle type="target" position={Position.Left} />}
      {!data.isLast && <Handle type="source" position={Position.Right} />}

      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{data.label}</CardTitle>
        <CardDescription className="text-xs">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-start">
        <p className="text-sm text-muted-foreground">{data.content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end gap-2 mt-2">
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button size="sm" variant="outline">
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AgentNode;
