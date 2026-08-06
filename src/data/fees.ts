/* =============================================================================
 * PROGRAMME FEES DATASET (SOP Appendix G: T-FEES)
 * Powers /ipmat/programme/[institute]/fees and the ROI page.
 *
 * ⚠️ ALL ROWS `illustrative: true`. Per SOP H7, fee pages emit ONLY for
 *    non-illustrative rows. Fees are perishable — verify against the official
 *    institute source. With this seed data, ZERO fee pages are emitted.
 * =============================================================================
 */

import type { InstituteSlug } from "./ipmat";

export interface FeeRow {
  institute: InstituteSlug;
  duration: string;
  totalFee: string;
  internationalFee: string;
  source_url: string;
  illustrative: boolean;
}

export const fees: FeeRow[] = [
  {
    institute: "indore",
    duration: "5-year IPM",
    totalFee: "{{TOTAL_FEE — verify iimidr.ac.in}}",
    internationalFee: "{{INTL_FEE}}",
    source_url: "https://iimidr.ac.in",
    illustrative: true,
  },
  {
    institute: "rohtak",
    duration: "5-year IPM",
    totalFee: "{{TOTAL_FEE — verify iimrohtak.ac.in}}",
    internationalFee: "{{INTL_FEE}}",
    source_url: "https://iimrohtak.ac.in",
    illustrative: true,
  },
];

export const isFeePublishable = (r: FeeRow): boolean =>
  !r.illustrative && !r.totalFee.startsWith("{{");

export const feesFor = (slug: InstituteSlug): FeeRow[] => fees.filter((f) => f.institute === slug);
