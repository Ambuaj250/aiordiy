import Link from "next/link";
import { ArrowLeft, Clock, Gauge, Lightbulb, AlertTriangle } from "lucide-react";

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "#34d399",
  Medium: "#fbbf24",
  Hard: "#f472b6",
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}

export function GuideHero({
  title,
  hook,
  category,
  minutes,
  difficulty,
}: {
  title: string;
  hook: string;
  category: string;
  minutes: number;
  difficulty: string;
}) {
  return (
    <header className="relative overflow-hidden pt-32 pb-10 px-4">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(167,139,250,0.16), transparent 70%)",
        }}
      />
      <div className="max-w-5xl mx-auto">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All guides
        </Link>
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-300/80 mb-3">
          {category} · AI or DIY?
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">{title}</h1>
        <p className="text-lg md:text-xl text-white/55 mb-6 max-w-2xl">{hook}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70">
            <Clock className="w-3.5 h-3.5" /> {minutes} min
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
            style={{
              color: DIFFICULTY_COLOR[difficulty],
              borderColor: `${DIFFICULTY_COLOR[difficulty]}44`,
              background: `${DIFFICULTY_COLOR[difficulty]}14`,
            }}
          >
            <Gauge className="w-3.5 h-3.5" /> {difficulty}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70">
            AI way · DIY way
          </span>
        </div>
      </div>
    </header>
  );
}

export function WaySection({
  label,
  accent,
  summary,
  resources,
  resourceLabel,
  steps,
  tip,
}: {
  label: string;
  accent: string;
  summary: string;
  resources: string[];
  resourceLabel: string;
  steps: { title: string; body: string }[];
  tip: string;
}) {
  return (
    <section
      className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
      style={{
        background: `${accent}08`,
        border: `1px solid ${accent}26`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 40px rgba(0,0,0,0.25)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl -z-10"
        style={{ background: `${accent}14` }}
      />
      <h2 className="text-2xl font-bold tracking-tight mb-2" style={{ color: accent }}>
        {label}
      </h2>
      <p className="text-white/55 mb-6">{summary}</p>

      <div className="mb-6">
        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-3">
          {resourceLabel}
        </h3>
        <ul className="flex flex-wrap gap-2">
          {resources.map((r) => (
            <li
              key={r}
              className="text-sm px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/75"
            >
              {r}
            </li>
          ))}
        </ul>
      </div>

      <ol className="space-y-5">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span
              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-semibold"
              style={{ background: `${accent}1f`, color: accent }}
            >
              {i + 1}
            </span>
            <div>
              <h3 className="font-semibold mb-1">{s.title}</h3>
              <p className="text-white/55 leading-relaxed">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div
        className="mt-6 flex gap-3 items-start rounded-xl p-4"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accent }} />
        <p className="text-sm text-white/65 leading-relaxed">{tip}</p>
      </div>
    </section>
  );
}

export function VerdictSection({
  verdict,
  mistakes,
}: {
  verdict: string;
  mistakes: string[];
}) {
  return (
    <>
      <section className="rounded-2xl p-6 md:p-8 liquid-glass">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-pink-300/80 mb-3">
          The verdict
        </p>
        <p className="text-lg md:text-xl leading-relaxed font-medium">{verdict}</p>
      </section>

      <section className="rounded-2xl p-6 md:p-8 border border-white/8 bg-white/[0.02]">
        <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          Mistakes everyone makes
        </h2>
        <ul className="space-y-3">
          {mistakes.map((m) => (
            <li key={m} className="flex gap-3 text-white/60 leading-relaxed">
              <span className="text-amber-400/80 shrink-0">✕</span>
              {m}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
