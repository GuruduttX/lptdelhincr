import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { Section } from "@/components/seo/ContentPage";
import { courseSchema } from "@/lib/schema";
import { BRAND_SHORT, canonical } from "@/config/site";
import { syllabusForVertical, syllabusIsIllustrativeOnly } from "@/data/syllabus";
import { Tbd } from "@/components/lpt/shared";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Is the CUET syllabus based on Class 12?", a: <>The CUET (UG) domain subjects are broadly aligned to the Class 12 (NCERT) syllabus, alongside a General Test covering reasoning, quantitative aptitude and general awareness. Always confirm the current subject-wise syllabus on the official CUET source before finalising prep.</> },
  { q: "How many subjects can I take in CUET?", a: <>CUET lets you choose a combination of domain subjects, the General Test and language(s) within the limits set for the cycle. Pick subjects that satisfy your target college–course eligibility — confirm the current cap and rules on the official source.</> },
];

export const Route = createFileRoute("/cuet/syllabus/")({
  head: () =>
    pageHead({
      title: `CUET Syllabus, Subjects & Weightage | ${BRAND_SHORT}`,
      description:
        "CUET (UG) syllabus hub — subjects, units and PYQ weightage, aligned to Class 12. Subject-wise pages publish as the verified syllabus dataset is added.",
      path: "/cuet/syllabus",
    }),
  component: SyllabusHub,
});

function SyllabusHub() {
  const rows = syllabusForVertical("CUET");
  return (
    <HubPage
      canonicalPath="/cuet/syllabus"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Syllabus" }]}
      title="CUET Syllabus: Subjects, Units & Weightage"
      introLead="Direct answer:"
      intro={
        <>
          The CUET (UG) syllabus covers your chosen domain subjects (aligned to Class 12), a General
          Test and language(s). This hub maps subjects to units and PYQ weightage, and links phased study
          plans. Detailed subject pages publish as the verified syllabus dataset is added.
        </>
      }
      clusterOf="/cuet/syllabus"
      ctaMessage="Hi LPT Delhi-NCR, share the CUET syllabus for my subjects"
      schema={[
        courseSchema({
          name: "CUET (UG) Syllabus & Preparation",
          description: "CUET (UG) syllabus across domain subjects, General Test and languages, aligned to Class 12.",
          courseMode: "Blended",
          url: canonical("/cuet/syllabus"),
        }),
      ]}
    >
      <div className="space-y-10">
      <Section id="subjects" heading="Subjects, units & weightage">
        <p>
          <strong className="text-ink">Structure (illustrative until verified):</strong> the dataset
          maps each subject to units, topics and a PYQ weightage tag.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          {rows.map((r, i) => (
            <li key={i}>
              <strong className="text-ink">{r.subjectOrSection}</strong> — {r.unit}:{" "}
              {r.illustrative ? <Tbd label="topics" /> : r.topic} (PYQ weightage: {r.pyq_weightage_tag})
            </li>
          ))}
        </ul>
        {syllabusIsIllustrativeOnly() && (
          <p className="text-sm text-brand">Subject-wise syllabus, PYQ and weightage pages publish once verified rows are added.</p>
        )}
      </Section>
      </div>
    </HubPage>
  );
}
