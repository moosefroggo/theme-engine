// ─── NEXTWORK DATA LAYER ─────────────────────────────────────────────
// Provides project/author types, mock data, and a fetch helper that
// attempts a remote API call before falling back to local mocks.

// ─── TYPES ────────────────────────────────────────────────────────────

export interface NextWorkProject {
  slug: string;
  title: string;
  overview: string;
  description: string;
  goals: string[];
  techStack: string[];
  images?: string[];
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  liveUrl?: string;
  sourceCodeUrl?: string;
}

export interface NextWorkAuthor {
  name: string;
  avatar: string;
  bio: string;
  skills: string[];
  links: {
    label: string;
    url: string;
  }[];
}

// ─── MOCK PROJECTS ────────────────────────────────────────────────────

export const MOCK_PROJECTS: NextWorkProject[] = [
  {
    slug: "interactive-solar-system",
    title: "Interactive 3D Solar System",
    overview:
      "A fully interactive 3D solar system built with Three.js and React Three Fiber, featuring realistic orbital mechanics and click-to-explore planet details.",
    description: `This project was born from a desire to understand 3D rendering on the web. Using Three.js via React Three Fiber, I built a complete solar system simulation with accurate relative planet sizes, orbital distances, and rotation speeds.

The biggest challenge was implementing smooth camera transitions when a user clicks a planet. I solved this by using GSAP to animate the camera's position and lookAt target simultaneously, creating a cinematic fly-through effect.

Each planet features a tooltip card that displays key facts — diameter, distance from the sun, number of moons, and surface temperature. The cards are positioned in screen-space using a clever world-to-screen coordinate conversion.`,
    goals: [
      "Learn the fundamentals of Three.js scene setup",
      "Implement proper orbital mechanics with realistic speeds",
      "Add click detection and raycasting for planet selection",
      "Create smooth camera transitions between planets",
      "Build an information panel that tracks screen-space position",
    ],
    techStack: [
      "React",
      "Three.js",
      "React Three Fiber",
      "GSAP",
      "TypeScript",
      "Tailwind CSS",
    ],
    images: [
      "/aws-devops-github_dd9d254e.png",
      "/aws-devops-github_efaadbf7.png",
      "/aws-devops-github_7bf21bae.png",
      "/aws-devops-github_9a27ee3b.png",
      "/aws-devops-github_fa11169d.png",
    ],
    author: {
      name: "Mei",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    date: "2025-06-15",
    liveUrl: "https://solar-system-demo.vercel.app",
    sourceCodeUrl: "https://github.com/nextwork/solar-system",
  },
  {
    slug: "realtime-markdown-editor",
    title: "Realtime Markdown Editor",
    overview:
      "A collaborative markdown editor with real-time sync powered by WebSockets, featuring live preview, syntax highlighting, and dark mode.",
    description: `I wanted to build a tool that made writing documentation feel effortless. This editor combines a split-pane layout with a raw markdown input on the left and a rendered preview on the right.

The real-time collaboration aspect was the trickiest part. I used Socket.io to broadcast document changes and implemented operational transform to handle concurrent edits without conflicts. The preview updates on every keystroke using a debounced render pipeline.

Additional features include a table-of-contents generator that scans heading levels, keyboard shortcuts for common formatting operations, and the ability to export to PDF using browser print APIs.`,
    goals: [
      "Build a live markdown preview with accurate rendering",
      "Implement real-time collaboration with conflict resolution",
      "Add syntax highlighting for 15+ programming languages",
      "Create keyboard shortcuts for power users",
      "Support PDF export with print-optimized styles",
    ],
    techStack: [
      "Next.js",
      "Socket.io",
      "Prism.js",
      "Marked",
      "PostCSS",
      "Redis",
    ],
    images: [
      "https://aws-devops-github_6becb2bc.png",
      "/aws-devops-github_c94976902.png",
      "/aws-devops-github_dd9d254e.png",
      "/aws-devops-github_efaadbf7.png",
    ],
    author: {
      name: "Mei",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    date: "2025-05-28",
    liveUrl: "https://markdown-editor-demo.vercel.app",
    sourceCodeUrl: "https://github.com/nextwork/markdown-editor",
  },
  {
    slug: "ai-image-generator",
    title: "AI Image Generator",
    overview:
      "A prompt-to-image generation app powered by Stable Diffusion, featuring a gallery, prompt history, and advanced parameter controls.",
    description: `This app wraps the Stability AI API in a clean, user-friendly interface. Users enter a text prompt and can adjust parameters like sampling steps, CFG scale, and seed value to fine-tune their generations.

I built an infinite-scroll gallery that lazy-loads generated images as the user scrolls. Each image can be favorited, downloaded, or used as a starting point for new generations via an "image-to-image" mode.

The backend uses Next.js API routes with rate limiting and prompt validation to prevent abuse. Images are stored in Cloudflare R2 with signed URLs for secure access.`,
    goals: [
      "Integrate with Stability AI's REST API",
      "Build an infinite-scroll gallery with lazy loading",
      "Add advanced parameter controls (steps, CFG, seed)",
      "Implement image-to-image mode",
      "Set up secure image storage and delivery",
    ],
    techStack: [
      "Next.js",
      "Stability AI SDK",
      "Cloudflare R2",
      "SWR",
      "Framer Motion",
      "Zod",
    ],
    images: [
      "/aws-devops-github_7bf21bae.png",
      "/aws-devops-github_9a27ee3b.png",
      "/aws-devops-github_fa11169d.png",
      "/aws-devops-github_6becb2bc.png",
    ],
    author: {
      name: "Mei",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    date: "2025-04-10",
    liveUrl: "https://ai-image-gen.vercel.app",
    sourceCodeUrl: "https://github.com/nextwork/ai-image-generator",
  },
  {
    slug: "habit-tracker-api",
    title: "Habit Tracker REST API",
    overview:
      "A production-grade REST API for habit tracking with JWT authentication, streak calculations, and detailed analytics endpoints.",
    description: `I designed this API to be the back-end for a habit tracking mobile app. It supports full CRUD operations on habits, daily check-ins, and computes streak statistics including current streak, longest streak, and completion rate.

Authentication is handled via JWT access/refresh tokens with rotating refresh tokens for enhanced security. All endpoints are documented with OpenAPI/Swagger and include request validation using Zod schemas.

The analytics engine pre-computes aggregates and caches them in Redis, making dashboard queries lightning fast even for users with years of habit data. I also built a notification service that sends push reminders via Firebase Cloud Messaging.`,
    goals: [
      "Design a RESTful API with proper resource nesting",
      "Implement JWT auth with rotating refresh tokens",
      "Build a streak calculation engine with timezone support",
      "Create analytics endpoints with Redis caching",
      "Generate OpenAPI documentation automatically",
    ],
    techStack: ["Node.js", "Express", "PostgreSQL", "Redis", "JWT", "Docker"],
    images: [
      "/aws-devops-github_c94976902.png",
      "/aws-devops-github_dd9d254e.png",
      "/aws-devops-github_efaadbf7.png",
    ],
    author: {
      name: "Mei",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    date: "2025-03-22",
    sourceCodeUrl: "https://github.com/nextwork/habit-tracker-api",
  },
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    overview:
      "A responsive weather dashboard with animated visualizations, hourly and 7-day forecasts, and location-based auto-detection.",
    description: `This dashboard pulls data from the OpenWeatherMap API and presents it through animated charts built with Chart.js. The main card shows current conditions with a dynamic background that reflects the weather — sunny gradients, rain particles, or snowflakes.

I implemented geolocation auto-detection so the dashboard loads the user's local weather immediately. Users can also search for any city worldwide and pin multiple locations to their dashboard.

The 7-day forecast uses a responsive line chart with temperature range bands, while the hourly breakdown toggles between temperature, precipitation probability, and wind speed. All charts animate smoothly when switching between locations.`,
    goals: [
      "Integrate three OpenWeatherMap API endpoints",
      "Build dynamic weather-aware background animations",
      "Implement geolocation with fallback to IP-based lookup",
      "Create responsive charts with smooth data transitions",
      "Support multiple saved locations with drag-to-reorder",
    ],
    techStack: [
      "React",
      "Chart.js",
      "OpenWeatherMap API",
      "CSS Animations",
      "Geolocation API",
      "Vite",
    ],
    images: [
      "/aws-devops-github_7bf21bae.png",
      "/aws-devops-github_9a27ee3b.png",
      "/aws-devops-github_fa11169d.png",
      "/aws-devops-github_6becb2bc.png",
    ],
    author: {
      name: "Mei",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    date: "2025-02-14",
    liveUrl: "https://weather-dash-demo.vercel.app",
    sourceCodeUrl: "https://github.com/nextwork/weather-dashboard",
  },
  {
    slug: "dev-blog-engine",
    title: "Developer Blog Engine",
    overview:
      "A statically-generated developer blog with MDX-powered posts, RSS feed, syntax highlighting, and a tag-based discovery system.",
    description: `I built this blog engine after being frustrated with existing static site generators. It uses MDX for content authoring, which means blog posts are just Markdown files that can include interactive React components.

The build pipeline processes MDX files at compile time using Next.js static generation. Each post gets automatic Open Graph images generated via Satori, table of contents extraction, and reading time estimation.

I implemented a tag-based discovery system where related posts are linked at the bottom of each article. The RSS feed is auto-generated and includes full post content. Search is powered by a client-side Fuse.js index built from post metadata.`,
    goals: [
      "Set up MDX compilation with custom component support",
      "Generate Open Graph images programmatically per post",
      "Build a tag-based related posts algorithm",
      "Create an auto-generated RSS feed with full content",
      "Implement client-side search with Fuse.js",
    ],
    techStack: ["Next.js", "MDX", "Satori", "Fuse.js", "RSS", "Vercel"],
    images: [
      "/aws-devops-github_c94976902.png",
      "/aws-devops-github_dd9d254e.png",
      "/aws-devops-github_efaadbf7.png",
      "/aws-devops-github_7bf21bae.png",
    ],
    author: {
      name: "Mei",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    date: "2025-01-08",
    sourceCodeUrl: "https://github.com/nextwork/dev-blog-engine",
  },
  {
    slug: "aws-devops-github",
    title: "Connect a GitHub Repo with AWS",
    overview:
      "Project 2 of the 6 Day DevOps Challenge — learn the basics of Git with GitHub and connect your repository to AWS for automated deployments.",
    description: `This project is part of the 6 Day DevOps Challenge where I learned to connect a GitHub repository with AWS. I went through the complete workflow of setting up version control with Git, linking a GitHub repo to AWS services, and automating the deployment pipeline.

Today we are here to set up a Git repository for our web app's code. This is project two in our 7 day DevOps challenge.

Git is a version control system, which means it's used to track changes that we make to our code. It's also incredibly helpful for debugging when issues crop up, because you can look back at your commit history. GitHub is a platform that lets us store and share and collaborate on our code!

A Git repository is like an online folder that you can use to store your web app's code and all the versions of that code. I ran "git init" in our web app project folder, which initialized git in our local repository. After running git init, the response from the terminal was that we initialized Git.

To push local changes to GitHub, I ran three commands. The first command I ran was "git add ." which adds our changes to a staging area. The second command I ran was "git commit", which is the command for saving the changes in our staging area. The third command we ran was "git push -u origin master", which pushes the code changes we saved to our remote or online repository.

When we committed changes to GitHub, Git asked for our credentials because it needs to authenticate us before letting us make changes to the repository.

Throughout this challenge, I gained hands-on experience with the core DevOps workflows that power modern cloud development — from making my first commit to seeing code deploy automatically to AWS.`,
    goals: [
      "Learn the basics of Git version control",
      "Create and manage a GitHub repository",
      "Connect GitHub with AWS using IAM and webhooks",
      "Automate deployments from GitHub to AWS",
      "Practice infrastructure as code with CloudFormation",
      "Complete the 6 Day DevOps Challenge workflow",
    ],
    techStack: [
      "Git",
      "GitHub",
      "AWS",
      "IAM",
      "CloudFormation",
      "CodeDeploy",
      "S3",
      "EC2",
    ],
    images: [
      "/aws-devops-github_dd9d254e.png",
      "/aws-devops-github_efaadbf7.png",
      "/aws-devops-github_7bf21bae.png",
      "/aws-devops-github_9a27ee3b.png",
      "/aws-devops-github_fa11169d.png",
      "/aws-devops-github_6becb2bc.png",
      "/aws-devops-github_c94976902.png",
    ],
    author: { name: "Natasha Ong", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
    date: "2025-04-20",
    sourceCodeUrl: "https://github.com/nextwork/aws-devops-github",
  },
];

// ─── MOCK AUTHOR ──────────────────────────────────────────────────────

export const MOCK_AUTHOR: NextWorkAuthor = {
  name: "Mei",
  avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  bio: `I'm a full-stack developer passionate about building tools that make other developers more productive. With over 8 years of experience across frontend, backend, and infrastructure, I love diving deep into the technologies that power modern web applications.

I believe the best projects come from scratching your own itch — every project in this portfolio started as something I personally wanted to use. When I'm not coding, you'll find me writing about developer tooling, contributing to open-source projects, or exploring the latest advancements in web rendering and animation.

This portfolio itself is a testament to my love of generative design: every time you hit "Magic Shuffle," a new theme is procedurally generated — colors, fonts, motion profiles, and patterns — all computed from a single random hex seed.`,
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "Three.js",
    "Framer Motion",
    "Tailwind CSS",
    "GraphQL",
    "REST APIs",
    "CI/CD",
    "Terraform",
    "Python",
    "Rust",
    "WebGL",
  ],
  links: [
    { label: "GitHub", url: "https://github.com/nextwork" },
    { label: "LinkedIn", url: "https://linkedin.com/in/nextwork" },
    { label: "Twitter", url: "https://twitter.com/nextwork" },
    { label: "Website", url: "https://nextwork.org" },
  ],
};

// ─── FETCH PROJECT (API-first with mock fallback) ─────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function fetchProject(
  slug: string,
): Promise<NextWorkProject | null> {
  // 1. Try the live API
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/projects/${slug}`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        return (await res.json()) as NextWorkProject;
      }
    } catch {
      // Network error — silently fall through to mock
    }
  }

  // 2. Fall back to mock data
  return MOCK_PROJECTS.find((p) => p.slug === slug) ?? null;
}

/** Return every slug for static generation. */
export function getAllProjectSlugs(): string[] {
  return MOCK_PROJECTS.map((p) => p.slug);
}
