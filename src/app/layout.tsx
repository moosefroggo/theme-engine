import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "@/components/layout/main-layout";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "NextWork Portfolio Generator",
  description:
    "Generate beautiful, themed developer portfolios with procedural colors, fonts, patterns, and motion — powered by NextWork.",
  openGraph: {
    title: "NextWork Portfolio Generator",
    description:
      "Generate beautiful, themed developer portfolios with procedural colors, fonts, patterns, and motion.",
    url: BASE_URL,
    siteName: "NextWork",
    images: [
      {
        url: `${BASE_URL}/og?name=Mei&tagline=Full-stack+developer&personality=clean&primaryColor=%230a0a0a`,
        width: 1200,
        height: 630,
        alt: "NextWork Portfolio Generator — Build your portfolio in seconds.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextWork Portfolio Generator",
    description:
      "Generate beautiful, themed developer portfolios with procedural colors, fonts, patterns, and motion.",
    images: [
      `${BASE_URL}/og?name=Mei&tagline=Full-stack+developer&personality=clean&primaryColor=%230a0a0a`,
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
