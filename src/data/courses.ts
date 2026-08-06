/* =============================================================================
 * COURSES DATASET — verified batch lineup & fees.
 * Source: LPT GTB Nagar (Delhi) course pages on lptedtech.com (fetched 28 Jun
 * 2026). All fees are OFFLINE, GTB Nagar Delhi centre, and EXCLUSIVE of GST.
 * Update each cycle / when batches or fees change.
 * =============================================================================
 */

export interface CourseBatch {
  name: string;
  /** Who the batch is for (class / dropper), when relevant. */
  forWhom?: string;
  mode: string;
  /** Validity / classroom hours. */
  duration: string;
  /** Discounted (payable) price, excl. GST — e.g. "₹25,000". */
  price: string;
  /** Struck-through original price, excl. GST. */
  originalPrice?: string;
  discount?: string;
}

/** Fees exclude GST. Offline, GTB Nagar (Delhi). */
export const CUET_BATCHES: CourseBatch[] = [
  {
    name: "CUET 2026 Crash Course",
    mode: "Offline",
    duration: "200+ hrs",
    price: "₹25,000",
    originalPrice: "₹50,000",
    discount: "50% OFF",
  },
  {
    name: "CUET 2027 Batch",
    mode: "Offline",
    duration: "365 days · 350+ hrs",
    price: "₹55,000",
    originalPrice: "₹1,00,000",
    discount: "45% OFF",
  },
  {
    name: "CUET 2028 Batch",
    mode: "Offline",
    duration: "720 days · 550+ hrs",
    price: "₹90,000",
    originalPrice: "₹1,25,000",
    discount: "28% OFF",
  },
];

/** Lowest payable CUET fee (for "from ₹…" schema/labels), digits only. */
export const CUET_FROM_PRICE = "25000";

export const IPMAT_BATCHES: CourseBatch[] = [
  {
    name: "IPMAT Foundation Batch",
    forWhom: "Class 11",
    mode: "Offline",
    duration: "600+ hrs · till Jun 2028",
    price: "₹1,40,000",
    originalPrice: "₹2,00,000",
    discount: "30% OFF",
  },
  {
    name: "IPMAT Target Batch",
    forWhom: "Class 12",
    mode: "Offline",
    duration: "250+ hrs · till Jun 2027",
    price: "₹80,000",
    originalPrice: "₹1,50,000",
    discount: "47% OFF",
  },
  {
    name: "IPMAT Finisher Batch",
    forWhom: "Droppers / repeaters",
    mode: "Offline",
    duration: "300+ hrs · till Jun 2027",
    price: "₹80,000",
    originalPrice: "₹1,50,000",
    discount: "47% OFF",
  },
];

/** Lowest payable IPMAT fee (for "from ₹…" schema/labels), digits only. */
export const IPMAT_FROM_PRICE = "80000";

/* --------------------------------------------------------------------------
 * CUET online / self-paced / hybrid batches (lptedtech.com/cuet-online-coaching).
 * Fees are confirmed on counselling; discount + duration are published.
 * ------------------------------------------------------------------------ */
export interface OnlineBatch {
  name: string;
  mode: string;
  duration: string;
  discount: string;
}

export const CUET_ONLINE_BATCHES: OnlineBatch[] = [
  { name: "CUET Recorded Course 2026", mode: "Self-paced", duration: "365 days · 170+ hrs", discount: "50% OFF" },
  { name: "CUET 2026 Hybrid (Live + Recorded)", mode: "Hybrid", duration: "365 days · 320+ hrs", discount: "50% OFF" },
  { name: "CUET Recorded + Live GK Classes", mode: "Recorded + Live", duration: "365 days · 215+ hrs", discount: "53% OFF" },
  { name: "CUET 2026 Crash Course Online", mode: "Live", duration: "45 days · 200+ hrs", discount: "25% OFF" },
  { name: "CUET 2027 Online Course", mode: "Online", duration: "365 days · 350+ hrs", discount: "43% OFF" },
  { name: "CUET 2028 Online Course", mode: "Online", duration: "720 days · 550+ hrs", discount: "42% OFF" },
];

/* --------------------------------------------------------------------------
 * IPMAT online batches & fees (lptedtech.com/ipmat-online-coaching).
 * Year-wise online fees are published & verified; excl. GST.
 * ------------------------------------------------------------------------ */
export const IPMAT_ONLINE_BATCHES: CourseBatch[] = [
  {
    name: "IPMAT 2026 Online",
    forWhom: "Class 12 / droppers",
    mode: "Online",
    duration: "Live + recorded",
    price: "₹12,000",
  },
  {
    name: "IPMAT 2027 Target Online",
    forWhom: "Class 12 appearing",
    mode: "Online",
    duration: "500+ hrs",
    price: "₹59,999",
  },
  {
    name: "IPMAT 2028 Foundation Online",
    forWhom: "Class 11",
    mode: "Online",
    duration: "1000+ hrs",
    price: "₹99,999",
  },
  {
    name: "IPMAT Personal Interview Prep",
    forWhom: "PI / WAT",
    mode: "Online",
    duration: "90 days",
    price: "₹699",
    originalPrice: "₹5,000",
    discount: "86% OFF",
  },
];

/** Why students choose LPT's online IPMAT coaching (lptedtech.com). */
export const IPMAT_ONLINE_FEATURES: { title: string; desc: string }[] = [
  { title: "Mentorship by IIM Alumni", desc: "Personal guidance from IIM graduates who know the IPMAT journey inside-out and help shape your strategy." },
  { title: "Live Interactive Classes", desc: "Engaging live sessions that simplify tough concepts and keep your daily learning on track." },
  { title: "1:1 Personal Mentorship", desc: "You're not just a name on a list — get one-to-one support and advice tailored to your prep." },
  { title: "Live + Recorded Classes", desc: "Missed a class? Catch up anytime with recorded sessions, so prep never stalls." },
  { title: "Regular Mocks & Analysis", desc: "Full-length mocks that mirror the real exam, with deep performance analysis to track improvement." },
  { title: "Quick Doubt Resolution", desc: "Stuck on a topic? Fast doubt-clearing support keeps your preparation smooth and stress-free." },
];

/* CUET study material & mock-test packages (lptedtech.com/cuet-online-coaching). */
export interface MockPackage {
  name: string;
  tests: string;
  desc: string;
}

export const CUET_MOCK_PACKAGES: MockPackage[] = [
  { name: "CUET Mock Tests — Ultimate", tests: "50 full-length tests", desc: "The most extensive practice — full-length mocks across every subject and the General Test." },
  { name: "CUET Mock Tests — Essential", tests: "20 full-length tests", desc: "Perfect for students aiming for a strong, balanced score with focused exam practice." },
  { name: "CUET Mock Tests — Basic", tests: "10 full-length tests", desc: "An ideal starter test series to benchmark your preparation and build exam temperament." },
  { name: "CUET Success Kit", tests: "Printed books + study material", desc: "Printed concept and practice books with curated study material for end-to-end CUET prep." },
];

/* --------------------------------------------------------------------------
 * Brand legacy figures (lptedtech.com — "Numbers That Define Our Legacy").
 * LPT group-wide, verified on the official site.
 * ------------------------------------------------------------------------ */
export const LEGACY_STATS = [
  { value: "100+", label: "IIM calls this year" },
  { value: "150K+", label: "Students mentored" },
  { value: "10 Yr+", label: "Avg teacher experience" },
  { value: "24+", label: "Years of expertise" },
];
