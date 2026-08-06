import { Phone, Youtube, Send, Check, ArrowRight } from "lucide-react";
import { SectionHeader } from "./shared";
import { PHONE, SOCIAL, telLink, whatsappLink } from "@/config/site";
import phone from "@/assets/telegram-phone.png";

/**
 * Support / YouTube / Telegram. CUET + IPMAT only. Phone numbers come from
 * central config (placeholder shown as marked TBD, never a fabricated number).
 * Subscriber counts are unverified → marked placeholders.
 */
const desks = [
  { label: "CUET Support", hours: "Mon–Sat · 9 AM – 9 PM" },
  { label: "IPMAT Support", hours: "Mon–Sat · 9 AM – 9 PM" },
];

const channels = [
  { name: "CUET by LPT", track: "CUET" },
  { name: "IPMAT by LPT", track: "IPMAT" },
];

export function SupportYoutubeTelegram() {
  return (
    <>
      {/* Support desk */}
      <section id="support" className="bg-[#FDF6EC] py-12 md:py-16">
        <div className="container-lpt flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-sm shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Support Desk</div>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink md:text-[2.5rem]">Real Humans.<br />Real Fast.</h2>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-body">Dedicated lines for CUET and IPMAT. No bots, no IVR mazes.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
            {desks.map((d) => (
              <div key={d.label} className="block">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-body">
                  <Phone className="h-3 w-3 text-brand" strokeWidth={2.5} />
                  {d.label}
                </div>
                <div className="mt-2 font-display text-[1.5rem] font-bold tracking-tight text-ink">
                  <a href={telLink(PHONE)} className="hover:text-brand">{PHONE}</a>
                </div>
                <div className="mt-1.5 text-[11px] font-medium text-body/70">{d.hours}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube */}
      <section className="py-12 md:py-16">
        <div className="container-lpt">
          <SectionHeader
            eyebrow="YouTube"
            title={<>Free Classes on <span className="text-brand">YouTube</span></>}
            subtitle="CUET and IPMAT lectures, free on our YouTube channel."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
            {channels.map((c, i) => (
              <a key={c.name} href={SOCIAL.youtube} target="_blank" rel="noopener" className="group lift-card flex flex-col overflow-hidden rounded-[2rem] border border-hairline bg-white shadow-sm">
                <div className="relative aspect-video overflow-hidden bg-ink">
                  {i === 0 ? (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#DA202F]/60 via-ink to-ink" />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#FFEED7]/30 via-ink to-ink" />
                  )}
                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
                    <span className="font-display text-[10px] font-bold uppercase tracking-widest text-white/90">{c.track}</span>
                  </div>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                      <Youtube className="relative z-10 h-7 w-7 text-white drop-shadow-md" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                  <div>
                    <div className="font-display text-2xl font-bold text-ink">{c.name}</div>
                    <div className="mt-2 text-[0.85rem] font-medium text-body/80">Free {c.track} lectures &amp; strategy</div>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand/70">
                    Watch on YouTube <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Telegram */}
      <section className="bg-[#FDF6EC] py-12 md:py-16">
        <div className="container-lpt grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Telegram"
              title={<>Daily Tips, Mocks &amp; Updates on <span className="text-brand">Telegram</span></>}
              subtitle="Daily CUET & IPMAT strategy notes from our mentors. Channel links to be added before launch."
            />
            <ul className="mt-7 space-y-2.5">
              {["Daily PYQ + solution", "Free monthly mocks with ranking", "Mentor AMAs", "Exam pattern alerts"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-brand text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={whatsappLink("Hi LPT Delhi-NCR, share the CUET Telegram channel")} rel="nofollow" target="_blank" className="btn-primary">
                <Send className="h-4 w-4" strokeWidth={2} /> CUET Channel
              </a>
              <a href={whatsappLink("Hi LPT Delhi-NCR, share the IPMAT Telegram channel")} rel="nofollow" target="_blank" className="btn-secondary">
                <Send className="h-4 w-4" strokeWidth={2} /> IPMAT Channel
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 mx-auto h-[400px] w-[400px] rounded-full bg-white/60 blur-3xl" />
            <img src={phone} alt="Telegram on a phone" width={896} height={1024} loading="lazy" className="mx-auto h-[460px] lg:h-[580px] w-auto object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.2)]" />
          </div>
        </div>
      </section>
    </>
  );
}
