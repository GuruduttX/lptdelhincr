import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { howToSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const steps = [
  { name: "Wait for the admit-card release", text: "NTA releases the CUET admit card a few days before the exam; check cuet.nta.nic.in and your email." },
  { name: "Log in and download", text: "Sign in with your application number and password and download the admit card PDF." },
  { name: "Verify every detail", text: "Check your name, photo, exam date, shift, reporting time and the exact venue address; report discrepancies to NTA immediately." },
  { name: "Print and prepare", text: "Take colour printouts, attach a passport photo if required, and pair it with a valid photo ID for exam day." },
];

const faqs: FAQItem[] = [
  { q: "When is the CUET admit card released?", a: <>NTA releases the CUET admit card a few days before the exam date, after the city intimation slip. The exact release date varies by cycle — monitor cuet.nta.nic.in and your registered email, and download it as soon as it's live.</> },
  { q: "What should I check on my CUET admit card?", a: <>Verify your name, photograph, exam date, shift, reporting time and the exact venue address, plus the listed instructions and prohibited items. If anything is wrong, contact NTA immediately — you cannot fix it at the centre.</> },
];

export const Route = createFileRoute("/cuet/admit-card")({
  head: () =>
    pageHead({
      title: `CUET Admit Card: Download & Checks | ${BRAND_SHORT}`,
      description:
        "CUET admit card — when NTA releases it, how to download it, and exactly what to verify (venue, shift, ID rules) before exam day.",
      path: "/cuet/admit-card",
    }),
  component: AdmitCard,
});

function AdmitCard() {
  return (
    <ContentPage
      canonicalPath="/cuet/admit-card"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Admit card" }]}
      title="CUET Admit Card: Download & Checks"
      introLead="Direct answer:"
      intro={
        <>
          The CUET admit card is your entry pass, released by NTA a few days before the exam with your
          exact venue, date, shift and reporting time. Download it from the official CUET portal, verify
          every detail, and carry a printout with a valid photo ID. Without it, you won't be allowed to
          sit the exam.
        </>
      }
      toc={[{ id: "steps", label: "Download & verify" }]}
      ctaMessage="Hi LPT Delhi-NCR, I have a CUET admit-card question"
      faqs={faqs}
      schema={[howToSchema("How to download and check the CUET admit card", steps)]}
    >
      <Section id="steps" heading="Download & verify your admit card">
        <ol className="list-decimal space-y-2 pl-5">
          {steps.map((s) => (
            <li key={s.name}><strong className="text-ink">{s.name}:</strong> {s.text}</li>
          ))}
        </ol>
        <p className="text-sm">Then review the <a href="/cuet/exam-day" className="text-brand hover:underline">exam-day checklist</a>.</p>
      </Section>
    </ContentPage>
  );
}
