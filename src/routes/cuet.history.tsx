import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Why was CUET introduced?", a: <>CUET was introduced to create a common, standardised entrance for undergraduate admission to central and participating universities, reducing reliance on widely varying board percentages and multiple separate entrance tests. It aims for a single, comparable score that many universities can use.</> },
  { q: "Has the CUET pattern changed since it began?", a: <>Yes. Since its introduction CUET has seen adjustments to its format, mode and logistics across cycles. Because specifics evolve year to year, always confirm the current pattern and rules on cuet.nta.nic.in rather than relying on an older cycle's details.</> },
];

export const Route = createFileRoute("/cuet/history")({
  head: () =>
    pageHead({
      title: `CUET History & Background | ${BRAND_SHORT}`,
      description:
        "CUET history — why a common UG entrance was introduced, what problem it set out to solve, and how it has evolved. Verify current specifics officially.",
      path: "/cuet/history",
      ogType: "article",
    }),
  component: History,
});

function History() {
  return (
    <ContentPage
      canonicalPath="/cuet/history"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "History" }]}
      title="CUET History & Background"
      introLead="Direct answer:"
      intro={
        <>
          CUET was introduced to standardise undergraduate admission across central and participating
          universities with a single, comparable entrance score, reducing dependence on varying board
          percentages and multiple separate tests. Its format and logistics have evolved across cycles,
          so always confirm the current rules officially.
        </>
      }
      toc={[{ id: "why", label: "Why it exists" }, { id: "evolution", label: "How it evolved" }]}
      ctaMessage="Hi LPT Delhi-NCR, explain CUET's background"
      faqs={faqs}
      schema={[articleSchema({ headline: "CUET History & Background", dateModified: LAST_UPDATED })]}
    >
      <Section id="why" heading="Why CUET exists">
        <p>
          <strong className="text-ink">A single comparable score.</strong> CUET was created so that
          many universities could admit on one standardised test rather than divergent board marks or
          a patchwork of separate entrances — improving comparability and access.
        </p>
      </Section>
      <Section id="evolution" heading="How it has evolved">
        <p>
          <strong className="text-ink">Specifics change yearly.</strong> Format, mode and logistics have
          been adjusted across cycles. Track changes on our <a href="/cuet/changes" className="text-brand hover:underline">CUET changes</a>{" "}
          page and the <a href="/cuet/policy" className="text-brand hover:underline">policy</a> overview, and verify on cuet.nta.nic.in.
        </p>
      </Section>
    </ContentPage>
  );
}
