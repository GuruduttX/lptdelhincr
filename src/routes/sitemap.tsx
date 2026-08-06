import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Canonical } from "@/components/seo/Canonical";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/lpt/Icon";
import { breadcrumbSchema } from "@/lib/schema";
import { BRAND, CENTRES, getVerticalTree, VERTICALS } from "@/config/site";

const company = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Faculty", href: "/faculty" },
  { label: "Results", href: "/results" },
  { label: "Resources", href: "/resources" },
  { label: "Courses", href: "/courses" },
  { label: "Master FAQ", href: "/faq" },
  { label: "CUET FAQ hub", href: "/faq/cuet" },
  { label: "IPMAT FAQ hub", href: "/faq/ipmat" },
  { label: "Blog", href: "/blog" },
  { label: "News", href: "/news" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const Route = createFileRoute("/sitemap")({
  head: () =>
    pageHead({
      title: `Sitemap | ${BRAND}`,
      description:
        "Full sitemap of Law Prep Tutorial Delhi-NCR — every CUET and IPMAT guide, tool, cutoff, syllabus, coaching and centre page in one place.",
      path: "/sitemap",
    }),
  component: Sitemap,
});

function Sitemap() {
  return (
    <article className="container-lpt py-10 md:py-14">
      <Canonical path="/sitemap" />
      <Breadcrumb crumbs={[{ name: "Home", item: "/" }, { name: "Sitemap" }]} />
      <header className="mt-6 max-w-3xl">
        <h1 className="h-display text-3xl sm:text-4xl md:text-[2.6rem] leading-tight">Sitemap</h1>
        <p className="answer-lead mt-5 border-l-[3px] border-brand/60 pl-4 text-body leading-relaxed">
          Every page on {BRAND} in one place — browse the full CUET and IPMAT guides, tools, cutoffs,
          syllabus, coaching and centre pages, grouped by section.
        </p>
      </header>

      {VERTICALS.map((v) => (
        <section key={v} className="mt-12" aria-label={`${v} sitemap`}>
          <h2 className="h-display text-2xl sm:text-3xl">{v}</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getVerticalTree(v).map((cl) => (
              <div key={cl.cluster} className="rounded-2xl border border-hairline bg-white p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-cream text-brand">
                    <Icon name={cl.icon} className="h-3.5 w-3.5" />
                  </span>
                  {cl.cluster}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {cl.entries.map((e) => (
                    <li key={e.href}>
                      <a href={e.href} className="text-body hover:text-brand">{e.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-12" aria-label="Centres sitemap">
        <h2 className="h-display text-2xl sm:text-3xl">Centres</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          <li><a href="/centres" className="btn-pill">All centres</a></li>
          {CENTRES.map((c) => (
            <li key={c.slug}><a href={`/centres/${c.slug}`} className="btn-pill">{c.area}</a></li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-label="Company sitemap">
        <h2 className="h-display text-2xl sm:text-3xl">Company &amp; more</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {company.map((l) => (
            <li key={l.href}><a href={l.href} className="btn-pill">{l.label}</a></li>
          ))}
        </ul>
      </section>

      <JsonLd schema={[breadcrumbSchema([{ name: "Home", item: "/" }, { name: "Sitemap" }])]} />
    </article>
  );
}
