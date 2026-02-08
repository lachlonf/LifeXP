import Plant from "@/components/Plant";
import XPBar from "@/components/XPBar";
import XPFloat from "@/components/XPFloat";
import Encouragement from "@/components/Encouragement";
import BottomNav from "@/components/BottomNav";
import StreakFire from "@/components/StreakFire";
import LoreModal from "@/components/LoreModal";
import LevelUpModal from "@/components/LevelUpModal";
import SkillPreview from "@/components/SkillPreview";
import { useProgress } from "@/context/ProgressContext";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function Dashboard() {
  const { progress, xpFloat, loreJustUnlocked, clearLoreJustUnlocked, levelUpJust, clearLevelUp } = useProgress();

  return (
    <div className="h-screen flex flex-col app-bg text-white">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col"
      >
        {/* Top */}
        <div className="px-6 pt-6 flex flex-col items-center gap-3">
          <motion.div
            variants={fadeUp}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 font-extrabold shadow-xl"
          >
            Level {progress.level}
          </motion.div>

          <motion.div variants={fadeUp}>
            <StreakFire streak={progress.streak} />
          </motion.div>
        </div>

        {/* Center */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
          <motion.div
            variants={fadeUp}
            className="relative w-64 h-64 rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-950 shadow-2xl border border-white/10 flex items-center justify-center"
          >
            <Plant xp={progress.xp} />
            {xpFloat && <XPFloat amount={xpFloat} />}
          </motion.div>

          <motion.div variants={fadeUp} className="w-full max-w-sm">
            <XPBar xp={progress.xp} />
            <div className="mt-2 text-center text-xs text-slate-300">
              {progress.xp % 100} / 100 XP to next level
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="text-emerald-200 italic text-center text-sm max-w-sm bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
          >
            <Encouragement />
          </motion.div>

          <motion.div variants={fadeUp}>
            <SkillPreview stats={progress.stats} />
          </motion.div>
        </div>
      </motion.div>

      <BottomNav active="dashboard" />

      {loreJustUnlocked && (
        <LoreModal loreId={loreJustUnlocked} onClose={clearLoreJustUnlocked} />
      )}

      {levelUpJust && (
        <LevelUpModal level={levelUpJust} onClose={clearLevelUp} />
      )}
    </div>
  );
}
