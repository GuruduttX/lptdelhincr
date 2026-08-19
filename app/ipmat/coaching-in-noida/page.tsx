import type { Metadata } from "next";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const metadata: Metadata = pageHead({
  title: `IPMAT Coaching in Noida | ${BRAND_SHORT}`,
  description:
    "IPMAT coaching in Noida (Sector 62) at LPT Delhi-NCR — IIM Indore & Rohtak focused, offline, online & hybrid batches. Book a free demo.",
  path: "/ipmat/coaching-in-noida",
});

export default function Page() {
  return <LocalLanding vertical="IPMAT" area={getLandingArea("noida")!} />;
}
