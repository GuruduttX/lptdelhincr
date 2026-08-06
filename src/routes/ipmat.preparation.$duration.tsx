import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { getStudyDuration } from "@/lib/programmatic";
import type { FAQItem } from "@/components/seo/FAQ";

export const Route = createFileRoute("/ipmat/preparation/$duration")({
  loader: ({ params }) => {
    const duration = getStudyDuration(params.duration);
    if (!duration) throw notFound();
    return { duration };
  },
  head: ({ params }) => {
    const d = getStudyDuration(params.duration);
    const label = d?.label ?? "IPMAT";
    return pageHead({
      title: `${label} IPMAT Preparation Plan | ${BRAND_SHORT}`,
      description: `A ${label.toLowerCase()} IPMAT preparation plan — phase-by-phase across Quant, Verbal and Logical Reasoning, with mocks and section strategy.`,
      path: `/ipmat/preparation/${params.duration}`,
      ogType: "article",
    });
  },
  component: Preparation,
});

function Preparation() {
  const { duration } = Route.useLoaderData();
  const faqs: FAQItem[] = [
    { q: `Can I crack IPMAT in ${duration.label.toLowerCase()}?`, a: <>With a focused plan, yes. Prioritise Quant fundamentals and Verbal accuracy (plus Logical Reasoning for Rohtak), then move to timed mocks and section strategy. A {duration.label.toLowerCase()} window rewards consistency and error review over last-minute cramming.</> },
  ];
  return (
    <ContentPage
      canonicalPath={`/ipmat/preparation/${duration.slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: "Syllabus", item: "/ipmat/syllabus" },
        { name: `${duration.label} plan` },
      ]}
      title={`${duration.label} IPMAT Preparation Plan`}
      introLead="Direct answer:"
      intro={<>A {duration.label.toLowerCase()} IPMAT plan runs in three phases: build Quant and Verbal fundamentals (plus Logical Reasoning for Rohtak), drill topic tests, then shift to timed full-length mocks with section strategy and error review.</>}
      toc={[{ id: "phases", label: "The phased plan" }]}
      ctaMessage={`Hi LPT Delhi-NCR, I want a ${duration.label} IPMAT plan`}
      faqs={faqs}
      schema={[articleSchema({ headline: `${duration.label} IPMAT Preparation Plan`, dateModified: LAST_UPDATED })]}
    >
      <Section id="phases" heading="The phased plan">
        <ol className="list-decimal space-y-2 pl-5">
          <li><strong className="text-ink">Foundation:</strong> Quant fundamentals + Verbal accuracy (and Logical Reasoning for Rohtak).</li>
          <li><strong className="text-ink">Practice:</strong> topic tests and PYQs; track accuracy and speed.</li>
          <li><strong className="text-ink">Mocks:</strong> timed full-length mocks with <a href="/ipmat/section-strategy/quantitative-aptitude" className="text-brand hover:underline">section strategy</a> and error review.</li>
        </ol>
        <p className="text-sm">
          Pair with the <a href="/ipmat/syllabus" className="text-brand hover:underline">syllabus</a> and{" "}
          <a href="/courses/ipmat" className="text-brand hover:underline">IPMAT coaching</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
