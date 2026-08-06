/* =============================================================================
 * CENTRAL SITE CONFIG — single source of truth (SOP §0 GLOBAL TOKENS)
 * Law Prep Tutorial Delhi-NCR · lptdelhincr.com · CUET + IPMAT ONLY (no CAT).
 *
 * NAP RULE (SOP §0): the exact business name, phone, and address string must
 * appear byte-identically everywhere (site, centre pages, footer, GBP, socials).
 * Drive every component/route from this file — never hardcode these elsewhere.
 *
 * ✅  VERIFIED (28 Jun 2026, from the official LPTdelhincr content sheet + LPT
 *     IPMAT results): PHONE, WHATSAPP, EMAIL, HEAD_OFFICE, GST, FOUNDED_YEAR,
 *     REAL_RESULTS, SOCIAL.youtube, SOCIAL.instagram, and every centre's phone,
 *     exact geo pin and Google Maps link.
 *
 * ⚠️  STILL NEEDS-REAL-DATA — anything wrapped in "{{...}}" is unset:
 *       - SOCIAL.linkedin      ({{SOCIAL_LINKEDIN}})  LinkedIn page URL
 *       - SOCIAL.x             ({{SOCIAL_X}})         X/Twitter profile URL
 *     (Course fees/modes/dates and faculty bios are tracked in src/data/*.)
 * =============================================================================
 */

/** Marks a value that is a placeholder and must be replaced with verified data. */
export const NEEDS_REAL_DATA = "{{NEEDS-REAL-DATA}}" as const;

export interface GeoPoint {
  lat: number;
  lng: number;
  /** true = approximate from SOP E3; replace with exact GBP pin before publishing. */
  approximate: boolean;
}

export interface Centre {
  slug: string;
  /** Display name of the centre area, e.g. "Noida". */
  area: string;
  /** Full schema/NAP name: "Law Prep Tutorial Delhi-NCR — {area}". */
  name: string;
  /** Exact street address (SOP E1) — byte-identical everywhere. */
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: "IN";
  /** Single-line full address string for footer/NAP display. */
  fullAddress: string;
  landmark: string;
  /** Localities this centre serves (SOP E3 areaServed). */
  areaServed: string[];
  geo: GeoPoint;
  /** Per-centre phone (best for GBP). Placeholder until supplied. */
  phone: string;
  /** Google Maps directions link. Placeholder until supplied. */
  mapsUrl: string;
  openingHours: string;
}

export interface NavItem {
  label: string;
  href: string;
  /**
   * true = the target route is NOT built yet (Phase 2). Such links must NOT be
   * rendered as clickable <a> (no dead 404 links in shipped HTML). Nav/Footer
   * render them as muted, non-clickable text. Flip to false / remove when the
   * route ships.
   */
  comingSoon?: boolean;
}

export interface LinkCluster {
  title: string;
  links: NavItem[];
}

/* --------------------------------------------------------------------------
 * §0 GLOBAL TOKENS
 * ------------------------------------------------------------------------ */
export const BRAND = "Law Prep Tutorial Delhi-NCR" as const;
export const BRAND_SHORT = "LPT Delhi-NCR" as const;
export const DOMAIN = "https://lptdelhincr.com" as const; // canonical host (non-www)
/** Content last-updated date (ISO) — the genuine authoring date, used for
 *  Article/Dataset `dateModified` and "Last updated" labels. Bump on edits. */
export const LAST_UPDATED = "2026-06-28" as const;
export const LAST_UPDATED_DISPLAY = "28 Jun 2026" as const;

/** Main NAP-consistent number (verified — official content sheet). */
export const PHONE = "+91 87505 81505";
/** WhatsApp deep-link base (verified). */
export const WHATSAPP = "https://wa.me/918750581505";
/** Official email (verified — official content sheet). */
export const EMAIL = "lptdelhincr@gmail.com";
/** Registered office (= Hauz Khas centre; NAP-consistent). */
export const HEAD_OFFICE =
  "Second Floor, 14, Kaushalya Park, Block R, Kharera, Hauz Khas, New Delhi, Delhi 110016";
/** GST / registration no. (verified). */
export const GST = "07AAECO5833E1ZJ";
/** Founding year (verified). */
export const FOUNDED_YEAR = "2022";
/** Verified selections only, no inflation (source: LPT IPMAT results, 2024–25). */
export const REAL_RESULTS =
  "140+ IIM selections in 2 years — incl. AIR 9, 22 & 24 at IIM Indore";

export const SOCIAL = {
  youtube: "https://www.youtube.com/@LPTdelhi_ncr",
  instagram: "https://www.instagram.com/lptdelhi_ncr",
  /** ⚠️ NEEDS-REAL-DATA — LinkedIn page URL not yet supplied. */ linkedin: "{{SOCIAL_LINKEDIN}}",
  /** ⚠️ NEEDS-REAL-DATA — X/Twitter profile URL not yet supplied. */ x: "{{SOCIAL_X}}",
} as const;

/** Verticals — CUET + IPMAT ONLY. No CAT/MBA/XAT/NMAT/SNAP anywhere. */
export const VERTICALS = ["CUET", "IPMAT"] as const;
export type Vertical = (typeof VERTICALS)[number];

/* --------------------------------------------------------------------------
 * CENTRES (SOP Appendix E1 — exact NAP; E3 — geo + areaServed)
 * geo values are APPROXIMATE (flagged) — set exact pin from each GBP.
 * ------------------------------------------------------------------------ */
export const CENTRES: Centre[] = [
  {
    slug: "noida",
    area: "Noida",
    name: `${BRAND} — Noida`,
    streetAddress: "Ground Floor, Sandesh Tower, C-56/31, C Block, Phase 2, Sector 62",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201309",
    addressCountry: "IN",
    fullAddress:
      "Ground Floor, Sandesh Tower, C-56/31, C Block, Phase 2, Sector 62, Noida, Uttar Pradesh 201309",
    landmark: "Sector 62; Sandesh Tower",
    areaServed: ["Noida", "Greater Noida", "Sector 62", "Indirapuram", "Ghaziabad"],
    geo: { lat: 28.6149708, lng: 77.3663164, approximate: false },
    phone: "+91 92175 77449",
    mapsUrl: "https://maps.app.goo.gl/nGdvJLghanMMdttx7",
    openingHours: "Mo-Su 09:00-19:00",
  },
  {
    slug: "hauz-khas",
    area: "Hauz Khas",
    name: `${BRAND} — Hauz Khas`,
    streetAddress: "Second Floor, 14, Kaushalya Park, Block R, Kharera, Hauz Khas",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110016",
    addressCountry: "IN",
    fullAddress:
      "Second Floor, 14, Kaushalya Park, Block R, Kharera, Hauz Khas, New Delhi, Delhi 110016",
    landmark: "Near Vadilal Hangout; Hauz Khas",
    areaServed: ["Hauz Khas", "South Delhi", "Green Park", "Malviya Nagar", "SDA"],
    geo: { lat: 28.5501264, lng: 77.2053068, approximate: false },
    phone: "+91 92175 77446",
    mapsUrl: "https://share.google/Wt1kovGjs7ymj3h0H",
    openingHours: "Mo-Su 09:00-19:00",
  },
  {
    slug: "gtb-nagar",
    area: "GTB Nagar",
    name: `${BRAND} — GTB Nagar`,
    streetAddress: "73-75, Ring Road, Mall Road, GTB Nagar",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110033",
    addressCountry: "IN",
    fullAddress: "73-75, Ring Road, Mall Road, GTB Nagar, New Delhi, Delhi 110033",
    landmark: "Metro Gate No. 1, above Bank of Baroda",
    areaServed: ["GTB Nagar", "North Campus", "Kingsway Camp", "Model Town", "Mukherjee Nagar"],
    geo: { lat: 28.6985817, lng: 77.2062094, approximate: false },
    phone: "+91 92175 77445",
    mapsUrl: "https://share.google/ayfCXtfs4Rczir9B8",
    openingHours: "Mo-Su 09:00-19:00",
  },
  {
    slug: "gurugram",
    area: "Gurugram",
    name: `${BRAND} — Gurugram`,
    streetAddress: "Second Floor, M-35, Block M, Old DLF Colony, Sector 14",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122007",
    addressCountry: "IN",
    fullAddress: "Second Floor, M-35, Block M, Old DLF Colony, Sector 14, Gurugram, Haryana 122007",
    landmark: "Above HDFC Bank; Sector 14",
    areaServed: ["Gurugram", "Sector 14", "Old DLF Colony", "DLF Phase 1-3", "Sushant Lok"],
    geo: { lat: 28.4700664, lng: 77.0444957, approximate: false },
    phone: "+91 92175 77448",
    mapsUrl: "https://share.google/nLXEGLKYv82KSLcJK",
    openingHours: "Mo-Su 09:00-19:00",
  },
];

export const getCentre = (slug: string): Centre | undefined =>
  CENTRES.find((c) => c.slug === slug);

/* --------------------------------------------------------------------------
 * NAVIGATION (CUET, IPMAT, Resources, Centres only)
 * ------------------------------------------------------------------------ */
export const NAV: NavItem[] = [
  { label: "CUET", href: "/cuet" },
  { label: "IPMAT", href: "/ipmat" },
  { label: "Resources", href: "/resources" },
  { label: "Centres", href: "/centres" },
];

/* --------------------------------------------------------------------------
 * FOOTER link clusters (CUET / IPMAT only) — centres NAP rendered from CENTRES.
 * ------------------------------------------------------------------------ */
export const FOOTER_CLUSTERS: LinkCluster[] = [
  {
    title: "CUET",
    links: [
      { label: "CUET Guide", href: "/cuet" },
      { label: "CUET Coaching", href: "/courses/cuet" },
      { label: "CUET Cutoffs", href: "/cuet/cutoff" },
      { label: "CUET College Predictor", href: "/cuet/results/college-predictor" },
      { label: "CUET Syllabus", href: "/cuet/syllabus" },
      { label: "CUET Colleges", href: "/cuet/colleges" },
    ],
  },
  {
    title: "IPMAT",
    links: [
      { label: "IPMAT Guide", href: "/ipmat" },
      { label: "IPMAT Coaching", href: "/courses/ipmat" },
      { label: "IPMAT Marking Scheme", href: "/ipmat/marking-scheme" },
      { label: "IPMAT Cutoffs", href: "/ipmat/cutoff" },
      { label: "IPMAT Syllabus", href: "/ipmat/syllabus" },
      { label: "IPMAT Colleges", href: "/ipmat/colleges" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Our Centres", href: "/centres" },
      { label: "Results", href: "/results" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const LEGAL_LINKS: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/* ==========================================================================
 * SITE_TREE — single source of truth for nav, mega-menu, sidebars, related
 * links, footer and the /sitemap page. EVERY href below is a real, prerendered
 * page (virtual parent paths are represented by their concrete children).
 * ======================================================================== */
export interface TreeLink {
  label: string;
  href: string;
  desc?: string;
}
export interface TreeCluster {
  vertical: Vertical;
  cluster: string;
  /** lucide icon name (resolved in the UI). */
  icon: string;
  entries: TreeLink[];
}
export interface SiteTreeEntry extends TreeLink {
  vertical: Vertical;
  cluster: string;
}

export const SITE_TREE_CLUSTERS: TreeCluster[] = [
  // ---------------- CUET ----------------
  {
    vertical: "CUET",
    cluster: "Cutoffs",
    icon: "TrendingUp",
    entries: [
      { label: "CUET Cutoffs", href: "/cuet/cutoff", desc: "By college, course, category & round" },
      { label: "How cutoffs work", href: "/cuet/cutoff/how-cutoffs-work", desc: "Why they move each year" },
      { label: "Cutoff dataset (CSV)", href: "/cuet/cutoff/dataset", desc: "Downloadable, sourced data" },
    ],
  },
  {
    vertical: "CUET",
    cluster: "Results & Predictor",
    icon: "BarChart3",
    entries: [
      { label: "Results hub", href: "/cuet/results", desc: "Scores, percentile & tools" },
      { label: "College predictor", href: "/cuet/results/college-predictor", desc: "Estimate your shortlist" },
      { label: "Score calculator", href: "/cuet/results/score-calculator", desc: "Marks → percentile band" },
      { label: "Marks vs percentile", href: "/cuet/results/marks-vs-percentile", desc: "How the mapping works" },
      { label: "Normalisation", href: "/cuet/results/normalization", desc: "Why scores are normalised" },
      { label: "Reading your scorecard", href: "/cuet/results/scorecard", desc: "What each field means" },
    ],
  },
  {
    vertical: "CUET",
    cluster: "Colleges",
    icon: "GraduationCap",
    entries: [{ label: "CUET Colleges", href: "/cuet/colleges", desc: "Who admits via CUET" }],
  },
  {
    vertical: "CUET",
    cluster: "Admission (CSAS)",
    icon: "ClipboardList",
    entries: [
      { label: "Admission (CSAS)", href: "/cuet/admission", desc: "Step-by-step process" },
      { label: "Freeze vs upgrade", href: "/cuet/admission/freeze-vs-upgrade", desc: "Which to choose" },
      { label: "Spot round", href: "/cuet/admission/spot-round", desc: "The final allotment stage" },
    ],
  },
  {
    vertical: "CUET",
    cluster: "Syllabus & Prep",
    icon: "BookOpen",
    entries: [
      { label: "CUET Syllabus", href: "/cuet/syllabus", desc: "Subjects, units & weightage" },
      { label: "3-month study plan", href: "/cuet/study-plan/3-month", desc: "Sprint timeline" },
      { label: "6-month study plan", href: "/cuet/study-plan/6-month", desc: "Balanced timeline" },
      { label: "1-year study plan", href: "/cuet/study-plan/1-year", desc: "Long-runway timeline" },
    ],
  },
  {
    vertical: "CUET",
    cluster: "Exam Info",
    icon: "FileText",
    entries: [
      { label: "Exam pattern", href: "/cuet/exam-pattern", desc: "Format & components" },
      { label: "Marking scheme", href: "/cuet/marking", desc: "Marks & negative marking" },
      { label: "Eligibility", href: "/cuet/eligibility", desc: "Who can apply" },
      { label: "Subject rules", href: "/cuet/subject-rules", desc: "Mapping subjects to courses" },
      { label: "Languages", href: "/cuet/languages", desc: "Language section explained" },
    ],
  },
  {
    vertical: "CUET",
    cluster: "Exam Day (NTA)",
    icon: "MapPin",
    entries: [
      { label: "Exam centres (NTA)", href: "/cuet/exam-centers", desc: "NTA exam cities" },
      { label: "Admit card", href: "/cuet/admit-card", desc: "Download & checks" },
      { label: "City slip", href: "/cuet/city-slip", desc: "Advance city intimation" },
      { label: "Exam-day checklist", href: "/cuet/exam-day", desc: "What to carry & do" },
    ],
  },
  {
    vertical: "CUET",
    cluster: "About CUET",
    icon: "Info",
    entries: [
      { label: "Is CUET hard?", href: "/cuet/is-cuet-hard", desc: "An honest take" },
      { label: "Without coaching?", href: "/cuet/without-coaching", desc: "Self-study, done right" },
      { label: "Parents' guide", href: "/cuet/parents-guide", desc: "How to support" },
      { label: "Toppers", href: "/cuet/toppers", desc: "Verified results only" },
      { label: "Experience FAQ", href: "/cuet/faq", desc: "Common doubts answered" },
      { label: "History", href: "/cuet/history", desc: "Why CUET exists" },
      { label: "Policy", href: "/cuet/policy", desc: "Who decides what" },
      { label: "Changes", href: "/cuet/changes", desc: "Dated, verified updates" },
    ],
  },
  {
    vertical: "CUET",
    cluster: "Compare",
    icon: "GitCompare",
    entries: [
      { label: "Compare hub", href: "/cuet/compare", desc: "Which exam suits you" },
      { label: "CUET vs IPMAT", href: "/cuet/compare/cuet-vs-ipmat", desc: "Cross-vertical choice" },
      { label: "CUET vs CLAT", href: "/cuet/compare/cuet-vs-clat", desc: "UG vs law route" },
      { label: "Selector quiz", href: "/cuet/compare/quiz", desc: "30-second direction" },
    ],
  },
  {
    vertical: "CUET",
    cluster: "Coaching",
    icon: "Building2",
    entries: [
      { label: "CUET Coaching", href: "/courses/cuet", desc: "Batches, fees & modes" },
      { label: "Coaching in Noida", href: "/cuet/coaching-in-noida", desc: "Sector 62" },
      { label: "Coaching in Hauz Khas", href: "/cuet/coaching-in-hauz-khas", desc: "South Delhi" },
      { label: "Coaching in GTB Nagar", href: "/cuet/coaching-in-gtb-nagar", desc: "North Campus" },
      { label: "Coaching in Gurugram", href: "/cuet/coaching-in-gurugram", desc: "Sector 14" },
      { label: "Coaching in Delhi-NCR", href: "/cuet/coaching-in-delhi-ncr", desc: "All centres" },
    ],
  },
  // ---------------- IPMAT ----------------
  {
    vertical: "IPMAT",
    cluster: "Exam & Marking",
    icon: "Calculator",
    entries: [
      { label: "Exam pattern", href: "/ipmat/exam", desc: "Indore, Rohtak & JIPMAT" },
      { label: "Marking scheme", href: "/ipmat/marking-scheme", desc: "Negative marking & the math" },
      { label: "Sectional lock", href: "/ipmat/sectional-lock", desc: "40-min per-section timing" },
    ],
  },
  {
    vertical: "IPMAT",
    cluster: "Cutoffs & Selection",
    icon: "TrendingUp",
    entries: [
      { label: "Cutoffs & composite", href: "/ipmat/cutoff", desc: "Sectional + composite score" },
      { label: "Composite — Indore", href: "/ipmat/composite-score/indore", desc: "How Indore scores" },
      { label: "Composite — Rohtak", href: "/ipmat/composite-score/rohtak", desc: "How Rohtak scores" },
      { label: "Composite — JIPMAT", href: "/ipmat/composite-score/jipmat", desc: "Jammu & Bodh Gaya" },
      { label: "Safe score", href: "/ipmat/safe-score", desc: "Estimated buffer band" },
    ],
  },
  {
    vertical: "IPMAT",
    cluster: "Eligibility & Admission",
    icon: "ClipboardList",
    entries: [
      { label: "Eligibility", href: "/ipmat/eligibility", desc: "Marks & age criteria" },
      { label: "Application process", href: "/ipmat/application-process", desc: "Apply step-by-step" },
      { label: "Important dates", href: "/ipmat/important-dates", desc: "Registration & exam windows" },
      { label: "Admission — Indore", href: "/ipmat/admission/indore", desc: "IIM Indore steps" },
      { label: "Admission — Rohtak", href: "/ipmat/admission/rohtak", desc: "IIM Rohtak steps" },
      { label: "Admission — JIPMAT", href: "/ipmat/admission/jipmat", desc: "Jammu & Bodh Gaya" },
    ],
  },
  {
    vertical: "IPMAT",
    cluster: "Colleges & Programme",
    icon: "GraduationCap",
    entries: [
      { label: "IPM Colleges", href: "/ipmat/colleges", desc: "Institutes & profiles" },
      { label: "Programme structure", href: "/ipmat/programme/structure", desc: "The 3+2 explained" },
      { label: "ROI — is it worth it", href: "/ipmat/roi", desc: "Fees vs outcomes" },
    ],
  },
  {
    vertical: "IPMAT",
    cluster: "Syllabus & Prep",
    icon: "BookOpen",
    entries: [
      { label: "IPMAT Syllabus", href: "/ipmat/syllabus", desc: "QA, Verbal & LR" },
      { label: "QA syllabus", href: "/ipmat/syllabus/quantitative-aptitude", desc: "Quant topic areas" },
      { label: "Verbal syllabus", href: "/ipmat/syllabus/verbal-ability", desc: "Verbal topic areas" },
      { label: "LR syllabus", href: "/ipmat/syllabus/logical-reasoning", desc: "Logical Reasoning topics" },
      { label: "QA strategy", href: "/ipmat/section-strategy/quantitative-aptitude", desc: "Quant test-day plan" },
      { label: "Verbal strategy", href: "/ipmat/section-strategy/verbal-ability", desc: "Verbal test-day plan" },
      { label: "LR strategy", href: "/ipmat/section-strategy/logical-reasoning", desc: "LR test-day plan" },
      { label: "3-month plan", href: "/ipmat/preparation/3-month", desc: "Sprint timeline" },
      { label: "6-month plan", href: "/ipmat/preparation/6-month", desc: "Balanced timeline" },
      { label: "1-year plan", href: "/ipmat/preparation/1-year", desc: "Long-runway timeline" },
      { label: "Books & mocks", href: "/ipmat/books-mocks", desc: "What to use" },
    ],
  },
  {
    vertical: "IPMAT",
    cluster: "PI / WAT",
    icon: "MessagesSquare",
    entries: [
      { label: "Interview — Indore", href: "/ipmat/interview/indore", desc: "IIM Indore PI" },
      { label: "Interview — Rohtak", href: "/ipmat/interview/rohtak", desc: "IIM Rohtak PI" },
      { label: "Interview — JIPMAT", href: "/ipmat/interview/jipmat", desc: "Jammu & Bodh Gaya PI" },
      { label: "WAT", href: "/ipmat/wat", desc: "Written Ability Test" },
      { label: "Profile building", href: "/ipmat/profile-building", desc: "Genuine, defensible depth" },
    ],
  },
  {
    vertical: "IPMAT",
    cluster: "City & Experience",
    icon: "Info",
    entries: [
      { label: "IPM in Indore", href: "/ipmat/city/indore", desc: "City & campus" },
      { label: "IPM in Rohtak", href: "/ipmat/city/rohtak", desc: "City & campus" },
      { label: "Campus life", href: "/ipmat/campus-life", desc: "An honest look" },
      { label: "Self-study vs coaching", href: "/ipmat/self-study-vs-coaching", desc: "Which fits you" },
      { label: "Parents' guide", href: "/ipmat/parents-guide", desc: "Guiding a big decision" },
      { label: "Wellbeing", href: "/ipmat/wellbeing", desc: "Manage prep stress" },
      { label: "Experience FAQ", href: "/ipmat/faq", desc: "Common doubts answered" },
    ],
  },
  {
    vertical: "IPMAT",
    cluster: "Compare",
    icon: "GitCompare",
    entries: [
      { label: "IPM vs BBA", href: "/ipmat/compare/ipm-vs-bba", desc: "Integrated vs bachelor's" },
      { label: "Indore vs Rohtak", href: "/ipmat/compare/indore-vs-rohtak", desc: "Which IIM fits" },
      { label: "Is it worth it?", href: "/ipmat/worth-it", desc: "Honest trade-offs" },
    ],
  },
  {
    vertical: "IPMAT",
    cluster: "Coaching",
    icon: "Building2",
    entries: [
      { label: "IPMAT Coaching", href: "/courses/ipmat", desc: "Batches, fees & modes" },
      { label: "Coaching in Noida", href: "/ipmat/coaching-in-noida", desc: "Sector 62" },
      { label: "Coaching in Hauz Khas", href: "/ipmat/coaching-in-hauz-khas", desc: "South Delhi" },
      { label: "Coaching in GTB Nagar", href: "/ipmat/coaching-in-gtb-nagar", desc: "North Campus" },
      { label: "Coaching in Gurugram", href: "/ipmat/coaching-in-gurugram", desc: "Sector 14" },
      { label: "Coaching in Delhi-NCR", href: "/ipmat/coaching-in-delhi-ncr", desc: "All centres" },
    ],
  },
];

/** Flat list of every page in the tree. */
export const SITE_TREE: SiteTreeEntry[] = SITE_TREE_CLUSTERS.flatMap((c) =>
  c.entries.map((e) => ({ ...e, vertical: c.vertical, cluster: c.cluster })),
);

/** All clusters for a vertical, in order. */
export const getVerticalTree = (v: Vertical): TreeCluster[] =>
  SITE_TREE_CLUSTERS.filter((c) => c.vertical === v);

/** The tree entry for an exact href (or undefined). */
export const getTreeEntry = (href: string): SiteTreeEntry | undefined =>
  SITE_TREE.find((e) => e.href === href);

/** The cluster that contains an href (or undefined). */
export const getCluster = (href: string): TreeCluster | undefined =>
  SITE_TREE_CLUSTERS.find((c) => c.entries.some((e) => e.href === href));

/** Sibling pages in the same cluster as href (includes href itself). */
export const getSiblings = (href: string): TreeLink[] => getCluster(href)?.entries ?? [];

/* Mega-menu columns (curated layout; labels/descs resolved from SITE_TREE).
 * 5 columns per vertical = the top clusters students actually navigate. */
export interface MegaColumn {
  heading: string;
  icon: string;
  hrefs: string[];
}
export const MEGA: Record<Vertical, MegaColumn[]> = {
  CUET: [
    { heading: "Cutoffs & Predictor", icon: "TrendingUp", hrefs: ["/cuet/cutoff", "/cuet/cutoff/dataset", "/cuet/results/college-predictor", "/cuet/results/marks-vs-percentile", "/cuet/results"] },
    { heading: "Colleges & Admission", icon: "GraduationCap", hrefs: ["/cuet/colleges", "/cuet/admission", "/cuet/admission/freeze-vs-upgrade", "/cuet/admission/spot-round"] },
    { heading: "Syllabus & Prep", icon: "BookOpen", hrefs: ["/cuet/syllabus", "/cuet/study-plan/6-month", "/cuet/exam-pattern", "/cuet/marking"] },
    { heading: "Exam Info & Day", icon: "FileText", hrefs: ["/cuet/eligibility", "/cuet/subject-rules", "/cuet/exam-centers", "/cuet/admit-card", "/cuet/exam-day"] },
    { heading: "Coaching & More", icon: "Building2", hrefs: ["/courses/cuet", "/cuet/coaching-in-noida", "/cuet/compare/cuet-vs-ipmat", "/cuet/faq"] },
  ],
  IPMAT: [
    { heading: "Exam & Marking", icon: "Calculator", hrefs: ["/ipmat/exam", "/ipmat/marking-scheme", "/ipmat/sectional-lock"] },
    { heading: "Cutoffs & Selection", icon: "TrendingUp", hrefs: ["/ipmat/cutoff", "/ipmat/composite-score/indore", "/ipmat/safe-score"] },
    { heading: "Colleges & Admission", icon: "GraduationCap", hrefs: ["/ipmat/colleges", "/ipmat/programme/structure", "/ipmat/eligibility", "/ipmat/admission/indore", "/ipmat/important-dates"] },
    { heading: "Syllabus & PI/WAT", icon: "BookOpen", hrefs: ["/ipmat/syllabus", "/ipmat/preparation/6-month", "/ipmat/interview/indore", "/ipmat/wat"] },
    { heading: "Coaching & More", icon: "Building2", hrefs: ["/courses/ipmat", "/ipmat/coaching-in-noida", "/ipmat/compare/ipm-vs-bba", "/ipmat/faq"] },
  ],
};

export const HUB_HREF: Record<Vertical, string> = { CUET: "/cuet", IPMAT: "/ipmat" };

/* --------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------ */
/** Absolute, self-referencing canonical URL for a path (SOP A1.2). */
export const canonical = (path: string): string => {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${DOMAIN}${clean.startsWith("/") || clean === "" ? clean : `/${clean}`}` || DOMAIN;
};

/**
 * WhatsApp deep link with a prefilled message. Degrades to "#" when WHATSAPP is
 * still an unset placeholder, so a "{{...}}" token is NEVER rendered as an href.
 */
export const whatsappLink = (message?: string): string => {
  if (WHATSAPP.startsWith("{{")) return "#";
  if (!message) return WHATSAPP;
  const sep = WHATSAPP.includes("?") ? "&" : "?";
  return `${WHATSAPP}${sep}text=${encodeURIComponent(message)}`;
};

/** tel: link from PHONE; returns "#" if unset so we never render a fake number. */
export const telLink = (phone: string = PHONE): string =>
  phone.startsWith("{{") ? "#" : `tel:${phone.replace(/\s/g, "")}`;

/** True when a value is still an unset placeholder token. */
export const isPlaceholder = (v: string): boolean => v.startsWith("{{");
