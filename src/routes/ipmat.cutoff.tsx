import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { ipmatCutoffs, getInstitute } from "@/data/ipmat";
import { Tbd } from "@/components/lpt/shared";
import { ipmatFaqs } from "@/data/faqs";

export const Route = createFileRoute("/ipmat/cutoff")({
  head: () =>
    pageHead({
      title: `IPMAT Cutoffs & Composite Score | ${BRAND_SHORT}`,
      description:
        "IPMAT cutoffs & composite scoring — sectional cutoffs by institute and category, plus how the aptitude + PI composite decides selection.",
      path: "/ipmat/cutoff",
      ogType: "article",
    }),
  component: CutoffHub,
});

function CutoffHub() {
  return (
    <HubPage
      canonicalPath="/ipmat/cutoff"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Cutoffs" }]}
      title="IPMAT Cutoffs & Composite Score"
      introLead="Direct answer:"
      intro={
        <>
          IPMAT selection combines a <strong>sectional/overall cutoff</strong> (you may need to clear
          each section) with a <strong>composite score</strong> — your aptitude result plus the Personal
          Interview and academic factors. Cutoffs move yearly, so treat any figure as a guide and verify
          against the official institute source.
        </>
      }
      clusterOf="/ipmat/cutoff"
      ctaMessage="Hi LPT Delhi-NCR, what IPMAT score do I need for my target IIM?"
      faqs={ipmatFaqs.filter((f) => f.cluster === "selection").map((f) => ({ q: f.q, a: f.a }))}
      schema={[articleSchema({ headline: "IPMAT Cutoffs & Composite Score", dateModified: LAST_UPDATED })]}
    >
      <div className="space-y-10">
      <Section id="cutoffs" heading="IPMAT sectional cutoffs">
        <p>
          <strong className="text-ink">Sectional cutoffs are cleared independently</strong> where an
          institute sets them — missing one can disqualify a strong overall score. Verified figures will
          be filled in here; placeholders are clearly marked.
        </p>
        <ComparisonTable
          caption="IPMAT cutoffs by institute (General)"
          date="pending verification"
          source="iimidr.ac.in / iimrohtak.ac.in"
          illustrative
          columns={[
            { key: "institute", header: "Institute" },
            { key: "section", header: "Section" },
            { key: "category", header: "Category" },
            { key: "cutoff", header: "Cutoff" },
          ]}
          rows={ipmatCutoffs.map((r) => ({
            institute: getInstitute(r.institute)?.short ?? r.institute,
            section: r.section,
            category: r.category,
            cutoff: r.cutoff ?? <Tbd label="verify" />,
          }))}
        />
      </Section>

      <Section id="composite" heading="How the composite score works">
        <p>
          <strong className="text-ink">Aptitude alone doesn't decide the offer.</strong> Each institute
          combines your IPMAT aptitude score with the Personal Interview and academic/diversity factors
          into a composite (exact weights vary by cycle). See the per-institute breakdowns and safe-score
          guidance in the cards below.
        </p>
      </Section>
      </div>
    </HubPage>
  );
}
