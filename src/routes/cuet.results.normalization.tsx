import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Why does CUET use normalisation?", a: <>CUET runs in multiple shifts with different papers that can vary slightly in difficulty. Normalisation converts raw marks to comparable normalised scores so candidates aren't advantaged or disadvantaged by which shift they sat. It keeps scores fair across sessions.</> },
  { q: "Does normalisation lower my marks?", a: <>It can raise or lower your normalised score relative to your raw mark, depending on your shift's difficulty. The aim isn't to penalise anyone — it's to place every candidate on a common scale before percentiles and merit are computed.</> },
  { q: "Is the normalised score what universities use?", a: <>Yes — universities use the normalised CUET score/percentile (as reported on your scorecard) for admission, not the raw shift marks. Always read your official scorecard for the figures that count.</> },
];

export const Route = createFileRoute("/cuet/results/normalization")({
  head: () =>
    pageHead({
      title: `CUET Normalisation Explained | ${BRAND_SHORT}`,
      description:
        "CUET normalisation explained: why multi-shift raw marks are converted to comparable normalised scores, with a simple worked example.",
      path: "/cuet/results/normalization",
      ogType: "article",
    }),
  component: Normalization,
});

function Normalization() {
  return (
    <ContentPage
      canonicalPath="/cuet/results/normalization"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Results", item: "/cuet/results" },
        { name: "Normalisation" },
      ]}
      title="CUET Normalisation, Explained Simply"
      introLead="Direct answer:"
      intro={
        <>
          CUET <strong>normalisation</strong> converts raw marks from different shifts onto a common
          scale, because shifts use different papers of slightly varying difficulty. This ensures your
          score reflects your performance fairly, regardless of which session you sat — and it's the
          normalised score universities use.
        </>
      }
      toc={[
        { id: "why", label: "Why it exists" },
        { id: "example", label: "Worked example" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, explain CUET normalisation for my session"
      faqs={faqs}
      schema={[articleSchema({ headline: "CUET Normalisation, Explained Simply", dateModified: LAST_UPDATED })]}
    >
      <Section id="why" heading="Why normalisation exists">
        <p>
          <strong className="text-ink">Fairness across shifts.</strong> If one shift's paper is slightly
          harder, its raw scores would understate ability. Normalisation adjusts for shift difficulty so
          two candidates of equal ability in different shifts end up with comparable normalised scores.
        </p>
      </Section>

      <Section id="example" heading="A simple worked example">
        <p>
          <strong className="text-ink">Illustrative only.</strong> Suppose Shift A was harder than Shift
          B. A raw 80 in the harder Shift A might normalise <em>upward</em> (because the pool scored
          lower), while a raw 80 in the easier Shift B normalises closer to its raw value. The exact
          formula and factors are defined by the official methodology — confirm your figures on your{" "}
          <a href="/cuet/results/scorecard" className="text-brand hover:underline">scorecard</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
