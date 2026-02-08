import { motion } from "framer-motion";

type Props = { xp: number };

export default function XPBar({ xp }: Props) {
  const percent = (xp % 100);

  return (
    <div className="w-full max-w-md">
      <div className="h-3 bg-gray-200/20 rounded overflow-hidden">
        <motion.div
          className="h-3 rounded bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>
    </div>
  );
}
