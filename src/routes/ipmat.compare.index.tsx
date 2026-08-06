import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { itemListSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "IPM or a regular BBA — which is better?", a: <>An IPM at an IIM is a five-year integrated programme with a management-school brand and PG-level study built in; a regular BBA is a three-year undergraduate degree. IPM suits students certain about management who clear IPMAT; BBA keeps options broader. Compare on fit, not prestige alone.</> },
];

export const Route = createFileRoute("/ipmat/compare/")({
  head: () =>
    pageHead({
      title: `IPMAT Comparisons: IPM vs BBA & More | ${BRAND_SHORT}`,
      description:
        "IPMAT comparisons — IPM vs BBA and IIM Indore vs Rohtak. Clear, factual breakdowns to help you choose the right route and institute.",
      path: "/ipmat/compare",
    }),
  component: CompareHub,
});

function CompareHub() {
  return (
    <ContentPage
      canonicalPath="/ipmat/compare"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Compare" }]}
      title="IPMAT Comparisons"
      introLead="Direct answer:"
      intro={
        <>
          The two decisions IPM aspirants face most: whether the five-year IPM beats a regular BBA, and
          which IIM (Indore vs Rohtak) suits you. The comparisons below break each down factually so you
          can choose by fit, then head to the right resources.
        </>
      }
      toc={[{ id: "list", label: "Comparisons" }]}
      ctaMessage="Hi LPT Delhi-NCR, help me compare IPM options"
      faqs={faqs}
      schema={[
        itemListSchema([
          { name: "IPM vs BBA", url: "/ipmat/compare/ipm-vs-bba" },
          { name: "IIM Indore vs Rohtak", url: "/ipmat/compare/indore-vs-rohtak" },
        ]),
      ]}
    >
      <Section id="list" heading="Comparisons">
        <ul className="list-disc space-y-2 pl-5">
          <li><a href="/ipmat/compare/ipm-vs-bba" className="text-brand hover:underline">IPM vs BBA</a> — integrated management vs a standalone bachelor's.</li>
          <li><a href="/ipmat/compare/indore-vs-rohtak" className="text-brand hover:underline">IIM Indore vs Rohtak</a> — exam pattern, marking and fit.</li>
          <li>Is the IPM <a href="/ipmat/worth-it" className="text-brand hover:underline">worth it</a>? — fees vs outcomes.</li>
        </ul>
      </Section>
    </ContentPage>
  );
}
