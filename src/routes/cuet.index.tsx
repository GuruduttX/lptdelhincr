import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { itemListSchema } from "@/lib/schema";
import { BRAND_SHORT, getVerticalTree } from "@/config/site";
import { cuetFaqs } from "@/data/faqs";

export const Route = createFileRoute("/cuet/")({
  head: () =>
    pageHead({
      title: `CUET Coaching & Prep Guide | ${BRAND_SHORT}`,
      description:
        "CUET (UG) guide & coaching at LPT Delhi-NCR — cutoffs, college predictor, normalisation, CSAS admission and batches across 4 Delhi-NCR centres.",
      path: "/cuet",
    }),
  component: CuetHub,
});

function CuetHub() {
  return (
    <HubPage
      canonicalPath="/cuet"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET" }]}
      title="CUET (UG): Coaching, Cutoffs & Admission Guide"
      introLead="What CUET is:"
      intro={
        <>
          CUET (UG) is the common entrance test, conducted by the NTA, used for undergraduate admission
          to central and participating universities. Your CUET score feeds each university's own
          admission process (for DU, CSAS). Browse every CUET topic below.
        </>
      }
      vertical="CUET"
      keyFacts={[
        { value: "NTA", label: "Conducts & scores CUET" },
        { value: "CSAS", label: "University admission (e.g. DU)" },
        { value: "4", label: "Delhi-NCR coaching centres" },
        { value: "Free", label: "Demo & counselling" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, I want CUET coaching details"
      faqs={cuetFaqs.slice(0, 6).map((f) => ({ q: f.q, a: f.a }))}
      schema={[itemListSchema(getVerticalTree("CUET").map((c) => ({ name: c.cluster, url: c.entries[0].href })))]}
    >
      <p>
        <strong className="text-ink">In one line:</strong> NTA conducts CUET and releases scores;
        universities release cutoffs and run admission. Use the sections below — cutoffs and the college
        predictor, CSAS admission, syllabus and study plans, exam info, exam-day logistics, and
        coaching near you.
      </p>
    </HubPage>
  );
}
