import { Quote } from "lucide-react";
import { SectionHeader } from "./shared";
import { TESTIMONIALS } from "@/data/results";

/**
 * Testimonials — real, named student stories (LPT IPMAT results). CUET + IPMAT
 * only; no fabricated names or stock video. Rendered as an auto-scrolling
 * marquee of quote cards (duplicated for a seamless loop).
 */
const colors = ["#FFE9D2", "#FFD7CC", "#FFEED7", "#FCE3DA"];

export function VideoTestimonials() {
  return (
    <section className="bg-[#FDF6EC] py-12 md:py-16">
      <div className="container-lpt">
        <SectionHeader
          eyebrow="Student Stories"
          title={<>Why They Chose <span className="text-brand">LPT</span>?</>}
          subtitle="Real, named students now studying at the IIMs — in their own words."
        />
      </div>

      <div className="mt-12 overflow-hidden">
        <div className="marquee-track px-6">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <figure
              key={i}
              className="group relative flex w-[350px] shrink-0 flex-col overflow-hidden rounded-[28px] border border-black/[0.04] bg-white p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:border-black/[0.08]"
            >
              <div>
                <span
                  className="grid h-12 w-12 place-items-center rounded-full text-[#DA202F] shadow-sm"
                  style={{ background: colors[i % colors.length] }}
                >
                  <Quote className="h-5 w-5 fill-current" strokeWidth={0} />
                </span>
                <blockquote className="mt-6 text-[15px] leading-relaxed text-body/90">
                  "{t.quote}"
                </blockquote>
              </div>
              <figcaption className="mt-8 border-t border-black/5 pt-5 flex-1 flex flex-col justify-end">
                <div className="font-display text-[17px] font-bold text-ink">{t.name}</div>
                <div className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-[#DA202F]">{t.institute}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
