import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { getInstitute, ipmatComposite } from "@/data/ipmat";
import { Tbd } from "@/components/lpt/shared";
import type { FAQItem } from "@/components/seo/FAQ";

export const Route = createFileRoute("/ipmat/composite-score/$institute")({
  loader: ({ params }) => {
    const institute = getInstitute(params.institute);
    if (!institute) throw notFound();
    return { institute };
  },
  head: ({ params }) => {
    const inst = getInstitute(params.institute);
    const short = inst?.short ?? "IPMAT";
    return pageHead({
      title: `${short} IPM Composite Score Explained | ${BRAND_SHORT}`,
      description: `How ${short} computes its IPM composite score from your IPMAT aptitude result, Personal Interview and academics. Verify weights officially.`,
      path: `/ipmat/composite-score/${params.institute}`,
      ogType: "article",
    });
  },
  component: CompositeScore,
});

function CompositeScore() {
  const { institute } = Route.useLoaderData();
  const composite = ipmatComposite[institute.slug];

  const faqs: FAQItem[] = [
    {
      q: `How is the ${institute.short} IPM composite score calculated?`,
      a: <>{institute.name} combines your IPMAT aptitude score with the Personal Interview and academic/diversity factors into a composite. The exact weights vary by cycle and are set by the institute — verify them on the official admission policy before relying on any split.</>,
    },
    {
      q: `Does a high IPMAT score guarantee selection at ${institute.short}?`,
      a: <>No. A high aptitude score earns the interview call, but the final offer weighs the full composite, including the Personal Interview. Prepare for the PI as seriously as the written test.</>,
    },
  ];

  return (
    <ContentPage
      canonicalPath={`/ipmat/composite-score/${institute.slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: "Cutoffs", item: "/ipmat/cutoff" },
        { name: `${institute.short} composite` },
      ]}
      title={`${institute.name}: Composite Score Explained`}
      introLead="Direct answer:"
      intro={
        <>
          {institute.name} selects on a <strong>composite score</strong>, not the IPMAT result alone:
          your aptitude score is combined with the Personal Interview and academic factors. The exact
          weighting varies by cycle — the components below are structural; verify the current weights on
          the official source.
        </>
      }
      toc={[{ id: "components", label: "Composite components" }]}
      ctaMessage={`Hi LPT Delhi-NCR, explain the ${institute.short} composite score`}
      faqs={faqs}
      schema={[articleSchema({ headline: `${institute.name}: Composite Score Explained`, dateModified: LAST_UPDATED })]}
    >
      <Section id="components" heading="Composite components">
        <p>
          <strong className="text-ink">Structure (weights to be verified):</strong> {composite.notes}
        </p>
        <ComparisonTable
          caption={`${institute.name} composite components`}
          date="pending verification"
          source="official institute admission policy"
          illustrative
          columns={[
            { key: "component", header: "Component" },
            { key: "weight", header: "Weight" },
          ]}
          rows={composite.components.map((c) => ({
            component: c.label,
            weight: c.weight == null ? <Tbd label="weight %" /> : `${c.weight}%`,
          }))}
        />
        <p className="text-sm">
          See overall <a href="/ipmat/cutoff" className="text-brand hover:underline">cutoffs</a>, aim for a{" "}
          <a href="/ipmat/safe-score" className="text-brand hover:underline">safe score</a>, or start{" "}
          <a href="/courses/ipmat" className="text-brand hover:underline">IPMAT coaching</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
