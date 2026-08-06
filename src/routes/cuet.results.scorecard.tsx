import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { howToSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const steps = [
  { name: "Log in to the CUET portal", text: "Use your application number and password on the official CUET candidate portal to access your scorecard." },
  { name: "Check your identity details", text: "Confirm name, application number, roll number, category and the subjects you appeared for are correct." },
  { name: "Read your normalised score & percentile", text: "Each subject shows a normalised score and a percentile (NTA score). The percentile is your relative standing — this is what universities use." },
  { name: "Note subject-wise breakdown", text: "Review your score per subject to understand which sections to highlight in your applications and which colleges to target." },
  { name: "Download & save the PDF", text: "Save the official scorecard PDF — you'll need it for CSAS/university registration and verification." },
];

const faqs: FAQItem[] = [
  { q: "What does the CUET scorecard show?", a: <>It shows your identity details, the subjects you appeared for, and a normalised score plus percentile (NTA score) for each. The percentile reflects your relative rank in your session and is what universities use for admission.</> },
  { q: "Is the percentile on my scorecard my final result?", a: <>The percentile is your official, normalised result for each subject. Admission, however, is decided by each university using that score through its own process (for DU, CSAS) — so the scorecard is necessary but not sufficient.</> },
];

export const Route = createFileRoute("/cuet/results/scorecard")({
  head: () =>
    pageHead({
      title: `How to Read Your CUET Scorecard | ${BRAND_SHORT}`,
      description:
        "How to read your CUET scorecard step by step — identity details, normalised score vs percentile, subject breakdown, and saving the official PDF.",
      path: "/cuet/results/scorecard",
    }),
  component: Scorecard,
});

function Scorecard() {
  return (
    <ContentPage
      canonicalPath="/cuet/results/scorecard"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Results", item: "/cuet/results" },
        { name: "Scorecard" },
      ]}
      title="How to Read Your CUET Scorecard"
      introLead="Direct answer:"
      intro={
        <>
          Your CUET scorecard shows your identity details plus a normalised score and percentile (NTA
          score) for each subject. The <strong>percentile</strong> — your relative rank in your session
          — is the figure universities use. Follow the five steps below to read it correctly and avoid
          mixing up raw marks with percentile.
        </>
      }
      toc={[{ id: "steps", label: "Step by step" }]}
      ctaMessage="Hi LPT Delhi-NCR, help me read my CUET scorecard"
      faqs={faqs}
      schema={[howToSchema("How to read your CUET scorecard", steps)]}
    >
      <Section id="steps" heading="Read your scorecard in 5 steps">
        <ol className="list-decimal space-y-2 pl-5">
          {steps.map((s) => (
            <li key={s.name}>
              <strong className="text-ink">{s.name}:</strong> {s.text}
            </li>
          ))}
        </ol>
        <p className="text-sm">
          Next: understand <a href="/cuet/results/marks-vs-percentile" className="text-brand hover:underline">marks vs percentile</a>{" "}
          and predict your <a href="/cuet/results/college-predictor" className="text-brand hover:underline">college shortlist</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
