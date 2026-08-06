import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function PromoModal({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen) return;
    const t = setTimeout(() => {
      setOpen(true);
      setSeen(true);
    }, 3500);
    return () => clearTimeout(t);
  }, [seen]);

  return (
    <Modal open={open} onClose={() => setOpen(false)} size="lg">
      <div className="flex flex-col sm:flex-row bg-white h-full min-h-[420px]">
        {/* Left Side: Solid Brand Color block with abstract typography/design */}
        <div className="relative flex flex-col justify-between bg-[#DA202F] p-8 sm:p-10 sm:w-[45%] text-white shrink-0 overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-black/30 to-transparent blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Limited Offer
            </div>
            <h2 className="mt-8 font-display text-[46px] font-bold leading-[1.05] tracking-tight text-white drop-shadow-sm">
              LPT <br/> Scholarship <br/> 2026
            </h2>
          </div>
          
          <div className="relative z-10 mt-12">
            <p className="text-[14px] font-medium text-white/90 leading-snug">
              Valid for CUET &amp; IPMAT <br/> Offline &amp; Online Batches
            </p>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col justify-center p-8 sm:p-10 sm:w-[55%] text-left bg-white">
          <h3 className="font-display text-[28px] font-bold leading-tight text-ink tracking-tight">
            Claim your scholarship seat
          </h3>
          <p className="mt-3 text-[14px] leading-relaxed text-body/80">
            Take the admission test for our upcoming batches. Your scholarship amount will be confirmed instantly during counselling.
          </p>
          
          <ul className="mt-6 space-y-3.5">
            {[
              "Up to 100% tuition fee waiver",
              "Detailed performance analysis",
              "Free 1-on-1 expert counselling"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-[13.5px] font-semibold text-ink/80">
                <CheckCircle2 className="h-4 w-4 text-[#DA202F]" strokeWidth={2.5} />
                {feature}
              </li>
            ))}
          </ul>
          
          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              onClick={() => {
                setOpen(false);
                onBook();
              }}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-4 text-[14px] font-bold text-white shadow-xl shadow-ink/10 transition-all hover:-translate-y-0.5 hover:bg-[#DA202F] hover:shadow-[0_10px_20px_rgba(218,32,47,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
            >
              Book a Free Slot
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-[12px] font-semibold text-body/50 transition-colors hover:text-ink underline underline-offset-4 decoration-transparent hover:decoration-ink/30 focus-visible:outline-none"
            >
              No thanks, I'll pay full price
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
