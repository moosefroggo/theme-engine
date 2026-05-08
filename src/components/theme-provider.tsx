"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { generateThemeByPersonality, regenerateTokens, type ThemeSeed } from "@/lib/theme-engine";
import { ALL_FONTS_URL } from "@/lib/fonts";
import {
  getRandomPersonality,
  type PersonalityName,
} from "@/lib/personalities";

interface PersistedState {
  seed: ThemeSeed;
  personality: PersonalityName;
  mode: "light" | "dark";
}

interface ThemeContextType {
  seed: ThemeSeed;
  personality: PersonalityName;
  mode: "light" | "dark";
  /** Randomize within current personality (new colour + new picks from pools). */
  shuffle: () => void;
  /** Switch to a different personality (generates fresh seed). */
  switchPersonality: (name: PersonalityName) => void;
  /** Pick a random personality and generate a fresh seed. */
  randomizePersonality: () => void;
  /** Toggle between light and dark mode. */
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "nextwork-theme-seed";
const PERSONALITY_KEY = "nextwork-theme-personality";
const MODE_KEY = "nextwork-theme-mode";

// Deterministic default that matches globals.css :root variables.
// Server and client both start here to avoid hydration mismatch.
const DEFAULT_PERSONALITY: PersonalityName = "clean";

const DEFAULT_SEED: ThemeSeed = {
  vibe: "light",
  primaryColor: "#0a0a0a",
  radius: "0.5rem",
  fontDisplay: "'Inter', sans-serif",
  fontBody: "'Inter', sans-serif",
  fontPair: {
    name: "Operator",
    display: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    googleFontsUrl: "",
    vibes: ["light", "dark"],
    category: "geometric",
  },
  motionProfile: {
    name: "Smooth Tween",
    description: "Smooth, professional fades",
    type: "tween",
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  },
  pattern: {
    name: "Grid Math",
    category: "geometric",
    css: "",
    vibes: ["light"],
  },
  backgroundType: "pattern",
  tokens: {},
};

function loadPersistedState(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const rawSeed = localStorage.getItem(STORAGE_KEY);
    const rawPersonality = localStorage.getItem(PERSONALITY_KEY);
    const rawMode = localStorage.getItem(MODE_KEY);
    const mode = (rawMode === "dark" ? "dark" : "light") as "light" | "dark";
    if (rawSeed && rawPersonality) {
      return {
        seed: JSON.parse(rawSeed) as ThemeSeed,
        personality: rawPersonality as PersonalityName,
        mode,
      };
    }
    if (rawSeed) {
      return {
        seed: JSON.parse(rawSeed) as ThemeSeed,
        personality: DEFAULT_PERSONALITY,
        mode,
      };
    }
  } catch {
    // corrupted data — fall through
  }
  return null;
}

function savePersistedState(
  seed: ThemeSeed,
  personality: PersonalityName,
  mode: "light" | "dark",
) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    localStorage.setItem(PERSONALITY_KEY, personality);
    localStorage.setItem(MODE_KEY, mode);
  } catch {
    // storage full or disabled — silently ignore
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start with the deterministic default so SSR + client match.
  const [seed, setSeed] = useState<ThemeSeed>(DEFAULT_SEED);
  const [personality, setPersonality] =
    useState<PersonalityName>(DEFAULT_PERSONALITY);
  const [mode, setMode] = useState<"light" | "dark">("light");

  // After mount, load persisted seed (or generate a fresh one) and hydrate.
  useEffect(() => {
    const stored = loadPersistedState();
    if (stored) {
      setSeed(stored.seed);
      setPersonality(stored.personality);
      setMode(stored.mode || "light");
    } else {
      const fresh = generateThemeByPersonality(DEFAULT_PERSONALITY);
      setSeed(fresh);
      setPersonality(DEFAULT_PERSONALITY);
    }
  }, []);

  const toggleMode = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    // Only swap colour tokens — preserve fonts, pattern, motion, radius
    const tokens = regenerateTokens(seed, next);
    setSeed({ ...seed, tokens });
  };

  /** Randomize within the current personality — new colour + new picks from pools. */
  const shuffle = () => {
    const newSeed = generateThemeByPersonality(personality, undefined, mode);
    setSeed(newSeed);
  };

  /** Switch to a different personality (generates fresh seed). */
  const switchPersonality = (name: PersonalityName) => {
    const newSeed = generateThemeByPersonality(name, undefined, mode);
    setPersonality(name);
    setSeed(newSeed);
  };

  /** Pick a random personality and generate a fresh seed. */
  const randomizePersonality = () => {
    const random = getRandomPersonality();
    const newSeed = generateThemeByPersonality(random.name);
    setPersonality(random.name);
    setSeed(newSeed);
  };

  // Persist seed + personality on every change
  useEffect(() => {
    savePersistedState(seed, personality, mode);
  }, [seed, personality]);

  // Inject CSS variables + pattern background into :root
  useEffect(() => {
    const root = document.documentElement;

    // 1. Color tokens (18+ Shadcn-compatible HSL values)
    Object.entries(seed.tokens).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // 2. Structural tokens
    root.style.setProperty("--radius", seed.radius);
    root.style.setProperty("--font-display-custom", seed.fontDisplay);
    root.style.setProperty("--font-body-custom", seed.fontBody);

    // 3. Pattern background (injected as a <style> tag for easy cleanup)
    let patternStyle = document.getElementById("pattern-inject");
    if (!patternStyle) {
      patternStyle = document.createElement("style");
      patternStyle.id = "pattern-inject";
      document.head.appendChild(patternStyle);
    }
    patternStyle.textContent = `
      .pattern-bg {
        background: ${seed.pattern.css};
        mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
        -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
        opacity: 0.35;
      }
    `;

    // 4. Data attribute for CSS overrides
    root.setAttribute("data-vibe", seed.vibe);
    root.setAttribute("data-personality", personality);
  }, [seed, personality]);

  return (
    <ThemeContext.Provider
      value={{
        seed,
        personality,
        mode,
        shuffle,
        switchPersonality,
        randomizePersonality,
        toggleMode,
      }}
    >
      {/* Preload all fonts so swaps are instant */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href={ALL_FONTS_URL} crossOrigin="anonymous" />
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
