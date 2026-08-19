import type { Metadata, Viewport } from "next";
import { type ReactNode } from "react";

import "@/styles.css";
import { BRAND, BRAND_SHORT, DOMAIN } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { SiteChrome } from "@/components/lpt/SiteChrome";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: `${BRAND} — CUET & IPMAT Coaching`,
  description: `${BRAND} (${BRAND_SHORT}) — CUET & IPMAT coaching across 4 Delhi-NCR centres: Noida, Hauz Khas, GTB Nagar and Gurugram. Offline, online and hybrid batches.`,
  authors: [{ name: BRAND }],
  openGraph: {
    siteName: BRAND,
    title: `${BRAND} — CUET & IPMAT Coaching`,
    description:
      "CUET & IPMAT coaching in Delhi-NCR. 4 centres across Noida, Hauz Khas, GTB Nagar and Gurugram.",
    type: "website",
    url: DOMAIN,
  },
  twitter: { card: "summary_large_image" },
  // Canonical is emitted per-page by the <Canonical> component (one self-
  // referencing canonical per page, SOP A1.2) — not here.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Caveat:wght@500;600;700&display=swap"
        />
      </head>
      <body>
        <Providers>
          {/* Global Organization JSON-LD (SOP A5.1) — present on every page, SSR'd. */}
          <JsonLd schema={organizationSchema()} />
          {/* Persistent chrome (nav, footer, modals) wraps every route. */}
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
