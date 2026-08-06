import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { HubPage } from "@/components/seo/HubPage";
import { Section } from "@/components/seo/ContentPage";
import { ComparisonTable } from "@/components/seo/ComparisonTable";
import { itemListSchema } from "@/lib/schema";
import { BRAND_SHORT, getTreeEntry, type TreeLink } from "@/config/site";
import { colleges, isCollegePublishable } from "@/data/colleges";
import { Tbd } from "@/components/lpt/shared";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Which colleges accept CUET scores?", a: <>Most central universities and many participating institutions admit undergraduates through CUET. Each university runs its own admission process (for DU, CSAS) and publishes its own cutoffs by college, course and category. Check the official list of participating universities for the current cycle.</> },
  { q: "How do I find the right CUET college for my course?", a: <>Match your target course to colleges that offer it via CUET, check their required subjects, and compare last cutoffs against your expected score and category. Our college predictor helps you build a realistic, category-aware shortlist.</> },
];

const planItems: TreeLink[] = ["/cuet/cutoff", "/cuet/results/college-predictor", "/cuet/admission"]
  .map((h) => getTreeEntry(h))
  .filter((e): e is NonNullable<typeof e> => Boolean(e));

export const Route = createFileRoute("/cuet/colleges/")({
  head: () =>
    pageHead({
      title: `CUET Colleges & Courses | ${BRAND_SHORT}`,
      description:
        "CUET colleges and courses — find colleges that admit via CUET, their required subjects and cutoffs. Profiles publish as verified data is added.",
      path: "/cuet/colleges",
    }),
  component: CollegesHub,
});

function CollegesHub() {
  const publishable = colleges.filter(isCollegePublishable);
  return (
    <HubPage
      canonicalPath="/cuet/colleges"
      crumbs={[{ name: "Home", item: "/" }, { name: "CUET", item: "/cuet" }, { name: "Colleges" }]}
      title="CUET Colleges & Courses"
      introLead="Direct answer:"
      intro={
        <>
          A wide range of central universities and participating institutions admit undergraduates
          through CUET, each via its own process and cutoffs. Individual college profiles publish as
          verified data is added (no thin placeholder pages). Plan your shortlist with the tools below.
        </>
      }
      groups={[{ heading: "Plan your CUET admission", icon: "ClipboardList", items: planItems }]}
      ctaMessage="Hi LPT Delhi-NCR, help me shortlist CUET colleges"
      faqs={faqs}
      schema={publishable.length ? [itemListSchema(publishable.map((c) => ({ name: `${c.college} (${c.university})`, url: `/cuet/colleges/${c.universitySlug}/${c.collegeSlug}` })))] : []}
    >
      <Section id="list" heading="Colleges accepting CUET">
        <p>
          <strong className="text-ink">Profiles open as data is verified.</strong> The dataset below is
          illustrative; verified college profiles (with cutoffs, seats and NIRF) appear here once
          confirmed against official sources.
        </p>
        <ComparisonTable
          caption="CUET colleges (structure)"
          date="pending verification"
          source="official university releases"
          illustrative={!publishable.length}
          columns={[
            { key: "college", header: "College" },
            { key: "university", header: "University" },
            { key: "courses", header: "Courses via CUET" },
            { key: "cutoff", header: "Last Gen cutoff", align: "right" },
          ]}
          rows={colleges.map((c) => ({
            college: isCollegePublishable(c)
              ? <a href={`/cuet/colleges/${c.universitySlug}/${c.collegeSlug}`} className="text-brand hover:underline">{c.college}</a>
              : c.college,
            university: c.university,
            courses: c.coursesViaCuet.join(", "),
            cutoff: c.lastGenCutoff ?? <Tbd label="verify" />,
          }))}
        />
      </Section>
    </HubPage>
  );
}
