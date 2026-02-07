export default function StreakFire({ streak }: { streak: number }) {
  if (streak <= 0) return null;

  const intensity =
    streak >= 14 ? "text-orange-400" : streak >= 7 ? "text-amber-300" : "text-yellow-300";

  return (
    <div className={`flex items-center gap-2 ${intensity}`}>
      <span className="animate-flame text-xl">🔥</span>
      <span className="text-sm font-semibold">{streak} day streak</span>
    </div>
  );
}
