import { motion } from "framer-motion";

type XPFloatProps = {
  amount: number;
};

export default function XPFloat({ amount }: XPFloatProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="text-emerald-400 font-bold text-2xl drop-shadow-lg"
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: [0, 1, 1, 0], y: -40, scale: 1.1 }}
        transition={{ duration: 1.2, ease: "easeOut" as const }}
      >
        +{amount} XP
      </motion.div>
    </div>
  );
}
