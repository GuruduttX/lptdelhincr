import type { Metadata } from "next";
import { pageHead } from "@/lib/head";
import { BRAND } from "@/config/site";
import Content from "./content";

export const metadata: Metadata = pageHead({
  title: `Contact ${BRAND}`,
  description:
    "Contact LPT Delhi-NCR for CUET & IPMAT coaching — 4 centres in Noida, Hauz Khas, GTB Nagar & Gurugram. WhatsApp, call or visit.",
  path: "/contact",
});

export default function Page() {
  return <Content />;
}
