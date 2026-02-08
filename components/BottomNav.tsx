import Link from "next/link";

export default function BottomNav({ active }: { active: "dashboard" | "goals" | "stats" }) {
  const item = (isActive: boolean) =>
    isActive
      ? "text-emerald-300"
      : "text-slate-400 hover:text-slate-200 transition";

  return (
    <nav className="h-16 border-t border-white/10 bg-slate-950/60 backdrop-blur flex justify-around items-center">
      <Link href="/" className={`flex flex-col items-center ${item(active === "dashboard")}`}>
        <span className="text-xl">🏰</span>
        <span className="text-xs font-semibold">Dashboard</span>
      </Link>
      <Link
        href="/dailyGoals"
        className={`flex flex-col items-center ${item(active === "goals")}`}
      >
        <span className="text-xl">📜</span>
        <span className="text-xs font-semibold">Goals</span>
      </Link>
      <Link
        href="/stats"
        className={`flex flex-col items-center ${item(active === "stats")}`}
      >
        <span className="text-xl">📊</span>
        <span className="text-xs font-semibold">Stats</span>
      </Link>
    </nav>
  );
}
