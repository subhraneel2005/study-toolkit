import { create } from "zustand";

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

interface FlashcardsStore {
  flashcards: Flashcard[];
  setFlashcards: (flashcards: Flashcard[]) => void;
  clearFlashcards: () => void;
}

const useFlashcardsStore = create<FlashcardsStore>((set) => ({
  flashcards: [],
  setFlashcards: (flashcards) => set({ flashcards }),
  clearFlashcards: () => set({ flashcards: [] }),
}));

export default useFlashcardsStore;
