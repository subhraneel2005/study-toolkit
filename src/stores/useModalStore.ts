import { create } from "zustand";

export enum ActiveModal {
  SIGNUP = "signup",
  SIGNIN = "signin",
}

interface ModalStore {
  activeModal: ActiveModal | null;
  openModal: (modal: ActiveModal) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,

  openModal: (modal) => set({ activeModal: modal }),

  closeModal: () => set({ activeModal: null }),
}));
