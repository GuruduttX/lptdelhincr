import { Reveal } from "./Reveal";
import { SectionHeader } from "./shared";
import { Users, GraduationCap, BookMarked, FileCheck2, Headphones, Trophy, Sparkles } from "lucide-react";
import { IIM_SELECTIONS_2YR } from "@/data/results";
import { AVG_TEACHER_EXPERIENCE } from "@/data/faculty";

/**
 * WhyLPT — value proposition. CUET + IPMAT only. All figures verified
 * (avg faculty experience, IIM selections, group teaching legacy).
 */
const pillars = [
  { icon: Users, stat: `${AVG_TEACHER_EXPERIENCE} yrs` as string | null, statLabel: "avg faculty exp.", title: "Experienced Faculty", desc: "Mentors who teach CUET and IPMAT full-time — not part-time freelancers." },
  { icon: GraduationCap, stat: IIM_SELECTIONS_2YR, statLabel: "selections", title: "Verified Selections", desc: `${IIM_SELECTIONS_2YR} IIM selections in 2 years — see the named list on our results page.` },
  { icon: BookMarked, stat: "In-house", statLabel: "", title: "Original Study Material", desc: "Modules authored in-house and revised to the latest exam pattern." },
  { icon: FileCheck2, stat: "Adaptive", statLabel: "", title: "Test Series", desc: "Proctored mocks that pinpoint weak areas and benchmark your prep." },
  { icon: Headphones, stat: "1-on-1", statLabel: "", title: "Mentorship Access", desc: "A direct line to your mentor — not a chatbot or a call centre." },
];

export function WhyLPT() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-lpt">
        <SectionHeader
          eyebrow="Why Us"
          title={<>Why Aspirants Choose <span className="text-brand">LPT Delhi-NCR</span></>}
          subtitle="It's not the videos, the tests, or the slogans — it's the people behind them."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {/* Hero card */}
          <Reveal className="md:col-span-2">
            <article className="lift-card group relative h-full overflow-hidden rounded-3xl border border-hairline bg-white p-9" style={{ minHeight: "240px" }}>
              <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(65% 80% at 95% 5%, #FFEED7 0%, transparent 65%)" }} />
              <div className="flex h-full flex-col justify-between">
                <div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-brand">
                    <Trophy className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <div className="mt-5 flex items-end gap-2">
                    <span className="h-display leading-none text-brand" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}>
                      24+
                    </span>
                    <span className="mb-1 text-xl font-bold text-ink/60">years of teaching legacy</span>
                  </div>
                  <p className="mt-3 max-w-sm text-[0.88rem] leading-relaxed text-body">
                    The LPT group brings 24+ years of teaching expertise, now focused on CUET and IPMAT
                    across 4 Delhi-NCR centres with senior mentors averaging 10+ years each.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          {/* First pillar */}
          <Reveal delay={80}>
            <article className="lift-card group relative h-full overflow-hidden rounded-3xl border border-hairline bg-white p-7 transition-colors hover:border-brand/25">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cream text-brand">
                <Users className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p className="mt-4 h-display leading-none text-brand" style={{ fontSize: "1.75rem" }}>
                {pillars[0].stat}
              </p>
              <h3 className="mt-1.5 h-display text-[1.05rem] leading-snug">{pillars[0].title}</h3>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-body">{pillars[0].desc}</p>
            </article>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {pillars.slice(1).map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={(i + 2) * 80}>
                <article className="lift-card group relative h-full overflow-hidden rounded-3xl border border-hairline bg-white p-6 transition-colors hover:border-brand/25">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cream text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 h-display leading-none text-brand" style={{ fontSize: "1.4rem" }}>
                    {f.stat}
                  </p>
                  <h3 className="mt-1 h-display text-[0.95rem] leading-snug">{f.title}</h3>
                  <p className="mt-2 text-[0.78rem] leading-relaxed text-body">{f.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={400}>
          <div className="mt-10 flex items-center justify-center gap-2.5">
            <Sparkles className="h-4 w-4 text-brand" strokeWidth={1.75} />
            <p className="text-[0.82rem] font-medium text-body">CUET &amp; IPMAT coaching across 4 Delhi-NCR centres.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
