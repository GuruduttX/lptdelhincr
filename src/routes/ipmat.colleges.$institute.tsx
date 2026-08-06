import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { BRAND_SHORT, DOMAIN } from "@/config/site";
import { institutions } from "@/data/institutions";
import { slugify } from "@/lib/programmatic";

// Programmatic IPM institute profile (SOP H7). Emits ONLY for verified
// (non-illustrative) institution rows. 404s otherwise — no thin spawn.
export const Route = createFileRoute("/ipmat/colleges/$institute")({
  loader: ({ params }) => {
    const inst = institutions.find((r) => !r.illustrative && slugify(r.name) === params.institute);
    if (!inst) throw notFound();
    return { inst };
  },
  head: ({ params }) =>
    pageHead({
      title: `IPM Institute Profile | ${BRAND_SHORT}`,
      description: `IPM institute profile — courses, seats, fees, required scores and placements. Verified against the official source.`,
      path: `/ipmat/colleges/${params.institute}`,
    }),
  component: InstituteProfile,
});

function InstituteProfile() {
  const { inst } = Route.useLoaderData();
  return (
    <ContentPage
      canonicalPath={`/ipmat/colleges/${slugify(inst.name)}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: "Colleges", item: "/ipmat/colleges" },
        { name: inst.name },
      ]}
      title={`${inst.name}: IPM Profile`}
      introLead="Direct answer:"
      intro={<>{inst.name} offers {inst.courses.join(", ")}. Below are its verified seats, fees and required scores, from the official source.</>}
      ctaMessage={`Hi ${BRAND_SHORT}, help me target ${inst.name}`}
      schema={[{ "@context": "https://schema.org", "@type": "CollegeOrUniversity", name: inst.name, url: `${DOMAIN}/ipmat/colleges/${slugify(inst.name)}` }]}
    >
      <Section id="profile" heading={`${inst.name} — profile`}>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-ink">Courses:</strong> {inst.courses.join(", ")}</li>
          <li><strong className="text-ink">Seats:</strong> {inst.seats}</li>
          <li><strong className="text-ink">Fees:</strong> {inst.fees}</li>
          <li><strong className="text-ink">Required:</strong> {inst.required_subjects.join(", ")}</li>
        </ul>
      </Section>
    </ContentPage>
  );
}
