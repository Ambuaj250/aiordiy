import Link from "next/link";
import { Clock, Gauge } from "lucide-react";
import { getAllGuides, CATEGORIES, type Category } from "@/content/guides";

const DIFF_STYLE: Record<string, { border: string; color: string }> = {
  Easy: { border: "#84cc16", color: "#4d7c0f" },
  Medium: { border: "var(--shop-accent)", color: "var(--shop-accent)" },
  Hard: { border: "var(--shop-ink)", color: "var(--shop-ink)" },
};

export const metadata = {
  title: "The Ledger — every task, two ways",
  description:
    "Browse all AI or DIY guides: home, work, money, and life. Each task runs two ways — a spec for the machine, a worksheet for your hands.",
};

export default function GuidesIndex() {
  const guides = getAllGuides();

  return (
    <main className="bg-[color:var(--shop-bg)] min-h-screen">
      <header className="border-b-2 border-[color:var(--shop-ink)]">
        <div className="max-w-6xl mx-auto px-4 pt-28 pb-14">
          <p className="label text-[color:var(--shop-accent)] mb-4">The ledger</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[0.98] mb-5">
            Every task,
            <br />
            <span className="italic">two ways.</span>
          </h1>
          <p className="text-[color:var(--shop-dim)] text-lg max-w-lg leading-relaxed">
            The AI way for speed. The DIY way for craft. Every guide ends with
            a verdict — stamped, not suggested.
          </p>
        </div>
      </header>

      {CATEGORIES.map((cat) => {
        const catGuides = guides.filter((g) => g.category === (cat.name as Category));
        if (catGuides.length === 0) return null;
        return (
          <section key={cat.name} className="border-b border-[color:var(--shop-line)]">
            <div className="max-w-6xl mx-auto px-4 py-14">
              <div className="flex items-baseline gap-4 mb-8">
                <h2 className="font-display text-3xl font-semibold">{cat.name}</h2>
                <span className="label opacity-50">{cat.blurb}</span>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {catGuides.map((g) => {
                  const d = DIFF_STYLE[g.difficulty];
                  return (
                    <Link
                      key={g.slug}
                      href={`/guides/${g.slug}`}
                      className="group border-2 border-[color:var(--shop-ink)] bg-[color:var(--shop-bg)] hover:shadow-[6px_6px_0_rgba(29,26,21,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                    >
                      {/* split header strip */}
                      <div className="h-2 w-full grid grid-cols-2">
                        <div className="bg-[color:var(--lab-acid)]" />
                        <div className="bg-[color:var(--shop-accent)]" />
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 font-plex text-xs mb-4">
                          <span className="inline-flex items-center gap-1 opacity-60">
                            <Clock className="w-3.5 h-3.5" /> {g.minutes}′
                          </span>
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 border"
                            style={{ borderColor: d.border, color: d.color }}
                          >
                            <Gauge className="w-3 h-3" /> {g.difficulty}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl font-semibold leading-tight mb-2 group-hover:underline decoration-2 underline-offset-4">
                          {g.title}
                        </h3>
                        <p className="text-sm text-[color:var(--shop-dim)] leading-relaxed flex-1">
                          {g.hook}
                        </p>

                        <span className="label mt-6 inline-flex items-center gap-2 text-[color:var(--shop-accent)]">
                          Open the file →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <footer className="max-w-6xl mx-auto px-4 py-12">
        <a
          href="https://x.com/aiordiy"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-shop"
        >
          New entries announced on X
        </a>
      </footer>
    </main>
  );
}
