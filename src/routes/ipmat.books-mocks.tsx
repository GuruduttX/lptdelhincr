import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { itemListSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const resources = [
  { name: "Concept books (QA, Verbal, LR)", desc: "Topic theory with solved examples per section." },
  { name: "Previous-year question sets", desc: "Pattern-spotting from past IPMAT/JIPMAT papers." },
  { name: "Full-length mock series", desc: "Proctored, timed mocks mirroring the on-screen exam." },
  { name: "Sectional & topic tests", desc: "Targeted drills to fix weak areas." },
];

const faqs: FAQItem[] = [
  { q: "What books and mocks do I need for IPMAT?", a: <>You need concept books for Quant, Verbal and (for Rohtak) Logical Reasoning, previous-year question sets for pattern practice, and a full-length timed mock series. Reviewing every mock — not just taking it — is what converts practice into score.</> },
  { q: "Are mock tests important for IPMAT?", a: <>Yes. Timed, full-length mocks build familiarity with the on-screen interface, the sectional lock at Indore and the marking scheme, and surface weak topics early. Use sectional tests to fix specific gaps between full mocks.</> },
];

export const Route = createFileRoute("/ipmat/books-mocks")({
  head: () =>
    pageHead({
      title: `IPMAT Books & Mock Tests | ${BRAND_SHORT}`,
      description:
        "IPMAT books and mock tests — concept books, previous-year sets, full-length timed mocks and sectional tests. What to use and how to review for score gains.",
      path: "/ipmat/books-mocks",
    }),
  component: BooksMocks,
});

function BooksMocks() {
  return (
    <ContentPage
      canonicalPath="/ipmat/books-mocks"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Books & mocks" }]}
      title="IPMAT Books & Mock Tests"
      introLead="Direct answer:"
      intro={
        <>
          For IPMAT you need concept books (Quant, Verbal and Logical Reasoning for Rohtak),
          previous-year question sets, a full-length timed mock series, and sectional tests for weak
          areas. The mocks matter most — but only if you review every error, not just take them.
        </>
      }
      toc={[{ id: "resources", label: "What you need" }]}
      ctaMessage="Hi LPT Delhi-NCR, recommend IPMAT books and mocks"
      faqs={faqs}
      schema={[itemListSchema(resources.map((r) => ({ name: r.name, url: "/ipmat/books-mocks" })))]}
    >
      <Section id="resources" heading="What you need">
        <ul className="space-y-3">
          {resources.map((r) => (
            <li key={r.name} className="rounded-xl border border-hairline bg-white p-4">
              <strong className="text-ink">{r.name}</strong>
              <p className="mt-1 text-sm text-body">{r.desc}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm">
          Build a plan with <a href="/ipmat/preparation/6-month" className="text-brand hover:underline">prep plans</a> and the{" "}
          <a href="/ipmat/syllabus" className="text-brand hover:underline">syllabus</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
