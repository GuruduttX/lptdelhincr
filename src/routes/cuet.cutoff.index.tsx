import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { datasetSchema } from "@/lib/schema";
import { BRAND_SHORT, DOMAIN } from "@/config/site";
import { cutoffs, cutoffsAreIllustrativeOnly } from "@/data/cutoffs";
import { Tbd } from "@/components/lpt/shared";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Does NTA release CUET cutoffs?", a: <>No. NTA conducts CUET and releases scores; cutoffs are released by each university. For Delhi University, cutoffs come through the CSAS process across allotment rounds, set separately for each college, course and category.</> },
  { q: "Do CUET cutoffs drop in later rounds?", a: <>Usually yes. As higher-scoring applicants accept seats in early rounds, later CSAS rounds and spot rounds often close at lower scores — though popular college–course combinations can stay competitive throughout.</> },
  { q: "Is a high CUET score enough for admission?", a: <>No. You must also register for the university's process (CSAS for DU), fill preferences, receive an allotment and accept the seat. A high score with no counselling action gets no admission.</> },
  { q: "Are cutoffs the same for every category?", a: <>No. Cutoffs are set separately for General, OBC-NCL, SC, ST, EWS and PwBD. Reserved-category cutoffs are usually lower than General for the same college–course, but the gap varies by college and round.</> },
];

export const Route = createFileRoute("/cuet/cutoff/")({
  head: () =>
    pageHead({
      title: `CUET Cutoffs: College, Course & Category | ${BRAND_SHORT}`,
      description:
        "How CUET cutoffs work — released by universities (not NTA) via CSAS, by college, course, category & round. See the dataset and predict your college.",
      path: "/cuet/cutoff",
    }),
  component: CutoffHub,
});

function CutoffHub() {
  return (
    <HubPage
      canonicalPath="/cuet/cutoff"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Cutoffs" }]}
      title="CUET Cutoffs — by College, Course, Category & Round"
      introLead="Direct answer:"
      intro={
        <>
          CUET cutoffs are the minimum CUET scores at which a college–course closed in a given round,
          set separately for each category. They are <strong>released by the universities</strong> (for
          DU, via CSAS) — not by the NTA. Cutoffs emerge from demand, seats and applicant scores, so they
          change every year.
        </>
      }
      clusterOf="/cuet/cutoff"
      ctaMessage="Hi LPT Delhi-NCR, help me plan CUET admission by cutoff"
      faqs={faqs}
      schema={[
        datasetSchema({
          name: "CUET Cutoff Dataset (college × course × category × round)",
          description: "Multi-year CUET cutoffs sourced from official university CSAS releases.",
          temporalCoverage: "2022/2026",
          csvUrl: `${DOMAIN}/cuet/cutoff/dataset.csv`,
        }),
      ]}
    >
      <div className="space-y-10">
        <Section id="how" heading="How CUET cutoffs are decided">
          <p>
            <strong className="text-ink">Cutoffs are not fixed in advance — they emerge.</strong> A
            college–course closes at whatever score the last admitted candidate in a category had, once
            seats fill in a round. Because demand, seats and the score distribution change yearly, the
            same combination's cutoff rises or falls each cycle.
          </p>
          <p>
            <strong className="text-ink">Key disambiguation:</strong> the NTA conducts CUET and releases
            scores; <strong className="text-ink">universities (here, DU via CSAS) release the
            cutoffs.</strong> Clearing CUET ≠ admission — you must complete CSAS allotment and seat
            acceptance.
          </p>
        </Section>

        <Section id="sample" heading="CUET cutoffs (sample)">
          <p>
            The full, sourced table lives on the{" "}
            <a href="/cuet/cutoff/dataset" className="text-brand hover:underline">CUET cutoff dataset</a>{" "}
            page (downloadable CSV). A sample of the structure:
          </p>
          <ComparisonTable
            caption="CUET cutoffs — sample structure"
            date="pending verification"
            source="official university CSAS releases"
            illustrative={cutoffsAreIllustrativeOnly()}
            columns={[
              { key: "college", header: "College" },
              { key: "course", header: "Course" },
              { key: "category", header: "Category" },
              { key: "round", header: "Round", align: "right" },
              { key: "cutoff", header: "Cutoff", align: "right" },
            ]}
            rows={cutoffs.map((r) => ({
              college: r.college,
              course: r.course,
              category: r.category,
              round: r.round,
              cutoff: r.cutoff ?? <Tbd label="verify" />,
            }))}
          />
          <p>
            <a href="/cuet/cutoff/how-cutoffs-work" className="text-brand hover:underline">Read how DU CUET cutoffs work →</a>
          </p>
        </Section>
      </div>
    </HubPage>
  );
}
