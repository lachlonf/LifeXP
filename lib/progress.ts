import { Progress, StatKey } from "./types";

export function getLevel(xp: number) {
  return Math.floor(xp / 100) + 1;
}

export function todayString() {
  return new Date().toDateString();
}

export function isYesterday(prev: string, now: string) {
  const d1 = new Date(prev);
  const d2 = new Date(now);
  const diff = d2.getTime() - d1.getTime();
  return diff > 0 && diff <= 36 * 60 * 60 * 1000; // generous “yesterday”
}

export function applyXP(p: Progress, amount: number, stat?: StatKey): Progress {
  const xp = p.xp + amount;
  const level = getLevel(xp);

  const stats = stat
    ? { ...p.stats, [stat]: p.stats[stat] + 1 }
    : p.stats;

  return { ...p, xp, level, stats };
}

export function applyDailyStreak(p: Progress): Progress {
  const today = todayString();
  if (!p.lastActiveDate) {
    return { ...p, streak: 1, lastActiveDate: today };
  }

  if (p.lastActiveDate === today) return p;

  if (isYesterday(p.lastActiveDate, today)) {
    return { ...p, streak: p.streak + 1, lastActiveDate: today };
  }

  return { ...p, streak: 1, lastActiveDate: today };
}
