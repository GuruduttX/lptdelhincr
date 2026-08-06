import { type ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

/**
 * Tbd — a clearly-marked placeholder for data we do not yet have verified.
 * Renders a dashed chip so a placeholder is NEVER mistaken for a real figure
 * (SOP hard rule: never present a placeholder as fact). `label` describes what
 * real value belongs here.
 */
export function Tbd({ label = "add real data" }: { label?: string }) {
  return (
    <span
      title="NEEDS-REAL-DATA — replace with a verified value before publishing"
      className="inline-flex items-center rounded-md border border-dashed border-brand/50 bg-brand-wash px-2 py-0.5 text-[0.7em] font-semibold uppercase tracking-wide text-brand align-middle"
    >
      {label}
    </span>
  );
}

/**
 * Stat — renders a numeric stat ONLY if a real value is supplied; otherwise a
 * Tbd placeholder. Use for any metric we can't yet verify.
 */
export function Stat({
  value,
  label,
  placeholderLabel = "TBD",
}: {
  value?: ReactNode;
  label: string;
  placeholderLabel?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-3xl font-bold tracking-tight text-ink">
        {value ?? <Tbd label={placeholderLabel} />}
      </span>
      <span className="mt-1 text-sm font-medium text-body/80">{label}</span>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  action?: ReactNode;
}) {
  const isLeft = align === "left";
  return (
    <div
      className={
        isLeft
          ? "flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          : "mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
      }
    >
      <div className={isLeft ? "max-w-2xl" : ""}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 h-display text-3xl sm:text-4xl md:text-[2.5rem]">{title}</h2>
        {subtitle && <p className="mt-4 text-body text-base sm:text-lg">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
