import { useState } from "react";
import { Modal } from "./Modal";
import { toast } from "sonner";
import { ArrowRight, Phone, Shield } from "lucide-react";

export function SignInModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="p-8">
        <div className="eyebrow text-[11px]">Welcome back</div>
        <h3 className="mt-2 h-display text-2xl">Sign in to LPT</h3>
        <p className="mt-2 text-sm text-body">
          {step === "phone" ? "We'll send a 6-digit OTP to your phone." : `OTP sent to +91 ${phone}.`}
        </p>

        {step === "phone" ? (
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (phone.length !== 10) return toast.error("Enter a valid 10-digit number");
              setStep("otp");
              toast.success("OTP sent");
            }}
          >
            <div className="flex items-center gap-2 rounded-2xl border border-hairline bg-white px-4 py-3 focus-within:border-brand">
              <span className="flex items-center gap-2 border-r border-hairline pr-3 text-sm font-semibold text-ink">
                <Phone className="h-4 w-4 text-brand" strokeWidth={2} /> +91
              </span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="98765 43210"
                className="flex-1 bg-transparent text-base text-ink outline-none placeholder:text-body/60"
                inputMode="numeric"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Send OTP <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </form>
        ) : (
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Signed in successfully");
              onClose();
              setStep("phone");
              setPhone("");
            }}
          >
            <div className="flex justify-center gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  maxLength={1}
                  inputMode="numeric"
                  className="h-12 w-10 rounded-xl border border-hairline text-center text-lg font-semibold text-ink outline-none focus:border-brand"
                />
              ))}
            </div>
            <button type="submit" className="btn-primary w-full">
              Verify &amp; Continue <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="block w-full text-center text-xs text-body hover:text-brand"
            >
              Change number
            </button>
          </form>
        )}

        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-body">
          <Shield className="h-3 w-3" strokeWidth={2} /> Your number is never shared.
        </div>
      </div>
    </Modal>
  );
}
