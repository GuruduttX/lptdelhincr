import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Is IPMAT harder than CUET?", a: <>They test different things, so "harder" depends on you. IPMAT's quantitative and verbal sections are aimed at management aptitude with negative marking; CUET spans Class 12 domain subjects plus a general test. Pick by the degree you want, then prepare for that exam's specific demands.</> },
  { q: "Can one student target both CUET and IPMAT?", a: <>Yes. Core quantitative and verbal preparation overlaps, so a strong foundation serves both. Beyond that, each needs exam-specific practice on its own pattern and marking. Set a primary target so your schedule prioritises the exam that matches your preferred degree.</> },
  { q: "Which leads to a management career faster?", a: <>IPMAT leads directly into a five-year integrated management programme at an IIM straight after Class 12. CUET leads to a general undergraduate degree, after which you'd pursue management separately. If early, focused management entry is the goal, IPMAT is the more direct route.</> },
];

export const Route = createFileRoute("/cuet/compare/cuet-vs-ipmat")({
  head: () =>
    pageHead({
      title: `CUET vs IPMAT: Which to Choose | ${BRAND_SHORT}`,
      description:
        "CUET vs IPMAT compared — degree type, exam pattern, marking and who each suits. A clear recommendation, then where to go next for your chosen route.",
      path: "/cuet/compare/cuet-vs-ipmat",
      ogType: "article",
    }),
  component: CuetVsIpmat,
});

function CuetVsIpmat() {
  return (
    <ContentPage
      canonicalPath="/cuet/compare/cuet-vs-ipmat"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Compare", item: "/cuet/compare" },
        { name: "CUET vs IPMAT" },
      ]}
      title="CUET vs IPMAT: Which Should You Choose?"
      introLead="Direct answer:"
      intro={
        <>
          Choose <strong>CUET</strong> for a broad undergraduate degree (economics, commerce,
          humanities, sciences) at a central university; choose <strong>IPMAT</strong> for a five-year
          integrated management programme at an IIM straight after Class 12. They lead to different
          degrees, so decide by the outcome you want — not by which looks "easier".
        </>
      }
      toc={[
        { id: "table", label: "Side by side" },
        { id: "who", label: "Who should choose which" },
        { id: "next", label: "Where to go next" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, help me decide between CUET and IPMAT"
      faqs={faqs}
      schema={[articleSchema({ headline: "CUET vs IPMAT: Which Should You Choose?", dateModified: LAST_UPDATED })]}
    >
      <Section id="table" heading="CUET vs IPMAT, side by side">
        <ComparisonTable
          caption="CUET vs IPMAT"
          date={LAST_UPDATED}
          source="LPT Delhi-NCR (verify exam specifics officially)"
          columns={[
            { key: "dim", header: "Dimension" },
            { key: "cuet", header: "CUET" },
            { key: "ipmat", header: "IPMAT" },
          ]}
          rows={[
            { dim: "Leads to", cuet: "UG degree at central universities", ipmat: "5-year integrated management (IPM) at an IIM" },
            { dim: "Best for", cuet: "Broad UG choice (eco/commerce/humanities/sciences)", ipmat: "Early, focused management entry after Class 12" },
            { dim: "Sections", cuet: "Domain subjects + General Test + languages", ipmat: "QA + Verbal (+ Logical Reasoning at Rohtak)" },
            { dim: "Negative marking", cuet: "Per official scheme", ipmat: "Yes (no negative on Indore QA-SA)" },
            { dim: "Admission", cuet: "University process (e.g. DU CSAS)", ipmat: "Aptitude + PI composite" },
          ]}
        />
      </Section>

      <Section id="who" heading="Who should choose which">
        <p>
          <strong className="text-ink">Pick CUET</strong> if you want flexibility in your undergraduate
          subject and college. <strong className="text-ink">Pick IPMAT</strong> if you're set on
          management and want a direct five-year IIM route. Many strong students can do either — the
          deciding factor is the degree you actually want in five years.
        </p>
      </Section>

      <Section id="next" heading="Where to go next">
        <p>
          <strong className="text-ink">Chose CUET?</strong> Start at the{" "}
          <a href="/cuet" className="text-brand hover:underline">CUET hub</a> and{" "}
          <a href="/courses/cuet" className="text-brand hover:underline">CUET coaching</a>.{" "}
          <strong className="text-ink">Chose IPMAT?</strong> Start at the{" "}
          <a href="/ipmat" className="text-brand hover:underline">IPMAT hub</a> and{" "}
          <a href="/courses/ipmat" className="text-brand hover:underline">IPMAT coaching</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
