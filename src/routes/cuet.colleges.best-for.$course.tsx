import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { itemListSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import { colleges, isCollegePublishable } from "@/data/colleges";
import { slugify } from "@/lib/programmatic";

// Programmatic "best colleges for [course]" (SOP H7). Emits ONLY when ≥1
// publishable college offers the course. 404s otherwise (no thin spawn).
export const Route = createFileRoute("/cuet/colleges/best-for/$course")({
  loader: ({ params }) => {
    const matches = colleges
      .filter((c) => isCollegePublishable(c) && c.coursesViaCuet.some((x) => slugify(x) === params.course))
      .sort((a, b) => (b.lastGenCutoff ?? 0) - (a.lastGenCutoff ?? 0));
    if (!matches.length) throw notFound();
    const course = matches[0].coursesViaCuet.find((x) => slugify(x) === params.course)!;
    return { course, matches };
  },
  head: ({ params }) =>
    pageHead({
      title: `Best CUET Colleges for ${params.course} | ${BRAND_SHORT}`,
      description: `Best colleges for ${params.course} via CUET, ranked by latest cutoffs. Verified from official sources — use it to plan your CSAS preference order.`,
      path: `/cuet/colleges/best-for/${params.course}`,
    }),
  component: BestFor,
});

function BestFor() {
  const { course, matches } = Route.useLoaderData();
  return (
    <ContentPage
      canonicalPath={`/cuet/colleges/best-for/${slugify(course)}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Colleges", item: "/cuet/colleges" },
        { name: `Best for ${course}` },
      ]}
      title={`Best CUET Colleges for ${course}`}
      introLead="Direct answer:"
      intro={<>The colleges below admit for {course} via CUET, ranked by their latest cutoffs. Use the order to plan your CSAS preferences for {course}.</>}
      ctaMessage={`Hi ${BRAND_SHORT}, which colleges suit my ${course} target?`}
      schema={[itemListSchema(matches.map((c) => ({ name: `${c.college} (${c.university})`, url: `/cuet/colleges/${c.universitySlug}/${c.collegeSlug}` })))]}
    >
      <Section id="ranked" heading={`Top colleges for ${course}`}>
        <ol className="list-decimal space-y-2 pl-5">
          {matches.map((c) => (
            <li key={c.collegeSlug}>
              <a href={`/cuet/colleges/${c.universitySlug}/${c.collegeSlug}`} className="text-brand hover:underline">{c.college}</a> ({c.university})
            </li>
          ))}
        </ol>
      </Section>
    </ContentPage>
  );
}
