import { useState } from "react";
import { Modal } from "./Modal";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export function EnquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [studentOf, setStudentOf] = useState("");

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="grid md:grid-cols-[1fr_1.3fr]">
        {/* Left visual */}
        <aside
          className="hidden p-8 text-white md:block"
          style={{ background: "linear-gradient(160deg, #DA202F 0%, #A8121F 100%)" }}
        >
          <div className="eyebrow text-[11px] text-white/80 before:bg-white/60">
            Free · 30 mins
          </div>
          <h3 className="mt-3 h-display text-2xl text-white">
            Talk to a CUET &amp; IPMAT mentor.
          </h3>
          <ul className="mt-6 space-y-3 text-sm text-white/85">
            <li>✓ Personalised study plan</li>
            <li>✓ Honest assessment of your timeline</li>
            <li>✓ Right course for your target</li>
            <li>✓ No sales pressure — promise.</li>
          </ul>
          <div className="mt-12 rounded-2xl bg-white/10 p-4 backdrop-blur">
            <div className="text-xs uppercase tracking-wider text-white/70">CUET &amp; IPMAT</div>
            <div className="mt-1 h-display text-2xl text-white">4 Delhi-NCR centres</div>
            <div className="text-xs text-white/80">Noida · Hauz Khas · GTB Nagar · Gurugram</div>
          </div>
        </aside>

        {/* Right form */}
        <div className="p-8">
          <div className="eyebrow text-[11px]">Book Free Counselling</div>
          <h3 className="mt-2 h-display text-2xl">Tell us about you</h3>

          {step === "form" ? (
            <form
              className="mt-6 grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setStep("otp");
                toast.success("OTP sent to your phone");
              }}
            >
              <input required placeholder="Full name" className="rounded-xl border border-hairline px-4 py-3 text-sm outline-none focus:border-brand" />
              <input required type="email" placeholder="Email" className="rounded-xl border border-hairline px-4 py-3 text-sm outline-none focus:border-brand" />
              <div className="flex items-center gap-2 rounded-xl border border-hairline px-3 focus-within:border-brand">
                <span className="border-r border-hairline pr-3 text-sm font-semibold text-ink">+91</span>
                <input required placeholder="Mobile number" inputMode="numeric" className="flex-1 bg-transparent py-3 text-sm outline-none" />
              </div>
              <input required placeholder="City" className="rounded-xl border border-hairline px-4 py-3 text-sm outline-none focus:border-brand" />
              <select
                required
                value={studentOf}
                onChange={(e) => setStudentOf(e.target.value)}
                className="rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
              >
                <option value="">Student of…</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
                <option value="ug">Undergraduate</option>
                <option value="grad">Graduate</option>
              </select>
              {studentOf === "11" || studentOf === "12" ? (
                <input placeholder="Stream (Science / Commerce / Arts)" className="rounded-xl border border-hairline px-4 py-3 text-sm outline-none focus:border-brand" />
              ) : studentOf === "ug" || studentOf === "grad" ? (
                <input placeholder="Qualification (e.g. B.Com, B.Tech)" className="rounded-xl border border-hairline px-4 py-3 text-sm outline-none focus:border-brand" />
              ) : null}
              <select required className="rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand">
                <option value="">State</option>
                <option>Rajasthan</option>
                <option>Delhi</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
                <option>Gujarat</option>
                <option>Other</option>
              </select>
              <button type="submit" className="btn-primary mt-2 w-full">
                Continue <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </button>
              <p className="text-center text-[11px] text-body">
                By continuing, you agree to our Terms &amp; Privacy.
              </p>
            </form>
          ) : (
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Booked! A mentor will call you within 30 minutes.");
                onClose();
                setStep("form");
              }}
            >
              <p className="text-sm text-body">Enter the 6-digit OTP we sent to your phone.</p>
              <div className="flex justify-center gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    maxLength={1}
                    inputMode="numeric"
                    className="h-12 w-10 rounded-xl border border-hairline text-center text-lg font-semibold outline-none focus:border-brand"
                  />
                ))}
              </div>
              <button type="submit" className="btn-primary w-full">
                Confirm Booking <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </button>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
}
