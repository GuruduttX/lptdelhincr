import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { datasetSchema } from "@/lib/schema";
import { BRAND_SHORT, DOMAIN, LAST_UPDATED } from "@/config/site";
import { cutoffs } from "@/data/cutoffs";
import { slugify } from "@/lib/programmatic";

// Programmatic cutoff-by-course (SOP H7). Emits ONLY for verified cutoff rows.
export const Route = createFileRoute("/cuet/cutoff/$university/$college/$course")({
  loader: ({ params }) => {
    const rows = cutoffs.filter(
      (r) =>
        !r.illustrative &&
        r.cutoff != null &&
        slugify(r.university) === params.university &&
        slugify(r.college) === params.college &&
        slugify(r.course) === params.course,
    );
    if (!rows.length) throw notFound();
    return { rows, university: rows[0].university, college: rows[0].college, course: rows[0].course };
  },
  head: ({ params }) =>
    pageHead({
      title: `${params.college} ${params.course} CUET Cutoff | ${BRAND_SHORT}`,
      description: `${params.college} ${params.course} CUET cutoffs by category and round, sourced from official CSAS releases. Verified and dated.`,
      path: `/cuet/cutoff/${params.university}/${params.college}/${params.course}`,
    }),
  component: CutoffByCourse,
});

function CutoffByCourse() {
  const { rows, college, course } = Route.useLoaderData();
  return (
    <ContentPage
      canonicalPath={`/cuet/cutoff/${slugify(rows[0].university)}/${slugify(college)}/${slugify(course)}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Cutoffs", item: "/cuet/cutoff" },
        { name: `${college} ${course}` },
      ]}
      title={`${college} — ${course} CUET Cutoff`}
      introLead="Direct answer:"
      intro={<>{college}'s closing CUET cutoffs for {course}, by category and round, sourced from official CSAS releases.</>}
      ctaMessage={`Hi ${BRAND_SHORT}, help me target ${college} ${course}`}
      schema={[datasetSchema({ name: `${college} ${course} CUET cutoff`, description: `Category- and round-wise CUET cutoffs for ${course} at ${college}.`, csvUrl: `${DOMAIN}/cuet/cutoff/dataset.csv`, dateModified: LAST_UPDATED })]}
    >
      <Section id="cutoffs" heading="Cutoffs by category & round">
        <ComparisonTable
          caption={`${college} ${course} CUET cutoffs`}
          date={LAST_UPDATED}
          source="official CSAS release"
          columns={[
            { key: "category", header: "Category" },
            { key: "round", header: "Round" },
            { key: "cutoff", header: "Cutoff" },
          ]}
          rows={rows.map((r) => ({ category: r.category, round: r.round, cutoff: r.cutoff }))}
        />
      </Section>
    </ContentPage>
  );
}
