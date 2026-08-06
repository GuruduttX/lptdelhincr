/* =============================================================================
 * CUET COLLEGE DATASET (SOP Appendix G: T-COLLEGE-CUET)
 * Powers /cuet/colleges/[university]/[college], best-for/[course], comparisons.
 *
 * ⚠️ ALL ROWS `illustrative: true` — placeholders. Per SOP H7, programmatic
 *    college pages are emitted ONLY for non-illustrative rows with the required
 *    fields. With this seed data, ZERO college pages are emitted (intended).
 *    Replace with verified rows (slug, cutoff, seats, NIRF, source) to scale.
 * =============================================================================
 */

export interface CollegeRow {
  universitySlug: string;
  university: string;
  collegeSlug: string;
  college: string;
  coursesViaCuet: string[];
  requiredSubjects: string[];
  /** Last General-category closing CUET score (per latest cycle) or null. */
  lastGenCutoff: number | null;
  seats: number | null;
  nirf: number | null;
  source_url: string;
  illustrative: boolean;
}

export const colleges: CollegeRow[] = [
  {
    universitySlug: "du",
    university: "Delhi University",
    collegeSlug: "illustrative-college",
    college: "[ILLUSTRATIVE COLLEGE]",
    coursesViaCuet: ["B.A. (Hons) Economics", "B.Com (Hons)"],
    requiredSubjects: ["CUET — domain subjects per course"],
    lastGenCutoff: null,
    seats: null,
    nirf: null,
    source_url: "{{SOURCE_URL — official CSAS release}}",
    illustrative: true,
  },
];

/** A college row is publishable only when verified AND it has slugs + a name. */
export const isCollegePublishable = (r: CollegeRow): boolean =>
  !r.illustrative && !!r.universitySlug && !!r.collegeSlug && !r.college.startsWith("[");

export const collegesAreIllustrativeOnly = (): boolean => colleges.every((r) => r.illustrative);
