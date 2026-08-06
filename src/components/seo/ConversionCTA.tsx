import { MessageCircle, Phone } from "lucide-react";
import {
  BRAND_SHORT,
  CENTRES,
  FOUNDED_YEAR,
  GST,
  PHONE,
  REAL_RESULTS,
  isPlaceholder,
  telLink,
  whatsappLink,
} from "@/config/site";

/**
 * ConversionCTA (SOP A4.6) — WhatsApp-first (Indian edu leads convert on
 * WhatsApp, not email forms) + call. Trust list shows REAL, verified values
 * ONLY — any unset placeholder token is omitted (never shown as fact).
 */
export function ConversionCTA({
  heading,
  message,
  centrePhone,
}: {
  heading?: string;
  /** Prefilled WhatsApp message. */
  message?: string;
  /** Optional centre-specific phone for the call link. */
  centrePhone?: string;
}) {
  const phone = centrePhone && !isPlaceholder(centrePhone) ? centrePhone : PHONE;
  const trust: string[] = [];
  if (!isPlaceholder(FOUNDED_YEAR)) trust.push(`Since ${FOUNDED_YEAR}`);
  if (!isPlaceholder(REAL_RESULTS)) trust.push(REAL_RESULTS);
  trust.push(`${CENTRES.length} Delhi-NCR centres`);
  if (!isPlaceholder(GST)) trust.push(`GST ${GST}`);

  return (
    <aside className="cta overflow-hidden rounded-3xl bg-[#0F1015] p-8 text-white md:p-10">
      <h2 className="h-display text-2xl text-white sm:text-3xl">
        {heading ?? `Talk to ${BRAND_SHORT} about CUET & IPMAT coaching`}
      </h2>
      <p className="mt-3 text-white/70">
        Book a free demo / counselling — we reply fastest on WhatsApp.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          className="btn-primary"
          href={whatsappLink(message ?? `Hi ${BRAND_SHORT}, I want CUET/IPMAT batch details`)}
          rel="nofollow"
          target="_blank"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2} /> Chat on WhatsApp
        </a>
        <a
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          href={telLink(phone)}
        >
          <Phone className="h-4 w-4" strokeWidth={2} />
          {isPlaceholder(phone) ? "Call us" : `Call ${phone}`}
        </a>
      </div>
      {trust.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
          {trust.map((t) => (
            <li key={t}>· {t}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}
