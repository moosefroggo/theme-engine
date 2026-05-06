/**
 * PERSONALITIES
 *
 * Five curated personalities that lock the pool selection for fonts, patterns,
 * motion, and radii — while still allowing randomization within those pools
 * (and always randomizing the hex color via the procedural engine).
 */

// ─── TYPES ────────────────────────────────────────────────────────────

export type PersonalityName = "clean" | "warm" | "tech" | "expressive" | "playful";

export interface Personality {
  name: PersonalityName;
  /** Human-readable display name */
  label: string;
  /** Short description shown in the UI */
  description: string;
  /** Font pair NAMES — must match names in fonts.ts FONT_PAIRS exactly */
  fontPool: string[];
  /** Pattern categories to pull from */
  patternCategory: Array<"gradient" | "geometric" | "decorative" | "effects">;
  /** Motion profile NAMES — must match names in motion.ts exactly */
  motionPool: string[];
  /** Radius range [min, max] as CSS length strings, e.g. ["0.25rem", "0.75rem"] */
  radiusRange: [string, string];
}

// ─── PERSONALITY DEFINITIONS ──────────────────────────────────────────

export const PERSONALITIES: Record<PersonalityName, Personality> = {
  // ── Clean: Minimal, anonymous, grid-based ──────────────────────────
  clean: {
    name: "clean",
    label: "Clean",
    description: "Minimal, anonymous, grid-based. Let the work speak.",
    fontPool: ["Operator", "Swiss", "Clarity"],
    patternCategory: ["geometric"],
    motionPool: ["Smooth Tween", "Crisp Fade", "Gentle Spring"],
    radiusRange: ["0.25rem", "0.5rem"],
  },

  // ── Warm: Organic, earthy, inviting ───────────────────────────────
  warm: {
    name: "warm",
    label: "Warm",
    description: "Organic, earthy, inviting. Feels like a cosy studio.",
    fontPool: ["Comfort", "Baloo", "Sora", "Elegant Soft"],
    patternCategory: ["gradient", "decorative"],
    motionPool: ["Gentle Spring", "Soft Reveal", "Smooth Tween"],
    radiusRange: ["0.5rem", "1rem"],
  },

  // ── Tech: Developer, monospace, high-contrast ─────────────────────
  tech: {
    name: "tech",
    label: "Tech",
    description: "Developer, monospace, high-contrast. Terminal chic.",
    fontPool: ["Tech", "Terminal", "Dev", "Plex", "Overpass Code"],
    patternCategory: ["geometric", "effects"],
    motionPool: ["Mechanical Spring", "Instant Tween", "Sharp Snap", "Cyber Glitch"],
    radiusRange: ["0rem", "0.25rem"],
  },

  // ── Expressive: Bold, loud, maximalist ────────────────────────────
  expressive: {
    name: "expressive",
    label: "Expressive",
    description: "Bold, loud, maximalist. Makes a statement.",
    fontPool: ["Bold", "Architect", "Impact", "Press", "Teko"],
    patternCategory: ["effects", "gradient"],
    motionPool: ["Bouncy Spring", "Elastic Snap", "Fast Bounce", "Playful Pop"],
    radiusRange: ["0.5rem", "1.5rem"],
  },

  // ── Playful: Soft, bouncy, colourful ──────────────────────────────
  playful: {
    name: "playful",
    label: "Playful",
    description: "Soft, bouncy, colourful. Feels like Saturday morning.",
    fontPool: ["Fluid", "Friendly", "Fredoka", "Round"],
    patternCategory: ["gradient", "decorative", "effects"],
    motionPool: ["Wobbly Reveal", "Fast Bounce", "Playful Pop", "Bouncy Spring"],
    radiusRange: ["0.75rem", "1.5rem"],
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────

/** Get a personality definition by name. */
export function getPersonality(name: PersonalityName): Personality {
  return PERSONALITIES[name];
}

/** Pick a random personality. */
export function getRandomPersonality(): Personality {
  const names = Object.keys(PERSONALITIES) as PersonalityName[];
  return PERSONALITIES[names[Math.floor(Math.random() * names.length)]];
}

/** Pick a random item from a pool (generic helper). */
export function getRandomFromPool<T>(pool: T[]): T {
  return pool[Math.floor(Math.random() * pool.length)];
}
