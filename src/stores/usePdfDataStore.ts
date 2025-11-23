import { create } from "zustand";

interface PdfDataStore {
  pdfUploaded: boolean;
  setPdfUploaded: (uploaded: boolean) => void;

  pdfName: string;
  setPdfName: (name: string) => void;

  pdfFile: File | null;
  setPdfFile: (file: File | null) => void;

  pdfDataUrl: string | null;
  setPdfDataUrl: (url: string | null) => void;
}

export const usePdfDataStore = create<PdfDataStore>((set) => ({
  pdfUploaded: false,
  setPdfUploaded: (uploaded) => set({ pdfUploaded: uploaded }),

  pdfName: "",
  setPdfName: (name) => set({ pdfName: name }),

  pdfFile: null,
  setPdfFile: (file) => set({ pdfFile: file }),

  pdfDataUrl: null,
  setPdfDataUrl: (url) => set({ pdfDataUrl: url }),
}));
