/* =============================================================================
 * SITEMAP GENERATOR (SOP A3 + H8)
 * Segmented sitemap index → core / cuet / ipmat / local / news.
 * Single source of truth for the route registry; the static files in
 * /public/sitemap-*.xml are generated from this (keep them in sync via
 * `npx tsx scripts/gen-sitemaps.ts` or regenerate when routes change).
 * Every <url> carries <lastmod>.
 * ============================================================================= */

import { DOMAIN, CENTRES } from "@/config/site";

export type SitemapSegment = "core" | "cuet" | "ipmat" | "local" | "news";

export interface SitemapEntry {
  path: string;
  /** ISO date (YYYY-MM-DD). Build/generation date is a valid lastmod. */
  lastmod: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
}

/** Generation date — set when sitemaps are regenerated. */
export const GENERATED = "2026-06-23";

const mk = (
  path: string,
  priority = 0.6,
  changefreq: SitemapEntry["changefreq"] = "monthly",
): SitemapEntry => ({ path, lastmod: GENERATED, changefreq, priority });

const LANDING_SLUGS = ["noida", "hauz-khas", "gtb-nagar", "gurugram", "delhi-ncr"];

/** Routes that currently exist (built so far). Expand as pages ship. */
export const ROUTES: Record<SitemapSegment, SitemapEntry[]> = {
  core: [
    mk("/", 1.0, "weekly"),
    mk("/about", 0.7),
    mk("/contact", 0.7),
    mk("/faculty", 0.6),
    mk("/results", 0.6),
    mk("/resources", 0.6),
    mk("/courses", 0.8),
    mk("/courses/cuet", 0.8),
    mk("/courses/ipmat", 0.8),
    mk("/faq", 0.6),
    mk("/privacy", 0.3, "yearly"),
    mk("/terms", 0.3, "yearly"),
  ],
  cuet: [
    mk("/cuet", 0.8),
    mk("/cuet/results", 0.7),
    mk("/cuet/results/marks-vs-percentile"),
    mk("/cuet/results/normalization"),
    mk("/cuet/results/scorecard"),
    mk("/cuet/results/score-calculator"),
    mk("/cuet/results/college-predictor", 0.7),
    mk("/cuet/cutoff", 0.8),
    mk("/cuet/cutoff/how-cutoffs-work"),
    mk("/cuet/cutoff/dataset", 0.7),
    mk("/cuet/admission", 0.7),
    mk("/cuet/admission/freeze-vs-upgrade"),
    mk("/cuet/admission/spot-round"),
    mk("/cuet/compare", 0.6),
    mk("/cuet/compare/cuet-vs-ipmat"),
    mk("/faq/cuet", 0.6),
  ],
  ipmat: [
    mk("/ipmat", 0.8),
    mk("/ipmat/exam", 0.7),
    mk("/ipmat/marking-scheme", 0.7),
    mk("/ipmat/sectional-lock"),
    mk("/ipmat/cutoff", 0.7),
    mk("/ipmat/composite-score/indore"),
    mk("/ipmat/composite-score/rohtak"),
    mk("/ipmat/composite-score/jipmat"),
    mk("/ipmat/safe-score"),
    mk("/ipmat/eligibility"),
    mk("/ipmat/admission/indore"),
    mk("/ipmat/admission/rohtak"),
    mk("/ipmat/admission/jipmat"),
    mk("/ipmat/important-dates"),
    mk("/ipmat/application-process"),
    mk("/faq/ipmat", 0.6),
  ],
  local: [
    mk("/centres", 0.8),
    ...CENTRES.map((c) => mk(`/centres/${c.slug}`, 0.7)),
    ...LANDING_SLUGS.map((s) => mk(`/cuet/coaching-in-${s}`, 0.7)),
    ...LANDING_SLUGS.map((s) => mk(`/ipmat/coaching-in-${s}`, 0.7)),
  ],
  news: [
    // /blog/* and /[exam]/news/* — populate as content ships.
  ],
};

const SEGMENTS: SitemapSegment[] = ["core", "cuet", "ipmat", "local", "news"];

function xmlHeader() {
  return '<?xml version="1.0" encoding="UTF-8"?>';
}

/** Build one urlset XML for a segment. */
export function buildUrlset(segment: SitemapSegment): string {
  const entries = ROUTES[segment];
  const urls = entries
    .map((e) => {
      const loc = `${DOMAIN}${e.path === "/" ? "/" : e.path}`;
      const parts = [`    <loc>${loc}</loc>`, `    <lastmod>${e.lastmod}</lastmod>`];
      if (e.changefreq) parts.push(`    <changefreq>${e.changefreq}</changefreq>`);
      if (e.priority != null) parts.push(`    <priority>${e.priority.toFixed(1)}</priority>`);
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");
  return `${xmlHeader()}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/** Build the sitemap index referencing every segment file. */
export function buildSitemapIndex(): string {
  const sitemaps = SEGMENTS.map(
    (s) =>
      `  <sitemap>\n    <loc>${DOMAIN}/sitemap-${s}.xml</loc>\n    <lastmod>${GENERATED}</lastmod>\n  </sitemap>`,
  ).join("\n");
  return `${xmlHeader()}\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>\n`;
}

export { SEGMENTS };
