import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { load, save } from "@/lib/storage";
import { Quest, StoredDailyQuests } from "@/lib/types";
import { CORE_QUESTS, ROTATING_POOL } from "@/lib/quests";
import { todayString } from "@/lib/progress";
import { useProgress } from "@/context/ProgressContext";
import { motion, AnimatePresence } from "framer-motion";

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => 0.5 - Math.random());
}

function buildTodayQuests(): Quest[] {
  const today = todayString();
  const saved = load<StoredDailyQuests | null>("dailyQuests", null);

  if (saved?.date === today) return saved.quests;

  const rotating = shuffle(ROTATING_POOL)
    .slice(0, 2)
    .map((q) => ({ ...q, completed: false }));

  const core = CORE_QUESTS.map((q) => ({ ...q, completed: false }));
  const fresh = [...core, ...rotating];

  save("dailyQuests", { date: today, quests: fresh });
  return fresh;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: "easeOut" as const },
  }),
  completed: {
    scale: [1, 1.03, 1],
    transition: { duration: 0.3 },
  },
};

export default function DailyGoals() {
  const { gainXP } = useProgress();

  const [mounted, setMounted] = useState(false);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [justCompleted, setJustCompleted] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuests(buildTodayQuests());
    setMounted(true);
  }, []);

  // ✅ Persist quest completion
  useEffect(() => {
    if (!mounted) return;
    save("dailyQuests", { date: todayString(), quests });
  }, [quests, mounted]);

  function completeQuest(id: string) {
    const quest = quests.find((q) => q.id === id);
    if (!quest || quest.completed) return;

    setJustCompleted(id);
    setTimeout(() => setJustCompleted(null), 400);

    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: true } : q))
    );

    gainXP(quest.xp, quest.stat);
  }

  // ✅ Prevent SSR/client mismatch
  if (!mounted) {
    return (
      <div className="h-screen flex flex-col bg-gradient-to-b from-slate-950 via-[#1a140c] to-slate-950 text-white">
        <div className="px-6 pt-6">
          <h1 className="text-3xl font-[var(--font-cinzel)] font-extrabold">
            📜 Quest Log
          </h1>
          <p className="text-slate-300 text-sm font-[var(--font-fell)]">
            Loading today&apos;s quests...
          </p>
        </div>
        <div className="flex-1 px-6 py-4" />
        <BottomNav active="goals" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col quest-bg text-white">

      <div className="px-6 pt-6">
        <h1 className="text-3xl font-[var(--font-cinzel)] font-extrabold">
          📜 Quest Log
        </h1>
        <p className="text-slate-300 text-sm font-[var(--font-fell)]">
          Daily quests reset each day. Rotating quests keep it interesting.
        </p>
      </div>

      <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
        <AnimatePresence>
          {quests.map((q, i) => (
            <motion.div
              key={q.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={justCompleted === q.id ? "completed" : "visible"}
              layout
              className={`quest-scroll p-5 ${q.completed ? "opacity-60 grayscale" : ""}`}
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-[var(--font-cinzel)] text-lg font-bold text-[#3b2a14]">
                      {q.title}
                    </div>

                    <div className="mt-1 font-[var(--font-fell)] text-base text-[#4a3318] leading-snug">
                      {q.description}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[#4a3318]">
                      <span className="inline-flex items-center rounded-full bg-black/10 px-3 py-1">
                        Trains:
                        <span className="ml-2 font-semibold">{q.stat}</span>
                      </span>

                      <span className="inline-flex items-center rounded-full bg-black/10 px-3 py-1">
                        Type:
                        <span className="ml-2 font-semibold">{q.type}</span>
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 rounded-2xl bg-black/10 px-3 py-2 text-[#2b1a08] font-[var(--font-cinzel)] font-bold">
                    +{q.xp} XP
                  </div>
                </div>

                {!q.completed ? (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="
                      game-button
                      mt-5 w-full rounded-2xl
                      bg-[#2b1a08]
                      text-[#fff3cf]
                      font-[var(--font-cinzel)]
                      font-bold py-3
                      shadow-lg
                    "
                    onClick={() => completeQuest(q.id)}
                  >
                    Complete Quest
                  </motion.button>
                ) : (
                  <div className="mt-5 w-full rounded-2xl bg-black/10 px-4 py-3 text-center text-sm text-[#3b2a14] font-semibold">
                    ✅ Completed
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <BottomNav active="goals" />
    </div>
  );
}
