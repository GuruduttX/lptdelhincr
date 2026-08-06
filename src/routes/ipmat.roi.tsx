import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { fees, isFeePublishable } from "@/data/fees";
import { getInstitute } from "@/data/ipmat";
import { Tbd } from "@/components/lpt/shared";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Is the 5-year IPM worth the fee?", a: <>It depends on your certainty about a management career and the institute's outcomes. The IPM front-loads management training and saves a separate entrance later, but it's a five-year financial commitment. Weigh verified fees against verified placement outcomes — never against inflated claims.</> },
  { q: "How should I think about IPM return on investment?", a: <>Compare the total programme fee against realistic, officially-reported outcomes for that institute, and factor in starting your management path earlier. Treat any ROI figure as an estimate built from verified inputs; we never publish fabricated salary or placement numbers.</> },
];

export const Route = createFileRoute("/ipmat/roi")({
  head: () =>
    pageHead({
      title: `Is the IPM Worth It? Fees & ROI | ${BRAND_SHORT}`,
      description:
        "IPM return on investment — weigh the 5-year programme fee against verified outcomes and an earlier start. Verified inputs only, never inflated.",
      path: "/ipmat/roi",
      ogType: "article",
    }),
  component: Roi,
});

function Roi() {
  return (
    <ContentPage
      canonicalPath="/ipmat/roi"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "ROI" }]}
      title="Is the 5-Year IPM Worth It? Fees & ROI"
      introLead="Direct answer:"
      intro={
        <>
          The IPM's value depends on your commitment to a management career and the institute's
          verified outcomes. It front-loads management training and removes a later entrance, but it's a
          five-year financial commitment — so weigh the total fee against officially-reported outcomes,
          never against inflated claims.
        </>
      }
      toc={[{ id: "fees", label: "Programme fees" }, { id: "framing", label: "How to weigh ROI" }]}
      ctaMessage="Hi LPT Delhi-NCR, help me weigh IPM fees vs outcomes"
      faqs={faqs}
      schema={[articleSchema({ headline: "Is the 5-Year IPM Worth It? Fees & ROI", dateModified: LAST_UPDATED })]}
    >
      <Section id="fees" heading="Programme fees">
        <ComparisonTable
          caption="IPM programme fees"
          date="pending verification"
          source="official institute sources"
          illustrative={!fees.some(isFeePublishable)}
          columns={[
            { key: "institute", header: "Institute" },
            { key: "duration", header: "Duration" },
            { key: "fee", header: "Total fee" },
          ]}
          rows={fees.map((f) => ({
            institute: getInstitute(f.institute)?.short ?? f.institute,
            duration: f.duration,
            fee: isFeePublishable(f) ? f.totalFee : <Tbd label="verify fee" />,
          }))}
        />
      </Section>

      <Section id="framing" heading="How to weigh ROI honestly">
        <p>
          <strong className="text-ink">Verified inputs only.</strong> Compare total fee against
          officially-reported outcomes for that institute and the value of starting earlier. See{" "}
          <a href="/ipmat/programme/structure" className="text-brand hover:underline">programme structure</a> and{" "}
          <a href="/ipmat/worth-it" className="text-brand hover:underline">is it worth it</a>. We don't publish
          fabricated salary figures.
        </p>
      </Section>
    </ContentPage>
  );
}
