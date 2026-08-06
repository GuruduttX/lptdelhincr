import { type ReactNode } from "react";

/**
 * DirectAnswer (SOP A4.3 / B5) — the AEO/snippet/LLM target. A visually distinct
 * answer callout (brand accent bar) placed after the H1 / each H2 question. Must
 * be a self-contained 40–60 word answer. `lead` is the bold opener.
 */
export function DirectAnswer({ children, lead }: { children: ReactNode; lead?: string }) {
  return (
    <p className="answer-lead border-l-[3px] border-brand/60 pl-4 text-body leading-relaxed">
      {lead && <strong className="text-ink">{lead} </strong>}
      {children}
    </p>
  );
}
