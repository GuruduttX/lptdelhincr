/* =============================================================================
 * SYLLABUS DATASET (SOP A6.3 + Appendix G: T-SYLLABUS)
 * Powers syllabus pages + Learning Units for both verticals.
 * Course / ItemList JSON-LD source.
 * =============================================================================
 */

import type { Vertical } from "@/config/site";

export interface SyllabusRow {
  vertical: Vertical;
  /** Subject (CUET) or section (IPMAT), e.g. "Quantitative Aptitude". */
  subjectOrSection: string;
  /** Unit within the subject/section. */
  unit: string;
  /** Specific topic within the unit. */
  topic: string;
  /** PYQ weightage tag, e.g. "high" | "medium" | "low" (estimate — label as such). */
  pyq_weightage_tag: "high" | "medium" | "low" | "unknown";
  illustrative: boolean;
}

export const syllabus: SyllabusRow[] = [
  // CUET - General Aptitude Test
  { vertical: "CUET", subjectOrSection: "General Aptitude Test (GAT)", unit: "GK & Current Affairs", topic: "National/Intl Events; Awards/Books; Polity; History; Geography/Capitals; Science & Tech", pyq_weightage_tag: "high", illustrative: false },
  { vertical: "CUET", subjectOrSection: "General Aptitude Test (GAT)", unit: "Reasoning", topic: "Series; Analogies; Coding-Decoding; Blood Relations; Direction Sense; Puzzles", pyq_weightage_tag: "high", illustrative: false },
  { vertical: "CUET", subjectOrSection: "General Aptitude Test (GAT)", unit: "Quantitative", topic: "Number System; Percentage/Profit-Loss; Time-Work/Trains; Ratio-Partnership; Geometry/Mensuration; HCF-LCM/Stats", pyq_weightage_tag: "high", illustrative: false },
  { vertical: "CUET", subjectOrSection: "General Aptitude Test (GAT)", unit: "General Science", topic: "Physics; Chemistry; Biology", pyq_weightage_tag: "medium", illustrative: false },
  
  // CUET - English (Language)
  { vertical: "CUET", subjectOrSection: "English (Language)", unit: "Reading Comprehension", topic: "Unseen passages (factual/literary)", pyq_weightage_tag: "high", illustrative: false },
  { vertical: "CUET", subjectOrSection: "English (Language)", unit: "Vocabulary", topic: "Synonyms, antonyms, idioms", pyq_weightage_tag: "high", illustrative: false },
  { vertical: "CUET", subjectOrSection: "English (Language)", unit: "Grammar", topic: "Sentence correction / error spotting", pyq_weightage_tag: "high", illustrative: false },
  { vertical: "CUET", subjectOrSection: "English (Language)", unit: "Literary Devices", topic: "Simile, metaphor, personification", pyq_weightage_tag: "medium", illustrative: false },
  { vertical: "CUET", subjectOrSection: "English (Language)", unit: "Rearrangement", topic: "Para jumbles / para completion", pyq_weightage_tag: "medium", illustrative: false },
  
  // IPMAT - Quantitative Ability
  { vertical: "IPMAT", subjectOrSection: "Quantitative Ability", unit: "Arithmetic", topic: "Percentages/SI-CI; Time-Speed-Distance", pyq_weightage_tag: "high", illustrative: false },
  { vertical: "IPMAT", subjectOrSection: "Quantitative Ability", unit: "Algebra", topic: "Equations; Progressions", pyq_weightage_tag: "high", illustrative: false },
  { vertical: "IPMAT", subjectOrSection: "Quantitative Ability", unit: "Number System", topic: "Divisibility, LCM-HCF, Remainders", pyq_weightage_tag: "medium", illustrative: false },
  { vertical: "IPMAT", subjectOrSection: "Quantitative Ability", unit: "Geometry", topic: "Triangles, Circles, Coordinate Geometry", pyq_weightage_tag: "medium", illustrative: false },
  { vertical: "IPMAT", subjectOrSection: "Quantitative Ability", unit: "Modern Maths", topic: "Permutation & Combination, Probability", pyq_weightage_tag: "medium", illustrative: false },
  { vertical: "IPMAT", subjectOrSection: "Quantitative Ability", unit: "Data Interpretation", topic: "Tables, Bar/Line/Pie Charts", pyq_weightage_tag: "medium", illustrative: false },
  { vertical: "IPMAT", subjectOrSection: "Quantitative Ability", unit: "Miscellaneous", topic: "Set Theory, Functions, Logarithms", pyq_weightage_tag: "low", illustrative: false },
  
  // IPMAT - Verbal Ability
  { vertical: "IPMAT", subjectOrSection: "Verbal Ability", unit: "Reading Comprehension", topic: "Inference, Main Idea, Vocabulary in Context", pyq_weightage_tag: "high", illustrative: false },
  { vertical: "IPMAT", subjectOrSection: "Verbal Ability", unit: "Vocabulary", topic: "Synonyms, Antonyms, Analogies", pyq_weightage_tag: "medium", illustrative: false },
  { vertical: "IPMAT", subjectOrSection: "Verbal Ability", unit: "Grammar", topic: "Fill in the Blanks, Error Correction", pyq_weightage_tag: "high", illustrative: false },
  { vertical: "IPMAT", subjectOrSection: "Verbal Ability", unit: "Para Jumbles", topic: "Sentence Rearrangement", pyq_weightage_tag: "medium", illustrative: false },
  { vertical: "IPMAT", subjectOrSection: "Verbal Ability", unit: "Critical Reasoning", topic: "Assumption, Inference, Strengthen-Weaken", pyq_weightage_tag: "medium", illustrative: false },
  { vertical: "IPMAT", subjectOrSection: "Verbal Ability", unit: "Miscellaneous", topic: "Idioms, Phrasal Verbs", pyq_weightage_tag: "low", illustrative: false }
];

export const syllabusForVertical = (v: Vertical): SyllabusRow[] =>
  syllabus.filter((r) => r.vertical === v);

export const syllabusIsIllustrativeOnly = (): boolean =>
  syllabus.every((r) => r.illustrative);
