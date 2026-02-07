import { ShadowStats } from "@/lib/types";

export default function SkillPreview({ stats }: { stats: ShadowStats }) {
  const items: { k: keyof ShadowStats; label: string; icon: string }[] = [
    { k: "strength", label: "Strength", icon: "💪" },
    { k: "wisdom", label: "Wisdom", icon: "🧠" },
    { k: "focus", label: "Focus", icon: "🎯" },
    { k: "discipline", label: "Discipline", icon: "🛡️" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
      {items.map(i => (
        <div key={i.k} className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">{i.label}</span>
            <span>{i.icon}</span>
          </div>
          <div className="mt-2 text-lg font-bold">{stats[i.k]}</div>
        </div>
      ))}
    </div>
  );
}
