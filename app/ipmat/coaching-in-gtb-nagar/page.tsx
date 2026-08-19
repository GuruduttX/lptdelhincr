import type { Metadata } from "next";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const metadata: Metadata = pageHead({
  title: `IPMAT Coaching in GTB Nagar | ${BRAND_SHORT}`,
  description:
    "IPMAT coaching in GTB Nagar, North Campus at LPT Delhi-NCR — IIM Indore & Rohtak focused, offline, online & hybrid batches. Book a free demo.",
  path: "/ipmat/coaching-in-gtb-nagar",
});

export default function Page() {
  return <LocalLanding vertical="IPMAT" area={getLandingArea("gtb-nagar")!} />;
}
