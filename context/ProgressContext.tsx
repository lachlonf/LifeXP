import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { load, save } from "@/lib/storage";
import { Progress, StatKey } from "@/lib/types";
import { applyDailyStreak, applyXP, getLevel } from "@/lib/progress";

type Ctx = {
  progress: Progress;
  gainXP: (amount: number, stat?: StatKey) => void;
  xpFloat: number | null;
  loreJustUnlocked: string | null;
  clearLoreJustUnlocked: () => void;
};

const DEFAULT: Progress = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
  stats: { strength: 0, wisdom: 0, focus: 0, discipline: 0 },
  loreUnlocked: [],
};

const ProgressContext = createContext<Ctx | null>(null);

function loreIdForLevel(level: number): string | null {
  // unlock lore at specific levels
  if (level === 2) return "lore_roots";
  if (level === 5) return "lore_silence";
  if (level === 10) return "lore_canopy";
  return null;
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<Progress>(DEFAULT);
  const [xpFloat, setXpFloat] = useState<number | null>(null);
  const [loreJustUnlocked, setLoreJustUnlocked] = useState<string | null>(null);

  useEffect(() => {
    const saved = load("progress", DEFAULT);
    // ensure level computed
    const fixed = { ...saved, level: getLevel(saved.xp) };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(applyDailyStreak(fixed));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) save("progress", progress);
  }, [progress, mounted]);

  function gainXP(amount: number, stat?: StatKey) {
    setProgress(prev => {
      const updated = applyXP(prev, amount, stat);
      const lore = loreIdForLevel(updated.level);
      if (lore && !updated.loreUnlocked.includes(lore)) {
        setLoreJustUnlocked(lore);
        return { ...updated, loreUnlocked: [...updated.loreUnlocked, lore] };
      }
      return updated;
    });

    setXpFloat(amount);
    setTimeout(() => setXpFloat(null), 1200);
  }

  const value = useMemo(
    () => ({
      progress,
      gainXP,
      xpFloat,
      loreJustUnlocked,
      clearLoreJustUnlocked: () => setLoreJustUnlocked(null),
    }),
    [progress, xpFloat, loreJustUnlocked]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
