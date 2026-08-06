import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { faqPageSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import { cuetFaqs, ipmatFaqs } from "@/data/faqs";

// Master FAQ KB (SOP B6). The full corpus is rendered server-side (every answer
// in raw HTML for AEO); the search/filter is progressive enhancement.
type Item = { q: string; a: string; cluster: string; vertical: "CUET" | "IPMAT" };
const ALL: Item[] = [
  ...cuetFaqs.map((f) => ({ ...f, vertical: "CUET" as const })),
  ...ipmatFaqs.map((f) => ({ ...f, vertical: "IPMAT" as const })),
];

export const Route = createFileRoute("/faq/")({
  head: () =>
    pageHead({
      title: `CUET & IPMAT Master FAQ | ${BRAND_SHORT}`,
      description:
        "Searchable CUET & IPMAT master FAQ — direct, sourced answers on exams, cutoffs, results, eligibility and admission. Filter by vertical or search.",
      path: "/faq",
    }),
  component: MasterFaq,
});

function MasterFaq() {
  const [q, setQ] = useState("");
  const [vert, setVert] = useState<"all" | "CUET" | "IPMAT">("all");
  const needle = q.trim().toLowerCase();

  const visible = useMemo(
    () =>
      ALL.map((it) => {
        const matchVert = vert === "all" || it.vertical === vert;
        const matchText = !needle || it.q.toLowerCase().includes(needle) || it.a.toLowerCase().includes(needle);
        return { it, show: matchVert && matchText };
      }),
    [needle, vert],
  );
  const count = visible.filter((v) => v.show).length;

  return (
    <HubPage
      canonicalPath="/faq"
      crumbs={[{ name: "Home", item: "/" }, { name: "FAQ" }]}
      title="CUET & IPMAT — Master FAQ"
      introLead="In short:"
      intro={
        <>
          A searchable knowledge base of {ALL.length} direct, sourced CUET and IPMAT answers, growing
          over time. Search below, or browse the clustered vertical FAQ hubs.
        </>
      }
      groups={[
        {
          heading: "Browse by vertical",
          icon: "Info",
          items: [
            { label: "CUET FAQ hub", href: "/faq/cuet", desc: "Cutoffs, results, admission & more" },
            { label: "IPMAT FAQ hub", href: "/faq/ipmat", desc: "Exam, marking, selection & more" },
          ],
        },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, I have a CUET/IPMAT question"
      schema={[faqPageSchema(ALL.map((f) => ({ q: f.q, a: f.a })))]}
    >
      <div className="not-prose">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex flex-1 items-center gap-2 rounded-xl border border-hairline bg-white px-3 py-2 min-w-[240px]">
            <Search className="h-4 w-4 text-body" strokeWidth={2} aria-hidden />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search CUET & IPMAT questions…"
              className="flex-1 bg-transparent text-sm outline-none"
              aria-label="Search FAQs"
            />
          </label>
          <div className="flex gap-2">
            {(["all", "CUET", "IPMAT"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVert(v)}
                className={vert === v ? "btn-primary px-4 py-2 text-sm" : "btn-pill"}
              >
                {v === "all" ? "All" : v}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm text-body" aria-live="polite">Showing {count} of {ALL.length} questions.</p>

        <div className="mt-3 divide-y divide-hairline">
          {visible.map(({ it, show }, i) => (
            <div key={i} className="py-4" hidden={!show}>
              <h3 className="text-base font-semibold text-ink">
                {it.q} <span className="ml-1 rounded bg-cream-soft px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-body">{it.vertical}</span>
              </h3>
              <p className="mt-2 text-body leading-relaxed">{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </HubPage>
  );
}
