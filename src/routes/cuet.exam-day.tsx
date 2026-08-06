import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { howToSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const steps = [
  { name: "Carry the essentials", text: "Printed admit card, a valid original photo ID, and a passport photo if instructed. Leave prohibited items (phones, smartwatches, calculators) behind." },
  { name: "Reach early", text: "Arrive well before the reporting time on your admit card; gates close before the exam and late entry is not allowed." },
  { name: "Follow centre rules", text: "Complete frisking and verification, find your allotted system, and read on-screen instructions carefully before the timer starts." },
  { name: "Manage the on-screen test", text: "Pace yourself across sections, use the review/mark feature, and submit before time. Don't leave early without checking flagged questions." },
];

const faqs: FAQItem[] = [
  { q: "What should I carry to the CUET exam?", a: <>Carry a printed admit card, a valid original photo ID, and a passport photo if your admit card asks for one. Prohibited items — phones, smartwatches, calculators and study material — must be left outside; check your admit card's exact list.</> },
  { q: "What time should I reach the CUET centre?", a: <>Reach well before the reporting time printed on your admit card, since gates close before the exam begins and late candidates are not admitted. Account for travel, verification and frisking queues — arriving early avoids needless stress.</> },
];

export const Route = createFileRoute("/cuet/exam-day")({
  head: () =>
    pageHead({
      title: `CUET Exam-Day Checklist | ${BRAND_SHORT}`,
      description:
        "CUET exam-day checklist — what to carry, when to reach, centre rules and how to manage the on-screen test. Avoid avoidable mistakes on the day.",
      path: "/cuet/exam-day",
    }),
  component: ExamDay,
});

function ExamDay() {
  return (
    <ContentPage
      canonicalPath="/cuet/exam-day"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Exam day" }]}
      title="CUET Exam-Day Checklist"
      introLead="Direct answer:"
      intro={
        <>
          On CUET exam day, carry your printed admit card and a valid original photo ID, leave
          prohibited items behind, and reach well before the reporting time as gates close early. Then
          follow centre verification, read the on-screen instructions, and pace yourself across the
          computer-based test.
        </>
      }
      toc={[{ id: "steps", label: "The checklist" }]}
      ctaMessage="Hi LPT Delhi-NCR, I have a CUET exam-day question"
      faqs={faqs}
      schema={[howToSchema("CUET exam-day checklist", steps)]}
    >
      <Section id="steps" heading="Exam-day checklist">
        <ol className="list-decimal space-y-2 pl-5">
          {steps.map((s) => (
            <li key={s.name}><strong className="text-ink">{s.name}:</strong> {s.text}</li>
          ))}
        </ol>
        <p className="text-sm">Confirm venue on your <a href="/cuet/admit-card" className="text-brand hover:underline">admit card</a> and review the <a href="/cuet/exam-pattern" className="text-brand hover:underline">exam pattern</a>.</p>
      </Section>
    </ContentPage>
  );
}
