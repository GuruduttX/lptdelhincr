import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { faqPageSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import { cuetTrustFaqs } from "@/data/faqs";

export const Route = createFileRoute("/cuet/faq")({
  head: () =>
    pageHead({
      title: `CUET FAQ: Is It Hard, Coaching & More | ${BRAND_SHORT}`,
      description:
        "CUET experience FAQ — is it hard, can you crack it without coaching, parent guidance, and how CUET differs from board exams.",
      path: "/cuet/faq",
    }),
  component: CuetFaq,
});

function CuetFaq() {
  return (
    <ContentPage
      canonicalPath="/cuet/faq"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "FAQ" }]}
      title="CUET FAQ: Experience & Common Doubts"
      introLead="In short:"
      intro={
        <>
          Honest answers to the questions aspirants and parents actually ask about CUET — how hard it
          is, whether coaching is needed, and how it differs from board exams. For the full,
          cluster-organised question bank, see the{" "}
          <a href="/faq/cuet" className="text-brand hover:underline">CUET FAQ hub</a>.
        </>
      }
      toc={[{ id: "qa", label: "Common questions" }, { id: "guides", label: "Guides" }]}
      ctaMessage="Hi LPT Delhi-NCR, I have a CUET question"
      schema={[faqPageSchema(cuetTrustFaqs.map((f) => ({ q: f.q, a: f.a })))]}
    >
      <Section id="qa" heading="Common CUET questions">
        <div className="divide-y divide-hairline">
          {cuetTrustFaqs.map((f, i) => (
            <div key={i} className="py-4">
              <h3 className="text-base font-semibold text-ink">{f.q}</h3>
              <p className="mt-2 text-body leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="guides" heading="Deeper guides">
        <ul className="list-disc space-y-2 pl-5">
          <li><a href="/cuet/is-cuet-hard" className="text-brand hover:underline">Is CUET hard?</a></li>
          <li><a href="/cuet/without-coaching" className="text-brand hover:underline">Can you crack CUET without coaching?</a></li>
          <li><a href="/cuet/parents-guide" className="text-brand hover:underline">A parent's guide to CUET</a></li>
          <li><a href="/cuet/toppers" className="text-brand hover:underline">CUET toppers</a> · full <a href="/faq/cuet" className="text-brand hover:underline">CUET FAQ hub</a></li>
        </ul>
      </Section>
    </ContentPage>
  );
}
