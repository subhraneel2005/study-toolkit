/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

import { Handle, Position } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Response } from "@/components/ai-elements/response";
import { FileText } from "lucide-react";

const ReportGeneratorNode = ({ data }: any) => {
  const markdown = data.markdown || "";
  const isGenerating = data.isGenerating || false;

  return (
    <Card className="w-[500px] shadow-sm border-slate-200">
      {!data.isFirst && (
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-slate-400"
        />
      )}
      {!data.isLast && (
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-slate-400"
        />
      )}

      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {data.label}
          {isGenerating && (
            <span className="text-xs text-muted-foreground ml-auto">
              Generating...
            </span>
          )}
        </CardTitle>
        {data.description && (
          <p className="text-xs text-muted-foreground mt-1">
            {data.description}
          </p>
        )}
      </CardHeader>

      <CardContent>
        {data.topic && (
          <p className="text-xs text-muted-foreground mb-3">
            Topic: {data.topic}
          </p>
        )}

        {isGenerating && !markdown && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground py-4">
            <div className="h-3 w-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
            Generating report...
          </div>
        )}

        {markdown && <Response className="h-[500px]">{markdown}</Response>}

        {!markdown && !isGenerating && (
          <div className="text-xs text-muted-foreground py-4">
            No report generated yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportGeneratorNode;
