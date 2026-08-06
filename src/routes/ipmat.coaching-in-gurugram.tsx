import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const Route = createFileRoute("/ipmat/coaching-in-gurugram")({
  head: () =>
    pageHead({
      title: `IPMAT Coaching in Gurugram | ${BRAND_SHORT}`,
      description:
        "IPMAT coaching in Gurugram (Sector 14) at LPT Delhi-NCR — IIM Indore & Rohtak focused, offline, online & hybrid batches. Book a free demo.",
      path: "/ipmat/coaching-in-gurugram",
    }),
  component: () => <LocalLanding vertical="IPMAT" area={getLandingArea("gurugram")!} />,
});
