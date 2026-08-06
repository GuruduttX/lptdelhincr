import { Link } from "@tanstack/react-router";

/**
 * Byline (SOP A4.7) — E-E-A-T + GEO. Author links to the faculty bio; the
 * "Last updated" time carries a machine-readable datetime. Author must be a
 * real faculty member (never fabricate).
 */
export function Byline({
  authorName,
  authorSlug,
  role,
  /** ISO date e.g. "2026-06-22" */
  isoDate,
  /** Human label e.g. "22 Jun 2026" */
  displayDate,
}: {
  authorName: string;
  authorSlug: string;
  role?: string;
  isoDate: string;
  displayDate: string;
}) {
  return (
    <div className="byline flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-body">
      <span>
        By{" "}
        <Link to="/faculty/$slug" params={{ slug: authorSlug }} className="font-semibold text-ink hover:text-brand">
          {authorName}
        </Link>
        {role ? `, ${role}` : ""}
      </span>
      <span aria-hidden>·</span>
      <time dateTime={isoDate}>Last updated {displayDate}</time>
    </div>
  );
}
