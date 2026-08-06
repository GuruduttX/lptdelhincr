import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { courseSchema } from "@/lib/schema";
import { BRAND_SHORT, canonical } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "What is the IPMAT syllabus?", a: <>IPMAT covers Quantitative Aptitude and Verbal Ability across all variants, with Logical Reasoning added at IIM Rohtak. QA spans arithmetic, algebra and data interpretation; Verbal spans reading comprehension and usage. Confirm the exact topic list for your target institute on its official site.</> },
  { q: "Which IPMAT section is most important?", a: <>All counted sections matter, especially where sectional cutoffs apply — you may need to clear each. Quant usually carries the most preparation load, but neglecting Verbal or Logical Reasoning (Rohtak) can cost you a call. Balance preparation across sections.</> },
];

export const Route = createFileRoute("/ipmat/syllabus/")({
  head: () =>
    pageHead({
      title: `IPMAT Syllabus: QA, Verbal & LR | ${BRAND_SHORT}`,
      description:
        "IPMAT syllabus hub — Quantitative Aptitude, Verbal Ability and (for Rohtak) Logical Reasoning, with section-wise topics and strategy. Verify per institute.",
      path: "/ipmat/syllabus",
    }),
  component: SyllabusHub,
});

function SyllabusHub() {
  return (
    <HubPage
      canonicalPath="/ipmat/syllabus"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Syllabus" }]}
      title="IPMAT Syllabus: QA, Verbal & Logical Reasoning"
      introLead="Direct answer:"
      intro={
        <>
          The IPMAT syllabus centres on Quantitative Aptitude and Verbal Ability, with Logical
          Reasoning added at IIM Rohtak. Each section below links to its topic breakdown and a test-day
          strategy, plus phased prep plans. Confirm exact topics for your target institute officially.
        </>
      }
      clusterOf="/ipmat/syllabus"
      ctaMessage="Hi LPT Delhi-NCR, share the IPMAT syllabus and strategy"
      faqs={faqs}
      schema={[
        courseSchema({
          name: "IPMAT Syllabus & Preparation",
          description: "IPMAT syllabus across Quantitative Aptitude, Verbal Ability and Logical Reasoning, with section strategy.",
          courseMode: "Blended",
          url: canonical("/ipmat/syllabus"),
        }),
      ]}
    />
  );
}
