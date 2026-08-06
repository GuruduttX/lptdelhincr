import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Should I do IPM or a regular BBA?", a: <>Choose IPM if you're confident about management, can clear IPMAT, and want an integrated five-year programme at an IIM. Choose a regular BBA for a shorter, more flexible undergraduate path with wider later options. The right pick is about certainty and fit, not prestige.</> },
  { q: "Is IPM better than BBA for placements?", a: <>Outcomes depend on the specific institute, not the format label. A top IIM IPM and a strong BBA college can both place well. Compare verified, official outcomes for the exact institutes you're considering rather than format stereotypes.</> },
];

export const Route = createFileRoute("/ipmat/compare/ipm-vs-bba")({
  head: () =>
    pageHead({
      title: `IPM vs BBA: Which to Choose | ${BRAND_SHORT}`,
      description:
        "IPM vs BBA compared — integrated 5-year management at an IIM vs a 3-year bachelor's. Degree, duration, flexibility and who each suits. Choose by fit.",
      path: "/ipmat/compare/ipm-vs-bba",
      ogType: "article",
    }),
  component: IpmVsBba,
});

function IpmVsBba() {
  return (
    <ContentPage
      canonicalPath="/ipmat/compare/ipm-vs-bba"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: "Compare", item: "/ipmat/compare" },
        { name: "IPM vs BBA" },
      ]}
      title="IPM vs BBA: Which Should You Choose?"
      introLead="Direct answer:"
      intro={
        <>
          IPM is a five-year integrated management programme at an IIM (entered via IPMAT after Class
          12); BBA is a three-year undergraduate degree. Choose IPM if you're certain about management
          and can clear IPMAT; choose BBA for a shorter, more flexible path. Decide by certainty and
          fit, not prestige.
        </>
      }
      toc={[{ id: "table", label: "Side by side" }, { id: "next", label: "Where to go next" }]}
      ctaMessage="Hi LPT Delhi-NCR, help me choose between IPM and BBA"
      faqs={faqs}
      schema={[articleSchema({ headline: "IPM vs BBA: Which Should You Choose?", dateModified: LAST_UPDATED })]}
    >
      <Section id="table" heading="IPM vs BBA, side by side">
        <ComparisonTable
          caption="IPM vs BBA"
          date={LAST_UPDATED}
          source="LPT Delhi-NCR"
          columns={[
            { key: "dim", header: "Dimension" },
            { key: "ipm", header: "IPM" },
            { key: "bba", header: "BBA" },
          ]}
          rows={[
            { dim: "Duration", ipm: "5 years (integrated UG + PG)", bba: "3 years (UG)" },
            { dim: "Entry", ipm: "IPMAT after Class 12", bba: "Varies by college/CUET" },
            { dim: "Best for", ipm: "Certain about management, want an IIM", bba: "Flexibility, broader later options" },
            { dim: "Exit", ipm: "Often an exit option after UG phase", bba: "Bachelor's on completion" },
          ]}
        />
      </Section>

      <Section id="next" heading="Where to go next">
        <p>
          Leaning IPM? See the <a href="/ipmat" className="text-brand hover:underline">IPMAT hub</a>,{" "}
          <a href="/ipmat/programme/structure" className="text-brand hover:underline">programme structure</a> and{" "}
          <a href="/courses/ipmat" className="text-brand hover:underline">IPMAT coaching</a>. Considering a BBA via CUET?
          See <a href="/courses/cuet" className="text-brand hover:underline">CUET coaching</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
