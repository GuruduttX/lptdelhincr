/* =============================================================================
 * CUET CUTOFF DATASET (SOP A6.1 + Appendix G: T-CUTOFF-CUET)
 * Powers every cutoff page + the college predictor + Dataset JSON-LD (A5.4).
 * =============================================================================
 */

export type Category = "General" | "OBC-NCL" | "SC" | "ST" | "EWS" | "PwBD";

export interface CutoffRow {
  year: number;
  university: string;
  /** e.g. "Hindu College" */
  college: string;
  /** e.g. "B.A. (Hons) Economics" */
  course: string;
  category: Category;
  /** CSAS allotment round number. */
  round: number;
  /** Closing CUET score/percentile for this combination + round. */
  cutoff: number | null;
  source_url: string;
  /** ISO date the figure was verified against the official source. */
  verified_date: string;
  /** TRUE = placeholder seed row, not verified data. */
  illustrative: boolean;
}

export const cutoffs: CutoffRow[] = [
  // Hindu College
  { year: 2025, university: "Delhi University", college: "Hindu College", course: "B.A. (Hons) Political Science", category: "General", round: 1, cutoff: 950.58, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Hindu College", course: "B.A. (Hons) History", category: "General", round: 1, cutoff: 914.00, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Hindu College", course: "B.A. Programme (History+PolSci)", category: "General", round: 1, cutoff: 936.18, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Hindu College", course: "B.Com (Hons)", category: "General", round: 1, cutoff: 912.22, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Hindu College", course: "B.Sc. (Hons) Mathematics", category: "General", round: 1, cutoff: 818.35, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Hindu College", course: "B.Sc. (Hons) Statistics", category: "General", round: 1, cutoff: 848.63, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  // Lady Shri Ram College (LSR)
  { year: 2025, university: "Delhi University", college: "Lady Shri Ram College (LSR)", course: "B.A. (Hons) Psychology", category: "General", round: 1, cutoff: 926.53, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Lady Shri Ram College (LSR)", course: "B.A. (Hons) Political Science", category: "General", round: 1, cutoff: 915.00, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Lady Shri Ram College (LSR)", course: "B.Com (Hons)", category: "General", round: 1, cutoff: 906.37, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Lady Shri Ram College (LSR)", course: "B.A. Programme (Eco+PolSci)", category: "General", round: 1, cutoff: 897.00, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  // Miranda House
  { year: 2025, university: "Delhi University", college: "Miranda House", course: "B.A. (Hons) Political Science", category: "General", round: 1, cutoff: 925.98, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Miranda House", course: "B.A. (Hons) Political Science", category: "OBC-NCL", round: 1, cutoff: 863.02, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Miranda House", course: "B.A. (Hons) History", category: "General", round: 1, cutoff: 894.00, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Miranda House", course: "B.A. (Hons) Geography", category: "General", round: 1, cutoff: 889.00, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Miranda House", course: "B.A. Programme (History+PolSci)", category: "General", round: 1, cutoff: 891.72, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  // Hansraj College
  { year: 2025, university: "Delhi University", college: "Hansraj College", course: "B.Com (Hons)", category: "General", round: 1, cutoff: 901.71, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Hansraj College", course: "B.Sc. (Hons) Mathematics", category: "General", round: 1, cutoff: 787.72, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Hansraj College", course: "B.Sc. (Hons) Computer Science", category: "General", round: 1, cutoff: 784.35, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  // St. Stephen's College
  { year: 2025, university: "Delhi University", college: "St. Stephen's College", course: "B.A. (Hons) English", category: "General", round: 1, cutoff: 926.93, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "St. Stephen's College", course: "B.A. (Hons) History", category: "General", round: 1, cutoff: 918.00, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "St. Stephen's College", course: "B.A. (Hons) Economics", category: "General", round: 1, cutoff: 904.00, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "St. Stephen's College", course: "B.Sc. (Hons) Mathematics", category: "General", round: 1, cutoff: 834.08, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  // Kirori Mal College
  { year: 2025, university: "Delhi University", college: "Kirori Mal College", course: "B.A. (Hons) Political Science", category: "General", round: 1, cutoff: 909.00, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Kirori Mal College", course: "B.A. (Hons) History", category: "General", round: 1, cutoff: 854.00, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Kirori Mal College", course: "B.Com (Hons)", category: "General", round: 1, cutoff: 897.00, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  { year: 2025, university: "Delhi University", college: "Kirori Mal College", course: "B.Com (Pass)", category: "General", round: 1, cutoff: 884.00, source_url: "ugadmission.uod.ac.in", verified_date: "2025-07-01", illustrative: false },
  // Banaras Hindu University (BHU)
  { year: 2025, university: "Banaras Hindu University", college: "BHU Main Campus", course: "B.Com (Hons)", category: "General", round: 1, cutoff: 560.00, source_url: "bhu.ac.in", verified_date: "2025-09-01", illustrative: false },
  { year: 2025, university: "Banaras Hindu University", college: "BHU Main Campus", course: "B.Com (Hons)", category: "OBC-NCL", round: 1, cutoff: 500.00, source_url: "bhu.ac.in", verified_date: "2025-09-01", illustrative: false },
  { year: 2025, university: "Banaras Hindu University", college: "BHU Main Campus", course: "B.A. (Hons) Economics", category: "General", round: 1, cutoff: 590.00, source_url: "bhu.ac.in", verified_date: "2025-09-01", illustrative: false },
  { year: 2025, university: "Banaras Hindu University", college: "BHU Main Campus", course: "B.Sc. Mathematics", category: "SC", round: 1, cutoff: 380.00, source_url: "bhu.ac.in", verified_date: "2025-09-01", illustrative: false },
  // Jamia Millia Islamia (JMI)
  { year: 2025, university: "Jamia Millia Islamia", college: "JMI Main Campus", course: "B.A. (Hons) Political Science", category: "General", round: 1, cutoff: 710.00, source_url: "jmi.ac.in", verified_date: "2025-09-01", illustrative: false },
  { year: 2025, university: "Jamia Millia Islamia", college: "JMI Main Campus", course: "B.A. (Hons) History", category: "General", round: 1, cutoff: 690.00, source_url: "jmi.ac.in", verified_date: "2025-09-01", illustrative: false },
  // Jawaharlal Nehru University (JNU)
  { year: 2025, university: "Jawaharlal Nehru University", college: "JNU Main Campus", course: "B.A. (Hons) - Code 1", category: "General", round: 1, cutoff: 93, source_url: "jnu.ac.in", verified_date: "2025-09-01", illustrative: false },
  { year: 2025, university: "Jawaharlal Nehru University", college: "JNU Main Campus", course: "B.A. (Hons) - Code 1", category: "SC", round: 1, cutoff: 78, source_url: "jnu.ac.in", verified_date: "2025-09-01", illustrative: false },
];

/** True if the dataset has no verified (non-illustrative) rows yet. */
export const cutoffsAreIllustrativeOnly = (): boolean =>
  cutoffs.every((r) => r.illustrative);
