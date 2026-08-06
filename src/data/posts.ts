/* =============================================================================
 * BLOG / NEWS POSTS (SOP H8 freshness; NewsArticle/Article)
 * Powers /blog, /blog/[slug] and /cuet/news/[slug].
 *
 * Blog posts here are GENUINE evergreen explainers (illustrative:false) → they
 * emit. News posts are perishable and dated; none are seeded (a real, sourced,
 * dated NewsArticle must be added to emit /[exam]/news/[slug]). Never fabricate
 * stats — these posts contain only process/strategy explanation.
 * =============================================================================
 */

// Relative import (not "@/") so this module stays bundler-safe when pulled in
// by vite.config via src/lib/programmatic at config time.
import { LAST_UPDATED, LAST_UPDATED_DISPLAY } from "../config/site";
import type { Vertical } from "../config/site";

export interface PostSection {
  heading: string;
  body: string[];
}

export interface Post {
  slug: string;
  title: string;
  /** Short SEO <title> (≤44 chars so " | LPT Delhi-NCR" keeps it ≤60). */
  seoTitle: string;
  vertical: Vertical | "General";
  type: "blog" | "news";
  /** ISO date (genuine authoring/publish date). */
  date: string;
  dateDisplay: string;
  /** Plain-text excerpt (≤155 friendly). */
  excerpt: string;
  /** 40–60 word answer-shaped intro. */
  intro: string;
  sections: PostSection[];
  /** For NewsArticle: the official source the news is based on. */
  source?: string;
  illustrative: boolean;
}

export const posts: Post[] = [
  {
    slug: "how-cuet-cutoffs-work",
    title: "How CUET Cutoffs Actually Work (CSAS, Categories, Rounds)",
    seoTitle: "How CUET Cutoffs Work (CSAS)",
    vertical: "CUET",
    type: "blog",
    date: LAST_UPDATED,
    dateDisplay: LAST_UPDATED_DISPLAY,
    excerpt:
      "CUET cutoffs are released by universities (not NTA) via CSAS, set per college, course, category and round — and they move every year. Here's how.",
    intro:
      "CUET cutoffs are the minimum scores at which a college–course closed for a category in a given round. Universities release them through their own process (for DU, CSAS) — not the NTA — and because they depend on demand, seats and applicant scores, they emerge after the exam and shift every cycle.",
    sections: [
      {
        heading: "NTA scores, universities set cutoffs",
        body: [
          "The most common misconception is that NTA publishes CUET cutoffs. It does not. NTA conducts the exam and releases normalised scores and percentiles; each university then runs admission and releases its own cutoffs.",
          "For Delhi University this happens through CSAS, where you rank college–course preferences and receive allotments across rounds.",
        ],
      },
      {
        heading: "Why cutoffs move across rounds",
        body: [
          "Cutoffs are an outcome, not an input: the last admitted candidate's score in a category becomes that round's closing cutoff. As top scorers lock seats early, later rounds and spot rounds often close lower.",
          "Plan your preference order around this, and decide freeze-vs-upgrade deliberately rather than reflexively.",
        ],
      },
    ],
    illustrative: false,
  },
  {
    slug: "ipmat-guessing-math",
    title: "IPMAT Marking: The Guessing Math That Decides Ranks",
    seoTitle: "IPMAT Marking: The Guessing Math",
    vertical: "IPMAT",
    type: "blog",
    date: LAST_UPDATED,
    dateDisplay: LAST_UPDATED_DISPLAY,
    excerpt:
      "IIM Indore's QA Short-Answer has no negative marking; elsewhere it's −1. Understanding the expected-value math is the whole attempt strategy.",
    intro:
      "IPMAT rewards disciplined attempting, not blind guessing. At IIM Indore the Quant Short-Answer section has no negative marking, while QA-MCQ and Verbal deduct −1. Knowing the expected value of a guess — and how elimination changes it — is the difference between a safe attempt and a costly one.",
    sections: [
      {
        heading: "No-negative sections: never leave a blank",
        body: [
          "On IIM Indore's QA Short-Answer (type-in) section there is no penalty for a wrong answer, so a blank is a guaranteed zero while a reasoned attempt only has upside.",
          "Attempt every Short-Answer question with your best approximation — there is no downside.",
        ],
      },
      {
        heading: "Negative-marking sections: eliminate, then decide",
        body: [
          "Where wrong answers cost −1, a blind guess among four options is barely positive in expectation and high-variance. Eliminating even one option tilts the odds clearly in your favour.",
          "So the rule is simple: guess only after eliminating at least one choice; otherwise skip and protect your score.",
        ],
      },
    ],
    illustrative: false,
  },
  {
    slug: "choosing-cuet-subjects",
    title: "Choosing CUET Subjects: A Course-First Method",
    seoTitle: "Choosing CUET Subjects (Course-First)",
    vertical: "CUET",
    type: "blog",
    date: LAST_UPDATED,
    dateDisplay: LAST_UPDATED_DISPLAY,
    excerpt:
      "Your CUET subject combination quietly decides your eligible college list. Choose courses first, then map the subjects each one requires.",
    intro:
      "The biggest avoidable CUET mistake is choosing subjects before choosing target courses. Universities map each course to the CUET subjects you must have taken, so your combination determines which colleges you're even eligible for. Work backwards: list target college–course combinations first, then pick subjects that keep the most options open.",
    sections: [
      {
        heading: "Map courses to required subjects",
        body: [
          "For every college–course on your shortlist, note the CUET subject(s) it requires — often aligned to your Class 12 subjects. The same course can have different rules at different universities.",
          "A combination that satisfies more of your shortlist is strictly better than one that narrows it.",
        ],
      },
      {
        heading: "Then optimise for your strengths",
        body: [
          "Among combinations that keep your shortlist open, choose the subjects you score highest in, and a language you read fastest.",
          "Confirm the current subject-mapping rules on each target university's official source before locking your selection.",
        ],
      },
    ],
    illustrative: false,
  },
];

export const isPostPublishable = (p: Post): boolean =>
  !p.illustrative && !!p.slug && p.sections.length > 0;

export const blogPosts = (): Post[] => posts.filter((p) => p.type === "blog" && isPostPublishable(p));
export const newsPosts = (v?: Vertical): Post[] =>
  posts.filter((p) => p.type === "news" && isPostPublishable(p) && (!v || p.vertical === v));
export const getPost = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug && isPostPublishable(p));
