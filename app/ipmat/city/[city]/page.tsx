import type { Metadata } from "next";
import { ipmatCityParams } from "@/lib/static-params";
import { notFound } from "next/navigation";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { getIpmatCity } from "@/lib/programmatic";
import type { FAQItem } from "@/components/seo/FAQ";

type Params = { city: string };

export function generateStaticParams(): Params[] {
  return ipmatCityParams();
}

/** Route data, resolved at build time (was the TanStack loader). */
function load(params: Params) {
  const city = getIpmatCity(params.city);
  if (!city) throw notFound();
  return { city };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  return buildMetadata(await params);
}

function buildMetadata(params: Params): Metadata {
  const c = getIpmatCity(params.city);
  return pageHead({
    title: `Studying IPM in ${c?.label ?? "the City"} | ${BRAND_SHORT}`,
    description: `What student life is like for IPM at IIM ${c?.label ?? ""} — the city, campus and hostel reality. An honest overview for prospective applicants.`,
    path: `/ipmat/city/${params.city}`,
    ogType: "article",
  });
}

export default async function City({ params }: { params: Promise<Params> }) {
  const { city } = load(await params);
  const faqs: FAQItem[] = [
    {
      q: `What is student life like at IIM ${city.label}?`,
      a: (
        <>
          Expect an intensive academic schedule with a residential campus, a
          close cohort, and the typical rhythm of lectures, group work and
          committees. As a five-year IPM student you grow up on campus — the
          experience is demanding but formative. Verify current hostel and
          facility details with the institute.
        </>
      ),
    },
    {
      q: `Is hostel accommodation provided at IIM ${city.label}?`,
      a: (
        <>
          IIM IPM programmes are residential, so on-campus hostel accommodation
          is part of the experience, with the institute's own rules and
          facilities. Specifics (room type, mess, fees) vary and change —
          confirm the latest directly with the institute before relying on them.
        </>
      ),
    },
  ];
  return (
    <ContentPage
      canonicalPath={`/ipmat/city/${city.slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "IPMAT", item: "/ipmat" },
        { name: `IPM in ${city.label}` },
      ]}
      title={`Studying IPM in ${city.label}`}
      introLead="Direct answer:"
      intro={
        <>
          IPM at IIM {city.label} is a residential, five-year experience: an
          intensive academic schedule, a close cohort, and campus life from year
          one. The city offers the usual student essentials around the
          institute. Treat hostel and facility specifics as institute-confirmed,
          since they change.
        </>
      }
      toc={[
        { id: "life", label: "Campus & city" },
        { id: "hostel", label: "Hostel reality" },
      ]}
      ctaMessage={`Hi ${BRAND_SHORT}, tell me about IPM life at IIM ${city.label}`}
      faqs={faqs}
      schema={[
        articleSchema({
          headline: `Studying IPM in ${city.label}`,
          dateModified: LAST_UPDATED,
        }),
      ]}
    >
      <Section id="life" heading={`Campus & city: ${city.label}`}>
        <p>
          <strong className="text-ink">
            A residential, cohort-driven experience.
          </strong>{" "}
          As a five-year IPM student you live on or near campus and grow with a
          tight peer group. See the{" "}
          <a
            href="/ipmat/programme/structure"
            className="text-brand hover:underline"
          >
            programme structure
          </a>{" "}
          for the academic arc and{" "}
          <a href="/ipmat/campus-life" className="text-brand hover:underline">
            campus life
          </a>{" "}
          for the day-to-day.
        </p>
      </Section>
      <Section id="hostel" heading="Hostel reality">
        <p>
          <strong className="text-ink">Residential by design.</strong> Hostel
          accommodation, mess and facilities are part of the IPM experience,
          with the institute's rules. Confirm current specifics with the
          institute — we don't publish unverified facility claims.
        </p>
      </Section>
    </ContentPage>
  );
}
