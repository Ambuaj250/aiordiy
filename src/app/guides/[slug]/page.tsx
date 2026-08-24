import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, getAllGuides } from "@/content/guides";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — AI or DIY?`,
    description: guide.hook,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.hook,
      url: `/guides/${guide.slug}`,
      type: "article",
      images: ["/og.png"],
    },
    twitter: { card: "summary_large_image", creator: "@aiordiy", images: ["/og.png"] },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const others = getAllGuides()
    .filter((g) => g.slug !== slug)
    .slice(0, 3);

  const caseNo = String(getAllGuides().findIndex((g) => g.slug === slug) + 1).padStart(2, "0");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.hook,
    totalTime: `PT${guide.minutes}M`,
    step: guide.aiWay.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.body,
    })),
  };

  return (
    <main className="bg-[color:var(--shop-bg)] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── File header ── */}
      <header className="border-b-2 border-[color:var(--shop-ink)]">
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
          <Link
            href="/guides"
            className="label hover:text-[color:var(--shop-accent)] transition-colors"
          >
            ← The ledger
          </Link>
          <div className="flex items-start justify-between gap-6 mt-8 flex-wrap">
            <div className="max-w-2xl">
              <p className="label text-[color:var(--shop-accent)] mb-3">
                Case №{caseNo} · {guide.category.toUpperCase()} · {guide.minutes} MIN ·{" "}
                {guide.difficulty.toUpperCase()}
              </p>
              <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.02] mb-4">
                {guide.title}
              </h1>
              <p className="text-lg text-[color:var(--shop-dim)] leading-relaxed">
                {guide.intro}
              </p>
            </div>
            <div className="stamp text-[color:var(--shop-accent)] text-sm shrink-0">
              AI or DIY?
            </div>
          </div>
          <p className="mt-6 font-plex text-sm border-l-4 border-[color:var(--lab-acid)] pl-4 py-1 max-w-2xl">
            OUTCOME: {guide.outcome}
          </p>
        </div>
      </header>

      {/* ── The two ways ── */}
      <section className="grid lg:grid-cols-2 border-b-2 border-[color:var(--shop-ink)]">
        {/* SPEC SHEET — AI way */}
        <article className="texture-grid bg-[color:var(--lab-bg)] text-[color:var(--lab-ink)] px-6 sm:px-10 py-14 border-b-2 lg:border-b-0 lg:border-r-2 border-[color:var(--shop-ink)]">
          <p className="label text-[color:var(--lab-acid)] mb-2">Document A</p>
          <h2 className="text-3xl font-semibold mb-2" style={{ fontFamily: "var(--font-grotesk)" }}>
            The Spec Sheet
          </h2>
          <p className="font-plex text-sm text-[color:var(--lab-dim)] mb-8">
            &gt; for the machine · speed · precision
          </p>
          <p className="text-[color:var(--lab-ink)]/80 leading-relaxed mb-8">
            {guide.aiWay.summary}
          </p>

          <p className="label text-[color:var(--lab-dim)] mb-3">Required</p>
          <ul className="flex flex-wrap gap-2 mb-10">
            {guide.aiWay.tools.map((t) => (
              <li
                key={t}
                className="font-plex text-xs px-3 py-1.5 border border-[color:var(--lab-line)] text-[color:var(--lab-ink)]/85"
              >
                {t}
              </li>
            ))}
          </ul>

          <ol className="space-y-7">
            {guide.aiWay.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="spec-num">{i + 1}</span>
                <div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-[color:var(--lab-dim)] leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 font-plex text-sm border border-dashed border-[color:var(--lab-line)] p-4 text-[color:var(--lab-ink)]/75">
            <span className="text-[color:var(--lab-acid)]">EFFICIENCY NOTE:</span>{" "}
            {guide.aiWay.timeSaver}
          </div>
        </article>

        {/* WORKSHEET — DIY way */}
        <article className="texture-ruled bg-[color:var(--shop-bg)] px-6 sm:px-10 py-14">
          <p className="label text-[color:var(--shop-accent)] mb-2">Document B</p>
          <h2 className="font-display text-3xl font-semibold mb-2">The Worksheet</h2>
          <p className="font-plex text-sm text-[color:var(--shop-dim)] mb-8">
            — for your hands · craft · patience
          </p>
          <p className="text-[color:var(--shop-ink)]/80 leading-relaxed mb-8">
            {guide.diyWay.summary}
          </p>

          <p className="label text-[color:var(--shop-dim)] mb-3">Materials</p>
          <ul className="mb-10 space-y-2">
            {guide.diyWay.materials.map((m) => (
              <li key={m} className="flex gap-3 text-sm">
                <span className="checkbox" />
                <span className="text-[color:var(--shop-ink)]/80">{m}</span>
              </li>
            ))}
          </ul>

          <ol className="space-y-7">
            {guide.diyWay.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="work-num">{i + 1}</span>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">{s.title}</h3>
                  <p className="text-sm text-[color:var(--shop-dim)] leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 font-plex text-sm border-2 border-[color:var(--shop-ink)] p-4 bg-[color:var(--shop-bg-deep)]">
            <span className="text-[color:var(--shop-accent)] font-semibold">
              OLD-HAND TIP:
            </span>{" "}
            {guide.diyWay.proTip}
          </div>
        </article>
      </section>

      {/* ── Verdict ── */}
      <section className="bg-[color:var(--lab-bg)] text-[color:var(--lab-ink)] border-b-2 border-[color:var(--shop-ink)] texture-noise">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="label text-[color:var(--lab-acid)] mb-8">// the verdict</p>
          <div className="stamp text-[color:var(--lab-acid)] text-base mb-10 mx-auto w-fit">
            Filed &amp; Decided
          </div>
          <p className="text-2xl md:text-3xl leading-relaxed font-medium">
            {guide.verdict}
          </p>

          <div className="mt-14 text-left max-w-2xl mx-auto">
            <p className="label text-[color:var(--lab-dim)] mb-4">
              // common failure modes
            </p>
            <ul className="space-y-3">
              {guide.mistakes.map((m) => (
                <li key={m} className="flex gap-3 font-plex text-sm text-[color:var(--lab-dim)]">
                  <span className="text-[color:var(--shop-accent)]">✕</span>
                  <span className="leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Next cases ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="label opacity-60 mb-8">Open next case</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/guides/${o.slug}`}
              className="group border-2 border-[color:var(--shop-ink)] p-5 hover:shadow-[6px_6px_0_rgba(29,26,21,1)] hover:-translate-y-0.5 transition-all"
            >
              <p className="label opacity-40 mb-3">{o.category}</p>
              <h3 className="font-display text-xl font-semibold leading-snug group-hover:underline decoration-2 underline-offset-4">
                {o.title}
              </h3>
            </Link>
          ))}
        </div>
        <div className="mt-12 border-t-2 border-[color:var(--shop-ink)] pt-8 flex flex-wrap gap-4 items-center justify-between">
          <p className="text-[color:var(--shop-dim)] max-w-md">
            New cases filed weekly. Follow the build in public.
          </p>
          <a
            href="https://x.com/aiordiy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-shop"
          >
            @aiordiy on X
          </a>
        </div>
      </section>
    </main>
  );
}
