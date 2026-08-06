import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { BRAND, CENTRES, FOUNDED_YEAR, isPlaceholder } from "@/config/site";
import { Tbd } from "@/components/lpt/shared";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: `About ${BRAND}`,
      description: `About ${BRAND} — CUET & IPMAT coaching across 4 Delhi-NCR centres in Noida, Hauz Khas, GTB Nagar and Gurugram.`,
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <ContentPage
      canonicalPath="/about"
      crumbs={[{ name: "Home", item: "/" }, { name: "About" }]}
      title={<>About {BRAND}</>}
      introLead="In one line:"
      intro={
        <>
          {BRAND} is a CUET &amp; IPMAT coaching institute operating {CENTRES.length} centres across
          Delhi-NCR — Noida, Hauz Khas, GTB Nagar and Gurugram — offering offline, online and hybrid
          batches taught by subject specialists.
        </>
      }
      toc={[
        { id: "story", label: "Our story" },
        { id: "what-we-do", label: "What we do" },
        { id: "centres", label: "Our centres" },
      ]}
    >
      <Section id="story" heading="Our story">
        <p>
          Founded in{" "}
          {isPlaceholder(FOUNDED_YEAR) ? <Tbd label="founding year" /> : FOUNDED_YEAR}, {BRAND}{" "}
          focuses exclusively on CUET and IPMAT preparation. Our full founding story, milestones and
          verified track record will be added here from confirmed records.
        </p>
      </Section>

      <Section id="what-we-do" heading="What we do">
        <ul className="list-disc space-y-2 pl-5">
          <li>CUET (UG) coaching — domain, general and language tracks.</li>
          <li>IPMAT (Indore &amp; Rohtak) and JIPMAT coaching for 5-year integrated management programmes.</li>
          <li>Proctored mock test series, in-house study material, and PI/WAT preparation.</li>
          <li>Offline, online and hybrid batches across {CENTRES.length} Delhi-NCR centres.</li>
        </ul>
      </Section>

      <Section id="centres" heading="Our centres">
        <ul className="space-y-2">
          {CENTRES.map((c) => (
            <li key={c.slug}>
              <strong className="text-ink">{c.area}</strong> — {c.fullAddress}
            </li>
          ))}
        </ul>
      </Section>
    </ContentPage>
  );
}
