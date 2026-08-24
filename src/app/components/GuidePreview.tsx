import Link from "next/link";
import { Clock, Gauge, Bot, Hammer } from "lucide-react";
import { getAllGuides } from "@/content/guides";

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "#34d399",
  Medium: "#fbbf24",
  Hard: "#f472b6",
};

export default function GuidePreview() {
  const featured = getAllGuides().slice(0, 3);

  return (
    <div className="grid md:grid-cols-3 gap-5">
      {featured.map((g) => (
        <Link key={g.slug} href={`/guides/${g.slug}`} className="bento-card p-7 flex flex-col group">
          <div className="flex items-center gap-2 mb-5">
            <span className="rounded-full px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1.5 text-cyan-300 border border-cyan-400/20 bg-cyan-400/5">
              <Bot className="w-3.5 h-3.5" /> AI way
            </span>
            <span className="rounded-full px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1.5 text-pink-300 border border-pink-400/20 bg-pink-400/5">
              <Hammer className="w-3.5 h-3.5" /> DIY way
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
            <span>{g.category}</span>
            <span aria-hidden>·</span>
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

          <h3 className="text-xl font-semibold leading-snug mb-2 group-hover:text-cyan-300 transition-colors">
            {g.title}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed">{g.hook}</p>
        </Link>
      ))}
    </div>
  );
}
