"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <>
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white dark:from-blue-950/20 dark:via-slate-950 dark:to-slate-950" />

      {/* Floating Animated Orbs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-600/10"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-600/10"
      />
    </>
  );
}
