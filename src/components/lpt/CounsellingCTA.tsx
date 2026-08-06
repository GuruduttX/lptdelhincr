import { ArrowRight, PhoneCall } from "lucide-react";
import { Reveal } from "./Reveal";

export function CounsellingCTA({ onBook }: { onBook: () => void }) {
  return (
    <section className="py-12 md:py-16">
      <div className="container-lpt">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#DA202F] via-[#C2142A] to-[#A8121F] p-10 text-center text-white md:p-16">
            <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
                <PhoneCall className="h-3 w-3" strokeWidth={2.5} /> Free · No Obligation
              </span>
              <h2 className="mt-5 h-display text-3xl text-white sm:text-4xl md:text-5xl">
                Not sure where to start? Talk to a mentor — it's free.
              </h2>
              <p className="mt-5 text-white/85">
                30 minutes with an LPT mentor. A realistic plan for your timeline, your target, and your weak areas.
              </p>
              <button
                onClick={onBook}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.2)]"
              >
                Book a Free Call <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
