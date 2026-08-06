import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { Tbd } from "@/components/lpt/shared";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "What has changed in CUET recently?", a: <>CUET specifics — mode, format, timing and subject rules — are revised across cycles by the NTA and participating universities. Because changes are perishable, we list verified updates here and date them; always cross-check the latest on cuet.nta.nic.in before acting.</> },
  { q: "How do I stay updated on CUET changes?", a: <>Follow the official cuet.nta.nic.in notices and your target universities' admission pages, and check this page and our news feed for dated summaries. Treat social-media rumours cautiously — verify any change against the official source.</> },
];

export const Route = createFileRoute("/cuet/changes")({
  head: () =>
    pageHead({
      title: `CUET Changes & Updates | ${BRAND_SHORT}`,
      description:
        "CUET changes — a dated, verified summary of recent updates to format, mode and rules. Perishable; always cross-check the latest on cuet.nta.nic.in.",
      path: "/cuet/changes",
      ogType: "article",
    }),
  component: Changes,
});

function Changes() {
  return (
    <ContentPage
      canonicalPath="/cuet/changes"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Changes" }]}
      title="CUET Changes & Updates"
      introLead="Direct answer:"
      intro={
        <>
          CUET's format, mode, timing and subject rules are revised across cycles by the NTA and
          participating universities. This page lists verified, dated updates so you can act on
          confirmed information — not rumours. Always cross-check the latest on cuet.nta.nic.in.
        </>
      }
      toc={[{ id: "log", label: "Recent changes" }, { id: "stay", label: "Stay updated" }]}
      ctaMessage="Hi LPT Delhi-NCR, what's changed in CUET this cycle?"
      faqs={faqs}
      schema={[articleSchema({ headline: "CUET Changes & Updates", dateModified: LAST_UPDATED })]}
    >
      <Section id="log" heading="Recent verified changes">
        <p>
          <strong className="text-ink">Verified, dated updates will be logged here</strong> as each
          cycle's official notices land: <Tbd label="dated updates" />. We publish a change only after
          confirming it against the official source.
        </p>
      </Section>
      <Section id="stay" heading="Stay updated">
        <p>
          Follow our <a href="/blog" className="text-brand hover:underline">journal</a> and{" "}
          <a href="/news" className="text-brand hover:underline">news</a> for dated summaries, and the{" "}
          <a href="/cuet/policy" className="text-brand hover:underline">policy</a> overview.
        </p>
      </Section>
    </ContentPage>
  );
}
