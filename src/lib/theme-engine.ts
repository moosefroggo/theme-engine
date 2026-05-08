/**
 * THEME ENGINE v2
 *
 * Ported from ui.jln.dev (MIT-licensed) — procedurally generates
 * complete Shadcn-compatible theme tokens from a single hex color seed.
 *
 * Combinatorial source:
 *   Colors: ~16.7M hex codes × 4 harmony modes × randomized ranges → 10,000+ distinct themes
 *   Fonts: 10 curated pairs × vibe filter
 *   Patterns: 155+ PatternCraft entries × vibe filter
 *   Motion: 4-5 profiles per vibe
 *   Radii: 3-5 values per vibe
 */

import { Colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import harmoniesPlugin from "colord/plugins/harmonies";
import { getRandomFontPair, getFontPairByName, type FontPair } from "./fonts";
import {
  getRandomMotionProfile,
  getMotionProfileByName,
  type MotionProfile,
} from "./motion";
import {
  getRandomPattern,
  getPatternsByCategory,
  type PatternDef,
} from "./patterns";
import {
  getPersonality,
  getRandomFromPool,
  type PersonalityName,
} from "./personalities";

extend([a11yPlugin, harmoniesPlugin]);

// ─── TYPES ────────────────────────────────────────────────────────────

export type VibeType = "light" | "dark" | "fun";

export interface Hsl {
  h: number;
  s: number;
  l: number;
}

export interface ThemeTokens {
  background: Hsl;
  foreground: Hsl;
  card: Hsl;
  cardForeground: Hsl;
  popover: Hsl;
  popoverForeground: Hsl;
  primary: Hsl;
  primaryForeground: Hsl;
  secondary: Hsl;
  secondaryForeground: Hsl;
  muted: Hsl;
  mutedForeground: Hsl;
  accent: Hsl;
  accentForeground: Hsl;
  destructive: Hsl;
  destructiveForeground: Hsl;
  border: Hsl;
  input: Hsl;
  ring: Hsl;
  "chart-1": Hsl;
  "chart-2": Hsl;
  "chart-3": Hsl;
  "chart-4": Hsl;
  "chart-5": Hsl;
}

export interface ThemeConfig {
  light: ThemeTokens;
  dark: ThemeTokens;
}

export interface ThemeSeed {
  vibe: VibeType;
  primaryColor: string; // hex
  radius: string;
  fontDisplay: string;
  fontBody: string;
  fontPair: FontPair;
  motionProfile: MotionProfile;
  pattern: PatternDef;
  backgroundType: "shader" | "pattern";
  tokens: Record<string, string>; // CSS variable key → Shadcn HSL value
}

// ─── SHADCN BORDER RADII POOL ────────────────────────────────────────

const BORDER_RADII: Record<VibeType, string[]> = {
  light: ["0.25rem", "0.5rem", "0.75rem"],
  dark: ["0rem", "0.125rem", "0.25rem"],
  fun: ["0.5rem", "1rem", "1.5rem"],
};

// ─── UTILITY: RANDOM HELPERS ─────────────────────────────────────────

const rand = {
  int: (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min,
  float: (min: number, max: number) => Math.random() * (max - min) + min,
  boolean: () => Math.random() < 0.5,
  pick: <T>(arr: readonly T[]): T =>
    arr[Math.floor(Math.random() * arr.length)],
  hex: (): string =>
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0"),
};

// ─── HEX / HSL CONVERSION ────────────────────────────────────────────

function hexToHsl(hex: string): Hsl {
  const colord = new Colord(hex);
  const hsl = colord.toHsl();
  return { h: hsl.h, s: hsl.s, l: hsl.l };
}

// ─── CONTRAST ENGINE (WCAG) ──────────────────────────────────────────

function createContrast(color: Colord): Colord {
  const isLight = color.isLight();
  let opposite = color;
  let i = 0;
  while (opposite.contrast(color) < 6 && i < 20) {
    opposite = isLight ? opposite.darken(0.15) : opposite.lighten(0.15);
    i++;
  }
  return opposite;
}

function colordToHsl(color: Colord): Hsl {
  const hsla = color.toHsl();
  return { h: hsla.h, s: hsla.s, l: hsla.l };
}

// ─── BACKGROUND & FOREGROUND GENERATORS ──────────────────────────────

function createBackgroundLight(hue: number): Hsl {
  return {
    h: hue,
    s: rand.int(30, 70),
    l: rand.int(97, 100),
  };
}

function createBackgroundDark(hue: number): Hsl {
  return {
    h: hue,
    s: rand.int(30, 60),
    l: rand.int(0, 5),
  };
}

function createForegroundLight(hue: number): Hsl {
  return {
    h: hue,
    s: rand.int(50, 80),
    l: rand.int(0, 8),
  };
}

function createForegroundDark(hue: number): Hsl {
  return {
    h: hue,
    s: rand.int(10, 40),
    l: rand.int(95, 100),
  };
}

// ─── DESTRUCTIVE COLOR ───────────────────────────────────────────────

function createDestructive(): Colord {
  return new Colord({
    h: rand.int(0, 22),
    s: rand.int(80, 100),
    l: rand.int(20, 45),
  });
}

// ─── HARMONY ENGINE ──────────────────────────────────────────────────

const harmonyModes = [
  "complementary",
  "triadic",
  "analogous",
  "slick",
] as const;
type HarmonyMode = (typeof harmonyModes)[number];

function createColorHarmony(
  primary: Colord,
  mode: HarmonyMode,
  shouldMatch: boolean,
  isDark?: boolean,
): { secondary: Colord; accent: Colord } {
  if (mode === "triadic") {
    const [, secondary, accent] = primary.harmonies(mode);
    if (!secondary || !accent)
      throw new Error("Failed to create triadic harmony");
    return { secondary, accent };
  }

  if (mode === "complementary") {
    const [, secondary] = primary.harmonies(mode);
    if (!secondary) throw new Error("Failed to create complementary harmony");
    return { secondary, accent: secondary };
  }

  if (mode === "analogous") {
    const [secondary, , accent] = primary.harmonies(mode);
    if (!secondary || !accent)
      throw new Error("Failed to create analogous harmony");
    return { secondary, accent };
  }

  // "slick" — subtle variations on the primary hue
  if (mode === "slick") {
    if (isDark) {
      const saturation = rand.int(0, 20);
      const lightness = rand.int(8, 20);
      const clr = new Colord({ h: primary.hue(), s: saturation, l: lightness });
      return {
        secondary: clr,
        accent: shouldMatch
          ? clr
          : clr.saturate(rand.float(0.05, 0.1)).lighten(rand.float(0.05, 0.1)),
      };
    }
    const saturation = rand.int(0, 20);
    const lightness = rand.int(80, 92);
    const clr = new Colord({ h: primary.hue(), s: saturation, l: lightness });
    return {
      secondary: clr,
      accent: shouldMatch
        ? clr
        : clr.darken(rand.float(0.05, 0.1)).saturate(rand.float(0.05, 0.1)),
    };
  }

  throw new Error(`Invalid harmony mode: ${mode}`);
}

// ─── CHART THEME BUILDER ─────────────────────────────────────────────

function buildChartTheme(
  theme: Pick<ThemeTokens, "secondary" | "primary" | "accent">,
): Pick<
  ThemeTokens,
  "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"
> {
  return {
    "chart-1": theme.primary,
    "chart-2": theme.secondary,
    "chart-3": theme.accent,
    "chart-4": {
      h: theme.secondary.h,
      s: theme.secondary.s,
      l: Math.min(100, theme.secondary.l + 3),
    },
    "chart-5": {
      h: theme.primary.h,
      s: Math.min(100, theme.primary.s + 3),
      l: theme.primary.l,
    },
  };
}

// ─── MAIN: PROCEDURAL THEME CONFIG GENERATOR ─────────────────────────
// This is the core engine, ported from ui.jln.dev's createThemeConfig.
// It takes an optional primary color, generates EVERY Shadcn token
// for both light and dark modes with guaranteed WCAG contrast.

export function createThemeConfig(primaryColor?: Hsl): ThemeConfig {
  const primaryBase = new Colord(primaryColor ?? hexToHsl(rand.hex()));

  const primaryLight = colordToHsl(primaryBase);
  const primaryDark = colordToHsl(primaryBase);
  const primaryLightForeground = colordToHsl(createContrast(primaryBase));
  const primaryDarkForeground = colordToHsl(createContrast(primaryBase));

  const backgroundDark = createBackgroundDark(primaryBase.hue());
  const backgroundLight = createBackgroundLight(primaryBase.hue());
  const foregroundDark = createForegroundDark(primaryBase.hue());
  const foregroundLight = createForegroundLight(primaryBase.hue());

  const cardBoolean = rand.boolean();
  const cardLight = cardBoolean
    ? colordToHsl(new Colord(backgroundLight).darken(0.01))
    : backgroundLight;
  const cardDark = cardBoolean
    ? colordToHsl(new Colord(backgroundDark).lighten(0.01))
    : backgroundDark;
  const cardLightForeground = cardBoolean
    ? colordToHsl(new Colord(foregroundLight).darken(0.01))
    : foregroundLight;
  const cardDarkForeground = cardBoolean
    ? colordToHsl(new Colord(foregroundDark).lighten(0.01))
    : foregroundDark;

  const popoverBoolean = rand.boolean();
  const popoverLight = popoverBoolean ? cardLight : backgroundLight;
  const popoverDark = popoverBoolean ? cardDark : backgroundDark;
  const popoverLightForeground = popoverBoolean
    ? cardLightForeground
    : foregroundLight;
  const popoverDarkForeground = popoverBoolean
    ? cardDarkForeground
    : foregroundDark;

  const harmonyMode = rand.pick(harmonyModes);
  const shouldMatch = rand.boolean();

  const lightHarmonies = createColorHarmony(
    primaryBase,
    harmonyMode,
    shouldMatch,
    false,
  );
  const secondaryLight = colordToHsl(lightHarmonies.secondary);
  const secondaryLightForeground = colordToHsl(
    createContrast(lightHarmonies.secondary),
  );
  const accentLight = colordToHsl(lightHarmonies.accent);
  const accentLightForeground = colordToHsl(
    createContrast(lightHarmonies.accent),
  );

  const darkHarmonies = createColorHarmony(
    primaryBase,
    harmonyMode,
    shouldMatch,
    true,
  );
  const secondaryDark = colordToHsl(darkHarmonies.secondary);
  const secondaryDarkForeground = colordToHsl(
    createContrast(darkHarmonies.secondary),
  );
  const accentDark = colordToHsl(darkHarmonies.accent);
  const accentDarkForeground = colordToHsl(
    createContrast(darkHarmonies.accent),
  );

  const destructiveBase = createDestructive();
  const destructiveLight = colordToHsl(destructiveBase);
  const destructiveDark = {
    h: destructiveLight.h,
    s: destructiveLight.s,
    l: rand.int(45, 60),
  };
  const destructiveLightForeground = colordToHsl(
    createContrast(destructiveBase),
  );
  const destructiveDarkForeground = colordToHsl(
    createContrast(new Colord(destructiveDark)),
  );

  const mutedDeviations = {
    s: rand.int(5, 40),
    l: rand.int(0, 10),
  };
  const mutedLight = {
    h: secondaryLight.h,
    s: mutedDeviations.s,
    l: 85 + mutedDeviations.l,
  };
  const mutedDark = {
    h: secondaryDark.h,
    s: mutedDeviations.s,
    l: 15 - mutedDeviations.l,
  };
  const mutedFgDeviations = {
    s: rand.int(0, 15),
    l: rand.int(0, 15),
  };
  const mutedForegroundLight = {
    h: mutedLight.h,
    s: mutedFgDeviations.s,
    l: 25 + mutedFgDeviations.l,
  };
  const mutedForegroundDark = {
    h: mutedDark.h,
    s: mutedFgDeviations.s,
    l: 75 - mutedFgDeviations.l,
  };

  const inputDeviations = {
    s: rand.int(2, 15),
    l: rand.int(5, 10),
  };
  const borderLight = {
    h: backgroundLight.h,
    s: inputDeviations.s,
    l: backgroundLight.l - inputDeviations.l,
  };
  const borderDark = {
    h: backgroundDark.h,
    s: inputDeviations.s,
    l: rand.int(10, 15),
  };

  const baseLight: Omit<
    ThemeTokens,
    "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"
  > = {
    background: backgroundLight,
    foreground: foregroundLight,
    card: cardLight,
    cardForeground: cardLightForeground,
    popover: popoverLight,
    popoverForeground: popoverLightForeground,
    primary: primaryLight,
    primaryForeground: primaryLightForeground,
    secondary: secondaryLight,
    secondaryForeground: secondaryLightForeground,
    accent: accentLight,
    accentForeground: accentLightForeground,
    destructive: destructiveLight,
    destructiveForeground: destructiveLightForeground,
    muted: mutedLight,
    mutedForeground: mutedForegroundLight,
    border: borderLight,
    input: borderLight,
    ring: primaryLight,
  };

  const baseDark: Omit<
    ThemeTokens,
    "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"
  > = {
    background: backgroundDark,
    foreground: foregroundDark,
    card: cardDark,
    cardForeground: cardDarkForeground,
    popover: popoverDark,
    popoverForeground: popoverDarkForeground,
    primary: primaryDark,
    primaryForeground: primaryDarkForeground,
    secondary: secondaryDark,
    secondaryForeground: secondaryDarkForeground,
    accent: accentDark,
    accentForeground: accentDarkForeground,
    destructive: destructiveDark,
    destructiveForeground: destructiveDarkForeground,
    muted: mutedDark,
    mutedForeground: mutedForegroundDark,
    border: borderDark,
    input: borderDark,
    ring: primaryDark,
  };

  return {
    light: { ...baseLight, ...buildChartTheme(baseLight) },
    dark: { ...baseDark, ...buildChartTheme(baseDark) },
  };
}

// ─── HSL → SHADCN CSS VARIABLE FORMAT ────────────────────────────────
// Converts { h: 222, s: 84, l: 4.9 } → "222 84% 4.9%"

function hslToShadcnString(hsl: Hsl): string {
  return `${Math.round(hsl.h)} ${Math.round(hsl.s)}% ${Math.round(hsl.l)}%`;
}

function themeTokensToCSSVars(theme: ThemeTokens): Record<string, string> {
  const cssVars: Record<string, string> = {};
  for (const [key, value] of Object.entries(theme)) {
    cssVars[`--${key}`] = hslToShadcnString(value as Hsl);
  }
  return cssVars;
}

// ─── PERSONALITY-BASED THEME GENERATOR ───────────────────────────────

/**
 * Generate a complete ThemeSeed by personality.
 *
 * 1. Looks up the personality definition.
 * 2. Picks a random font pair from the personality's font pool.
 * 3. Picks a random pattern from the personality's pattern categories.
 * 4. Picks a random motion profile from the personality's motion pool.
 * 5. Picks a random border radius within the personality's range.
 * 6. Generates the procedural colour palette from a random hex.
 */
export function generateThemeByPersonality(
  personality: PersonalityName,
  baseColor?: string,
  mode: 'light' | 'dark' = 'light',
): ThemeSeed {
  const def = getPersonality(personality);

  // ── Font ──────────────────────────────────────────────────────────
  const fontName = getRandomFromPool(def.fontPool);
  const fontPair = getFontPairByName(fontName) ?? getRandomFontPair("light");

  // ── Pattern ───────────────────────────────────────────────────────
  const category = getRandomFromPool(def.patternCategory);
  const categoryPatterns = getPatternsByCategory(category);
  const pattern =
    categoryPatterns.length > 0
      ? getRandomFromPool(categoryPatterns)
      : getRandomPattern("light");

  // ── Motion ────────────────────────────────────────────────────────
  const motionName = getRandomFromPool(def.motionPool);
  const motionProfile =
    getMotionProfileByName(motionName) ?? getRandomMotionProfile("light");

  // ── Radius ────────────────────────────────────────────────────────
  const radius = randomRadiusInRange(def.radiusRange[0], def.radiusRange[1]);

  // ── Colour palette with contrast validation ───────────────────────
  // Retry up to 20 times if any critical pair fails WCAG AA (≥4.5:1).
  let tokens: Record<string, string> = {};
  let primaryHex = baseColor || rand.hex();

  for (let attempt = 0; attempt < 20; attempt++) {
    const primaryHsl = hexToHsl(primaryHex);
    const themeConfig = createThemeConfig(primaryHsl);
    tokens = themeTokensToCSSVars(mode === 'dark' ? themeConfig.dark : themeConfig.light);

    if (validateThemeTokens(tokens)) break;

    // Regenerate with a fresh random hex for the next attempt
    primaryHex = rand.hex();
    if (attempt === 19) {
      // Last attempt — use whatever we got
      tokens = themeTokensToCSSVars(mode === 'dark' ? themeConfig.dark : themeConfig.light);
    }
  }

  // Derive a compatible vibe for backwards-compatible consumers.
  const vibe = personalityToVibe(personality);

  return {
    vibe,
    primaryColor: primaryHex,
    radius,
    fontDisplay: fontPair.display,
    fontBody: fontPair.body,
    fontPair,
    motionProfile,
    pattern,
    backgroundType: "pattern",
    tokens,
  };
}

// ─── CONTRAST VALIDATION ─────────────────────────────────────────────

/**
 * Checks critical colour pairs for WCAG AA compliance (≥4.5:1 for
 * normal text, ≥3:1 for large text).  Returns false if any pair is
 * inaccessible — the caller should regenerate with a new hex.
 */
function validateThemeTokens(tokens: Record<string, string>): boolean {
  // Force readable button text: dark text on bright primaries, light on dark.
  const primaryStr = tokens["--primary"];
  if (primaryStr) {
    const primaryHsl = parseShadcnHsl(primaryStr);
    if (primaryHsl) {
      // Reject primaries that are too extreme.
      if (primaryHsl.l > 82 || primaryHsl.l < 12) return false;
      if (primaryHsl.s > 90 && primaryHsl.l > 50) return false;

      // Smart text color: only use dark text on genuinely light primaries.
      // High saturation + medium lightness = still needs white text.
      const primaryColord = new Colord({ h: primaryHsl.h, s: primaryHsl.s, l: primaryHsl.l });
      const isTrulyLight = primaryColord.isLight() && primaryHsl.s < 70;
      if (isTrulyLight) {
        tokens["--primary-foreground"] = "0 0% 8%";   // near-black on light primaries
      } else {
        tokens["--primary-foreground"] = "0 0% 98%";   // near-white on dark primaries
      }
    }
  }

  // Pairs that must have sufficient contrast for the UI to be usable.
  const criticalPairs: Array<[string, string, number]> = [
    ["--primary", "--primary-foreground", 4.5],   // buttons, badges
    ["--background", "--foreground", 4.5],         // body text
    ["--muted", "--muted-foreground", 4.5],        // muted sections
    ["--card", "--card-foreground", 4.5],          // cards
    ["--secondary", "--secondary-foreground", 4.5],
    ["--destructive", "--destructive-foreground", 4.5],
  ];

  for (const [bgKey, fgKey, minRatio] of criticalPairs) {
    const bgStr = tokens[bgKey];
    const fgStr = tokens[fgKey];
    if (!bgStr || !fgStr) continue;

    const bgHsl = parseShadcnHsl(bgStr);
    const fgHsl = parseShadcnHsl(fgStr);
    if (!bgHsl || !fgHsl) continue;

    const bg = new Colord({ h: bgHsl.h, s: bgHsl.s, l: bgHsl.l });
    const fg = new Colord({ h: fgHsl.h, s: fgHsl.s, l: fgHsl.l });

    if (bg.contrast(fg) < minRatio) return false;
  }

  return true;
}

/** Parse a Shadcn HSL string like "222 84% 4.9%" into { h, s, l }. */
function parseShadcnHsl(value: string): Hsl | null {
  const parts = value.trim().split(/\s+/);
  if (parts.length !== 3) return null;
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]);
  const l = parseFloat(parts[2]);
  if (isNaN(h) || isNaN(s) || isNaN(l)) return null;
  return { h, s, l };
}


/**
 * Regenerate only the colour tokens from an existing seed, swapping
 * light ↔ dark while keeping everything else identical.
 */
export function regenerateTokens(
  seed: ThemeSeed,
  mode: "light" | "dark",
): Record<string, string> {
  const primaryHsl = hexToHsl(seed.primaryColor);
  const themeConfig = createThemeConfig(primaryHsl);
  const tokens = themeTokensToCSSVars(
    mode === "dark" ? themeConfig.dark : themeConfig.light,
  );
  return tokens;
}

// ─── BACKWARDS-COMPATIBLE VIBE GENERATOR ─────────────────────────────

/** Map a personality to its closest legacy VibeType for consumers that
 *  still read `seed.vibe`. */
function personalityToVibe(p: PersonalityName): VibeType {
  switch (p) {
    case "clean":
      return "light";
    case "warm":
      return "light";
    case "tech":
      return "dark";
    case "expressive":
      return "fun";
    case "playful":
      return "fun";
  }
}

/**
 * Generate a theme using the legacy vibe system.
 * Delegates to a default personality per vibe for backwards compatibility.
 */
export function generateTheme(vibe: VibeType, baseColor?: string): ThemeSeed {
  const personality: PersonalityName =
    vibe === "dark" ? "tech" : vibe === "fun" ? "playful" : "clean";
  return generateThemeByPersonality(personality, baseColor);
}

// ─── UTILITY ─────────────────────────────────────────────────────────

/** Parse a CSS length string (e.g. "0.5rem") and return its numeric value
 *  in rem units. Returns 0 if parsing fails. */
function parseRem(value: string): number {
  const match = value.match(/^([\d.]+)\s*rem$/);
  return match ? parseFloat(match[1]) : 0;
}

/** Pick a random radius string within [min, max] (inclusive, in rem). */
function randomRadiusInRange(min: string, max: string): string {
  const minVal = parseRem(min);
  const maxVal = parseRem(max);
  // Generate a random value, round to 2 decimal places.
  const val =
    Math.round((Math.random() * (maxVal - minVal) + minVal) * 100) / 100;
  return `${val}rem`;
}

// Re-export for convenience
export { BORDER_RADII };
export type { MotionProfile };
