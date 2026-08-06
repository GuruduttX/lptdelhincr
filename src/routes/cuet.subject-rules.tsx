import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "How do CUET subject-mapping rules work?", a: <>Universities map each course to the CUET subjects you must have taken (often aligned to your Class 12 subjects). To be eligible for a course, your chosen CUET subjects must match its requirement. Always map subjects to your target courses before locking your CUET selection.</> },
  { q: "Can I choose a CUET subject I didn't study in Class 12?", a: <>Policies vary by university and cycle. Many require alignment between your CUET domain subjects and your Class 12 subjects for a given course, while some allow flexibility. Confirm each target university's subject-mapping rule before selecting.</> },
];

export const Route = createFileRoute("/cuet/subject-rules")({
  head: () =>
    pageHead({
      title: `CUET Subject Mapping Rules | ${BRAND_SHORT}`,
      description:
        "CUET subject-mapping rules — how universities tie each course to required CUET subjects, often aligned to Class 12. Map subjects before selecting.",
      path: "/cuet/subject-rules",
      ogType: "article",
    }),
  component: SubjectRules,
});

function SubjectRules() {
  return (
    <ContentPage
      canonicalPath="/cuet/subject-rules"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Subject rules" }]}
      title="CUET Subject Mapping Rules"
      introLead="Direct answer:"
      intro={
        <>
          CUET subject rules determine which courses you're eligible for: each university maps a course
          to the CUET subjects you must have taken, frequently aligned to your Class 12 subjects. Pick
          CUET subjects that satisfy every course on your shortlist — the wrong combination silently
          removes options.
        </>
      }
      toc={[{ id: "how", label: "How mapping works" }, { id: "plan", label: "Choose wisely" }]}
      ctaMessage="Hi LPT Delhi-NCR, help me pick CUET subjects for my courses"
      faqs={faqs}
      schema={[articleSchema({ headline: "CUET Subject Mapping Rules", dateModified: LAST_UPDATED })]}
    >
      <Section id="how" heading="How subject mapping works">
        <p>
          <strong className="text-ink">Course-first, then subjects.</strong> A university publishes,
          per course, the CUET subject(s) it accepts. Your eligibility for that course depends on having
          chosen those subjects. The same course can have different rules at different universities.
        </p>
      </Section>

      <Section id="plan" heading="Choose subjects wisely">
        <p>
          List your target college–course combinations, note each one's required CUET subjects, then
          choose a combination that keeps the most options open. See{" "}
          <a href="/cuet/eligibility" className="text-brand hover:underline">eligibility</a>,{" "}
          <a href="/cuet/syllabus" className="text-brand hover:underline">syllabus</a> and{" "}
          <a href="/cuet/colleges" className="text-brand hover:underline">colleges</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
