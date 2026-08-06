import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "What is the eligibility for CUET (UG)?", a: <>CUET (UG) is open to candidates who have completed or are appearing for Class 12. The NTA generally sets no upper age limit for the test itself, but individual universities can apply their own age, subject and minimum-marks criteria for admission — always check the target university's rules.</> },
  { q: "Is there an age limit for CUET?", a: <>For the CUET exam, the NTA typically does not impose an upper age limit. However, specific universities may set age criteria for particular programmes, so eligibility for admission depends on the university — verify on both cuet.nta.nic.in and the university site.</> },
  { q: "Do universities add their own CUET eligibility rules?", a: <>Yes. Beyond appearing for CUET, each university sets its own eligibility — required subjects, minimum marks and sometimes age — for each course. Clearing CUET makes you eligible to apply; the university's criteria decide admission.</> },
];

export const Route = createFileRoute("/cuet/eligibility")({
  head: () =>
    pageHead({
      title: `CUET (UG) Eligibility Criteria | ${BRAND_SHORT}`,
      description:
        "CUET (UG) eligibility — open to Class 12 students; no NTA age cap for the test. Universities add their own subject, marks and age criteria.",
      path: "/cuet/eligibility",
      ogType: "article",
    }),
  component: Eligibility,
});

function Eligibility() {
  return (
    <ContentPage
      canonicalPath="/cuet/eligibility"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Eligibility" }]}
      title="CUET (UG) Eligibility Criteria"
      introLead="Direct answer:"
      intro={
        <>
          CUET (UG) is open to anyone who has completed or is appearing for Class 12, and the NTA
          generally sets no upper age limit for the test. Admission eligibility, however, is decided by
          each university — which can require specific subjects, minimum marks or age limits. Verify
          both the CUET notice and your target university's rules.
        </>
      }
      toc={[{ id: "test", label: "Test eligibility" }, { id: "uni", label: "University criteria" }]}
      ctaMessage="Hi LPT Delhi-NCR, am I eligible for CUET?"
      faqs={faqs}
      schema={[articleSchema({ headline: "CUET (UG) Eligibility Criteria", dateModified: LAST_UPDATED })]}
    >
      <Section id="test" heading="Eligibility to take CUET">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-ink">Qualification:</strong> completed or appearing for Class 12 (10+2).</li>
          <li><strong className="text-ink">Age:</strong> no upper age limit set by NTA for the test itself.</li>
          <li><strong className="text-ink">Attempts:</strong> as permitted by the current notice.</li>
        </ul>
      </Section>

      <Section id="uni" heading="University admission criteria">
        <p>
          <strong className="text-ink">Universities decide admission.</strong> Each sets required CUET
          subjects, minimum marks and sometimes age for each course — see{" "}
          <a href="/cuet/subject-rules" className="text-brand hover:underline">subject rules</a> and{" "}
          <a href="/cuet/colleges" className="text-brand hover:underline">colleges</a>. Clearing CUET lets you
          apply; the university's criteria decide the seat.
        </p>
      </Section>
    </ContentPage>
  );
}
