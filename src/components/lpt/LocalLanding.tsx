import { Link } from "@tanstack/react-router";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { courseSchema, localBusinessSchema } from "@/lib/schema";
import { BRAND_SHORT, CENTRES, getCentre, canonical } from "@/config/site";
import { CUET_BATCHES, IPMAT_BATCHES } from "@/data/courses";
import { IIM_SELECTIONS_2YR } from "@/data/results";
import type { FAQItem } from "@/components/seo/FAQ";

/**
 * LocalLanding (SOP F2/F3) — the commercial "[exam] coaching in [area]" page.
 * Distinct from the /centres/[area] location page: this targets the commercial
 * search intent (batches, fees, why-us, local FAQ) and CROSS-LINKS to the centre
 * page for address/directions WITHOUT duplicating its body copy (F2 guardrail).
 * Self-canonical. Schema: Course + Offer + LocalBusiness reference + Breadcrumb.
 */

export type LandingVertical = "CUET" | "IPMAT";

export interface LandingArea {
  /** URL area slug (also the centre slug, except the NCR overview). */
  slug: string;
  label: string;
  /** Matching physical centre slug, or null for the Delhi-NCR overview. */
  centreSlug: string | null;
}

export const LANDING_AREAS: LandingArea[] = [
  { slug: "noida", label: "Noida", centreSlug: "noida" },
  { slug: "hauz-khas", label: "Hauz Khas", centreSlug: "hauz-khas" },
  { slug: "gtb-nagar", label: "GTB Nagar", centreSlug: "gtb-nagar" },
  { slug: "gurugram", label: "Gurugram", centreSlug: "gurugram" },
  { slug: "delhi-ncr", label: "Delhi-NCR", centreSlug: null },
];

export const getLandingArea = (slug: string): LandingArea | undefined =>
  LANDING_AREAS.find((a) => a.slug === slug);

const courseHref = (v: LandingVertical) => (v === "CUET" ? "/courses/cuet" : "/courses/ipmat");

export function LocalLanding({ vertical, area }: { vertical: LandingVertical; area: LandingArea }) {
  const examPath = vertical === "CUET" ? "cuet" : "ipmat";
  const centre = area.centreSlug ? getCentre(area.centreSlug) : undefined;
  const path = `/${examPath}/coaching-in-${area.slug}`;

  // Secondary localities (SOP F2: mentioned WITHIN the nearest centre's landing,
  // not given their own thin pages).
  const nearby = centre ? centre.areaServed.slice(1) : CENTRES.map((c) => c.area);

  const faqs: FAQItem[] = [
    {
      q: `Where is ${BRAND_SHORT}'s ${vertical} coaching in ${area.label}?`,
      a: centre ? (
        <>
          At {BRAND_SHORT}'s {centre.area} centre — {centre.fullAddress}, near {centre.landmark}. See
          full address and directions on the{" "}
          <Link to="/centres/$slug" params={{ slug: centre.slug }} className="text-brand hover:underline">
            {centre.area} centre page
          </Link>
          .
        </>
      ) : (
        <>
          {BRAND_SHORT} runs {CENTRES.length} Delhi-NCR centres — Noida, Hauz Khas, GTB Nagar and
          Gurugram. Pick the nearest on the{" "}
          <Link to="/centres" className="text-brand hover:underline">centres page</Link>.
        </>
      ),
    },
    {
      q: `What is the fee for ${vertical} coaching in ${area.label}?`,
      a: (
        <>
          Fees vary by batch (live, crash, test series). We confirm exact, transparent fees during a
          free counselling call — see batch options on the{" "}
          <Link to={courseHref(vertical)} className="text-brand hover:underline">{vertical} courses page</Link>.
        </>
      ),
    },
    {
      q: `Do you offer online ${vertical} classes for ${area.label} students?`,
      a: <>Yes. {vertical} coaching is available in offline, online and hybrid modes, so {area.label} students can attend in person or join live online batches. Book a free demo to choose the mode that fits your schedule.</>,
    },
  ];

  return (
    <ContentPage
      canonicalPath={path}
      crumbs={[
        { name: "Home", item: "/" },
        { name: vertical, item: courseHref(vertical) },
        { name: `Coaching in ${area.label}` },
      ]}
      title={`${vertical} Coaching in ${area.label} | ${BRAND_SHORT}`}
      introLead={`${BRAND_SHORT} · ${area.label}:`}
      intro={
        <>
          {BRAND_SHORT} offers {vertical} coaching in {area.label}
          {centre ? ` near ${centre.landmark}` : " across its 4 Delhi-NCR centres"} — offline, online
          and hybrid batches. Book a free demo on WhatsApp; fees and dates are confirmed during a free
          counselling call.
        </>
      }
      toc={[
        { id: "batches", label: "Batches & fees" },
        { id: "why", label: `Why ${BRAND_SHORT}` },
        { id: "centre", label: "Centre & directions" },
        { id: "results", label: "Results" },
      ]}
      ctaMessage={`Hi ${BRAND_SHORT}, I want ${vertical} coaching details for ${area.label}`}
      faqs={faqs}
      schema={[
        courseSchema({
          name: `${vertical} Coaching in ${area.label}`,
          description: `${vertical} coaching in ${area.label} (Delhi-NCR) — offline, online and hybrid batches at ${BRAND_SHORT}.`,
          courseMode: "Blended",
          url: canonical(path),
          locationName: centre?.name,
          locationAddress: centre?.fullAddress,
        }),
        // LocalBusiness reference for the associated centre (real NAP).
        ...(centre ? [localBusinessSchema(centre)] : []),
      ]}
    >
      <Section id="batches" heading={`${vertical} batches & fees in ${area.label}`}>
        <p>
          <strong className="text-ink">In short:</strong> {area.label} students can join {vertical}{" "}
          batches in offline, online or hybrid mode. Fees below are for our GTB Nagar (Delhi) centre,
          excl. GST — no "enquire for price".
        </p>
        <ComparisonTable
          caption={`${vertical} batches at ${BRAND_SHORT} — fees excl. GST`}
          date="28 Jun 2026"
          source={BRAND_SHORT}
          columns={[
            { key: "batch", header: "Batch" },
            { key: "duration", header: "Duration" },
            { key: "fee", header: "Fee (excl. GST)" },
          ]}
          rows={(vertical === "CUET" ? CUET_BATCHES : IPMAT_BATCHES).map((b) => ({
            batch: b.name,
            duration: b.duration,
            fee: (
              <>
                <span className="font-semibold text-ink">{b.price}</span>
                {b.originalPrice && (
                  <span className="ml-2 text-xs text-body line-through">{b.originalPrice}</span>
                )}
              </>
            ),
          }))}
        />
        <Link to={courseHref(vertical)} className="inline-block text-sm font-semibold text-brand hover:underline">
          See full {vertical} course details →
        </Link>
      </Section>

      <Section id="why" heading={`Why choose ${BRAND_SHORT} in ${area.label}`}>
        <p>
          <strong className="text-ink">{BRAND_SHORT} focuses only on CUET and IPMAT</strong> — not a
          dozen exams at once. {area.label} learners get subject specialists, proctored mocks and
          in-house material, with the option to attend at the nearest centre or online.
        </p>
        <p className="text-sm">Also serving nearby: {nearby.join(", ")}.</p>
      </Section>

      <Section id="centre" heading="Centre & directions">
        {centre ? (
          <p>
            Full address, landmark and directions for the {centre.area} centre are on its dedicated
            page —{" "}
            <Link to="/centres/$slug" params={{ slug: centre.slug }} className="font-semibold text-brand hover:underline">
              visit the {centre.area} centre page
            </Link>
            . (We keep location details there to avoid duplication.)
          </p>
        ) : (
          <p>
            See all {CENTRES.length} Delhi-NCR centres with addresses and directions on the{" "}
            <Link to="/centres" className="font-semibold text-brand hover:underline">centres page</Link>.
          </p>
        )}
      </Section>

      <Section id="results" heading={`${vertical} results in ${area.label}`}>
        <p>
          Across {BRAND_SHORT}, our students have earned <strong className="text-ink">{IIM_SELECTIONS_2YR} IIM
          selections in 2 years</strong>, including AIR 9, 22 and 24 at IIM Indore. See the full named
          list on our{" "}
          <Link to="/results" className="font-semibold text-brand hover:underline">results page</Link>. We
          publish results only when they are verifiable — never inflated.
        </p>
      </Section>
    </ContentPage>
  );
}
