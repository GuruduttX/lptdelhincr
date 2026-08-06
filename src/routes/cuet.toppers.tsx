import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { BRAND_SHORT } from "@/config/site";
import { Tbd } from "@/components/lpt/shared";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Does LPT Delhi-NCR publish CUET toppers?", a: <>We publish only verified, attributable CUET results — never inflated or fabricated lists. Confirmed selections, with the student's consent and a verifiable record, are added to our results page. Until verified, we don't display topper numbers.</> },
  { q: "How are CUET toppers verified?", a: <>By matching a named student to an official scorecard or admission record, with their consent. We avoid stock photos and invented ranks. This keeps our results trustworthy — and is why some figures show as pending rather than placeholder numbers.</> },
];

export const Route = createFileRoute("/cuet/toppers")({
  head: () =>
    pageHead({
      title: `CUET Toppers (Verified Only) | ${BRAND_SHORT}`,
      description:
        "Our approach to CUET toppers — verified, attributable results only, never inflated or fabricated. Confirmed selections are linked from our results page.",
      path: "/cuet/toppers",
    }),
  component: Toppers,
});

function Toppers() {
  return (
    <ContentPage
      canonicalPath="/cuet/toppers"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Toppers" }]}
      title="CUET Toppers — Verified Only"
      introLead="Direct answer:"
      intro={
        <>
          We publish only verified, attributable CUET selections — never inflated or fabricated topper
          lists. Confirmed results, with student consent and a verifiable record, are added to our
          results page. This is a deliberate trust choice: real numbers or none.
        </>
      }
      toc={[{ id: "approach", label: "Our approach" }]}
      ctaMessage="Hi LPT Delhi-NCR, tell me about your CUET results"
    >
      <Section id="approach" heading="How we report toppers">
        <p>
          <strong className="text-ink">Verified or not shown.</strong> Topper figures are pending until
          confirmed: <Tbd label="verified selections" />. See our{" "}
          <a href="/results" className="text-brand hover:underline">results page</a> for the verified list as it grows, and
          read student <a href="/faq/cuet" className="text-brand hover:underline">FAQs</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
