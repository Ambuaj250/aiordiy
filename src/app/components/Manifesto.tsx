/**
 * THE MANIFESTO — a split panel where both worlds state their case.
 * Left: LAB terminal. Right: SHOP note. Seam down the middle.
 */
export default function Manifesto() {
  return (
    <section className="relative grid md:grid-cols-2 border-t-2 border-[color:var(--shop-ink)]">
      {/* LAB */}
      <div className="texture-grid bg-[color:var(--lab-bg)] text-[color:var(--lab-ink)] px-6 sm:px-12 py-20 border-b-2 md:border-b-0 md:border-r-2 border-[color:var(--shop-ink)]">
        <p className="label text-[color:var(--lab-acid)] mb-6">// the machine says</p>
        <blockquote className="text-2xl md:text-3xl leading-snug font-medium max-w-md">
          "Give me the task. I'll return ten drafts, three plans, and one
          finished thing — before your coffee cools."
        </blockquote>
        <p className="font-plex text-sm text-[color:var(--lab-dim)] mt-8">
          &gt; speed._ scale._ zero ego._
          <span className="animate-pulse">▊</span>
        </p>
      </div>

      {/* SHOP */}
      <div className="texture-ruled bg-[color:var(--shop-bg)] px-6 sm:px-12 py-20">
        <p className="label text-[color:var(--shop-accent)] mb-6">the hand says</p>
        <blockquote className="font-display text-2xl md:text-3xl leading-snug max-w-md">
          "And I'll teach you why it works, what it costs, and how to do it
          again with nothing but your hands."
        </blockquote>
        <p className="font-plex text-sm text-[color:var(--shop-dim)] mt-8">
          — filed under: craft, patience, pride
        </p>
      </div>

      {/* Verdict strip */}
      <div className="md:col-span-2 bg-[color:var(--shop-ink)] text-[color:var(--shop-bg)] px-6 sm:px-12 py-16 text-center">
        <p className="label opacity-60 mb-5">the only rule</p>
        <p className="font-display text-3xl md:text-5xl font-semibold leading-tight max-w-3xl mx-auto">
          Run the AI way. Learn the DIY way.{" "}
          <span className="italic" style={{ color: "var(--lab-acid)" }}>
            Never choose just one.
          </span>
        </p>
        <a
          href="https://x.com/aiordiy"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-lab mt-10"
        >
          Follow the build on X
        </a>
      </div>
    </section>
  );
}
