import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { itemListSchema } from "@/lib/schema";
import { BRAND } from "@/config/site";
import { FACULTY } from "@/data/faculty";

/**
 * Faculty index (SOP H1 — ItemList). Real LPT mentors (E-E-A-T) from the
 * verified faculty dataset.
 */
const faculty = FACULTY.map((f) => ({
  name: f.name,
  slug: f.slug,
  role: `${f.role} · ${f.experienceYears} yrs`,
}));

export const Route = createFileRoute("/faculty/")({
  head: () =>
    pageHead({
      title: `Faculty — ${BRAND}`,
      description: "Meet the CUET & IPMAT faculty at LPT Delhi-NCR — real mentors, credentials and subjects.",
      path: "/faculty",
    }),
  component: Faculty,
});

function Faculty() {
  return (
    <ContentPage
      canonicalPath="/faculty"
      crumbs={[{ name: "Home", item: "/" }, { name: "Faculty" }]}
      title="Our Faculty"
      introLead="In short:"
      intro={
        <>
          {BRAND}'s CUET and IPMAT mentors bring deep subject expertise — from Quant and Verbal to
          Logical Reasoning & DI — with an average of 10+ years' teaching experience. Meet the mentors
          below.
        </>
      }
      schema={[itemListSchema(faculty.map((f) => ({ name: f.name, url: `/faculty/${f.slug}` })))]}
    >
      <Section id="faculty" heading="Mentors">
        {faculty.length === 0 ? (
          <p>
            Faculty profiles pending verification: <Tbd label="real faculty" />. Each profile will list
            the mentor's subject, experience and credentials.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {faculty.map((f) => (
              <li key={f.slug} className="rounded-xl border border-hairline bg-white p-4">
                <a href={`/faculty/${f.slug}`} className="font-semibold text-ink hover:text-brand">
                  {f.name}
                </a>
                <div className="text-sm text-body">{f.role}</div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </ContentPage>
  );
}
