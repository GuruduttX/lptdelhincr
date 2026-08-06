import { ContentPage, Section } from "@/components/seo/ContentPage";
import { faqPageSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import type { Faq } from "@/data/faqs";
import type { Vertical } from "@/config/site";

/**
 * FaqHub (SOP B6 / H6) — a vertical FAQ hub. Groups deduped Q&As by cluster
 * with an anchor TOC; answers are server-rendered in raw HTML. Carries an
 * optional minimal FAQPage JSON-LD (allowed on FAQ hubs only).
 */
const CLUSTER_LABELS: Record<string, string> = {
  basics: "CUET basics",
  cutoffs: "Cutoffs",
  results: "Results & percentile",
  admission: "Admission",
  syllabus: "Syllabus & subjects",
  prep: "Preparation",
  exam: "Exam pattern",
  marking: "Marking",
  selection: "Cutoffs & selection",
  eligibility: "Eligibility",
};

export function FaqHub({
  vertical,
  faqs,
  hubHref,
  courseHref,
}: {
  vertical: Vertical;
  faqs: Faq[];
  hubHref: string;
  courseHref: string;
}) {
  // Preserve first-seen cluster order.
  const order: string[] = [];
  const byCluster: Record<string, Faq[]> = {};
  for (const f of faqs) {
    if (!byCluster[f.cluster]) {
      byCluster[f.cluster] = [];
      order.push(f.cluster);
    }
    byCluster[f.cluster].push(f);
  }

  const path = vertical === "CUET" ? "/faq/cuet" : "/faq/ipmat";

  return (
    <ContentPage
      canonicalPath={path}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "FAQ", item: "/faq" },
        { name: vertical },
      ]}
      title={`${vertical} FAQs: ${faqs.length} Questions Answered`}
      introLead="In short:"
      intro={
        <>
          Answers to the most common {vertical} questions — on{" "}
          {order.map((c) => CLUSTER_LABELS[c] ?? c).join(", ").toLowerCase()} — written from official
          processes and updated as cycles change. Each answer is a direct, self-contained response;
          perishable specifics link to the official source.
        </>
      }
      toc={order.map((c) => ({ id: c, label: CLUSTER_LABELS[c] ?? c }))}
      ctaMessage={`Hi LPT Delhi-NCR, I have a ${vertical} question`}
      schema={[faqPageSchema(faqs.map((f) => ({ q: f.q, a: f.a })))]}
    >
      {order.map((cluster) => (
        <Section key={cluster} id={cluster} heading={CLUSTER_LABELS[cluster] ?? cluster}>
          <div className="divide-y divide-hairline">
            {byCluster[cluster].map((f, i) => (
              <div key={i} className="py-4">
                <h3 className="text-base font-semibold text-ink">{f.q}</h3>
                <p className="mt-2 text-body leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </Section>
      ))}

      <Section id="more" heading={`More ${vertical} resources`}>
        <p>
          Explore the <a href={hubHref} className="text-brand hover:underline">{vertical} hub</a>,{" "}
          <a href={courseHref} className="text-brand hover:underline">{vertical} coaching</a>, or the{" "}
          <a href="/faq" className="text-brand hover:underline">master FAQ</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
