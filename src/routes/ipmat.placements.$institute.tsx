import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { BRAND_SHORT } from "@/config/site";
import { getInstitute } from "@/data/ipmat";
import { placementsFor, isPlacementPublishable } from "@/data/placements";

// Programmatic placements (SOP H7). Emits ONLY for verified rows. Official CTC
// figures only — never fabricate placement numbers.
export const Route = createFileRoute("/ipmat/placements/$institute")({
  loader: ({ params }) => {
    const institute = getInstitute(params.institute);
    const rows = institute ? placementsFor(institute.slug).filter(isPlacementPublishable) : [];
    if (!institute || !rows.length) throw notFound();
    return { institute, rows };
  },
  head: ({ params }) => {
    const inst = getInstitute(params.institute);
    return pageHead({
      title: `${inst?.short ?? "IPM"} Placements (Official) | ${BRAND_SHORT}`,
      description: `${inst?.short ?? "IPM"} IPM placement summary — official placement percentage and recruiters from the institute's reports. Verified figures only.`,
      path: `/ipmat/placements/${params.institute}`,
    });
  },
  component: Placements,
});

function Placements() {
  const { institute, rows } = Route.useLoaderData();
  return (
    <ContentPage
      canonicalPath={`/ipmat/placements/${institute.slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: "Colleges", item: "/ipmat/colleges" },
        { name: `${institute.short} placements` },
      ]}
      title={`${institute.name}: IPM Placements`}
      introLead="Direct answer:"
      intro={<>Official IPM placement figures for {institute.name} — placement percentage and recruiters from the institute's own reports. We publish official figures only.</>}
      ctaMessage={`Hi ${BRAND_SHORT}, tell me about ${institute.short} placements`}
    >
      <Section id="placements" heading={`${institute.short} placement summary`}>
        <ComparisonTable
          caption={`${institute.name} placements`}
          date="official report"
          source="official institute placement report"
          columns={[
            { key: "batch", header: "Batch" },
            { key: "pct", header: "Placement %" },
            { key: "ctc", header: "Avg CTC" },
          ]}
          rows={rows.map((r) => ({ batch: r.batch, pct: r.placementPct, ctc: r.avgCtc }))}
        />
      </Section>
    </ContentPage>
  );
}
