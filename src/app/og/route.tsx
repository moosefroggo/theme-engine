import { ImageResponse } from "next/og";

export const runtime = "edge";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Hsl {
  h: number;
  s: number;
  l: number;
}

// ---------------------------------------------------------------------------
// Hex ↔ HSL conversion (no external dependencies — edge-safe)
// ---------------------------------------------------------------------------

function hexToHsl(hex: string): Hsl {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToHex(hsl: Hsl): string {
  const h = ((hsl.h % 360) + 360) % 360;
  const s = Math.max(0, Math.min(100, hsl.s)) / 100;
  const l = Math.max(0, Math.min(100, hsl.l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ---------------------------------------------------------------------------
// Color derivation (lighten / darken using HSL shifts)
// ---------------------------------------------------------------------------

function deriveColors(primaryHex: string) {
  const primary = hexToHsl(primaryHex);

  // Background: ultra-light or ultra-dark version of primary
  const bgLight: Hsl = {
    h: primary.h,
    s: Math.max(0, primary.s - 60),
    l: 97,
  };
  const bgDark: Hsl = {
    h: primary.h,
    s: Math.max(0, primary.s - 40),
    l: 7,
  };

  // Determine if primary is "light" or "dark" by luminance
  const isPrimaryLight = primary.l > 55;

  // Foreground: contrast against background
  const fgLight: Hsl = { h: primary.h, s: 10, l: 10 };
  const fgDark: Hsl = { h: primary.h, s: 10, l: 93 };

  // Muted foreground for secondary text
  const mutedLight: Hsl = { h: primary.h, s: 8, l: 40 };
  const mutedDark: Hsl = { h: primary.h, s: 8, l: 60 };

  // Card background (slightly off from main bg)
  const cardLight: Hsl = { h: primary.h, s: 20, l: 99 };
  const cardDark: Hsl = { h: primary.h, s: 10, l: 12 };

  const useDark = !isPrimaryLight;

  return {
    primary: primaryHex,
    primaryHsl: primary,
    background: hslToHex(useDark ? bgDark : bgLight),
    foreground: hslToHex(useDark ? fgDark : fgLight),
    muted: hslToHex(useDark ? mutedDark : mutedLight),
    card: hslToHex(useDark ? cardDark : cardLight),
    isDark: useDark,
  };
}

// ---------------------------------------------------------------------------
// Pattern generators (inline SVG backgrounds)
// ---------------------------------------------------------------------------

function getGridSvg(strokeColor: string, opacity: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" fill="none" stroke="${strokeColor}" stroke-opacity="${opacity}" stroke-width="1"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function getDotSvg(fillColor: string, opacity: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.5" fill="${fillColor}" fill-opacity="${opacity}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function getDiagonalSvg(strokeColor: string, opacity: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><line x1="0" y1="40" x2="40" y2="0" stroke="${strokeColor}" stroke-opacity="${opacity}" stroke-width="1"/><line x1="-20" y1="20" x2="20" y2="-20" stroke="${strokeColor}" stroke-opacity="${opacity}" stroke-width="1"/><line x1="20" y1="60" x2="60" y2="20" stroke="${strokeColor}" stroke-opacity="${opacity}" stroke-width="1"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function getConcentricSvg(strokeColor: string, opacity: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="8" fill="none" stroke="${strokeColor}" stroke-opacity="${opacity}" stroke-width="1"/><circle cx="30" cy="30" r="18" fill="none" stroke="${strokeColor}" stroke-opacity="${opacity * 0.7}" stroke-width="1"/><circle cx="30" cy="30" r="28" fill="none" stroke="${strokeColor}" stroke-opacity="${opacity * 0.4}" stroke-width="1"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function getWaveSvg(strokeColor: string, opacity: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40" viewBox="0 0 80 40"><path d="M0 20 Q10 10 20 20 Q30 30 40 20 Q50 10 60 20 Q70 30 80 20" fill="none" stroke="${strokeColor}" stroke-opacity="${opacity}" stroke-width="1"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// ---------------------------------------------------------------------------
// Pattern selector by personality
// ---------------------------------------------------------------------------

function getPatternForPersonality(
  personality: string,
  colors: ReturnType<typeof deriveColors>,
) {
  const strokeColor = colors.primary.replace("#", "%23");
  const opacity = colors.isDark ? 0.25 : 0.2;

  switch (personality) {
    case "clean":
      return {
        css: `${getGridSvg(strokeColor, opacity)}, ${getDotSvg(strokeColor, opacity * 0.6)}`,
        accentShape: "circle" as const,
      };
    case "warm":
      return {
        css: `${getWaveSvg(strokeColor, opacity)}, ${getConcentricSvg(strokeColor, opacity * 0.5)}`,
        accentShape: "blob" as const,
      };
    case "tech":
      return {
        css: `${getGridSvg(strokeColor, opacity * 1.2)}, ${getDiagonalSvg(strokeColor, opacity * 0.5)}`,
        accentShape: "strip" as const,
      };
    case "expressive":
      return {
        css: `${getDiagonalSvg(strokeColor, opacity)}, ${getDotSvg(strokeColor, opacity * 0.8)}`,
        accentShape: "circle" as const,
      };
    case "playful":
      return {
        css: `${getDotSvg(strokeColor, opacity * 1.2)}, ${getWaveSvg(strokeColor, opacity * 0.5)}`,
        accentShape: "blob" as const,
      };
    default:
      return {
        css: `${getGridSvg(strokeColor, opacity)}`,
        accentShape: "circle" as const,
      };
  }
}

// ---------------------------------------------------------------------------
// Font configuration per personality
// ---------------------------------------------------------------------------

function getFontUrl(personality: string): string {
  const displayFamilies: Record<string, string> = {
    clean: "Inter",
    warm: "Playfair+Display",
    tech: "JetBrains+Mono",
    expressive: "Bebas+Neue",
    playful: "Fredoka",
  };

  const display = displayFamilies[personality] ?? "Inter";

  return `https://fonts.googleapis.com/css2?family=${display}:wght@400;700;800&family=Inter:wght@400;500;600;700&display=swap`;
}

function getFontFamilies(personality: string): {
  display: string;
  body: string;
} {
  const map: Record<string, string> = {
    clean: "Inter",
    warm: "Playfair Display",
    tech: "JetBrains Mono",
    expressive: "Bebas Neue",
    playful: "Fredoka",
  };
  return {
    display: map[personality] ?? "Inter",
    body: "Inter",
  };
}

// ---------------------------------------------------------------------------
// Load font data for Satori (matches family names used in JSX)
// ---------------------------------------------------------------------------

async function loadFonts(fontUrl: string, expectedFamilies: string[]) {
  const fontData: Array<{
    name: string;
    data: ArrayBuffer;
    weight: number;
  }> = [];

  try {
    const fontResponse = await fetch(fontUrl);
    if (!fontResponse.ok) throw new Error("Font fetch failed");
    const fontCss = await fontResponse.text();

    // Parse @font-face blocks to map URLs → family names.
    // Google Fonts CSS format:
    //   @font-face { font-family: 'Inter'; src: url(https://...) format('woff2'); }
    const ffRegex =
      /@font-face\s*\{[^}]*font-family:\s*['"]([^'"]+)['"][^}]*url\((https:\/\/[^)]+)\)[^}]*\}/g;
    const urlToFamily = new Map<string, string>();
    let ffm: RegExpExecArray | null;
    while ((ffm = ffRegex.exec(fontCss)) !== null) {
      const family = ffm[1];
      const url = ffm[2];
      if (!urlToFamily.has(url)) {
        urlToFamily.set(url, family);
      }
    }

    // Fallback: if regex didn't match, extract URLs and guess families
    if (urlToFamily.size === 0) {
      const simpleRegex = /url\((https:\/\/[^)]+)\)/g;
      let sm: RegExpExecArray | null;
      while ((sm = simpleRegex.exec(fontCss)) !== null) {
        const url = sm[1];
        const guessedFamily =
          expectedFamilies.find((f) =>
            url.toLowerCase().includes(f.toLowerCase().replace(/\s+/g, "+")),
          ) ?? expectedFamilies[0];
        if (!urlToFamily.has(url)) {
          urlToFamily.set(url, guessedFamily);
        }
      }
    }

    // Load each unique family once
    const seen = new Set<string>();
    for (const [url, family] of urlToFamily) {
      const key = family.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);

      try {
        const res = await fetch(url);
        if (res.ok) {
          fontData.push({
            name: family,
            data: await res.arrayBuffer(),
            weight: 700,
          });
        }
      } catch {
        // Skip failed loads
      }
    }
  } catch {
    // Font CSS fetch failed; proceed without custom fonts
  }

  // Ensure each expected family is present at least once
  for (const family of expectedFamilies) {
    if (!fontData.some((f) => f.name === family)) {
      try {
        // Try a direct woff2 URL for Inter (most common fallback)
        if (family === "Inter") {
          const res = await fetch(
            "https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2",
          );
          if (res.ok) {
            fontData.push({
              name: "Inter",
              data: await res.arrayBuffer(),
              weight: 700,
            });
          }
        }
      } catch {
        // Proceed without this family
      }
    }
  }

  return fontData;
}

// ---------------------------------------------------------------------------
// GET Handler
// ---------------------------------------------------------------------------

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "Portfolio";
  const tagline = searchParams.get("tagline") || "";
  const personality = searchParams.get("personality") || "clean";
  const primaryColor = searchParams.get("primaryColor") || "#0a0a0a";

  // Validate personality
  const validPersonalities = ["clean", "warm", "tech", "expressive", "playful"];
  const safePersonality = validPersonalities.includes(personality)
    ? personality
    : "clean";

  // Validate hex color (basic)
  const hexRegex = /^#[0-9a-fA-F]{6}$/;
  const safeColor = hexRegex.test(primaryColor) ? primaryColor : "#0a0a0a";

  const colors = deriveColors(safeColor);
  const pattern = getPatternForPersonality(safePersonality, colors);
  const fonts = getFontFamilies(safePersonality);
  const fontUrl = getFontUrl(safePersonality);

  // Load fonts — pass both expected family names so they're correctly mapped
  const fontData = await loadFonts(fontUrl, [fonts.display, fonts.body]);

  // ── Accent Shape Renderer ──────────────────────────────────────────

  const AccentShape = () => {
    if (pattern.accentShape === "strip") {
      return (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 8,
            backgroundColor: colors.primary,
            display: "flex",
          }}
        />
      );
    }
    if (pattern.accentShape === "blob") {
      return (
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            backgroundColor: colors.primary,
            opacity: 0.12,
            display: "flex",
          }}
        />
      );
    }
    // circle (default)
    return (
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: colors.primary,
          opacity: 0.18,
          display: "flex",
        }}
      />
    );
  };

  // User initials (max 2 chars)
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: colors.background,
        color: colors.foreground,
        fontFamily: `"${fonts.body}", "Inter", sans-serif`,
        position: "relative",
        overflow: "hidden",
        padding: 80,
      }}
    >
      {/* Pattern background layers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: pattern.css,
          display: "flex",
        }}
      />

      {/* Accent decorative element */}
      <AccentShape />

      {/* Secondary accent: small colored circle bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: colors.primary,
          opacity: 0.35,
          display: "flex",
        }}
      />

      {/* NW Badge - top left */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 60,
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: colors.primary,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 800,
            fontFamily: `"${fonts.display}", "Inter", sans-serif`,
          }}
        >
          NW
        </div>
        <span
          style={{
            fontSize: 20,
            color: colors.muted,
            fontWeight: 400,
          }}
        >
          &times;
        </span>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: colors.card,
            color: colors.foreground,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 800,
            fontFamily: `"${fonts.display}", "Inter", sans-serif`,
            border: `2px solid ${colors.primary}`,
          }}
        >
          {initials}
        </div>
      </div>

      {/* Name - large display text */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          fontFamily: `"${fonts.display}", "Inter", sans-serif`,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: colors.foreground,
          marginBottom: 16,
          maxWidth: "90%",
          position: "relative",
          zIndex: 10,
          display: "flex",
        }}
      >
        {name}
      </div>

      {/* Tagline */}
      {tagline && (
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            fontFamily: `"${fonts.body}", "Inter", sans-serif`,
            color: colors.muted,
            maxWidth: "80%",
            lineHeight: 1.4,
            marginBottom: 80,
            position: "relative",
            zIndex: 10,
            display: "flex",
          }}
        >
          {tagline}
        </div>
      )}

      {/* Bottom section */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 80,
          display: "flex",
          alignItems: "center",
          gap: 8,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: colors.primary,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: `"${fonts.display}", "Inter", sans-serif`,
          }}
        >
          NW
        </div>
        <span
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: colors.muted,
            fontFamily: `"${fonts.body}", "Inter", sans-serif`,
          }}
        >
          Built with NextWork
        </span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: colors.muted,
            opacity: 0.6,
            fontFamily: `"${fonts.body}", "Inter", sans-serif`,
          }}
        >
          &middot; nextwork.org
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: fontData.map((f) => ({
        name: f.name,
        data: f.data,
        weight: f.weight as 700,
        style: "normal" as const,
      })),
    },
  );
}
