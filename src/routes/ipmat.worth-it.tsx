import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Is doing IPMAT and the 5-year IPM worth it?", a: <>It's worth it if you're confident about a management career, can clear IPMAT, and value an integrated route at an IIM that starts earlier and removes a later entrance. It's a five-year commitment, so weigh verified fees against verified outcomes — not hype.</> },
  { q: "What are the downsides of the IPM route?", a: <>It asks you to commit to management at 17–18, it's a longer financial commitment than a standalone bachelor's, and it's competitive to enter. If you're unsure about management, a flexible undergraduate path may suit you better. Decide on fit, honestly.</> },
];

export const Route = createFileRoute("/ipmat/worth-it")({
  head: () =>
    pageHead({
      title: `Is IPMAT & the IPM Worth It? | ${BRAND_SHORT}`,
      description:
        "Is IPMAT and the 5-year IPM worth it? An honest look at the upsides (early start, integrated route) and trade-offs (commitment, cost). Decide on fit.",
      path: "/ipmat/worth-it",
      ogType: "article",
    }),
  component: WorthIt,
});

function WorthIt() {
  return (
    <ContentPage
      canonicalPath="/ipmat/worth-it"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Worth it?" }]}
      title="Is IPMAT & the 5-Year IPM Worth It?"
      introLead="Direct answer:"
      intro={
        <>
          The IPM is worth it if you're confident about a management career, can clear IPMAT, and value
          an integrated IIM route that starts earlier and removes a later entrance. It's a five-year
          commitment, so weigh verified fees against verified outcomes — and be honest about your
          certainty.
        </>
      }
      toc={[{ id: "tradeoffs", label: "Upsides vs trade-offs" }, { id: "decide", label: "How to decide" }]}
      ctaMessage="Hi LPT Delhi-NCR, is the IPM route right for me?"
      faqs={faqs}
      schema={[articleSchema({ headline: "Is IPMAT & the 5-Year IPM Worth It?", dateModified: LAST_UPDATED })]}
    >
      <Section id="tradeoffs" heading="Upsides vs trade-offs">
        <ComparisonTable
          caption="IPM route — upsides vs trade-offs"
          date={LAST_UPDATED}
          source="LPT Delhi-NCR"
          columns={[
            { key: "dim", header: "Factor" },
            { key: "up", header: "Upside" },
            { key: "down", header: "Trade-off" },
          ]}
          rows={[
            { dim: "Timing", up: "Start management early, after Class 12", down: "Commit to management young" },
            { dim: "Route", up: "Integrated; no separate later entrance", down: "Longer single commitment" },
            { dim: "Brand", up: "IIM ecosystem from year one", down: "Competitive to enter (IPMAT)" },
            { dim: "Cost", up: "One programme, planned", down: "Five-year financial outlay" },
          ]}
        />
      </Section>

      <Section id="decide" heading="How to decide">
        <p>
          <strong className="text-ink">Certainty is the deciding factor.</strong> If you're sure about
          management, weigh <a href="/ipmat/roi" className="text-brand hover:underline">ROI</a> and{" "}
          <a href="/ipmat/programme/structure" className="text-brand hover:underline">structure</a>; if not,{" "}
          <a href="/ipmat/compare/ipm-vs-bba" className="text-brand hover:underline">IPM vs BBA</a> helps you see the
          flexible alternative.
        </p>
      </Section>
    </ContentPage>
  );
}
