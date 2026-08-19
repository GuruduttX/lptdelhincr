import type { Metadata } from "next";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const metadata: Metadata = pageHead({
  title: `CUET Coaching in Gurugram | ${BRAND_SHORT}`,
  description:
    "CUET coaching in Gurugram (Sector 14) at LPT Delhi-NCR — offline, online & hybrid batches. Book a free demo; fees confirmed during counselling.",
  path: "/cuet/coaching-in-gurugram",
});

export default function Page() {
  return <LocalLanding vertical="CUET" area={getLandingArea("gurugram")!} />;
}
