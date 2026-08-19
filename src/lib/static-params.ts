/* =============================================================================
 * generateStaticParams SOURCES (App Router)
 *
 * Every dynamic route in app/ gets its param rows from here, and every builder
 * applies the same publishability gate as the SOP H7 registry in
 * ./programmatic.ts. A route can therefore never prerender a URL the H7 gate
 * would have skipped — "no thin spawns" stays enforced in one place.
 *
 * With `output: "export"` these lists ARE the emitted URL set: anything not
 * returned here is simply not built (and 404s), exactly as under the previous
 * prerender list in vite.config.ts.
 * ============================================================================= */

import { CENTRES } from "@/config/site";
import { colleges, isCollegePublishable } from "@/data/colleges";
import { cutoffs } from "@/data/cutoffs";
import { examCities, isExamCityPublishable } from "@/data/examCenters";
import { FACULTY } from "@/data/faculty";
import { fees, isFeePublishable } from "@/data/fees";
import { institutions } from "@/data/institutions";
import { INSTITUTES } from "@/data/ipmat";
import { placements, isPlacementPublishable } from "@/data/placements";
import { posts, isPostPublishable } from "@/data/posts";
import {
  COMPARE_EXAMS,
  CUTOFF_BANDS,
  IPMAT_CITIES,
  IPMAT_SECTIONS,
  STUDY_DURATIONS,
  slugify,
} from "@/lib/programmatic";

/* ---- brand / people ----------------------------------------------------- */
export const centreParams = () => CENTRES.map((c) => ({ slug: c.slug }));
export const facultyParams = () => FACULTY.map((f) => ({ slug: f.slug }));

/* ---- editorial (gated on real, published posts) ------------------------- */
export const blogParams = () =>
  posts
    .filter((p) => p.type === "blog" && isPostPublishable(p))
    .map((p) => ({ slug: p.slug }));

export const cuetNewsParams = () =>
  posts
    .filter(
      (p) => p.type === "news" && p.vertical === "CUET" && isPostPublishable(p),
    )
    .map((p) => ({ slug: p.slug }));

/* ---- CUET datasets (gated on verified rows) ----------------------------- */
const publishableColleges = () => colleges.filter(isCollegePublishable);
const publishableCutoffs = () =>
  cutoffs.filter((r) => !r.illustrative && r.cutoff != null);

export const cuetCollegeParams = () =>
  publishableColleges().map((c) => ({
    university: c.universitySlug,
    college: c.collegeSlug,
  }));

export const cuetBestForParams = () => {
  const courses = new Set<string>();
  for (const c of publishableColleges())
    for (const course of c.coursesViaCuet) courses.add(slugify(course));
  return [...courses].map((course) => ({ course }));
};

export const cuetCutoffParams = () =>
  publishableCutoffs().map((r) => ({
    university: slugify(r.university),
    college: slugify(r.college),
    course: slugify(r.course),
  }));

/** A band is emitted only when verified cutoff rows actually fall inside it —
 *  otherwise the page would render empty (SOP H7). */
export const cuetBandParams = () =>
  Object.entries(CUTOFF_BANDS)
    .filter(([, [lo, hi]]) =>
      publishableCutoffs().some((r) => r.cutoff! >= lo && r.cutoff! < hi),
    )
    .map(([band]) => ({ band }));

export const cuetPredictorParams = () => {
  const seen = new Set<string>();
  const rows: { university: string; course: string }[] = [];
  for (const c of publishableColleges()) {
    for (const course of c.coursesViaCuet) {
      const key = `${c.universitySlug}/${slugify(course)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push({ university: c.universitySlug, course: slugify(course) });
    }
  }
  return rows;
};

export const cuetExamCityParams = () =>
  examCities.filter(isExamCityPublishable).map((c) => ({ city: c.citySlug }));

/* ---- IPMAT datasets ------------------------------------------------------ */
export const ipmatInstituteParams = () =>
  INSTITUTES.map((i) => ({ institute: i.slug }));

export const ipmatCollegeParams = () =>
  institutions
    .filter((r) => !r.illustrative)
    .map((r) => ({ institute: slugify(r.name) }));

export const ipmatFeesParams = () =>
  fees.filter(isFeePublishable).map((r) => ({ institute: r.institute }));

export const ipmatPlacementParams = () =>
  placements
    .filter(isPlacementPublishable)
    .map((r) => ({ institute: r.institute }));

/* ---- curated evergreen patterns ----------------------------------------- */
export const studyDurationParams = () =>
  STUDY_DURATIONS.map((d) => ({ duration: d.slug }));
export const ipmatSectionParams = () =>
  IPMAT_SECTIONS.map((s) => ({ section: s.slug }));
export const ipmatCityParams = () =>
  IPMAT_CITIES.map((c) => ({ city: c.slug }));
export const cuetCompareParams = () =>
  COMPARE_EXAMS.map((e) => ({ matchup: `cuet-vs-${e.slug}` }));
