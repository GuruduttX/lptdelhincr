import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { Section } from "@/components/seo/ContentPage";
import { itemListSchema } from "@/lib/schema";
import { BRAND, DOMAIN, getTreeEntry, type TreeLink } from "@/config/site";

// Built, linkable resources (from SITE_TREE — never a dead link).
const ready: TreeLink[] = ["/cuet/results/college-predictor", "/cuet/cutoff/dataset", "/ipmat/marking-scheme", "/cuet/syllabus", "/ipmat/syllabus"]
  .map((h) => getTreeEntry(h))
  .filter((e): e is NonNullable<typeof e> => Boolean(e));

// Planned dataset pages (not built yet) — shown as text, never linked.
const planned = ["Institution dataset", "Syllabus dataset (CSV)"];

export const Route = createFileRoute("/resources")({
  head: () =>
    pageHead({
      title: `CUET & IPMAT Resources — ${BRAND}`,
      description: "Free CUET & IPMAT resources — college predictor, cutoff dataset, syllabus and marking guides.",
      path: "/resources",
    }),
  component: Resources,
});

function Resources() {
  return (
    <HubPage
      canonicalPath="/resources"
      crumbs={[{ name: "Home", item: "/" }, { name: "Resources" }]}
      title="CUET & IPMAT Resources"
      introLead="In short:"
      intro={
        <>
          Free tools and reference data for CUET and IPMAT aspirants — the college predictor, the cutoff
          dataset, syllabus and the IPMAT marking guide. More datasets roll out in phases.
        </>
      }
      groups={[{ heading: "Free tools & guides", icon: "FileText", items: ready }]}
      ctaMessage="Hi LPT Delhi-NCR, I need help with CUET/IPMAT resources"
      schema={[itemListSchema(ready.map((r) => ({ name: r.label, url: `${DOMAIN}${r.href}` })))]}
    >
      <Section id="coming" heading="Coming soon">
        <p>These reference datasets publish once verified data is loaded:</p>
        <ul className="list-disc space-y-1 pl-5">
          {planned.map((p) => (
            <li key={p} className="text-body">{p} <span className="ml-1 rounded bg-cream-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-body/70">Soon</span></li>
          ))}
        </ul>
      </Section>
    </HubPage>
  );
}
