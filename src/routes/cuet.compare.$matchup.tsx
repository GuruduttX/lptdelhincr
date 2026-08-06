import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { getCompareExam } from "@/lib/programmatic";
import type { FAQItem } from "@/components/seo/FAQ";

// Curated cuet-vs-[exam] generator. "cuet-vs-ipmat" is served by its own
// explicit route; this handles other curated exams (e.g. CLAT). Gated: an
// unknown matchup 404s (no thin spawn).
export const Route = createFileRoute("/cuet/compare/$matchup")({
  loader: ({ params }) => {
    if (!params.matchup.startsWith("cuet-vs-")) throw notFound();
    const exam = getCompareExam(params.matchup.slice("cuet-vs-".length));
    if (!exam) throw notFound();
    return { exam };
  },
  head: ({ params }) => {
    const exam = getCompareExam(params.matchup.replace("cuet-vs-", ""));
    const label = exam?.label ?? "";
    return pageHead({
      title: `CUET vs ${label}: Which to Choose | ${BRAND_SHORT}`,
      description: `CUET vs ${label} compared — what each is for, who should choose which, and where to go next. A clear, factual comparison for UG aspirants.`,
      path: `/cuet/compare/${params.matchup}`,
      ogType: "article",
    });
  },
  component: Matchup,
});

function Matchup() {
  const { exam } = Route.useLoaderData();
  const faqs: FAQItem[] = [
    { q: `Can I prepare for both CUET and ${exam.label}?`, a: <>Some foundational skills overlap, but {exam.label} and CUET target different degrees and have different patterns, so each needs its own focused practice. Decide your primary goal early so your timetable prioritises the route you actually want.</> },
    { q: `Is ${exam.label} harder than CUET?`, a: <>"Harder" depends on the aspirant and the target. They assess different things for different degrees, so compare by fit — the degree and career you want — rather than by perceived difficulty.</> },
  ];
  return (
    <ContentPage
      canonicalPath={`/cuet/compare/cuet-vs-${exam.slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Compare", item: "/cuet/compare" },
        { name: `CUET vs ${exam.label}` },
      ]}
      title={`CUET vs ${exam.label}: Which Should You Choose?`}
      introLead="Direct answer:"
      intro={
        <>
          CUET is the common test for broad undergraduate admission to central and participating
          universities; {exam.label} is the entrance for law programmes (CLAT). They lead to different
          degrees, so the right choice depends on whether you want a general UG degree or a law-focused
          path — not on which exam looks easier.
        </>
      }
      toc={[{ id: "table", label: "Side by side" }, { id: "next", label: "Where to go next" }]}
      ctaMessage={`Hi LPT Delhi-NCR, help me choose between CUET and ${exam.label}`}
      faqs={faqs}
      schema={[articleSchema({ headline: `CUET vs ${exam.label}: Which Should You Choose?`, dateModified: LAST_UPDATED })]}
    >
      <Section id="table" heading={`CUET vs ${exam.label}, side by side`}>
        <ComparisonTable
          caption={`CUET vs ${exam.label}`}
          date={LAST_UPDATED}
          source="LPT Delhi-NCR (verify exam specifics officially)"
          columns={[
            { key: "dim", header: "Dimension" },
            { key: "cuet", header: "CUET" },
            { key: "x", header: exam.label },
          ]}
          rows={[
            { dim: "Leads to", cuet: "Broad UG degrees at central universities", x: "Law programmes (e.g. 5-year integrated LLB)" },
            { dim: "Best for", cuet: "General UG choice across streams", x: "A focused law career path" },
            { dim: "Admission", cuet: "University process (e.g. DU CSAS)", x: "Participating law universities' process" },
          ]}
        />
      </Section>

      <Section id="next" heading="Where to go next">
        <p>
          <strong className="text-ink">Leaning CUET?</strong> Start at the{" "}
          <a href="/cuet" className="text-brand hover:underline">CUET hub</a>, build a{" "}
          <a href="/cuet/study-plan/6-month" className="text-brand hover:underline">study plan</a>, and explore{" "}
          <a href="/courses/cuet" className="text-brand hover:underline">CUET coaching</a>. {exam.label} is a separate
          law-admission route; verify its details on its official source.
        </p>
      </Section>
    </ContentPage>
  );
}
