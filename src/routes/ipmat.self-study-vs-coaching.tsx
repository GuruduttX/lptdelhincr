import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Can I crack IPMAT with self-study?", a: <>Yes, if you're disciplined and can source good material and mocks. The content is approachable; the challenge is speed, the institute-specific pattern and the marking scheme. Self-study works when you can self-direct and review honestly; coaching helps when you can't.</> },
  { q: "Is coaching necessary for IPMAT?", a: <>Not necessary, but it can help. Coaching adds structure, the exact institute pattern, doubt-solving, mock-PI practice and accountability. If those are your gaps, it's worth it; if you study well independently, focused self-study can be enough. Decide on fit.</> },
];

export const Route = createFileRoute("/ipmat/self-study-vs-coaching")({
  head: () =>
    pageHead({
      title: `IPMAT: Self-Study vs Coaching | ${BRAND_SHORT}`,
      description:
        "IPMAT self-study vs coaching — self-study suits disciplined aspirants; coaching adds structure, pattern focus and mock-PI. Choose by fit.",
      path: "/ipmat/self-study-vs-coaching",
      ogType: "article",
    }),
  component: SelfStudyVsCoaching,
});

function SelfStudyVsCoaching() {
  return (
    <ContentPage
      canonicalPath="/ipmat/self-study-vs-coaching"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Self-study vs coaching" }]}
      title="IPMAT: Self-Study vs Coaching"
      introLead="Direct answer:"
      intro={
        <>
          Both can crack IPMAT. Self-study suits disciplined aspirants who can source good material and
          mocks; coaching adds structure, the institute-specific pattern, doubt-solving, mock-PI practice
          and accountability. The right choice depends on how independently you study — not on pressure.
        </>
      }
      toc={[{ id: "compare", label: "Side by side" }, { id: "decide", label: "How to decide" }]}
      ctaMessage="Hi LPT Delhi-NCR, self-study or coaching for IPMAT?"
      faqs={faqs}
      schema={[articleSchema({ headline: "IPMAT: Self-Study vs Coaching", dateModified: LAST_UPDATED })]}
    >
      <Section id="compare" heading="Self-study vs coaching">
        <ComparisonTable
          caption="IPMAT self-study vs coaching"
          date={LAST_UPDATED}
          source="LPT Delhi-NCR"
          columns={[
            { key: "dim", header: "Factor" },
            { key: "self", header: "Self-study" },
            { key: "coach", header: "Coaching" },
          ]}
          rows={[
            { dim: "Structure", self: "You build it", coach: "Ready-made schedule" },
            { dim: "Doubt-solving", self: "Self/peer/online", coach: "Faculty-led" },
            { dim: "Pattern & mocks", self: "Source yourself", coach: "Institute-specific, benchmarked" },
            { dim: "Best for", self: "Disciplined self-starters", coach: "Those needing accountability" },
          ]}
        />
      </Section>
      <Section id="decide" heading="How to decide">
        <p>
          <strong className="text-ink">Be honest about your gaps.</strong> If structure and
          accountability are missing, see <a href="/courses/ipmat" className="text-brand hover:underline">IPMAT coaching</a>;
          otherwise follow a <a href="/ipmat/preparation/6-month" className="text-brand hover:underline">prep plan</a> and{" "}
          <a href="/ipmat/books-mocks" className="text-brand hover:underline">books & mocks</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
