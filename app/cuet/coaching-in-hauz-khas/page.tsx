import type { Metadata } from "next";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const metadata: Metadata = pageHead({
  title: `CUET Coaching in Hauz Khas | ${BRAND_SHORT}`,
  description:
    "CUET coaching in Hauz Khas, South Delhi at LPT Delhi-NCR — offline, online & hybrid batches. Book a free demo; fees confirmed during counselling.",
  path: "/cuet/coaching-in-hauz-khas",
});

export default function Page() {
  return <LocalLanding vertical="CUET" area={getLandingArea("hauz-khas")!} />;
}
