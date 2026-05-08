/**
 * PERSONALITIES
 *
 * Five curated personalities that lock the pool selection for fonts, patterns,
 * motion, and radii — while still allowing randomization within those pools
 * (and always randomizing the hex color via the procedural engine).
 */

// ─── TYPES ────────────────────────────────────────────────────────────

export type PersonalityName =
  | "clean"
  | "warm"
  | "tech"
  | "expressive"
  | "playful";

export interface Personality {
  name: PersonalityName;
  label: string;
  description: string;
  fontPool: string[];
  patternCategory: Array<"gradient" | "geometric" | "decorative" | "effects">;
  motionPool: string[];
  radiusRange: [string, string];
}

// ─── FULL FONT POOLS (all 60 pairs, grouped by category) ─────────────

const GEOMETRIC_FONTS = [
  "Geometric",
  "Operator",
  "Swiss",
  "Modernist",
  "Round",
  "Jakarta",
  "Classic",
  "Line",
  "Hat Trick",
  "Grove",
  "Clarity",
  "Lodge",
  "Titan",
  "Epilogue",
] as const;

const EDITORIAL_FONTS = [
  "Editorial",
  "Magazine",
  "Serif Harmony",
  "Art Book",
  "Luxury",
  "Literary",
  "Variable",
  "Fashion",
  "Crimson",
  "Literata",
  "Vollkorn",
  "Cardo",
  "Prata",
  "Alegreya",
  "Newspaper",
  "Ibarra",
  "Libre Caslon",
] as const;

const MONO_FONTS = [
  "Terminal",
  "Brutalist",
  "Tech",
  "Plex",
  "Dev",
  "Adobe",
  "Console",
  "Ubuntu Code",
  "Courier",
  "Circuit",
  "Overpass Code",
] as const;

const ORGANIC_FONTS = [
  "Fluid",
  "Soft",
  "Elegant Soft",
  "Friendly",
  "Comfort",
  "Baloo",
  "Sora",
  "Grand",
] as const;

const DISPLAY_FONTS = [
  "Bold",
  "Architect",
  "Impact",
  "Deco",
  "Press",
  "Teko",
  "Big Shoulders",
  "Alfa",
  "Righteous",
  "Fredoka",
] as const;

// ─── PERSONALITY DEFINITIONS ──────────────────────────────────────────

export const PERSONALITIES: Record<PersonalityName, Personality> = {
  clean: {
    name: "clean",
    label: "Clean",
    description: "Minimal, anonymous, grid-based.",
    fontPool: [...GEOMETRIC_FONTS, ...EDITORIAL_FONTS.filter((_, i) => i < 4)], // geometric + top 4 editorial
    patternCategory: ["geometric"],
    motionPool: ["Smooth Tween", "Crisp Fade", "Gentle Spring"],
    radiusRange: ["0.25rem", "0.5rem"],
  },

  warm: {
    name: "warm",
    label: "Warm",
    description: "Organic, earthy, inviting.",
    fontPool: [
      ...ORGANIC_FONTS,
      ...EDITORIAL_FONTS.filter((_, i) => i >= 4 && i < 10),
    ],
    patternCategory: ["gradient", "decorative"],
    motionPool: ["Gentle Spring", "Soft Reveal", "Smooth Tween"],
    radiusRange: ["0.5rem", "1rem"],
  },

  tech: {
    name: "tech",
    label: "Tech",
    description: "Developer, monospace, high-contrast.",
    fontPool: [...MONO_FONTS, ...GEOMETRIC_FONTS.filter((_, i) => i < 3)],
    patternCategory: ["geometric", "effects"],
    motionPool: [
      "Mechanical Spring",
      "Instant Tween",
      "Sharp Snap",
      "Cyber Glitch",
    ],
    radiusRange: ["0rem", "0.25rem"],
  },

  expressive: {
    name: "expressive",
    label: "Expressive",
    description: "Bold, loud, maximalist.",
    fontPool: [...DISPLAY_FONTS, ...EDITORIAL_FONTS.filter((_, i) => i >= 10)],
    patternCategory: ["effects", "gradient"],
    motionPool: ["Bouncy Spring", "Elastic Snap", "Fast Bounce", "Playful Pop"],
    radiusRange: ["0.5rem", "1.5rem"],
  },

  playful: {
    name: "playful",
    label: "Playful",
    description: "Soft, bouncy, colourful.",
    fontPool: [...ORGANIC_FONTS, ...DISPLAY_FONTS.filter((_, i) => i < 4)],
    patternCategory: ["gradient", "decorative", "effects"],
    motionPool: [
      "Wobbly Reveal",
      "Fast Bounce",
      "Playful Pop",
      "Bouncy Spring",
    ],
    radiusRange: ["0.75rem", "1.5rem"],
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────

export function getPersonality(name: PersonalityName): Personality {
  return PERSONALITIES[name];
}

export function getRandomPersonality(): Personality {
  const names = Object.keys(PERSONALITIES) as PersonalityName[];
  return PERSONALITIES[names[Math.floor(Math.random() * names.length)]];
}

export function getRandomFromPool<T>(pool: readonly T[]): T {
  return pool[Math.floor(Math.random() * pool.length)];
}
