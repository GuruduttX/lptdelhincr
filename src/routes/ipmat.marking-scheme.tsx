import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { ipmatExam } from "@/data/ipmat";
import { ipmatFaqs } from "@/data/faqs";

// FLAGSHIP page (SOP C2). Article schema ONLY — no FAQPage / AggregateRating.
export const Route = createFileRoute("/ipmat/marking-scheme")({
  head: () =>
    pageHead({
      title: `IPMAT Marking Scheme & Negative Marking | ${BRAND_SHORT}`,
      description:
        "IPMAT marking: QA-SA has no negative marking, −1 elsewhere, 40-min sectional lock at Indore; Rohtak −1 all, no lock. The marking math that makes ranks.",
      path: "/ipmat/marking-scheme",
      ogType: "article",
    }),
  component: MarkingScheme,
});

function MarkingScheme() {
  return (
    <ContentPage
      canonicalPath="/ipmat/marking-scheme"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: "Marking scheme" },
      ]}
      title="IPMAT Marking Scheme & Negative Marking — Indore vs Rohtak"
      introLead="Direct answer:"
      intro={
        <>
          IPMAT uses different marking across its sections. At <strong>IIM Indore</strong>, the Quant
          Short-Answer section has <strong>no negative marking</strong>, while QA-MCQ and Verbal deduct
          −1 per wrong answer, under a 40-minute sectional lock. <strong>IIM Rohtak</strong> applies −1
          across all sections with no lock and adds Logical Reasoning. Verify against iimidr.ac.in /
          iimrohtak.ac.in for the current cycle.
        </>
      }
      toc={[
        { id: "exams", label: "Three exams at a glance" },
        { id: "indore", label: "Indore marking" },
        { id: "rohtak", label: "Rohtak marking" },
        { id: "math", label: "The marking math" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, coach me on IPMAT marking strategy"
      faqs={ipmatFaqs.filter((f) => f.cluster === "marking").map((f) => ({ q: f.q, a: f.a }))}
      schema={[articleSchema({ headline: "IPMAT Marking Scheme & Negative Marking — Indore vs Rohtak", dateModified: LAST_UPDATED })]}
    >
      <Section id="exams" heading="The three IPMAT exams at a glance">
        <ComparisonTable
          caption="IPMAT marking by exam"
          date="2026-cycle module"
          source="SOP module — re-verify before publishing"
          illustrative
          columns={[
            { key: "exam", header: "Exam" },
            { key: "qmt", header: "Questions / Marks / Time" },
            { key: "lock", header: "Sectional lock" },
            { key: "neg", header: "Negative marking" },
          ]}
          rows={ipmatExam.map((r) => ({
            exam: r.exam,
            qmt: r.questionsMarksTime,
            lock: r.sectionalLock,
            neg: r.negativeMarking,
          }))}
        />
      </Section>

      <Section id="indore" heading="Indore marking — where ranks are made">
        <p>
          <strong className="text-ink">QA-SA (type-in) has no negative marking</strong> — leaving any
          blank is a guaranteed loss versus a reasoned attempt, so attempt all of them. QA-MCQ and
          Verbal deduct −1, so guess only after eliminating at least one option. The 40-minute{" "}
          <a href="/ipmat/sectional-lock" className="text-brand hover:underline">sectional lock</a> means
          you cannot bank time between sections — pace per section, not overall.
        </p>
      </Section>

      <Section id="rohtak" heading="Rohtak marking">
        <p>
          <strong className="text-ink">Rohtak deducts −1 everywhere and has no sectional lock</strong>,
          so you control your own time across QA, VA and LR — which means the real risk is
          over-investing in one section. Sequence strength-first to bank a cushion before harder
          sections.
        </p>
      </Section>

      <Section id="math" heading="The marking math (strategy core)">
        <p>
          <strong className="text-ink">A blind 4-option guess under −1 has an expected value of
          (0.25×4) + (0.75×−1) = +0.25</strong> — barely positive and high-variance. Eliminating even
          one option shifts the odds decisively in your favour; that is the entire guessing strategy.
        </p>
        <p>
          On no-negative sections (Indore QA-SA), the math is simpler: a blank scores zero, a reasoned
          attempt has only upside — so never leave one blank. Build this instinct with{" "}
          <a href="/courses/ipmat" className="text-brand hover:underline">IPMAT coaching</a> and check your
          target via <a href="/ipmat/cutoff" className="text-brand hover:underline">cutoffs & composite</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
