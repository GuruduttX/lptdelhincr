import type { Metadata } from "next";
import { ipmatFeesParams } from "@/lib/static-params";
import { notFound } from "next/navigation";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { BRAND_SHORT } from "@/config/site";
import { getInstitute } from "@/data/ipmat";
import { feesFor, isFeePublishable } from "@/data/fees";

// Programmatic IPM fees (SOP H7). Emits ONLY for verified fee rows.
type Params = { institute: string };

export function generateStaticParams(): Params[] {
  return ipmatFeesParams();
}

/** Route data, resolved at build time (was the TanStack loader). */
function load(params: Params) {
  const institute = getInstitute(params.institute);
  const rows = institute
    ? feesFor(institute.slug).filter(isFeePublishable)
    : [];
  if (!institute || !rows.length) throw notFound();
  return { institute, rows };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  return buildMetadata(await params);
}

function buildMetadata(params: Params): Metadata {
  const inst = getInstitute(params.institute);
  return pageHead({
    title: `${inst?.short ?? "IPM"} Fees (5-Year IPM) | ${BRAND_SHORT}`,
    description: `${inst?.short ?? "IPM"} 5-year IPM fees — total programme fee and international fee, verified against the official institute source.`,
    path: `/ipmat/programme/${params.institute}/fees`,
  });
}

export default async function Fees({ params }: { params: Promise<Params> }) {
  const { institute, rows } = load(await params);
  return (
    <ContentPage
      canonicalPath={`/ipmat/programme/${institute.slug}/fees`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: "Colleges", item: "/ipmat/colleges" },
        { name: `${institute.short} fees` },
      ]}
      title={`${institute.name}: IPM Fees`}
      introLead="Direct answer:"
      intro={
        <>
          Verified 5-year IPM fees for {institute.name}, from the official
          source. Weigh them against outcomes on the ROI page.
        </>
      }
      ctaMessage={`Hi ${BRAND_SHORT}, share ${institute.short} IPM fees and options`}
    >
      <Section id="fees" heading={`${institute.short} fees`}>
        <ComparisonTable
          caption={`${institute.name} IPM fees`}
          date="verified"
          source="official institute source"
          columns={[
            { key: "duration", header: "Duration" },
            { key: "fee", header: "Total fee" },
            { key: "intl", header: "International fee" },
          ]}
          rows={rows.map((r) => ({
            duration: r.duration,
            fee: r.totalFee,
            intl: r.internationalFee,
          }))}
        />
        <p className="text-sm">
          See the{" "}
          <a href="/ipmat/roi" className="text-brand hover:underline">
            ROI page
          </a>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
