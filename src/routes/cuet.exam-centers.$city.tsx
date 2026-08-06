import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { getExamCity } from "@/data/examCenters";

// Programmatic CUET exam city (SOP H7, P8). Emits ONLY for verified rows. These
// are NTA exam cities — distinct from LPT coaching /centres/[area].
export const Route = createFileRoute("/cuet/exam-centers/$city")({
  loader: ({ params }) => {
    const city = getExamCity(params.city);
    if (!city) throw notFound();
    return { city };
  },
  head: ({ params }) => {
    const c = getExamCity(params.city);
    return pageHead({
      title: `CUET Exam Centre in ${c?.city ?? "City"} (NTA) | ${BRAND_SHORT}`,
      description: `CUET exam-city guide for ${c?.city ?? "the city"} — reporting, transport and admit-card notes for the NTA test location. Not a coaching centre.`,
      path: `/cuet/exam-centers/${params.city}`,
      ogType: "article",
    });
  },
  component: ExamCity,
});

function ExamCity() {
  const { city } = Route.useLoaderData();
  return (
    <ContentPage
      canonicalPath={`/cuet/exam-centers/${city.citySlug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Exam centres", item: "/cuet/exam-centers" },
        { name: city.city },
      ]}
      title={`CUET Exam Centre in ${city.city} (NTA)`}
      introLead="Direct answer:"
      intro={<>{city.city}, {city.state} is an NTA-allotted CUET exam city (not a coaching centre). Below are reporting and logistics notes; always confirm your exact venue on your admit card.</>}
      ctaMessage={`Hi ${BRAND_SHORT}, I have a CUET exam-centre question for ${city.city}`}
      schema={[articleSchema({ headline: `CUET Exam Centre in ${city.city} (NTA)`, dateModified: LAST_UPDATED })]}
    >
      <Section id="info" heading={`${city.city} exam-city notes`}>
        <p>{city.note}</p>
        <p className="text-sm">See the <a href="/cuet/admit-card" className="text-brand hover:underline">admit-card</a> and <a href="/cuet/exam-day" className="text-brand hover:underline">exam-day</a> guides. For coaching, see <a href="/centres" className="text-brand hover:underline">LPT centres</a>.</p>
      </Section>
    </ContentPage>
  );
}
