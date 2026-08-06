import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { examCities, isExamCityPublishable } from "@/data/examCenters";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "What is a CUET exam centre / city?", a: <>A CUET exam city is the NTA-allotted location where you sit the computer-based test, chosen from city preferences during registration. It is decided by the NTA and printed on your admit card — it is not a coaching centre. Confirm the current exam-city list on cuet.nta.nic.in.</> },
  { q: "Are CUET exam cities the same as LPT's coaching centres?", a: <>No. CUET exam cities are NTA test locations; LPT Delhi-NCR's coaching centres (Noida, Hauz Khas, GTB Nagar, Gurugram) are where we teach. They're unrelated — see our centres page for coaching locations.</> },
  { q: "Can I choose my CUET exam city?", a: <>You select city preferences during registration, and the NTA allots one based on availability. The allotted city and exact venue appear on your admit card. Plan travel only after the admit card is released — preferences are not guarantees.</> },
];

export const Route = createFileRoute("/cuet/exam-centers/")({
  head: () =>
    pageHead({
      title: `CUET Exam Centres & Cities (NTA) | ${BRAND_SHORT}`,
      description:
        "CUET exam cities are NTA test locations on your admit card — not coaching centres. How exam cities are allotted, plus slip, admit-card and exam-day guides.",
      path: "/cuet/exam-centers",
      ogType: "article",
    }),
  component: ExamCentersHub,
});

function ExamCentersHub() {
  const publishable = examCities.filter(isExamCityPublishable);
  return (
    <ContentPage
      canonicalPath="/cuet/exam-centers"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Exam centres" }]}
      title="CUET Exam Centres & Cities (NTA)"
      introLead="Direct answer:"
      intro={
        <>
          A CUET exam city is the NTA-allotted location where you sit the computer-based test —
          selected from preferences at registration and printed on your admit card. These are{" "}
          <strong>NTA test locations, not coaching centres</strong>: LPT's coaching centres are listed
          separately. Confirm the exam-city list on cuet.nta.nic.in.
        </>
      }
      toc={[
        { id: "cities", label: "Exam cities" },
        { id: "logistics", label: "Slip, admit card & exam day" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, I have a question about CUET exam centres"
      faqs={faqs}
      schema={[articleSchema({ headline: "CUET Exam Centres & Cities (NTA)", dateModified: LAST_UPDATED })]}
    >
      <Section id="cities" heading="CUET exam cities">
        <p>
          <strong className="text-ink">City-wise guides publish as the verified NTA list is added</strong>{" "}
          (no thin placeholder pages). Looking for our coaching locations instead? See{" "}
          <a href="/centres" className="text-brand hover:underline">LPT Delhi-NCR centres</a>.
        </p>
        {publishable.length === 0 && (
          <p className="text-sm text-brand">Exam-city pages (/cuet/exam-centers/[city]) emit once verified rows are added.</p>
        )}
      </Section>

      <Section id="logistics" heading="Slip, admit card & exam day">
        <ul className="list-disc space-y-2 pl-5">
          <li><a href="/cuet/city-slip" className="text-brand hover:underline">City intimation slip</a> — when and how to download it.</li>
          <li><a href="/cuet/admit-card" className="text-brand hover:underline">Admit card</a> — download steps and what to check.</li>
          <li><a href="/cuet/exam-day" className="text-brand hover:underline">Exam-day checklist</a> — documents, timing and rules.</li>
        </ul>
      </Section>
    </ContentPage>
  );
}
