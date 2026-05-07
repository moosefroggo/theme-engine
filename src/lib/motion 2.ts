// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type VibeType = "light" | "dark" | "fun";

export interface MotionProfile {
  /** Human-readable label shown in the UI */
  name: string;
  /** Short description of the feel */
  description: string;
  /** Underlying animation primitive */
  type: "spring" | "tween";
  /** Spring stiffness (only for type "spring") */
  stiffness?: number;
  /** Spring damping ratio (only for type "spring") */
  damping?: number;
  /** Spring mass (only for type "spring") */
  mass?: number;
  /** Framer Motion bounce factor (only for type "spring") */
  bounce?: number;
  /** Tween duration in seconds (only for type "tween") */
  duration?: number;
  /** Cubic-bezier easing tuple (only for type "tween") */
  ease?: number[];
}

// ---------------------------------------------------------------------------
// Motion Profiles by Vibe
// ---------------------------------------------------------------------------

export const MOTION_PROFILES_BY_VIBE: Record<VibeType, MotionProfile[]> = {
  // -- Light ---------------------------------------------------------------
  light: [
    {
      name: "Smooth Tween",
      description:
        "A polished, understated tween that feels modern without drawing attention to itself.",
      type: "tween",
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
    {
      name: "Gentle Spring",
      description:
        "A soft, pillowy spring that settles quickly with zero bounce — ideal for corporate or minimal sites.",
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.5,
      bounce: 0,
    },
    {
      name: "Soft Reveal",
      description:
        "Slightly heavier spring for staggered reveals; feels deliberate and calm.",
      type: "spring",
      stiffness: 80,
      damping: 18,
      mass: 0.8,
      bounce: 0,
    },
    {
      name: "Crisp Fade",
      description:
        "A short, clean fade-in with a subtle deceleration curve — perfect for opacity transitions.",
      type: "tween",
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  ],

  // -- Dark ----------------------------------------------------------------
  dark: [
    {
      name: "Mechanical Spring",
      description:
        "High-stiffness spring with almost zero overshoot — precise, technical, snappy.",
      type: "spring",
      stiffness: 400,
      damping: 30,
      mass: 0.3,
      bounce: 0,
    },
    {
      name: "Instant Tween",
      description:
        "Ultra-fast tween that snaps elements into place with a sharp ease-out.",
      type: "tween",
      duration: 0.15,
      ease: [0, 0, 0.2, 1],
    },
    {
      name: "Sharp Snap",
      description:
        "Aggressive spring with a hint of overshoot for a mechanical, high-precision feel.",
      type: "spring",
      stiffness: 500,
      damping: 25,
      mass: 0.2,
      bounce: 0,
    },
    {
      name: "Aggressive Linear",
      description:
        "No curve — purely linear motion that conveys raw speed and brutalist aesthetics.",
      type: "tween",
      duration: 0.12,
      ease: [0, 0, 1, 1],
    },
    {
      name: "Cyber Glitch",
      description:
        "Extremely stiff spring with a micro-bounce; evokes digital / cyberpunk interfaces.",
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
      description:
        "The classic playful spring — lots of wobble and personality.",
      type: "spring",
      stiffness: 200,
      damping: 12,
      mass: 0.5,
      bounce: 0.5,
    },
    {
      name: "Playful Pop",
      description:
        "High energy, big overshoot — feels like a burst of confetti.",
      type: "spring",
      stiffness: 300,
      damping: 10,
      mass: 0.3,
      bounce: 0.7,
    },
    {
      name: "Elastic Snap",
      description:
        "Elastic-band feel with a satisfying settle; great for pull-to-refresh or hero elements.",
      type: "spring",
      stiffness: 250,
      damping: 8,
      mass: 0.4,
      bounce: 0.6,
    },
    {
      name: "Wobbly Reveal",
      description:
        "Heavy, slow wobble — gives elements a gelatinous, quirky entrance.",
      type: "spring",
      stiffness: 150,
      damping: 10,
      mass: 1,
      bounce: 0.4,
    },
    {
      name: "Fast Bounce",
      description:
        "Tighter bounce that still feels energetic but settles quickly.",
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
    // Fallback — should never happen with the data above, but safe.
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
