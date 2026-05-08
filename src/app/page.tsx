import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import { BioSection } from "@/components/bio-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero
        name="Mei Chen"
        tagline="Full-stack developer crafting tools that ship."
        overview="I build products at the intersection of design, engineering, and motion — from generative theme systems to interactive 3D experiences. This is my portfolio of work."
      />
      <BioSection />
      <section id="projects" className="max-w-6xl mx-auto px-4 py-12 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-display">Projects</h2>
        </div>
        <ProjectGrid />
      </section>
    </main>
  );
}
