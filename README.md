# Theme Engine — procedural portfolio system

A deterministic design-system generator that turns one seed into a complete portfolio personality: accessible color tokens, typography, motion, border radius, and a responsive background pattern.

**[Try the live prototype →](https://nextwork-portfolio-themes.vercel.app)**

## Why it exists

Most generated portfolios change the content while producing the same visual shell. Theme Engine treats the entire interface as the variable. One action can recombine a large procedural space without an inference call, while keeping the page internally coherent.

## What it generates

- A Shadcn-compatible semantic color system derived from a hex seed
- Light, dark, and expressive modes with contrast validation
- Curated display/body font pairings
- CSS-native responsive background patterns
- Motion profiles and interaction timing
- Border-radius and surface treatments
- A downloadable 1200×630 share card that inherits the active theme

Five curated personalities constrain the design space so results feel intentional rather than arbitrary. Color can also be regenerated independently while the rest of a theme stays stable.

## How it works

`src/lib/theme-engine.ts` produces the semantic tokens and serializable theme seed. Dedicated libraries supply font pairs, motion profiles, patterns, and personality-specific selection pools. `ThemeProvider` applies the generated values as CSS custom properties, allowing the same portfolio components to transform without duplicating markup.

The portfolio projects and authors in this repository are mock data. The project is a design-system and interaction prototype, not a hosted portfolio CMS.

## Stack

- Next.js 16 and React 19
- TypeScript and Tailwind CSS 4
- Framer Motion
- Three.js and React Three Fiber
- `html2canvas` for share-card export

## Run locally

```bash
pnpm install
pnpm dev
```

Checks:

```bash
pnpm lint
pnpm build
```
