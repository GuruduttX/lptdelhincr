import { FileText, ChevronRight, BookOpen, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./shared";

// CUET + IPMAT only. Counts are qualitative (no fabricated test counts).
// Each item links to the most relevant existing page (no dead "#" links).
const tests = [
  { name: "CUET UG Mock Series", count: "Full-length mocks", href: "/courses/cuet" },
  { name: "IPMAT Indore Mock Series", count: "Full-length mocks", href: "/ipmat/exam" },
  { name: "IPMAT Rohtak Mock Series", count: "Full-length mocks", href: "/ipmat/exam" },
  { name: "JIPMAT Mock Series", count: "Full-length mocks", href: "/courses/ipmat" },
  { name: "CUET Sectional Tests", count: "Topic-wise drills", href: "/cuet/syllabus" },
  { name: "IPMAT Sectional Tests", count: "Topic-wise drills", href: "/ipmat/syllabus" },
];

const material = [
  { name: "IPMAT Study Material", desc: "Concept book · Practice set · PYQ", href: "/ipmat/books-mocks" },
  { name: "CUET UG Study Material", desc: "Domain · General · Language", href: "/cuet/syllabus" },
  { name: "IPMAT QA & Verbal Modules", desc: "Complete theory + PYQs", href: "/ipmat/syllabus" },
];

export function MockAndMaterial() {
  return (
    <>
      <section className="bg-[#FDF6EC] py-12 md:py-16">
        <div className="container-lpt grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeader
            align="left"
            eyebrow="Mock Tests"
            title={<>Practice Like the Real <span className="text-brand">Exam Day</span></>}
            subtitle="Proctored, AI-analyzed, and benchmarked against real toppers. Every mock builds the muscle for D-Day."
          />
          <Reveal>
            <ul className="grid gap-4 sm:grid-cols-2 auto-rows-fr">
              {tests.map((t) => (
                <li key={t.name}>
                  <a
                    href={t.href}
                    className="group relative flex h-full items-center justify-between gap-4 overflow-hidden rounded-2xl border border-hairline bg-white p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-brand/30 hover:shadow-[0_8px_30px_rgba(218,32,47,0.06)] hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F5] to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand/10 group-hover:text-brand shadow-sm">
                        <FileText className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <div>
                        <div className="font-bold text-ink leading-snug transition-colors group-hover:text-brand">{t.name}</div>
                        <div className="text-[0.8rem] font-semibold text-brand/80 mt-1 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                          {t.count}
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      <ChevronRight className="h-5 w-5 text-brand" strokeWidth={2.5} />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-lpt grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal className="h-full order-2 lg:order-1 mt-6 lg:mt-0">
            <div className="relative h-full min-h-[480px] overflow-hidden rounded-[28px] bg-[#FFEED7] flex flex-col">
              {/* Very subtle dot grid, no glowing blobs */}
              <div
                className="absolute inset-0 opacity-[0.2]"
                style={{
                  backgroundImage: "radial-gradient(circle, #DA202F 1.5px, transparent 1.5px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Realistic Books Composition */}
              <div className="absolute inset-0 flex items-center justify-center pb-32">
                <div className="relative h-[260px] w-[200px] rotate-12 transition-transform duration-700 hover:rotate-6 hover:scale-105 drop-shadow-2xl">
                  
                  {/* Book 3 (Bottom) */}
                  <div className="absolute left-4 top-4 h-full w-full rounded-r-xl rounded-l-sm bg-[#F8F9FA] border border-black/10 ring-1 ring-black/5">
                    <div className="absolute -right-1.5 top-1 bottom-1 w-1.5 bg-gradient-to-r from-gray-200 to-white border-y border-r border-black/10 rounded-r" />
                    <div className="absolute left-0 top-0 h-full w-5 bg-gradient-to-r from-slate-300 via-slate-100 to-[#F8F9FA] border-r border-black/5" />
                  </div>

                  {/* Book 2 (Middle) */}
                  <div className="absolute left-2 top-2 h-full w-full rounded-r-xl rounded-l-sm bg-white shadow-xl border border-black/10 ring-1 ring-black/5">
                    <div className="absolute -right-1.5 top-1 bottom-1 w-1.5 bg-gradient-to-r from-gray-100 to-white border-y border-r border-black/10 rounded-r" />
                    <div className="absolute left-0 top-0 h-full w-5 bg-gradient-to-r from-[#FFD7CC] via-white to-white border-r border-[#FFD7CC]/50" />
                  </div>

                  {/* Book 1 (Top) */}
                  <div className="absolute left-0 top-0 h-full w-full rounded-r-xl rounded-l-sm shadow-[0_20px_40px_rgba(168,18,31,0.4)] border border-white/20 ring-1 ring-black/20">
                    
                    {/* Ribbon Bookmark */}
                    <div className="absolute -bottom-6 right-8 h-12 w-4 bg-gradient-to-b from-[#F59E0B] to-[#D97706] shadow-sm z-0" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }} />

                    {/* Cover Content */}
                    <div className="absolute inset-0 rounded-r-xl rounded-l-sm bg-brand overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40 pointer-events-none" />
                      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
                      <div className="absolute -right-1 top-1 bottom-1 w-1.5 bg-white border-y border-r border-black/20 rounded-r shadow-inner z-0" />
                      
                      <div className="absolute left-0 top-0 h-full w-7 bg-gradient-to-r from-black/60 via-black/10 to-transparent border-r border-white/10 z-10 pointer-events-none" />
                      <div className="absolute left-1.5 top-0 h-full w-0.5 bg-white/30 z-10 pointer-events-none" />
                      <div className="absolute left-6 top-0 h-full w-px bg-black/10 z-10 pointer-events-none" />

                      <div className="relative z-20 flex h-full flex-col pl-11 pr-6 pt-8 pb-7">
                        
                        {/* Reverted Logo with clean white box */}
                        <div className="flex w-[4.5rem] shrink-0 items-center justify-center rounded bg-white py-2 px-2.5 shadow-md border border-white/20">
                          <img src="/logo.svg" alt="LPT" className="w-full h-auto object-contain" />
                        </div>
                        
                        <div className="mt-auto">
                          <div className="inline-flex items-center rounded-sm border border-white/20 bg-white/10 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-sm">
                            VOL. 01
                          </div>
                          <div className="mt-4 text-[1.35rem] font-black text-white leading-tight tracking-tight drop-shadow-md">
                            Quantitative Aptitude
                          </div>
                          <div className="mt-3 h-[2px] w-12 bg-gradient-to-r from-white/60 to-transparent" />
                          <div className="mt-3 text-[9px] font-bold uppercase tracking-widest text-white/90 drop-shadow-sm">
                            Complete Theory & PYQs
                          </div>
                        </div>
                        
                        <div className="absolute right-0 top-12 h-32 w-32 translate-x-1/3 rounded-full border-[10px] border-white/10 mix-blend-overlay pointer-events-none" />
                        <div className="absolute right-0 bottom-12 h-20 w-20 translate-x-1/2 rounded-full border-[6px] border-white/10 mix-blend-overlay pointer-events-none" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Info Card */}
              <div className="absolute bottom-6 left-6 right-6 z-30 rounded-2xl bg-white p-5 shadow-[0_8px_16px_rgba(0,0,0,0.04),0_24px_48px_rgba(0,0,0,0.06)] border border-hairline">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10">
                    <BookOpen className="h-3 w-3 text-brand" strokeWidth={2.5} />
                  </span>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-ink">Crafted in-house</div>
                </div>
                <p className="mt-3 text-sm font-medium text-body leading-relaxed">
                  Every page rewritten yearly. Updated to the latest pattern. No photocopied scans.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeader
              align="left"
              eyebrow="Study Material"
              title={<>Books Built by the People Who <span className="text-brand">Set the Bar</span></>}
              subtitle="Authored by senior mentors with deep CUET & IPMAT experience — not freelancers."
            />
            <ul className="mt-8 space-y-4">
              {material.map((m) => (
                <li key={m.name}>
                  <a
                    href={m.href}
                    className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-hairline bg-white p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand/30 hover:shadow-[0_8px_30px_rgba(218,32,47,0.08)] hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F5] to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FDF6EC] text-brand transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white shadow-sm">
                        <BookOpen className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <div>
                        <div className="text-[1.05rem] font-bold text-ink leading-tight transition-colors group-hover:text-brand">
                          {m.name}
                        </div>
                        <div className="text-[0.8rem] font-medium text-body mt-1">{m.desc}</div>
                      </div>
                    </div>
                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-white text-body transition-all duration-300 group-hover:border-brand/30 group-hover:bg-brand/5 group-hover:text-brand shadow-sm">
                      <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
