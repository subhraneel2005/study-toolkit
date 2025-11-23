import { ChatMessage } from "@/chatTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChatStore {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  clearMessages: () => void;
  removeExpiredChat: () => void;
}

const ONE_DAY = 24 * 60 * 60 * 1000;

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      addMessage: (msg) => {
        set({
          messages: [...get().messages, { ...msg, createdAt: Date.now() }],
        });
      },
      setMessages: (msgs) => set({ messages: msgs }),
      clearMessages: () => set({ messages: [] }),
      removeExpiredChat: () => {
        const now = Date.now();
        set({
          messages: get().messages.filter((m) => now - m.createdAt < ONE_DAY),
        });
      },
    }),
    {
      name: "chat-store",
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);
