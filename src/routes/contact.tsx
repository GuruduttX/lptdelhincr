import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { MapPin, MessageCircle, Phone, Mail } from "lucide-react";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { localBusinessSchema } from "@/lib/schema";
import {
  BRAND,
  CENTRES,
  EMAIL,
  PHONE,
  isPlaceholder,
  telLink,
  whatsappLink,
} from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: `Contact ${BRAND}`,
      description: "Contact LPT Delhi-NCR for CUET & IPMAT coaching — 4 centres in Noida, Hauz Khas, GTB Nagar & Gurugram. WhatsApp, call or visit.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  const phoneKnown = !isPlaceholder(PHONE);
  const [sent, setSent] = useState(false);

  return (
    <ContentPage
      canonicalPath="/contact"
      crumbs={[{ name: "Home", item: "/" }, { name: "Contact" }]}
      title="Contact Us"
      intro={
        <>
          Reach {BRAND} for CUET and IPMAT coaching across our 4 Delhi-NCR centres. We respond fastest
          on WhatsApp — or call, email, or visit the centre nearest you.
        </>
      }
      toc={[
        { id: "reach", label: "Get in touch" },
        { id: "centres", label: "Our centres" },
      ]}
      schema={[...CENTRES.map((c) => localBusinessSchema(c))]}
    >
      <Section id="reach" heading="Get in touch">
        <div className="flex flex-wrap gap-3">
          <a href={whatsappLink(`Hi ${BRAND}, I have a question about CUET/IPMAT coaching`)} target="_blank" rel="nofollow" className="btn-primary">
            <MessageCircle className="h-4 w-4" strokeWidth={2} /> Chat on WhatsApp
          </a>
          {phoneKnown && (
            <a href={telLink(PHONE)} className="btn-secondary">
              <Phone className="h-4 w-4" strokeWidth={2} /> Call {PHONE}
            </a>
          )}
          <a href={`mailto:${EMAIL}`} className="btn-secondary">
            <Mail className="h-4 w-4" strokeWidth={2} /> {EMAIL}
          </a>
        </div>

        {/* ≤5-field enquiry form (SOP A4.6). No backend yet — submits to WhatsApp. */}
        <form
          className="mt-6 grid max-w-md gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const name = String(data.get("name") ?? "");
            const exam = String(data.get("exam") ?? "");
            const msg = `Hi ${BRAND}, I'm ${name}. I'm interested in ${exam} coaching.`;
            setSent(true);
            toast.success("Opening WhatsApp…");
            const link = whatsappLink(msg);
            if (!link.startsWith("{{")) window.open(link, "_blank");
          }}
        >
          <input required name="name" placeholder="Full name" className="rounded-xl border border-hairline px-4 py-3 text-sm outline-none focus:border-brand" />
          <input required name="phone" inputMode="numeric" placeholder="Mobile number" className="rounded-xl border border-hairline px-4 py-3 text-sm outline-none focus:border-brand" />
          <input name="city" placeholder="City" className="rounded-xl border border-hairline px-4 py-3 text-sm outline-none focus:border-brand" />
          <select name="exam" required className="rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand">
            <option value="">Interested in…</option>
            <option value="CUET">CUET</option>
            <option value="IPMAT">IPMAT</option>
          </select>
          <button type="submit" className="btn-primary w-full">Send via WhatsApp</button>
          {sent && <p className="text-xs text-body">If WhatsApp didn't open, message us at the number above.</p>}
        </form>
      </Section>

      <Section id="centres" heading="Our centres">
        <div className="grid gap-4 sm:grid-cols-2">
          {CENTRES.map((c) => (
            <div key={c.slug} className="rounded-2xl border border-hairline bg-white p-5">
              <div className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <MapPin className="h-4 w-4 text-brand" strokeWidth={2} />
                {c.area}
              </div>
              <address className="mt-2 not-italic text-sm leading-relaxed text-body">{c.fullAddress}</address>
              <p className="mt-1 text-xs text-body/70">Landmark: {c.landmark}</p>
            </div>
          ))}
        </div>
      </Section>
    </ContentPage>
  );
}
