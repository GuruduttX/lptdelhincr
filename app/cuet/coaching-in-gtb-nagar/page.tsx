import type { Metadata } from "next";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const metadata: Metadata = pageHead({
  title: `CUET Coaching in GTB Nagar | ${BRAND_SHORT}`,
  description:
    "CUET coaching in GTB Nagar, North Campus at LPT Delhi-NCR — offline, online & hybrid batches. Book a free demo; fees confirmed during counselling.",
  path: "/cuet/coaching-in-gtb-nagar",
});

export default function Page() {
  return <LocalLanding vertical="CUET" area={getLandingArea("gtb-nagar")!} />;
}
