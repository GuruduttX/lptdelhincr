import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { getStudyDuration } from "@/lib/programmatic";
import type { FAQItem } from "@/components/seo/FAQ";

export const Route = createFileRoute("/cuet/study-plan/$duration")({
  loader: ({ params }) => {
    const duration = getStudyDuration(params.duration);
    if (!duration) throw notFound();
    return { duration };
  },
  head: ({ params }) => {
    const d = getStudyDuration(params.duration);
    const label = d?.label ?? "CUET";
    return pageHead({
      title: `${label} CUET Study Plan | ${BRAND_SHORT}`,
      description: `A ${label.toLowerCase()} CUET study plan — phase-by-phase: build basics, drill PYQs, then mocks and revision. Adapt to your subjects and target.`,
      path: `/cuet/study-plan/${params.duration}`,
      ogType: "article",
    });
  },
  component: StudyPlan,
});

function StudyPlan() {
  const { duration } = Route.useLoaderData();
  const faqs: FAQItem[] = [
    { q: `Is ${duration.label.toLowerCase()} enough to prepare for CUET?`, a: <>It can be, with a focused plan. Prioritise high-weightage topics, practise the on-screen format with regular mocks, and review errors. A {duration.label.toLowerCase()} window favours disciplined coverage over chasing every topic — depth on what matters beats breadth.</> },
    { q: "Should I follow domain subjects or the General Test first?", a: <>Lead with the subjects that decide your target college–course eligibility, then layer the General Test. Keep language practice steady throughout. Your subject combination — not a generic order — should shape the plan.</> },
  ];
  return (
    <ContentPage
      canonicalPath={`/cuet/study-plan/${duration.slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Syllabus", item: "/cuet/syllabus" },
        { name: `${duration.label} plan` },
      ]}
      title={`${duration.label} CUET Study Plan`}
      introLead="Direct answer:"
      intro={
        <>
          A {duration.label.toLowerCase()} CUET plan works in three phases: build subject basics, drill
          previous-year questions topic-by-topic, then shift to full-length mocks and revision. Weight
          your time toward the subjects that decide your target college–course eligibility.
        </>
      }
      toc={[{ id: "phases", label: "The phased plan" }, { id: "tips", label: "Make it stick" }]}
      ctaMessage={`Hi LPT Delhi-NCR, I want a ${duration.label} CUET plan`}
      faqs={faqs}
      schema={[articleSchema({ headline: `${duration.label} CUET Study Plan`, dateModified: LAST_UPDATED })]}
    >
      <Section id="phases" heading="The phased plan">
        <p>
          <strong className="text-ink">Three phases, scaled to {duration.label.toLowerCase()}.</strong>
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li><strong className="text-ink">Foundation:</strong> cover Class 12 concepts for your chosen subjects + General Test basics.</li>
          <li><strong className="text-ink">Practice:</strong> drill PYQs and topic tests; track accuracy and speed per topic.</li>
          <li><strong className="text-ink">Mocks & revision:</strong> full-length, on-screen mocks; review every error and revise weak areas.</li>
        </ol>
      </Section>

      <Section id="tips" heading="Make it stick">
        <p>
          Decide subjects against the <a href="/cuet/syllabus" className="text-brand hover:underline">CUET syllabus</a>,
          learn the <a href="/cuet/exam-pattern" className="text-brand hover:underline">exam pattern</a>, and benchmark with mocks.
          Want structure and mentor support? Explore <a href="/courses/cuet" className="text-brand hover:underline">CUET coaching</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
