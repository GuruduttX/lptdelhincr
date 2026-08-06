import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { itemListSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import { cutoffs } from "@/data/cutoffs";

const BANDS: Record<string, [number, number]> = {
  "95-100": [95, 100],
  "90-95": [90, 95],
  "80-90": [80, 90],
  "70-80": [70, 80],
};

// Programmatic "colleges for [score band]" (SOP H7). Emits ONLY when verified
// cutoff rows fall in the band. 404s otherwise (no thin spawn).
export const Route = createFileRoute("/cuet/cutoff/colleges-for/$band")({
  loader: ({ params }) => {
    const range = BANDS[params.band];
    if (!range) throw notFound();
    const rows = cutoffs.filter(
      (r) => !r.illustrative && r.cutoff != null && r.cutoff >= range[0] && r.cutoff < range[1],
    );
    if (!rows.length) throw notFound();
    return { band: params.band, rows };
  },
  head: ({ params }) =>
    pageHead({
      title: `CUET Colleges for ${params.band} %ile | ${BRAND_SHORT}`,
      description: `Colleges and courses realistically reachable around a ${params.band} CUET percentile, from verified cutoffs. Estimate — plan your CSAS order.`,
      path: `/cuet/cutoff/colleges-for/${params.band}`,
    }),
  component: CollegesForBand,
});

function CollegesForBand() {
  const { band, rows } = Route.useLoaderData();
  return (
    <ContentPage
      canonicalPath={`/cuet/cutoff/colleges-for/${band}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Cutoffs", item: "/cuet/cutoff" },
        { name: `Colleges for ${band}` },
      ]}
      title={`CUET Colleges for a ${band} Percentile`}
      introLead="Direct answer:"
      intro={<>Colleges and courses that closed around a {band} CUET percentile last cycle, from verified cutoffs. Use it as a starting shortlist, then plan your CSAS preference order.</>}
      ctaMessage={`Hi ${BRAND_SHORT}, which colleges suit a ${band} percentile?`}
      schema={[itemListSchema(rows.map((r) => ({ name: `${r.college} — ${r.course}`, url: "/cuet/cutoff" })))]}
    >
      <Section id="list" heading={`Reachable around ${band} %ile`}>
        <ul className="list-disc space-y-2 pl-5">
          {rows.map((r, i) => (
            <li key={i}>{r.college} — {r.course} ({r.category}, closed ~{r.cutoff})</li>
          ))}
        </ul>
      </Section>
    </ContentPage>
  );
}
