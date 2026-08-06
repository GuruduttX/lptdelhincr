import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { BRAND_SHORT } from "@/config/site";
import { estimatePercentileBand } from "@/data/marksPercentile";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Is this CUET score calculator accurate?", a: <>No tool can be exact before results. It returns a rough percentile band from your score percentage, because the real marks-to-percentile mapping depends on each session's normalised distribution. Treat the output strictly as an estimate and confirm on your official scorecard.</> },
  { q: "How do I use the calculator?", a: <>Enter your score as a percentage of the maximum (for example, 180/200 = 90%). The tool returns an estimated percentile band. For a college shortlist, use the college predictor; for the official figure, read your scorecard.</> },
];

export const Route = createFileRoute("/cuet/results/score-calculator")({
  head: () =>
    pageHead({
      title: `CUET Score Calculator (Estimate) | ${BRAND_SHORT}`,
      description:
        "Free CUET score calculator — enter your score percentage for an estimated percentile band. Estimate only; confirm on your official scorecard.",
      path: "/cuet/results/score-calculator",
    }),
  component: ScoreCalculator,
});

function ScoreCalculator() {
  const [raw, setRaw] = useState("");
  const [band, setBand] = useState<string | null>(null);

  return (
    <ContentPage
      canonicalPath="/cuet/results/score-calculator"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Results", item: "/cuet/results" },
        { name: "Score calculator" },
      ]}
      title="CUET Score Calculator (Estimate)"
      introLead="Direct answer:"
      intro={
        <>
          This calculator gives a rough <strong>estimated percentile band</strong> from your score
          percentage. It is not official — the real mapping depends on your session's normalised
          distribution. Enter your score as a percentage of the maximum to see an estimate, then verify
          on your scorecard.
        </>
      }
      toc={[{ id: "tool", label: "Calculator" }]}
      ctaMessage="Hi LPT Delhi-NCR, help me understand my CUET score"
      faqs={faqs}
    >
      <Section id="tool" heading="Estimate your percentile band">
        <p className="rounded-xl border border-brand/30 bg-brand-wash p-3 text-sm text-brand">
          Estimate only — not an official CUET figure. Confirm on your scorecard.
        </p>
        <form
          className="flex flex-wrap items-end gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const n = parseFloat(raw);
            setBand(Number.isFinite(n) ? estimatePercentileBand(n) : null);
          }}
        >
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-semibold text-ink">Your score (% of maximum)</span>
            <input
              value={raw}
              onChange={(e) => setRaw(e.target.value.replace(/[^0-9.]/g, ""))}
              inputMode="decimal"
              placeholder="e.g. 90"
              className="w-40 rounded-xl border border-hairline px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </label>
          <button type="submit" className="btn-primary">Estimate band</button>
        </form>
        {band && (
          <p className="text-lg">
            Estimated: <strong className="text-brand">{band}</strong>
          </p>
        )}
        <p className="text-sm">
          See <a href="/cuet/results/marks-vs-percentile" className="text-brand hover:underline">marks vs percentile</a>{" "}
          or get a <a href="/cuet/results/college-predictor" className="text-brand hover:underline">college shortlist</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
