import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bot,
  Hammer,
  Scale,
} from "lucide-react";
import { getGuide, getAllGuides } from "@/content/guides";
import { GuideHero, WaySection, VerdictSection } from "@/app/components/GuideLayout";

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
    openGraph: {
      title: guide.title,
      description: guide.hook,
      type: "article",
    },
  };
}

const ACCENTS = { ai: "#22d3ee", diy: "#f472b6" };

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

  return (
    <div className="min-h-screen">
      <GuideHero
        title={guide.title}
        hook={guide.hook}
        category={guide.category}
        minutes={guide.minutes}
        difficulty={guide.difficulty}
      />

      <div className="max-w-5xl mx-auto px-4 pb-10">
        <p className="text-lg text-white/70 leading-relaxed max-w-3xl">{guide.intro}</p>
        <p className="mt-4 inline-block rounded-full bg-white/[0.04] border border-white/10 px-4 py-2 text-sm text-white/60">
          🎯 You walk away with: {guide.outcome}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12 grid md:grid-cols-2 gap-5 items-start">
        <WaySection
          label="The AI Way"
          accent={ACCENTS.ai}
          summary={guide.aiWay.summary}
          resources={guide.aiWay.tools}
          resourceLabel="What you need"
          steps={guide.aiWay.steps}
          tip={guide.aiWay.timeSaver}
        />
        <WaySection
          label="The DIY Way"
          accent={ACCENTS.diy}
          summary={guide.diyWay.summary}
          resources={guide.diyWay.materials}
          resourceLabel="What you need"
          steps={guide.diyWay.steps}
          tip={guide.diyWay.proTip}
        />
      </div>

      <div
        aria-hidden
        className="relative max-w-5xl mx-auto px-4 pb-12"
      >
        <div className="absolute inset-x-8 top-6 flex justify-center pointer-events-none">
          <span className="inline-flex items-center gap-2 rounded-full liquid-glass px-5 py-2.5 text-sm font-semibold relative z-10">
            <Scale className="w-4 h-4 text-purple-300" />
            Verdict below
          </span>
        </div>
        <div className="border-t border-dashed border-white/15" />
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16 space-y-5">
        <VerdictSection verdict={guide.verdict} mistakes={guide.mistakes} />
      </div>

      <section className="max-w-5xl mx-auto px-4 pb-24">
        <h2 className="text-xl font-bold mb-5">Keep going</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/guides/${o.slug}`}
              className="bento-card p-5 group"
            >
              <p className="text-xs uppercase tracking-widest text-white/35 mb-2">
                {o.category}
              </p>
              <h3 className="font-semibold leading-snug group-hover:text-cyan-300 transition-colors">
                {o.title}
              </h3>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center rounded-2xl liquid-glass p-8">
          <p className="text-white/60 mb-4">
            New guides drop weekly. Follow along as they're built in public.
          </p>
          <a
            href="https://x.com/aiordiy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors glow-pink"
          >
            @aiordiy on X
          </a>
        </div>
      </section>
    </div>
  );
}
