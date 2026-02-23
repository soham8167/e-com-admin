export type TabType = "description" | "nutrition" | "recipes";

export interface CardDetailsStore {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}
