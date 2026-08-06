import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Are CUET cutoffs decided before the exam?", a: <>No. Cutoffs are not pre-set — they emerge after the exam from that year's demand, available seats and the distribution of applicant scores, then settle as seats fill across rounds.</> },
  { q: "Who sets CUET cutoffs — NTA or the university?", a: <>The university. NTA conducts CUET and releases scores; each university (for DU, via CSAS) sets and releases its own cutoffs by college, course, category and round.</> },
  { q: "Why is my category's cutoff different?", a: <>Cutoffs are computed separately per category (General, OBC-NCL, SC, ST, EWS, PwBD). Reserved-category closing scores are usually lower than General for the same college–course, reflecting category-wise seat allocation.</> },
];

export const Route = createFileRoute("/cuet/cutoff/how-cutoffs-work")({
  head: () =>
    pageHead({
      title: `How CUET Cutoffs Work | ${BRAND_SHORT}`,
      description:
        "How CUET cutoffs work: universities (not NTA) release them via CSAS, set per college, course, category and round, and they drop across later rounds.",
      path: "/cuet/cutoff/how-cutoffs-work",
      ogType: "article",
    }),
  component: HowCutoffsWork,
});

function HowCutoffsWork() {
  return (
    <ContentPage
      canonicalPath="/cuet/cutoff/how-cutoffs-work"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Cutoffs", item: "/cuet/cutoff" },
        { name: "How cutoffs work" },
      ]}
      title="How CUET Cutoffs Work"
      introLead="Direct answer:"
      intro={
        <>
          A CUET cutoff is the lowest CUET score at which a college–course closed for a category in a
          given round. Universities (for DU, via CSAS) release them — NTA does not. Because they depend
          on demand, seats and applicant scores, they emerge after the exam and typically drop across
          later rounds.
        </>
      }
      toc={[
        { id: "emerge", label: "How a cutoff emerges" },
        { id: "rounds", label: "Why cutoffs move across rounds" },
        { id: "category", label: "Category-wise cutoffs" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, explain CUET cutoffs for my colleges"
      faqs={faqs}
      schema={[articleSchema({ headline: "How CUET Cutoffs Work", dateModified: LAST_UPDATED })]}
    >
      <Section id="emerge" heading="How a cutoff emerges">
        <p>
          <strong className="text-ink">Cutoffs are an outcome, not an input.</strong> When applicants
          accept seats in a round, the score of the last admitted candidate (per category) becomes that
          round's closing cutoff. Higher demand and fewer seats push it up; a softer score distribution
          pulls it down.
        </p>
      </Section>

      <Section id="rounds" heading="Why cutoffs move across rounds">
        <p>
          <strong className="text-ink">Later rounds usually close lower.</strong> As top scorers lock
          seats early, subsequent CSAS rounds and spot rounds often admit at lower scores. Popular
          college–course combinations are the exception and can stay competitive throughout. Plan your
          preference order around this — see{" "}
          <a href="/cuet/admission/freeze-vs-upgrade" className="text-brand hover:underline">freeze vs upgrade</a>.
        </p>
      </Section>

      <Section id="category" heading="Category-wise cutoffs">
        <p>
          <strong className="text-ink">Each category has its own cutoff.</strong> General, OBC-NCL, SC,
          ST, EWS and PwBD close at different scores for the same college–course. Browse the figures on
          the <a href="/cuet/cutoff/dataset" className="text-brand hover:underline">CUET cutoff dataset</a>, or
          estimate your fit with the <a href="/cuet/results/college-predictor" className="text-brand hover:underline">college predictor</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
