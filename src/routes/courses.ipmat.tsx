import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { courseSchema } from "@/lib/schema";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { BRAND, canonical } from "@/config/site";
import { LANDING_AREAS } from "@/components/lpt/LocalLanding";
import {
  IPMAT_BATCHES,
  IPMAT_FROM_PRICE,
  IPMAT_ONLINE_BATCHES,
  IPMAT_ONLINE_FEATURES,
  LEGACY_STATS,
} from "@/data/courses";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  {
    q: "What is IPMAT coaching?",
    a: <>IPMAT coaching is a structured program that prepares students for the IPMAT exam through live classes, mock tests, mentorship and study material — available offline at our Delhi-NCR centres and online from anywhere.</>,
  },
  {
    q: "Which IPMAT exams does LPT Delhi-NCR prepare students for?",
    a: <>We prepare students for IPMAT Indore, IPMAT Rohtak and JIPMAT — the integrated programme entrance tests — covering Quantitative Aptitude, Verbal Ability and (for Rohtak) Logical Reasoning, plus PI/WAT preparation.</>,
  },
  {
    q: "What are the online IPMAT coaching fees?",
    a: <>Online IPMAT fees are ₹12,000 for the 2026 batch, ₹59,999 for the 2027 Target batch and ₹99,999 for the 2028 Foundation batch (excl. GST). A dedicated Personal Interview prep program is ₹699.</>,
  },
  {
    q: "What is the fee for IPMAT coaching?",
    a: <>IPMAT offline fees at our GTB Nagar (Delhi) centre are ₹80,000 for the 1-year Target & Finisher batches and ₹1,40,000 for the 2-year Foundation batch (Class 11) — all excluding GST. See the batch table above.</>,
  },
  {
    q: "Is IPMAT coaching available online?",
    a: <>Yes. IPMAT coaching runs in offline, online and hybrid modes across our 4 Delhi-NCR centres. Book a free demo to choose the batch and mode that suit you.</>,
  },
];

export const Route = createFileRoute("/courses/ipmat")({
  head: () =>
    pageHead({
      title: `IPMAT Coaching in Delhi-NCR — ${BRAND}`,
      description: "IPMAT Indore & Rohtak and JIPMAT coaching in Delhi-NCR. Offline, online & hybrid batches, real faculty, mocks & PI/WAT prep. Book a free demo.",
      path: "/courses/ipmat",
    }),
  component: IpmatCourses,
});

function IpmatCourses() {
  return (
    <ContentPage
      canonicalPath="/courses/ipmat"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "Courses", item: "/courses" },
        { name: "IPMAT" },
      ]}
      title="IPMAT Coaching in Delhi-NCR"
      introLead="In short:"
      intro={
        <>
          {BRAND} offers IPMAT (Indore &amp; Rohtak) and JIPMAT coaching covering Quantitative Aptitude,
          Verbal Ability, Logical Reasoning and PI/WAT across 4 Delhi-NCR centres. Offline batches at
          GTB Nagar (Delhi) range from ₹80,000 to ₹1,40,000 (excl. GST); see the full lineup below.
        </>
      }
      toc={[
        { id: "batches", label: "Batches & fees" },
        { id: "online", label: "Online batches & fees" },
        { id: "covered", label: "What's covered" },
        { id: "why-online", label: "Why LPT online" },
        { id: "legacy", label: "Our numbers" },
        { id: "local", label: "Coaching near you" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, I want IPMAT batch details"
      faqs={faqs}
      schema={[
        courseSchema({
          name: "IPMAT Coaching (Indore, Rohtak & JIPMAT)",
          description: "IPMAT and JIPMAT coaching covering QA, Verbal, Logical Reasoning and PI/WAT, in offline, online and hybrid modes.",
          courseMode: "Offline",
          price: IPMAT_FROM_PRICE,
          url: canonical("/courses/ipmat"),
        }),
      ]}
    >
      <Section id="batches" heading="Batches & fees">
        <ComparisonTable
          caption="IPMAT offline batches at GTB Nagar (Delhi) — fees excl. GST"
          date="28 Jun 2026"
          source="LPT Delhi-NCR"
          columns={[
            { key: "batch", header: "Batch" },
            { key: "who", header: "For" },
            { key: "duration", header: "Duration" },
            { key: "fee", header: "Fee (excl. GST)" },
          ]}
          rows={IPMAT_BATCHES.map((b) => ({
            batch: b.name,
            who: b.forWhom ?? "—",
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

      <Section id="online" heading="Online IPMAT batches & fees">
        <p>
          Prefer to learn from anywhere? Our online IPMAT batches run live with recorded backups, IIM-alumni
          mentorship and full mocks. Fees below exclude GST.
        </p>
        <ComparisonTable
          caption="IPMAT online batches — fees excl. GST"
          date="28 Jun 2026"
          source="LPT"
          columns={[
            { key: "batch", header: "Batch" },
            { key: "who", header: "For" },
            { key: "duration", header: "Duration" },
            { key: "fee", header: "Fee (excl. GST)" },
          ]}
          rows={IPMAT_ONLINE_BATCHES.map((b) => ({
            batch: b.name,
            who: b.forWhom ?? "—",
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
      </Section>

      <Section id="covered" heading="What's covered">
        <ul className="list-disc space-y-2 pl-5">
          <li>Quantitative Aptitude — short-answer and MCQ strategy for Indore &amp; Rohtak patterns.</li>
          <li>Verbal Ability and Reading Comprehension.</li>
          <li>Logical Reasoning (for IIM Rohtak).</li>
          <li>Sectional strategy, full mocks, and PI/WAT preparation.</li>
        </ul>
      </Section>

      <Section id="why-online" heading="Why students choose LPT for IPMAT">
        <div className="grid gap-4 sm:grid-cols-2">
          {IPMAT_ONLINE_FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-hairline bg-white p-5">
              <div className="font-bold text-ink">{f.title}</div>
              <p className="mt-1.5 text-sm text-body">{f.desc}</p>
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

      <Section id="local" heading="IPMAT coaching near you">
        <p>Find IPMAT coaching at your nearest Delhi-NCR centre:</p>
        <ul className="flex flex-wrap gap-2">
          {LANDING_AREAS.map((a) => (
            <li key={a.slug}>
              <a href={`/ipmat/coaching-in-${a.slug}`} className="btn-pill">
                IPMAT in {a.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </ContentPage>
  );
}
