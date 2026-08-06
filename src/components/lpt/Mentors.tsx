import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { SectionHeader } from "./shared";
import { FACULTY } from "@/data/faculty";

/**
 * Mentors — real faculty carousel (E-E-A-T), driven by the verified faculty
 * dataset. Photos aren't supplied yet, so we show honest initials avatars (no
 * stock/fabricated faces) alongside real name, subject and experience.
 */
const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export function Mentors() {
  const [start, setStart] = useState(0);
  const visible = 4;
  const max = Math.max(0, FACULTY.length - visible);

  return (
    <section className="bg-[#FDF6EC] py-12 md:py-16">
      <div className="container-lpt">
        <SectionHeader
          align="left"
          eyebrow="Faculty"
          title={<>Learn from <span className="text-brand">The Best</span></>}
          subtitle="Senior CUET & IPMAT mentors with an average of 10+ years' teaching experience."
          action={
            <div className="flex gap-2">
              <button onClick={() => setStart(Math.max(0, start - 1))} disabled={start === 0} className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-white text-ink transition-all hover:border-brand hover:text-brand disabled:opacity-40" aria-label="Previous">
                <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              </button>
              <button onClick={() => setStart(Math.min(max, start + 1))} disabled={start === max} className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white transition-all hover:bg-brand-dark disabled:opacity-40" aria-label="Next">
                <ChevronRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          }
        />

        <div className="mt-12 overflow-hidden">
          <div
            className="flex items-stretch gap-6 transition-transform duration-500"
            style={{ transform: `translateX(calc(-${start} * (100% / ${visible} + 24px / ${visible})))` }}
          >
            {FACULTY.map((f) => (
              <article key={f.slug} className="group relative flex w-full shrink-0 md:w-[calc(25%-18px)] flex-col overflow-hidden rounded-[24px] border border-black/[0.04] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:border-black/[0.08]">
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
                    <User className="h-20 w-20 text-gray-300" strokeWidth={1.5} />
                  </div>
                  <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm backdrop-blur-md">
                    {f.experienceYears} Yrs Exp
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-[20px] font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-[#DA202F]">
                      <Link to="/faculty/$slug" params={{ slug: f.slug }} className="before:absolute before:inset-0">
                        {f.name}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-body/80 line-clamp-2">
                      {f.subject}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link to="/faculty" className="text-sm font-semibold text-brand hover:underline">
            Meet our faculty →
          </Link>
        </div>
      </div>
    </section>
  );
}
