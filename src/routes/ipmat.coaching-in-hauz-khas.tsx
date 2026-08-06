import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const Route = createFileRoute("/ipmat/coaching-in-hauz-khas")({
  head: () =>
    pageHead({
      title: `IPMAT Coaching in Hauz Khas | ${BRAND_SHORT}`,
      description:
        "IPMAT coaching in Hauz Khas, South Delhi at LPT Delhi-NCR — IIM Indore & Rohtak focused, offline, online & hybrid batches. Book a free demo.",
      path: "/ipmat/coaching-in-hauz-khas",
    }),
  component: () => <LocalLanding vertical="IPMAT" area={getLandingArea("hauz-khas")!} />,
});
