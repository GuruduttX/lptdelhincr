import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { personSchema } from "@/lib/schema";
import { BRAND } from "@/config/site";
import { getFaculty } from "@/data/faculty";

/**
 * Faculty bio (SOP H1 prog · A5.7 Person). Programmatic per faculty slug, driven
 * by the verified faculty dataset (real mentors only — no fabricated people).
 */
export const Route = createFileRoute("/faculty/$slug")({
  head: ({ params }) => {
    const f = getFaculty(params.slug);
    const name = f?.name ?? "Faculty Profile";
    return pageHead({
      title: `${name} — ${BRAND}`,
      description: f
        ? `${f.name}, ${f.role} (${f.experienceYears} yrs) at ${BRAND} — ${f.subject} for CUET & IPMAT.`
        : `CUET & IPMAT faculty profile at ${BRAND}.`,
      path: `/faculty/${params.slug}`,
      ogType: "article",
    });
  },
  component: FacultyBio,
});

function FacultyBio() {
  const { slug } = Route.useParams();
  const f = getFaculty(slug);
  if (!f) throw notFound();

  return (
    <ContentPage
      canonicalPath={`/faculty/${slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "Faculty", item: "/faculty" },
        { name: f.name },
      ]}
      title={f.name}
      introLead={`${f.role} · ${f.experienceYears} years`}
      intro={
        <>
          {f.name} is a {f.role.toLowerCase()} at {BRAND}, specialising in {f.subject} for CUET and
          IPMAT aspirants, with {f.experienceYears} years of teaching experience.
        </>
      }
      ctaMessage={`Hi LPT Delhi-NCR, I'd like to learn from ${f.name}`}
      schema={[
        personSchema({
          name: f.name,
          jobTitle: f.role,
          slug,
          knowsAbout: f.knowsAbout,
        }),
      ]}
    >
      <Section id="bio" heading="About">
        <p>
          {f.name} teaches {f.subject} across {BRAND}'s Delhi-NCR centres, with {f.experienceYears}{" "}
          years of experience preparing students for CUET and IPMAT. The focus is on building concepts
          from the basics and drilling exam-day technique through structured practice and mentoring.
        </p>
      </Section>

      <Section id="subjects" heading="Subjects & expertise">
        <ul className="list-disc space-y-2 pl-5">
          {f.knowsAbout.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </Section>
    </ContentPage>
  );
}
