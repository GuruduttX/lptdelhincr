/**
 * ComparisonTable (SOP A4.4) — extractable, server-rendered table. Polished:
 * captioned ("updated {date} · source"), sticky header, zebra rows, optional
 * right-aligned numeric columns, clear borders, horizontal scroll on mobile.
 */
export interface TableColumn {
  key: string;
  header: string;
  /** "right" for numeric columns (defaults to left). */
  align?: "left" | "right";
}

export function ComparisonTable({
  caption,
  date,
  source,
  columns,
  rows,
  illustrative = false,
}: {
  caption: string;
  date: string;
  source: string;
  columns: TableColumn[];
  rows: Record<string, React.ReactNode>[];
  illustrative?: boolean;
}) {
  const cellAlign = (c: TableColumn) => (c.align === "right" ? "text-right tabular-nums" : "text-left");
  return (
    <figure className="table-wrap overflow-hidden rounded-2xl border border-hairline">
      <figcaption className="flex flex-wrap items-center gap-2 border-b border-hairline bg-cream-soft px-4 py-3 text-xs text-body">
        <span className="font-semibold text-ink">{caption}</span>
        <span className="text-body/70">· updated {date} · source: {source}</span>
        {illustrative && (
          <span className="rounded bg-brand-wash px-2 py-0.5 font-semibold text-brand">
            ILLUSTRATIVE — not verified data
          </span>
        )}
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-white">
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={`sticky top-0 z-10 border-b border-hairline bg-white px-4 py-3 font-semibold text-ink ${cellAlign(c)}`}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 ? "bg-cream-soft/40" : "bg-white"}>
                {columns.map((c) => (
                  <td key={c.key} className={`border-b border-hairline px-4 py-3 text-body ${cellAlign(c)}`}>
                    {row[c.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
