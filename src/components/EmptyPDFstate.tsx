"use client";

import { useRef } from "react";
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { usePdfDataStore } from "@/stores/usePdfDataStore";
import { usePdfSheetStore } from "@/stores/usePdfSheetStore";

export const title = "Empty with Single Action";

export default function EmptyPDFstate({
  handleChange,
}: {
  handleChange: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setPdfFile, setPdfName, setPdfDataUrl } = usePdfDataStore();
  const { setOpen } = usePdfSheetStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      // Convert to data URL
      const reader = new FileReader();
      reader.onload = () => {
        setPdfDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Store file and metadata in Zustand
      setPdfFile(file);
      setPdfName(file.name);

      setOpen(true);

      // Trigger the state change in parent
      handleChange();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Upload />
        </EmptyMedia>
        <EmptyTitle>No Pdf uploaded</EmptyTitle>
        <EmptyDescription>Get started by uploading your pdf.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <Button onClick={handleUploadClick}>
          <Upload />
          Upload pdf
        </Button>
      </EmptyContent>
    </Empty>
  );
}
