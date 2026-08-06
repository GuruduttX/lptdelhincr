import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Is CUET harder than board exams?", a: <>They test different things. Boards reward thorough syllabus coverage; CUET adds speed, an objective format and a General Test, and is competitive because of cutoffs for popular colleges. Many find the content familiar but the time pressure and competition demanding.</> },
  { q: "What makes CUET feel difficult?", a: <>Mostly the competition and pacing, not exotic content. The syllabus is Class 12 aligned, but the cutoff race for sought-after college–course combinations raises the bar. Mocks that build speed and accuracy are what make it feel manageable.</> },
];

export const Route = createFileRoute("/cuet/is-cuet-hard")({
  head: () =>
    pageHead({
      title: `Is CUET Hard? An Honest Take | ${BRAND_SHORT}`,
      description:
        "Is CUET hard? It's competitive, not conceptually exotic — Class 12 content under time pressure, with cutoffs driving the difficulty.",
      path: "/cuet/is-cuet-hard",
      ogType: "article",
    }),
  component: IsCuetHard,
});

function IsCuetHard() {
  return (
    <ContentPage
      canonicalPath="/cuet/is-cuet-hard"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Is CUET hard?" }]}
      title="Is CUET Hard? An Honest Take"
      introLead="Direct answer:"
      intro={
        <>
          CUET is competitive rather than conceptually exotic. The syllabus is broadly Class 12 aligned,
          so the difficulty comes from speed, the objective format and the cutoff race for popular
          colleges — not trick questions. With a structured plan and regular mocks, most sincere
          students reach a strong, competitive score.
        </>
      }
      toc={[{ id: "why", label: "Why it feels hard" }, { id: "manage", label: "How to make it manageable" }]}
      ctaMessage="Hi LPT Delhi-NCR, help me plan for CUET"
      faqs={faqs}
      schema={[articleSchema({ headline: "Is CUET Hard? An Honest Take", dateModified: LAST_UPDATED })]}
    >
      <Section id="why" heading="Why CUET feels hard">
        <p>
          <strong className="text-ink">Competition, not content.</strong> The bar is set by demand for
          popular college–course combinations and by exam-day pacing — see how{" "}
          <a href="/cuet/cutoff" className="text-brand hover:underline">cutoffs</a> work.
        </p>
      </Section>
      <Section id="manage" heading="How to make it manageable">
        <p>
          <strong className="text-ink">Plan + mocks.</strong> Prioritise high-weightage topics, build
          speed with full-length mocks, and review errors. Start with a{" "}
          <a href="/cuet/study-plan/6-month" className="text-brand hover:underline">study plan</a> or consider{" "}
          <a href="/courses/cuet" className="text-brand hover:underline">coaching</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
