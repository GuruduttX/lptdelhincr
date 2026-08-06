import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "How does the CUET language section work?", a: <>CUET offers a language component testing reading comprehension and language skills, with a choice of languages. You select language(s) to meet your target course's requirement. The list of available languages and the number you can pick are set per cycle — verify on cuet.nta.nic.in.</> },
  { q: "Which language should I choose for CUET?", a: <>Choose the language you read most fluently and that satisfies your target course's eligibility. The section rewards comprehension speed and accuracy, so your strongest reading language is usually the safest pick — confirm it's accepted for your course.</> },
];

export const Route = createFileRoute("/cuet/languages")({
  head: () =>
    pageHead({
      title: `CUET Languages Section Explained | ${BRAND_SHORT}`,
      description:
        "CUET languages section — reading comprehension and language skills with a choice of languages, selected to meet your course requirement.",
      path: "/cuet/languages",
      ogType: "article",
    }),
  component: Languages,
});

function Languages() {
  return (
    <ContentPage
      canonicalPath="/cuet/languages"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Languages" }]}
      title="CUET Languages Section"
      introLead="Direct answer:"
      intro={
        <>
          The CUET language component tests reading comprehension and language skills, with a choice of
          languages you select to meet your target course's requirement. The available languages and
          how many you can choose are set per cycle, so confirm the current list on cuet.nta.nic.in
          before selecting.
        </>
      }
      toc={[{ id: "what", label: "What it tests" }, { id: "choose", label: "Choosing a language" }]}
      ctaMessage="Hi LPT Delhi-NCR, help me with the CUET language section"
      faqs={faqs}
      schema={[articleSchema({ headline: "CUET Languages Section", dateModified: LAST_UPDATED })]}
    >
      <Section id="what" heading="What the language section tests">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-ink">Reading comprehension:</strong> understanding passages quickly and accurately.</li>
          <li><strong className="text-ink">Language skills:</strong> vocabulary, grammar and usage.</li>
          <li><strong className="text-ink">Choice of language:</strong> selected to satisfy your course requirement.</li>
        </ul>
      </Section>

      <Section id="choose" heading="Choosing your language">
        <p>
          <strong className="text-ink">Pick fluency that fits eligibility.</strong> Choose the language
          you read fastest, provided it's accepted for your target course (see{" "}
          <a href="/cuet/subject-rules" className="text-brand hover:underline">subject rules</a>). Build speed with
          a <a href="/cuet/study-plan/6-month" className="text-brand hover:underline">study plan</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
