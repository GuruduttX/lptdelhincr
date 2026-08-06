/* =============================================================================
 * IPMAT DATASETS (SOP Appendix G: T-EXAM-IPMAT, T-IPMAT-CUTOFF, T-COMPOSITE)
 * Powers the IPMAT exam/marking, cutoff, composite-score and admission pages.
 * =============================================================================
 */

export type InstituteSlug = "indore" | "rohtak" | "jipmat";

export interface Institute {
  slug: InstituteSlug;
  name: string;
  /** Short label used in headings. */
  short: string;
}

export const INSTITUTES: Institute[] = [
  { slug: "indore", name: "IIM Indore (IPM)", short: "Indore" },
  { slug: "rohtak", name: "IIM Rohtak (IPM)", short: "Rohtak" },
  { slug: "jipmat", name: "JIPMAT (IIM Jammu & Bodh Gaya)", short: "JIPMAT" },
];

export const getInstitute = (slug: string): Institute | undefined =>
  INSTITUTES.find((i) => i.slug === slug);

/* T-EXAM-IPMAT — three-exam comparison */
export interface ExamRow {
  exam: string;
  questionsMarksTime: string;
  sections: string;
  sectionalLock: string;
  negativeMarking: string;
  verify: boolean;
}

export const ipmatExam: ExamRow[] = [
  {
    exam: "IIM Indore",
    questionsMarksTime: "90 Q · 360 marks · 120 min",
    sections: "QA-SA (15) · QA-MCQ (30) · VA (45)",
    sectionalLock: "40 min / section",
    negativeMarking: "QA-SA: none · QA-MCQ & VA: −1",
    verify: false,
  },
  {
    exam: "IIM Rohtak",
    questionsMarksTime: "120 Q · 480 marks · 120 min",
    sections: "QA · VA · LR (40 each)",
    sectionalLock: "None",
    negativeMarking: "−1 in all sections",
    verify: false,
  },
  {
    exam: "JIPMAT (Jammu, Bodh Gaya)",
    questionsMarksTime: "100 Q · 150 min",
    sections: "QA · DILR · VA",
    sectionalLock: "None",
    negativeMarking: "per official bulletin",
    verify: false,
  },
];

/* T-IPMAT-CUTOFF — sectional cutoffs by institute × category. */
export type IpmatCategory = "General" | "EWS" | "OBC-NCL" | "SC" | "ST" | "PwD";

export interface IpmatCutoffRow {
  institute: InstituteSlug;
  section: string;
  category: IpmatCategory;
  cutoff: number | null;
  year: number;
  source_url: string;
  illustrative: boolean;
}

export const ipmatCutoffs: IpmatCutoffRow[] = [
  // IIM Indore QA SA
  { institute: "indore", section: "QA SA (/60)", category: "General", cutoff: 24, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  { institute: "indore", section: "QA SA (/60)", category: "EWS", cutoff: 16, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  { institute: "indore", section: "QA SA (/60)", category: "OBC-NCL", cutoff: 18, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  { institute: "indore", section: "QA SA (/60)", category: "SC", cutoff: 9, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  { institute: "indore", section: "QA SA (/60)", category: "ST", cutoff: 4, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  // IIM Indore QA MCQ
  { institute: "indore", section: "QA MCQ (/120)", category: "General", cutoff: 28, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  { institute: "indore", section: "QA MCQ (/120)", category: "EWS", cutoff: 17, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  { institute: "indore", section: "QA MCQ (/120)", category: "OBC-NCL", cutoff: 20, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  { institute: "indore", section: "QA MCQ (/120)", category: "SC", cutoff: 10, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  { institute: "indore", section: "QA MCQ (/120)", category: "ST", cutoff: 5, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  // IIM Indore VA
  { institute: "indore", section: "Verbal Ability (/180)", category: "General", cutoff: 113, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  { institute: "indore", section: "Verbal Ability (/180)", category: "EWS", cutoff: 79, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  { institute: "indore", section: "Verbal Ability (/180)", category: "OBC-NCL", cutoff: 83, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  { institute: "indore", section: "Verbal Ability (/180)", category: "SC", cutoff: 46, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  { institute: "indore", section: "Verbal Ability (/180)", category: "ST", cutoff: 23, year: 2025, source_url: "iimidr.ac.in", illustrative: false },
  
  // IIM Rohtak Overall
  { institute: "rohtak", section: "Overall (/480)", category: "General", cutoff: 381, year: 2025, source_url: "iimrohtak.ac.in", illustrative: false },
  { institute: "rohtak", section: "Overall (/480)", category: "EWS", cutoff: 310, year: 2025, source_url: "iimrohtak.ac.in", illustrative: false },
  { institute: "rohtak", section: "Overall (/480)", category: "OBC-NCL", cutoff: 288, year: 2025, source_url: "iimrohtak.ac.in", illustrative: false },
  { institute: "rohtak", section: "Overall (/480)", category: "SC", cutoff: 220, year: 2025, source_url: "iimrohtak.ac.in", illustrative: false },
  { institute: "rohtak", section: "Overall (/480)", category: "ST", cutoff: 145, year: 2025, source_url: "iimrohtak.ac.in", illustrative: false },
];

/* T-COMPOSITE — composite scoring weights per institute. */
export interface CompositeRow {
  institute: InstituteSlug;
  components: { label: string; weight: number | null }[];
  notes: string;
  verify: boolean;
}

export const ipmatComposite: Record<InstituteSlug, CompositeRow> = {
  indore: {
    institute: "indore",
    components: [
      { label: "Aptitude Test Score (ATS)", weight: 65 },
      { label: "Personal Interview (PI)", weight: 35 },
    ],
    notes: "IIM Indore 2025-26 batch composite weights.",
    verify: false,
  },
  rohtak: {
    institute: "rohtak",
    components: [
      { label: "IPMAT Rohtak score", weight: 55 },
      { label: "Personal Interview (PI)", weight: 15 },
      { label: "Class XII marks", weight: 20 },
      { label: "Class X marks", weight: 10 },
    ],
    notes: "IIM Rohtak 2025-26 batch composite weights.",
    verify: false,
  },
  jipmat: {
    institute: "jipmat",
    components: [{ label: "JIPMAT score", weight: 100 }],
    notes: "JIPMAT admission follows the official JIPMAT process — verify the current composite/selection rule.",
    verify: true,
  },
};

export const ipmatHasVerifiedCutoffs = (): boolean =>
  ipmatCutoffs.some((r) => !r.illustrative);
