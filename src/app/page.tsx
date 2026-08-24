import { X } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import GuidePreview from "./components/GuidePreview";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <section id="guides" className="py-28 px-4 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 30%, rgba(34,211,238,0.12), transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-300/80 mb-4">
              AI or DIY?
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Every task, <span className="gradient-text">two ways</span>
            </h2>
          </div>
          <p className="text-white/50 text-center mb-16 max-w-xl mx-auto text-lg">
            The AI way for speed. The DIY way for craft. Practical guides that show
            both — you pick, or mix.
          </p>

          <GuidePreview />

          <div className="text-center mt-12">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/15 font-semibold hover:bg-white/10 transition-colors backdrop-blur-md"
            >
              Browse all guides
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="projects" className="py-28 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 tracking-tight">
            What I <span className="gradient-text">Build</span>
          </h2>
          <p className="text-white/50 text-center mb-16 max-w-xl mx-auto">
            Practical AI systems that solve real problems. Every project is documented with lessons learned.
          </p>

          <BentoGrid />
        </div>
      </section>

      <section className="py-28 px-4 border-t border-white/10 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(167,139,250,0.18), transparent 70%)',
          }}
        />
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Follow the build in public
          </h2>
          <p className="text-white/55 mb-8">
            New guides weekly — wins, failures, and lessons shared as they happen.
          </p>
          <a
            href="https://x.com/aiordiy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors glow-pink"
          >
            <X className="w-5 h-5" />
            @aiordiy on X
          </a>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © 2026 aiordiy.{' '}
            <span className="text-white/50">Automating the boring. Building the rest.</span>
          </p>
          <div className="flex gap-6">
            <Link href="/guides" className="text-white/40 hover:text-white text-sm transition-colors">
              Guides
            </Link>
            <a
              href="https://x.com/aiordiy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors"
            >
              <X className="w-3.5 h-3.5" /> @aiordiy
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
