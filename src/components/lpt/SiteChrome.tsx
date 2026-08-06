import { createContext, useContext, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileCTA } from "./MobileCTA";
import { SignInModal } from "./SignInModal";
import { EnquiryModal } from "./EnquiryModal";
import { PromoModal } from "./PromoModal";
import { Toaster } from "@/components/ui/sonner";

/**
 * Booking context — lets any route open the enquiry / sign-in modals without
 * threading props through every page. CTAs sitewide call openEnquiry().
 */
interface BookingCtx {
  openEnquiry: () => void;
  openSignIn: () => void;
}
const BookingContext = createContext<BookingCtx | null>(null);

export function useBooking(): BookingCtx {
  const ctx = useContext(BookingContext);
  if (!ctx) return { openEnquiry: () => {}, openSignIn: () => {} };
  return ctx;
}

/**
 * SiteChrome — the persistent shell (nav + footer + modals + toaster) wrapped
 * around every route via __root. Navbar overlays the hero only on the home
 * route ("/"); on interior pages it's a normal sticky bar so content isn't
 * hidden behind it.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const [signIn, setSignIn] = useState(false);
  const [enquiry, setEnquiry] = useState(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  const openEnquiry = () => setEnquiry(true);
  const openSignIn = () => setSignIn(true);

  return (
    <BookingContext.Provider value={{ openEnquiry, openSignIn }}>
      <Navbar overlay={isHome} onBook={openEnquiry} onSignIn={openSignIn} />
      <main className="pb-20 lg:pb-0">{children}</main>
      <Footer />
      <MobileCTA onBook={openEnquiry} />

      <SignInModal open={signIn} onClose={() => setSignIn(false)} />
      <EnquiryModal open={enquiry} onClose={() => setEnquiry(false)} />
      <PromoModal onBook={openEnquiry} />
      <Toaster position="top-center" />
    </BookingContext.Provider>
  );
}
