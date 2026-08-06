import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { courseSchema } from "@/lib/schema";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { BRAND, canonical } from "@/config/site";
import { LANDING_AREAS } from "@/components/lpt/LocalLanding";
import {
  CUET_BATCHES,
  CUET_FROM_PRICE,
  CUET_ONLINE_BATCHES,
  CUET_MOCK_PACKAGES,
  LEGACY_STATS,
} from "@/data/courses";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  {
    q: "Does LPT Delhi-NCR offer CUET coaching offline and online?",
    a: <>Yes. CUET (UG) coaching is available in offline, online and hybrid modes across our 4 Delhi-NCR centres in Noida, Hauz Khas, GTB Nagar and Gurugram. Book a free demo to find the batch that fits your schedule.</>,
  },
  {
    q: "What is the fee for CUET coaching?",
    a: <>CUET (UG) offline fees at our GTB Nagar (Delhi) centre start from ₹25,000 (CUET 2026 Crash Course) and go up to ₹90,000 for the 2-year CUET 2028 batch — all excluding GST. See the batch table above for each option.</>,
  },
];

export const Route = createFileRoute("/courses/cuet")({
  head: () =>
    pageHead({
      title: `CUET Coaching in Delhi-NCR — ${BRAND}`,
      description: "CUET (UG) coaching in Delhi-NCR — domain, general & language tracks. Offline, online & hybrid batches across 4 centres. Book a free demo.",
      path: "/courses/cuet",
    }),
  component: CuetCourses,
});

function CuetCourses() {
  return (
    <ContentPage
      canonicalPath="/courses/cuet"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "Courses", item: "/courses" },
        { name: "CUET" },
      ]}
      title="CUET Coaching in Delhi-NCR"
      introLead="In short:"
      intro={
        <>
          {BRAND} offers CUET (UG) coaching covering domain subjects, the general test and languages,
          across 4 Delhi-NCR centres. Offline batches at GTB Nagar (Delhi) start from ₹25,000 (excl.
          GST); see the full batch lineup and fees below.
        </>
      }
      toc={[
        { id: "batches", label: "Batches & fees" },
        { id: "online", label: "Online & self-paced" },
        { id: "covered", label: "What's covered" },
        { id: "material", label: "Study material & mocks" },
        { id: "legacy", label: "Our numbers" },
        { id: "local", label: "Coaching near you" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, I want CUET batch details"
      faqs={faqs}
      schema={[
        courseSchema({
          name: "CUET (UG) Coaching",
          description: "CUET (UG) coaching covering domain, general and language tracks, in offline, online and hybrid modes.",
          courseMode: "Offline",
          price: CUET_FROM_PRICE,
          url: canonical("/courses/cuet"),
          // No aggregateRating — added only with genuine reviews (SOP A5.3).
        }),
      ]}
    >
      <Section id="batches" heading="Batches & fees">
        <ComparisonTable
          caption="CUET offline batches at GTB Nagar (Delhi) — fees excl. GST"
          date="28 Jun 2026"
          source="LPT Delhi-NCR"
          columns={[
            { key: "batch", header: "Batch" },
            { key: "mode", header: "Mode" },
            { key: "duration", header: "Duration" },
            { key: "fee", header: "Fee (excl. GST)" },
          ]}
          rows={CUET_BATCHES.map((b) => ({
            batch: b.name,
            mode: b.mode,
            duration: b.duration,
            fee: (
              <>
                <span className="font-semibold text-ink">{b.price}</span>
                {b.originalPrice && (
                  <span className="ml-2 text-xs text-body line-through">{b.originalPrice}</span>
                )}
                {b.discount && <span className="ml-2 text-xs font-semibold text-brand">{b.discount}</span>}
              </>
            ),
          }))}
        />
        <p className="text-sm">
          Transparent fees, no "enquire for price". Fees shown for the GTB Nagar (Delhi) centre, excl.
          GST; other centres and online/hybrid modes may vary — confirm on a free counselling call.
        </p>
      </Section>

      <Section id="online" heading="Online & self-paced batches">
        <p>
          Prefer to study from home? Choose a live, hybrid or recorded CUET batch — fees confirmed on a
          free counselling call.
        </p>
        <ComparisonTable
          caption="CUET online, hybrid & self-paced batches"
          date="28 Jun 2026"
          source="LPT"
          columns={[
            { key: "batch", header: "Batch" },
            { key: "mode", header: "Mode" },
            { key: "duration", header: "Duration" },
            { key: "discount", header: "Offer" },
          ]}
          rows={CUET_ONLINE_BATCHES.map((b) => ({
            batch: b.name,
            mode: b.mode,
            duration: b.duration,
            discount: <span className="font-semibold text-brand">{b.discount}</span>,
          }))}
        />
      </Section>

      <Section id="covered" heading="What's covered">
        <ul className="list-disc space-y-2 pl-5">
          <li>Domain subjects aligned to your target university and course.</li>
          <li>General Test — reasoning, quantitative and general awareness.</li>
          <li>Language section strategy.</li>
          <li>Proctored mocks and in-house study material.</li>
        </ul>
      </Section>

      <Section id="material" heading="Study material & mocks">
        <p>Sharpen your prep with our CUET test series and printed study material:</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {CUET_MOCK_PACKAGES.map((m) => (
            <div key={m.name} className="rounded-2xl border border-hairline bg-white p-5">
              <div className="font-bold text-ink">{m.name}</div>
              <div className="mt-1 text-sm font-semibold text-brand">{m.tests}</div>
              <p className="mt-2 text-sm text-body">{m.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="legacy" heading="Numbers that define our legacy">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {LEGACY_STATS.map((s) => (
            <div key={s.label} className="rounded-2xl bg-cream-soft p-5 text-center">
              <div className="h-display text-3xl text-brand">{s.value}</div>
              <div className="mt-1 text-xs font-medium text-body">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="text-sm">Figures reflect the LPT group across all verticals and years.</p>
      </Section>

      <Section id="local" heading="CUET coaching near you">
        <p>Find CUET coaching at your nearest Delhi-NCR centre:</p>
        <ul className="flex flex-wrap gap-2">
          {LANDING_AREAS.map((a) => (
            <li key={a.slug}>
              <a href={`/cuet/coaching-in-${a.slug}`} className="btn-pill">
                CUET in {a.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </ContentPage>
  );
}
