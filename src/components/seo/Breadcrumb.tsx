import type { Crumb } from "@/lib/schema";

/**
 * Breadcrumb (SOP A4.1) — server-rendered <nav>/<ol> matching the URL path.
 * Pair the same `crumbs` with breadcrumbSchema() for the JSON-LD (A5.2).
 * Last crumb (no `item`) renders as aria-current text.
 */
export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb text-sm text-body">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1 || !c.item;
          return (
            <li key={`${c.name}-${i}`} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="font-medium text-ink">
                  {c.name}
                </span>
              ) : (
                <>
                  <a href={c.item!} className="hover:text-brand">
                    {c.name}
                  </a>
                  <span aria-hidden className="text-hairline">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
