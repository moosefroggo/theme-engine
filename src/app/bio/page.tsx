"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import { MOCK_AUTHOR } from "@/lib/nextwork";
import type { MotionProfile } from "@/lib/theme-engine";

// ─── HELPERS ──────────────────────────────────────────────────────────

function buildTransition(profile: MotionProfile) {
  if (profile.type === "spring") {
    return {
      type: "spring" as const,
      stiffness: profile.stiffness ?? 100,
      damping: profile.damping ?? 20,
      mass: profile.mass ?? 0.5,
      bounce: profile.bounce ?? 0,
    };
  }
  return {
    type: "tween" as const,
    duration: profile.duration ?? 0.6,
    ease:
      profile.ease ?? ([0.16, 1, 0.3, 1] as [number, number, number, number]),
  };
}

// ─── BIO PAGE ─────────────────────────────────────────────────────────

export default function BioPage() {
  const { seed } = useTheme();
  const transition = buildTransition(seed.motionProfile);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        ...transition,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition,
    },
  };

  const { name, bio, skills, links } = MOCK_AUTHOR;
  const bioParagraphs = bio.split(/\n\n+/).filter((p) => p.trim().length > 0);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ─── AVATAR + NAME HERO ──────────────────────────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative pt-24 pb-12 px-4 flex flex-col items-center text-center overflow-hidden"
      >
        {/* Pattern background layer */}
        <div className="absolute inset-0 z-0 pattern-bg pointer-events-none" />

        <motion.div variants={item} className="z-10">
          <div className="flex items-center justify-center gap-3">
            <div
              className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center text-lg font-bold font-display shadow-lg border-2 border-border"
              style={{ borderRadius: "9999px" }}
            >
              NW
            </div>
            <span className="text-2xl text-muted-foreground font-light">×</span>
            <div
              className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold font-display shadow-lg"
              style={{ borderRadius: "9999px" }}
            >
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
        </motion.div>

        <motion.h1
          variants={item}
          className="z-10 text-4xl md:text-5xl font-bold font-display tracking-tight"
        >
          {name}
        </motion.h1>

        <motion.p
          variants={item}
          className="z-10 mt-3 text-lg text-muted-foreground font-body"
        >
          Full-Stack Developer &amp; Open Source Enthusiast
        </motion.p>
      </motion.section>

      {/* ─── BACK LINK ───────────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto px-4 mb-8"
      >
        <motion.div variants={item}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </motion.div>

      {/* ─── DIVIDER ──────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 mb-12">
        <hr className="border-border" />
      </div>

      {/* ─── BIO NARRATIVE ────────────────────────────────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-3xl mx-auto px-4 pb-16"
      >
        <motion.h2
          variants={item}
          className="text-2xl font-bold font-display mb-6"
        >
          About
        </motion.h2>
        <motion.div variants={item} className="space-y-5">
          {bioParagraphs.map((para, i) => (
            <p
              key={i}
              className="text-foreground leading-relaxed font-body"
              style={{ maxWidth: "65ch" }}
            >
              {para}
            </p>
          ))}
        </motion.div>
      </motion.section>

      {/* ─── SKILLS ───────────────────────────────────────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-3xl mx-auto px-4 pb-16"
      >
        <motion.h2
          variants={item}
          className="text-2xl font-bold font-display mb-6"
        >
          Skills &amp; Technologies
        </motion.h2>
        <motion.div variants={item} className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3.5 py-1.5 text-sm font-medium border border-border bg-muted/50 hover:bg-muted transition-colors cursor-default font-body"
              style={{ borderRadius: "var(--radius)" }}
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </motion.section>

      {/* ─── LINKS ────────────────────────────────────────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-3xl mx-auto px-4 pb-24"
      >
        <motion.h2
          variants={item}
          className="text-2xl font-bold font-display mb-6"
        >
          Connect
        </motion.h2>
        <motion.div variants={item} className="flex flex-wrap gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-transparent hover:bg-muted transition-colors font-medium font-body"
              style={{ borderRadius: "var(--radius)" }}
            >
              {link.label === "GitHub" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              )}
              {link.label === "LinkedIn" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              )}
              {link.label === "Twitter" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              )}
              {link.label === "Website" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              )}
              {link.label}
            </a>
          ))}
        </motion.div>
      </motion.section>
    </main>
  );
}
