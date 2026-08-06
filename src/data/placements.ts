/* =============================================================================
 * PLACEMENT DATASET (SOP Appendix G: T-PLACEMENT)
 * Powers /ipmat/placements/[institute] and institute profiles.
 *
 * ⚠️ ALL ROWS `illustrative: true`. Per SOP H7, placement pages emit ONLY for
 *    non-illustrative rows. Official CTC figures ONLY — never fabricate. With
 *    this seed data, ZERO placement pages are emitted (intended).
 * =============================================================================
 */

import type { InstituteSlug } from "./ipmat";

export interface PlacementRow {
  institute: InstituteSlug;
  batch: string;
  placementPct: number | null;
  recruiters: string[];
  /** Official CTC string only (e.g. "₹{{avg}}"); null/placeholder otherwise. */
  avgCtc: string;
  source_url: string;
  illustrative: boolean;
}

export const placements: PlacementRow[] = [
  {
    institute: "indore",
    batch: "{{batch year}}",
    placementPct: null,
    recruiters: [],
    avgCtc: "{{OFFICIAL_CTC — verify iimidr.ac.in}}",
    source_url: "https://iimidr.ac.in",
    illustrative: true,
  },
];

export const isPlacementPublishable = (r: PlacementRow): boolean =>
  !r.illustrative && r.placementPct != null;

export const placementsFor = (slug: InstituteSlug): PlacementRow[] =>
  placements.filter((p) => p.institute === slug);
