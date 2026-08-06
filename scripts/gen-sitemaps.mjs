// Regenerates public/sitemap*.xml from the route registry (mirrors
// src/lib/sitemap.ts). Run: node scripts/gen-sitemaps.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOMAIN = "https://lptdelhincr.com";
const GENERATED = "2026-06-23";
const SEGMENTS = ["core", "cuet", "ipmat", "local", "news"];

const mk = (path, priority = 0.6, changefreq = "monthly") => ({ path, priority, changefreq });
const CENTRES = ["noida", "hauz-khas", "gtb-nagar", "gurugram"];
const LANDINGS = ["noida", "hauz-khas", "gtb-nagar", "gurugram", "delhi-ncr"];

const ROUTES = {
  core: [
    mk("/", 1.0, "weekly"), mk("/about", 0.7), mk("/contact", 0.7), mk("/faculty"),
    mk("/results"), mk("/resources"), mk("/courses", 0.8), mk("/courses/cuet", 0.8),
    mk("/courses/ipmat", 0.8), mk("/faq"), mk("/privacy", 0.3, "yearly"), mk("/terms", 0.3, "yearly"),
  ],
  cuet: [
    mk("/cuet", 0.8), mk("/cuet/results", 0.7), mk("/cuet/results/marks-vs-percentile"),
    mk("/cuet/results/normalization"), mk("/cuet/results/scorecard"),
    mk("/cuet/results/score-calculator"), mk("/cuet/results/college-predictor", 0.7),
    mk("/cuet/cutoff", 0.8), mk("/cuet/cutoff/how-cutoffs-work"), mk("/cuet/cutoff/dataset", 0.7),
    mk("/cuet/admission", 0.7), mk("/cuet/admission/freeze-vs-upgrade"), mk("/cuet/admission/spot-round"),
    mk("/cuet/compare"), mk("/cuet/compare/cuet-vs-ipmat"), mk("/faq/cuet"),
    // Phase 3 — P4–P7 static + curated programmatic (dataset-gated emit 0).
    mk("/cuet/colleges", 0.7), mk("/cuet/syllabus", 0.7), mk("/cuet/compare/quiz"),
    mk("/cuet/exam-pattern", 0.7), mk("/cuet/marking", 0.7), mk("/cuet/eligibility", 0.7),
    mk("/cuet/subject-rules"), mk("/cuet/languages"),
    mk("/cuet/study-plan/3-month"), mk("/cuet/study-plan/6-month"), mk("/cuet/study-plan/1-year"),
    mk("/cuet/compare/cuet-vs-clat"),
    // Phase 4 — P8 exam logistics, P9 history/policy/changes, P10 experience.
    mk("/cuet/exam-centers", 0.7), mk("/cuet/city-slip"), mk("/cuet/admit-card", 0.7), mk("/cuet/exam-day", 0.7),
    mk("/cuet/history"), mk("/cuet/policy"), mk("/cuet/changes", 0.7),
    mk("/cuet/faq", 0.7), mk("/cuet/is-cuet-hard", 0.7), mk("/cuet/without-coaching", 0.7),
    mk("/cuet/toppers"), mk("/cuet/parents-guide"),
  ],
  ipmat: [
    mk("/ipmat", 0.8), mk("/ipmat/exam", 0.7), mk("/ipmat/marking-scheme", 0.7),
    mk("/ipmat/sectional-lock"), mk("/ipmat/cutoff", 0.7),
    mk("/ipmat/composite-score/indore"), mk("/ipmat/composite-score/rohtak"), mk("/ipmat/composite-score/jipmat"),
    mk("/ipmat/safe-score"), mk("/ipmat/eligibility"),
    mk("/ipmat/admission/indore"), mk("/ipmat/admission/rohtak"), mk("/ipmat/admission/jipmat"),
    mk("/ipmat/important-dates"), mk("/ipmat/application-process"), mk("/faq/ipmat"),
    // Phase 3 — I5–I8 static + curated programmatic (dataset-gated emit 0).
    mk("/ipmat/colleges", 0.7), mk("/ipmat/programme/structure", 0.7), mk("/ipmat/roi"),
    mk("/ipmat/syllabus", 0.7), mk("/ipmat/books-mocks"),
    mk("/ipmat/compare"), mk("/ipmat/compare/ipm-vs-bba"), mk("/ipmat/compare/indore-vs-rohtak"),
    mk("/ipmat/worth-it"), mk("/ipmat/wat"), mk("/ipmat/profile-building"),
    mk("/ipmat/preparation/3-month"), mk("/ipmat/preparation/6-month"), mk("/ipmat/preparation/1-year"),
    mk("/ipmat/syllabus/quantitative-aptitude"), mk("/ipmat/syllabus/verbal-ability"), mk("/ipmat/syllabus/logical-reasoning"),
    mk("/ipmat/section-strategy/quantitative-aptitude"), mk("/ipmat/section-strategy/verbal-ability"), mk("/ipmat/section-strategy/logical-reasoning"),
    mk("/ipmat/interview/indore"), mk("/ipmat/interview/rohtak"), mk("/ipmat/interview/jipmat"),
    // Phase 4 — I9/I10 static + curated cities.
    mk("/ipmat/campus-life"), mk("/ipmat/faq", 0.7), mk("/ipmat/self-study-vs-coaching"),
    mk("/ipmat/parents-guide"), mk("/ipmat/wellbeing"),
    mk("/ipmat/city/indore"), mk("/ipmat/city/rohtak"),
  ],
  local: [
    mk("/centres", 0.8),
    ...CENTRES.map((s) => mk(`/centres/${s}`, 0.7)),
    ...LANDINGS.map((s) => mk(`/cuet/coaching-in-${s}`, 0.7)),
    ...LANDINGS.map((s) => mk(`/ipmat/coaching-in-${s}`, 0.7)),
  ],
  news: [
    // SOP H8 — /blog/ and /news/ (+ emitted blog posts).
    mk("/blog", 0.7, "weekly"), mk("/news", 0.6, "weekly"),
    mk("/blog/how-cuet-cutoffs-work"), mk("/blog/ipmat-guessing-math"), mk("/blog/choosing-cuet-subjects"),
  ],
};

const urlset = (entries) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  entries
    .map(
      (e) =>
        `  <url>\n    <loc>${DOMAIN}${e.path}</loc>\n    <lastmod>${GENERATED}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

const index =
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  SEGMENTS.map(
    (s) => `  <sitemap>\n    <loc>${DOMAIN}/sitemap-${s}.xml</loc>\n    <lastmod>${GENERATED}</lastmod>\n  </sitemap>`,
  ).join("\n") +
  `\n</sitemapindex>\n`;

mkdirSync(join(ROOT, "public"), { recursive: true });
writeFileSync(join(ROOT, "public/sitemap.xml"), index);
for (const s of SEGMENTS) writeFileSync(join(ROOT, `public/sitemap-${s}.xml`), urlset(ROUTES[s]));
const total = SEGMENTS.reduce((n, s) => n + ROUTES[s].length, 0);
console.log(`Wrote sitemap.xml + ${SEGMENTS.length} segment files (${total} URLs).`);
