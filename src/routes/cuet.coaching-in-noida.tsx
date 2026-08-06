import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const Route = createFileRoute("/cuet/coaching-in-noida")({
  head: () =>
    pageHead({
      title: `CUET Coaching in Noida | ${BRAND_SHORT}`,
      description:
        "CUET coaching in Noida (Sector 62) at LPT Delhi-NCR — offline, online & hybrid batches. Book a free demo; fees confirmed during counselling.",
      path: "/cuet/coaching-in-noida",
    }),
  component: () => <LocalLanding vertical="CUET" area={getLandingArea("noida")!} />,
});
