import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { datesFor } from "@/data/dates";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "When is the IPMAT exam?", a: <>IPMAT Indore and Rohtak, and JIPMAT, each run on their own schedule set annually by the conducting institute. Exact registration and exam dates change every cycle — always confirm them on the official institute website before planning.</> },
  { q: "Do IIM Indore and Rohtak have the same IPMAT dates?", a: <>Not necessarily. IIM Indore and IIM Rohtak run separate IPMAT exams with independent timelines, and JIPMAT has its own. Track each institute you're targeting separately so you don't miss a registration window.</> },
];

export const Route = createFileRoute("/ipmat/important-dates")({
  head: () =>
    pageHead({
      title: `IPMAT Important Dates & Windows | ${BRAND_SHORT}`,
      description:
        "IPMAT important dates — registration, exam and result windows for IIM Indore, Rohtak and JIPMAT. Verify each against the official source.",
      path: "/ipmat/important-dates",
      ogType: "article",
    }),
  component: ImportantDates,
});

function ImportantDates() {
  const dates = datesFor("IPMAT");
  return (
    <ContentPage
      canonicalPath="/ipmat/important-dates"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Important dates" }]}
      title="IPMAT Important Dates & Windows"
      introLead="Direct answer:"
      intro={
        <>
          IIM Indore, IIM Rohtak and JIPMAT each set their own IPMAT registration, exam and result
          windows annually. Because every date is perishable and institute-specific, track each target
          separately and confirm against the official source — the windows below are placeholders until
          verified.
        </>
      }
      toc={[{ id: "dates", label: "Key windows" }]}
      ctaMessage="Hi LPT Delhi-NCR, share the IPMAT timeline for my target IIM"
      faqs={faqs}
      schema={[articleSchema({ headline: "IPMAT Important Dates & Windows", dateModified: LAST_UPDATED })]}
    >
      <Section id="dates" heading="Key IPMAT windows">
        <p>
          <strong className="text-ink">All dates are perishable</strong> — verify each before relying
          on it.
        </p>
        <ComparisonTable
          caption="IPMAT key date windows"
          date="pending verification"
          source="iimidr.ac.in / iimrohtak.ac.in / JIPMAT portal"
          illustrative
          columns={[
            { key: "event", header: "Event" },
            { key: "window", header: "Window" },
            { key: "source", header: "Source" },
          ]}
          rows={dates.map((d) => ({ event: d.event, window: d.dateWindow, source: d.source }))}
        />
        <p className="text-sm">
          Next: check the <a href="/ipmat/application-process" className="text-brand hover:underline">application process</a>{" "}
          and <a href="/ipmat/eligibility" className="text-brand hover:underline">eligibility</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
