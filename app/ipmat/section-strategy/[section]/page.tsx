import type { Metadata } from "next";
import { ipmatSectionParams } from "@/lib/static-params";
import { notFound } from "next/navigation";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { getIpmatSection } from "@/lib/programmatic";
import type { FAQItem } from "@/components/seo/FAQ";

type Params = { section: string };

export function generateStaticParams(): Params[] {
  return ipmatSectionParams();
}

/** Route data, resolved at build time (was the TanStack loader). */
function load(params: Params) {
  const section = getIpmatSection(params.section);
  if (!section) throw notFound();
  return { section };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  return buildMetadata(await params);
}

function buildMetadata(params: Params): Metadata {
  const s = getIpmatSection(params.section);
  return pageHead({
    title: `IPMAT ${s?.label ?? "Section"} Strategy | ${BRAND_SHORT}`,
    description: `IPMAT ${s?.label ?? "section"} test-day strategy — sequencing, time budgets and when to attempt vs skip under the marking scheme. Practical, exam-ready.`,
    path: `/ipmat/section-strategy/${params.section}`,
    ogType: "article",
  });
}

export default async function SectionStrategy({
  params,
}: {
  params: Promise<Params>;
}) {
  const { section } = load(await params);
  const faqs: FAQItem[] = [
    {
      q: `How should I attempt the IPMAT ${section.label} section?`,
      a: (
        <>
          Open with your fastest, highest-accuracy question types to bank marks,
          then attempt the rest selectively. Respect any sectional time lock at
          IIM Indore, and apply the marking scheme — guess only after
          eliminating an option where there's negative marking.
        </>
      ),
    },
  ];
  return (
    <ContentPage
      canonicalPath={`/ipmat/section-strategy/${section.slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: "Syllabus", item: "/ipmat/syllabus" },
        { name: `${section.label} strategy` },
      ]}
      title={`IPMAT ${section.label}: Test-Day Strategy`}
      introLead="Direct answer:"
      intro={
        <>
          For IPMAT {section.label}, open with your strongest question types to
          bank marks, manage time per the sectional lock (at Indore), and apply
          the marking scheme — attempt confidently, guess only after eliminating
          an option, and skip when you can't.
        </>
      }
      toc={[{ id: "execution", label: "Test-day execution" }]}
      ctaMessage={`Hi LPT Delhi-NCR, coach me on IPMAT ${section.label} strategy`}
      faqs={faqs}
      schema={[
        articleSchema({
          headline: `IPMAT ${section.label}: Test-Day Strategy`,
          dateModified: LAST_UPDATED,
        }),
      ]}
    >
      <Section id="execution" heading="Test-day execution">
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong className="text-ink">Scan & sequence:</strong> attempt easy,
            high-accuracy items first.
          </li>
          <li>
            <strong className="text-ink">Budget time:</strong> respect the{" "}
            <a
              href="/ipmat/sectional-lock"
              className="text-brand hover:underline"
            >
              sectional lock
            </a>
            ; don't overspend.
          </li>
          <li>
            <strong className="text-ink">Apply marking:</strong> follow the{" "}
            <a
              href="/ipmat/marking-scheme"
              className="text-brand hover:underline"
            >
              marking scheme
            </a>{" "}
            — eliminate before guessing.
          </li>
        </ol>
      </Section>
    </ContentPage>
  );
}
