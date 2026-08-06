import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { Section } from "@/components/seo/ContentPage";
import { itemListSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import { INSTITUTES } from "@/data/ipmat";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Which IIMs offer the IPM programme?", a: <>IIM Indore and IIM Rohtak run their own five-year Integrated Programme in Management with their own IPMAT exams, while IIM Jammu and IIM Bodh Gaya admit through JIPMAT. Each has its own pattern, cutoffs and fees — verify the current details on the official institute site.</> },
  { q: "How do I choose between IPM institutes?", a: <>Compare exam pattern, sectional rules, cutoffs, fees and location for each institute against your strengths and budget. Our per-institute composite-score and comparison pages help you weigh them; final figures should be confirmed officially.</> },
];

export const Route = createFileRoute("/ipmat/colleges/")({
  head: () =>
    pageHead({
      title: `IPM Colleges & IIMs (IPMAT) | ${BRAND_SHORT}`,
      description:
        "IPM colleges via IPMAT — IIM Indore, Rohtak and JIPMAT (Jammu, Bodh Gaya). Compare pattern, cutoffs and programme structure.",
      path: "/ipmat/colleges",
    }),
  component: CollegesHub,
});

function CollegesHub() {
  return (
    <HubPage
      canonicalPath="/ipmat/colleges"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Colleges" }]}
      title="IPM Colleges & IIMs (via IPMAT)"
      introLead="Direct answer:"
      intro={
        <>
          The five-year IPM is offered by IIM Indore and IIM Rohtak (own IPMAT exams) and by IIM Jammu
          and Bodh Gaya (via JIPMAT). Compare the institutes and the programme below — detailed
          per-institute profiles publish as verified seats, fees and placement data are added.
        </>
      }
      clusterOf="/ipmat/colleges"
      ctaMessage="Hi LPT Delhi-NCR, help me choose an IPM institute"
      faqs={faqs}
      schema={[itemListSchema(INSTITUTES.map((i) => ({ name: i.name, url: `/ipmat/composite-score/${i.slug}` })))]}
    >
      <Section id="institutes" heading="IPM institutes">
        <ul className="list-disc space-y-2 pl-5">
          {INSTITUTES.map((i) => (
            <li key={i.slug}>
              <strong className="text-ink">{i.name}</strong> — see{" "}
              <a href={`/ipmat/composite-score/${i.slug}`} className="text-brand hover:underline">composite scoring</a> and{" "}
              <a href={`/ipmat/admission/${i.slug}`} className="text-brand hover:underline">admission steps</a>.
            </li>
          ))}
        </ul>
        <p className="text-sm text-brand">Per-institute profiles with verified seats, fees &amp; placements publish as data is confirmed (no thin pages).</p>
      </Section>
    </HubPage>
  );
}
