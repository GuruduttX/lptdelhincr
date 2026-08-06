import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { MapPin, MessageCircle, Phone, Navigation } from "lucide-react";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { localBusinessSchema } from "@/lib/schema";
import {
  BRAND_SHORT,
  CENTRES,
  getCentre,
  isPlaceholder,
  telLink,
  whatsappLink,
} from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

/**
 * Centre page (SOP E2 template · E3 LocalBusiness). Dynamic over the 4 centre
 * slugs in config. NAP is byte-identical with config. Unknown slug → 404.
 */
export const Route = createFileRoute("/centres/$slug")({
  loader: ({ params }) => {
    const centre = getCentre(params.slug);
    if (!centre) throw notFound();
    return { centre };
  },
  head: ({ params }) => {
    const centre = getCentre(params.slug);
    const area = centre?.area ?? "Delhi-NCR";
    return pageHead({
      // Single brand suffix, ≤60 chars (SOP B3).
      title: `CUET & IPMAT Coaching in ${area} | ${BRAND_SHORT}`,
      // ≤155 chars (no full address — that lives on-page / in schema).
      description: `CUET & IPMAT coaching in ${area} at ${BRAND_SHORT} — offline, online & hybrid batches. Address, directions and batch details.`,
      path: `/centres/${params.slug}`,
    });
  },
  component: CentrePage,
});

function CentrePage() {
  const { centre } = Route.useLoaderData();
  const phoneKnown = !isPlaceholder(centre.phone);
  const mapsKnown = !isPlaceholder(centre.mapsUrl);

  const faqs: FAQItem[] = [
    {
      q: `Where is ${BRAND_SHORT}'s ${centre.area} centre located?`,
      a: (
        <>
          {centre.fullAddress}, near {centre.landmark}. The centre offers CUET and IPMAT coaching in
          offline, online and hybrid modes.
        </>
      ),
    },
    {
      q: `Which exams are coached at the ${centre.area} centre?`,
      a: <>CUET (UG) and IPMAT/JIPMAT, across offline, online and hybrid batches.</>,
    },
    {
      q: `Does the ${centre.area} centre offer a free demo class?`,
      a: (
        <>
          Yes — book a free demo on WhatsApp and our team will confirm the next batch and timings for
          the {centre.area} centre.
        </>
      ),
    },
  ];

  return (
    <ContentPage
      canonicalPath={`/centres/${centre.slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "Centres", item: "/centres" },
        { name: centre.area },
      ]}
      title={
        <>
          CUET &amp; IPMAT Coaching in {centre.area} — {BRAND_SHORT}
        </>
      }
      introLead={`${BRAND_SHORT} · ${centre.area}:`}
      intro={
        <>
          {BRAND_SHORT}'s {centre.area} centre offers CUET and IPMAT coaching at {centre.fullAddress}.
          Landmark: {centre.landmark}. Offline, online and hybrid batches — book a free demo on
          WhatsApp.
        </>
      }
      toc={[
        { id: "address", label: "Address & directions" },
        { id: "batches", label: "Batches here" },
        { id: "why", label: "Why this centre" },
      ]}
      ctaMessage={`Hi ${BRAND_SHORT}, I want CUET/IPMAT batch details at the ${centre.area} centre`}
      faqs={faqs}
      schema={[localBusinessSchema(centre)]}
    >
      <Section id="address" heading="Address & directions">
        <p className="flex items-start gap-2">
          <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
          <span>
            <strong className="text-ink">Address:</strong> {centre.fullAddress}
            <br />
            <strong className="text-ink">Nearest landmark / metro:</strong> {centre.landmark}
          </span>
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {mapsKnown ? (
            <a href={centre.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Navigation className="h-4 w-4" strokeWidth={2} /> Get directions
            </a>
          ) : (
            <span className="text-sm text-body/70">Map link to be added.</span>
          )}
          <a href={whatsappLink(`Hi ${BRAND_SHORT}, directions to the ${centre.area} centre`)} target="_blank" rel="nofollow" className="btn-primary">
            <MessageCircle className="h-4 w-4" strokeWidth={2} /> Chat on WhatsApp
          </a>
          {phoneKnown && (
            <a href={telLink(centre.phone)} className="btn-secondary">
              <Phone className="h-4 w-4" strokeWidth={2} /> Call {centre.phone}
            </a>
          )}
        </div>
        <p className="mt-6 text-sm">
          <strong className="text-ink">Areas served:</strong> {centre.areaServed.join(", ")}.
        </p>
        <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-[#FDF6EC] shadow-sm">
          <iframe
            title={`Map location for ${BRAND_SHORT} ${centre.area}`}
            src={`https://maps.google.com/maps?q=${centre.geo.lat},${centre.geo.lng}&hl=en&z=16&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>

      <Section id="batches" heading={`CUET & IPMAT batches at ${centre.area}`}>
        <p>
          This centre runs CUET and IPMAT batches in offline, online and hybrid modes. See full course
          details and book a demo:
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/courses/cuet" className="btn-secondary">CUET courses</Link>
          <Link to="/courses/ipmat" className="btn-secondary">IPMAT courses</Link>
        </div>
        <p className="text-sm">
          Local pages:{" "}
          <a href={`/cuet/coaching-in-${centre.slug}`} className="text-brand hover:underline">
            CUET coaching in {centre.area}
          </a>{" "}
          ·{" "}
          <a href={`/ipmat/coaching-in-${centre.slug}`} className="text-brand hover:underline">
            IPMAT coaching in {centre.area}
          </a>
        </p>
      </Section>

      <Section id="why" heading={`Why students choose the ${centre.area} centre`}>
        <p>
          Accessible from {centre.areaServed.slice(1).join(", ")} and around {centre.landmark}. Faculty,
          results and local differentiators specific to this centre will be added from verified records.
        </p>
        <p className="text-sm">
          Explore our other centres:{" "}
          {CENTRES.filter((c) => c.slug !== centre.slug).map((c, i, arr) => (
            <span key={c.slug}>
              <Link to="/centres/$slug" params={{ slug: c.slug }} className="text-brand hover:underline">
                {c.area}
              </Link>
              {i < arr.length - 1 ? ", " : ""}
            </span>
          ))}
          .
        </p>
      </Section>
    </ContentPage>
  );
}
