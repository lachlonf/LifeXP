import Plant from "@/components/Plant";
import XPBar from "@/components/XPBar";
import XPFloat from "@/components/XPFloat";
import Encouragement from "@/components/Encouragement";
import BottomNav from "@/components/BottomNav";
import StreakFire from "@/components/StreakFire";
import LoreModal from "@/components/LoreModal";
import SkillPreview from "@/components/SkillPreview";
import { useProgress } from "@/context/ProgressContext";

export default function Dashboard() {
  const { progress, xpFloat, loreJustUnlocked, clearLoreJustUnlocked } = useProgress();

  return (
    <div className="h-screen flex flex-col app-bg text-white">
      {/* Top */}
      <div className="px-6 pt-6 flex flex-col items-center gap-3">
        <div className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 font-extrabold shadow-xl">
          Level {progress.level}
        </div>

        <StreakFire streak={progress.streak} />
      </div>

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
        <div className="relative w-64 h-64 rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-950 shadow-2xl border border-white/10 flex items-center justify-center">
          <Plant xp={progress.xp} />
          {xpFloat && <XPFloat amount={xpFloat} />}
        </div>

        <div className="w-full max-w-sm">
          <XPBar xp={progress.xp} />
          <div className="mt-2 text-center text-xs text-slate-300">
            {progress.xp % 100} / 100 XP to next level
          </div>
        </div>

        <div className="text-emerald-200 italic text-center text-sm max-w-sm bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
          <Encouragement />
        </div>

        <SkillPreview stats={progress.stats} />
      </div>

      <BottomNav active="dashboard" />

      {loreJustUnlocked && (
        <LoreModal loreId={loreJustUnlocked} onClose={clearLoreJustUnlocked} />
      )}
    </div>
  );
}
