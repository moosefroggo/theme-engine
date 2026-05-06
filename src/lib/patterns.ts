/**
 * PATTERN LIBRARY
 *
 * 150+ CSS background patterns inspired by PatternCraft (https://patterncraft.fun).
 * All patterns use CSS custom properties (hsl(var(--xxx))) so they respond to theme changes.
 *
 * Usage:
 *   import { PATTERNS, getPatternsByVibe, getRandomPattern, getPatternsByCategory } from '@/lib/patterns';
 *
 *   <div style={{ background: pattern.css }} />
 */

import type { VibeType } from '@/lib/theme-engine';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PatternDef {
  name: string;
  category: 'gradient' | 'geometric' | 'decorative' | 'effects';
  /** CSS background property value - usable directly as `style={{ background: pattern.css }}` */
  css: string;
  vibes: VibeType[];
  description?: string;
}

// ---------------------------------------------------------------------------
// Helper: build a multi-layer background shorthand
// ---------------------------------------------------------------------------

/**
 * Join multiple background layers into a single background shorthand string.
 * Each layer is a complete `<image> [<position>[/<size>]]? [repeat]?` partial.
 * The final string is usable as the CSS `background` property value.
 */
function bg(...layers: string[]): string {
  return layers.join(', ');
}

// ---------------------------------------------------------------------------
// GEOMETRIC PATTERNS (~55 patterns)
// ---------------------------------------------------------------------------

const GEOMETRIC: PatternDef[] = [
  // ---- Basic grids ----
  {
    name: 'grid-4',
    category: 'geometric',
    css: bg(
      'linear-gradient(to right, hsl(var(--border) / 0.4) 1px, transparent 1px) 0 0 / 4px 4px',
      'linear-gradient(to bottom, hsl(var(--border) / 0.4) 1px, transparent 1px) 0 0 / 4px 4px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Ultra-fine 4px grid. Ideal for blueprint or graph-paper aesthetics.',
  },
  {
    name: 'grid-8',
    category: 'geometric',
    css: bg(
      'linear-gradient(to right, hsl(var(--border) / 0.45) 1px, transparent 1px) 0 0 / 8px 8px',
      'linear-gradient(to bottom, hsl(var(--border) / 0.45) 1px, transparent 1px) 0 0 / 8px 8px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Tight 8px engineering grid.',
  },
  {
    name: 'grid-16',
    category: 'geometric',
    css: bg(
      'linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px) 0 0 / 16px 16px',
      'linear-gradient(to bottom, hsl(var(--border) / 0.5) 1px, transparent 1px) 0 0 / 16px 16px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Standard 16px grid. Works everywhere.',
  },
  {
    name: 'grid-20',
    category: 'geometric',
    css: bg(
      'linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px) 0 0 / 20px 20px',
      'linear-gradient(to bottom, hsl(var(--border) / 0.5) 1px, transparent 1px) 0 0 / 20px 20px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Comfortable 20px grid. Great for dashboards.',
  },
  {
    name: 'grid-32',
    category: 'geometric',
    css: bg(
      'linear-gradient(to right, hsl(var(--border) / 0.55) 1px, transparent 1px) 0 0 / 32px 32px',
      'linear-gradient(to bottom, hsl(var(--border) / 0.55) 1px, transparent 1px) 0 0 / 32px 32px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Spacious 32px layout grid.',
  },
  {
    name: 'grid-40',
    category: 'geometric',
    css: bg(
      'linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px) 0 0 / 40px 40px',
      'linear-gradient(to bottom, hsl(var(--border) / 0.5) 1px, transparent 1px) 0 0 / 40px 40px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Wide 40px grid with breathing room.',
  },
  {
    name: 'grid-64',
    category: 'geometric',
    css: bg(
      'linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px) 0 0 / 64px 64px',
      'linear-gradient(to bottom, hsl(var(--border) / 0.5) 1px, transparent 1px) 0 0 / 64px 64px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Large 64px architectural grid.',
  },
  {
    name: 'grid-80',
    category: 'geometric',
    css: bg(
      'linear-gradient(to right, hsl(var(--border) / 0.45) 1px, transparent 1px) 0 0 / 80px 80px',
      'linear-gradient(to bottom, hsl(var(--border) / 0.45) 1px, transparent 1px) 0 0 / 80px 80px',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Extra-wide 80px grid for spacious layouts.',
  },

  // ---- Dotted grids ----
  {
    name: 'dot-grid-sm',
    category: 'geometric',
    css: bg(
      'radial-gradient(circle 1px, hsl(var(--foreground) / 0.25) 1px, transparent 1px) 0 0 / 8px 8px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Small dot grid — subtle and versatile.',
  },
  {
    name: 'dot-grid-md',
    category: 'geometric',
    css: bg(
      'radial-gradient(circle 1.5px, hsl(var(--foreground) / 0.3) 1.5px, transparent 1.5px) 0 0 / 16px 16px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Medium dot grid. Classic dot-paper look.',
  },
  {
    name: 'dot-grid-lg',
    category: 'geometric',
    css: bg(
      'radial-gradient(circle 2px, hsl(var(--foreground) / 0.3) 2px, transparent 2px) 0 0 / 24px 24px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Large, airy dot grid.',
  },
  {
    name: 'dot-grid-xl',
    category: 'geometric',
    css: bg(
      'radial-gradient(circle 3px, hsl(var(--foreground) / 0.25) 3px, transparent 3px) 0 0 / 40px 40px',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Extra-large dot grid for hero sections.',
  },
  {
    name: 'dot-grid-fun',
    category: 'geometric',
    css: bg(
      'radial-gradient(circle 2px, hsl(var(--primary) / 0.5) 2px, transparent 2px) 0 0 / 12px 12px',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Playful dot grid with primary-color dots.',
  },

  // ---- Dashed grids ----
  {
    name: 'dash-grid-sm',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.5) 0px, hsl(var(--border) / 0.5) 2px, transparent 2px, transparent 4px) 0 0 / 16px 16px',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.5) 0px, hsl(var(--border) / 0.5) 2px, transparent 2px, transparent 4px) 0 0 / 16px 16px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Fine dashed grid. Drafting-table aesthetic.',
  },
  {
    name: 'dash-grid-md',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.5) 0px, hsl(var(--border) / 0.5) 3px, transparent 3px, transparent 6px) 0 0 / 24px 24px',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.5) 0px, hsl(var(--border) / 0.5) 3px, transparent 3px, transparent 6px) 0 0 / 24px 24px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Medium dashed grid with longer dashes.',
  },
  {
    name: 'dash-grid-lg',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.45) 0px, hsl(var(--border) / 0.45) 6px, transparent 6px, transparent 10px) 0 0 / 40px 40px',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.45) 0px, hsl(var(--border) / 0.45) 6px, transparent 6px, transparent 10px) 0 0 / 40px 40px',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Large dashed grid for architectural plans.',
  },

  // ---- Diagonal grids ----
  {
    name: 'diagonal-45-sm',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(45deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 8px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Fine 45° diagonal stripes.',
  },
  {
    name: 'diagonal-45-md',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(45deg, hsl(var(--border) / 0.45) 0px, hsl(var(--border) / 0.45) 1px, transparent 1px, transparent 16px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Medium 45° diagonal lines.',
  },
  {
    name: 'diagonal-45-lg',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(45deg, hsl(var(--border) / 0.5) 0px, hsl(var(--border) / 0.5) 1px, transparent 1px, transparent 32px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Wide 45° diagonal stripes.',
  },
  {
    name: 'diagonal-neg45-sm',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(-45deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 8px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Fine -45° diagonal stripes.',
  },
  {
    name: 'diagonal-neg45-md',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(-45deg, hsl(var(--border) / 0.45) 0px, hsl(var(--border) / 0.45) 1px, transparent 1px, transparent 16px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Medium -45° diagonal lines.',
  },
  {
    name: 'diagonal-30-sm',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(30deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 10px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Shallow 30° diagonal grid.',
  },
  {
    name: 'diagonal-60-sm',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(60deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 10px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Steep 60° diagonal grid.',
  },
  {
    name: 'diagonal-dashed',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(45deg, hsl(var(--border) / 0.5) 0px, hsl(var(--border) / 0.5) 3px, transparent 3px, transparent 8px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Dashed 45° diagonal lines.',
  },
  {
    name: 'diagonal-dotted',
    category: 'geometric',
    css: bg(
      'radial-gradient(circle 1.5px, hsl(var(--foreground) / 0.35) 1.5px, transparent 1.5px) 0 0 / 12px 12px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Diagonal-leaning dotted field (staggered dots).',
  },

  // ---- Cross diagonal (X pattern) ----
  {
    name: 'cross-diagonal-sm',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(45deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 1px, transparent 1px, transparent 10px)',
      'repeating-linear-gradient(-45deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 1px, transparent 1px, transparent 10px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Fine cross-diagonal mesh (diamond grid).',
  },
  {
    name: 'cross-diagonal-md',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(45deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 20px)',
      'repeating-linear-gradient(-45deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 20px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Medium diamond mesh.',
  },

  // ---- Crosshatch ----
  {
    name: 'crosshatch-fine',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 1px, transparent 1px, transparent 6px)',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 1px, transparent 1px, transparent 6px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Fine crosshatch — like etching or engraving.',
  },
  {
    name: 'crosshatch-medium',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 12px)',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 12px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Classic crosshatch, medium density.',
  },
  {
    name: 'crosshatch-bold',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.5) 0px, hsl(var(--border) / 0.5) 2px, transparent 2px, transparent 16px)',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.5) 0px, hsl(var(--border) / 0.5) 2px, transparent 2px, transparent 16px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Bold, heavy crosshatch.',
  },
  {
    name: 'crosshatch-diagonal',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(45deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 8px)',
      'repeating-linear-gradient(-45deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 8px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Diagonal crosshatch — diamond hatch.',
  },

  // ---- Stripes ----
  {
    name: 'stripes-horizontal',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.3) 0px, hsl(var(--border) / 0.3) 1px, transparent 1px, transparent 8px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Horizontal pinstripes.',
  },
  {
    name: 'stripes-vertical',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.3) 0px, hsl(var(--border) / 0.3) 1px, transparent 1px, transparent 8px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Vertical pinstripes.',
  },
  {
    name: 'stripes-bold-h',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--primary) / 0.15) 0px, hsl(var(--primary) / 0.15) 3px, transparent 3px, transparent 16px)',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Bold horizontal stripes with primary color.',
  },
  {
    name: 'stripes-bold-v',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.15) 0px, hsl(var(--primary) / 0.15) 3px, transparent 3px, transparent 16px)',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Bold vertical stripes with primary color.',
  },

  // ---- Checkerboard ----
  {
    name: 'checker-sm',
    category: 'geometric',
    css: bg(
      'repeating-conic-gradient(hsl(var(--border) / 0.15) 0% 25%, transparent 0% 50%) 0 0 / 16px 16px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Small checkerboard.',
  },
  {
    name: 'checker-md',
    category: 'geometric',
    css: bg(
      'repeating-conic-gradient(hsl(var(--border) / 0.2) 0% 25%, transparent 0% 50%) 0 0 / 32px 32px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Medium checkerboard.',
  },
  {
    name: 'checker-lg',
    category: 'geometric',
    css: bg(
      'repeating-conic-gradient(hsl(var(--border) / 0.2) 0% 25%, transparent 0% 50%) 0 0 / 64px 64px',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Large checkerboard for bold backgrounds.',
  },

  // ---- Polka dots ----
  {
    name: 'polka-sm',
    category: 'geometric',
    css: bg(
      'radial-gradient(circle 3px, hsl(var(--primary) / 0.25) 3px, transparent 3px) 0 0 / 16px 16px',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Small playful polka dots.',
  },
  {
    name: 'polka-md',
    category: 'geometric',
    css: bg(
      'radial-gradient(circle 5px, hsl(var(--primary) / 0.25) 5px, transparent 5px) 0 0 / 24px 24px',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Medium polka dots.',
  },
  {
    name: 'polka-lg',
    category: 'geometric',
    css: bg(
      'radial-gradient(circle 8px, hsl(var(--primary) / 0.2) 8px, transparent 8px) 0 0 / 40px 40px',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Large, bold polka dots.',
  },

  // ---- Hexagonal / Honeycomb ----
  {
    name: 'hex-sm',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(60deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 1px, transparent 1px, transparent 12px)',
      'repeating-linear-gradient(-60deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 1px, transparent 1px, transparent 12px)',
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 1px, transparent 1px, transparent 12px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Fine hexagonal mesh (triple-axis).',
  },
  {
    name: 'hex-md',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(60deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 20px)',
      'repeating-linear-gradient(-60deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 20px)',
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 20px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Medium hexagonal mesh.',
  },
  {
    name: 'honeycomb',
    category: 'geometric',
    css: bg(
      'radial-gradient(circle 6px, transparent 60%, hsl(var(--primary) / 0.2) 60%, hsl(var(--primary) / 0.2) 70%, transparent 70%) 0 0 / 30px 30px',
      'radial-gradient(circle 6px, transparent 60%, hsl(var(--primary) / 0.2) 60%, hsl(var(--primary) / 0.2) 70%, transparent 70%) 15px 9px / 30px 30px',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Honeycomb-inspired hexagonal dot field.',
  },

  // ---- Chevron ----
  {
    name: 'chevron-sm',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(45deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 2px, transparent 2px, transparent 8px, hsl(var(--border) / 0.4) 8px, hsl(var(--border) / 0.4) 10px, transparent 10px, transparent 16px) 0 0 / 16px 16px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Small chevron pattern.',
  },
  {
    name: 'chevron-md',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(45deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 3px, transparent 3px, transparent 12px, hsl(var(--border) / 0.4) 12px, hsl(var(--border) / 0.4) 15px, transparent 15px, transparent 24px) 0 0 / 24px 24px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Medium chevron zigzag.',
  },

  // ---- Zigzag / Lightning ----
  {
    name: 'zigzag-sm',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(135deg, hsl(var(--border) / 0.5) 0px, hsl(var(--border) / 0.5) 2px, transparent 2px, transparent 6px, hsl(var(--border) / 0.5) 6px, hsl(var(--border) / 0.5) 8px, transparent 8px, transparent 12px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Tight zigzag pattern.',
  },
  {
    name: 'zigzag-lg',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(135deg, hsl(var(--primary) / 0.2) 0px, hsl(var(--primary) / 0.2) 4px, transparent 4px, transparent 12px, hsl(var(--primary) / 0.2) 12px, hsl(var(--primary) / 0.2) 16px, transparent 16px, transparent 24px)',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Bold zigzag lightning bolt pattern.',
  },

  // ---- Concentric squares ----
  {
    name: 'concentric-sm',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 8px) 2px 2px / 16px 16px',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 1px, transparent 1px, transparent 8px) 2px 2px / 16px 16px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Concentric nested squares.',
  },
  {
    name: 'concentric-md',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.45) 0px, hsl(var(--border) / 0.45) 2px, transparent 2px, transparent 16px) 4px 4px / 32px 32px',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.45) 0px, hsl(var(--border) / 0.45) 2px, transparent 2px, transparent 16px) 4px 4px / 32px 32px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Bold concentric squares.',
  },

  // ---- Triangles ----
  {
    name: 'triangles-sm',
    category: 'geometric',
    css: bg(
      'repeating-conic-gradient(hsl(var(--border) / 0.2) 0% 4%, transparent 4% 8%) 0 0 / 20px 20px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Small repeating triangles via conic gradient.',
  },
  {
    name: 'triangles-md',
    category: 'geometric',
    css: bg(
      'repeating-conic-gradient(hsl(var(--primary) / 0.15) 0% 8%, transparent 8% 16%) 0 0 / 32px 32px',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Medium triangular tessellation.',
  },

  // ---- Diamonds ----
  {
    name: 'diamonds-sm',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(45deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 1px, transparent 1px, transparent 12px)',
      'repeating-linear-gradient(-45deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 1px, transparent 1px, transparent 12px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Small diamond grid.',
  },
  {
    name: 'diamonds-md',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(45deg, hsl(var(--primary) / 0.2) 0px, hsl(var(--primary) / 0.2) 2px, transparent 2px, transparent 20px)',
      'repeating-linear-gradient(-45deg, hsl(var(--primary) / 0.2) 0px, hsl(var(--primary) / 0.2) 2px, transparent 2px, transparent 20px)',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Bold diamond pattern with primary color.',
  },

  // ---- Isometric ----
  {
    name: 'isometric',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(30deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 1px, transparent 1px, transparent 14px)',
      'repeating-linear-gradient(-30deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 1px, transparent 1px, transparent 14px)',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.2) 0px, hsl(var(--border) / 0.2) 1px, transparent 1px, transparent 28px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Isometric grid — three-axis engineering paper.',
  },

  // ---- Woven fabric ----
  {
    name: 'woven-fine',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.3) 0px, hsl(var(--border) / 0.3) 1px, transparent 1px, transparent 4px)',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.3) 0px, hsl(var(--border) / 0.3) 1px, transparent 1px, transparent 4px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Fine woven fabric / linen texture.',
  },
  {
    name: 'woven-medium',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 2px, transparent 2px, transparent 6px)',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 2px, transparent 2px, transparent 6px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Medium woven fabric texture.',
  },
  {
    name: 'woven-diagonal',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(45deg, hsl(var(--border) / 0.3) 0px, hsl(var(--border) / 0.3) 1px, transparent 1px, transparent 6px)',
      'repeating-linear-gradient(-45deg, hsl(var(--border) / 0.3) 0px, hsl(var(--border) / 0.3) 1px, transparent 1px, transparent 6px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Diagonal woven texture (twill).',
  },

  // ---- Herringbone ----
  {
    name: 'herringbone',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(45deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 2px, transparent 2px, transparent 6px, hsl(var(--border) / 0.35) 6px, hsl(var(--border) / 0.35) 8px, transparent 8px, transparent 12px) 0 0 / 16px 16px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Herringbone textile pattern.',
  },

  // ---- Scales ----
  {
    name: 'scales',
    category: 'geometric',
    css: bg(
      'radial-gradient(circle 6px at 50% 30%, transparent 40%, hsl(var(--border) / 0.4) 40%, hsl(var(--border) / 0.4) 42%, transparent 42%) 0 0 / 20px 20px',
      'radial-gradient(circle 6px at 50% 30%, transparent 40%, hsl(var(--border) / 0.4) 40%, hsl(var(--border) / 0.4) 42%, transparent 42%) 10px 10px / 20px 20px',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Overlapping scale / fish-scale pattern.',
  },

  // ---- Plus / Cross pattern ----
  {
    name: 'plus-grid',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 2px, transparent 2px, transparent 8px)',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 2px, transparent 2px, transparent 8px)',
      'radial-gradient(circle 3px, hsl(var(--background)) 3px, transparent 3px) 0 0 / 8px 8px',
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.4) 0px, hsl(var(--border) / 0.4) 2px, transparent 2px, transparent 8px)',
    ),
    vibes: ['light', 'dark', 'fun'],
    description: 'Grid with plus-shaped gaps.',
  },

  // ---- Steps / Pyramid ----
  {
    name: 'pyramid',
    category: 'geometric',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 1px, transparent 1px, transparent 8px)',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.35) 0px, hsl(var(--border) / 0.35) 1px, transparent 1px, transparent 8px)',
      'repeating-linear-gradient(45deg, hsl(var(--primary) / 0.12) 0px, hsl(var(--primary) / 0.12) 2px, transparent 2px, transparent 16px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Pyramid-step illusion with diagonal overlay.',
  },
];

// ---------------------------------------------------------------------------
// GRADIENT PATTERNS (~35 patterns)
// ---------------------------------------------------------------------------

const GRADIENT: PatternDef[] = [
  // ---- Soft pastels ----
  {
    name: 'soft-pastel-warm',
    category: 'gradient',
    css: 'linear-gradient(135deg, hsl(var(--primary) / 0.15) 0%, hsl(var(--background)) 50%, hsl(var(--muted) / 0.4) 100%)',
    vibes: ['light'],
    description: 'Warm, gentle pastel wash.',
  },
  {
    name: 'soft-pastel-cool',
    category: 'gradient',
    css: 'linear-gradient(135deg, hsl(var(--muted) / 0.5) 0%, hsl(var(--background)) 40%, hsl(var(--primary) / 0.12) 100%)',
    vibes: ['light'],
    description: 'Cool, calming pastel gradient.',
  },
  {
    name: 'cotton-candy',
    category: 'gradient',
    css: 'linear-gradient(135deg, hsl(var(--primary) / 0.25) 0%, hsl(var(--muted) / 0.35) 50%, hsl(var(--primary) / 0.15) 100%)',
    vibes: ['fun'],
    description: 'Sweet cotton candy gradient.',
  },
  {
    name: 'soft-blush',
    category: 'gradient',
    css: 'linear-gradient(to bottom right, hsl(var(--primary) / 0.2) 0%, hsl(var(--background)) 60%, hsl(var(--muted) / 0.5) 100%)',
    vibes: ['light', 'fun'],
    description: 'Soft blush / rose-tinted gradient.',
  },

  // ---- Dark depth gradients ----
  {
    name: 'crimson-depth',
    category: 'gradient',
    css: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--primary) / 0.2) 50%, hsl(var(--primary) / 0.4) 100%)',
    vibes: ['dark'],
    description: 'Crimson depth — dark fade into rich primary.',
  },
  {
    name: 'emerald-void',
    category: 'gradient',
    css: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.3) 50%, hsl(var(--primary) / 0.35) 100%)',
    vibes: ['dark'],
    description: 'Emerald void — deep green-black gradient.',
  },
  {
    name: 'violet-abyss',
    category: 'gradient',
    css: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--primary) / 0.25) 60%, hsl(var(--primary) / 0.5) 100%)',
    vibes: ['dark'],
    description: 'Violet abyss — plunging into purple darkness.',
  },
  {
    name: 'azure-depths',
    category: 'gradient',
    css: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--primary) / 0.15) 40%, hsl(var(--primary) / 0.4) 100%)',
    vibes: ['dark'],
    description: 'Azure depths — sinking into deep blue.',
  },
  {
    name: 'midnight',
    category: 'gradient',
    css: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.5) 50%, hsl(var(--background)) 100%)',
    vibes: ['dark'],
    description: 'Midnight gradient — dark-muted-dark sandwich.',
  },
  {
    name: 'obsidian',
    category: 'gradient',
    css: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--border) / 0.4) 70%, hsl(var(--background)) 100%)',
    vibes: ['dark'],
    description: 'Obsidian — near-black with subtle edge glow.',
  },

  // ---- Aurora effects ----
  {
    name: 'aurora-waves',
    category: 'gradient',
    css: bg(
      'linear-gradient(180deg, hsl(var(--primary) / 0.25) 0%, transparent 40%)',
      'linear-gradient(180deg, transparent 60%, hsl(var(--muted) / 0.4) 100%)',
      'linear-gradient(135deg, hsl(var(--primary) / 0.15) 0%, transparent 50%, hsl(var(--primary) / 0.1) 100%)',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Aurora waves — layered translucent ribbons.',
  },
  {
    name: 'aurora-dreams',
    category: 'gradient',
    css: bg(
      'radial-gradient(ellipse at 20% 50%, hsl(var(--primary) / 0.3) 0%, transparent 60%)',
      'radial-gradient(ellipse at 80% 40%, hsl(var(--muted) / 0.35) 0%, transparent 60%)',
      'radial-gradient(ellipse at 50% 80%, hsl(var(--primary) / 0.2) 0%, transparent 50%)',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Aurora dreams — soft glowing orbs.',
  },
  {
    name: 'aurora-mystic',
    category: 'gradient',
    css: bg(
      'radial-gradient(ellipse at 30% 30%, hsl(var(--primary) / 0.4) 0%, transparent 50%)',
      'radial-gradient(ellipse at 70% 70%, hsl(var(--muted) / 0.4) 0%, transparent 50%)',
      'linear-gradient(180deg, hsl(var(--primary) / 0.1) 0%, transparent 30%, hsl(var(--muted) / 0.15) 70%)',
      'hsl(var(--background))',
    ),
    vibes: ['fun', 'dark'],
    description: 'Aurora mystic — dramatic diagonal glow.',
  },

  // ---- Sunset / Sunrise ----
  {
    name: 'sunset-warm',
    category: 'gradient',
    css: 'linear-gradient(to top, hsl(var(--primary) / 0.35) 0%, hsl(var(--background)) 50%, hsl(var(--muted) / 0.5) 100%)',
    vibes: ['light', 'fun'],
    description: 'Warm sunset gradient.',
  },
  {
    name: 'dawn-glow',
    category: 'gradient',
    css: 'linear-gradient(to bottom right, hsl(var(--primary) / 0.2) 0%, hsl(var(--background)) 40%, hsl(var(--muted) / 0.4) 100%)',
    vibes: ['light'],
    description: 'Soft dawn glow.',
  },
  {
    name: 'twilight',
    category: 'gradient',
    css: 'linear-gradient(180deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--background)) 40%, hsl(var(--muted) / 0.5) 100%)',
    vibes: ['dark', 'fun'],
    description: 'Twilight sky — deep fading light.',
  },

  // ---- Ocean / Nature ----
  {
    name: 'ocean-breeze',
    category: 'gradient',
    css: 'linear-gradient(180deg, hsl(var(--primary) / 0.15) 0%, hsl(var(--background)) 50%, hsl(var(--muted) / 0.3) 100%)',
    vibes: ['light', 'dark'],
    description: 'Ocean breeze — cool aquatic fade.',
  },
  {
    name: 'forest-canopy',
    category: 'gradient',
    css: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.25) 50%, hsl(var(--primary) / 0.2) 100%)',
    vibes: ['light', 'dark'],
    description: 'Forest canopy — dappled green light.',
  },
  {
    name: 'arctic-frost',
    category: 'gradient',
    css: 'linear-gradient(135deg, hsl(var(--muted) / 0.4) 0%, hsl(var(--background)) 50%, hsl(var(--primary) / 0.1) 100%)',
    vibes: ['light'],
    description: 'Arctic frost — crisp, cool gradient.',
  },

  // ---- Bold / Vibrant ----
  {
    name: 'prismatic-burst',
    category: 'gradient',
    css: 'conic-gradient(from 0deg at 50% 50%, hsl(var(--primary) / 0.3), hsl(var(--muted) / 0.3), hsl(var(--primary) / 0.3), hsl(var(--muted) / 0.3), hsl(var(--primary) / 0.3))',
    vibes: ['fun'],
    description: 'Prismatic burst — conic rainbow sweep.',
  },
  {
    name: 'velvet-night',
    category: 'gradient',
    css: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.3) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, hsl(var(--muted) / 0.35) 0%, transparent 60%), hsl(var(--background))',
    vibes: ['dark'],
    description: 'Velvet night — dual radial glow on dark base.',
  },
  {
    name: 'golden-hour',
    category: 'gradient',
    css: 'linear-gradient(135deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--background)) 40%, hsl(var(--muted) / 0.45) 100%)',
    vibes: ['light', 'fun'],
    description: 'Golden hour — warm, luminous gradient.',
  },
  {
    name: 'neon-dusk',
    category: 'gradient',
    css: 'linear-gradient(135deg, hsl(var(--primary) / 0.4) 0%, hsl(var(--background)) 50%, hsl(var(--muted) / 0.5) 100%)',
    vibes: ['fun', 'dark'],
    description: 'Neon dusk — vibrant horizon glow.',
  },

  // ---- Radial center ----
  {
    name: 'radial-soft-center',
    category: 'gradient',
    css: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.12) 0%, transparent 60%), hsl(var(--background))',
    vibes: ['light'],
    description: 'Soft centered radial glow.',
  },
  {
    name: 'radial-dark-center',
    category: 'gradient',
    css: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.3) 0%, transparent 60%), hsl(var(--background))',
    vibes: ['dark'],
    description: 'Dark centered radial glow.',
  },
  {
    name: 'radial-fun-center',
    category: 'gradient',
    css: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.35) 0%, hsl(var(--muted) / 0.25) 40%, transparent 70%), hsl(var(--background))',
    vibes: ['fun'],
    description: 'Vibrant centered radial burst.',
  },

  // ---- Multi-stop gradients ----
  {
    name: 'deep-space',
    category: 'gradient',
    css: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--primary) / 0.1) 30%, hsl(var(--muted) / 0.25) 60%, hsl(var(--primary) / 0.15) 100%)',
    vibes: ['dark'],
    description: 'Deep space — layered dark gradient.',
  },
  {
    name: 'berry-smoothie',
    category: 'gradient',
    css: 'linear-gradient(135deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--muted) / 0.3) 50%, hsl(var(--primary) / 0.2) 100%)',
    vibes: ['fun'],
    description: 'Berry smoothie — blended vibrant tones.',
  },
  {
    name: 'citrus-burst',
    category: 'gradient',
    css: 'linear-gradient(135deg, hsl(var(--primary) / 0.25) 0%, hsl(var(--background)) 50%, hsl(var(--muted) / 0.4) 100%)',
    vibes: ['fun'],
    description: 'Citrus burst — zesty, bright gradient.',
  },
  {
    name: 'rose-quartz',
    category: 'gradient',
    css: 'linear-gradient(to right, hsl(var(--primary) / 0.15) 0%, hsl(var(--background)) 30%, hsl(var(--muted) / 0.3) 70%, hsl(var(--primary) / 0.1) 100%)',
    vibes: ['light'],
    description: 'Rose quartz — elegant multi-stop pastel.',
  },

  // ---- Northern lights ----
  {
    name: 'northern-lights',
    category: 'gradient',
    css: bg(
      'linear-gradient(160deg, hsl(var(--primary) / 0.2) 0%, transparent 30%)',
      'linear-gradient(200deg, hsl(var(--muted) / 0.3) 0%, transparent 40%)',
      'linear-gradient(180deg, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
      'hsl(var(--background))',
    ),
    vibes: ['fun', 'dark'],
    description: 'Northern lights — layered angled gradients.',
  },
];

// ---------------------------------------------------------------------------
// DECORATIVE PATTERNS (~30 patterns)
// ---------------------------------------------------------------------------

const DECORATIVE: PatternDef[] = [
  // ---- Paper textures ----
  {
    name: 'paper-light',
    category: 'decorative',
    css: bg(
      'linear-gradient(to right, hsl(var(--border) / 0.08) 1px, transparent 1px) 0 0 / 2px 100%',
      'linear-gradient(to bottom, hsl(var(--border) / 0.06) 1px, transparent 1px) 0 0 / 100% 2px',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Paper texture — subtle horizontal/vertical grain.',
  },
  {
    name: 'paper-dark',
    category: 'decorative',
    css: bg(
      'linear-gradient(to right, hsl(var(--border) / 0.1) 1px, transparent 1px) 0 0 / 3px 100%',
      'linear-gradient(to bottom, hsl(var(--border) / 0.08) 1px, transparent 1px) 0 0 / 100% 3px',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'Dark paper texture with subtle grain.',
  },
  {
    name: 'canvas',
    category: 'decorative',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.1) 0px, hsl(var(--border) / 0.1) 1px, transparent 1px, transparent 4px)',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.1) 0px, hsl(var(--border) / 0.1) 1px, transparent 1px, transparent 4px)',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Canvas texture — fine woven fabric look.',
  },
  {
    name: 'linen',
    category: 'decorative',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.12) 0px, hsl(var(--border) / 0.12) 1px, transparent 1px, transparent 5px)',
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.07) 0px, hsl(var(--border) / 0.07) 1px, transparent 1px, transparent 3px)',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Linen texture — uneven weave simulation.',
  },

  // ---- Noise textures (approximated with gradients) ----
  {
    name: 'noise-light',
    category: 'decorative',
    css: bg(
      'repeating-linear-gradient(23deg, hsl(var(--border) / 0.04) 0px, transparent 1px, transparent 2px) 0 0 / 3px 3px',
      'repeating-linear-gradient(67deg, hsl(var(--border) / 0.04) 0px, transparent 1px, transparent 2px) 0 0 / 3px 3px',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Noise light — pseudo-random speckle.',
  },
  {
    name: 'noise-dark',
    category: 'decorative',
    css: bg(
      'repeating-linear-gradient(23deg, hsl(var(--border) / 0.08) 0px, transparent 1px, transparent 2px) 0 0 / 3px 3px',
      'repeating-linear-gradient(67deg, hsl(var(--border) / 0.08) 0px, transparent 1px, transparent 2px) 0 0 / 3px 3px',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'Noise dark — higher contrast speckle.',
  },
  {
    name: 'grain-light',
    category: 'decorative',
    css: bg(
      'radial-gradient(circle 0.5px, hsl(var(--foreground) / 0.06) 0.5px, transparent 0.5px) 0 0 / 2px 2px',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Grain light — ultra-fine dust texture.',
  },
  {
    name: 'grain-dark',
    category: 'decorative',
    css: bg(
      'radial-gradient(circle 0.5px, hsl(var(--foreground) / 0.1) 0.5px, transparent 0.5px) 0 0 / 2px 2px',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'Grain dark — fine dust on dark surface.',
  },
  {
    name: 'speckle-light',
    category: 'decorative',
    css: bg(
      'radial-gradient(circle 1px, hsl(var(--foreground) / 0.05) 1px, transparent 1px) 3px 3px / 8px 8px',
      'radial-gradient(circle 1px, hsl(var(--foreground) / 0.05) 1px, transparent 1px) 7px 1px / 8px 8px',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Speckle — scattered micro-dots.',
  },
  {
    name: 'speckle-dark',
    category: 'decorative',
    css: bg(
      'radial-gradient(circle 1px, hsl(var(--foreground) / 0.1) 1px, transparent 1px) 3px 3px / 8px 8px',
      'radial-gradient(circle 1px, hsl(var(--foreground) / 0.1) 1px, transparent 1px) 7px 1px / 8px 8px',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'Speckle dark — scattered dots on dark.',
  },

  // ---- Texture overlays ----
  {
    name: 'frosted-glass',
    category: 'decorative',
    css: bg(
      'linear-gradient(135deg, hsl(var(--background) / 0.6) 0%, hsl(var(--background) / 0.2) 50%, hsl(var(--muted) / 0.3) 100%)',
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.08) 0px, transparent 1px, transparent 3px)',
    ),
    vibes: ['light'],
    description: 'Frosted glass — translucent with fine grain.',
  },
  {
    name: 'watercolor-wash',
    category: 'decorative',
    css: bg(
      'radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.15) 0%, transparent 60%)',
      'radial-gradient(ellipse at 70% 80%, hsl(var(--muted) / 0.2) 0%, transparent 60%)',
      'radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 50%)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'fun'],
    description: 'Watercolor wash — soft overlapping color blooms.',
  },
  {
    name: 'ink-bleed',
    category: 'decorative',
    css: bg(
      'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
      'radial-gradient(ellipse at 50% 100%, hsl(var(--muted) / 0.2) 0%, transparent 50%)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Ink bleed — color seeping from edges.',
  },

  // ---- Marble ----
  {
    name: 'marble-light',
    category: 'decorative',
    css: bg(
      'linear-gradient(110deg, transparent 40%, hsl(var(--border) / 0.1) 42%, transparent 44%) 0 0 / 60px 60px',
      'linear-gradient(160deg, hsl(var(--muted) / 0.1) 48%, hsl(var(--border) / 0.12) 50%, transparent 52%) 0 0 / 80px 80px',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Marble light — subtle veining on light base.',
  },
  {
    name: 'marble-dark',
    category: 'decorative',
    css: bg(
      'linear-gradient(110deg, transparent 40%, hsl(var(--border) / 0.15) 42%, transparent 44%) 0 0 / 60px 60px',
      'linear-gradient(160deg, hsl(var(--muted) / 0.15) 48%, hsl(var(--border) / 0.2) 50%, transparent 52%) 0 0 / 80px 80px',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'Marble dark — veined dark stone.',
  },

  // ---- Brushed metal ----
  {
    name: 'brushed-metal',
    category: 'decorative',
    css: bg(
      'repeating-linear-gradient(90deg, hsl(var(--border) / 0.06) 0px, hsl(var(--border) / 0.06) 1px, transparent 1px, transparent 2px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Brushed metal — fine horizontal grain.',
  },
  {
    name: 'brushed-metal-vertical',
    category: 'decorative',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.06) 0px, hsl(var(--border) / 0.06) 1px, transparent 1px, transparent 2px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'dark'],
    description: 'Brushed metal vertical — fine vertical grain.',
  },

  // ---- Concrete / Cement ----
  {
    name: 'concrete',
    category: 'decorative',
    css: bg(
      'radial-gradient(circle 1px, hsl(var(--border) / 0.12) 1px, transparent 1px) 2px 2px / 6px 6px',
      'radial-gradient(circle 0.5px, hsl(var(--border) / 0.08) 0.5px, transparent 0.5px) 5px 1px / 6px 6px',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Concrete — rough aggregate texture.',
  },

  // ---- Snowfall / Confetti ----
  {
    name: 'snowfall',
    category: 'decorative',
    css: bg(
      'radial-gradient(circle 1.5px, hsl(var(--foreground) / 0.12) 1.5px, transparent 1.5px) 3px 3px / 24px 24px',
      'radial-gradient(circle 1px, hsl(var(--foreground) / 0.08) 1px, transparent 1px) 10px 15px / 24px 24px',
      'radial-gradient(circle 2px, hsl(var(--foreground) / 0.1) 2px, transparent 2px) 16px 8px / 24px 24px',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Snowfall — gentle scattered white dots.',
  },
  {
    name: 'confetti-fun',
    category: 'decorative',
    css: bg(
      'radial-gradient(circle 2px, hsl(var(--primary) / 0.4) 2px, transparent 2px) 2px 5px / 16px 16px',
      'radial-gradient(circle 2px, hsl(var(--muted) / 0.4) 2px, transparent 2px) 10px 2px / 16px 16px',
      'radial-gradient(circle 2px, hsl(var(--primary) / 0.35) 2px, transparent 2px) 6px 12px / 16px 16px',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Confetti — playful scattered colorful dots.',
  },

  // ---- Bokeh ----
  {
    name: 'bokeh-light',
    category: 'decorative',
    css: bg(
      'radial-gradient(circle 8px, hsl(var(--primary) / 0.08) 40%, transparent 60%) 5px 5px / 40px 40px',
      'radial-gradient(circle 12px, hsl(var(--muted) / 0.06) 40%, transparent 60%) 25px 25px / 40px 40px',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Bokeh light — soft out-of-focus light circles.',
  },
  {
    name: 'bokeh-dark',
    category: 'decorative',
    css: bg(
      'radial-gradient(circle 8px, hsl(var(--primary) / 0.12) 40%, transparent 60%) 5px 5px / 40px 40px',
      'radial-gradient(circle 12px, hsl(var(--muted) / 0.1) 40%, transparent 60%) 25px 25px / 40px 40px',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'Bokeh dark — soft light circles on dark.',
  },
  {
    name: 'bokeh-fun',
    category: 'decorative',
    css: bg(
      'radial-gradient(circle 10px, hsl(var(--primary) / 0.2) 40%, transparent 60%) 5px 5px / 40px 40px',
      'radial-gradient(circle 15px, hsl(var(--muted) / 0.18) 40%, transparent 60%) 25px 25px / 40px 40px',
      'radial-gradient(circle 8px, hsl(var(--primary) / 0.15) 40%, transparent 60%) 20px 10px / 40px 40px',
      'hsl(var(--background))',
    ),
    vibes: ['fun'],
    description: 'Bokeh fun — vibrant overlapping light circles.',
  },

  // ---- Subtle overlay textures ----
  {
    name: 'film-grain-light',
    category: 'decorative',
    css: bg(
      'repeating-linear-gradient(37deg, hsl(var(--foreground) / 0.03) 0px, transparent 1px, transparent 2px) 0 0 / 2px 2px',
      'repeating-linear-gradient(143deg, hsl(var(--foreground) / 0.03) 0px, transparent 1px, transparent 2px) 0 0 / 2px 2px',
      'hsl(var(--background))',
    ),
    vibes: ['light'],
    description: 'Film grain — subtle analog photography texture.',
  },
  {
    name: 'film-grain-dark',
    category: 'decorative',
    css: bg(
      'repeating-linear-gradient(37deg, hsl(var(--foreground) / 0.06) 0px, transparent 1px, transparent 2px) 0 0 / 2px 2px',
      'repeating-linear-gradient(143deg, hsl(var(--foreground) / 0.06) 0px, transparent 1px, transparent 2px) 0 0 / 2px 2px',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'Film grain dark — pronounced analog grain.',
  },
];

// ---------------------------------------------------------------------------
// EFFECTS PATTERNS (~35 patterns)
// ---------------------------------------------------------------------------

const EFFECTS: PatternDef[] = [
  // ---- Radial glows ----
  {
    name: 'radial-glow-top',
    category: 'effects',
    css: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.25) 0%, transparent 60%), hsl(var(--background))',
    vibes: ['dark', 'fun'],
    description: 'Radial glow from top center.',
  },
  {
    name: 'radial-glow-bottom',
    category: 'effects',
    css: 'radial-gradient(ellipse at 50% 100%, hsl(var(--primary) / 0.25) 0%, transparent 60%), hsl(var(--background))',
    vibes: ['dark', 'fun'],
    description: 'Radial glow from bottom center.',
  },
  {
    name: 'radial-glow-center',
    category: 'effects',
    css: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.3) 0%, transparent 60%), hsl(var(--background))',
    vibes: ['dark', 'fun'],
    description: 'Radial glow from dead center.',
  },
  {
    name: 'radial-glow-corner',
    category: 'effects',
    css: 'radial-gradient(circle at 90% 10%, hsl(var(--primary) / 0.3) 0%, transparent 50%), hsl(var(--background))',
    vibes: ['dark', 'fun'],
    description: 'Radial glow from top-right corner.',
  },
  {
    name: 'radial-glow-dual',
    category: 'effects',
    css: 'radial-gradient(ellipse at 20% 50%, hsl(var(--primary) / 0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, hsl(var(--muted) / 0.2) 0%, transparent 50%), hsl(var(--background))',
    vibes: ['dark', 'fun'],
    description: 'Dual radial glows from left and right.',
  },

  // ---- Spotlight effects ----
  {
    name: 'spotlight-center',
    category: 'effects',
    css: 'radial-gradient(circle 300px at 50% 50%, hsl(var(--primary) / 0.12) 0%, transparent 100%), hsl(var(--background))',
    vibes: ['light', 'dark'],
    description: 'Soft central spotlight.',
  },
  {
    name: 'spotlight-top',
    category: 'effects',
    css: 'radial-gradient(ellipse 400px 200px at 50% 0%, hsl(var(--primary) / 0.15) 0%, transparent 100%), hsl(var(--background))',
    vibes: ['light', 'dark'],
    description: 'Wide spotlight from above.',
  },
  {
    name: 'spotlight-bottom',
    category: 'effects',
    css: 'radial-gradient(ellipse 400px 200px at 50% 100%, hsl(var(--primary) / 0.15) 0%, transparent 100%), hsl(var(--background))',
    vibes: ['light', 'dark'],
    description: 'Wide spotlight from below.',
  },

  // ---- Fade gradients (top / bottom / corner) ----
  {
    name: 'fade-top',
    category: 'effects',
    css: 'linear-gradient(to bottom, hsl(var(--primary) / 0.15) 0%, transparent 30%), hsl(var(--background))',
    vibes: ['light', 'dark', 'fun'],
    description: 'Top-edge fade.',
  },
  {
    name: 'fade-bottom',
    category: 'effects',
    css: 'linear-gradient(to top, hsl(var(--primary) / 0.15) 0%, transparent 30%), hsl(var(--background))',
    vibes: ['light', 'dark', 'fun'],
    description: 'Bottom-edge fade.',
  },
  {
    name: 'fade-left',
    category: 'effects',
    css: 'linear-gradient(to right, hsl(var(--primary) / 0.15) 0%, transparent 30%), hsl(var(--background))',
    vibes: ['light', 'dark', 'fun'],
    description: 'Left-edge fade.',
  },
  {
    name: 'fade-right',
    category: 'effects',
    css: 'linear-gradient(to left, hsl(var(--primary) / 0.15) 0%, transparent 30%), hsl(var(--background))',
    vibes: ['light', 'dark', 'fun'],
    description: 'Right-edge fade.',
  },
  {
    name: 'fade-corner-tl',
    category: 'effects',
    css: 'radial-gradient(ellipse at 0% 0%, hsl(var(--primary) / 0.2) 0%, transparent 50%), hsl(var(--background))',
    vibes: ['light', 'dark', 'fun'],
    description: 'Top-left corner fade.',
  },
  {
    name: 'fade-corner-br',
    category: 'effects',
    css: 'radial-gradient(ellipse at 100% 100%, hsl(var(--primary) / 0.2) 0%, transparent 50%), hsl(var(--background))',
    vibes: ['light', 'dark', 'fun'],
    description: 'Bottom-right corner fade.',
  },

  // ---- Cosmic / Nebula ----
  {
    name: 'cosmic-nebula',
    category: 'effects',
    css: bg(
      'radial-gradient(ellipse at 30% 30%, hsl(var(--primary) / 0.3) 0%, transparent 50%)',
      'radial-gradient(ellipse at 70% 60%, hsl(var(--muted) / 0.3) 0%, transparent 50%)',
      'radial-gradient(ellipse at 50% 80%, hsl(var(--primary) / 0.2) 0%, transparent 40%)',
      'hsl(var(--background))',
    ),
    vibes: ['dark', 'fun'],
    description: 'Cosmic nebula — colorful glowing gas clouds.',
  },
  {
    name: 'starfield',
    category: 'effects',
    css: bg(
      'radial-gradient(circle 1px, hsl(var(--foreground) / 0.5) 1px, transparent 1px) 5px 5px / 50px 50px',
      'radial-gradient(circle 0.5px, hsl(var(--foreground) / 0.35) 0.5px, transparent 0.5px) 20px 15px / 50px 50px',
      'radial-gradient(circle 0.5px, hsl(var(--foreground) / 0.35) 0.5px, transparent 0.5px) 35px 40px / 50px 50px',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'Starfield — scattered stars on deep space.',
  },
  {
    name: 'particle-field',
    category: 'effects',
    css: bg(
      'radial-gradient(circle 1.5px, hsl(var(--primary) / 0.4) 1.5px, transparent 1.5px) 3px 3px / 20px 20px',
      'radial-gradient(circle 1px, hsl(var(--primary) / 0.3) 1px, transparent 1px) 12px 8px / 20px 20px',
      'radial-gradient(circle 0.5px, hsl(var(--foreground) / 0.25) 0.5px, transparent 0.5px) 8px 16px / 20px 20px',
      'hsl(var(--background))',
    ),
    vibes: ['dark', 'fun'],
    description: 'Particle field — floating energy particles.',
  },

  // ---- Synthwave / Retrowave ----
  {
    name: 'synthwave-grid',
    category: 'effects',
    css: bg(
      'linear-gradient(to right, hsl(var(--primary) / 0.2) 1px, transparent 1px) 0 0 / 40px 40px',
      'linear-gradient(to bottom, hsl(var(--primary) / 0.3) 1px, transparent 1px) 0 0 / 40px 40px',
      'hsl(var(--background))',
    ),
    vibes: ['fun', 'dark'],
    description: 'Synthwave grid — neon-outrun perspective grid overlay.',
  },
  {
    name: 'synthwave-sun',
    category: 'effects',
    css: bg(
      'radial-gradient(circle 200px at 50% 70%, hsl(var(--primary) / 0.4) 0%, hsl(var(--muted) / 0.3) 40%, transparent 70%)',
      'linear-gradient(to bottom, transparent 60%, hsl(var(--background)) 100%)',
      'hsl(var(--background))',
    ),
    vibes: ['fun', 'dark'],
    description: 'Synthwave sun — glowing retro sunset orb.',
  },
  {
    name: 'synthwave-horizon',
    category: 'effects',
    css: bg(
      'linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--primary) / 0.3) 50%, hsl(var(--muted) / 0.4) 70%, hsl(var(--background)) 100%)',
      'repeating-linear-gradient(0deg, hsl(var(--primary) / 0.15) 0px, hsl(var(--primary) / 0.15) 1px, transparent 1px, transparent 4px) 0 50% / 100% 50%',
      'hsl(var(--background))',
    ),
    vibes: ['fun', 'dark'],
    description: 'Synthwave horizon — sun strip with scanlines.',
  },

  // ---- Matrix ----
  {
    name: 'matrix-green',
    category: 'effects',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--primary) / 0.15) 0px, hsl(var(--primary) / 0.15) 1px, transparent 1px, transparent 3px)',
      'linear-gradient(to bottom, hsl(var(--primary) / 0.08) 0%, transparent 10%, hsl(var(--primary) / 0.08) 50%, transparent 90%)',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'Matrix green — falling code rain effect.',
  },
  {
    name: 'matrix-rain',
    category: 'effects',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--primary) / 0.2) 0px, transparent 1px, transparent 4px)',
      'radial-gradient(circle 2px, hsl(var(--primary) / 0.3) 40%, transparent 60%) 0 0 / 20px 20px',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'Matrix rain — denser falling glyph effect.',
  },

  // ---- Neon lines ----
  {
    name: 'neon-lines-h',
    category: 'effects',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--primary) / 0.1) 0px, hsl(var(--primary) / 0.1) 1px, transparent 1px, transparent 16px)',
      'repeating-linear-gradient(0deg, hsl(var(--primary) / 0.3) 0px, hsl(var(--primary) / 0.3) 2px, transparent 2px, transparent 64px)',
      'hsl(var(--background))',
    ),
    vibes: ['dark', 'fun'],
    description: 'Neon lines horizontal — glowing horizon bands.',
  },
  {
    name: 'neon-lines-v',
    category: 'effects',
    css: bg(
      'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.1) 0px, hsl(var(--primary) / 0.1) 1px, transparent 1px, transparent 16px)',
      'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.3) 0px, hsl(var(--primary) / 0.3) 2px, transparent 2px, transparent 64px)',
      'hsl(var(--background))',
    ),
    vibes: ['dark', 'fun'],
    description: 'Neon lines vertical — glowing vertical bands.',
  },
  {
    name: 'neon-border-glow',
    category: 'effects',
    css: bg(
      'linear-gradient(to right, hsl(var(--primary) / 0.4) 0px, transparent 3px) 0 0 / 100% 100%',
      'linear-gradient(to bottom, hsl(var(--primary) / 0.3) 0px, transparent 3px) 0 0 / 100% 100%',
      'linear-gradient(to left, hsl(var(--primary) / 0.4) 0px, transparent 3px) 100% 0 / 100% 100%',
      'linear-gradient(to top, hsl(var(--primary) / 0.3) 0px, transparent 3px) 0 100% / 100% 100%',
      'hsl(var(--background))',
    ),
    vibes: ['dark', 'fun'],
    description: 'Neon border glow — glowing frame edges.',
  },

  // ---- Circuit board ----
  {
    name: 'circuit-board',
    category: 'effects',
    css: bg(
      'linear-gradient(to right, hsl(var(--primary) / 0.12) 1px, transparent 1px) 0 0 / 32px 32px',
      'linear-gradient(to bottom, hsl(var(--primary) / 0.12) 1px, transparent 1px) 0 0 / 32px 32px',
      'radial-gradient(circle 2.5px, hsl(var(--primary) / 0.3) 30%, transparent 30%) 4px 4px / 32px 32px',
      'linear-gradient(to right, hsl(var(--primary) / 0.18) 2px, transparent 2px) 0 12px / 64px 64px',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'Circuit board — PCB-like trace pattern.',
  },
  {
    name: 'circuit-board-dense',
    category: 'effects',
    css: bg(
      'linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px) 0 0 / 16px 16px',
      'linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px) 0 0 / 16px 16px',
      'radial-gradient(circle 2px, hsl(var(--primary) / 0.25) 30%, transparent 30%) 2px 2px / 16px 16px',
      'linear-gradient(to right, hsl(var(--primary) / 0.15) 2px, transparent 2px) 0 6px / 48px 48px',
      'linear-gradient(to bottom, hsl(var(--primary) / 0.15) 2px, transparent 2px) 6px 0 / 48px 48px',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'Dense circuit board — complex PCB routing.',
  },

  // ---- Scanlines / CRT ----
  {
    name: 'scanlines',
    category: 'effects',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--foreground) / 0.04) 0px, hsl(var(--foreground) / 0.04) 1px, transparent 1px, transparent 3px)',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'Scanlines — CRT monitor line effect.',
  },
  {
    name: 'crt-screen',
    category: 'effects',
    css: bg(
      'repeating-linear-gradient(0deg, hsl(var(--foreground) / 0.05) 0px, hsl(var(--foreground) / 0.05) 1px, transparent 1px, transparent 4px)',
      'radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
      'hsl(var(--background))',
    ),
    vibes: ['dark'],
    description: 'CRT screen — scanlines with subtle center glow.',
  },

  // ---- Glitch ----
  {
    name: 'glitch-blocks',
    category: 'effects',
    css: bg(
      'linear-gradient(to right, hsl(var(--primary) / 0.12) 0px, hsl(var(--primary) / 0.12) 8px, transparent 8px, transparent 12px, hsl(var(--muted) / 0.15) 12px, hsl(var(--muted) / 0.15) 24px, transparent 24px, transparent 28px) 0 0 / 32px 32px',
      'linear-gradient(to bottom, hsl(var(--primary) / 0.08) 0px, hsl(var(--primary) / 0.08) 6px, transparent 6px, transparent 10px) 4px 0 / 32px 32px',
      'hsl(var(--background))',
    ),
    vibes: ['fun', 'dark'],
    description: 'Glitch blocks — offset rectangular artifacts.',
  },

  // ---- Data stream ----
  {
    name: 'data-stream',
    category: 'effects',
    css: bg(
      'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.15) 0px, hsl(var(--primary) / 0.15) 1px, transparent 1px, transparent 4px)',
      'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.3) 0px, hsl(var(--primary) / 0.3) 1px, transparent 1px, transparent 20px)',
      'hsl(var(--background))',
    ),
    vibes: ['dark', 'fun'],
    description: 'Data stream — digital barcode-style vertical lines.',
  },

  // ---- Pulse ring ----
  {
    name: 'pulse-ring',
    category: 'effects',
    css: bg(
      'radial-gradient(circle 100px at 50% 50%, transparent 0%, hsl(var(--primary) / 0.05) 30%, hsl(var(--primary) / 0.15) 31%, transparent 32%) 0 0 / 100% 100%',
      'radial-gradient(circle 200px at 50% 50%, transparent 0%, hsl(var(--primary) / 0.04) 60%, hsl(var(--primary) / 0.1) 61%, transparent 62%) 0 0 / 100% 100%',
      'hsl(var(--background))',
    ),
    vibes: ['dark', 'fun'],
    description: 'Pulse ring — concentric expanding rings.',
  },

  // ---- Energy field ----
  {
    name: 'energy-field',
    category: 'effects',
    css: bg(
      'repeating-radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.06) 0px, transparent 8px, hsl(var(--primary) / 0.06) 10px, transparent 20px)',
      'hsl(var(--background))',
    ),
    vibes: ['dark', 'fun'],
    description: 'Energy field — concentric ring interference.',
  },

  // ---- Vignette ----
  {
    name: 'vignette',
    category: 'effects',
    css: 'radial-gradient(ellipse at 50% 50%, transparent 50%, hsl(var(--background) / 0.6) 100%), hsl(var(--background))',
    vibes: ['light', 'dark'],
    description: 'Vignette — darkened edges, brighter center.',
  },
  {
    name: 'vignette-strong',
    category: 'effects',
    css: 'radial-gradient(ellipse at 50% 50%, transparent 30%, hsl(var(--background) / 0.8) 100%), hsl(var(--background))',
    vibes: ['dark'],
    description: 'Strong vignette — dramatic edge darkening.',
  },

  // ---- Holographic ----
  {
    name: 'holographic',
    category: 'effects',
    css: bg(
      'linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, transparent 30%, hsl(var(--muted) / 0.15) 60%, transparent 90%)',
      'repeating-linear-gradient(0deg, hsl(var(--border) / 0.06) 0px, transparent 1px, transparent 2px)',
      'hsl(var(--background))',
    ),
    vibes: ['light', 'fun'],
    description: 'Holographic — iridescent sheen with fine grain.',
  },

  // ---- Glass morphism base ----
  {
    name: 'glass-morphism',
    category: 'effects',
    css: bg(
      'linear-gradient(135deg, hsl(var(--background) / 0.4) 0%, hsl(var(--muted) / 0.2) 50%, hsl(var(--background) / 0.4) 100%)',
      'radial-gradient(circle 200px at 30% 30%, hsl(var(--primary) / 0.08) 0%, transparent 100%)',
    ),
    vibes: ['light'],
    description: 'Glass morphism — translucent frosted overlay.',
  },
];

// ---------------------------------------------------------------------------
// MASTER PATTERN REGISTRY
// ---------------------------------------------------------------------------

export const PATTERNS: PatternDef[] = [
  ...GEOMETRIC,
  ...GRADIENT,
  ...DECORATIVE,
  ...EFFECTS,
];

// ---------------------------------------------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Return all patterns tagged with a given vibe.
 */
export function getPatternsByVibe(vibe: VibeType): PatternDef[] {
  return PATTERNS.filter((p) => p.vibes.includes(vibe));
}

/**
 * Return a random pattern tagged with the given vibe.
 * Falls back to a random pattern from the entire library if none match.
 */
export function getRandomPattern(vibe: VibeType): PatternDef {
  const candidates = getPatternsByVibe(vibe);
  const pool = candidates.length > 0 ? candidates : PATTERNS;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Return all patterns in a given category.
 */
export function getPatternsByCategory(category: string): PatternDef[] {
  return PATTERNS.filter((p) => p.category === category);
}
