import type { Metadata } from "next";
import { ipmatInstituteParams } from "@/lib/static-params";
import { notFound } from "next/navigation";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { getInstitute } from "@/data/ipmat";
import type { FAQItem } from "@/components/seo/FAQ";

type Params = { institute: string };

export function generateStaticParams(): Params[] {
  return ipmatInstituteParams();
}

/** Route data, resolved at build time (was the TanStack loader). */
function load(params: Params) {
  const institute = getInstitute(params.institute);
  if (!institute) throw notFound();
  return { institute };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  return buildMetadata(await params);
}

function buildMetadata(params: Params): Metadata {
  const inst = getInstitute(params.institute);
  return pageHead({
    title: `${inst?.short ?? "IPM"} Personal Interview Guide | ${BRAND_SHORT}`,
    description: `${inst?.short ?? "IPM"} IPM Personal Interview — what panels probe, how to prepare, and common mistakes. Practical PI prep with mock-interview support.`,
    path: `/ipmat/interview/${params.institute}`,
    ogType: "article",
  });
}

export default async function Interview({
  params,
}: {
  params: Promise<Params>;
}) {
  const { institute } = load(await params);
  const faqs: FAQItem[] = [
    {
      q: `What does the ${institute.short} IPM interview assess?`,
      a: (
        <>
          The panel probes clarity of thought, awareness of current affairs,
          your academic background, and genuine motivation for a five-year
          management programme. It rewards reasoned, honest answers over
          rehearsed lines — and the ability to justify your views under
          follow-up questions.
        </>
      ),
    },
    {
      q: `How do I prepare for the ${institute.short} Personal Interview?`,
      a: (
        <>
          Know your form and academics cold, build awareness of basic current
          affairs and your stated interests, and practise structured, honest
          answers in mock interviews. Prepare a credible "why management / why
          now" and be ready to defend your opinions calmly.
        </>
      ),
    },
  ];
  return (
    <ContentPage
      canonicalPath={`/ipmat/interview/${institute.slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: `${institute.short} interview` },
      ]}
      title={`${institute.name}: Personal Interview Guide`}
      introLead="Direct answer:"
      intro={
        <>
          The {institute.name} IPM Personal Interview assesses clarity of
          thought, awareness, your academic background and genuine motivation
          for a five-year management programme. It rewards honest, reasoned
          answers over rehearsed ones. Prepare your profile, basic current
          affairs, and a credible "why management" — then practise with mocks.
        </>
      }
      toc={[
        { id: "probe", label: "What panels probe" },
        { id: "prep", label: "How to prepare" },
      ]}
      ctaMessage={`Hi LPT Delhi-NCR, I want mock-PI prep for ${institute.short}`}
      faqs={faqs}
      schema={[
        articleSchema({
          headline: `${institute.name}: Personal Interview Guide`,
          dateModified: LAST_UPDATED,
        }),
      ]}
    >
      <Section id="probe" heading="What panels probe">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-ink">Clarity of thought:</strong> can you
            reason and structure an answer?
          </li>
          <li>
            <strong className="text-ink">Awareness:</strong> basic current
            affairs and your stated interests.
          </li>
          <li>
            <strong className="text-ink">Profile & motivation:</strong>{" "}
            academics, and an honest "why management, why now".
          </li>
        </ul>
      </Section>

      <Section id="prep" heading="How to prepare">
        <p>
          <strong className="text-ink">Mocks beat memorising.</strong> Practise
          structured, honest answers under follow-up pressure, and strengthen
          your{" "}
          <a
            href="/ipmat/profile-building"
            className="text-brand hover:underline"
          >
            profile
          </a>{" "}
          and{" "}
          <a href="/ipmat/wat" className="text-brand hover:underline">
            WAT
          </a>
          . Our{" "}
          <a href="/courses/ipmat" className="text-brand hover:underline">
            IPMAT coaching
          </a>{" "}
          includes mock interviews.
        </p>
      </Section>
    </ContentPage>
  );
}
