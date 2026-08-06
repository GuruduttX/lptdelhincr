import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { ipmatExam } from "@/data/ipmat";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "IIM Indore or IIM Rohtak for IPM?", a: <>They differ in exam pattern (Indore has QA Short-Answer with no negative marking and a 40-minute sectional lock; Rohtak adds Logical Reasoning with −1 across all sections and no lock) and in brand, cohort and location. Choose by your section strengths, risk appetite and fit — verify current details officially.</> },
  { q: "Is IIM Indore harder than Rohtak?", a: <>Difficulty is relative to your strengths. Indore's no-negative QA-SA rewards confident attempting and its sectional lock demands per-section pacing; Rohtak's all-negative, no-lock format rewards time management. Prepare for the specific pattern of the institute you target.</> },
];

export const Route = createFileRoute("/ipmat/compare/indore-vs-rohtak")({
  head: () =>
    pageHead({
      title: `IIM Indore vs Rohtak IPM | ${BRAND_SHORT}`,
      description:
        "IIM Indore vs Rohtak for IPM — exam pattern, marking, sectional lock and fit compared. Choose by your section strengths and risk appetite.",
      path: "/ipmat/compare/indore-vs-rohtak",
      ogType: "article",
    }),
  component: IndoreVsRohtak,
});

function IndoreVsRohtak() {
  const indore = ipmatExam.find((e) => e.exam.includes("Indore"));
  const rohtak = ipmatExam.find((e) => e.exam.includes("Rohtak"));
  return (
    <ContentPage
      canonicalPath="/ipmat/compare/indore-vs-rohtak"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: "Compare", item: "/ipmat/compare" },
        { name: "Indore vs Rohtak" },
      ]}
      title="IIM Indore vs IIM Rohtak (IPM)"
      introLead="Direct answer:"
      intro={
        <>
          The core difference is the exam: IIM Indore uses QA Short-Answer (no negative marking) plus a
          40-minute sectional lock, while IIM Rohtak adds Logical Reasoning with −1 across all sections
          and no lock. Beyond the exam, weigh brand, cohort and location. Choose by your section
          strengths and risk appetite.
        </>
      }
      toc={[{ id: "table", label: "Exam side by side" }, { id: "choose", label: "How to choose" }]}
      ctaMessage="Hi LPT Delhi-NCR, help me choose Indore vs Rohtak"
      faqs={faqs}
      schema={[articleSchema({ headline: "IIM Indore vs IIM Rohtak (IPM)", dateModified: LAST_UPDATED })]}
    >
      <Section id="table" heading="Exam, side by side">
        <ComparisonTable
          caption="IIM Indore vs Rohtak — IPMAT"
          date="2026-cycle module"
          source="SOP module — re-verify officially"
          illustrative
          columns={[
            { key: "dim", header: "Dimension" },
            { key: "indore", header: "IIM Indore" },
            { key: "rohtak", header: "IIM Rohtak" },
          ]}
          rows={[
            { dim: "Questions / time", indore: indore?.questionsMarksTime ?? "—", rohtak: rohtak?.questionsMarksTime ?? "—" },
            { dim: "Sections", indore: indore?.sections ?? "—", rohtak: rohtak?.sections ?? "—" },
            { dim: "Sectional lock", indore: indore?.sectionalLock ?? "—", rohtak: rohtak?.sectionalLock ?? "—" },
            { dim: "Negative marking", indore: indore?.negativeMarking ?? "—", rohtak: rohtak?.negativeMarking ?? "—" },
          ]}
        />
      </Section>

      <Section id="choose" heading="How to choose">
        <p>
          <strong className="text-ink">Match the format to your strengths.</strong> Prefer Indore if
          you exploit the no-negative QA-SA and can pace under a lock; prefer Rohtak if you manage time
          well across sections including Logical Reasoning. See the{" "}
          <a href="/ipmat/marking-scheme" className="text-brand hover:underline">marking scheme</a> and{" "}
          <a href="/ipmat/cutoff" className="text-brand hover:underline">cutoffs</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
