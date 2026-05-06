"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";

/**
 * BackgroundCanvas renders the current pattern from the theme seed as a
 * full-bleed fixed background layer with subtle ambient motion.
 *
 * When the pattern changes (e.g. after a shuffle), two overlapping divs
 * crossfade so the transition is smooth rather than a hard cut.
 *
 * R3F Canvas slot reserved for `seed.backgroundType === 'shader'`.
 */
export function BackgroundCanvas() {
  const { seed } = useTheme();

  const [prevPattern, setPrevPattern] = useState(seed.pattern);
  const [currentPattern, setCurrentPattern] = useState(seed.pattern);
  const [fading, setFading] = useState(false);

  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);

  // Inject ambient motion keyframes once
  useEffect(() => {
    let style = document.getElementById("bg-motion");
    if (!style) {
      style = document.createElement("style");
      style.id = "bg-motion";
      style.textContent = `
        @keyframes bg-breathe {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.25; }
          50%      { transform: scale(1.04) rotate(0.4deg); opacity: 0.5; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Crossfade logic
  useEffect(() => {
    if (seed.pattern.name === currentPattern.name) return;

    setPrevPattern(currentPattern);
    setCurrentPattern(seed.pattern);
    setFading(true);

    const timeout = setTimeout(() => {
      setFading(false);
      setPrevPattern(seed.pattern);
    }, 600);

    return () => clearTimeout(timeout);
  }, [seed.pattern.name]); // eslint-disable-line react-hooks/exhaustive-deps

  const showCrossfade = fading && prevPattern.name !== currentPattern.name;

  const layerStyle = (css: string): React.CSSProperties => ({
    background: css,
    maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
    animation: "bg-breathe 12s ease-in-out infinite",
  });

  return (
    <>
      {/* R3F Canvas slot — when seed.backgroundType === 'shader':
      <Canvas className="fixed inset-0 z-0" dpr={[1, 2]}>
        <GradientBlob seed={seed} />
      </Canvas>
      */}

      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Layer A (previous pattern, fades out) */}
        <div
          ref={layerARef}
          className="absolute inset-0"
          style={{
            ...layerStyle(prevPattern.css),
            opacity: showCrossfade ? 0 : 1,
            transition: "opacity 600ms ease",
          }}
        />

        {/* Layer B (current pattern, fades in) */}
        <div
          ref={layerBRef}
          className="absolute inset-0"
          style={{
            ...layerStyle(currentPattern.css),
            opacity: showCrossfade ? 1 : 0,
            transition: "opacity 600ms ease",
          }}
        />
      </div>
    </>
  );
}
