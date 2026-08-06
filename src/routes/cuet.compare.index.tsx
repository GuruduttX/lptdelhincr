import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { itemListSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Should I choose CUET or IPMAT?", a: <>Choose CUET if you want a broad undergraduate degree (e.g. economics, commerce, humanities) at a central university. Choose IPMAT if you specifically want a five-year integrated management programme at an IIM. They serve different goals — pick by the degree you actually want.</> },
  { q: "Can I prepare for both CUET and IPMAT?", a: <>Yes — there's overlap in quantitative and verbal skills, so foundational prep helps both. But the exams differ in pattern and marking, so add exam-specific practice for each. Decide your priority early so your timetable favours your primary target.</> },
];

export const Route = createFileRoute("/cuet/compare/")({
  head: () =>
    pageHead({
      title: `CUET vs Other Exams: Which to Choose | ${BRAND_SHORT}`,
      description:
        "Decide between CUET and IPMAT — what each is for, who should choose which, and where to go next. A clear cross-vertical comparison.",
      path: "/cuet/compare",
    }),
  component: CompareHub,
});

function CompareHub() {
  return (
    <HubPage
      canonicalPath="/cuet/compare"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Compare" }]}
      title="CUET vs Other Exams: Which Should You Choose?"
      introLead="Direct answer:"
      intro={
        <>
          CUET and IPMAT serve different goals: CUET is for broad undergraduate degrees at central
          universities, while IPMAT is for five-year integrated management programmes at IIMs. Use the
          comparisons below to decide, then jump to that vertical's resources.
        </>
      }
      clusterOf="/cuet/compare"
      ctaMessage="Hi LPT Delhi-NCR, help me choose between CUET and IPMAT"
      faqs={faqs}
      schema={[itemListSchema([{ name: "CUET vs IPMAT", url: "/cuet/compare/cuet-vs-ipmat" }])]}
    />
  );
}
