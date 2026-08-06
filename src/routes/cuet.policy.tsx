import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Who decides CUET policy?", a: <>CUET is conducted by the NTA on behalf of the participating universities and the relevant ministry/UGC framework. The NTA sets the exam process; universities decide how to use CUET scores for admission. Policy specifics are published officially and can change between cycles.</> },
  { q: "Do all central universities have to use CUET?", a: <>Participation is defined by policy for the cycle. Many central universities admit through CUET, and others participate to varying degrees. Always check whether your specific target university and course use CUET, and how, on the official sources.</> },
];

export const Route = createFileRoute("/cuet/policy")({
  head: () =>
    pageHead({
      title: `CUET Policy & Governance Explained | ${BRAND_SHORT}`,
      description:
        "CUET policy — who conducts it, how universities use the score, and where policy is decided. An evergreen overview; verify cycle specifics officially.",
      path: "/cuet/policy",
      ogType: "article",
    }),
  component: Policy,
});

function Policy() {
  return (
    <ContentPage
      canonicalPath="/cuet/policy"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Policy" }]}
      title="CUET Policy & Governance"
      introLead="Direct answer:"
      intro={
        <>
          CUET is conducted by the NTA within the participating-university and UGC policy framework: the
          NTA runs the exam and releases scores, while each university decides how it uses CUET for
          admission. Policy specifics are published officially and can change between cycles — confirm
          for your target university.
        </>
      }
      toc={[{ id: "who", label: "Who decides what" }, { id: "use", label: "How scores are used" }]}
      ctaMessage="Hi LPT Delhi-NCR, I have a CUET policy question"
      faqs={faqs}
      schema={[articleSchema({ headline: "CUET Policy & Governance", dateModified: LAST_UPDATED })]}
    >
      <Section id="who" heading="Who decides what">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-ink">NTA:</strong> conducts the exam, normalises and releases scores.</li>
          <li><strong className="text-ink">Universities:</strong> decide eligibility, weightage and admission via their own process.</li>
          <li><strong className="text-ink">Framework:</strong> set within the broader UGC/ministry policy for the cycle.</li>
        </ul>
      </Section>
      <Section id="use" heading="How scores are used">
        <p>
          A CUET score is an input to each university's admission, not an automatic admit. See{" "}
          <a href="/cuet/admission" className="text-brand hover:underline">admission</a> and{" "}
          <a href="/cuet/changes" className="text-brand hover:underline">recent changes</a>; verify on cuet.nta.nic.in.
        </p>
      </Section>
    </ContentPage>
  );
}
