import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { Tbd } from "@/components/lpt/shared";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "What is a safe score for IPMAT?", a: <>A safe score is an estimated buffer above the likely cutoff that improves your call chances, since cutoffs shift each year. It's guidance, not an official threshold — aim comfortably above the previous cycle's cutoff band rather than treating any number as guaranteed.</> },
  { q: "Why isn't there an official safe score?", a: <>Because cutoffs are decided after the exam from that year's demand and difficulty, no score is guaranteed in advance. A "safe score" is just a sensible buffer derived from past trends; the institute never publishes one officially.</> },
];

export const Route = createFileRoute("/ipmat/safe-score")({
  head: () =>
    pageHead({
      title: `IPMAT Safe Score (Estimate) | ${BRAND_SHORT}`,
      description:
        "IPMAT safe score explained — an estimated buffer above the likely cutoff to improve your call chances. Guidance only, since cutoffs change every cycle.",
      path: "/ipmat/safe-score",
      ogType: "article",
    }),
  component: SafeScore,
});

function SafeScore() {
  return (
    <ContentPage
      canonicalPath="/ipmat/safe-score"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Safe score" }]}
      title="IPMAT Safe Score (Estimate)"
      introLead="Direct answer:"
      intro={
        <>
          An IPMAT <strong>safe score</strong> is an estimated buffer above the expected cutoff that
          improves your chances of a call. It is <strong>guidance, not an official threshold</strong> —
          cutoffs are decided after the exam, so aim comfortably above the previous cycle's band rather
          than relying on a fixed number.
        </>
      }
      toc={[
        { id: "what", label: "What it means" },
        { id: "bands", label: "Buffer bands" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, what's a safe IPMAT score for my target?"
      faqs={faqs}
      schema={[articleSchema({ headline: "IPMAT Safe Score (Estimate)", dateModified: LAST_UPDATED })]}
    >
      <Section id="what" heading="What a safe score means">
        <p>
          <strong className="text-ink">Aim above the line, not at it.</strong> Because the cutoff only
          settles after results, scoring exactly at last year's cutoff is risky. A safe score adds a
          buffer for year-to-year movement — see how cutoffs and the composite work on the{" "}
          <a href="/ipmat/cutoff" className="text-brand hover:underline">cutoffs page</a>.
        </p>
      </Section>

      <Section id="bands" heading="Buffer bands (estimate)">
        <p>
          <strong className="text-ink">Verified, institute-wise buffer bands</strong> will be published
          here from past-trend analysis: <Tbd label="safe-score bands" />. Until then, treat any figure
          as indicative and prepare to clear sectional cutoffs comfortably.
        </p>
      </Section>
    </ContentPage>
  );
}
