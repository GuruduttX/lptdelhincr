import { getCluster } from "@/config/site";
import { Icon } from "@/components/lpt/Icon";

/**
 * SectionNav (SOP B7 "across") — lists the sibling pages of the current page's
 * cluster, derived from SITE_TREE by the page's canonical path. The current page
 * is marked aria-current. Renders nothing when the page isn't in the tree.
 */
export function SectionNav({ currentHref }: { currentHref: string }) {
  const cluster = getCluster(currentHref);
  if (!cluster || cluster.entries.length < 2) return null;
  return (
    <nav aria-label={`More in ${cluster.cluster}`} className="rounded-2xl border border-hairline bg-white p-5">
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-body">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-[#FFF5F5] text-brand">
          <Icon name={cluster.icon} className="h-3.5 w-3.5" />
        </span>
        In this section
      </div>
      <div className="mt-1 text-sm font-semibold text-ink">{cluster.cluster}</div>
      <ul className="mt-3 space-y-1">
        {cluster.entries.map((e) => {
          const current = e.href === currentHref;
          return (
            <li key={e.href}>
              <a
                href={e.href}
                aria-current={current ? "page" : undefined}
                className={
                  "block rounded-lg px-3 py-2 text-sm transition-colors " +
                  (current
                    ? "bg-[#FFF5F5] font-semibold text-brand"
                    : "text-body hover:bg-slate-50 hover:text-brand")
                }
              >
                {e.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
