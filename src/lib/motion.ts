import type { VibeType } from "@/lib/theme-engine";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MotionProfile {
  name: string;
  description: string;
  type: "spring" | "tween";
  stiffness?: number;
  damping?: number;
  mass?: number;
  bounce?: number;
  duration?: number;
  ease?: [number, number, number, number];
}

// ---------------------------------------------------------------------------
// Motion Profiles by Vibe
// ---------------------------------------------------------------------------

export const MOTION_PROFILES_BY_VIBE: Record<VibeType, MotionProfile[]> = {
  // -- Light ---------------------------------------------------------------
  light: [
    {
      name: "Smooth Tween",
      description: "A polished, understated tween.",
      type: "tween",
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
    {
      name: "Gentle Spring",
      description: "A soft, pillowy spring.",
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.5,
      bounce: 0,
    },
    {
      name: "Soft Reveal",
      description: "Slightly heavier spring for reveals.",
      type: "spring",
      stiffness: 80,
      damping: 18,
      mass: 0.8,
      bounce: 0,
    },
    {
      name: "Crisp Fade",
      description: "A short, clean fade-in.",
      type: "tween",
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  ],
  // -- Dark ----------------------------------------------------------------
  dark: [
    {
      name: "Mechanical Spring",
      description: "High-stiffness, precise spring.",
      type: "spring",
      stiffness: 400,
      damping: 30,
      mass: 0.3,
      bounce: 0,
    },
    {
      name: "Instant Tween",
      description: "Ultra-fast snap tween.",
      type: "tween",
      duration: 0.15,
      ease: [0, 0, 0.2, 1],
    },
    {
      name: "Sharp Snap",
      description: "Aggressive spring with slight overshoot.",
      type: "spring",
      stiffness: 500,
      damping: 25,
      mass: 0.2,
      bounce: 0,
    },
    {
      name: "Aggressive Linear",
      description: "Pure linear motion.",
      type: "tween",
      duration: 0.12,
      ease: [0, 0, 1, 1],
    },
    {
      name: "Cyber Glitch",
      description: "Extremely stiff spring with micro-bounce.",
      type: "spring",
      stiffness: 600,
      damping: 20,
      mass: 0.1,
      bounce: 0.1,
    },
  ],
  // -- Fun -----------------------------------------------------------------
  fun: [
    {
      name: "Bouncy Spring",
      description: "Classic playful spring.",
      type: "spring",
      stiffness: 200,
      damping: 12,
      mass: 0.5,
      bounce: 0.5,
    },
    {
      name: "Playful Pop",
      description: "High-energy burst.",
      type: "spring",
      stiffness: 300,
      damping: 10,
      mass: 0.3,
      bounce: 0.7,
    },
    {
      name: "Elastic Snap",
      description: "Elastic-band feel.",
      type: "spring",
      stiffness: 250,
      damping: 8,
      mass: 0.4,
      bounce: 0.6,
    },
    {
      name: "Wobbly Reveal",
      description: "Heavy, slow wobble.",
      type: "spring",
      stiffness: 150,
      damping: 10,
      mass: 1,
      bounce: 0.4,
    },
    {
      name: "Fast Bounce",
      description: "Tighter, energetic bounce.",
      type: "spring",
      stiffness: 350,
      damping: 15,
      mass: 0.3,
      bounce: 0.3,
    },
  ],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Pick a random motion profile from those available for the given vibe. */
export function getRandomMotionProfile(vibe: VibeType): MotionProfile {
  const profiles = MOTION_PROFILES_BY_VIBE[vibe];

  if (profiles.length === 0) {
    return {
      name: "Fallback Tween",
      description: "Safe default tween.",
      type: "tween",
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    };
  }

  return profiles[Math.floor(Math.random() * profiles.length)];
}

/**
 * Look up a motion profile by its exact `name` across all vibes.
 * Returns undefined if no profile matches.
 */
export function getMotionProfileByName(
  name: string,
): MotionProfile | undefined {
  for (const vibe of Object.keys(MOTION_PROFILES_BY_VIBE) as VibeType[]) {
    const found = MOTION_PROFILES_BY_VIBE[vibe].find((p) => p.name === name);
    if (found) return found;
  }
  return undefined;
}
