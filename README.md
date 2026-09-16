# Theme Engine

Generate a portfolio theme from one color. The tool picks colors, fonts, motion, border styles, and background patterns that work together.

[Try the prototype](https://nextwork-portfolio-themes.vercel.app)

## Why I built it

Portfolio templates often look alike. I wanted to see how much the whole page could change without rewriting its content or layout.

## What it makes

- Light and dark color palettes with contrast checks
- Font pairs for headings and body text
- Responsive background patterns
- Motion settings and interaction timing
- Border and surface styles
- A downloadable share card that matches the current theme

There are five starting styles. You can also change the colors without changing the rest of the theme.

## How it works

`src/lib/theme-engine.ts` creates the color tokens and theme settings. Other files provide fonts, motion, patterns, and the five starting styles. `ThemeProvider` applies the result through CSS variables, so the same portfolio components can take on different looks.

The portfolio projects and authors shown here are mock data. This is a design and interaction prototype, not a portfolio hosting service.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Three.js, React Three Fiber, and `html2canvas`.

## Run locally

```bash
pnpm install
pnpm dev
```

To check the project:

```bash
pnpm lint
pnpm build
```
