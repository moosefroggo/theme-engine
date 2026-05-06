import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import { ShareCard } from "@/components/share-card";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero
        name="Mustafa Ali Akbar"
        tagline="Full-stack developer crafting tools that ship."
        overview="I build products at the intersection of design, engineering, and motion — from generative theme systems to interactive 3D experiences. This is my portfolio of work."
      />

      {/* Share Card section */}
      <section className="max-w-6xl mx-auto px-4 py-8 border-t border-border">
        <div className="flex flex-col items-center text-center gap-6">
          <div>
            <h2 className="text-xl font-bold font-display mb-2">
              Share Your Portfolio
            </h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Download a social card that captures your portfolio&apos;s theme.
              Perfect for sharing on Twitter, LinkedIn, or your blog.
            </p>
          </div>
          <ShareCard
            name="Mustafa Ali Akbar"
            tagline="Full-stack developer crafting tools that ship."
          />
        </div>
      </section>

      <section id="projects" className="max-w-6xl mx-auto px-4 py-12 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-display">Projects</h2>
        </div>
        <ProjectGrid />
      </section>
    </main>
  );
}
