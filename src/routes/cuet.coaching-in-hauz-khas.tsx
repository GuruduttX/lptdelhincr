import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { LocalLanding, getLandingArea } from "@/components/lpt/LocalLanding";
import { BRAND_SHORT } from "@/config/site";

export const Route = createFileRoute("/cuet/coaching-in-hauz-khas")({
  head: () =>
    pageHead({
      title: `CUET Coaching in Hauz Khas | ${BRAND_SHORT}`,
      description:
        "CUET coaching in Hauz Khas, South Delhi at LPT Delhi-NCR — offline, online & hybrid batches. Book a free demo; fees confirmed during counselling.",
      path: "/cuet/coaching-in-hauz-khas",
    }),
  component: () => <LocalLanding vertical="CUET" area={getLandingArea("hauz-khas")!} />,
});
