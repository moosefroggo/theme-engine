import type { VibeType } from "@/lib/theme-engine";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FontPair {
  name: string;
  /** CSS font-family value for headings */
  display: string;
  /** CSS font-family value for body text */
  body: string;
  /** Full Google Fonts CSS API URL that loads this pair */
  googleFontsUrl: string;
  /** Which vibes this pair is suitable for */
  vibes: VibeType[];
  /** Optional stylistic category */
  category?: "geometric" | "editorial" | "mono" | "display" | "organic";
}

// ---------------------------------------------------------------------------
// Curated Font Pairs (60 total — sorted by category, existing first)
// ---------------------------------------------------------------------------

export const FONT_PAIRS: FontPair[] = [
  // =========================================================================
  // GEOMETRIC (14 pairs)
  // =========================================================================

  // -- Geometric (existing) ------------------------------------------------
  {
    name: "Geometric",
    display: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
    vibes: ["light", "dark", "fun"],
    category: "geometric",
  },

  // -- Operator (existing) -------------------------------------------------
  {
    name: "Operator",
    display: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    vibes: ["light", "dark"],
    category: "geometric",
  },

  // -- Swiss ---------------------------------------------------------------
  {
    name: "Swiss",
    display: "'Poppins', sans-serif",
    body: "'Open Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&display=swap",
    vibes: ["light", "fun"],
    category: "geometric",
  },

  // -- Modernist -----------------------------------------------------------
  {
    name: "Modernist",
    display: "'Work Sans', sans-serif",
    body: "'Source Serif 4', serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&family=Source+Serif+4:wght@400;500;600&display=swap",
    vibes: ["light"],
    category: "geometric",
  },

  // -- Round ---------------------------------------------------------------
  {
    name: "Round",
    display: "'Rubik', sans-serif",
    body: "'Nunito Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600&display=swap",
    vibes: ["light", "fun"],
    category: "geometric",
  },

  // -- Jakarta -------------------------------------------------------------
  {
    name: "Jakarta",
    display: "'Plus Jakarta Sans', sans-serif",
    body: "'Inter', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
    vibes: ["light", "dark"],
    category: "geometric",
  },

  // -- Classic -------------------------------------------------------------
  {
    name: "Classic",
    display: "'Montserrat', sans-serif",
    body: "'Merriweather', serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Merriweather:wght@400;500;600&display=swap",
    vibes: ["light"],
    category: "geometric",
  },

  // -- Line ----------------------------------------------------------------
  {
    name: "Line",
    display: "'Raleway', sans-serif",
    body: "'Roboto', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&family=Roboto:wght@400;500;600&display=swap",
    vibes: ["light", "fun"],
    category: "geometric",
  },

  // -- Hat Trick -----------------------------------------------------------
  {
    name: "Hat Trick",
    display: "'Red Hat Display', sans-serif",
    body: "'Public Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;600;700;900&family=Public+Sans:wght@300;400;500;600;700&display=swap",
    vibes: ["light", "dark"],
    category: "geometric",
  },

  // -- Grove ---------------------------------------------------------------
  {
    name: "Grove",
    display: "'Figtree', sans-serif",
    body: "'Urbanist', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Urbanist:wght@300;400;500;600;700&display=swap",
    vibes: ["light", "dark"],
    category: "geometric",
  },

  // -- Clarity -------------------------------------------------------------
  {
    name: "Clarity",
    display: "'Lexend', sans-serif",
    body: "'Noto Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800&family=Noto+Sans:wght@300;400;500;600;700&display=swap",
    vibes: ["light", "dark"],
    category: "geometric",
  },

  // -- Lodge ---------------------------------------------------------------
  {
    name: "Lodge",
    display: "'Cabin', sans-serif",
    body: "'Exo 2', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&family=Exo+2:wght@300;400;500;600;700&display=swap",
    vibes: ["light", "dark"],
    category: "geometric",
  },

  // -- Titan ---------------------------------------------------------------
  {
    name: "Titan",
    display: "'Titillium Web', sans-serif",
    body: "'M PLUS Rounded 1c', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700;900&family=M+PLUS+Rounded+1c:wght@400;500;700;800&display=swap",
    vibes: ["light", "dark", "fun"],
    category: "geometric",
  },

  // -- Epilogue ------------------------------------------------------------
  {
    name: "Epilogue",
    display: "'Epilogue', sans-serif",
    body: "'Sora', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700;800&family=Sora:wght@300;400;500;600;700&display=swap",
    vibes: ["light", "dark"],
    category: "geometric",
  },

  // =========================================================================
  // EDITORIAL (17 pairs)
  // =========================================================================

  // -- Editorial (existing) ------------------------------------------------
  {
    name: "Editorial",
    display: "'Playfair Display', serif",
    body: "'Lora', serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lora:wght@400;500;600&display=swap",
    vibes: ["light", "fun"],
    category: "editorial",
  },

  // -- Magazine (existing) -------------------------------------------------
  {
    name: "Magazine",
    display: "'Cormorant Garamond', serif",
    body: "'Proza Libre', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Proza+Libre:wght@400;500;600&display=swap",
    vibes: ["light"],
    category: "editorial",
  },

  // -- Serif Harmony -------------------------------------------------------
  {
    name: "Serif Harmony",
    display: "'DM Serif Display', serif",
    body: "'DM Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=DM+Serif+Display:wght@400&family=DM+Sans:wght@400;500;600&display=swap",
    vibes: ["light", "fun"],
    category: "editorial",
  },

  // -- Art Book ------------------------------------------------------------
  {
    name: "Art Book",
    display: "'EB Garamond', serif",
    body: "'Libre Franklin', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Libre+Franklin:wght@400;500;600&display=swap",
    vibes: ["light"],
    category: "editorial",
  },

  // -- Luxury --------------------------------------------------------------
  {
    name: "Luxury",
    display: "'Libre Bodoni', serif",
    body: "'Source Sans 3', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Libre+Bodoni:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600&display=swap",
    vibes: ["light", "fun"],
    category: "editorial",
  },

  // -- Literary ------------------------------------------------------------
  {
    name: "Literary",
    display: "'Spectral', serif",
    body: "'Karla', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600;700&family=Karla:wght@400;500;600&display=swap",
    vibes: ["light"],
    category: "editorial",
  },

  // -- Variable (Fraunces) -------------------------------------------------
  {
    name: "Variable",
    display: "'Fraunces', serif",
    body: "'Inter', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap",
    vibes: ["light", "fun"],
    category: "editorial",
  },

  // -- Fashion -------------------------------------------------------------
  {
    name: "Fashion",
    display: "'Bodoni Moda', serif",
    body: "'Overpass', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;500;600;700;800&family=Overpass:wght@300;400;500;600;700&display=swap",
    vibes: ["light", "dark"],
    category: "editorial",
  },

  // -- Crimson -------------------------------------------------------------
  {
    name: "Crimson",
    display: "'Crimson Pro', serif",
    body: "'Figtree', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700;900&family=Figtree:wght@400;500;600;700&display=swap",
    vibes: ["light", "dark"],
    category: "editorial",
  },

  // -- Literata ------------------------------------------------------------
  {
    name: "Literata",
    display: "'Literata', serif",
    body: "'Public Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Literata:wght@400;500;600;700;800&family=Public+Sans:wght@300;400;500;600&display=swap",
    vibes: ["light", "dark"],
    category: "editorial",
  },

  // -- Vollkorn ------------------------------------------------------------
  {
    name: "Vollkorn",
    display: "'Vollkorn', serif",
    body: "'Cabin', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Vollkorn:wght@400;500;600;700;800&family=Cabin:wght@400;500;600;700&display=swap",
    vibes: ["light", "dark"],
    category: "editorial",
  },

  // -- Cardo ---------------------------------------------------------------
  {
    name: "Cardo",
    display: "'Cardo', serif",
    body: "'Noto Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Noto+Sans:wght@300;400;500;600;700&display=swap",
    vibes: ["light"],
    category: "editorial",
  },

  // -- Prata ---------------------------------------------------------------
  {
    name: "Prata",
    display: "'Prata', serif",
    body: "'Alegreya Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Prata:wght@400&family=Alegreya+Sans:wght@300;400;500;700;800&display=swap",
    vibes: ["light", "dark"],
    category: "editorial",
  },

  // -- Alegreya ------------------------------------------------------------
  {
    name: "Alegreya",
    display: "'Alegreya', serif",
    body: "'Alegreya Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;600;700;800&family=Alegreya+Sans:wght@300;400;500;700;800&display=swap",
    vibes: ["light", "dark"],
    category: "editorial",
  },

  // -- Newspaper -----------------------------------------------------------
  {
    name: "Newspaper",
    display: "'PT Serif', serif",
    body: "'PT Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&family=PT+Sans:wght@400;700&display=swap",
    vibes: ["light"],
    category: "editorial",
  },

  // -- Ibarra --------------------------------------------------------------
  {
    name: "Ibarra",
    display: "'Ibarra Real Nova', serif",
    body: "'Urbanist', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:wght@400;500;600;700&family=Urbanist:wght@300;400;500;600;700&display=swap",
    vibes: ["light", "dark"],
    category: "editorial",
  },

  // -- Libre Caslon --------------------------------------------------------
  {
    name: "Libre Caslon",
    display: "'Libre Caslon Text', serif",
    body: "'Red Hat Text', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:wght@400;700&family=Red+Hat+Text:wght@300;400;500;600;700&display=swap",
    vibes: ["light"],
    category: "editorial",
  },

  // =========================================================================
  // MONO (11 pairs)
  // =========================================================================

  // -- Terminal (existing) -------------------------------------------------
  {
    name: "Terminal",
    display: "'Syne', sans-serif",
    body: "'Roboto Mono', monospace",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;600&display=swap",
    vibes: ["dark", "fun"],
    category: "mono",
  },

  // -- Brutalist (existing) ------------------------------------------------
  {
    name: "Brutalist",
    display: "'Space Mono', monospace",
    body: "'Space Mono', monospace",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap",
    vibes: ["dark"],
    category: "mono",
  },

  // -- Tech (existing) -----------------------------------------------------
  {
    name: "Tech",
    display: "'JetBrains Mono', monospace",
    body: "'Inter', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
    vibes: ["dark", "fun"],
    category: "mono",
  },

  // -- Plex ----------------------------------------------------------------
  {
    name: "Plex",
    display: "'IBM Plex Mono', monospace",
    body: "'IBM Plex Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap",
    vibes: ["light", "dark"],
    category: "mono",
  },

  // -- Dev -----------------------------------------------------------------
  {
    name: "Dev",
    display: "'Fira Code', monospace",
    body: "'Fira Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Fira+Sans:wght@400;500;600&display=swap",
    vibes: ["dark", "fun"],
    category: "mono",
  },

  // -- Adobe ---------------------------------------------------------------
  {
    name: "Adobe",
    display: "'Source Code Pro', monospace",
    body: "'Source Sans 3', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600&display=swap",
    vibes: ["light", "dark"],
    category: "mono",
  },

  // -- Console -------------------------------------------------------------
  {
    name: "Console",
    display: "'Inconsolata', monospace",
    body: "'Public Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600;700;800&family=Public+Sans:wght@300;400;500;600&display=swap",
    vibes: ["light", "dark"],
    category: "mono",
  },

  // -- Ubuntu Code ---------------------------------------------------------
  {
    name: "Ubuntu Code",
    display: "'Ubuntu Mono', monospace",
    body: "'Ubuntu', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&family=Ubuntu:wght@300;400;500;700&display=swap",
    vibes: ["light", "dark"],
    category: "mono",
  },

  // -- Courier -------------------------------------------------------------
  {
    name: "Courier",
    display: "'Courier Prime', monospace",
    body: "'Noto Serif', serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Noto+Serif:wght@400;500;600;700&display=swap",
    vibes: ["light"],
    category: "mono",
  },

  // -- Circuit -------------------------------------------------------------
  {
    name: "Circuit",
    display: "'Share Tech Mono', monospace",
    body: "'Titillium Web', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Share+Tech+Mono:wght@400&family=Titillium+Web:wght@300;400;600;700&display=swap",
    vibes: ["dark"],
    category: "mono",
  },

  // -- Overpass Code -------------------------------------------------------
  {
    name: "Overpass Code",
    display: "'Overpass Mono', monospace",
    body: "'Overpass', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@400;500;600;700&family=Overpass:wght@300;400;500;600;700&display=swap",
    vibes: ["light", "dark"],
    category: "mono",
  },

  // =========================================================================
  // ORGANIC (8 pairs)
  // =========================================================================

  // -- Fluid (existing) ----------------------------------------------------
  {
    name: "Fluid",
    display: "'Outfit', sans-serif",
    body: "'DM Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap",
    vibes: ["light", "fun"],
    category: "organic",
  },

  // -- Soft (existing) -----------------------------------------------------
  {
    name: "Soft",
    display: "'Questrial', sans-serif",
    body: "'Karla', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Questrial:wght@400&family=Karla:wght@400;500;600&display=swap",
    vibes: ["light"],
    category: "organic",
  },

  // -- Elegant Soft --------------------------------------------------------
  {
    name: "Elegant Soft",
    display: "'Josefin Sans', sans-serif",
    body: "'Lato', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;600;700&family=Lato:wght@400;700&display=swap",
    vibes: ["light", "fun"],
    category: "organic",
  },

  // -- Friendly ------------------------------------------------------------
  {
    name: "Friendly",
    display: "'Quicksand', sans-serif",
    body: "'Nunito Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600&display=swap",
    vibes: ["fun"],
    category: "organic",
  },

  // -- Comfort -------------------------------------------------------------
  {
    name: "Comfort",
    display: "'Comfortaa', sans-serif",
    body: "'M PLUS Rounded 1c', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=M+PLUS+Rounded+1c:wght@400;500;700;800&display=swap",
    vibes: ["light", "fun"],
    category: "organic",
  },

  // -- Baloo ---------------------------------------------------------------
  {
    name: "Baloo",
    display: "'Baloo 2', sans-serif",
    body: "'Cabin', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Cabin:wght@400;500;600;700&display=swap",
    vibes: ["light", "fun"],
    category: "organic",
  },

  // -- Sora ----------------------------------------------------------------
  {
    name: "Sora",
    display: "'Sora', sans-serif",
    body: "'Lexend', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Lexend:wght@400;500;600;700&display=swap",
    vibes: ["light", "dark"],
    category: "organic",
  },

  // -- Grand ---------------------------------------------------------------
  {
    name: "Grand",
    display: "'Grandstander', sans-serif",
    body: "'Noto Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Grandstander:wght@400;500;600;700;800;900&family=Noto+Sans:wght@300;400;500;600&display=swap",
    vibes: ["light", "dark", "fun"],
    category: "organic",
  },

  // =========================================================================
  // DISPLAY (10 pairs)
  // =========================================================================

  // -- Bold (existing) -----------------------------------------------------
  {
    name: "Bold",
    display: "'Bebas Neue', sans-serif",
    body: "'Manrope', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400&family=Manrope:wght@400;500;600&display=swap",
    vibes: ["dark", "fun"],
    category: "display",
  },

  // -- Architect -----------------------------------------------------------
  {
    name: "Architect",
    display: "'Archivo Black', sans-serif",
    body: "'Archivo', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Archivo+Black:wght@400&family=Archivo:wght@400;500;600&display=swap",
    vibes: ["dark", "fun"],
    category: "display",
  },

  // -- Impact --------------------------------------------------------------
  {
    name: "Impact",
    display: "'Anton', sans-serif",
    body: "'Roboto', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Anton:wght@400&family=Roboto:wght@400;500;600&display=swap",
    vibes: ["dark", "fun"],
    category: "display",
  },

  // -- Deco ----------------------------------------------------------------
  {
    name: "Deco",
    display: "'Abril Fatface', serif",
    body: "'Poppins', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Abril+Fatface:wght@400&family=Poppins:wght@400;500;600&display=swap",
    vibes: ["light", "fun"],
    category: "display",
  },

  // -- Press ---------------------------------------------------------------
  {
    name: "Press",
    display: "'Oswald', sans-serif",
    body: "'Merriweather Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Merriweather+Sans:wght@400;500;600&display=swap",
    vibes: ["dark", "fun"],
    category: "display",
  },

  // -- Teko ----------------------------------------------------------------
  {
    name: "Teko",
    display: "'Teko', sans-serif",
    body: "'Noto Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700&family=Noto+Sans:wght@300;400;500;600&display=swap",
    vibes: ["dark"],
    category: "display",
  },

  // -- Big Shoulders -------------------------------------------------------
  {
    name: "Big Shoulders",
    display: "'Big Shoulders Display', sans-serif",
    body: "'Big Shoulders Text', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;500;600;700;800;900&family=Big+Shoulders+Text:wght@400;500;600;700&display=swap",
    vibes: ["dark"],
    category: "display",
  },

  // -- Alfa ----------------------------------------------------------------
  {
    name: "Alfa",
    display: "'Alfa Slab One', serif",
    body: "'Overpass', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Alfa+Slab+One:wght@400&family=Overpass:wght@300;400;500;600;700&display=swap",
    vibes: ["dark", "fun"],
    category: "display",
  },

  // -- Righteous -----------------------------------------------------------
  {
    name: "Righteous",
    display: "'Righteous', sans-serif",
    body: "'Public Sans', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Righteous:wght@400&family=Public+Sans:wght@300;400;500;600;700&display=swap",
    vibes: ["light", "fun"],
    category: "display",
  },

  // -- Fredoka -------------------------------------------------------------
  {
    name: "Fredoka",
    display: "'Fredoka', sans-serif",
    body: "'M PLUS Rounded 1c', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=M+PLUS+Rounded+1c:wght@400;500;700;800&display=swap",
    vibes: ["light", "fun"],
    category: "display",
  },
];

// ---------------------------------------------------------------------------
// Single Preload URL (all unique families, deduplicated)
// ---------------------------------------------------------------------------

/**
 * A single Google Fonts URL that loads every unique font family across all
 * pairs.  Use this in the root layout to preload everything in one request
 * so that switching between themes never triggers a layout shift.
 */
export const ALL_FONTS_URL: string = (() => {
  // Each entry: [family, param-string-after-colon]
  // Most families use "wght@…" while variable fonts like Fraunces use
  // "opsz,wght@…".
  const families: Array<[string, string]> = [
    // -- Sans-serif families ------------------------------------------------
    ["Alegreya+Sans", "wght@300;400;500;700;800"],
    ["Archivo", "wght@400;500;600"],
    ["Archivo+Black", "wght@400"],
    ["Baloo+2", "wght@400;500;600;700;800"],
    ["Big+Shoulders+Display", "wght@400;500;600;700;800;900"],
    ["Big+Shoulders+Text", "wght@400;500;600;700"],
    ["Cabin", "wght@400;500;600;700"],
    ["Comfortaa", "wght@300;400;500;600;700"],
    ["DM+Sans", "wght@400;500;600"],
    ["Epilogue", "wght@400;500;600;700;800"],
    ["Exo+2", "wght@300;400;500;600;700"],
    ["Figtree", "wght@400;500;600;700;800"],
    ["Fira+Sans", "wght@400;500;600"],
    ["Fredoka", "wght@400;500;600;700"],
    ["Grandstander", "wght@400;500;600;700;800;900"],
    ["IBM+Plex+Sans", "wght@400;500;600"],
    ["Inter", "wght@400;500;600;700"],
    ["Josefin+Sans", "wght@400;500;600;700"],
    ["Karla", "wght@400;500;600"],
    ["Lato", "wght@400;700"],
    ["Lexend", "wght@400;500;600;700;800"],
    ["Libre+Franklin", "wght@400;500;600"],
    ["M+PLUS+Rounded+1c", "wght@400;500;700;800"],
    ["Manrope", "wght@400;500;600"],
    ["Merriweather+Sans", "wght@400;500;600"],
    ["Montserrat", "wght@400;500;600;700"],
    ["Noto+Sans", "wght@300;400;500;600;700"],
    ["Nunito+Sans", "wght@400;500;600"],
    ["Open+Sans", "wght@400;500;600"],
    ["Oswald", "wght@400;500;600;700"],
    ["Outfit", "wght@400;500;600;700"],
    ["Overpass", "wght@300;400;500;600;700"],
    ["Plus+Jakarta+Sans", "wght@400;500;600;700"],
    ["Poppins", "wght@400;500;600;700"],
    ["Proza+Libre", "wght@400;500;600"],
    ["PT+Sans", "wght@400;700"],
    ["Public+Sans", "wght@300;400;500;600;700"],
    ["Quicksand", "wght@400;500;600;700"],
    ["Questrial", "wght@400"],
    ["Raleway", "wght@400;500;600;700"],
    ["Red+Hat+Display", "wght@400;500;600;700;900"],
    ["Red+Hat+Text", "wght@300;400;500;600;700"],
    ["Righteous", "wght@400"],
    ["Roboto", "wght@400;500;600"],
    ["Rubik", "wght@400;500;600;700"],
    ["Sora", "wght@300;400;500;600;700;800"],
    ["Source+Sans+3", "wght@400;500;600"],
    ["Space+Grotesk", "wght@400;500;600;700"],
    ["Syne", "wght@400;500;600;700"],
    ["Teko", "wght@400;500;600;700"],
    ["Titillium+Web", "wght@300;400;600;700;900"],
    ["Ubuntu", "wght@300;400;500;700"],
    ["Urbanist", "wght@300;400;500;600;700"],
    ["Work+Sans", "wght@400;500;600;700"],

    // -- Serif families ----------------------------------------------------
    ["Abril+Fatface", "wght@400"],
    ["Alegreya", "wght@400;500;600;700;800"],
    ["Alfa+Slab+One", "wght@400"],
    ["Anton", "wght@400"],
    ["Bebas+Neue", "wght@400"],
    ["Bodoni+Moda", "wght@400;500;600;700;800"],
    ["Cardo", "wght@400;700"],
    ["Cormorant+Garamond", "wght@400;500;600;700"],
    ["Courier+Prime", "wght@400;700"],
    ["Crimson+Pro", "wght@400;500;600;700;900"],
    ["DM+Serif+Display", "wght@400"],
    ["EB+Garamond", "wght@400;500;600;700"],
    ["Fraunces", "opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700"],
    ["Ibarra+Real+Nova", "wght@400;500;600;700"],
    ["Libre+Bodoni", "wght@400;500;600;700"],
    ["Libre+Caslon+Text", "wght@400;700"],
    ["Literata", "wght@400;500;600;700;800"],
    ["Lora", "wght@400;500;600"],
    ["Merriweather", "wght@400;500;600"],
    ["Noto+Serif", "wght@400;500;600;700"],
    ["Playfair+Display", "wght@400;500;600;700"],
    ["Prata", "wght@400"],
    ["PT+Serif", "wght@400;700"],
    ["Source+Serif+4", "wght@400;500;600"],
    ["Spectral", "wght@400;500;600;700"],
    ["Vollkorn", "wght@400;500;600;700;800"],

    // -- Monospace families ------------------------------------------------
    ["Fira+Code", "wght@400;500;600;700"],
    ["IBM+Plex+Mono", "wght@400;500;600;700"],
    ["Inconsolata", "wght@400;500;600;700;800"],
    ["JetBrains+Mono", "wght@400;500;600;700"],
    ["Overpass+Mono", "wght@400;500;600;700"],
    ["Roboto+Mono", "wght@400;500;600"],
    ["Share+Tech+Mono", "wght@400"],
    ["Source+Code+Pro", "wght@400;500;600;700"],
    ["Space+Mono", "wght@400;700"],
    ["Ubuntu+Mono", "wght@400;700"],
  ];

  const params = families
    .map(([family, param]) => `family=${family}:${param}`)
    .join("&");

  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
})();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Return all font pairs compatible with a given vibe. */
export function getFontPairsByVibe(vibe: VibeType): FontPair[] {
  return FONT_PAIRS.filter((pair) => pair.vibes.includes(vibe));
}

/** Pick a random font pair from those compatible with the given vibe. */
export function getRandomFontPair(vibe: VibeType): FontPair {
  const candidates = getFontPairsByVibe(vibe);

  if (candidates.length === 0) {
    // Should never happen — every vibe has at least one pair, but guard
    // gracefully.
    return FONT_PAIRS[0];
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
}

/** Look up a font pair by its exact `name` (case-sensitive). */
export function getFontPairByName(name: string): FontPair | undefined {
  return FONT_PAIRS.find((pair) => pair.name === name);
}
