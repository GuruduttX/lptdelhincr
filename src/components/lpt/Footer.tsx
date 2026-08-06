import { MapPin, Phone, Mail, Instagram, Youtube, Linkedin } from "lucide-react";
import {
  BRAND,
  CENTRES,
  EMAIL,
  LEGAL_LINKS,
  PHONE,
  SOCIAL,
  getVerticalTree,
  isPlaceholder,
  telLink,
  type Vertical,
} from "@/config/site";

/**
 * Fat footer / human sitemap. CUET & IPMAT columns list the top cluster hubs
 * (from SITE_TREE, single source of truth); Centres lists the 4 NAP locations;
 * Company lists key cross-section pages. The 4-centre NAP block is byte-identical
 * with config (SOP §0). Social/phone/email render only when real.
 */
const socials = [
  { Icon: Youtube, url: SOCIAL.youtube, label: "YouTube" },
  { Icon: Instagram, url: SOCIAL.instagram, label: "Instagram" },
  { Icon: Linkedin, url: SOCIAL.linkedin, label: "LinkedIn" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Our Centres", href: "/centres" },
  { label: "Results", href: "/results" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
  { label: "Full sitemap", href: "/sitemap" },
];

function VerticalCol({ vertical, hub }: { vertical: Vertical; hub: string }) {
  // Cluster head (first entry) of each cluster = the section hub link.
  const clusters = getVerticalTree(vertical).slice(0, 6);
  return (
    <div>
      <div className="eyebrow text-[11px]">{vertical}</div>
      <ul className="mt-5 space-y-2.5 text-sm text-white/75">
        <li>
          <a href={hub} className="font-semibold text-white hover:text-brand">{vertical} guide</a>
        </li>
        {clusters.map((c) => (
          <li key={c.cluster}>
            <a href={c.entries[0].href} className="hover:text-white">{c.cluster}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const phoneKnown = !isPlaceholder(PHONE);

  return (
    <footer className="bg-[#0F1015] text-white">
      <div className="container-lpt py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <img src="/logo.svg" alt={BRAND} className="h-10 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              {BRAND} — CUET &amp; IPMAT coaching across 4 Delhi-NCR centres in Noida, Hauz Khas, GTB
              Nagar and Gurugram. Offline, online and hybrid batches.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-white/75">
              {phoneKnown && (
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.75} />
                  <a href={telLink(PHONE)} className="hover:text-white">{PHONE}</a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.75} />
                <a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a>
              </li>
            </ul>
            {socials.some((s) => !isPlaceholder(s.url)) && (
              <div className="mt-6 flex gap-2">
                {socials
                  .filter((s) => !isPlaceholder(s.url))
                  .map(({ Icon, url, label }) => (
                    <a
                      key={label}
                      href={url}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-all hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </a>
                  ))}
              </div>
            )}
          </div>

          <VerticalCol vertical="CUET" hub="/cuet" />
          <VerticalCol vertical="IPMAT" hub="/ipmat" />

          {/* Centres */}
          <div>
            <div className="eyebrow text-[11px]">Centres</div>
            <ul className="mt-5 space-y-2.5 text-sm text-white/75">
              {CENTRES.map((c) => (
                <li key={c.slug}>
                  <a href={`/centres/${c.slug}`} className="hover:text-white">{c.area}</a>
                </li>
              ))}
              <li><a href="/centres" className="font-semibold text-white hover:text-brand">All centres</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="eyebrow text-[11px]">Company</div>
            <ul className="mt-5 space-y-2.5 text-sm text-white/75">
              {company.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4 centres — NAP sitewide (SOP §0 / E4) */}
        <div className="mt-14 grid gap-8 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {CENTRES.map((c) => (
            <div key={c.slug}>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <MapPin className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.75} />
                {c.area}
              </div>
              <address className="mt-2 not-italic text-xs leading-relaxed text-white/55">
                {c.fullAddress}
              </address>
              <a href={`/centres/${c.slug}`} className="mt-2 inline-block text-xs font-semibold text-brand hover:text-white">
                View centre →
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-lpt flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/55 md:flex-row">
          <span>© {year} {BRAND}. All rights reserved.</span>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white">{l.label}</a>
            ))}
            <a href="/sitemap" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
