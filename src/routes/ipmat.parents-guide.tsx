import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "How can parents support an IPMAT aspirant?", a: <>Support the decision honestly — IPM commits a student to management at 17–18. Help them understand the programme structure and ROI, provide a calm environment, and let them own preparation. Counselling can help weigh IPM against a more flexible undergraduate route.</> },
  { q: "Is the 5-year IPM the right choice for my child?", a: <>It fits students genuinely interested in management who can clear IPMAT and are comfortable committing early. If they're unsure, a flexible bachelor's may suit better. Discuss the IPM-vs-BBA trade-offs together rather than deciding for them.</> },
];

export const Route = createFileRoute("/ipmat/parents-guide")({
  head: () =>
    pageHead({
      title: `A Parent's Guide to IPMAT & IPM | ${BRAND_SHORT}`,
      description:
        "A parent's guide to IPMAT — supporting a big early decision without pressure, understanding the 5-year IPM and ROI, and when a flexible route fits better.",
      path: "/ipmat/parents-guide",
      ogType: "article",
    }),
  component: ParentsGuide,
});

function ParentsGuide() {
  return (
    <ContentPage
      canonicalPath="/ipmat/parents-guide"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Parents' guide" }]}
      title="A Parent's Guide to IPMAT & the IPM"
      introLead="Direct answer:"
      intro={
        <>
          IPM commits a student to management at 17–18, so the best parental support is honest guidance:
          help them understand the programme structure and ROI, keep the environment calm, and let them
          own preparation. If they're unsure about management, weigh the IPM against a more flexible
          route together.
        </>
      }
      toc={[{ id: "support", label: "How to support" }, { id: "decide", label: "Deciding together" }]}
      ctaMessage="Hi LPT Delhi-NCR, I'm a parent with IPMAT questions"
      faqs={faqs}
      schema={[articleSchema({ headline: "A Parent's Guide to IPMAT & the IPM", dateModified: LAST_UPDATED })]}
    >
      <Section id="support" heading="How to support">
        <ul className="list-disc space-y-2 pl-5">
          <li>Understand the <a href="/ipmat/programme/structure" className="text-brand hover:underline">programme structure</a> and <a href="/ipmat/roi" className="text-brand hover:underline">ROI</a>.</li>
          <li>Provide calm logistics; let them own preparation.</li>
          <li>Look after <a href="/ipmat/wellbeing" className="text-brand hover:underline">wellbeing</a> through the cycle.</li>
        </ul>
      </Section>
      <Section id="decide" heading="Deciding together">
        <p>
          <strong className="text-ink">Certainty about management is the key factor.</strong> If unsure,
          read <a href="/ipmat/compare/ipm-vs-bba" className="text-brand hover:underline">IPM vs BBA</a> together, or book a{" "}
          <a href="/contact" className="text-brand hover:underline">counselling call</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
