import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { itemListSchema } from "@/lib/schema";
import { BRAND_SHORT, getSiblings } from "@/config/site";

export const Route = createFileRoute("/cuet/results/")({
  head: () =>
    pageHead({
      title: `CUET Results, Percentile & Predictor | ${BRAND_SHORT}`,
      description:
        "CUET results hub — marks vs percentile, normalisation, reading your scorecard, a score calculator and a college predictor. Estimates clearly labelled.",
      path: "/cuet/results",
    }),
  component: ResultsHub,
});

function ResultsHub() {
  return (
    <HubPage
      canonicalPath="/cuet/results"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Results" }]}
      title="CUET Results, Percentile & College Predictor"
      introLead="In short:"
      intro={
        <>
          After CUET, the NTA releases your normalised score and percentile; universities then use it
          for admission. Explore the tools and guides below — all clearly labelled as estimates where
          they depend on the session's distribution.
        </>
      }
      clusterOf="/cuet/results"
      ctaMessage="Hi LPT Delhi-NCR, I need help understanding my CUET result"
      schema={[itemListSchema(getSiblings("/cuet/results").map((t) => ({ name: t.label, url: t.href })))]}
    >
      <p>
        <strong className="text-ink">Note:</strong> percentile, normalisation and predictor outputs are
        estimates that depend on the session's distribution — always confirm exact figures on your
        official scorecard.
      </p>
    </HubPage>
  );
}
