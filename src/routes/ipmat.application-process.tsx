import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { howToSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import { INSTITUTES } from "@/data/ipmat";
import type { FAQItem } from "@/components/seo/FAQ";

const steps = [
  { name: "Register on the institute portal", text: "Create an account on the IIM Indore / Rohtak or JIPMAT portal and start the application during the registration window." },
  { name: "Fill the form & upload documents", text: "Enter your personal, academic and category details and upload the required documents and photograph as specified." },
  { name: "Pay the application fee", text: "Pay the fee online; your application is not complete until payment is confirmed." },
  { name: "Download the admit card", text: "When released, download your admit card and check the exam centre, date and reporting time." },
  { name: "Sit the exam, then the PI if shortlisted", text: "Take the IPMAT exam; if you clear the cutoff, attend the Personal Interview before the final composite result." },
];

const faqs: FAQItem[] = [
  { q: "What is the IPMAT application process?", a: <>Register on the institute portal during the window, complete the form and upload documents, pay the fee, download the admit card, sit the exam, and — if shortlisted — attend the Personal Interview before the composite result. Each institute runs its own timeline.</> },
  { q: "Do I apply separately for IIM Indore and Rohtak?", a: <>Yes. IIM Indore, IIM Rohtak and JIPMAT have separate applications and fees. To keep all options open, register for each institute you're targeting within its own window — there is no single combined IPMAT form.</> },
];

export const Route = createFileRoute("/ipmat/application-process")({
  head: () =>
    pageHead({
      title: `IPMAT Application Process Step by Step | ${BRAND_SHORT}`,
      description:
        "IPMAT application process — register, fill the form, pay, download the admit card, sit the exam and attend the PI. Apply separately for each institute.",
      path: "/ipmat/application-process",
    }),
  component: ApplicationProcess,
});

function ApplicationProcess() {
  return (
    <ContentPage
      canonicalPath="/ipmat/application-process"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Application process" }]}
      title="IPMAT Application Process, Step by Step"
      introLead="Direct answer:"
      intro={
        <>
          To apply for IPMAT: register on the institute's portal during the window, complete the form
          and upload documents, pay the fee, download the admit card, sit the exam, and attend the
          Personal Interview if shortlisted. You apply <strong>separately</strong> for IIM Indore, IIM
          Rohtak and JIPMAT — each has its own timeline.
        </>
      }
      toc={[
        { id: "steps", label: "Step by step" },
        { id: "institutes", label: "Apply per institute" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, guide me through the IPMAT application"
      faqs={faqs}
      schema={[howToSchema("How to apply for IPMAT", steps)]}
    >
      <Section id="steps" heading="The application in 5 steps">
        <ol className="list-decimal space-y-2 pl-5">
          {steps.map((s) => (
            <li key={s.name}>
              <strong className="text-ink">{s.name}:</strong> {s.text}
            </li>
          ))}
        </ol>
      </Section>

      <Section id="institutes" heading="Apply for each institute">
        <ul className="list-disc space-y-2 pl-5">
          {INSTITUTES.map((i) => (
            <li key={i.slug}>
              <a href={`/ipmat/admission/${i.slug}`} className="text-brand hover:underline">
                {i.name} — admission steps
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm">
          Check <a href="/ipmat/important-dates" className="text-brand hover:underline">important dates</a> and{" "}
          <a href="/ipmat/eligibility" className="text-brand hover:underline">eligibility</a> first.
        </p>
      </Section>
    </ContentPage>
  );
}
