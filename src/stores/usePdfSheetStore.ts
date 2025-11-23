import { create } from "zustand";

interface PdfSheetStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const usePdfSheetStore = create<PdfSheetStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
