/* =============================================================================
 * MARKS ↔ PERCENTILE DATASET (SOP Appendix G: T-MARKS-PCTILE)
 * Powers /cuet/results/marks-vs-percentile and the score calculator.
 *
 * ⚠️ These bands are ESTIMATES that depend on the normalised distribution of a
 *    given session — they are NOT official and vary year to year. Every row is
 *    `estimate: true`; cells are null until a verified band is supplied. Always
 *    label these as estimates on-page (SOP B5).
 * =============================================================================
 */

export interface MarksPercentileRow {
  subject: string;
  rawMarksBand: string;
  percentileBand: string;
  note: string;
  estimate: boolean;
}

export const marksPercentile: MarksPercentileRow[] = [
  {
    subject: "[ILLUSTRATIVE — per CUET subject]",
    rawMarksBand: "{{raw band}}",
    percentileBand: "{{percentile band}}",
    note: "Estimate only — normalised per session; verify with official scorecard.",
    estimate: true,
  },
];

/**
 * Rough marks→percentile ESTIMATOR for the score calculator. Returns a coarse,
 * clearly-labelled band, NOT an official figure. Until per-subject normalised
 * data is loaded this is a generic monotonic approximation, never authoritative.
 */
export function estimatePercentileBand(rawPercent: number): string {
  const p = Math.max(0, Math.min(100, rawPercent));
  if (p >= 90) return "~98–99+ %ile (estimate)";
  if (p >= 80) return "~95–98 %ile (estimate)";
  if (p >= 70) return "~90–95 %ile (estimate)";
  if (p >= 55) return "~80–90 %ile (estimate)";
  if (p >= 40) return "~65–80 %ile (estimate)";
  return "below ~65 %ile (estimate)";
}
