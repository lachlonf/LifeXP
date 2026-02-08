import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = { xp: number };

function getPlant(xp: number) {
  if (xp >= 300) return "🌴";
  if (xp >= 150) return "🌳";
  if (xp >= 50) return "🌿";
  return "🌱";
}

export default function Plant({ xp }: Props) {
  const plant = useMemo(() => getPlant(xp), [xp]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={plant}
        className="text-8xl"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.6, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        {plant}
      </motion.div>
    </AnimatePresence>
  );
}
