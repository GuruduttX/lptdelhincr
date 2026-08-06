import { type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { AnchorTOC, type TOCItem } from "./AnchorTOC";
import { DirectAnswer } from "./DirectAnswer";
import { FAQ, type FAQItem } from "./FAQ";
import { ConversionCTA } from "./ConversionCTA";
import { Byline } from "./Byline";
import { JsonLd } from "./JsonLd";
import { Canonical } from "./Canonical";
import { SectionNav } from "./SectionNav";
import { RelatedLinks } from "./RelatedLinks";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import { BRAND_SHORT, whatsappLink } from "@/config/site";

/**
 * ContentPage — leaf/article layout (SOP A4 + B7). Two columns on lg+: a
 * comfortable reading column (breadcrumb, H1, byline, direct-answer, sections,
 * FAQ, related pages, CTA) and a sticky rail ("On this page" TOC + "In this
 * section" sibling nav + a compact WhatsApp card). Stacks on mobile, where the
 * TOC appears inline and SectionNav is a collapsible block before the footer.
 * Everything renders server-side (SOP A1); SectionNav/RelatedLinks derive from
 * SITE_TREE via canonicalPath, so no per-route wiring is needed.
 */
export function ContentPage({
  crumbs,
  canonicalPath,
  title,
  intro,
  introLead,
  toc,
  byline,
  faqs,
  ctaHeading,
  ctaMessage,
  schema = [],
  children,
}: {
  crumbs: Crumb[];
  canonicalPath: string;
  title: ReactNode;
  intro: ReactNode;
  introLead?: string;
  toc?: TOCItem[];
  byline?: {
    authorName: string;
    authorSlug: string;
    role?: string;
    isoDate: string;
    displayDate: string;
  };
  faqs?: FAQItem[];
  ctaHeading?: string;
  ctaMessage?: string;
  schema?: Record<string, unknown>[];
  children?: ReactNode;
}) {
  const allSchema = [breadcrumbSchema(crumbs), ...schema];
  const hasToc = !!toc && toc.length > 0;

  return (
    <article className="container-lpt py-10 md:py-14">
      <Canonical path={canonicalPath} />
      <Breadcrumb crumbs={crumbs} />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* MAIN COLUMN */}
        <div className="min-w-0">
          <header className="max-w-3xl">
            <h1 className="h-display text-3xl sm:text-4xl md:text-[2.6rem] leading-tight">{title}</h1>
            {byline && <div className="mt-4">{<Byline {...byline} />}</div>}
            <div className="mt-5">
              <DirectAnswer lead={introLead}>{intro}</DirectAnswer>
            </div>
          </header>

          {/* Mobile TOC (rail shows it on lg+) */}
          {hasToc && (
            <div className="mt-8 lg:hidden">
              <AnchorTOC items={toc!} />
            </div>
          )}

          <div className="mt-10 max-w-3xl space-y-12">{children}</div>

          {faqs && faqs.length > 0 && (
            <div className="mt-14 max-w-3xl">
              <FAQ items={faqs} />
            </div>
          )}

          <div className="max-w-3xl">
            <RelatedLinks currentHref={canonicalPath} />
          </div>

          {/* Mobile "In this section" (collapsible, SSR-safe via <details>) */}
          <details className="group mt-10 rounded-2xl border border-hairline bg-white lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-bold text-ink">
              In this section
              <span className="text-brand transition-transform group-open:rotate-180">▾</span>
            </summary>
            <div className="px-3 pb-3">
              <SectionNav currentHref={canonicalPath} />
            </div>
          </details>

          <div className="mt-14 max-w-3xl">
            <ConversionCTA heading={ctaHeading} message={ctaMessage} />
          </div>
        </div>

        {/* STICKY RAIL (lg+) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            {hasToc && <AnchorTOC items={toc!} />}
            <SectionNav currentHref={canonicalPath} />
            <div className="rounded-2xl border border-hairline bg-[#0F1015] p-5 text-white">
              <div className="text-sm font-bold">Talk to {BRAND_SHORT}</div>
              <p className="mt-1 text-xs text-white/70">Free demo &amp; counselling — fastest on WhatsApp.</p>
              <a
                href={whatsappLink(ctaMessage ?? `Hi ${BRAND_SHORT}, I have a question`)}
                target="_blank"
                rel="nofollow"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-[13px] font-bold text-white hover:bg-brand-dark"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>

      <JsonLd schema={allSchema} />
    </article>
  );
}

/** A titled content section with a stable id matching an AnchorTOC item. */
export function Section({
  id,
  heading,
  children,
}: {
  id: string;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="h-display text-2xl sm:text-3xl">{heading}</h2>
      <div className="mt-4 space-y-4 text-body leading-relaxed">{children}</div>
    </section>
  );
}
