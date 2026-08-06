import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { howToSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import { datesFor } from "@/data/dates";
import type { FAQItem } from "@/components/seo/FAQ";

const steps = [
  { name: "Register on CSAS", text: "Create your CSAS account on the university portal and complete the application with your CUET details." },
  { name: "Fill college–course preferences", text: "Add and rank every college–course combination you would accept, most-wanted first." },
  { name: "Receive an allotment", text: "The portal allots a seat based on your CUET score, category and preference order across rounds." },
  { name: "Freeze or upgrade", text: "Accept your seat (freeze) or keep it as a safety net while staying in the running for higher preferences (upgrade)." },
  { name: "Accept & pay", text: "Confirm and pay the admission fee within the deadline to secure the seat." },
];

const faqs: FAQItem[] = [
  { q: "What is CSAS in DU admission?", a: <>CSAS (Common Seat Allocation System) is Delhi University's centralised, CUET-score-based admission process. You register, rank college–course preferences, receive allotments across rounds, then freeze or upgrade. Admission happens through CSAS, not directly via CUET.</> },
  { q: "Does a high CUET score guarantee a DU seat?", a: <>No. You must register for CSAS, fill preferences, receive an allotment and accept the seat. A high score with no CSAS action results in no admission, so complete every counselling step on time.</> },
  { q: "How many CSAS rounds are there?", a: <>CSAS runs multiple allotment rounds followed by spot rounds to fill vacant seats. The exact number and dates are set each cycle by the university — always confirm the current schedule on the official CSAS portal.</> },
];

export const Route = createFileRoute("/cuet/admission/")({
  head: () =>
    pageHead({
      title: `CUET Admission & CSAS Process | ${BRAND_SHORT}`,
      description:
        "CUET admission explained — the step-by-step CSAS process, freeze vs upgrade, spot rounds and key date windows. Plan your preference order.",
      path: "/cuet/admission",
    }),
  component: AdmissionHub,
});

function AdmissionHub() {
  const dates = datesFor("CUET");
  return (
    <HubPage
      canonicalPath="/cuet/admission"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Admission" }]}
      title="CUET Admission: The CSAS Process, Step by Step"
      introLead="Direct answer:"
      intro={
        <>
          CUET admission happens through the university's counselling process — for Delhi University,
          CSAS. You register, rank college–course preferences, receive allotments across rounds, then
          freeze or upgrade and accept your seat. Below is the step-by-step process, key date windows
          and the decisions that matter.
        </>
      }
      clusterOf="/cuet/admission"
      ctaMessage="Hi LPT Delhi-NCR, I need CUET admission / CSAS counselling"
      faqs={faqs}
      schema={[howToSchema("How to complete CUET (CSAS) admission", steps)]}
    >
      <div className="space-y-10">
      <Section id="steps" heading="Step-by-step: CSAS admission">
        <p>
          <strong className="text-ink">The flow in five steps.</strong> Each step has a deadline — miss
          one and you can lose a seat, regardless of your score.
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          {steps.map((s) => (
            <li key={s.name}>
              <strong className="text-ink">{s.name}:</strong> {s.text}
            </li>
          ))}
        </ol>
      </Section>

      <Section id="dates" heading="Key CUET admission dates">
        <p>
          <strong className="text-ink">All dates are perishable</strong> — confirm each against the
          official source before relying on it.
        </p>
        <ComparisonTable
          caption="CUET / CSAS key date windows"
          date="pending verification"
          source="cuet.nta.nic.in / university CSAS portal"
          illustrative
          columns={[
            { key: "event", header: "Event" },
            { key: "window", header: "Window" },
            { key: "source", header: "Source" },
          ]}
          rows={dates.map((d) => ({ event: d.event, window: d.dateWindow, source: d.source }))}
        />
      </Section>

      </div>
    </HubPage>
  );
}
