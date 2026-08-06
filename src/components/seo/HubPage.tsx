import { type ReactNode } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { DirectAnswer } from "./DirectAnswer";
import { FAQ, type FAQItem } from "./FAQ";
import { ConversionCTA } from "./ConversionCTA";
import { JsonLd } from "./JsonLd";
import { Canonical } from "./Canonical";
import { Icon } from "@/components/lpt/Icon";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import {
  BRAND_SHORT,
  getCluster,
  getVerticalTree,
  whatsappLink,
  type TreeLink,
  type Vertical,
} from "@/config/site";

export interface HubGroup {
  heading: string;
  icon: string;
  items: TreeLink[];
}

/**
 * HubPage (Phase 5) — a wider, richer index layout than ContentPage. Hero band
 * (breadcrumb, H1, answer-lead intro, primary CTA, optional key-fact chips) →
 * optional intro content → a card grid of child pages grouped by cluster → FAQ →
 * ConversionCTA → JSON-LD. Child groups derive from SITE_TREE:
 *   - vertical "CUET"/"IPMAT"  → every cluster as a group (the vertical hub)
 *   - clusterOf "/cuet/cutoff" → that single cluster's pages (a section hub)
 *   - groups [...]             → explicit groups (cross-section hubs)
 * All server-rendered (SOP A1). URLs/schema/canonical unchanged.
 */
export function HubPage({
  canonicalPath,
  crumbs,
  title,
  intro,
  introLead,
  vertical,
  clusterOf,
  groups,
  keyFacts,
  faqs,
  ctaHeading,
  ctaMessage,
  schema = [],
  children,
}: {
  canonicalPath: string;
  crumbs: Crumb[];
  title: ReactNode;
  intro: ReactNode;
  introLead?: string;
  vertical?: Vertical;
  clusterOf?: string;
  groups?: HubGroup[];
  keyFacts?: { label: string; value: ReactNode }[];
  faqs?: FAQItem[];
  ctaHeading?: string;
  ctaMessage?: string;
  schema?: Record<string, unknown>[];
  children?: ReactNode;
}) {
  const allSchema = [breadcrumbSchema(crumbs), ...schema];

  // Resolve the groups to render.
  let resolved: HubGroup[] = [];
  if (groups) resolved = groups;
  else if (vertical) resolved = getVerticalTree(vertical).map((c) => ({ heading: c.cluster, icon: c.icon, items: c.entries }));
  else if (clusterOf) {
    const c = getCluster(clusterOf);
    if (c) resolved = [{ heading: c.cluster, icon: c.icon, items: c.entries }];
  }
  // Don't render a card that links to this very page.
  resolved = resolved
    .map((g) => ({ ...g, items: g.items.filter((it) => it.href !== canonicalPath) }))
    .filter((g) => g.items.length > 0);

  const msg = ctaMessage ?? `Hi ${BRAND_SHORT}, I want coaching details`;

  return (
    <div>
      {/* Hero band */}
      <section className="border-b border-hairline bg-gradient-to-b from-[#FFF9F2] to-white">
        <div className="container-lpt py-10 md:py-14">
          <Canonical path={canonicalPath} />
          <Breadcrumb crumbs={crumbs} />
          <div className="mt-6 max-w-3xl">
            <h1 className="h-display text-3xl sm:text-4xl md:text-[2.75rem] leading-tight">{title}</h1>
            <div className="mt-5 text-lg">
              <DirectAnswer lead={introLead}>{intro}</DirectAnswer>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappLink(msg)}
                target="_blank"
                rel="nofollow"
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} /> Book a free demo
              </a>
            </div>
          </div>

          {keyFacts && keyFacts.length > 0 && (
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {keyFacts.map((k, i) => (
                <div key={i} className="rounded-2xl border border-hairline bg-white p-5">
                  <div className="h-display text-2xl text-brand">{k.value}</div>
                  <div className="mt-1 text-sm font-medium text-body">{k.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="container-lpt py-10 md:py-14">
        {/* Optional intro content (e.g. "at a glance") */}
        {children && <div className="mb-12 max-w-3xl space-y-4 text-body leading-relaxed">{children}</div>}

        {/* Card grid grouped by cluster */}
        <div className="space-y-12">
          {resolved.map((g) => (
            <section key={g.heading} aria-label={g.heading}>
              <h2 className="flex items-center gap-2.5 h-display text-xl sm:text-2xl">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-cream text-brand">
                  <Icon name={g.icon} className="h-4 w-4" />
                </span>
                {g.heading}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((it) => (
                  <a
                    key={it.href}
                    href={it.href}
                    className="lift-card group flex h-full flex-col rounded-2xl border border-hairline bg-white p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                  >
                    <span className="h-display text-[1.05rem] leading-snug transition-colors group-hover:text-brand">
                      {it.label}
                    </span>
                    {it.desc && <span className="mt-1.5 flex-1 text-sm text-body">{it.desc}</span>}
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                      Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        {faqs && faqs.length > 0 && (
          <div className="mt-14 max-w-3xl">
            <FAQ items={faqs} />
          </div>
        )}

        <div className="mt-14">
          <ConversionCTA heading={ctaHeading} message={ctaMessage} />
        </div>
      </div>

      <JsonLd schema={allSchema} />
    </div>
  );
}
