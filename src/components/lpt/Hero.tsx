import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Award, FileText, MonitorPlay, PlayCircle, Library, LineChart } from "lucide-react";
import { Reveal } from "./Reveal";
import { CENTRES } from "@/config/site";
import { STUDENTS_MENTORED, IIM_SELECTIONS_2YR } from "@/data/results";
import hero1 from "@/assets/hero-1.jpg";

export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative overflow-hidden pt-[120px] pb-10 lg:pt-[150px] lg:pb-16">
      {/* Soft background */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(50% 50% at 50% 0%, #FFF9F2 0%, #FFFFFF 100%)" }}
      />
      <div className="dot-grid absolute inset-0 -z-10 opacity-[0.4]" />

      <div className="container-lpt grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* LEFT SIDE */}
        <Reveal>
          {/* Eyebrow badge — CUET + IPMAT only */}
          <div className="mb-8 inline-flex items-center rounded-full border border-ink/5 bg-[#0F1015] py-1.5 pl-1.5 pr-5 text-[13px] font-semibold text-white shadow-xl shadow-brand/5 transition-transform hover:-translate-y-0.5">
            <span className="mr-3 flex items-center justify-center rounded-full bg-[#DA202F] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_0_12px_rgba(218,32,47,0.4)]">
              Delhi-NCR
            </span>
            CUET &amp; IPMAT Coaching
          </div>

          {/* Headline */}
          <h1 className="h-display text-[clamp(44px,6vw,72px)] leading-[1.1] tracking-tight text-ink">
            The Prep That <br />
            <span className="relative text-brand inline-block">
              Transforms You
              <svg className="absolute -bottom-6 left-0 -z-10 w-full overflow-visible" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden>
                <path d="M2 20 C 50 12, 130 26, 198 16" stroke="#DA202F" strokeWidth="5" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-8 max-w-lg text-body text-lg leading-relaxed text-gray-600">
            CUET and IPMAT preparation with experienced mentors across {CENTRES.length} Delhi-NCR
            centres. Offline, online and hybrid batches — structured for results.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button onClick={onBook} className="btn-primary px-8 py-3.5 text-base shadow-lg shadow-brand/20">
              Book Free Demo <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </button>
            <Link
              to="/courses"
              className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-ink transition-all hover:bg-gray-50 hover:border-gray-400"
            >
              Explore Courses
            </Link>
          </div>

          {/* Stats — only the verifiable one (centre count) is shown as fact. */}
          <div className="mt-14 flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 lg:gap-10">
            <div className="flex flex-col">
              <span className="font-display text-3xl font-bold tracking-tight text-ink">
                {STUDENTS_MENTORED}
              </span>
              <span className="mt-1 text-sm font-medium text-body/80">Students Guided</span>
            </div>
            <div className="hidden h-10 w-px bg-black/[0.06] sm:block" />
            <div className="flex flex-col">
              <span className="font-display text-3xl font-bold tracking-tight text-ink">
                {IIM_SELECTIONS_2YR}
              </span>
              <span className="mt-1 text-sm font-medium text-body/80">IIM Selections (2 yrs)</span>
            </div>
            <div className="hidden h-10 w-px bg-black/[0.06] sm:block" />
            <div className="flex flex-col">
              <span className="font-display text-3xl font-bold tracking-tight text-ink">{CENTRES.length}</span>
              <span className="mt-1 text-sm font-medium text-body/80">Delhi-NCR Centres</span>
            </div>
          </div>
        </Reveal>

        {/* RIGHT SIDE */}
        <Reveal delay={120}>
          <div className="relative mx-auto mt-12 w-full max-w-[500px] lg:mt-0 lg:max-w-none">
            <div className="relative z-10 overflow-hidden rounded-3xl rounded-tl-[100px] lg:rounded-tl-[140px] shadow-2xl lg:h-[600px] h-[520px]">
              <img src={hero1} alt="Students preparing for CUET and IPMAT" className="h-full w-full object-cover object-top" />
            </div>

            {/* Why card */}
            <div className="absolute -left-2 sm:-left-8 lg:-left-16 -top-6 lg:top-16 z-20 flex w-[160px] lg:w-[280px] -rotate-3 flex-col rounded-xl bg-white p-3 lg:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 transition-transform duration-500 hover:-translate-y-2 hover:-rotate-1">
              <h3 className="flex items-center gap-1.5 lg:gap-2 text-ink leading-none">
                <span className="text-[28px] lg:text-[44px] text-gray-800 -rotate-2" style={{ fontFamily: "'Caveat', cursive" }}>Why</span>
                <span className="relative text-brand font-bold font-display text-[18px] lg:text-[28px] tracking-tight">
                  Us?
                  <svg className="absolute -bottom-1 left-0 w-full overflow-visible" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M2 10 Q 30 2 60 8 T 100 6" stroke="#DA202F" strokeWidth="3.5" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  </svg>
                </span>
              </h3>
              <ul className="mt-4 lg:mt-7 space-y-2 lg:space-y-4">
                {["Experienced Mentors", "CUET & IPMAT Focus", "Structured Courses", "Personalised Guidance", "4 Delhi-NCR Centres"].map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5 lg:gap-3.5 text-[10px] lg:text-sm font-semibold text-ink/80 leading-tight">
                    <CheckCircle2 className="h-3.5 w-3.5 lg:h-5 lg:w-5 text-[#DE2B3A] shrink-0" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 left-4 lg:left-auto lg:-bottom-6 lg:-right-6 z-30 flex items-center gap-2 lg:gap-4 rounded-[2.5rem] bg-white p-1.5 lg:p-2.5 pr-4 lg:pr-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] border border-gray-50 transition-transform duration-500 hover:-translate-y-2 hover:rotate-2">
              <div className="flex h-[36px] w-[36px] lg:h-[56px] lg:w-[56px] shrink-0 items-center justify-center rounded-full bg-[#DE2B3A] text-white shadow-inner">
                <Award className="h-5 w-5 lg:h-7 lg:w-7" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[10px] lg:text-[12px] text-slate-500 font-medium leading-tight">Your Dream College</div>
                <div className="font-display text-[11px] lg:text-[15px] font-bold text-ink leading-tight mt-0.5">Starts With the Right Prep</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bottom dark resource bar */}
      <div className="container-lpt relative z-30 mt-20">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-[#0F1015] px-8 py-6 text-white shadow-2xl">
          {[
            { name: "Free PYQ Pack", icon: FileText },
            { name: "Mock Test", icon: MonitorPlay },
            { name: "Strategy Webinar", icon: PlayCircle },
            { name: "Formula Sheet", icon: Library },
            { name: "Cut-off Tracker", icon: LineChart },
          ].map((item, i, arr) => (
            <div key={i} className="flex items-center gap-6">
              <Link to="/resources" className="flex items-center gap-3 text-sm font-medium transition-colors hover:text-brand-wash">
                <item.icon className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                {item.name}
              </Link>
              {i !== arr.length - 1 && <div className="h-8 w-px bg-white/10 hidden md:block" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
