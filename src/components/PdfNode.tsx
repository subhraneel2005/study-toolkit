/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: FIX ANY TYPE ERROR

"use client";

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
import { MessagesSquare } from "lucide-react";
import EmptyPDFstate from "./EmptyPDFstate";
import ChatWithPdfSheet from "./ChatWithPdfSheet";
import { useState } from "react";
import { usePdfDataStore } from "@/stores/usePdfDataStore";

const PDFAgentNode = ({ data }: any) => {
  const { pdfUploaded, setPdfUploaded } = usePdfDataStore();

  const [loading, setLoading] = useState(false);

  const handleChange = () => {
    setLoading(true);
    try {
      setPdfUploaded(!pdfUploaded);
    } catch (error) {
      console.log("Some error occured at handleChange pdfUploaded state");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-96 shadow-md border-muted bg-card">
      {/* {!data.isLast && <Handle type="source" position={Position.Right} />} */}

      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{data.label}</CardTitle>
        <CardDescription className="text-xs">
          {data.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 items-center">
        <div className="w-full h-60 rounded-xl border border-dashed border-muted-foreground/30 flex flex-col items-center justify-center bg-muted/30 overflow-hidden relative">
          {pdfUploaded ? (
            <div className="flex flex-col items-center justify-center w-full h-full text-center px-4">
              <img
                src={"/acrobat.png"}
                alt="pdf-preview-icon"
                className="w-14 h-14 opacity-50 mb-2"
              />
              <p className="text-sm font-medium text-foreground mb-1">
                Open to chat
              </p>
              <p className="text-xs text-muted-foreground">
                Click “Chat” to interact with this document
              </p>
            </div>
          ) : (
            <EmptyPDFstate handleChange={handleChange} />
          )}
        </div>
      </CardContent>

      <CardFooter>
        {pdfUploaded && (
          <ChatWithPdfSheet>
            <Button className="gap-2 w-full">
              Chat
              <MessagesSquare className="size-4" />
            </Button>
          </ChatWithPdfSheet>
        )}
      </CardFooter>
    </Card>
  );
};

export default PDFAgentNode;
