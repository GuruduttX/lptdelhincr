import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const Route = createFileRoute("/cuet/coaching-in-gurugram")({
  head: () =>
    pageHead({
      title: `CUET Coaching in Gurugram | ${BRAND_SHORT}`,
      description:
        "CUET coaching in Gurugram (Sector 14) at LPT Delhi-NCR — offline, online & hybrid batches. Book a free demo; fees confirmed during counselling.",
      path: "/cuet/coaching-in-gurugram",
    }),
  component: () => <LocalLanding vertical="CUET" area={getLandingArea("gurugram")!} />,
});
