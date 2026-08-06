import { Phone, HeadphonesIcon } from "lucide-react";
import { PHONE, isPlaceholder, telLink } from "@/config/site";

/**
 * Top utility strip. CUET + IPMAT only. Phone is driven from central config;
 * if it's still a placeholder we show a neutral "Helpdesk" link instead of a
 * fabricated number (SOP: never present a placeholder as fact).
 */
export function UtilityBar() {
  const phoneKnown = !isPlaceholder(PHONE);
  return (
    <div className="hidden border-b border-white/5 bg-[#0F1015] text-[12px] lg:block">
      <div className="container-lpt flex h-10 items-center justify-between">
        <div className="flex items-center gap-2 font-medium text-white/90 tracking-wide">
          <span className="flex h-5 items-center justify-center rounded bg-[#DA202F] px-1.5 text-[9px] font-bold uppercase text-white">
            New
          </span>
          <span>
            CUET &amp; IPMAT batches across 4 Delhi-NCR centres.{" "}
            <a href="/courses/cuet" className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              Explore batches
            </a>
          </span>
        </div>
        <div className="flex items-center gap-6 text-white/50 font-medium">
          {phoneKnown ? (
            <a href={telLink(PHONE)} className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3 w-3 text-[#DA202F]" strokeWidth={2.5} />
              <span className="font-bold text-white/80">Call:</span> {PHONE}
            </a>
          ) : null}
          <a href="/contact" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
            <HeadphonesIcon className="h-3 w-3 text-[#DA202F]" strokeWidth={2.5} />
            Helpdesk
          </a>
        </div>
      </div>
    </div>
  );
}
