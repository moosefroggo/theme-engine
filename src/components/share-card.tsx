"use client";

import { useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { useTheme } from "@/components/theme-provider";
import { MOCK_PROJECTS } from "@/lib/nextwork";

interface ShareCardProps {
  name: string;
  tagline: string;
  /** Override project count (defaults to MOCK_PROJECTS.length) */
  projectCount?: number;
}

/**
 * ShareCard — renders a downloadable 1200×630 social share card.
 *
 * The card reflects the current theme's fonts, colors, and pattern
 * background. A hidden 1200×630 div is rendered off-screen and captured
 * to PNG via html-to-image when the user clicks "Download Card".
 */
export function ShareCard({
  name,
  tagline,
  projectCount = MOCK_PROJECTS.length,
}: ShareCardProps) {
  const { seed } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = useCallback(async () => {
    if (!cardRef.current) {
      setError("Card element not found.");
      return;
    }

    setDownloading(true);
    setError(null);

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });
      const dataUrl = canvas.toDataURL("image/png");

      // Trigger download
      const link = document.createElement("a");
      link.download = `nextwork-portfolio-${name.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate share card:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate image.",
      );
    } finally {
      setDownloading(false);
    }
  }, [name]);

  // Theme-derived colors
  const primaryColor = seed.primaryColor;
  const bgColor = seed.tokens["--background"]
    ? `hsl(${seed.tokens["--background"]})`
    : "#ffffff";
  const fgColor = seed.tokens["--foreground"]
    ? `hsl(${seed.tokens["--foreground"]})`
    : "#0a0a0a";
  const mutedFg = seed.tokens["--muted-foreground"]
    ? `hsl(${seed.tokens["--muted-foreground"]})`
    : "#6b7280";
  const cardBg = seed.tokens["--card"]
    ? `hsl(${seed.tokens["--card"]})`
    : "#f9fafb";
  const borderColor = seed.tokens["--border"]
    ? `hsl(${seed.tokens["--border"]})`
    : "#e5e7eb";

  // Extract first two initials from name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative">
      {/* Download button */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={download}
          disabled={downloading}
          className="px-6 py-3 bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          style={{ borderRadius: "var(--radius)" }}
        >
          {downloading ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Card
            </>
          )}
        </button>

        {error && (
          <p className="text-sm text-destructive text-center max-w-xs">
            {error}
          </p>
        )}

        <p className="text-xs text-muted-foreground text-center max-w-xs">
          Download a shareable portfolio card that reflects your current theme.
        </p>
      </div>

      {/* Hidden render target (positioned off-screen left) */}
      <div
        ref={cardRef}
        className="fixed"
        style={{
          left: "-9999px",
          top: 0,
          width: 1200,
          height: 630,
          overflow: "hidden",
        }}
      >
        {/* --- CARD DESIGN (matches OG image structure) --- */}
        <div
          style={{
            width: 1200,
            height: 630,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            backgroundColor: bgColor,
            color: fgColor,
            fontFamily: seed.fontBody,
            position: "relative",
            overflow: "hidden",
            padding: 80,
          }}
        >
          {/* Pattern background layer (replicates the theme pattern) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: seed.pattern.css,
              maskImage:
                "linear-gradient(to bottom, black 50%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 50%, transparent 100%)",
              opacity: 0.4,
            }}
          />

          {/* Accent circle top-right */}
          <div
            style={{
              position: "absolute",
              top: 40,
              right: 40,
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: primaryColor,
              opacity: 0.18,
            }}
          />

          {/* Small colored circle bottom-left */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 40,
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: primaryColor,
              opacity: 0.35,
            }}
          />

          {/* NW Badge + User initials */}
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
                backgroundColor: primaryColor,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 800,
                fontFamily: seed.fontDisplay,
              }}
            >
              NW
            </div>
            <span
              style={{
                fontSize: 20,
                color: mutedFg,
                fontWeight: 400,
              }}
            >
              ×
            </span>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: cardBg,
                color: fgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 800,
                fontFamily: seed.fontDisplay,
                border: `2px solid ${primaryColor}`,
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
              fontFamily: seed.fontDisplay,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: fgColor,
              marginBottom: 16,
              maxWidth: "90%",
              position: "relative",
              zIndex: 10,
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
                fontFamily: seed.fontBody,
                color: mutedFg,
                maxWidth: "80%",
                lineHeight: 1.4,
                marginBottom: 20,
                position: "relative",
                zIndex: 10,
              }}
            >
              {tagline}
            </div>
          )}

          {/* Project count badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 80,
              position: "relative",
              zIndex: 10,
            }}
          >
            <div
              style={{
                padding: "8px 20px",
                backgroundColor: primaryColor,
                color: "#ffffff",
                fontFamily: seed.fontBody,
                fontSize: 22,
                fontWeight: 600,
                borderRadius: 8,
              }}
            >
              {projectCount} Projects
            </div>
            <div
              style={{
                padding: "8px 20px",
                backgroundColor: "transparent",
                color: mutedFg,
                fontFamily: seed.fontBody,
                fontSize: 18,
                fontWeight: 500,
                borderRadius: 8,
                border: `1px solid ${borderColor}`,
              }}
            >
              {seed.vibe} theme
            </div>
          </div>

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
                backgroundColor: primaryColor,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: seed.fontDisplay,
              }}
            >
              NW
            </div>
            <span
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: mutedFg,
                fontFamily: seed.fontBody,
              }}
            >
              Built with NextWork
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: mutedFg,
                opacity: 0.6,
                fontFamily: seed.fontBody,
              }}
            >
              · nextwork.org
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
