import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "What does 'freeze' mean in CSAS?", a: <>Freeze means you accept your currently allotted seat as final and withdraw from further upgrade rounds. Choose freeze when your allotted college–course is one you're happy to commit to, so you stop risking it for an uncertain upgrade.</> },
  { q: "What does 'upgrade' mean in CSAS?", a: <>Upgrade means you keep your current allotted seat as a safety net while remaining in the running for a higher-preference seat in later rounds. If a better option is allotted, you move up; if not, you retain the current seat.</> },
  { q: "Can I lose my seat if I choose upgrade?", a: <>Generally your current seat is retained as a fallback while you upgrade, but you must follow every deadline and rule for the cycle. Always read the official CSAS instructions, since process details can change year to year.</> },
];

export const Route = createFileRoute("/cuet/admission/freeze-vs-upgrade")({
  head: () =>
    pageHead({
      title: `CSAS Freeze vs Upgrade: Which to Pick | ${BRAND_SHORT}`,
      description:
        "CSAS freeze vs upgrade — freeze locks your seat; upgrade keeps it as a fallback while you chase a higher preference. How to decide.",
      path: "/cuet/admission/freeze-vs-upgrade",
      ogType: "article",
    }),
  component: FreezeVsUpgrade,
});

function FreezeVsUpgrade() {
  return (
    <ContentPage
      canonicalPath="/cuet/admission/freeze-vs-upgrade"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Admission", item: "/cuet/admission" },
        { name: "Freeze vs upgrade" },
      ]}
      title="CSAS Freeze vs Upgrade: Which Should You Pick?"
      introLead="Direct answer:"
      intro={
        <>
          In CSAS, <strong>freeze</strong> accepts your allotted seat as final and stops further
          upgrades; <strong>upgrade</strong> keeps that seat as a safety net while you stay in the
          running for a higher-preference seat in later rounds. Choose freeze when you're satisfied;
          upgrade when a better-ranked option is realistically reachable.
        </>
      }
      toc={[
        { id: "compare", label: "Freeze vs upgrade" },
        { id: "decide", label: "How to decide" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, should I freeze or upgrade my CSAS seat?"
      faqs={faqs}
      schema={[articleSchema({ headline: "CSAS Freeze vs Upgrade: Which Should You Pick?", dateModified: LAST_UPDATED })]}
    >
      <Section id="compare" heading="Freeze vs upgrade at a glance">
        <ComparisonTable
          caption="CSAS freeze vs upgrade"
          date={LAST_UPDATED}
          source="CSAS process (verify current rules)"
          columns={[
            { key: "dim", header: "Dimension" },
            { key: "freeze", header: "Freeze" },
            { key: "upgrade", header: "Upgrade" },
          ]}
          rows={[
            { dim: "Current seat", freeze: "Locked as final", upgrade: "Kept as a safety net" },
            { dim: "Future rounds", freeze: "You exit upgrades", upgrade: "Still eligible for higher preferences" },
            { dim: "Best when", freeze: "You're happy with the allotment", upgrade: "A better option is realistically reachable" },
            { dim: "Risk", freeze: "Miss a possible upgrade", upgrade: "None to current seat if rules followed" },
          ]}
        />
      </Section>

      <Section id="decide" heading="How to decide">
        <p>
          <strong className="text-ink">Rank honesty matters.</strong> If your allotment is among your
          genuine top choices, freeze. If higher preferences are close to recent closing scores, upgrade
          — but only after checking the <a href="/cuet/cutoff" className="text-brand hover:underline">cutoffs</a>{" "}
          and your predicted <a href="/cuet/results/college-predictor" className="text-brand hover:underline">shortlist</a>.
          Vacant seats later feed the <a href="/cuet/admission/spot-round" className="text-brand hover:underline">spot round</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
