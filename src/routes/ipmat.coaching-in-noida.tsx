import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const Route = createFileRoute("/ipmat/coaching-in-noida")({
  head: () =>
    pageHead({
      title: `IPMAT Coaching in Noida | ${BRAND_SHORT}`,
      description:
        "IPMAT coaching in Noida (Sector 62) at LPT Delhi-NCR — IIM Indore & Rohtak focused, offline, online & hybrid batches. Book a free demo.",
      path: "/ipmat/coaching-in-noida",
    }),
  component: () => <LocalLanding vertical="IPMAT" area={getLandingArea("noida")!} />,
});
