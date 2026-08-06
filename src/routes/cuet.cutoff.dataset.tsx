import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { datasetSchema } from "@/lib/schema";
import { BRAND_SHORT, DOMAIN, LAST_UPDATED } from "@/config/site";
import { cutoffs, cutoffsAreIllustrativeOnly } from "@/data/cutoffs";
import { Tbd } from "@/components/lpt/shared";

export const Route = createFileRoute("/cuet/cutoff/dataset")({
  head: () =>
    pageHead({
      title: `CUET Cutoff Dataset (CSV) | ${BRAND_SHORT}`,
      description:
        "The full CUET cutoff dataset — college × course × category × round — sourced from official CSAS releases, with a downloadable CSV.",
      path: "/cuet/cutoff/dataset",
    }),
  component: CutoffDataset,
});

function CutoffDataset() {
  const illustrative = cutoffsAreIllustrativeOnly();
  return (
    <ContentPage
      canonicalPath="/cuet/cutoff/dataset"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Cutoffs", item: "/cuet/cutoff" },
        { name: "Dataset" },
      ]}
      title="CUET Cutoff Dataset — College × Course × Category × Round"
      introLead="What this is:"
      intro={
        <>
          A structured, multi-year CUET cutoff dataset covering college × course × category × round,
          sourced from official university CSAS releases. Use the table below or download the CSV. Every
          figure is dated and sourced; unverified cells are clearly marked.
        </>
      }
      toc={[
        { id: "download", label: "Download" },
        { id: "table", label: "Full dataset" },
        { id: "notes", label: "Sources & method" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, help me read the CUET cutoff data for my colleges"
      schema={[
        datasetSchema({
          name: "CUET Cutoff Dataset (college × course × category × round)",
          description: "Multi-year CUET cutoffs sourced from official university CSAS releases. Columns: year, university, college, course, category, round, cutoff, source_url, verified_date.",
          temporalCoverage: "2022/2026",
          csvUrl: `${DOMAIN}/cuet/cutoff/dataset.csv`,
          dateModified: LAST_UPDATED,
        }),
      ]}
    >
      <Section id="download" heading="Download the dataset">
        <p>
          <strong className="text-ink">Free CSV.</strong> Machine-readable, one row per college × course
          × category × round.
        </p>
        <a href="/cuet/cutoff/dataset.csv" download className="btn-primary inline-flex w-fit">
          <Download className="h-4 w-4" strokeWidth={2} /> Download CUET cutoff dataset (CSV)
        </a>
        {illustrative && (
          <p className="text-sm text-brand">
            Note: the dataset currently contains illustrative placeholder rows. Verified CSAS figures
            will replace them before publishing.
          </p>
        )}
      </Section>

      <Section id="table" heading="Full dataset">
        <ComparisonTable
          caption="CUET Cutoff Dataset"
          date="pending verification"
          source="official university CSAS releases"
          illustrative={illustrative}
          columns={[
            { key: "year", header: "Year" },
            { key: "university", header: "University" },
            { key: "college", header: "College" },
            { key: "course", header: "Course" },
            { key: "category", header: "Category" },
            { key: "round", header: "Round" },
            { key: "cutoff", header: "Cutoff" },
          ]}
          rows={cutoffs.map((r) => ({
            year: r.year,
            university: r.university,
            college: r.college,
            course: r.course,
            category: r.category,
            round: r.round,
            cutoff: r.cutoff ?? <Tbd label="verify" />,
          }))}
        />
      </Section>

      <Section id="notes" heading="Sources & method">
        <p>
          Each row is sourced from the relevant official CSAS release and carries a{" "}
          <code>source_url</code> and <code>verified_date</code>. We publish a cutoff only after it is
          verified against the official source — see{" "}
          <a href="/cuet/cutoff/how-cutoffs-work" className="text-brand hover:underline">how cutoffs work</a>{" "}
          and the <a href="/cuet/cutoff" className="text-brand hover:underline">cutoffs hub</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
