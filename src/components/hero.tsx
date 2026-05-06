"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";

export function Hero({
  name,
  tagline,
  overview,
}: {
  name: string;
  tagline: string;
  overview: string;
}) {
  const { seed } = useTheme();
  const [animKey, setAnimKey] = useState(0);

  const triggerPop = useCallback(() => {
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    triggerPop();
  }, [
    seed.primaryColor,
    seed.fontPair.name,
    seed.motionProfile.name,
    triggerPop,
  ]);

  const transition = {
    type: seed.motionProfile.type,
    ...(seed.motionProfile.type === "spring"
      ? {
          stiffness: seed.motionProfile.stiffness ?? 200,
          damping: seed.motionProfile.damping ?? 15,
          mass: seed.motionProfile.mass ?? 0.5,
          bounce: seed.motionProfile.bounce ?? 0,
        }
      : {
          duration: seed.motionProfile.duration ?? 0.6,
          ease: seed.motionProfile.ease ?? [0.16, 1, 0.3, 1],
        }),
  };

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
      {/* PatternCraft background layer */}
      <div className="absolute inset-0 z-0 pattern-bg pointer-events-none" />

      <motion.div
        key={animKey}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={transition}
        className="max-w-3xl space-y-8 z-10"
      >
        {/* NextWork × User branding */}
        <div className="flex items-center justify-center gap-3">
          <div
            className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center text-lg font-bold font-display shadow-lg border-2 border-border"
            style={{ borderRadius: "9999px" }}
          >
            NW
          </div>
          <span className="text-2xl text-muted-foreground font-light">×</span>
          <div
            className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold font-display shadow-lg"
            style={{ borderRadius: "9999px" }}
          >
            MA
          </div>
        </div>

        {/* Name */}
        <h1
          className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[1.1]"
          style={{ transition: "color 0.6s ease" }}
        >
          {name}
        </h1>

        {/* Tagline */}
        <p
          className="text-xl md:text-2xl text-muted-foreground font-medium max-w-xl mx-auto"
          style={{ transition: "color 0.6s ease" }}
        >
          {tagline}
        </p>

        {/* Overview */}
        <p
          className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          style={{ transition: "color 0.6s ease" }}
        >
          {overview}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="/bio"
            className="px-8 py-3 bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            style={{ borderRadius: "var(--radius)" }}
          >
            About Me
          </a>

          <a
            href="#projects"
            className="px-8 py-3 border border-border bg-transparent hover:bg-muted transition-colors font-medium flex items-center gap-2"
            style={{ borderRadius: "var(--radius)" }}
          >
            View Projects
          </a>
        </div>

        {/* Debug line */}
        <p
          className="text-xs text-muted-foreground/50 font-mono pt-2"
          style={{ transition: "color 0.6s ease" }}
        >
          {seed.vibe} · {seed.fontPair.name} · {seed.motionProfile.name} ·{" "}
          {seed.pattern.name}
        </p>
      </motion.div>
    </section>
  );
}
