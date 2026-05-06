"use client";

import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import {
  fetchProject,
  MOCK_PROJECTS,
  getAllProjectSlugs,
} from "@/lib/nextwork";
import type { NextWorkProject } from "@/lib/nextwork";
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
    ease: profile.ease ?? [0.16, 1, 0.3, 1] as [number, number, number, number],
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── CASE STUDY PAGE ──────────────────────────────────────────────────

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { seed } = useTheme();
  const [project, setProject] = useState<NextWorkProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const data = await fetchProject(id);
      if (!cancelled) {
        setProject(data);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const transition = buildTransition(seed.motionProfile);

  // ── Container variants for stagger children ───────────────────────
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
        ...transition,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition,
    },
  };

  // ── Loading state ──────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"
            style={{ borderRadius: "9999px" }}
          />
          <p className="text-muted-foreground text-sm font-body">
            Loading case study…
          </p>
        </motion.div>
      </main>
    );
  }

  // ── Not found ──────────────────────────────────────────────────────
  if (!project) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background px-4">
        <h1 className="text-4xl font-bold font-display text-foreground">
          Project Not Found
        </h1>
        <p className="text-muted-foreground text-center max-w-md font-body">
          We couldn&apos;t find a project with the slug &ldquo;{id}&rdquo;.
          It may have been removed or the URL might be incorrect.
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          style={{ borderRadius: "var(--radius)" }}
        >
          Back to Home
        </Link>
      </main>
    );
  }

  // ── Description paragraphs ─────────────────────────────────────────
  const paragraphs = project.description
    .split(/\n\n+/)
    .filter((p) => p.trim().length > 0);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center overflow-hidden"
      >
        {/* Pattern background layer */}
        <div className="absolute inset-0 z-0 pattern-bg pointer-events-none" />

        <motion.div layout className="max-w-3xl space-y-6 z-10">
          {/* Back link */}
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
              All Projects
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl font-bold font-display tracking-tight leading-[1.1]"
          >
            {project.title}
          </motion.h1>

          {/* Author + Date */}
          <motion.div
            variants={item}
            className="flex items-center justify-center gap-3 text-muted-foreground font-body"
          >
            <span>{project.author.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={project.date}>{formatDate(project.date)}</time>
          </motion.div>

          {/* Tech stack badges */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-2 pt-2"
          >
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium border border-border bg-muted/50 font-body"
                style={{ borderRadius: "var(--radius)" }}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ─── DIVIDER ──────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4">
        <hr className="border-border" />
      </div>

      {/* ─── OVERVIEW ─────────────────────────────────────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-3xl mx-auto px-4 py-16"
      >
        <motion.h2
          variants={item}
          className="text-2xl font-bold font-display mb-4"
        >
          Overview
        </motion.h2>
        <motion.p
          variants={item}
          className="text-lg text-muted-foreground leading-relaxed font-body"
        >
          {project.overview}
        </motion.p>
      </motion.section>

      {/* ─── GOALS ────────────────────────────────────────────────── */}
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
          Goals
        </motion.h2>
        <motion.ol variants={item} className="space-y-3">
          {project.goals.map((goal, i) => (
            <motion.li
              key={i}
              variants={item}
              className="flex items-start gap-3 font-body leading-relaxed"
            >
              <span className="flex-shrink-0 mt-0.5 text-primary" aria-hidden="true">
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
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <span className="text-foreground">{goal}</span>
            </motion.li>
          ))}
        </motion.ol>
      </motion.section>

      {/* ─── FULL DESCRIPTION ─────────────────────────────────────── */}
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
          Deep Dive
        </motion.h2>
        <motion.div variants={item} className="space-y-4">
          {paragraphs.map((para, i) => (
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

      {/* ─── LINKS ────────────────────────────────────────────────── */}
      {(project.liveUrl || project.sourceCodeUrl) && (
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
            Links
          </motion.h2>
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4"
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity font-body"
                style={{ borderRadius: "var(--radius)" }}
              >
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
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            )}
            {project.sourceCodeUrl && (
              <a
                href={project.sourceCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-transparent hover:bg-muted transition-colors font-medium font-body"
                style={{ borderRadius: "var(--radius)" }}
              >
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
                >
                  <path d="m9 19-4-4 4-4" />
                  <polyline points="13 5 17 9 13 13" />
                  <line x1="8" y1="10" x2="16" y2="14" />
                  <line x1="8" y1="14" x2="16" y2="10" />
                </svg>
                Source Code
              </a>
            )}
          </motion.div>
        </motion.section>
      )}
    </main>
  );
}
