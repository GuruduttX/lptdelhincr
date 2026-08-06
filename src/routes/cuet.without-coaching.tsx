import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Can I crack CUET without coaching?", a: <>Yes, if you're disciplined. The syllabus is Class 12 aligned, so good material plus a consistent plan and regular mocks can get you there. Coaching mainly adds structure, doubt-solving and accountability — useful if you struggle to self-direct, not mandatory.</> },
  { q: "What do I need for CUET self-study?", a: <>A clear college–course–subject map, reliable material per subject, a full-length mock series, and a weekly routine with error review. Self-discipline and honest mock analysis matter more than the number of resources you collect.</> },
];

export const Route = createFileRoute("/cuet/without-coaching")({
  head: () =>
    pageHead({
      title: `Can You Crack CUET Without Coaching? | ${BRAND_SHORT}`,
      description:
        "Cracking CUET without coaching is realistic for disciplined self-studiers — the syllabus is Class 12 aligned. What you need, and when coaching helps.",
      path: "/cuet/without-coaching",
      ogType: "article",
    }),
  component: WithoutCoaching,
});

function WithoutCoaching() {
  return (
    <ContentPage
      canonicalPath="/cuet/without-coaching"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Without coaching" }]}
      title="Can You Crack CUET Without Coaching?"
      introLead="Direct answer:"
      intro={
        <>
          Yes — disciplined self-study can crack CUET, because the syllabus is Class 12 aligned and good
          material plus consistent mocks go a long way. Coaching mainly adds structure, doubt-solving and
          accountability. Choose based on how well you study independently, not on pressure or fear of
          missing out.
        </>
      }
      toc={[{ id: "self", label: "Self-study, done right" }, { id: "when", label: "When coaching helps" }]}
      ctaMessage="Hi LPT Delhi-NCR, should I self-study or join coaching for CUET?"
      faqs={faqs}
      schema={[articleSchema({ headline: "Can You Crack CUET Without Coaching?", dateModified: LAST_UPDATED })]}
    >
      <Section id="self" heading="Self-study, done right">
        <ul className="list-disc space-y-2 pl-5">
          <li>Fix your <a href="/cuet/subject-rules" className="text-brand hover:underline">college–course–subject map</a> first.</li>
          <li>Follow a <a href="/cuet/study-plan/6-month" className="text-brand hover:underline">phased plan</a> with weekly targets.</li>
          <li>Take full-length mocks and review every error — not just attempt them.</li>
        </ul>
      </Section>
      <Section id="when" heading="When coaching helps">
        <p>
          <strong className="text-ink">If structure and accountability are your gap</strong>, coaching's
          schedule, doubt-solving and benchmarking add value. See{" "}
          <a href="/courses/cuet" className="text-brand hover:underline">CUET coaching</a> — and decide honestly.
        </p>
      </Section>
    </ContentPage>
  );
}
