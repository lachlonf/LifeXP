import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ProgressProvider } from "@/context/ProgressContext";
import { Cinzel, IM_Fell_English } from "next/font/google";

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
  return (
    <div className={`${cinzel.variable} ${fell.variable}`}>
      <ProgressProvider>
        <Component {...pageProps} />
      </ProgressProvider>
    </div>
  );
}
