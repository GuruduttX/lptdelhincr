import { BRAND, BRAND_SHORT, DOMAIN, canonical } from "@/config/site";

/**
 * pageHead — builds the per-route `head` payload (SOP A1.2: self-referencing
 * absolute canonical, unique title ≤60 chars where possible, meta ≤155).
 * Pass the route's own path so the canonical is self-referencing.
 */
export function pageHead({
  title,
  description,
  path,
  ogType = "website",
}: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
}) {
  const url = canonical(path);
  // Single brand suffix only (SOP B3): if the title already names the brand
  // (full or short form), don't append it again — prevents duplicate-brand,
  // over-length titles like "... — LPT Delhi-NCR | Law Prep Tutorial Delhi-NCR".
  const hasBrand = title.includes(BRAND) || title.includes(BRAND_SHORT);
  const fullTitle = hasBrand ? title : `${title} | ${BRAND}`;
  // Canonical is emitted by the <Canonical> component (ContentPage / route body)
  // so there is exactly one self-referencing canonical per page (SOP A1.2).
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: url },
    ],
  };
}

export { DOMAIN };
