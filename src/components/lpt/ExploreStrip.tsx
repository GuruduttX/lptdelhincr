import { ArrowRight, Target, FileBarChart, BookOpen, Calculator, GraduationCap, ListChecks } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./shared";

/**
 * Homepage entry into the two knowledge verticals + most-used tools.
 * Routes students from the home page straight into the /cuet and /ipmat hubs
 * and the highest-intent tool pages (no dead links; all internal routes exist).
 */
const verticals = [
  {
    href: "/cuet",
    eyebrow: "For Class 12 · 12+",
    title: "CUET (UG) — Full Guide",
    desc: "Cutoffs, college predictor, normalisation, CSAS admission, syllabus and study plans — everything for central-university admission.",
  },
  {
    href: "/ipmat",
    eyebrow: "For Class 11 · 12 · 12+",
    title: "IPMAT & JIPMAT — Full Guide",
    desc: "Exam pattern, marking strategy, sectional cutoffs, composite scores, syllabus and PI/WAT prep for the 5-year IIM programmes.",
  },
];

const tools = [
  { href: "/cuet/cutoff", label: "CUET Cutoffs", icon: Target },
  { href: "/cuet/results/college-predictor", label: "College Predictor", icon: Calculator },
  { href: "/cuet/syllabus", label: "CUET Syllabus", icon: BookOpen },
  { href: "/ipmat/marking-scheme", label: "IPMAT Marking", icon: FileBarChart },
  { href: "/ipmat/cutoff", label: "IPMAT Cutoffs", icon: GraduationCap },
  { href: "/ipmat/syllabus", label: "IPMAT Syllabus", icon: ListChecks },
];

export function ExploreStrip() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-lpt">
        <SectionHeader
          eyebrow="Explore"
          title={
            <>
              Find everything about <span className="text-brand">CUET &amp; IPMAT</span>
            </>
          }
          subtitle="Free, sourced guides and tools — start with a vertical, or jump straight to a tool."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {verticals.map((v, i) => (
            <Reveal key={v.href} delay={i * 100}>
              <a
                href={v.href}
                className="lift-card group flex h-full flex-col rounded-3xl border border-hairline bg-white p-7 md:p-8"
              >
                <div className="eyebrow text-[11px]">{v.eyebrow}</div>
                <h3 className="mt-3 h-display text-2xl">{v.title}</h3>
                <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-body">{v.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all group-hover:gap-3">
                  Open the full guide <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-8 rounded-3xl border border-hairline bg-cream-soft p-6 md:p-7">
            <div className="text-[11px] font-bold uppercase tracking-widest text-body">Popular tools &amp; references</div>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {tools.map((t) => {
                const Icon = t.icon;
                return (
                  <li key={t.href}>
                    <a
                      href={t.href}
                      className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-2 text-sm font-medium text-ink transition-all hover:border-brand hover:bg-brand-wash hover:text-brand"
                    >
                      <Icon className="h-4 w-4 text-brand" strokeWidth={2} />
                      {t.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
