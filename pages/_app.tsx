import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ProgressProvider } from "@/context/ProgressContext";
import { Cinzel, IM_Fell_English } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["500", "700"],
});

const fell = IM_Fell_English({
  subsets: ["latin"],
  variable: "--font-fell",
  weight: ["400"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div className={`${cinzel.variable} ${fell.variable}`}>
      <ProgressProvider>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </ProgressProvider>
    </div>
  );
}
