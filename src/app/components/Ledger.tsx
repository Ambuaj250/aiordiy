import Link from "next/link";
import { getAllGuides } from "@/content/guides";

/**
 * THE LEDGER — every task is a line in the book.
 * Each row carries both worlds in its spine: acid (AI) / orange (DIY).
 */
export default function Ledger() {
  const guides = getAllGuides();

  return (
    <section id="ledger" className="relative bg-[color:var(--shop-bg)]">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="label text-[color:var(--shop-accent)] mb-3">The ledger</p>
            <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.02]">
              Pick a task.
              <br />
              Take a side.
            </h2>
          </div>
          <p className="max-w-xs text-[color:var(--shop-dim)] leading-relaxed">
            Every guide runs both ways — a spec sheet for the machine, a
            worksheet for your hands. The verdict decides.
          </p>
        </div>

        <div className="border-t-2 border-[color:var(--shop-ink)]">
          {guides.map((g, i) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="ledger-row group"
            >
              <span className="font-plex text-sm opacity-40 pl-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block font-display text-2xl md:text-3xl font-semibold leading-tight group-hover:translate-x-1 transition-transform">
                  {g.title}
                </span>
                <span className="block text-sm text-[color:var(--shop-dim)] mt-1">
                  {g.hook}
                </span>
              </span>
              <span className="hidden sm:flex items-center gap-4 font-plex text-xs">
                <span className="opacity-50">{g.category.toUpperCase()}</span>
                <span className="opacity-50">{g.minutes}′</span>
                <span
                  className="px-2 py-1 border"
                  style={{
                    borderColor:
                      g.difficulty === "Easy"
                        ? "var(--lab-acid)"
                        : g.difficulty === "Medium"
                          ? "var(--shop-accent)"
                          : "var(--shop-ink)",
                    color:
                      g.difficulty === "Easy"
                        ? "#5c7a12"
                        : g.difficulty === "Medium"
                          ? "var(--shop-accent)"
                          : "var(--shop-ink)",
                  }}
                >
                  {g.difficulty.toUpperCase()}
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 font-plex text-xs opacity-50 pl-4">
          — 10 of ∞ · new entries weekly
        </div>
      </div>
    </section>
  );
}
