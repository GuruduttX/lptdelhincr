import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "How can parents help with CUET?", a: <>Provide a calm environment and logistics support, keep expectations realistic, and let your child own subject choices (which decide eligibility). Avoid score comparisons; focus on consistent effort and honest mock review. A counselling call can clarify the college–course–subject map.</> },
  { q: "Should parents choose the CUET subjects?", a: <>Guide, don't dictate. Subject choice determines which courses your child is eligible for, so it should align with their target courses and strengths. Help them research target universities' requirements, then let them decide with your support.</> },
];

export const Route = createFileRoute("/cuet/parents-guide")({
  head: () =>
    pageHead({
      title: `A Parent's Guide to CUET | ${BRAND_SHORT}`,
      description:
        "A parent's guide to CUET — how to support without pressure, why subject choices matter for eligibility, and where counselling genuinely helps.",
      path: "/cuet/parents-guide",
      ogType: "article",
    }),
  component: ParentsGuide,
});

function ParentsGuide() {
  return (
    <ContentPage
      canonicalPath="/cuet/parents-guide"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Parents' guide" }]}
      title="A Parent's Guide to CUET"
      introLead="Direct answer:"
      intro={
        <>
          The best CUET support from parents is calm logistics, realistic expectations, and letting your
          child own the subject choices that decide eligibility. Avoid score comparisons and focus on
          consistent effort and honest mock review. Counselling helps most with the college–course–subject
          map and a realistic timeline.
        </>
      }
      toc={[{ id: "do", label: "How to help" }, { id: "avoid", label: "What to avoid" }]}
      ctaMessage="Hi LPT Delhi-NCR, I'm a parent with CUET questions"
      faqs={faqs}
      schema={[articleSchema({ headline: "A Parent's Guide to CUET", dateModified: LAST_UPDATED })]}
    >
      <Section id="do" heading="How to help">
        <ul className="list-disc space-y-2 pl-5">
          <li>Support logistics and a calm study environment.</li>
          <li>Help research target <a href="/cuet/colleges" className="text-brand hover:underline">colleges</a> and <a href="/cuet/subject-rules" className="text-brand hover:underline">subject rules</a>.</li>
          <li>Encourage consistent effort and honest mock review.</li>
        </ul>
      </Section>
      <Section id="avoid" heading="What to avoid">
        <p>
          <strong className="text-ink">Don't compare scores or dictate subjects.</strong> Let your child
          own decisions with your guidance. A free <a href="/contact" className="text-brand hover:underline">counselling call</a> can
          map options realistically.
        </p>
      </Section>
    </ContentPage>
  );
}
