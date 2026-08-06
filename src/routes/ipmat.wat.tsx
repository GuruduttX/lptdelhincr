import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "What is the WAT in IPM selection?", a: <>The Written Ability Test (WAT), where used, asks you to write a short, structured response to a prompt — often a current-affairs or opinion topic — within a time limit. It assesses clarity, structure and reasoning in writing, complementing the Personal Interview.</> },
  { q: "How do I prepare for the IPM WAT?", a: <>Practise writing tight, structured responses (intro, balanced points, conclusion) on common themes within a fixed time. Read widely for awareness, and review your writing for clarity and concision. The skill is structured thinking under time, not flowery prose.</> },
];

export const Route = createFileRoute("/ipmat/wat")({
  head: () =>
    pageHead({
      title: `IPM WAT (Written Ability Test) Guide | ${BRAND_SHORT}`,
      description:
        "IPM WAT guide — what the Written Ability Test assesses (clarity, structure, reasoning) and how to prepare with timed, structured writing practice.",
      path: "/ipmat/wat",
      ogType: "article",
    }),
  component: Wat,
});

function Wat() {
  return (
    <ContentPage
      canonicalPath="/ipmat/wat"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "WAT" }]}
      title="IPM WAT (Written Ability Test) Guide"
      introLead="Direct answer:"
      intro={
        <>
          The Written Ability Test, where used in IPM selection, asks for a short, structured written
          response to a prompt within a time limit, assessing clarity, structure and reasoning. Prepare
          with timed practice on common themes — the skill is structured thinking under time, not
          elaborate prose.
        </>
      }
      toc={[{ id: "what", label: "What it assesses" }, { id: "prep", label: "How to prepare" }]}
      ctaMessage="Hi LPT Delhi-NCR, help me prepare for the IPM WAT"
      faqs={faqs}
      schema={[articleSchema({ headline: "IPM WAT (Written Ability Test) Guide", dateModified: LAST_UPDATED })]}
    >
      <Section id="what" heading="What the WAT assesses">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-ink">Clarity:</strong> a clear position, expressed simply.</li>
          <li><strong className="text-ink">Structure:</strong> intro, balanced points, conclusion.</li>
          <li><strong className="text-ink">Reasoning:</strong> evidence and logic over opinion alone.</li>
        </ul>
      </Section>

      <Section id="prep" heading="How to prepare">
        <p>
          <strong className="text-ink">Write timed, structured responses.</strong> Practise common
          themes, keep it concise, and self-review for clarity. Pair with{" "}
          <a href="/ipmat/profile-building" className="text-brand hover:underline">profile-building</a> and{" "}
          <a href="/ipmat/interview/indore" className="text-brand hover:underline">interview prep</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
