"use client";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { BackgroundCanvas } from "../background-canvas";
import { ShuffleButton } from "../ui/shuffle-button";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <BackgroundCanvas />
      <Navbar />
      <main className="relative z-10 pt-4">{children}</main>
      <Footer />
      <ShuffleButton />
    </div>
  );
}
