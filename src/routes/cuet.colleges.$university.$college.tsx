import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { BRAND, BRAND_SHORT, DOMAIN } from "@/config/site";
import { colleges, isCollegePublishable, type CollegeRow } from "@/data/colleges";

// Programmatic college profile (SOP H7). Emits ONLY for publishable rows.
export const Route = createFileRoute("/cuet/colleges/$university/$college")({
  loader: ({ params }) => {
    const college = colleges.find(
      (c) => isCollegePublishable(c) && c.universitySlug === params.university && c.collegeSlug === params.college,
    );
    if (!college) throw notFound();
    return { college };
  },
  head: ({ params }) => {
    const c = colleges.find((x) => x.universitySlug === params.university && x.collegeSlug === params.college);
    return pageHead({
      title: `${c?.college ?? "College"} CUET Cutoffs & Courses | ${BRAND_SHORT}`,
      description: `${c?.college ?? "College"} (${c?.university ?? ""}) via CUET — courses, required subjects, cutoffs and seats. Verified from official sources.`,
      path: `/cuet/colleges/${params.university}/${params.college}`,
    });
  },
  component: CollegeProfile,
});

function eduOrgSchema(c: CollegeRow) {
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: c.college,
    parentOrganization: { "@type": "EducationalOrganization", name: c.university },
    url: `${DOMAIN}/cuet/colleges/${c.universitySlug}/${c.collegeSlug}`,
  };
}

function CollegeProfile() {
  const { college } = Route.useLoaderData();
  return (
    <ContentPage
      canonicalPath={`/cuet/colleges/${college.universitySlug}/${college.collegeSlug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Colleges", item: "/cuet/colleges" },
        { name: college.college },
      ]}
      title={`${college.college}: CUET Courses & Cutoffs`}
      introLead="Direct answer:"
      intro={
        <>
          {college.college} ({college.university}) admits via CUET for {college.coursesViaCuet.join(", ")}.
          Below are its required subjects, latest cutoff and seats — verified from official sources.
        </>
      }
      ctaMessage={`Hi ${BRAND_SHORT}, help me target ${college.college} via CUET`}
      schema={[eduOrgSchema(college)]}
    >
      <Section id="profile" heading={`${college.college} — CUET profile`}>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-ink">Courses via CUET:</strong> {college.coursesViaCuet.join(", ")}</li>
          <li><strong className="text-ink">Required subjects:</strong> {college.requiredSubjects.join(", ")}</li>
          <li><strong className="text-ink">Last General cutoff:</strong> {college.lastGenCutoff}</li>
          <li><strong className="text-ink">Seats:</strong> {college.seats}</li>
        </ul>
        <p className="text-sm">Provider: {BRAND} — predict your fit with the <a href="/cuet/results/college-predictor" className="text-brand hover:underline">college predictor</a>.</p>
      </Section>
    </ContentPage>
  );
}
