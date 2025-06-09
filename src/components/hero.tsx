import { Sparkles } from "lucide-react";
import Motion from "./motion";

export function FullstackDev() {
  return (
    <Motion
      element="span"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="inline-flex items-center gap-4 px-4 py-1.5 bg-purple-500/5 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-6"
    >
      <span>
        <Sparkles className="w-4 h-4" />
      </span>{" "}
      Fullstack Developer
    </Motion>
  );
}

export function Intro() {
  return (
    <>
      <div className="space-y-4">
        <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 dark:text-white leading-tight">
          Hi, I&apos;m{" "}
          <span className="text-transparent text-nowrap bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Sudharshan S
          </span>
        </h1>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-lg lg:text-xl mt-8 mb-10 leading-relaxed max-w-2xl">
        I am a fullstack developer with a passion for creating beautiful and
        functional web applications. I am always looking for new challenges and
        opportunities to learn and grow.
      </p>
    </>
  );
}
