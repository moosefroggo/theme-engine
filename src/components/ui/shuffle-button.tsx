"use client";

import { useTheme } from "@/components/theme-provider";
import { PERSONALITIES, type PersonalityName } from "@/lib/personalities";
import { useEffect, useRef, useState } from "react";

const PERSONALITY_NAMES = Object.keys(PERSONALITIES) as PersonalityName[];

export function ShuffleButton() {
  const {
    personality,
    mode,
    shuffle,
    switchPersonality,
    randomizePersonality,
    toggleMode,
  } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const def = PERSONALITIES[personality];

  // Close popover on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div
      ref={panelRef}
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2"
    >
      {/* Popover */}
      {open && (
        <div className="bg-popover text-popover-foreground rounded-xl shadow-xl border border-border p-2 min-w-[180px] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 px-3 py-1.5 select-none">
            Personality
          </div>
          {PERSONALITY_NAMES.map((name) => {
            const p = PERSONALITIES[name];
            const isActive = name === personality;
            return (
              <button
                key={name}
                onClick={() => {
                  switchPersonality(name);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 flex items-center justify-between gap-2 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <span>{p.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                )}
              </button>
            );
          })}

          <div className="mx-3 my-1 border-t border-border" />

          <button
            onClick={() => {
              randomizePersonality();
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors duration-150 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M8 8h.01" />
              <path d="M16 8h.01" />
              <path d="M12 12h.01" />
              <path d="M8 16h.01" />
              <path d="M16 16h.01" />
            </svg>
            Randomize
          </button>
        </div>
      )}

      {/* Controls row: dark mode + personality pill side by side */}
      <div className="flex items-center gap-3">
        {/* Dark mode toggle */}
        <button
          onClick={toggleMode}
          className="w-10 h-10 rounded-full bg-background border border-border text-foreground flex items-center justify-center shadow-md hover:bg-muted transition-colors"
          aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
        >
          {mode === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>

        {/* Personality + shuffle pill */}
        <div className="flex items-center gap-1 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-300 ease-out">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="pl-5 pr-1 py-3 text-sm font-semibold transition-all duration-300 ease-out hover:opacity-80"
            aria-expanded={open}
            aria-haspopup="listbox"
          >
            {def.label}
          </button>
          <span
            className="w-px h-5 bg-primary-foreground/20"
            aria-hidden="true"
          />
          <button
            onClick={() => shuffle()}
            className="pr-4 pl-2 py-3 group transition-all duration-300 ease-out hover:scale-105 active:scale-95"
            aria-label="Shuffle within current personality"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 ease-out group-hover:rotate-180"
              aria-hidden="true"
            >
              <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
              <path d="m18 2 4 4-4 4" />
              <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
              <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
              <path d="m18 14 4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
