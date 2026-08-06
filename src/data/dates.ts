/* =============================================================================
 * IMPORTANT-DATES DATASET (SOP Appendix G: T-IMPORTANT-DATES)
 * Powers admission / important-dates pages for both verticals.
 *
 * ⚠️ Perishable. Every `dateWindow` is a placeholder ("{{...}}") until verified
 *    against the official source — never present an unverified date as fact.
 * =============================================================================
 */

import type { Vertical } from "@/config/site";

export interface ImportantDate {
  vertical: Vertical;
  event: string;
  /** Date or window. Placeholder until verified. */
  dateWindow: string;
  source: string;
  illustrative: boolean;
}

export const importantDates: ImportantDate[] = [
  {
    vertical: "CUET",
    event: "CUET (UG) registration window",
    dateWindow: "{{DATE — verify cuet.nta.nic.in}}",
    source: "cuet.nta.nic.in",
    illustrative: true,
  },
  {
    vertical: "CUET",
    event: "CUET (UG) exam dates",
    dateWindow: "{{DATE — verify cuet.nta.nic.in}}",
    source: "cuet.nta.nic.in",
    illustrative: true,
  },
  {
    vertical: "CUET",
    event: "CUET result / scorecard",
    dateWindow: "{{DATE — verify cuet.nta.nic.in}}",
    source: "cuet.nta.nic.in",
    illustrative: true,
  },
  {
    vertical: "CUET",
    event: "CSAS (DU) registration & allotment rounds",
    dateWindow: "{{DATE — verify university CSAS portal}}",
    source: "university CSAS portal",
    illustrative: true,
  },
  {
    vertical: "IPMAT",
    event: "IPMAT Indore registration",
    dateWindow: "{{DATE — verify iimidr.ac.in}}",
    source: "iimidr.ac.in",
    illustrative: true,
  },
  {
    vertical: "IPMAT",
    event: "IPMAT Indore exam date",
    dateWindow: "{{DATE — verify iimidr.ac.in}}",
    source: "iimidr.ac.in",
    illustrative: true,
  },
  {
    vertical: "IPMAT",
    event: "IPMAT Rohtak registration & exam",
    dateWindow: "{{DATE — verify iimrohtak.ac.in}}",
    source: "iimrohtak.ac.in",
    illustrative: true,
  },
  {
    vertical: "IPMAT",
    event: "JIPMAT registration & exam",
    dateWindow: "{{DATE — verify JIPMAT portal}}",
    source: "official JIPMAT portal",
    illustrative: true,
  },
];

export const datesFor = (v: Vertical): ImportantDate[] =>
  importantDates.filter((d) => d.vertical === v);
