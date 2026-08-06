/* =============================================================================
 * CUET NTA EXAM-CITY DATASET (SOP H4 P8)
 * Powers /cuet/exam-centers/[city] — NTA exam cities (DISTINCT from LPT coaching
 * /centres/[area]). Per SOP H7, a city page emits ONLY for a verified, non-
 * illustrative row. With this seed data, ZERO city pages emit (intended).
 *
 * NAMING GUARDRAIL: these are NTA *exam* cities, not LPT coaching centres.
 * =============================================================================
 */

export interface ExamCity {
  citySlug: string;
  city: string;
  state: string;
  /** Practical, verified note for the city (transport, reporting). */
  note: string;
  illustrative: boolean;
}

export const examCities: ExamCity[] = [
  {
    citySlug: "illustrative-city",
    city: "[ILLUSTRATIVE EXAM CITY]",
    state: "{{STATE}}",
    note: "{{verified city note — confirm exam-city list on cuet.nta.nic.in}}",
    illustrative: true,
  },
];

export const isExamCityPublishable = (c: ExamCity): boolean =>
  !c.illustrative && !!c.citySlug && !c.city.startsWith("[");

export const getExamCity = (slug: string): ExamCity | undefined =>
  examCities.find((c) => c.citySlug === slug && isExamCityPublishable(c));
