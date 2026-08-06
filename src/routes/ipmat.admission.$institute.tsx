import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { howToSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import { getInstitute } from "@/data/ipmat";
import type { FAQItem } from "@/components/seo/FAQ";

export const Route = createFileRoute("/ipmat/admission/$institute")({
  loader: ({ params }) => {
    const institute = getInstitute(params.institute);
    if (!institute) throw notFound();
    return { institute };
  },
  head: ({ params }) => {
    const inst = getInstitute(params.institute);
    const short = inst?.short ?? "IPMAT";
    return pageHead({
      title: `${short} IPM Admission Steps | ${BRAND_SHORT}`,
      description: `${short} IPM admission — registration, exam, Personal Interview and the composite result, step by step. Verify dates officially.`,
      path: `/ipmat/admission/${params.institute}`,
    });
  },
  component: InstituteAdmission,
});

function InstituteAdmission() {
  const { institute } = Route.useLoaderData();

  const steps = [
    { name: `Register for ${institute.short}`, text: `Create an account on the ${institute.name} portal and apply during the registration window.` },
    { name: "Complete the form & pay", text: "Fill personal and academic details, upload documents, and pay the application fee to confirm." },
    { name: "Sit the IPMAT exam", text: "Download the admit card and take the exam on the scheduled date at your allotted centre." },
    { name: "Clear the cutoff for a PI call", text: `Meet ${institute.short}'s sectional/overall cutoff to be shortlisted for the Personal Interview.` },
    { name: "Attend the PI & await composite result", text: "Attend the Personal Interview; the final offer is decided on the composite score." },
  ];

  const faqs: FAQItem[] = [
    { q: `How do I get admission to ${institute.short} via IPMAT?`, a: <>Register on the {institute.name} portal, apply and pay, sit the IPMAT exam, clear the cutoff for a Personal Interview call, then attend the PI. The final offer is based on the composite score — verify all dates on the official portal.</> },
    { q: `Is the ${institute.short} cutoff the only requirement?`, a: <>No. Clearing the cutoff earns a PI call, but admission is decided on the composite of aptitude score, Personal Interview and academic factors. See the composite-score breakdown for details.</> },
  ];

  return (
    <ContentPage
      canonicalPath={`/ipmat/admission/${institute.slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: `${institute.short} admission` },
      ]}
      title={`${institute.name}: IPM Admission Steps`}
      introLead="Direct answer:"
      intro={
        <>
          Admission to {institute.name} via IPMAT runs in stages: register and apply on the institute
          portal, sit the IPMAT exam, clear the cutoff for a Personal Interview call, then attend the PI
          — with the final offer decided on the composite score. Verify every date officially.
        </>
      }
      toc={[{ id: "steps", label: "Admission steps" }]}
      ctaMessage={`Hi LPT Delhi-NCR, guide me through ${institute.short} IPM admission`}
      faqs={faqs}
      schema={[howToSchema(`How to get ${institute.name} IPM admission via IPMAT`, steps)]}
    >
      <Section id="steps" heading={`${institute.short} admission, step by step`}>
        <ol className="list-decimal space-y-2 pl-5">
          {steps.map((s) => (
            <li key={s.name}>
              <strong className="text-ink">{s.name}:</strong> {s.text}
            </li>
          ))}
        </ol>
        <p className="text-sm">
          See the <a href={`/ipmat/composite-score/${institute.slug}`} className="text-brand hover:underline">{institute.short} composite score</a>,{" "}
          <a href="/ipmat/important-dates" className="text-brand hover:underline">important dates</a>, or start{" "}
          <a href="/courses/ipmat" className="text-brand hover:underline">IPMAT coaching</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
