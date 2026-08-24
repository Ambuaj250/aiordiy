import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Workshop Wall — projects",
  description:
    "Real systems built in public: AI agents, automations, and the lessons from breaking them.",
};

type Project = {
  name: string;
  desc: string;
  kind: "AI" | "SYSTEM";
  stack: string[];
  url: string;
  tilt: string;
};

const PROJECTS: Project[] = [
  {
    name: "aiordiy.com",
    desc: "This site. The ledger of every task done two ways.",
    kind: "SYSTEM",
    stack: ["Next.js", "TypeScript", "Vercel"],
    url: "https://github.com/Ambuaj250/aiordiy",
    tilt: "-1.2deg",
  },
  {
    name: "X-Analytics Agent",
    desc: "AI-powered analytics for X accounts — engagement insights on autopilot.",
    kind: "AI",
    stack: ["Python", "FastAPI", "SQLite"],
    url: "https://github.com/Ambuaj250/x-analytics-agent",
    tilt: "0.8deg",
  },
  {
    name: "LocalDoc AI",
    desc: "Self-hosted document intelligence. Chat with your PDFs, locally, private.",
    kind: "AI",
    stack: ["Python", "ChromaDB", "Ollama"],
    url: "https://github.com/Ambuaj250/localdoc-ai",
    tilt: "-0.6deg",
  },
  {
    name: "BuildInPublic Dashboard",
    desc: "Automated GitHub/X metrics and milestones for the build-in-public journey.",
    kind: "SYSTEM",
    stack: ["Next.js", "Supabase"],
    url: "https://github.com/Ambuaj250/buildinpublic-dashboard",
    tilt: "1.1deg",
  },
];

export default function ProjectsPage() {
  return (
    <main className="bg-[color:var(--shop-bg-deep)] min-h-screen texture-noise">
      <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
        <p className="label text-[color:var(--shop-accent)] mb-4">The workshop wall</p>
        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[0.98] mb-5">
          Things I built.
          <br />
          <span className="italic">Some of them work.</span>
        </h1>
        <p className="text-[color:var(--shop-dim)] text-lg max-w-lg leading-relaxed mb-16">
          Real systems, documented honestly — including what broke. Pinned to
          the wall like a proper workshop.
        </p>

        <div className="grid sm:grid-cols-2 gap-8 sm:gap-10">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[color:var(--shop-bg)] border-2 border-[color:var(--shop-ink)] shadow-[5px_5px_0_rgba(29,26,21,0.85)] hover:shadow-[8px_8px_0_rgba(228,87,46,0.9)] hover:-translate-y-1 transition-all duration-200"
              style={{ transform: `rotate(${p.tilt})` }}
            >
              {/* pin */}
              <div className="relative">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[color:var(--shop-accent)] border-2 border-[color:var(--shop-ink)]" />
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="label px-2 py-1 border"
                    style={{
                      borderColor:
                        p.kind === "AI"
                          ? "var(--lab-acid)"
                          : "var(--shop-ink)",
                      color:
                        p.kind === "AI" ? "#5c7a12" : "var(--shop-ink)",
                    }}
                  >
                    {p.kind}
                  </span>
                  <span className="label opacity-40">github →</span>
                </div>
                <h2 className="font-display text-2xl font-semibold mb-2 group-hover:underline decoration-2 underline-offset-4">
                  {p.name}
                </h2>
                <p className="text-sm text-[color:var(--shop-dim)] leading-relaxed mb-5">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-plex text-xs px-2 py-1 border border-[color:var(--shop-line)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 border-t-2 border-[color:var(--shop-ink)] pt-8">
          <a
            href="https://github.com/Ambuaj250"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-shop"
          >
            Everything on GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
