import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { courseSchema } from "@/lib/schema";
import { BRAND_SHORT, canonical } from "@/config/site";
import { getIpmatSection } from "@/lib/programmatic";
import type { FAQItem } from "@/components/seo/FAQ";

const TOPICS: Record<string, string[]> = {
  "quantitative-aptitude": ["Arithmetic (percentages, ratios, averages, TSD)", "Algebra & numbers", "Data Interpretation", "Modern maths (P&C, probability)"],
  "verbal-ability": ["Reading Comprehension", "Grammar & usage", "Vocabulary", "Para-jumbles & sentence completion"],
  "logical-reasoning": ["Arrangements & puzzles", "Series & coding", "Logical deductions", "Data sufficiency"],
};

export const Route = createFileRoute("/ipmat/syllabus/$section")({
  loader: ({ params }) => {
    const section = getIpmatSection(params.section);
    if (!section) throw notFound();
    return { section };
  },
  head: ({ params }) => {
    const s = getIpmatSection(params.section);
    return pageHead({
      title: `IPMAT ${s?.label ?? "Section"} Syllabus | ${BRAND_SHORT}`,
      description: `IPMAT ${s?.label ?? "section"} syllabus — the key topic areas to master, with where they fit IIM Indore and Rohtak. Confirm specifics on the official source.`,
      path: `/ipmat/syllabus/${params.section}`,
    });
  },
  component: SectionSyllabus,
});

function SectionSyllabus() {
  const { section } = Route.useLoaderData();
  const topics = TOPICS[section.slug] ?? [];
  const faqs: FAQItem[] = [
    { q: `What topics are in IPMAT ${section.label}?`, a: <>{section.label} broadly covers {topics.slice(0, 3).join(", ")} and related areas. The exact weightage shifts year to year, so prioritise high-frequency topics and confirm the current scope on your target institute's official source.</> },
  ];
  return (
    <ContentPage
      canonicalPath={`/ipmat/syllabus/${section.slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: "Syllabus", item: "/ipmat/syllabus" },
        { name: section.label },
      ]}
      title={`IPMAT ${section.label} Syllabus`}
      introLead="Direct answer:"
      intro={<>The IPMAT {section.label} section centres on {topics.slice(0, 3).join(", ")} and related areas. Master the high-frequency topics first, then breadth. Exact weightage varies by cycle and institute — verify officially.</>}
      toc={[{ id: "topics", label: "Topic areas" }, { id: "strategy", label: "Strategy" }]}
      ctaMessage={`Hi LPT Delhi-NCR, help me with IPMAT ${section.label}`}
      faqs={faqs}
      schema={[courseSchema({ name: `IPMAT ${section.label} Syllabus`, description: `IPMAT ${section.label} topic areas and preparation.`, courseMode: "Blended", url: canonical(`/ipmat/syllabus/${section.slug}`) })]}
    >
      <Section id="topics" heading="Topic areas">
        <ul className="list-disc space-y-2 pl-5">
          {topics.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </Section>
      <Section id="strategy" heading="How to approach it">
        <p>
          See the <a href={`/ipmat/section-strategy/${section.slug}`} className="text-brand hover:underline">{section.label} test-day strategy</a>, the{" "}
          <a href="/ipmat/marking-scheme" className="text-brand hover:underline">marking scheme</a>, and a{" "}
          <a href="/ipmat/preparation/6-month" className="text-brand hover:underline">prep plan</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
