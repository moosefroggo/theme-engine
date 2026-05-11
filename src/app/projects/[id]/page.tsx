"use client";

import { useEffect, useState, use, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import html2canvas from "html2canvas";
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
    ease:
      profile.ease ?? ([0.16, 1, 0.3, 1] as [number, number, number, number]),
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
          We couldn&apos;t find a project with the slug &ldquo;{id}&rdquo;. It
          may have been removed or the URL might be incorrect.
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
        className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 py-28 text-center overflow-hidden"
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
            className="flex flex-wrap items-center justify-center gap-3 pt-4"
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

          {/* Share + Download buttons */}
          <motion.div variants={item} className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={async () => {
                const url = window.location.href;
                if (navigator.share) {
                  await navigator.share({ title: project.title, url });
                } else {
                  await navigator.clipboard.writeText(url);
                  alert("Link copied!");
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-transparent hover:bg-muted transition-colors font-medium font-body text-sm"
              style={{ borderRadius: "var(--radius)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Share Work
            </button>
            <ProjectCardDownload project={project} />
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
        className="max-w-3xl mx-auto px-4 pb-20"
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
              <span
                className="flex-shrink-0 mt-0.5 text-primary"
                aria-hidden="true"
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
        className="max-w-3xl mx-auto px-4 pb-20"
      >
        <motion.h2
          variants={item}
          className="text-2xl font-bold font-display mb-6"
        >
          Deep Dive
        </motion.h2>
        <motion.div variants={item} className="space-y-6">
          {paragraphs.map((para, i) => (
            <div key={i}>
              <p
                className="text-foreground leading-relaxed font-body"
                style={{ maxWidth: "65ch" }}
              >
                {para}
              </p>
              {project.images && project.images[i] && (
                <div className="mt-4 mb-6">
                  <img
                    src={project.images[i]}
                    alt={`Screenshot for section ${i + 1}`}
                    className="object-contain max-w-full h-auto rounded-xl border border-border"
                    style={{ maxHeight: 320 }}
                  />
                </div>
              )}
            </div>
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

// ─── PROJECT CARD DOWNLOAD ────────────────────────────────────────────

function ProjectCardDownload({ project }: { project: { title: string; overview: string; techStack: string[]; author: { name: string }; date: string } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { seed, mode: themeMode } = useTheme();
  const [busy, setBusy] = useState(false);
  const isDark = themeMode === "dark";
  const bg = isDark ? "#0d0d12" : "#ffffff";
  const fg = isDark ? "#ffffff" : "#0d0d12";
  const muted = isDark ? "#707080" : "#888899";

  // Force card to match current theme mode when generating
  const cardBg = seed.tokens["--background"] ? `hsl(${seed.tokens["--background"]})` : bg;
  const cardFg = seed.tokens["--foreground"] ? `hsl(${seed.tokens["--foreground"]})` : fg;
  const cardMuted = seed.tokens["--muted-foreground"] ? `hsl(${seed.tokens["--muted-foreground"]})` : muted;

  const download = useCallback(async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = project.title.toLowerCase().replace(/\s+/g, "-") + ".png";
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
      if (cardRef.current) {
        cardRef.current.style.left = "-9999px";
        cardRef.current.style.zIndex = "";
      }
    } finally {
      setBusy(false);
    }
  }, [project.title]);

  return (
    <>
      <button
        onClick={download}
        disabled={busy}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium font-body text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{ borderRadius: "var(--radius)" }}
      >
        {busy ? "Generating..." : "Download Card"}
      </button>
      <div ref={cardRef} className="fixed" style={{ left: "-9999px", top: 0, width: 1200, height: 630, overflow: "hidden" }}>
        <div style={{
          width: 1200, height: 630, display: "flex", flexDirection: "column",
          backgroundColor: cardBg,
          fontFamily: seed.fontBody,
          position: "relative", overflow: "hidden", padding: "80px 90px",
          justifyContent: "center", alignItems: "center", textAlign: "center", gap: 56
        }}>
          {/* Pattern background */}
          <div style={{
            position: "absolute", inset: 0,
            background: seed.pattern.css,
            opacity: 0.2
          }} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <svg width="200" height="40" viewBox="0 0 156 32" fill="none" style={{ flexShrink: 0 }}>
              
              <path d="M30.7426 9.7718C29.9368 7.86648 28.7832 6.15552 27.3138 4.68616C25.8445 3.21682 24.1335 2.06318 22.2282 1.25745C20.2552 0.423088 18.1598 0 16 0C13.8402 0 11.7448 0.423088 9.7718 1.25745C7.86648 2.06318 6.15552 3.21682 4.68616 4.68616C3.21682 6.15552 2.06318 7.86648 1.25745 9.7718C0.423088 11.7448 0 13.8402 0 16C0 18.1598 0.423088 20.2552 1.25745 22.2282C2.06318 24.1335 3.21682 25.8445 4.68616 27.3138C6.15552 28.7832 7.86648 29.9368 9.7718 30.7426C11.7448 31.5769 13.8402 32 16 32C18.1598 32 20.2552 31.5769 22.2282 30.7426C24.1335 29.9368 25.8445 28.7832 27.3138 27.3138C28.7832 25.8445 29.9368 24.1335 30.7426 22.2282C31.5769 20.2552 32 18.1598 32 16C32 13.8402 31.5769 11.7448 30.7426 9.7718ZM21.8098 2.24644C23.5869 2.99812 25.1834 4.07444 26.5543 5.44536C27.9252 6.81628 29.0015 8.41272 29.7532 10.1899C30.4036 11.7276 30.7859 13.3459 30.894 15.0124L28.897 13.7679C24.4771 11.0132 20.3178 7.80172 16.5344 4.22264L13.4364 1.29217C14.2769 1.14684 15.1324 1.07382 15.9996 1.07382C18.0148 1.07382 19.9696 1.46828 21.8094 2.24644H21.8098ZM10.1902 2.24644C10.836 1.97333 11.496 1.74783 12.1675 1.56958L15.7967 5.0026C19.6192 8.61852 23.82 11.864 28.2835 14.6506C20.3504 12.6214 12.8279 9.37808 5.90784 5.00332C7.17136 3.84179 8.60884 2.91544 10.1902 2.24644ZM2.24644 10.1902C2.93834 8.55444 3.90586 7.0722 5.12428 5.77788C11.9442 10.119 19.3442 13.3734 27.1463 15.4631H1.08349C1.14756 13.6376 1.53772 11.8661 2.2468 10.1902H2.24644ZM2.24644 21.8098C1.53772 20.1339 1.1472 18.3624 1.08313 16.5369H27.1714C19.3614 18.6248 11.951 21.8796 5.12428 26.2225C3.90586 24.9278 2.93834 23.4459 2.24644 21.8098ZM5.9082 26.997C12.8312 22.6234 20.3586 19.3804 28.2942 17.3534L28.1596 17.4378C23.7913 20.1768 19.6739 23.3586 15.9216 26.8943L12.1682 30.4308C11.4964 30.2525 10.8363 30.027 10.1902 29.7536C8.6092 29.0849 7.17172 28.1586 5.90856 26.997H5.9082ZM29.7536 21.8098C29.0019 23.5869 27.9256 25.1834 26.5546 26.5543C25.1837 27.9252 23.5873 29.0015 21.8101 29.7532C19.9703 30.5314 18.0156 30.9258 16.0004 30.9258C15.1341 30.9258 14.2794 30.8528 13.4396 30.7078L16.6582 27.675C20.3597 24.1872 24.4216 21.0488 28.7306 18.347L30.8943 16.9904C30.7859 18.6559 30.4039 20.2728 29.7539 21.8094L29.7536 21.8098Z" fill={cardFg} />
              <path d="M114.943 9.72364L110.603 24.7895H108.324C108.281 24.6341 104.988 12.6479 104.946 12.4952L101.68 24.7895H99.4021L95.0616 9.72364H97.7399L100.668 21.0361L103.709 9.72364H106.296L109.337 21.0361L112.265 9.72364H114.943ZM125.665 24.6341C118.589 26.9223 114.138 20.1779 116.553 13.8109C118.213 9.31174 124.594 8.15868 127.963 11.3937C131.703 14.9514 130.877 22.8754 125.665 24.6341ZM124.775 12.004C120.968 10.6936 118.4 13.5584 118.552 17.3131C118.539 19.5399 119.271 21.7799 121.389 22.6222C123.733 23.5881 126.524 22.283 127.234 19.8222C128.066 17.1756 127.692 13.1425 124.775 12.0046V12.004ZM142.466 5.45587V24.7967H144.951V5.45587H142.466ZM76.9749 15.1961L73.0834 9.72364H70.1525L75.5098 17.2569L70.1525 24.7895H73.0834L76.9749 19.3171L80.8665 24.7895H83.7974L78.4401 17.2569C78.448 17.2457 83.7862 9.73951 83.7974 9.72364H80.8665L76.9749 15.1961ZM69.049 18.0628H57.3941C57.4305 20.2215 58.5194 21.9623 60.4354 22.6804C62.6728 23.4645 65.3597 22.7491 66.2668 20.4754H68.8381C68.0321 23.4433 65.2176 25.1888 62.1049 25.1557C57.5336 25.2886 54.5935 21.5749 54.7125 17.2853C54.4097 8.80331 65.9402 6.25521 68.6351 14.4133C68.9888 15.5372 69.1283 16.765 69.0483 18.0635L69.049 18.0628ZM66.4229 15.9438C66.2087 10.1435 57.6341 10.1303 57.4206 15.9438H66.4229ZM52.0513 24.7895C51.964 23.005 52.2913 14.4423 51.7888 12.8972C51.4331 11.5114 50.6999 10.4489 49.4146 9.89091C46.9135 8.90182 43.4847 9.59273 42.1723 12.1012V9.72364H39.687V24.7895H42.1723V16.609C42.1313 13.7739 43.4298 11.6007 46.2067 11.6172C48.9835 11.4936 49.6579 13.7865 49.5654 16.0179V24.7888H52.0506L52.0513 24.7895ZM154.429 9.72364H151.498L146.14 17.2569L151.498 24.7895H154.429L149.071 17.2569L154.429 9.72364ZM137.034 11.7898L139.803 11.7865L139.8 9.72364L136.469 9.72761C135.065 9.72893 134.162 10.0992 133.626 10.8919C133.148 11.602 132.935 12.6883 132.936 14.4133L132.948 24.7967H135.433L135.422 14.244C135.422 13.3706 135.46 12.8225 135.664 12.4278C135.893 11.9874 136.315 11.7904 137.034 11.7898ZM88.0916 23.083C88.202 23.5961 88.3759 23.9623 88.6378 24.2367C89.129 24.7511 89.9363 24.9514 91.5164 24.9514H93.3591V22.8589H92.085C91.3055 22.8589 90.9187 22.7432 90.7072 22.447C90.4963 22.1521 90.4592 21.6919 90.4592 20.8351V11.7329H93.3591V9.72562H90.4592V5.45785H87.9402V9.72562H85.5237V11.7329H87.9402V21.1478C87.9402 21.9888 87.9885 22.6037 88.0916 23.0837V23.083Z" fill={cardFg} />
            </svg>
          </div>
          <div style={{
            fontSize: 72, fontWeight: 800, color: cardFg,
            fontFamily: seed.fontDisplay, lineHeight: 1.1, maxWidth: "90%", letterSpacing: "-0.02em", textAlign: "center"
          }}>
            {project.title}
          </div>
          <div style={{ fontSize: 26, color: cardMuted, textAlign: "center" }}>
            {project.author.name} \ {(() => {
  const d = new Date(project.date);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
})()}
          </div>
        </div>
      </div>
    </>
  );
}
