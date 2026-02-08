import { motion } from "framer-motion";

const LORE: Record<string, { title: string; body: string }> = {
  lore_roots: {
    title: "Roots Awaken",
    body: "Your plant learns patience. The quiet hours strengthen its roots.",
  },
  lore_silence: {
    title: "Silence is Strength",
    body: "Discipline forms in moments no one sees. You kept going anyway.",
  },
  lore_canopy: {
    title: "A Canopy Forms",
    body: "Your growth is now undeniable. Others may notice. You will too.",
  },
};

export default function LoreModal({
  loreId,
  onClose,
}: {
  loreId: string;
  onClose: () => void;
}) {
  const lore = LORE[loreId];
  if (!lore) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex items-center justify-center px-6 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-sm rounded-3xl bg-slate-900 border border-white/10 shadow-2xl p-6"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <h2 className="text-xl font-bold mb-2">{lore.title}</h2>
        <p className="text-slate-300 text-sm leading-relaxed">{lore.body}</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="mt-5 w-full rounded-2xl bg-emerald-600 hover:bg-emerald-500 transition px-4 py-3 font-semibold"
          onClick={onClose}
        >
          Continue
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
