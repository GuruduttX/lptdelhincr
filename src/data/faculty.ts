/* =============================================================================
 * FACULTY DATASET — real LPT mentors (E-E-A-T). Source: LPT faculty listing
 * (lptedtech.com), fetched 28 Jun 2026. Names + role + years of experience are
 * verified; photos/extended bios to be added when supplied. No fabricated people.
 * =============================================================================
 */

export interface Faculty {
  slug: string;
  name: string;
  /** Display role, e.g. "Sr. Quant Mentor". */
  role: string;
  /** Subject specialism. */
  subject: string;
  /** Years of teaching experience (verified). */
  experienceYears: number;
  /** Topics for Person.knowsAbout schema. */
  knowsAbout: string[];
}

export const FACULTY: Faculty[] = [
  { slug: "pradeep-bharti", name: "Pradeep Bharti", role: "Sr. Quant Mentor", subject: "Quantitative Aptitude", experienceYears: 17, knowsAbout: ["CUET", "IPMAT", "Quantitative Aptitude"] },
  { slug: "vandana-chand", name: "Vandana Chand", role: "Sr. VARC Mentor", subject: "Verbal Ability & Reading Comprehension", experienceYears: 17, knowsAbout: ["CUET", "IPMAT", "Verbal Ability"] },
  { slug: "sneha-batham", name: "Sneha Batham", role: "Sr. VARC Mentor", subject: "Verbal Ability & Reading Comprehension", experienceYears: 16, knowsAbout: ["CUET", "IPMAT", "Verbal Ability"] },
  { slug: "raghvendra-sharan-dwivedi", name: "Raghvendra Sharan Dwivedi", role: "Sr. LR/DI Mentor", subject: "Logical Reasoning & Data Interpretation", experienceYears: 12, knowsAbout: ["CUET", "IPMAT", "Logical Reasoning"] },
  { slug: "shuchi-sharma", name: "Dr. Shuchi Sharma", role: "Sr. VARC Mentor", subject: "Verbal Ability & Reading Comprehension", experienceYears: 20, knowsAbout: ["CUET", "IPMAT", "Verbal Ability"] },
  { slug: "manoj-mahajan", name: "Manoj Mahajan", role: "Sr. LR/DI Mentor", subject: "Logical Reasoning & Data Interpretation", experienceYears: 22, knowsAbout: ["CUET", "IPMAT", "Logical Reasoning"] },
  { slug: "shruti-tiwari", name: "Shruti Tiwari", role: "Sr. VARC Mentor", subject: "Verbal Ability & Reading Comprehension", experienceYears: 20, knowsAbout: ["CUET", "IPMAT", "Verbal Ability"] },
];

export const getFaculty = (slug: string): Faculty | undefined =>
  FACULTY.find((f) => f.slug === slug);

/** Average teacher experience (verified network figure: "10 Yr +"). */
export const AVG_TEACHER_EXPERIENCE = "10+";
