import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X, MessageCircle, ArrowRight } from "lucide-react";
import { UtilityBar } from "./UtilityBar";
import { Icon } from "./Icon";
import {
  BRAND_SHORT,
  CENTRES,
  MEGA,
  HUB_HREF,
  getTreeEntry,
  getVerticalTree,
  whatsappLink,
  type Vertical,
} from "@/config/site";

type MenuKey = Vertical | "Centres" | null;

/**
 * Mega-menu top navigation (driven by SITE_TREE / MEGA in config). CUET & IPMAT
 * open full-width mega panels; Centres a small dropdown; Resources/About are
 * plain links. Accessible (aria-haspopup/expanded, ESC to close, visible focus)
 * and fully responsive (slide-in accordion drawer on mobile).
 */
export function Navbar({
  onBook,
  onSignIn,
  overlay = false,
}: {
  onBook: () => void;
  onSignIn: () => void;
  overlay?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeVertical: MenuKey = pathname.startsWith("/cuet")
    ? "CUET"
    : pathname.startsWith("/ipmat")
      ? "IPMAT"
      : pathname.startsWith("/centres")
        ? "Centres"
        : null;

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  // ESC closes any open menu / drawer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const wrapperClass = overlay
    ? "absolute inset-x-0 top-0 z-50"
    : "sticky top-0 z-50 bg-white border-b border-hairline";
  const navBg = !overlay
    ? "bg-white"
    : scrolled
      ? "bg-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.06)] backdrop-blur-md"
      : "bg-white/0";

  const topLink =
    "nav-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded";

  return (
    <div ref={wrapRef} className={wrapperClass} onMouseLeave={() => setOpen(null)}>
      <UtilityBar />
      <nav className={"transition-all duration-300 " + navBg} aria-label="Primary">
        <div className="container-lpt flex h-[72px] items-center justify-between gap-6">
          <a href="/" className="flex items-center" aria-label={`${BRAND_SHORT} — home`}>
            <img src="/logo.svg" alt={BRAND_SHORT} className="h-9 w-auto" />
          </a>

          <ul className="hidden items-center gap-6 lg:flex">
            {(["CUET", "IPMAT"] as Vertical[]).map((v) => (
              <li key={v} onMouseEnter={() => setOpen(v)}>
                <button
                  className={`${topLink} flex items-center gap-1 ${activeVertical === v ? "text-brand" : ""}`}
                  aria-haspopup="true"
                  aria-expanded={open === v}
                  onClick={() => setOpen(open === v ? null : v)}
                  onFocus={() => setOpen(v)}
                >
                  {v}
                  <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              </li>
            ))}
            <li onMouseEnter={() => setOpen("Centres")} className="relative">
              <button
                className={`${topLink} flex items-center gap-1 ${activeVertical === "Centres" ? "text-brand" : ""}`}
                aria-haspopup="true"
                aria-expanded={open === "Centres"}
                onClick={() => setOpen(open === "Centres" ? null : "Centres")}
                onFocus={() => setOpen("Centres")}
              >
                Centres
                <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.2} />
              </button>
              {open === "Centres" && (
                <div className="absolute left-1/2 top-full w-[280px] -translate-x-1/2 pt-5">
                  <div className="fade-up overflow-hidden rounded-2xl border border-black/[0.04] bg-white p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                    <ul className="space-y-1">
                      {CENTRES.map((c) => (
                        <li key={c.slug}>
                          <a
                            href={`/centres/${c.slug}`}
                            onClick={() => setOpen(null)}
                            className="group block rounded-xl p-3 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                          >
                            <span className="block text-[13px] font-bold text-ink transition-colors group-hover:text-brand">{c.area}</span>
                            <span className="mt-0.5 block text-[11px] text-slate-500">{c.landmark}</span>
                          </a>
                        </li>
                      ))}
                      <li className="border-t border-hairline pt-1 mt-1">
                        <a href="/centres" onClick={() => setOpen(null)} className="block rounded-xl p-3 text-[13px] font-bold text-brand hover:bg-[#FFF5F5] transition-colors">
                          All centres →
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </li>
            <li onMouseEnter={() => setOpen(null)}>
              <a href="/resources" className={topLink}>Resources</a>
            </li>
            <li onMouseEnter={() => setOpen(null)}>
              <a href="/about" className={topLink}>About</a>
            </li>
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={onSignIn}
              className="rounded-full px-5 py-2.5 text-[13px] font-bold text-ink transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              Log In
            </button>
            <button
              onClick={onBook}
              className="rounded-full bg-[#DA202F] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_14px_rgba(218,32,47,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(218,32,47,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
            >
              Book Free Demo
            </button>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-hairline lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            onClick={() => setMobile(true)}
            aria-label="Open menu"
            aria-haspopup="true"
            aria-expanded={mobile}
          >
            <Menu className="h-5 w-5 text-ink" strokeWidth={1.75} />
          </button>
        </div>

        {/* Desktop mega panels */}
        {(open === "CUET" || open === "IPMAT") && (
          <MegaPanel vertical={open} onBook={onBook} onClose={() => setOpen(null)} />
        )}
      </nav>

      {mobile && (
        <MobileDrawer
          onClose={() => setMobile(false)}
          onBook={() => {
            setMobile(false);
            onBook();
          }}
          onSignIn={() => {
            setMobile(false);
            onSignIn();
          }}
        />
      )}
    </div>
  );
}

/* ---- Desktop mega panel (full width) ---- */
function MegaPanel({ vertical, onBook, onClose }: { vertical: Vertical; onBook: () => void; onClose: () => void }) {
  return (
    <div className="absolute inset-x-0 top-full hidden lg:block" onMouseEnter={() => {}}>
      <div className="container-lpt">
        <div className="fade-up overflow-hidden rounded-3xl border border-hairline bg-white shadow-[0_8px_16px_rgba(0,0,0,0.05),0_24px_48px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-5 gap-2 p-4">
            {MEGA[vertical].map((col) => (
              <div key={col.heading} className="rounded-2xl p-4">
                <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#FFF5F5] text-brand">
                    <Icon name={col.icon} className="h-4 w-4" />
                  </span>
                  {col.heading}
                </div>
                <ul className="space-y-1">
                  {col.hrefs
                    .map((h) => getTreeEntry(h))
                    .filter((e): e is NonNullable<typeof e> => Boolean(e))
                    .map((e) => (
                      <li key={e.href}>
                        <a
                          href={e.href}
                          onClick={onClose}
                          className="group block rounded-xl p-2 -mx-2 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                        >
                          <span className="block text-[13px] font-bold text-ink transition-colors group-hover:text-brand">
                            {e.label}
                          </span>
                          {e.desc && <span className="mt-0.5 block text-[11px] font-medium text-slate-500">{e.desc}</span>}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-black/[0.04] bg-slate-50/60 px-6 py-4">
            <a href={HUB_HREF[vertical]} onClick={onClose} className="text-sm font-bold text-ink hover:text-brand">
              View the full {vertical} guide
              <ArrowRight className="ml-1 inline-block h-3.5 w-3.5 -mt-0.5" strokeWidth={2.5} />
            </a>
            <a
              href={whatsappLink(`Hi ${BRAND_SHORT}, I want ${vertical} coaching details`)}
              target="_blank"
              rel="nofollow"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[13px] font-bold text-white hover:bg-brand-dark"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} /> Book a free demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}



/* ---- Mobile slide-in drawer (accordion) ---- */
function MobileDrawer({ onClose, onBook, onSignIn }: { onClose: () => void; onBook: () => void; onSignIn: () => void }) {
  const [grp, setGrp] = useState<Vertical | "Centres" | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-[90vw] max-w-sm flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-hairline p-5">
          <img src="/logo.svg" alt={BRAND_SHORT} className="h-8 w-auto" />
          <button ref={closeRef} onClick={onClose} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-full border border-hairline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {(["CUET", "IPMAT"] as Vertical[]).map((v) => (
            <div key={v} className="border-b border-hairline">
              <button
                className="flex w-full items-center justify-between py-3.5 text-left text-sm font-bold text-ink"
                aria-expanded={grp === v}
                onClick={() => setGrp(grp === v ? null : v)}
              >
                {v}
                <ChevronDown className={`h-4 w-4 transition-transform ${grp === v ? "rotate-180" : ""}`} strokeWidth={2} />
              </button>
              {grp === v && (
                <div className="space-y-4 pb-4">
                  <a href={HUB_HREF[v]} onClick={onClose} className="block text-[13px] font-bold text-brand">
                    View the full {v} guide →
                  </a>
                  {getVerticalTree(v).map((cl) => (
                    <div key={cl.cluster}>
                      <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                        <Icon name={cl.icon} className="h-3.5 w-3.5" />
                        {cl.cluster}
                      </div>
                      <ul className="space-y-1 pl-5">
                        {cl.entries.map((e) => (
                          <li key={e.href}>
                            <a href={e.href} onClick={onClose} className="block py-1 text-sm text-body hover:text-brand">
                              {e.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="border-b border-hairline">
            <button
              className="flex w-full items-center justify-between py-3.5 text-left text-sm font-bold text-ink"
              aria-expanded={grp === "Centres"}
              onClick={() => setGrp(grp === "Centres" ? null : "Centres")}
            >
              Centres
              <ChevronDown className={`h-4 w-4 transition-transform ${grp === "Centres" ? "rotate-180" : ""}`} strokeWidth={2} />
            </button>
            {grp === "Centres" && (
              <ul className="space-y-1 pb-4 pl-5">
                {CENTRES.map((c) => (
                  <li key={c.slug}>
                    <a href={`/centres/${c.slug}`} onClick={onClose} className="block py-1 text-sm text-body hover:text-brand">{c.area}</a>
                  </li>
                ))}
                <li><a href="/centres" onClick={onClose} className="block py-1 text-sm font-semibold text-brand">All centres →</a></li>
              </ul>
            )}
          </div>

          <a href="/resources" onClick={onClose} className="block border-b border-hairline py-3.5 text-sm font-bold text-ink">Resources</a>
          <a href="/about" onClick={onClose} className="block border-b border-hairline py-3.5 text-sm font-bold text-ink">About</a>
          <a href="/sitemap" onClick={onClose} className="block border-b border-hairline py-3.5 text-sm font-medium text-body">Full sitemap</a>
        </div>

        <div className="space-y-3 border-t border-hairline p-5">
          <button onClick={onBook} className="btn-primary w-full">Book Free Demo</button>
          <button onClick={onSignIn} className="btn-secondary w-full">Log In</button>
        </div>
      </div>
    </div>
  );
}
