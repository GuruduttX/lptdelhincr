/**
 * FAQ (SOP A4.5 / B6) — server-rendered; answers live in raw HTML (NOT
 * JS-injected). Rendered as native <details> accordions (SSR-safe, accessible,
 * no JS) — answers stay in the DOM even when collapsed, so AEO/snippets work.
 * NO FAQPage JSON-LD here (that lives only on FAQ-hub pages).
 */
import { type ReactNode } from "react";

export interface FAQItem {
  q: string;
  a: ReactNode;
}

export function FAQ({ items, id = "faq" }: { items: FAQItem[]; id?: string }) {
  if (items.length === 0) return null;
  return (
    <section id={id} className="faq scroll-mt-28">
      <h2 className="h-display text-2xl sm:text-3xl">Frequently asked questions</h2>
      <div className="mt-6 space-y-3">
        {items.map((it, i) => (
          <details key={i} className="faq__item group rounded-2xl border border-hairline bg-white open:shadow-soft">
            <summary className="faq__q flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-ink">
              {it.q}
              <span aria-hidden className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cream-soft text-brand transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="faq__a px-5 pb-5 text-body leading-relaxed">{it.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
