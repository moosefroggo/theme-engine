"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import { MOCK_PROJECTS } from "@/lib/nextwork";
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
    month: "short",
    day: "numeric",
  });
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  transition,
}: {
  project: (typeof MOCK_PROJECTS)[number];
  index: number;
  transition: ReturnType<typeof buildTransition>;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        ...transition,
        delay: index * 0.08,
      }}
      whileHover={{ scale: 1.02 }}
      className="group relative flex flex-col border border-border bg-background hover:border-ring transition-colors overflow-hidden"
      style={{ borderRadius: "var(--radius)" }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="flex flex-col flex-1 p-6"
      >
        {/* Title */}
        <h3 className="text-lg font-semibold font-display text-foreground group-hover:text-primary transition-colors mb-2">
          {project.title}
        </h3>

        {/* Overview (truncated to 2 lines) */}
        <p className="text-sm text-muted-foreground leading-relaxed font-body line-clamp-2 mb-4 flex-1">
          {project.overview}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[0.7rem] font-medium border border-border bg-muted/60 font-body"
              style={{ borderRadius: "var(--radius)" }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span
              className="px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground font-body"
              style={{ borderRadius: "var(--radius)" }}
            >
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Author + Date footer */}
        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground font-body">
            {project.author.name}
          </span>
          <span className="text-xs text-border" aria-hidden="true">
            ·
          </span>
          <time
            dateTime={project.date}
            className="text-xs text-muted-foreground font-body"
          >
            {formatDate(project.date)}
          </time>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── PROJECT GRID ─────────────────────────────────────────────────────

export function ProjectGrid() {
  const { seed } = useTheme();
  const transition = buildTransition(seed.motionProfile);

  if (MOCK_PROJECTS.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground font-body">
          No projects to display yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_PROJECTS.map((project, i) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={i}
          transition={transition}
        />
      ))}
    </div>
  );
}
