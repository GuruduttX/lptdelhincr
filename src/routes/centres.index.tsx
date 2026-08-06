import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { itemListSchema, localBusinessSchema } from "@/lib/schema";
import { BRAND, CENTRES } from "@/config/site";

export const Route = createFileRoute("/centres/")({
  head: () =>
    pageHead({
      title: `Our Centres in Delhi-NCR — ${BRAND}`,
      description: "LPT Delhi-NCR centres for CUET & IPMAT coaching: Noida, Hauz Khas, GTB Nagar and Gurugram. Addresses, directions and batches.",
      path: "/centres",
    }),
  component: CentresIndex,
});

function CentresIndex() {
  return (
    <HubPage
      canonicalPath="/centres"
      crumbs={[{ name: "Home", item: "/" }, { name: "Centres" }]}
      title="Our CUET & IPMAT Centres in Delhi-NCR"
      introLead="In short:"
      intro={
        <>
          {BRAND} runs {CENTRES.length} centres across Delhi-NCR — Noida (Sector 62), Hauz Khas, GTB
          Nagar and Gurugram (Sector 14) — offering CUET and IPMAT coaching in offline, online and
          hybrid modes. Find your nearest centre below.
        </>
      }
      groups={[
        {
          heading: "Our centres",
          icon: "MapPin",
          items: CENTRES.map((c) => ({ label: c.area, href: `/centres/${c.slug}`, desc: c.fullAddress })),
        },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, I want to visit a centre / book a demo"
      schema={[
        itemListSchema(CENTRES.map((c) => ({ name: c.name, url: `/centres/${c.slug}` }))),
        ...CENTRES.map((c) => localBusinessSchema(c)),
      ]}
    />
  );
}
