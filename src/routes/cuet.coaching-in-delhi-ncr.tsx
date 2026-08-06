import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const Route = createFileRoute("/cuet/coaching-in-delhi-ncr")({
  head: () =>
    pageHead({
      title: `CUET Coaching in Delhi-NCR | ${BRAND_SHORT}`,
      description:
        "CUET coaching across Delhi-NCR at LPT Delhi-NCR — 4 centres in Noida, Hauz Khas, GTB Nagar & Gurugram. Offline, online & hybrid batches. Book a free demo.",
      path: "/cuet/coaching-in-delhi-ncr",
    }),
  component: () => <LocalLanding vertical="CUET" area={getLandingArea("delhi-ncr")!} />,
});
