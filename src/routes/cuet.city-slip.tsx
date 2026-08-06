import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { howToSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const steps = [
  { name: "Wait for the NTA notice", text: "The city intimation slip is released by NTA a few days before the admit card; watch cuet.nta.nic.in and your registered email." },
  { name: "Log in to the CUET portal", text: "Use your application number and password on the official CUET candidate portal." },
  { name: "Download the city slip", text: "Open the city intimation slip and note the allotted exam city (the exact venue comes later on the admit card)." },
  { name: "Plan provisional travel", text: "Use the city to plan provisional travel and stay, but don't finalise until the admit card confirms the venue." },
];

const faqs: FAQItem[] = [
  { q: "What is the CUET city intimation slip?", a: <>It's an advance notice from NTA telling you which city your CUET exam is allotted in, released before the admit card so you can plan travel. It shows the city, not the exact venue — the venue appears later on the admit card.</> },
  { q: "Is the city slip the same as the admit card?", a: <>No. The city slip only tells you the exam city in advance; the admit card (released closer to the exam) carries your exact venue, reporting time and instructions. You must carry the admit card, not the city slip, to the exam.</> },
];

export const Route = createFileRoute("/cuet/city-slip")({
  head: () =>
    pageHead({
      title: `CUET City Intimation Slip: Download Guide | ${BRAND_SHORT}`,
      description:
        "CUET city intimation slip — what it is, when NTA releases it, and how to download it to plan travel. The exact venue comes later on the admit card.",
      path: "/cuet/city-slip",
    }),
  component: CitySlip,
});

function CitySlip() {
  return (
    <ContentPage
      canonicalPath="/cuet/city-slip"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "City slip" }]}
      title="CUET City Intimation Slip"
      introLead="Direct answer:"
      intro={
        <>
          The CUET city intimation slip is an advance NTA notice of your allotted exam city, released
          a few days before the admit card so you can plan travel. It shows the city only — your exact
          venue and reporting time appear later on the admit card. Download it from the official CUET
          portal.
        </>
      }
      toc={[{ id: "steps", label: "How to download" }]}
      ctaMessage="Hi LPT Delhi-NCR, I have a CUET city-slip question"
      faqs={faqs}
      schema={[howToSchema("How to download the CUET city intimation slip", steps)]}
    >
      <Section id="steps" heading="How to download the city slip">
        <ol className="list-decimal space-y-2 pl-5">
          {steps.map((s) => (
            <li key={s.name}><strong className="text-ink">{s.name}:</strong> {s.text}</li>
          ))}
        </ol>
        <p className="text-sm">Next: <a href="/cuet/admit-card" className="text-brand hover:underline">admit card</a> and <a href="/cuet/exam-day" className="text-brand hover:underline">exam-day checklist</a>.</p>
      </Section>
    </ContentPage>
  );
}
