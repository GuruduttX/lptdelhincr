import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import { Tbd } from "@/components/lpt/shared";
import { ipmatFaqs } from "@/data/faqs";

export const Route = createFileRoute("/ipmat/eligibility")({
  head: () =>
    pageHead({
      title: `IPMAT Eligibility: Marks & Age Criteria | ${BRAND_SHORT}`,
      description:
        "IPMAT eligibility — Class 12 completion, institute-specific minimum marks and an age limit in the admission year. Varies by institute & category.",
      path: "/ipmat/eligibility",
      ogType: "article",
    }),
  component: Eligibility,
});

function Eligibility() {
  return (
    <ContentPage
      canonicalPath="/ipmat/eligibility"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Eligibility" }]}
      title="IPMAT Eligibility: Marks & Age Criteria"
      introLead="Direct answer:"
      intro={
        <>
          IPMAT is for students who have completed (or are completing) Class 12, subject to
          institute-specific minimum marks and an age limit measured in the admission year (with
          relaxation for reserved categories). Exact thresholds differ by institute and category and can
          change yearly — verify on the official site.
        </>
      }
      toc={[
        { id: "criteria", label: "Eligibility criteria" },
        { id: "category", label: "Category relaxations" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, am I eligible for IPMAT?"
      faqs={ipmatFaqs.filter((f) => f.cluster === "eligibility").map((f) => ({ q: f.q, a: f.a }))}
      schema={[articleSchema({ headline: "IPMAT Eligibility: Marks & Age Criteria", dateModified: LAST_UPDATED })]}
    >
      <Section id="criteria" heading="Core eligibility criteria">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-ink">Qualification:</strong> completed or appearing for Class 12 (10+2).</li>
          <li><strong className="text-ink">Minimum marks:</strong> institute-specific (varies by institute & category) — <Tbd label="verify %" />.</li>
          <li><strong className="text-ink">Age limit:</strong> measured in the admission year, since IPM admits straight after Class 12 — <Tbd label="verify age" />.</li>
        </ul>
        <p className="text-sm">Confirm every figure on iimidr.ac.in / iimrohtak.ac.in / the JIPMAT portal.</p>
      </Section>

      <Section id="category" heading="Category relaxations">
        <p>
          <strong className="text-ink">Reserved categories get relaxations</strong> on both minimum
          marks and the age limit, as defined by each institute. The exact relaxation differs by
          category and cycle — check the official admission notice. Eligible? See the{" "}
          <a href="/ipmat/application-process" className="text-brand hover:underline">application process</a> and{" "}
          <a href="/ipmat/important-dates" className="text-brand hover:underline">important dates</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
