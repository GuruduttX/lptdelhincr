import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "How do I manage stress during IPMAT preparation?", a: <>Build a sustainable routine with fixed study blocks, proper sleep and breaks; measure progress by consistency and mock review, not comparison. Treat mocks as practice, not verdicts. If pressure builds, talk to a mentor or family early — steady effort beats burnout sprints.</> },
  { q: "Is it normal to feel pressure preparing for IPMAT?", a: <>Yes — it's a competitive exam tied to a big decision, so some pressure is normal. The goal is to keep it manageable: realistic targets, rest, and support. Persistent anxiety that disrupts daily life deserves a conversation with someone you trust.</> },
];

export const Route = createFileRoute("/ipmat/wellbeing")({
  head: () =>
    pageHead({
      title: `IPMAT Prep: Stress & Wellbeing | ${BRAND_SHORT}`,
      description:
        "Managing stress and wellbeing through IPMAT prep — sustainable routines, treating mocks as practice, and asking for support early.",
      path: "/ipmat/wellbeing",
      ogType: "article",
    }),
  component: Wellbeing,
});

function Wellbeing() {
  return (
    <ContentPage
      canonicalPath="/ipmat/wellbeing"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Wellbeing" }]}
      title="IPMAT Prep: Stress & Wellbeing"
      introLead="Direct answer:"
      intro={
        <>
          Manage IPMAT stress with a sustainable routine — fixed study blocks, real sleep and breaks —
          and measure progress by consistency and honest mock review rather than comparison. Treat mocks
          as practice, not verdicts, and reach out to a mentor or family early if pressure builds. Steady
          effort beats burnout sprints.
        </>
      }
      toc={[{ id: "habits", label: "Healthy habits" }, { id: "support", label: "When to seek support" }]}
      ctaMessage="Hi LPT Delhi-NCR, I want help balancing IPMAT prep and wellbeing"
      faqs={faqs}
      schema={[articleSchema({ headline: "IPMAT Prep: Stress & Wellbeing", dateModified: LAST_UPDATED })]}
    >
      <Section id="habits" heading="Healthy prep habits">
        <ul className="list-disc space-y-2 pl-5">
          <li>Fixed study blocks, sleep and breaks — protect all three.</li>
          <li>Judge progress by consistency and error review, not comparison.</li>
          <li>Treat each mock as practice; analyse, don't catastrophise.</li>
        </ul>
      </Section>
      <Section id="support" heading="When to seek support">
        <p>
          <strong className="text-ink">Ask early.</strong> If anxiety disrupts daily life, talk to family,
          a mentor or a professional. A balanced <a href="/ipmat/preparation/6-month" className="text-brand hover:underline">prep plan</a>{" "}
          and realistic targets help keep pressure manageable.
        </p>
      </Section>
    </ContentPage>
  );
}
