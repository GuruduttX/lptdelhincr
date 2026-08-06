/* =============================================================================
 * SCHEMA LIBRARY (SOP A5) — JSON-LD builders. One per page type.
 *
 * HONOR RULES (SOP A5):
 *   - No fake AggregateRating. aggregateRating only on real Course/Organization
 *     with genuine, collectible reviews (pass it in explicitly; omitted otherwise).
 *   - NO FAQPage / AggregateRating on Article pages.
 *   - Validate every block in Google's Rich Results Test.
 * Builders return plain JSON-serialisable objects; render via <JsonLd>.
 * =============================================================================
 */

import {
  BRAND,
  DOMAIN,
  EMAIL,
  FOUNDED_YEAR,
  PHONE,
  SOCIAL,
  type Centre,
  isPlaceholder,
} from "@/config/site";

type Json = Record<string, unknown>;

const LOGO = `${DOMAIN}/logo.svg`;

/** Drop keys whose value is an unset "{{...}}" placeholder, so we never emit
 *  fabricated structured data. Honesty over completeness (SOP A4.6/A5). */
function prunePlaceholders<T extends Json>(obj: T): T {
  const out: Json = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string" && isPlaceholder(v)) continue;
    out[k] = v;
  }
  return out as T;
}

/* A5.1 — Organization (global, every page) ------------------------------- */
export function organizationSchema(): Json {
  return prunePlaceholders({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: BRAND,
    url: DOMAIN,
    logo: LOGO,
    telephone: PHONE,
    email: EMAIL,
    foundingDate: FOUNDED_YEAR,
    sameAs: Object.values(SOCIAL).filter((u) => !isPlaceholder(u)),
  });
}

/* A5.2 — Breadcrumb (every page) ----------------------------------------- */
export interface Crumb {
  name: string;
  /** Absolute or root-relative path. Last crumb may omit item. */
  item?: string;
}
export function breadcrumbSchema(crumbs: Crumb[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => {
      const el: Json = { "@type": "ListItem", position: i + 1, name: c.name };
      if (c.item) el.item = c.item.startsWith("http") ? c.item : `${DOMAIN}${c.item}`;
      return el;
    }),
  };
}

/* A5.3 — Course / batch -------------------------------------------------- */
export interface CourseInput {
  name: string;
  description: string;
  courseMode?: "Offline" | "Online" | "Blended";
  locationName?: string;
  locationAddress?: string;
  startDate?: string;
  endDate?: string;
  price?: string;
  url: string;
  /** Provide ONLY with genuine review data, else omit (SOP A5.3 honor rule). */
  aggregateRating?: { ratingValue: string; reviewCount: string };
}
export function courseSchema(c: CourseInput): Json {
  const offer = prunePlaceholders({
    "@type": "Offer",
    price: c.price ?? "{{price}}",
    priceCurrency: "INR",
    url: c.url.startsWith("http") ? c.url : `${DOMAIN}${c.url}`,
    availability: "https://schema.org/InStock",
  });
  const instance = prunePlaceholders({
    "@type": "CourseInstance",
    courseMode: c.courseMode ?? "{{courseMode}}",
    startDate: c.startDate ?? "{{startDate}}",
    endDate: c.endDate ?? "{{endDate}}",
    location: c.locationName
      ? { "@type": "Place", name: c.locationName, address: c.locationAddress }
      : undefined,
  });
  const base: Json = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.name,
    description: c.description,
    provider: { "@type": "EducationalOrganization", name: BRAND, url: DOMAIN },
    hasCourseInstance: instance,
    offers: offer,
  };
  // aggregateRating ONLY if real data passed in (never fabricate).
  if (c.aggregateRating) {
    base.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: c.aggregateRating.ratingValue,
      reviewCount: c.aggregateRating.reviewCount,
    };
  }
  return base;
}

/* A5.4 — Dataset (the GEO crown jewel) ----------------------------------- */
export interface DatasetInput {
  name: string;
  description: string;
  license?: string;
  temporalCoverage?: string;
  csvUrl?: string;
  dateModified?: string;
}
export function datasetSchema(d: DatasetInput): Json {
  return prunePlaceholders({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: d.name,
    description: d.description,
    creator: { "@type": "Organization", name: BRAND },
    license: d.license ?? `${DOMAIN}/terms`,
    temporalCoverage: d.temporalCoverage ?? "{{temporalCoverage}}",
    distribution: d.csvUrl
      ? [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: d.csvUrl }]
      : undefined,
    dateModified: d.dateModified ?? "{{YYYY-MM-DD}}",
  });
}

/* A5.5 — HowTo ----------------------------------------------------------- */
export interface HowToStep {
  name: string;
  text: string;
}
export function howToSchema(name: string, steps: HowToStep[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s) => ({ "@type": "HowToStep", name: s.name, text: s.text })),
  };
}

/* A5.6 — Article (guide/pillar) — NO FAQPage / AggregateRating ----------- */
export interface ArticleInput {
  headline: string;
  /** Real faculty only. If omitted, author falls back to the Organization
   *  (never a fabricated person). */
  authorName?: string;
  authorSlug?: string;
  datePublished?: string;
  dateModified?: string;
}
export function articleSchema(a: ArticleInput): Json {
  const author =
    a.authorName && a.authorSlug
      ? { "@type": "Person", name: a.authorName, url: `${DOMAIN}/faculty/${a.authorSlug}` }
      : { "@type": "Organization", name: BRAND, url: DOMAIN };
  return prunePlaceholders({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.headline,
    author,
    publisher: {
      "@type": "Organization",
      name: BRAND,
      logo: { "@type": "ImageObject", url: LOGO },
    },
    // Placeholder dates are pruned (never emit "{{...}}" into JSON-LD).
    datePublished: a.datePublished ?? "{{YYYY-MM-DD}}",
    dateModified: a.dateModified ?? "{{YYYY-MM-DD}}",
  });
}

/* NewsArticle — for /[exam]/news/[slug] (fast-publish, dated, sourced). ---- */
export interface NewsInput {
  headline: string;
  datePublished: string;
  dateModified?: string;
  /** Official source the news is based on. */
  source?: string;
}
export function newsArticleSchema(n: NewsInput): Json {
  return prunePlaceholders({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: n.headline,
    datePublished: n.datePublished,
    dateModified: n.dateModified ?? n.datePublished,
    author: { "@type": "Organization", name: BRAND, url: DOMAIN },
    publisher: { "@type": "Organization", name: BRAND, logo: { "@type": "ImageObject", url: LOGO } },
  });
}

/* Blog — for the /blog index. ------------------------------------------- */
export function blogSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${BRAND} — CUET & IPMAT Journal`,
    url: `${DOMAIN}/blog`,
    publisher: { "@type": "Organization", name: BRAND },
  };
}

/* A5.7 — Person (faculty bio) -------------------------------------------- */
export interface PersonInput {
  name: string;
  jobTitle: string;
  slug: string;
  alumniOf?: string;
  knowsAbout?: string[];
}
export function personSchema(p: PersonInput): Json {
  return prunePlaceholders({
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.jobTitle,
    worksFor: { "@type": "EducationalOrganization", name: BRAND },
    alumniOf: p.alumniOf ?? "{{alumniOf}}",
    knowsAbout: p.knowsAbout ?? ["CUET", "IPMAT"],
    url: `${DOMAIN}/faculty/${p.slug}`,
  });
}

/* A5.8 — LocalBusiness (centre page) ------------------------------------- */
export function localBusinessSchema(centre: Centre): Json {
  return prunePlaceholders({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: centre.name,
    url: `${DOMAIN}/centres/${centre.slug}`,
    telephone: centre.phone,
    parentOrganization: { "@type": "EducationalOrganization", name: BRAND, url: DOMAIN },
    address: {
      "@type": "PostalAddress",
      streetAddress: centre.streetAddress,
      addressLocality: centre.addressLocality,
      addressRegion: centre.addressRegion,
      postalCode: centre.postalCode,
      addressCountry: centre.addressCountry,
    },
    geo: { "@type": "GeoCoordinates", latitude: centre.geo.lat, longitude: centre.geo.lng },
    areaServed: centre.areaServed,
    openingHours: centre.openingHours,
  });
}

/* FAQPage — ONLY on dedicated FAQ hub pages (SOP B6/A4.5). NEVER on Article
 * pages. Optional/minimal; these FAQs win snippets/AI citations regardless. */
export function faqPageSchema(items: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/* ItemList — for index pages (faculty, centres, colleges) ---------------- */
export function itemListSchema(items: { name: string; url: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url.startsWith("http") ? it.url : `${DOMAIN}${it.url}`,
    })),
  };
}
