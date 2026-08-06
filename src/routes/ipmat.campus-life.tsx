import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "What is IPM campus life like?", a: <>IPM campus life is residential and intensive — lectures, group projects, committees and clubs, with a close five-year cohort. It blends undergraduate energy with management-school rigour. The pace is demanding, especially early on, but it builds independence and a strong network.</> },
  { q: "Is IPM campus life very demanding?", a: <>It can be, particularly in the foundation years as you adjust to a residential, deadline-driven environment. Time management and peer support matter. Most students adapt and find the structure rewarding — but go in expecting commitment, not a relaxed undergraduate experience.</> },
];

export const Route = createFileRoute("/ipmat/campus-life")({
  head: () =>
    pageHead({
      title: `IPM Campus Life: An Honest Look | ${BRAND_SHORT}`,
      description:
        "IPM campus life — a residential, intensive, cohort-driven experience across five years. What to expect day to day, and how demanding it really is.",
      path: "/ipmat/campus-life",
      ogType: "article",
    }),
  component: CampusLife,
});

function CampusLife() {
  return (
    <ContentPage
      canonicalPath="/ipmat/campus-life"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Campus life" }]}
      title="IPM Campus Life: An Honest Look"
      introLead="Direct answer:"
      intro={
        <>
          IPM campus life is residential, intensive and cohort-driven: lectures, group work, committees
          and clubs across a close five-year peer group, blending undergraduate energy with
          management-school rigour. It's demanding — especially in the foundation years — but builds
          independence and a strong network.
        </>
      }
      toc={[{ id: "expect", label: "What to expect" }, { id: "thrive", label: "How to thrive" }]}
      ctaMessage="Hi LPT Delhi-NCR, what's IPM campus life like?"
      faqs={faqs}
      schema={[articleSchema({ headline: "IPM Campus Life: An Honest Look", dateModified: LAST_UPDATED })]}
    >
      <Section id="expect" heading="What to expect">
        <ul className="list-disc space-y-2 pl-5">
          <li>A residential campus and a tight five-year cohort.</li>
          <li>Lectures, group projects, committees and clubs.</li>
          <li>Management-school rigour from early on.</li>
        </ul>
      </Section>
      <Section id="thrive" heading="How to thrive">
        <p>
          <strong className="text-ink">Time management and peer support.</strong> Build routines and
          look after your <a href="/ipmat/wellbeing" className="text-brand hover:underline">wellbeing</a>. See city-specific notes for{" "}
          <a href="/ipmat/city/indore" className="text-brand hover:underline">Indore</a> and{" "}
          <a href="/ipmat/city/rohtak" className="text-brand hover:underline">Rohtak</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
