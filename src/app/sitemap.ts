import type { MetadataRoute } from "next";
import { getAllGuides } from "@/content/guides";

export const dynamic = "force-static";

const BASE = "https://aiordiy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const guidePages = getAllGuides().map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...guidePages,
    { url: `${BASE}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
