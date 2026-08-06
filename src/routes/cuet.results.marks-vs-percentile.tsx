import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { marksPercentile } from "@/data/marksPercentile";
import { Tbd } from "@/components/lpt/shared";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "What is the difference between CUET marks and percentile?", a: <>Your raw marks are the points you scored; your percentile is your relative standing among all candidates in your session after normalisation. The same raw mark can map to different percentiles across sessions, so percentile — not raw marks — is used for comparison.</> },
  { q: "Can I convert CUET marks to percentile exactly?", a: <>Not in advance. The marks-to-percentile mapping depends on the normalised distribution of each session, which is only known after results. Any conversion before results is an estimate — treat published bands as guidance, not official figures.</> },
  { q: "Is a higher percentile always better than higher marks?", a: <>For admission, percentile (and the university's use of your score) is what matters, because it reflects your relative position. A high raw mark in an easy shift may yield a lower percentile than a slightly lower mark in a tougher shift after normalisation.</> },
];

export const Route = createFileRoute("/cuet/results/marks-vs-percentile")({
  head: () =>
    pageHead({
      title: `CUET Marks vs Percentile Explained | ${BRAND_SHORT}`,
      description:
        "CUET marks vs percentile: percentile is your normalised relative rank, not raw marks. See estimated bands (clearly labelled) and how the mapping works.",
      path: "/cuet/results/marks-vs-percentile",
      ogType: "article",
    }),
  component: MarksVsPercentile,
});

function MarksVsPercentile() {
  return (
    <ContentPage
      canonicalPath="/cuet/results/marks-vs-percentile"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Results", item: "/cuet/results" },
        { name: "Marks vs percentile" },
      ]}
      title="CUET Marks vs Percentile, Explained"
      introLead="Direct answer:"
      intro={
        <>
          CUET <strong>percentile</strong> is your relative standing among all candidates in your
          session after normalisation — not your raw marks. Because shifts differ slightly in
          difficulty, raw marks are normalised before percentiles are assigned, so the same mark can
          map to different percentiles across sessions.
        </>
      }
      toc={[
        { id: "mapping", label: "How the mapping works" },
        { id: "bands", label: "Estimated bands" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, help me interpret my CUET marks and percentile"
      faqs={faqs}
      schema={[articleSchema({ headline: "CUET Marks vs Percentile, Explained", dateModified: LAST_UPDATED })]}
    >
      <Section id="mapping" heading="How marks map to percentile">
        <p>
          <strong className="text-ink">Percentile is relative.</strong> After each shift's raw scores
          are normalised (see <a href="/cuet/results/normalization" className="text-brand hover:underline">normalisation</a>),
          your normalised score is ranked against everyone in the session. A 99 percentile means you are
          near the top of that pool — independent of the exact raw number.
        </p>
      </Section>

      <Section id="bands" heading="Estimated marks → percentile bands">
        <p>
          <strong className="text-ink">These are estimates only.</strong> Real bands vary per session
          and are confirmed on the official scorecard. Verified, subject-wise bands will be filled in
          here.
        </p>
        <ComparisonTable
          caption="CUET marks → percentile (estimated bands)"
          date="estimate — per session"
          source="estimate (verify on official scorecard)"
          illustrative
          columns={[
            { key: "subject", header: "Subject" },
            { key: "raw", header: "Raw-marks band" },
            { key: "pct", header: "Percentile band" },
            { key: "note", header: "Note" },
          ]}
          rows={marksPercentile.map((r) => ({
            subject: r.subject,
            raw: r.rawMarksBand.startsWith("{{") ? <Tbd label="band" /> : r.rawMarksBand,
            pct: r.percentileBand.startsWith("{{") ? <Tbd label="band" /> : r.percentileBand,
            note: r.note,
          }))}
        />
        <p className="text-sm">
          Try the <a href="/cuet/results/score-calculator" className="text-brand hover:underline">score calculator</a>{" "}
          for a rough band, then a <a href="/cuet/results/college-predictor" className="text-brand hover:underline">college shortlist</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
