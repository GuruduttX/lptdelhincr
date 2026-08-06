/**
 * AnchorTOC (SOP A4.2) — "On this page" jump-link nav. Vertical list so it sits
 * cleanly in the sticky rail (desktop) and inline (mobile). `items` carry
 * stable, descriptive ids matching the section <h2>/<h3>.
 */
export interface TOCItem {
  id: string;
  label: string;
}

export function AnchorTOC({ items }: { items: TOCItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav className="toc rounded-2xl border border-hairline bg-cream-soft p-5" aria-label="On this page">
      <h2 className="toc__title text-[11px] font-bold uppercase tracking-widest text-body">On this page</h2>
      <ul className="mt-3 space-y-1.5 text-sm">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="block border-l-2 border-transparent pl-3 font-medium text-body transition-colors hover:border-brand hover:text-brand"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
