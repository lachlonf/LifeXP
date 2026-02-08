import { useEffect } from "react";
import { motion } from "framer-motion";

export default function LevelUpModal({
  level,
  onClose,
}: {
  level: number;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const sparkles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * 360;
    const rad = (angle * Math.PI) / 180;
    return { x: Math.cos(rad) * 80, y: Math.sin(rad) * 80, delay: i * 0.05 };
  });

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="relative flex items-center justify-center">
        {/* Sparkle particles */}
        {sparkles.map((s, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-400"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: s.x, y: s.y, opacity: 0, scale: 0 }}
            transition={{ duration: 1, delay: 0.3 + s.delay, ease: "easeOut" as const }}
          />
        ))}

        {/* Glow ring */}
        <motion.div
          className="absolute w-40 h-40 rounded-full border-2 border-amber-400/40"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.5, opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.2, ease: "easeOut" as const }}
        />

        {/* Level text */}
        <motion.div
          className="text-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
        >
          <div className="text-amber-400/80 text-sm font-semibold tracking-widest uppercase">
            Level Up!
          </div>
          <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-yellow-500 font-[var(--font-cinzel)]">
            {level}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
