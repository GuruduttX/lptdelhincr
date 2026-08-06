import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const Route = createFileRoute("/ipmat/coaching-in-delhi-ncr")({
  head: () =>
    pageHead({
      title: `IPMAT Coaching in Delhi-NCR | ${BRAND_SHORT}`,
      description:
        "IPMAT coaching across Delhi-NCR at LPT Delhi-NCR — 4 centres in Noida, Hauz Khas, GTB Nagar & Gurugram. IIM Indore & Rohtak focused. Book a free demo.",
      path: "/ipmat/coaching-in-delhi-ncr",
    }),
  component: () => <LocalLanding vertical="IPMAT" area={getLandingArea("delhi-ncr")!} />,
});
