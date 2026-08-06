import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "How is the 5-year IPM structured?", a: <>The Integrated Programme in Management is typically a five-year course: roughly three years of undergraduate foundation followed by two years of postgraduate management study, awarding a management degree on completion. Exact structure and degree nomenclature vary by institute — verify officially.</> },
  { q: "Can I exit the IPM early with a degree?", a: <>Several IPM programmes offer an exit option after the undergraduate phase (commonly three years) with a bachelor's degree, for students who choose not to continue. The exact exit terms and any conditions differ by institute, so confirm them before relying on this.</> },
  { q: "Is the IPM degree the same as doing a separate PG later?", a: <>The IPM gives an integrated path straight after Class 12, combining UG and PG management study in one programme. It saves a separate entrance later and starts management training earlier; whether that suits you depends on your certainty about a management career.</> },
];

export const Route = createFileRoute("/ipmat/programme/structure")({
  head: () =>
    pageHead({
      title: `IPM Programme Structure (3+2) | ${BRAND_SHORT}`,
      description:
        "How the 5-year IPM is structured — a 3-year UG foundation plus 2 years of management study, with exit options. Varies by institute.",
      path: "/ipmat/programme/structure",
      ogType: "article",
    }),
  component: ProgrammeStructure,
});

function ProgrammeStructure() {
  return (
    <ContentPage
      canonicalPath="/ipmat/programme/structure"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: "Colleges", item: "/ipmat/colleges" },
        { name: "Programme structure" },
      ]}
      title="IPM Programme Structure (3+2)"
      introLead="Direct answer:"
      intro={
        <>
          The Integrated Programme in Management is a five-year course taken straight after Class 12:
          broadly three years of undergraduate foundation followed by two years of postgraduate
          management study, with an exit option after the UG phase at several institutes. Exact
          structure varies by institute — verify officially.
        </>
      }
      toc={[{ id: "phases", label: "The 3+2 structure" }, { id: "exit", label: "Exit options" }]}
      ctaMessage="Hi LPT Delhi-NCR, explain the IPM programme structure"
      faqs={faqs}
      schema={[articleSchema({ headline: "IPM Programme Structure (3+2)", dateModified: LAST_UPDATED })]}
    >
      <Section id="phases" heading="The 3+2 structure">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-ink">Years 1–3 (foundation):</strong> undergraduate coursework across management foundations and allied subjects.</li>
          <li><strong className="text-ink">Years 4–5 (management):</strong> postgraduate-level management study at the institute's full rigour.</li>
          <li><strong className="text-ink">Award:</strong> an integrated management degree on completion (nomenclature varies by institute).</li>
        </ul>
      </Section>

      <Section id="exit" heading="Exit options & AMBA-style recognition">
        <p>
          <strong className="text-ink">An early exit is often possible.</strong> Many programmes allow
          leaving after the UG phase with a bachelor's degree. Some institutes hold international
          accreditation. Confirm exit terms, degree and accreditation per institute, and weigh the{" "}
          <a href="/ipmat/roi" className="text-brand hover:underline">return on investment</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
