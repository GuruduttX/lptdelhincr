/* =============================================================================
 * PROGRAMMATIC ROUTE REGISTRY (SOP H7 — "no thin spawns")
 * Single source of truth for which programmatic URLs are EMITTED.
 *
 * RULE: a dataset-driven page is emitted ONLY for a row that is real
 * (illustrative:false) AND has the required fields. Curated evergreen patterns
 * (study plans, section strategy, interview prep) are authored genuinely and
 * emit now. Everything here scales automatically when real rows are added.
 *
 * IMPORTANT: this file is imported by vite.config.ts at config time, so it uses
 * RELATIVE imports only (no "@/..." value imports) to stay bundler-safe.
 * ============================================================================= */

import { colleges, isCollegePublishable } from "../data/colleges";
import { cutoffs } from "../data/cutoffs";
import { institutions } from "../data/institutions";
import { fees, isFeePublishable } from "../data/fees";
import { placements, isPlacementPublishable } from "../data/placements";
import { INSTITUTES } from "../data/ipmat";
import { syllabus } from "../data/syllabus";
import { examCities, isExamCityPublishable } from "../data/examCenters";
import { posts, isPostPublishable } from "../data/posts";

export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export interface CuratedItem {
  slug: string;
  label: string;
}

/* ---- CURATED evergreen patterns (genuine content → emit now) ------------ */
export const STUDY_DURATIONS: CuratedItem[] = [
  { slug: "3-month", label: "3-Month" },
  { slug: "6-month", label: "6-Month" },
  { slug: "1-year", label: "1-Year" },
];

export const IPMAT_SECTIONS: CuratedItem[] = [
  { slug: "quantitative-aptitude", label: "Quantitative Aptitude" },
  { slug: "verbal-ability", label: "Verbal Ability" },
  { slug: "logical-reasoning", label: "Logical Reasoning" },
];

export const getStudyDuration = (slug: string) => STUDY_DURATIONS.find((d) => d.slug === slug);
export const getIpmatSection = (slug: string) => IPMAT_SECTIONS.find((s) => s.slug === slug);

/** Curated cross-vertical comparison exams (cuet-vs-[exam]). CAT/MBA excluded
 *  by the hard no-CAT rule; IPMAT has its own dedicated explicit page. */
export const COMPARE_EXAMS: CuratedItem[] = [{ slug: "clat", label: "CLAT" }];
export const getCompareExam = (slug: string) => COMPARE_EXAMS.find((e) => e.slug === slug);

/** IPMAT IIM cities (I9) — genuine, curated. */
export const IPMAT_CITIES: CuratedItem[] = [
  { slug: "indore", label: "Indore" },
  { slug: "rohtak", label: "Rohtak" },
];
export const getIpmatCity = (slug: string) => IPMAT_CITIES.find((c) => c.slug === slug);

/* ---- DATASET-GATED patterns (emit only non-illustrative rows) ----------- */
const publishableColleges = () => colleges.filter(isCollegePublishable);
const publishableCutoffs = () => cutoffs.filter((r) => !r.illustrative && r.cutoff != null);
const publishableInstitutions = () => institutions.filter((r) => !r.illustrative);

export interface PatternReport {
  pattern: string;
  total: number;
  emitted: number;
  skipped: number;
  /** Paths emitted (relative). */
  paths: string[];
  note?: string;
  /** false = generator ready but route file deferred (paths NOT prerendered). */
  routed?: boolean;
}

/* Each builder returns a PatternReport so the build can log per-pattern stats. */
function reportCollegeProfiles(): PatternReport {
  const pub = publishableColleges();
  const paths = pub.map((c) => `/cuet/colleges/${c.universitySlug}/${c.collegeSlug}`);
  return { pattern: "cuet college profile /cuet/colleges/[u]/[c]", total: colleges.length, emitted: paths.length, skipped: colleges.length - paths.length, paths, note: "gated: illustrative rows skipped" };
}

function reportBestFor(): PatternReport {
  const courseSlugs = new Set<string>();
  for (const c of publishableColleges()) for (const course of c.coursesViaCuet) courseSlugs.add(slugify(course));
  const paths = [...courseSlugs].map((s) => `/cuet/colleges/best-for/${s}`);
  return { pattern: "cuet best-for course /cuet/colleges/best-for/[course]", total: colleges.length, emitted: paths.length, skipped: 0, paths, note: "needs ≥1 publishable college" };
}

function reportCutoffByCourse(): PatternReport {
  const pub = publishableCutoffs();
  const paths = pub.map((r) => `/cuet/cutoff/${slugify(r.university)}/${slugify(r.college)}/${slugify(r.course)}`);
  return { pattern: "cuet cutoff /cuet/cutoff/[u]/[c]/[course]", total: cutoffs.length, emitted: paths.length, skipped: cutoffs.length - paths.length, paths, note: "gated: needs verified cutoff value" };
}

function reportCollegesForBand(): PatternReport {
  // Score bands only make sense with real cutoffs; emit none until verified data.
  const hasData = publishableCutoffs().length > 0;
  const paths = hasData ? ["95-100", "90-95", "80-90", "70-80"].map((b) => `/cuet/cutoff/colleges-for/${b}`) : [];
  return { pattern: "cuet colleges-for-band /cuet/cutoff/colleges-for/[band]", total: 4, emitted: paths.length, skipped: 4 - paths.length, paths, note: "gated: needs verified cutoff dataset" };
}

function reportPredictor(): PatternReport {
  const pub = publishableColleges();
  const set = new Set<string>();
  for (const c of pub) for (const course of c.coursesViaCuet) set.add(`/cuet/results/college-predictor/${c.universitySlug}/${slugify(course)}`);
  const paths = [...set];
  return { pattern: "cuet predictor /cuet/results/college-predictor/[u]/[course]", total: colleges.length, emitted: paths.length, skipped: 0, paths, note: "gated: needs publishable colleges" };
}

function reportIpmatColleges(): PatternReport {
  const pub = publishableInstitutions();
  const paths = pub.map((r) => `/ipmat/colleges/${slugify(r.name)}`);
  return { pattern: "ipmat college profile /ipmat/colleges/[institute]", total: institutions.length, emitted: paths.length, skipped: institutions.length - paths.length, paths, note: "gated: illustrative institutions skipped" };
}

function reportIpmatFees(): PatternReport {
  const pub = fees.filter(isFeePublishable);
  const paths = pub.map((r) => `/ipmat/programme/${r.institute}/fees`);
  return { pattern: "ipmat fees /ipmat/programme/[institute]/fees", total: fees.length, emitted: paths.length, skipped: fees.length - paths.length, paths, note: "gated: needs verified fee" };
}

function reportIpmatPlacements(): PatternReport {
  const pub = placements.filter(isPlacementPublishable);
  const paths = pub.map((r) => `/ipmat/placements/${r.institute}`);
  return { pattern: "ipmat placements /ipmat/placements/[institute]", total: placements.length, emitted: paths.length, skipped: placements.length - paths.length, paths, note: "gated: official CTC only" };
}

function reportCuetSubjects(): PatternReport {
  // /cuet/[subject]/{syllabus,pyq,...} — 6 page types per real subject.
  // Route files deferred (a dynamic /cuet/[subject] seg-1 would shadow literal
  // /cuet/* children); generator ready — emits when verified subject rows exist.
  const real = syllabus.filter((r) => r.vertical === "CUET" && !r.illustrative);
  const subjects = new Set(real.map((r) => slugify(r.subjectOrSection)));
  const pages = [...subjects].flatMap((s) =>
    ["syllabus", "pyq", "important-topics", "how-to-prepare", "books", "weightage"].map((t) => `/cuet/${s}/${t}`),
  );
  return { pattern: "cuet subject pages /cuet/[subject]/{6 types}", total: subjects.size * 6, emitted: pages.length, skipped: 0, paths: pages, note: "gated: needs real CUET syllabus rows; route deferred", routed: false };
}

function reportLearningUnits(): PatternReport {
  // /cuet/[subject]/[chapter] + /ipmat/[section]/[topic] — one per real topic.
  const real = syllabus.filter((r) => !r.illustrative);
  const paths = real.map((r) =>
    r.vertical === "CUET"
      ? `/cuet/${slugify(r.subjectOrSection)}/${slugify(r.topic)}`
      : `/ipmat/${slugify(r.subjectOrSection)}/${slugify(r.topic)}`,
  );
  return { pattern: "learning units /[exam]/[section]/[topic]", total: syllabus.length, emitted: paths.length, skipped: syllabus.length - paths.length, paths, note: "gated: needs real topic rows; route deferred", routed: false };
}

function reportExamCenters(): PatternReport {
  // /cuet/exam-centers/[city] — NTA exam cities (distinct from LPT /centres).
  const pub = examCities.filter(isExamCityPublishable);
  const paths = pub.map((c) => `/cuet/exam-centers/${c.citySlug}`);
  return { pattern: "cuet exam cities /cuet/exam-centers/[city]", total: examCities.length, emitted: paths.length, skipped: examCities.length - paths.length, paths, note: "gated: needs verified exam-city rows" };
}

function reportBlogPosts(): PatternReport {
  const pub = posts.filter((p) => p.type === "blog" && isPostPublishable(p));
  const paths = pub.map((p) => `/blog/${p.slug}`);
  const total = posts.filter((p) => p.type === "blog").length;
  return { pattern: "blog posts /blog/[slug]", total, emitted: paths.length, skipped: total - paths.length, paths, note: "emits seeded evergreen posts" };
}

function reportCuetNews(): PatternReport {
  const pub = posts.filter((p) => p.type === "news" && p.vertical === "CUET" && isPostPublishable(p));
  const paths = pub.map((p) => `/cuet/news/${p.slug}`);
  const total = posts.filter((p) => p.type === "news" && p.vertical === "CUET").length;
  return { pattern: "cuet news /cuet/news/[slug]", total, emitted: paths.length, skipped: total - paths.length, paths, note: "gated: needs real dated NewsArticle" };
}

/* Curated patterns (emit now). */
function curated(pattern: string, base: string, items: CuratedItem[], note: string): PatternReport {
  const paths = items.map((i) => `${base}/${i.slug}`);
  return { pattern, total: items.length, emitted: paths.length, skipped: 0, paths, note };
}

export function programmaticReports(): PatternReport[] {
  return [
    // dataset-gated
    reportCollegeProfiles(),
    reportBestFor(),
    reportCutoffByCourse(),
    reportCollegesForBand(),
    reportPredictor(),
    reportIpmatColleges(),
    reportIpmatFees(),
    reportIpmatPlacements(),
    reportCuetSubjects(),
    reportLearningUnits(),
    reportExamCenters(),
    reportBlogPosts(),
    reportCuetNews(),
    // curated evergreen
    curated("cuet study-plan /cuet/study-plan/[duration]", "/cuet/study-plan", STUDY_DURATIONS, "curated evergreen"),
    curated("ipmat preparation /ipmat/preparation/[duration]", "/ipmat/preparation", STUDY_DURATIONS, "curated evergreen"),
    curated("ipmat syllabus section /ipmat/syllabus/[section]", "/ipmat/syllabus", IPMAT_SECTIONS, "curated evergreen"),
    curated("ipmat section-strategy /ipmat/section-strategy/[section]", "/ipmat/section-strategy", IPMAT_SECTIONS, "curated evergreen"),
    curated("ipmat interview /ipmat/interview/[institute]", "/ipmat/interview", INSTITUTES.map((i) => ({ slug: i.slug, label: i.short })), "curated evergreen"),
    curated("ipmat city /ipmat/city/[city]", "/ipmat/city", IPMAT_CITIES, "curated evergreen"),
    // Compare slug is a single hyphenated segment "cuet-vs-[exam]" (not a path split).
    {
      pattern: "cuet compare /cuet/compare/cuet-vs-[exam]",
      total: COMPARE_EXAMS.length,
      emitted: COMPARE_EXAMS.length,
      skipped: 0,
      paths: COMPARE_EXAMS.map((e) => `/cuet/compare/cuet-vs-${e.slug}`),
      note: "curated evergreen",
    },
  ];
}

/** Flat list of every emitted programmatic path that HAS a route file
 *  (for prerender + sitemap). Deferred-route patterns are excluded. */
export function programmaticEmittedPaths(): string[] {
  return programmaticReports()
    .filter((r) => r.routed !== false)
    .flatMap((r) => r.paths);
}

/** Human-readable build log line per pattern. */
export function programmaticReportLines(): string[] {
  return programmaticReports().map(
    (r) => `  [H7] ${r.pattern}: ${r.total} rows → ${r.emitted} emitted, ${r.skipped} skipped (${r.note ?? ""})`,
  );
}
