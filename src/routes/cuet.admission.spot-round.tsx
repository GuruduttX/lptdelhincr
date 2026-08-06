import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { howToSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const steps = [
  { name: "Wait for the spot-round notice", text: "After the main rounds, the university announces a spot round to fill seats still vacant, with its own eligibility rules and schedule." },
  { name: "Check vacant seats", text: "Review the published vacancy list to see which college–course combinations still have open seats in your category." },
  { name: "Re-register / opt in if required", text: "Some spot rounds need a fresh opt-in or fee; follow the exact instructions, as rules differ from earlier rounds." },
  { name: "Fill preferences for vacant seats", text: "Add and rank only the still-available combinations you would accept." },
  { name: "Accept the allotment promptly", text: "Spot-round allotments often have very short acceptance windows and may require forgoing a previously held seat — decide quickly and carefully." },
];

const faqs: FAQItem[] = [
  { q: "What is a CSAS spot round?", a: <>A spot round is a final allotment stage after the main CSAS rounds, held to fill seats that remain vacant. It has its own eligibility, schedule and rules — often including short acceptance windows — so read the official notice carefully before opting in.</> },
  { q: "Should I participate in the spot round?", a: <>Participate if you don't yet have a seat you're happy with and acceptable options are still vacant. Be aware spot rounds can require giving up a previously allotted seat, so weigh the risk against the potential gain.</> },
];

export const Route = createFileRoute("/cuet/admission/spot-round")({
  head: () =>
    pageHead({
      title: `CUET CSAS Spot Round Explained | ${BRAND_SHORT}`,
      description:
        "CUET CSAS spot round explained — the final stage to fill vacant seats, its rules and short acceptance windows, and a step-by-step on how to participate.",
      path: "/cuet/admission/spot-round",
    }),
  component: SpotRound,
});

function SpotRound() {
  return (
    <ContentPage
      canonicalPath="/cuet/admission/spot-round"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Admission", item: "/cuet/admission" },
        { name: "Spot round" },
      ]}
      title="CUET CSAS Spot Round, Explained"
      introLead="Direct answer:"
      intro={
        <>
          A CSAS <strong>spot round</strong> is the final allotment stage, held after the main rounds to
          fill seats still vacant. It has distinct rules and often short acceptance windows, and may
          require forgoing a previously allotted seat. Follow the steps below and always read the
          official spot-round notice.
        </>
      }
      toc={[{ id: "steps", label: "How to participate" }]}
      ctaMessage="Hi LPT Delhi-NCR, guide me through the CSAS spot round"
      faqs={faqs}
      schema={[howToSchema("How to participate in the CUET CSAS spot round", steps)]}
    >
      <Section id="steps" heading="How to participate in the spot round">
        <ol className="list-decimal space-y-2 pl-5">
          {steps.map((s) => (
            <li key={s.name}>
              <strong className="text-ink">{s.name}:</strong> {s.text}
            </li>
          ))}
        </ol>
        <p className="text-sm">
          Unsure whether to hold your current seat? Compare{" "}
          <a href="/cuet/admission/freeze-vs-upgrade" className="text-brand hover:underline">freeze vs upgrade</a>{" "}
          first, and revisit the <a href="/cuet/admission" className="text-brand hover:underline">admission hub</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
