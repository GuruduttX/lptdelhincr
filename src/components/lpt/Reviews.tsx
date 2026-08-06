import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "./shared";
import { TESTIMONIALS } from "@/data/results";

/**
 * Reviews — genuine, attributable student testimonials (LPT IPMAT results).
 * Single-quote carousel; no fabricated reviews (SOP A5.3 honor rule).
 */
const initials = (name: string) =>
  name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

export function Reviews() {
  const [i, setI] = useState(0);
  const r = TESTIMONIALS[i];
  const prev = () => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setI((i + 1) % TESTIMONIALS.length);

  return (
    <section className="py-12 md:py-16">
      <div className="container-lpt grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
        <SectionHeader
          align="left"
          eyebrow="Reviews"
          title={<>What Students Actually <span className="text-brand">Say</span></>}
          subtitle="Genuine, attributable reviews from students now studying at the IIMs."
        />

        <div className="relative">
          <div className="lift-card relative overflow-hidden rounded-3xl border border-hairline bg-white p-8 md:p-10">
            <span aria-hidden className="block text-brand/20 mb-2" style={{ fontSize: "4.5rem", fontFamily: "Georgia, serif", lineHeight: 0.8 }}>
              "
            </span>
            <p className="h-display text-xl leading-[1.5] text-ink md:text-2xl">{r.quote}</p>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full text-lg font-bold text-brand shrink-0" style={{ background: "#FFEED7" }}>
                  {initials(r.name)}
                </div>
                <div>
                  <div className="font-semibold text-ink">{r.name}</div>
                  <div className="text-xs text-body">{r.institute}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={prev} className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white text-ink transition-all hover:border-brand hover:text-brand" aria-label="Previous review">
                  <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                </button>
                <button onClick={next} className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white transition-all hover:bg-brand-dark" aria-label="Next review">
                  <ChevronRight className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
