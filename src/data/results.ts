/* =============================================================================
 * RESULTS DATASET — verified LPT IPMAT/IIM selections.
 * Source: official LPT IPMAT results brochure (2024–25 cycles). Real, named,
 * attributable selections only — never inflated or fabricated (SOP honesty rule).
 * Update each cycle from official allotment / institute records.
 * =============================================================================
 */

/* Headline proof figures (verified, 2-year window) — single source of truth,
 * reused by the /results page and the homepage marketing sections. */
export const STUDENTS_MENTORED = "454+";
export const IIM_SELECTIONS_2YR = "140+";
export const IIM_SEATS_2025 = "80+";

export interface ResultHeadline {
  value: string;
  label: string;
}

export const RESULT_HEADLINES: ResultHeadline[] = [
  { value: IIM_SELECTIONS_2YR, label: "IIM selections in 2 years" },
  { value: IIM_SEATS_2025, label: "IIM seats in 2025 alone" },
  { value: STUDENTS_MENTORED, label: "students mentored, top IIMs" },
];

export interface Topper {
  name: string;
  /** All India Rank (IPMAT Indore), when applicable. */
  air?: number;
  institute: string;
  status: "Selected" | "Call";
  /** Verified percentile, when that is the attributable figure. */
  percentile?: string;
}

/** Flagship ranks (IPMAT Indore). */
export const TOP_RANKS: Topper[] = [
  { name: "Parth Baheti", air: 9, institute: "IIM Indore", status: "Selected" },
  { name: "Anshi Arora", air: 22, institute: "IIM Indore", status: "Selected" },
  { name: "Shashwat Kumar", air: 24, institute: "IIM Indore", status: "Selected" },
];

/** Named selections & calls, grouped by institute (verified brochure list). */
export const SELECTIONS: { institute: string; students: Topper[] }[] = [
  {
    institute: "IIM Rohtak",
    students: [
      { name: "Aakshit", institute: "IIM Rohtak", status: "Selected" },
      { name: "Rakshit", institute: "IIM Rohtak", status: "Selected" },
      { name: "Kanav", institute: "IIM Rohtak", status: "Selected" },
      { name: "Mahir", institute: "IIM Rohtak", status: "Selected" },
      { name: "Rao Yashveer", institute: "IIM Rohtak", status: "Selected" },
      { name: "Gaurav", institute: "IIM Rohtak", status: "Selected" },
    ],
  },
  {
    institute: "IIM Indore",
    students: [
      { name: "Kanav", institute: "IIM Indore", status: "Call" },
      { name: "Sakshi", institute: "IIM Indore", status: "Call" },
      { name: "Rakshit", institute: "IIM Indore", status: "Call" },
    ],
  },
  {
    institute: "IIM Amritsar",
    students: [
      { name: "Sakshi", institute: "IIM Amritsar", status: "Selected" },
      { name: "Rakshit", institute: "IIM Amritsar", status: "Selected" },
    ],
  },
  {
    institute: "JIPMAT (IIM Bodh Gaya / Jammu)",
    students: [
      { name: "Rao Yashveer", institute: "IIM Bodh Gaya", status: "Selected" },
      { name: "Isha Mehta", institute: "IIM Bodh Gaya & Jammu", status: "Selected" },
      { name: "Gaurav Yadav", institute: "IIM Bodh Gaya & Jammu", status: "Selected" },
      { name: "Aakshit", institute: "IIM Bodh Gaya", status: "Selected" },
      { name: "Sakshi Choudhary", institute: "IIM Bodh Gaya", status: "Selected" },
      { name: "Aadrik Agarwal", institute: "JIPMAT", status: "Call", percentile: "98.00%ile" },
      { name: "Tushar", institute: "JIPMAT", status: "Call", percentile: "98.37%ile" },
      { name: "Rigav", institute: "JIPMAT", status: "Call", percentile: "98.23%ile" },
      { name: "Raghav", institute: "JIPMAT", status: "Call", percentile: "96.18%ile" },
    ],
  },
  {
    institute: "IIM Kozhikode (BMS)",
    students: [
      { name: "Arpit Gangwal", institute: "IIM Kozhikode (BMS)", status: "Selected" },
      { name: "Taniya Mudi", institute: "IIM Kozhikode (BMS)", status: "Selected" },
    ],
  },
];

export interface Testimonial {
  name: string;
  institute: string;
  quote: string;
}

/** Verified student testimonials (LPT IPMAT brochure). */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Parth Baheti",
    institute: "IIM Indore",
    quote:
      "LPT's structured preparation and mentoring helped me refine my approach. The focus on clarity and consistency played an important role in my final performance.",
  },
  {
    name: "Vanshika Tiwari",
    institute: "IIM Ranchi",
    quote:
      "Before joining, I had no clear strategy for IPMAT. The mentorship here completely changed my approach. Whenever I felt stuck, the mentors helped me realign instantly.",
  },
  {
    name: "Akshay Goyal",
    institute: "IIM Bodh Gaya",
    quote:
      "The faculty made even the toughest topics feel manageable — from basics to advanced. Doubt-solving was always quick and student-friendly. I genuinely believe the faculty was my biggest advantage.",
  },
  {
    name: "Tanay Salecha",
    institute: "IIM Bodh Gaya",
    quote:
      "The PI preparation was thorough and structured. From mock interviews to personalized feedback — I walked into the interview room feeling fully prepared. That made the decisive difference.",
  },
];

/* =============================================================================
 * CUET RESULTS — verified LPT CUET 2025 result list (from the LPT CUET results
 * board). Real, named, attributable percentiles only.
 * =============================================================================
 */
export interface CuetTopper {
  name: string;
  /** e.g. "100%ile" / "99.99%ile". */
  percentile: string;
  subject: string;
  school?: string;
}

export const CUET_TOPPERS: CuetTopper[] = [
  { name: "Shivansh Srivastava", percentile: "100%ile", subject: "GAT", school: "CMS Rajendra Nagar" },
  { name: "Ananya Srivastava", percentile: "100%ile", subject: "Economics", school: "Seth M.R. Jaipuria, Gomti Nagar" },
  { name: "Ananya Shukla", percentile: "99.99%ile", subject: "Pol. Science", school: "Maharishi Vidya Mandir" },
  { name: "Saamarth Dwivedi", percentile: "99.9%ile", subject: "Economics", school: "CMS GN1" },
  { name: "Anshuman Pande", percentile: "99.96%ile", subject: "English", school: "CMS LDA" },
  { name: "Andrie Tiwari", percentile: "99.96%ile", subject: "Pol. Science", school: "DPS Eldeco" },
  { name: "Alankrit Agarwal", percentile: "99.96%ile", subject: "Economics", school: "CMS Rajendra Nagar" },
  { name: "Manyata Chaturvedi", percentile: "99.5%ile", subject: "History", school: "CMS GN2" },
  { name: "Abhijaat Singh", percentile: "99.4%ile", subject: "History", school: "Brightland School" },
  { name: "Aryan Shukla", percentile: "99.3%ile", subject: "English", school: "CMS Gomti Nagar 2" },
];
