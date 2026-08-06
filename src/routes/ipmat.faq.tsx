import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { faqPageSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import { ipmatTrustFaqs } from "@/data/faqs";

export const Route = createFileRoute("/ipmat/faq")({
  head: () =>
    pageHead({
      title: `IPMAT FAQ: Is It Hard, Coaching & More | ${BRAND_SHORT}`,
      description:
        "IPMAT experience FAQ — is it hard, self-study vs coaching, parent guidance and managing stress. For the full question bank, see /faq/ipmat.",
      path: "/ipmat/faq",
    }),
  component: IpmatFaq,
});

function IpmatFaq() {
  return (
    <ContentPage
      canonicalPath="/ipmat/faq"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "FAQ" }]}
      title="IPMAT FAQ: Experience & Common Doubts"
      introLead="In short:"
      intro={
        <>
          Honest answers to what aspirants and parents actually ask about IPMAT — how hard it is,
          self-study vs coaching, and managing the pressure of a big early decision. For the full,
          cluster-organised question bank, see the{" "}
          <a href="/faq/ipmat" className="text-brand hover:underline">IPMAT FAQ hub</a>.
        </>
      }
      toc={[{ id: "qa", label: "Common questions" }, { id: "guides", label: "Guides" }]}
      ctaMessage="Hi LPT Delhi-NCR, I have an IPMAT question"
      schema={[faqPageSchema(ipmatTrustFaqs.map((f) => ({ q: f.q, a: f.a })))]}
    >
      <Section id="qa" heading="Common IPMAT questions">
        <div className="divide-y divide-hairline">
          {ipmatTrustFaqs.map((f, i) => (
            <div key={i} className="py-4">
              <h3 className="text-base font-semibold text-ink">{f.q}</h3>
              <p className="mt-2 text-body leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="guides" heading="Deeper guides">
        <ul className="list-disc space-y-2 pl-5">
          <li><a href="/ipmat/self-study-vs-coaching" className="text-brand hover:underline">Self-study vs coaching for IPMAT</a></li>
          <li><a href="/ipmat/parents-guide" className="text-brand hover:underline">A parent's guide to IPMAT</a></li>
          <li><a href="/ipmat/wellbeing" className="text-brand hover:underline">Managing stress &amp; wellbeing</a></li>
          <li>Full <a href="/faq/ipmat" className="text-brand hover:underline">IPMAT FAQ hub</a></li>
        </ul>
      </Section>
    </ContentPage>
  );
}
