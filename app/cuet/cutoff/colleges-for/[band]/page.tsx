import type { Metadata } from "next";
import { cuetBandParams } from "@/lib/static-params";
import { notFound } from "next/navigation";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { itemListSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import { cutoffs } from "@/data/cutoffs";
import { CUTOFF_BANDS as BANDS } from "@/lib/programmatic";

// Programmatic "colleges for [score band]" (SOP H7). Emits ONLY when verified
// cutoff rows fall in the band. 404s otherwise (no thin spawn).
type Params = { band: string };

export function generateStaticParams(): Params[] {
  return cuetBandParams();
}

/** Route data, resolved at build time (was the TanStack loader). */
function load(params: Params) {
  const range = BANDS[params.band];
  if (!range) throw notFound();
  const rows = cutoffs.filter(
    (r) =>
      !r.illustrative &&
      r.cutoff != null &&
      r.cutoff >= range[0] &&
      r.cutoff < range[1],
  );
  if (!rows.length) throw notFound();
  return { band: params.band, rows };
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
    title: `CUET Colleges for ${params.band} %ile | ${BRAND_SHORT}`,
    description: `Colleges and courses realistically reachable around a ${params.band} CUET percentile, from verified cutoffs. Estimate — plan your CSAS order.`,
    path: `/cuet/cutoff/colleges-for/${params.band}`,
  });
}

export default async function CollegesForBand({
  params,
}: {
  params: Promise<Params>;
}) {
  const { band, rows } = load(await params);
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
      intro={
        <>
          Colleges and courses that closed around a {band} CUET percentile last
          cycle, from verified cutoffs. Use it as a starting shortlist, then
          plan your CSAS preference order.
        </>
      }
      ctaMessage={`Hi ${BRAND_SHORT}, which colleges suit a ${band} percentile?`}
      schema={[
        itemListSchema(
          rows.map((r) => ({
            name: `${r.college} — ${r.course}`,
            url: "/cuet/cutoff",
          })),
        ),
      ]}
    >
      <Section id="list" heading={`Reachable around ${band} %ile`}>
        <ul className="list-disc space-y-2 pl-5">
          {rows.map((r, i) => (
            <li key={i}>
              {r.college} — {r.course} ({r.category}, closed ~{r.cutoff})
            </li>
          ))}
        </ul>
      </Section>
    </ContentPage>
  );
}
