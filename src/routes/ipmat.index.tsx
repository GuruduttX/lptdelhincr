import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { itemListSchema } from "@/lib/schema";
import { BRAND_SHORT, getVerticalTree } from "@/config/site";
import { ipmatFaqs } from "@/data/faqs";

export const Route = createFileRoute("/ipmat/")({
  head: () =>
    pageHead({
      title: `IPMAT Coaching & Prep Guide | ${BRAND_SHORT}`,
      description:
        "IPMAT guide & coaching at LPT Delhi-NCR — exam pattern, marking scheme, cutoffs, eligibility and dates for IIM Indore, Rohtak and JIPMAT.",
      path: "/ipmat",
    }),
  component: IpmatHub,
});

function IpmatHub() {
  return (
    <HubPage
      canonicalPath="/ipmat"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT" }]}
      title="IPMAT: Pattern, Marking, Cutoffs & Coaching"
      introLead="What IPMAT is:"
      intro={
        <>
          IPMAT is the entrance test for five-year Integrated Programme in Management (IPM) courses. IIM
          Indore and IIM Rohtak run their own IPMAT exams; JIPMAT covers IIM Jammu and Bodh Gaya. Browse
          every IPMAT topic below.
        </>
      }
      vertical="IPMAT"
      keyFacts={[
        { value: "Indore", label: "IPMAT (own paper)" },
        { value: "Rohtak", label: "IPMAT (own paper)" },
        { value: "JIPMAT", label: "Jammu & Bodh Gaya" },
        { value: "Free", label: "Demo & counselling" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, I want IPMAT coaching details"
      faqs={ipmatFaqs.slice(0, 6).map((f) => ({ q: f.q, a: f.a }))}
      schema={[itemListSchema(getVerticalTree("IPMAT").map((c) => ({ name: c.cluster, url: c.entries[0].href })))]}
    >
      <ul className="list-disc space-y-2 pl-5">
        <li><strong className="text-ink">Who:</strong> Class 12 students targeting 5-year IPM programmes.</li>
        <li><strong className="text-ink">Exams:</strong> IIM Indore, IIM Rohtak (own papers) and JIPMAT (Jammu, Bodh Gaya).</li>
        <li><strong className="text-ink">Sections:</strong> Quantitative Aptitude and Verbal Ability, plus Logical Reasoning for Rohtak.</li>
        <li><strong className="text-ink">Selection:</strong> aptitude score + Personal Interview composite — see the Cutoffs &amp; Selection section below.</li>
      </ul>
    </HubPage>
  );
}
