import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Gauge } from "lucide-react";
import { getAllGuides, CATEGORIES, type Category } from "@/content/guides";

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "#34d399",
  Medium: "#fbbf24",
  Hard: "#f472b6",
};

export const metadata: Metadata = {
  title: "All Guides — AI or DIY?",
  description:
    "Every task two ways: the AI way and the DIY way. Practical guides for home, work, money, and life.",
};

export default function GuidesIndex() {
  const guides = getAllGuides();

  return (
    <main className="min-h-screen">
      <header className="relative overflow-hidden pt-32 pb-12 px-4">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(34,211,238,0.14), transparent 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-300/80 mb-3">
            The library
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Every task,{" "}
            <span className="gradient-text-animated">two ways</span>
          </h1>
          <p className="text-lg text-white/55 max-w-xl">
            The AI way for speed. The DIY way for craft. You decide — or mix.
          </p>
        </div>
      </header>

      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto space-y-16">
          {CATEGORIES.map((cat) => {
            const catGuides = guides.filter((g) => g.category === (cat.name as Category));
            if (catGuides.length === 0) return null;
            return (
              <div key={cat.name}>
                <div className="flex items-baseline gap-3 mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: cat.accent }}>
                    {cat.name}
                  </h2>
                  <span className="text-sm text-white/40">{cat.blurb}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {catGuides.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/guides/${g.slug}`}
                      className="bento-card p-6 flex flex-col group"
                    >
                      <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {g.minutes} min
                        </span>
                        <span
                          className="inline-flex items-center gap-1"
                          style={{ color: DIFFICULTY_COLOR[g.difficulty] }}
                        >
                          <Gauge className="w-3.5 h-3.5" /> {g.difficulty}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold leading-snug mb-2 group-hover:text-cyan-300 transition-colors">
                        {g.title}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed mb-5 flex-1">
                        {g.hook}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                        Read both ways
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
