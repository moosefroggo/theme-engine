"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/bio", label: "Bio" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { seed } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-foreground"
        >
          NextWork
        </Link>

        {/* Nav links + vibe indicator */}
        <div className="flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            );
          })}

          {/* Vibe indicator dot */}
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: seed.primaryColor }}
            title={`Current vibe: ${seed.vibe}`}
          />
        </div>
      </nav>
    </header>
  );
}
