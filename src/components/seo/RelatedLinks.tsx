import { ArrowRight } from "lucide-react";
import { getCluster, getTreeEntry, HUB_HREF } from "@/config/site";

/**
 * RelatedLinks (SOP B7 — down/across/forward) — a small, curated set of 3–6
 * labelled links derived from SITE_TREE: a few cluster siblings (across), the
 * vertical hub (up) and the vertical's coaching page (forward conversion). No
 * raw dumps. Renders nothing when the page isn't in the tree.
 */
export function RelatedLinks({ currentHref }: { currentHref: string }) {
  const cluster = getCluster(currentHref);
  if (!cluster) return null;
  const v = cluster.vertical;
  const coachHref = v === "CUET" ? "/courses/cuet" : "/courses/ipmat";

  const across = cluster.entries.filter((e) => e.href !== currentHref).slice(0, 3);
  const items = [
    ...across.map((e) => ({ label: e.label, href: e.href, desc: e.desc })),
    { label: `${v} guide (all topics)`, href: HUB_HREF[v], desc: `Browse the full ${v} hub` },
    { label: `${v} coaching`, href: coachHref, desc: getTreeEntry(coachHref)?.desc ?? "Batches, fees & modes" },
  ];
  // de-dup by href, cap at 6
  const seen = new Set<string>();
  const links = items.filter((i) => i.href !== currentHref && !seen.has(i.href) && seen.add(i.href)).slice(0, 6);

  return (
    <section aria-label="Related pages" className="mt-12">
      <h2 className="h-display text-xl sm:text-2xl">Related pages</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="lift-card group flex items-start justify-between gap-3 rounded-2xl border border-hairline bg-white p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
          >
            <span>
              <span className="block text-sm font-bold text-ink transition-colors group-hover:text-brand">{l.label}</span>
              {l.desc && <span className="mt-0.5 block text-xs text-body">{l.desc}</span>}
            </span>
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
          </a>
        ))}
      </div>
    </section>
  );
}
