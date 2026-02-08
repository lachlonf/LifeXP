export type StatKey = "strength" | "wisdom" | "focus" | "discipline";

export type ShadowStats = Record<StatKey, number>;

export type DayLog = {
  date: string;
  xpGained: number;
  questsCompleted: number;
};

export type Progress = {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string | null; // "Sat Jan 03 2026"
  stats: ShadowStats;
  loreUnlocked: string[]; // lore ids
  history: DayLog[];
};

export type QuestType = "core" | "rotating";

export type Quest = {
  id: string;
  title: string;
  description: string;
  xp: number;
  stat: StatKey;
  type: QuestType;
  completed: boolean;
};

export type StoredDailyQuests = {
  date: string; // Date().toDateString()
  quests: Quest[];
};
