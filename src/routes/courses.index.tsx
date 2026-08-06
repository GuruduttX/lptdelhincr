import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { itemListSchema } from "@/lib/schema";
import { BRAND, getCluster } from "@/config/site";

export const Route = createFileRoute("/courses/")({
  head: () =>
    pageHead({
      title: `CUET & IPMAT Courses — ${BRAND}`,
      description: "CUET and IPMAT coaching batches at LPT Delhi-NCR — offline, online and hybrid. See tracks and book a free demo.",
      path: "/courses",
    }),
  component: Courses,
});

function Courses() {
  const cuet = getCluster("/courses/cuet");
  const ipmat = getCluster("/courses/ipmat");
  return (
    <HubPage
      canonicalPath="/courses"
      crumbs={[{ name: "Home", item: "/" }, { name: "Courses" }]}
      title="CUET & IPMAT Courses"
      introLead="In short:"
      intro={
        <>
          {BRAND} runs CUET (UG) and IPMAT/JIPMAT coaching batches across 4 Delhi-NCR centres in
          offline, online and hybrid modes. Choose your track below — fees and dates are confirmed
          during a free counselling call.
        </>
      }
      groups={[
        { heading: "CUET Coaching", icon: "Building2", items: cuet?.entries ?? [] },
        { heading: "IPMAT Coaching", icon: "Building2", items: ipmat?.entries ?? [] },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, I want CUET/IPMAT batch details"
      schema={[
        itemListSchema([
          { name: "CUET Coaching", url: "/courses/cuet" },
          { name: "IPMAT Coaching", url: "/courses/ipmat" },
        ]),
      ]}
    />
  );
}
