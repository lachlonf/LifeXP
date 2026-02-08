import { useProgress } from "@/context/ProgressContext";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Stats() {
  const { progress } = useProgress();

  const radarData = [
    { stat: "Strength", value: progress.stats.strength },
    { stat: "Wisdom", value: progress.stats.wisdom },
    { stat: "Focus", value: progress.stats.focus },
    { stat: "Discipline", value: progress.stats.discipline },
  ];

  const history = progress.history ?? [];
  const recent = history.slice(-14);

  const xpData = recent.map((h) => ({
    date: new Date(h.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    xp: h.xpGained,
  }));

  const questData = recent.map((h) => ({
    date: new Date(h.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    quests: h.questsCompleted,
  }));

  const totalQuests = history.reduce((sum, h) => sum + h.questsCompleted, 0);

  return (
    <div className="h-screen flex flex-col app-bg text-white">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
      >
        <motion.div variants={fadeUp}>
          <h1 className="text-3xl font-[var(--font-cinzel)] font-extrabold">
            📊 Stats
          </h1>
          <p className="text-slate-300 text-sm font-[var(--font-fell)]">
            Your journey at a glance.
          </p>
        </motion.div>

        {/* Summary cards */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
          {[
            { label: "Total XP", value: progress.xp },
            { label: "Level", value: progress.level },
            { label: "Streak", value: `${progress.streak}d` },
            { label: "Quests Done", value: totalQuests },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-2xl bg-white/5 border border-white/10 p-4"
            >
              <div className="text-xs text-slate-400">{card.label}</div>
              <div className="text-2xl font-bold mt-1">{card.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Stat Radar */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl bg-white/5 border border-white/10 p-4"
        >
          <h2 className="text-sm font-semibold text-slate-300 mb-2">
            Stat Distribution
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis
                dataKey="stat"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Radar
                dataKey="value"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* XP Over Time */}
        {xpData.length > 0 && (
          <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-white/5 border border-white/10 p-4"
          >
            <h2 className="text-sm font-semibold text-slate-300 mb-2">
              XP Gained (Last 14 Days)
            </h2>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={xpData}>
                <defs>
                  <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#10b981"
                  fill="url(#xpGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Quests Completed */}
        {questData.length > 0 && (
          <motion.div
            variants={fadeUp}
            className="rounded-2xl bg-white/5 border border-white/10 p-4 pb-6"
          >
            <h2 className="text-sm font-semibold text-slate-300 mb-2">
              Quests Completed (Last 14 Days)
            </h2>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={questData}>
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="quests" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </motion.div>

      <BottomNav active="stats" />
    </div>
  );
}
