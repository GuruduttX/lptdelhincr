import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Does CUET have negative marking?", a: <>CUET (UG) typically applies a marking scheme with marks for correct answers and a penalty for wrong ones, with no penalty for unattempted questions. The exact marks-per-question and penalty are fixed per cycle — confirm the current scheme on cuet.nta.nic.in before exam day.</> },
  { q: "Are unattempted CUET questions penalised?", a: <>Generally no — unattempted questions usually carry no penalty, while wrong answers do under the standard scheme. That makes selective attempting sensible: skip a question only when you can't eliminate options. Verify the current rule officially.</> },
];

export const Route = createFileRoute("/cuet/marking")({
  head: () =>
    pageHead({
      title: `CUET Marking Scheme & Negative Marking | ${BRAND_SHORT}`,
      description:
        "CUET (UG) marking — marks for correct answers, a penalty for wrong ones, no penalty for unattempted. Verify the exact scheme each cycle on cuet.nta.nic.in.",
      path: "/cuet/marking",
      ogType: "article",
    }),
  component: Marking,
});

function Marking() {
  return (
    <ContentPage
      canonicalPath="/cuet/marking"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Marking" }]}
      title="CUET (UG) Marking Scheme"
      introLead="Direct answer:"
      intro={
        <>
          CUET (UG) awards marks for each correct answer and applies a penalty for wrong answers, with
          no penalty for unattempted questions, under the standard scheme. Because the exact marks and
          penalty are set per cycle, confirm them on cuet.nta.nic.in before you finalise your attempt
          strategy.
        </>
      }
      toc={[{ id: "scheme", label: "The scheme" }, { id: "strategy", label: "Attempt strategy" }]}
      ctaMessage="Hi LPT Delhi-NCR, explain CUET marking and strategy"
      faqs={faqs}
      schema={[articleSchema({ headline: "CUET (UG) Marking Scheme", dateModified: LAST_UPDATED })]}
    >
      <Section id="scheme" heading="How CUET marking works">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-ink">Correct answer:</strong> awarded marks (value set per cycle).</li>
          <li><strong className="text-ink">Wrong answer:</strong> a penalty (negative marking) under the standard scheme.</li>
          <li><strong className="text-ink">Unattempted:</strong> usually no penalty.</li>
        </ul>
      </Section>

      <Section id="strategy" heading="Attempt strategy under negative marking">
        <p>
          <strong className="text-ink">Eliminate before you guess.</strong> With a penalty for wrong
          answers, attempt confidently when you can rule out options, and skip when you genuinely can't.
          Practise this judgement in mocks — see the{" "}
          <a href="/cuet/exam-pattern" className="text-brand hover:underline">exam pattern</a> and a{" "}
          <a href="/cuet/study-plan/3-month" className="text-brand hover:underline">study plan</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
