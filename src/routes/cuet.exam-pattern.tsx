import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "What is the CUET (UG) exam pattern?", a: <>CUET (UG) is a computer-based test with three broad components: domain subjects, a General Test, and language(s). You choose subjects to match your target college–course eligibility. The exact number of questions, duration and attempt rules are set per cycle — verify on cuet.nta.nic.in.</> },
  { q: "Is CUET computer-based?", a: <>Yes. CUET (UG) is conducted as a computer-based test (CBT) across multiple shifts. Because shifts use different papers, scores are normalised before percentiles are assigned. Practise on-screen mocks so the interface and pacing feel familiar on exam day.</> },
  { q: "How many subjects can I attempt in CUET?", a: <>You select a combination of domain subjects, the General Test and language(s) within the cap set for the cycle. Choose subjects that satisfy your target college–course requirement — the official notice specifies the current limit and rules.</> },
];

export const Route = createFileRoute("/cuet/exam-pattern")({
  head: () =>
    pageHead({
      title: `CUET Exam Pattern (UG) | ${BRAND_SHORT}`,
      description:
        "CUET (UG) exam pattern — a computer-based test of domain subjects, a General Test and languages, normalised across shifts. Verify specifics officially.",
      path: "/cuet/exam-pattern",
      ogType: "article",
    }),
  component: ExamPattern,
});

function ExamPattern() {
  return (
    <ContentPage
      canonicalPath="/cuet/exam-pattern"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Exam pattern" }]}
      title="CUET (UG) Exam Pattern"
      introLead="Direct answer:"
      intro={
        <>
          CUET (UG) is a computer-based test built from three components — domain subjects, a General
          Test, and language(s) — which you select to match your target college–course eligibility. It
          runs in multiple shifts, so scores are normalised. Exact question counts, timing and attempt
          rules are set per cycle; verify on cuet.nta.nic.in.
        </>
      }
      toc={[{ id: "components", label: "The components" }, { id: "format", label: "Format & normalisation" }]}
      ctaMessage="Hi LPT Delhi-NCR, explain the CUET exam pattern"
      faqs={faqs}
      schema={[articleSchema({ headline: "CUET (UG) Exam Pattern", dateModified: LAST_UPDATED })]}
    >
      <Section id="components" heading="The three components">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-ink">Domain subjects:</strong> chosen to meet your college–course eligibility (Class 12 aligned).</li>
          <li><strong className="text-ink">General Test:</strong> reasoning, quantitative aptitude and general awareness.</li>
          <li><strong className="text-ink">Language(s):</strong> reading comprehension and language skills.</li>
        </ul>
      </Section>

      <Section id="format" heading="Format & normalisation">
        <p>
          <strong className="text-ink">CBT across shifts, then normalised.</strong> Because different
          shifts use different papers, raw marks are converted to comparable normalised scores — see{" "}
          <a href="/cuet/results/normalization" className="text-brand hover:underline">normalisation</a> and{" "}
          <a href="/cuet/marking" className="text-brand hover:underline">marking</a>. Confirm the current
          question count and timing on the official source.
        </p>
      </Section>
    </ContentPage>
  );
}
