import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { BRAND_SHORT } from "@/config/site";
import { cutoffsAreIllustrativeOnly } from "@/data/cutoffs";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "How does a CUET college predictor work?", a: <>It compares your score and category against past cutoffs to estimate which college–course combinations are likely, borderline or a stretch. It's an estimate based on historical data — actual outcomes depend on the current year's cutoffs and your CSAS preference order.</> },
  { q: "Is the predicted college list guaranteed?", a: <>No. Predictions are estimates, not admissions. Cutoffs change every year with demand, seats and the score distribution. Use the shortlist to plan your CSAS preference order, then confirm against official cutoffs and complete counselling.</> },
];

export const Route = createFileRoute("/cuet/results/college-predictor/")({
  head: () =>
    pageHead({
      title: `CUET College Predictor (Estimate) | ${BRAND_SHORT}`,
      description:
        "Free CUET college predictor — estimate a realistic college shortlist from your percentile and category, based on past cutoffs. Estimate only.",
      path: "/cuet/results/college-predictor",
    }),
  component: CollegePredictor,
});

function CollegePredictor() {
  const [pct, setPct] = useState("");
  const [cat, setCat] = useState("General");
  const [submitted, setSubmitted] = useState(false);
  const noData = cutoffsAreIllustrativeOnly();

  return (
    <ContentPage
      canonicalPath="/cuet/results/college-predictor"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Results", item: "/cuet/results" },
        { name: "College predictor" },
      ]}
      title="CUET College Predictor (Estimate)"
      introLead="Direct answer:"
      intro={
        <>
          The college predictor estimates a realistic college–course shortlist from your{" "}
          <strong>percentile and category</strong> by comparing them against past cutoffs. It is an{" "}
          <strong>estimate, not a guarantee</strong> — actual admission depends on the current year's
          cutoffs and your CSAS preference order.
        </>
      }
      toc={[{ id: "tool", label: "Predictor" }]}
      ctaMessage="Hi LPT Delhi-NCR, help me build my CUET college shortlist"
      faqs={faqs}
    >
      <Section id="tool" heading="Predict your college shortlist">
        <p className="rounded-xl border border-brand/30 bg-brand-wash p-3 text-sm text-brand">
          Estimate only — based on historical cutoffs, not a guarantee of admission.
          {noData && " Verified cutoff data is being loaded; until then results are indicative."}
        </p>
        <form
          className="flex flex-wrap items-end gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-semibold text-ink">Your CUET percentile</span>
            <input
              value={pct}
              onChange={(e) => setPct(e.target.value.replace(/[^0-9.]/g, ""))}
              inputMode="decimal"
              placeholder="e.g. 95"
              className="w-40 rounded-xl border border-hairline px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-semibold text-ink">Category</span>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
            >
              {["General", "OBC-NCL", "SC", "ST", "EWS", "PwBD"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn-primary">Predict (estimate)</button>
        </form>
        {submitted && (
          <div className="rounded-xl border border-hairline bg-white p-4 text-sm">
            <p>
              <strong className="text-ink">Estimated shortlist for {pct || "—"} %ile ({cat}):</strong>{" "}
              A verified college–course list keyed to official cutoffs will appear here. Until the cutoff
              dataset is verified, use this as guidance and cross-check the{" "}
              <a href="/cuet/cutoff" className="text-brand hover:underline">cutoffs</a> and{" "}
              <a href="/cuet/admission" className="text-brand hover:underline">CSAS process</a>.
            </p>
          </div>
        )}
        <p className="text-sm">
          Then plan your <a href="/cuet/admission/freeze-vs-upgrade" className="text-brand hover:underline">preference strategy</a>{" "}
          or explore <a href="/courses/cuet" className="text-brand hover:underline">CUET coaching</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
