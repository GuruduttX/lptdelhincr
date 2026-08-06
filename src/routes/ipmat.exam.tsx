import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { ipmatExam } from "@/data/ipmat";
import { ipmatFaqs } from "@/data/faqs";

export const Route = createFileRoute("/ipmat/exam")({
  head: () =>
    pageHead({
      title: `IPMAT Exam Pattern: Indore, Rohtak, JIPMAT | ${BRAND_SHORT}`,
      description:
        "IPMAT exam pattern compared — IIM Indore, IIM Rohtak and JIPMAT: questions, marks, sections, sectional lock and negative marking. Verify the current cycle.",
      path: "/ipmat/exam",
      ogType: "article",
    }),
  component: ExamHub,
});

function ExamHub() {
  return (
    <HubPage
      canonicalPath="/ipmat/exam"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Exam pattern" }]}
      title="IPMAT Exam Pattern — Indore vs Rohtak vs JIPMAT"
      introLead="Direct answer:"
      intro={
        <>
          The three IPMAT-route exams differ in structure. IIM Indore has QA Short-Answer, QA-MCQ and
          Verbal with a 40-minute sectional lock; IIM Rohtak adds Logical Reasoning with −1 across all
          sections and no lock; JIPMAT follows its official bulletin. Figures below are from the
          2026-cycle module — re-verify before relying on them.
        </>
      }
      clusterOf="/ipmat/exam"
      ctaMessage="Hi LPT Delhi-NCR, explain the IPMAT exam pattern for me"
      faqs={ipmatFaqs.filter((f) => f.cluster === "exam" || f.cluster === "marking").slice(0, 6).map((f) => ({ q: f.q, a: f.a }))}
      schema={[articleSchema({ headline: "IPMAT Exam Pattern — Indore vs Rohtak vs JIPMAT", dateModified: LAST_UPDATED })]}
    >
      <Section id="table" heading="The three IPMAT exams at a glance">
        <ComparisonTable
          caption="IPMAT exams — pattern comparison"
          date="2026-cycle module"
          source="SOP module — verify iimidr.ac.in / iimrohtak.ac.in / JIPMAT portal"
          illustrative
          columns={[
            { key: "exam", header: "Exam" },
            { key: "qmt", header: "Questions / Marks / Time" },
            { key: "sec", header: "Sections" },
            { key: "lock", header: "Sectional lock" },
            { key: "neg", header: "Negative marking" },
          ]}
          rows={ipmatExam.map((r) => ({
            exam: r.exam,
            qmt: r.questionsMarksTime,
            sec: r.sections,
            lock: r.sectionalLock,
            neg: r.negativeMarking,
          }))}
        />
      </Section>
    </HubPage>
  );
}
