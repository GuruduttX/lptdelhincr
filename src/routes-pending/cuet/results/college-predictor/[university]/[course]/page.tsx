import type { Metadata } from "next";
import { cuetPredictorParams } from "@/lib/static-params";
import { notFound } from "next/navigation";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { BRAND_SHORT } from "@/config/site";
import { colleges, isCollegePublishable } from "@/data/colleges";
import { slugify } from "@/lib/programmatic";

// Programmatic predictor (SOP H7). Emits ONLY for a university×course backed by
// publishable college rows. With illustrative data, every request 404s and no
// page is prerendered — intended. Scales when verified colleges are added.
type Params = { university: string; course: string };

export function generateStaticParams(): Params[] {
  return cuetPredictorParams();
}

/** Route data, resolved at build time (was the TanStack loader). */
function load(params: Params) {
  const matches = colleges.filter(
    (c) =>
      isCollegePublishable(c) &&
      c.universitySlug === params.university &&
      c.coursesViaCuet.some((course) => slugify(course) === params.course),
  );
  if (!matches.length) throw notFound();
  return { university: matches[0].university, course: params.course, matches };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  return buildMetadata(await params);
}

function buildMetadata(params: Params): Metadata {
  return pageHead({
    title: `CUET Predictor: ${params.university} ${params.course} | ${BRAND_SHORT}`,
    description: `Predict your ${params.course} chances at ${params.university} from your CUET percentile and category, based on verified past cutoffs. Estimate only.`,
    path: `/cuet/results/college-predictor/${params.university}/${params.course}`,
  });
}

export default async function ScopedPredictor({
  params,
}: {
  params: Promise<Params>;
}) {
  const { university, course } = load(await params);
  return (
    <ContentPage
      canonicalPath={`/cuet/results/college-predictor/${university}/${course}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Predictor", item: "/cuet/results/college-predictor" },
        { name: `${university} ${course}` },
      ]}
      title={`CUET Predictor: ${university} — ${course}`}
      introLead="Direct answer:"
      intro={
        <>
          Estimate your chances for {course} at {university} from your CUET
          percentile and category, benchmarked against verified past cutoffs.
          This is an estimate, not a guarantee — confirm against official
          cutoffs and complete the university's counselling.
        </>
      }
      ctaMessage={`Hi LPT Delhi-NCR, predict my ${course} chances at ${university}`}
    >
      <Section id="predict" heading="Your estimated chances">
        <p>
          Verified cutoff-backed estimates render here for {university} {course}
          .
        </p>
      </Section>
    </ContentPage>
  );
}
