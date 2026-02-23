import { create } from "zustand";
import type { CardDetailsStore } from "../type/cardDetails";

export const useCardDetailsStore = create<CardDetailsStore>((set) => ({
  activeTab: "description",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
