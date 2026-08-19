import type { Metadata } from "next";
import { BRAND, DOMAIN } from "@/config/site";
import Content from "./content";

export const metadata: Metadata = {
  title: `${BRAND} — CUET & IPMAT Coaching`,
  description:
    "CUET & IPMAT coaching in Delhi-NCR across 4 centres — Noida, Hauz Khas, GTB Nagar and Gurugram. Offline, online and hybrid batches. Book a free demo.",
  openGraph: {
    siteName: BRAND,
    title: `${BRAND} — CUET & IPMAT Coaching`,
    // og:description / og:type carry over from the root layout, as before.
    description:
      "CUET & IPMAT coaching in Delhi-NCR. 4 centres across Noida, Hauz Khas, GTB Nagar and Gurugram.",
    type: "website",
    url: DOMAIN,
  },
};

export default function Page() {
  return <Content />;
}
