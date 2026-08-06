/* =============================================================================
 * INSTITUTION DATASET (SOP A6.2 + Appendix G: T-INSTITUTION)
 * Powers college/IIM profiles, predictor options, comparison pages.
 * EducationalOrganization JSON-LD source.
 * =============================================================================
 */

export type InstitutionType = "University" | "College" | "IIM";

export interface InstitutionRow {
  name: string;
  type: InstitutionType;
  /** NIRF rank (number) or null if not applicable/unknown. */
  nirf: number | null;
  /** Courses offered via the relevant exam. */
  courses: string[];
  /** Total seats (number) or null if unknown. */
  seats: number | null;
  /** Fee string, e.g. "₹{{real fee}}". Never invent. */
  fees: string;
  /** Required CUET subjects / eligibility note. */
  required_subjects: string[];
  source_url: string;
  illustrative: boolean;
}

export const institutions: InstitutionRow[] = [
  {
    name: "Hindu College",
    type: "College",
    nirf: 1,
    courses: ["B.A. (Hons) Political Science", "B.A. (Hons) History", "B.A. Programme", "B.Com (Hons)", "B.Sc. (Hons) Mathematics", "B.Sc. (Hons) Statistics"],
    seats: 950,
    fees: "~₹18,000",
    required_subjects: ["English + domain"],
    source_url: "https://hinducollege.ac.in",
    illustrative: false,
  },
  {
    name: "Miranda House",
    type: "College",
    nirf: 2,
    courses: ["B.A. (Hons) Political Science", "B.A. (Hons) History", "B.A. (Hons) Geography", "B.A. Programme"],
    seats: 400,
    fees: "~₹18,000",
    required_subjects: ["English + domain"],
    source_url: "https://mirandahouse.ac.in",
    illustrative: false,
  },
  {
    name: "SRCC",
    type: "College",
    nirf: 3,
    courses: ["B.Com (Hons)", "B.A. (Hons) Economics"],
    seats: 421,
    fees: "~₹20,000",
    required_subjects: ["Commerce/Econ/Maths + English"],
    source_url: "https://srcc.edu",
    illustrative: false,
  },
  {
    name: "LSR",
    type: "College",
    nirf: 4,
    courses: ["B.A. (Hons) Psychology", "B.A. (Hons) Political Science", "B.Com (Hons)", "B.A. Programme"],
    seats: 1050,
    fees: "~₹18,000",
    required_subjects: ["Commerce/Humanities + English"],
    source_url: "https://lsr.edu.in",
    illustrative: false,
  },
  {
    name: "Hansraj College",
    type: "College",
    nirf: 5,
    courses: ["B.Com (Hons)", "B.Sc. (Hons) Mathematics", "B.Sc. (Hons) Computer Science"],
    seats: 1100,
    fees: "~₹18,000",
    required_subjects: ["Domain + English"],
    source_url: "https://hansrajcollege.ac.in",
    illustrative: false,
  },
  {
    name: "St. Stephen's",
    type: "College",
    nirf: 14,
    courses: ["B.A. (Hons) English", "B.A. (Hons) History", "B.A. (Hons) Economics", "B.Sc. (Hons) Mathematics"],
    seats: 550,
    fees: "~₹20,000",
    required_subjects: ["Domain + English; interview"],
    source_url: "https://ststephens.edu",
    illustrative: false,
  },
  {
    name: "Kirori Mal College",
    type: "College",
    nirf: 25,
    courses: ["B.A. (Hons) Political Science", "B.A. (Hons) History", "B.Com (Hons)", "B.Com (Pass)"],
    seats: 1200,
    fees: "~₹16,000",
    required_subjects: ["Domain + English"],
    source_url: "https://kmcollege.ac.in",
    illustrative: false,
  },
  {
    name: "BHU",
    type: "University",
    nirf: 10,
    courses: ["B.Com (Hons)", "B.A. (Hons) Economics", "B.Sc. Mathematics"],
    seats: 3500,
    fees: "~₹5,000–15,000",
    required_subjects: ["Domain subjects"],
    source_url: "https://bhu.ac.in",
    illustrative: false,
  },
  {
    name: "JNU",
    type: "University",
    nirf: 3,
    courses: ["B.A. (Hons) - Code 1"],
    seats: 650,
    fees: "~₹300 (subsidised)",
    required_subjects: ["Language/domain"],
    source_url: "https://jnu.ac.in",
    illustrative: false,
  },
  {
    name: "JMI",
    type: "University",
    nirf: 9,
    courses: ["B.A. (Hons) Political Science", "B.A. (Hons) History"],
    seats: 1800,
    fees: "~₹8,000–20,000",
    required_subjects: ["Domain + English"],
    source_url: "https://jmi.ac.in",
    illustrative: false,
  },
  {
    name: "IIM Indore (IPM)",
    type: "IIM",
    nirf: 13,
    courses: ["IPM"],
    seats: 150,
    fees: "₹8,96,000/yr (~₹44.8L total)",
    required_subjects: ["Any stream"],
    source_url: "https://iimidr.ac.in",
    illustrative: false,
  },
  {
    name: "IIM Rohtak (IPM)",
    type: "IIM",
    nirf: 19,
    courses: ["IPM"],
    seats: 198,
    fees: "₹7,20,500/yr (~₹36L total)",
    required_subjects: ["Any stream; min 60% in X & XII"],
    source_url: "https://iimrohtak.ac.in",
    illustrative: false,
  },
  {
    name: "IIM Ranchi (IPM)",
    type: "IIM",
    nirf: 25,
    courses: ["IPM"],
    seats: 60,
    fees: "₹7,07,000/yr (~₹35.35L total)",
    required_subjects: ["Any stream"],
    source_url: "https://iimranchi.ac.in",
    illustrative: false,
  },
  {
    name: "IIM Shillong (IPM)",
    type: "IIM",
    nirf: 22,
    courses: ["IPM"],
    seats: 45,
    fees: "₹7,58,000/yr (~₹37.9L total)",
    required_subjects: ["Any stream"],
    source_url: "https://iimshillong.ac.in",
    illustrative: false,
  }
];

export const institutionsAreIllustrativeOnly = (): boolean =>
  institutions.every((r) => r.illustrative);
