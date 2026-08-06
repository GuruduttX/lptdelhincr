import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { programmaticEmittedPaths, programmaticReportLines } from "./src/lib/programmatic";
import { FACULTY } from "./src/data/faculty";

// TanStack Start (SSR/SSG). Every route below is prerendered to static HTML so
// critical content renders with JS disabled (SOP A1). We list pages explicitly
// (crawlLinks off) because the footer links to planned routes that aren't built
// yet — crawling them would 404 the build. Add new routes here as they ship.
const AREAS = ["noida", "hauz-khas", "gtb-nagar", "gurugram", "delhi-ncr"];
const CENTRE_SLUGS = ["noida", "hauz-khas", "gtb-nagar", "gurugram"];
const IPMAT_INSTITUTES = ["indore", "rohtak", "jipmat"];

const PRERENDER_PAGES = [
  // Core / brand
  "/", "/about", "/contact", "/faculty", "/results", "/resources", "/privacy", "/terms",
  "/courses", "/courses/cuet", "/courses/ipmat",
  // Faculty bios (real mentors)
  ...FACULTY.map((f) => `/faculty/${f.slug}`),
  // Local pillar
  "/centres", ...CENTRE_SLUGS.map((s) => `/centres/${s}`),
  ...AREAS.map((a) => `/cuet/coaching-in-${a}`),
  ...AREAS.map((a) => `/ipmat/coaching-in-${a}`),
  // CUET vertical (P1–P3)
  "/cuet", "/cuet/results", "/cuet/results/marks-vs-percentile", "/cuet/results/normalization",
  "/cuet/results/scorecard", "/cuet/results/score-calculator", "/cuet/results/college-predictor",
  "/cuet/cutoff", "/cuet/cutoff/how-cutoffs-work", "/cuet/cutoff/dataset",
  "/cuet/admission", "/cuet/admission/freeze-vs-upgrade", "/cuet/admission/spot-round",
  "/cuet/compare", "/cuet/compare/cuet-vs-ipmat",
  // IPMAT vertical (I1–I4)
  "/ipmat", "/ipmat/exam", "/ipmat/marking-scheme", "/ipmat/sectional-lock", "/ipmat/cutoff",
  ...IPMAT_INSTITUTES.map((i) => `/ipmat/composite-score/${i}`),
  "/ipmat/safe-score", "/ipmat/eligibility",
  ...IPMAT_INSTITUTES.map((i) => `/ipmat/admission/${i}`),
  "/ipmat/important-dates", "/ipmat/application-process",
  // FAQ hubs
  "/faq", "/faq/cuet", "/faq/ipmat",
  // ── Phase 3 STATIC pages ──
  // CUET P4–P7
  "/cuet/colleges", "/cuet/compare/quiz", "/cuet/syllabus",
  "/cuet/exam-pattern", "/cuet/marking", "/cuet/eligibility", "/cuet/subject-rules", "/cuet/languages",
  // IPMAT I5–I8
  "/ipmat/colleges", "/ipmat/programme/structure", "/ipmat/roi",
  "/ipmat/syllabus", "/ipmat/books-mocks",
  "/ipmat/compare", "/ipmat/compare/ipm-vs-bba", "/ipmat/compare/indore-vs-rohtak", "/ipmat/worth-it",
  "/ipmat/wat", "/ipmat/profile-building",
  // ── Phase 4 STATIC pages (P8–P10 / I9–I10 / news) ──
  // CUET P8 (NTA exam cities — distinct from /centres) + slip/admit/exam-day
  "/cuet/exam-centers", "/cuet/city-slip", "/cuet/admit-card", "/cuet/exam-day",
  // CUET P9 history/policy/changes
  "/cuet/history", "/cuet/policy", "/cuet/changes",
  // CUET P10 experience/trust
  "/cuet/faq", "/cuet/is-cuet-hard", "/cuet/without-coaching", "/cuet/toppers", "/cuet/parents-guide",
  // IPMAT I9/I10
  "/ipmat/campus-life", "/ipmat/faq", "/ipmat/self-study-vs-coaching", "/ipmat/parents-guide", "/ipmat/wellbeing",
  // News / freshness
  "/blog", "/news",
  // ── PROGRAMMATIC (emitted only for real/curated rows; SOP H7) ──
  ...programmaticEmittedPaths(),
].map((path) => ({ path, prerender: { enabled: true } }));

// Build-time H7 report: rows total / emitted / skipped per programmatic pattern.
console.log("[build] Programmatic emission (SOP H7 — no thin spawns):");
for (const line of programmaticReportLines()) console.log(line);

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: false, failOnError: false },
      pages: PRERENDER_PAGES,
    }),
    viteReact(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
