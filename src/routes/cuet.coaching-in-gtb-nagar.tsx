import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const Route = createFileRoute("/cuet/coaching-in-gtb-nagar")({
  head: () =>
    pageHead({
      title: `CUET Coaching in GTB Nagar | ${BRAND_SHORT}`,
      description:
        "CUET coaching in GTB Nagar, North Campus at LPT Delhi-NCR — offline, online & hybrid batches. Book a free demo; fees confirmed during counselling.",
      path: "/cuet/coaching-in-gtb-nagar",
    }),
  component: () => <LocalLanding vertical="CUET" area={getLandingArea("gtb-nagar")!} />,
});
