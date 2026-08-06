import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "What is the IPMAT Indore sectional time lock?", a: <>IIM Indore locks each of its sections to a fixed time window (commonly 40 minutes); you cannot carry unused time forward or return to a completed section. This forces per-section pacing rather than managing one overall clock. Confirm the current timing on iimidr.ac.in.</> },
  { q: "Does IIM Rohtak have a sectional lock?", a: <>No. IIM Rohtak has no sectional lock, so you manage your own time across all sections. That flexibility is also a risk — it's easy to over-invest in one section, so plan a per-section time budget anyway.</> },
  { q: "How should I pace under a sectional lock?", a: <>Treat each locked section as its own mini-exam: open with the questions you're fastest at, bank a few sure marks, then attempt the rest. Don't save hard questions for later — you can't return once the section's window closes.</> },
];

export const Route = createFileRoute("/ipmat/sectional-lock")({
  head: () =>
    pageHead({
      title: `IPMAT Sectional Time Lock Explained | ${BRAND_SHORT}`,
      description:
        "IPMAT Indore's sectional time lock explained — each section is time-boxed (commonly 40 min), no carry-over. How to pace per section. Rohtak has no lock.",
      path: "/ipmat/sectional-lock",
      ogType: "article",
    }),
  component: SectionalLock,
});

function SectionalLock() {
  return (
    <ContentPage
      canonicalPath="/ipmat/sectional-lock"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: "Sectional lock" },
      ]}
      title="IPMAT Sectional Time Lock, Explained"
      introLead="Direct answer:"
      intro={
        <>
          A <strong>sectional time lock</strong> means each section has its own fixed time window —
          at IIM Indore commonly 40 minutes — and you cannot carry unused time forward or return to a
          completed section. IIM Rohtak has no lock. The lock forces per-section pacing, which changes
          how you sequence questions.
        </>
      }
      toc={[
        { id: "what", label: "What the lock does" },
        { id: "pace", label: "How to pace" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, help me practise IPMAT sectional pacing"
      faqs={faqs}
      schema={[articleSchema({ headline: "IPMAT Sectional Time Lock, Explained", dateModified: LAST_UPDATED })]}
    >
      <Section id="what" heading="What the sectional lock does">
        <p>
          <strong className="text-ink">No time-banking.</strong> Under a lock, finishing one section
          early does not give you extra time elsewhere. So a strong section can't rescue a weak one on
          the clock — each must stand alone within its window. See the full{" "}
          <a href="/ipmat/marking-scheme" className="text-brand hover:underline">marking scheme</a> for how this
          interacts with negative marking.
        </p>
      </Section>

      <Section id="pace" heading="How to pace under the lock">
        <p>
          <strong className="text-ink">Per-section budgets.</strong> Decide a time plan for each
          section before the exam, open with your fastest question types to bank marks, and never hoard
          hard questions for "later" — there is no later once the window closes. Build this with timed
          mocks in <a href="/courses/ipmat" className="text-brand hover:underline">IPMAT coaching</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
