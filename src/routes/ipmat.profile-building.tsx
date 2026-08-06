import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT, LAST_UPDATED } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "How do I build my profile for the IPM interview?", a: <>Develop genuine depth in a few areas — academics, a couple of activities or interests you can speak about credibly, and basic awareness of current affairs. Panels value authenticity and the ability to discuss your choices, not a long list of shallow achievements.</> },
  { q: "Do extracurriculars matter for IPM selection?", a: <>They help when they're genuine and you can reflect on them, but they don't replace clarity of thought and academic readiness. A few activities you can discuss meaningfully beat many you can't. Build substance you can defend in an interview.</> },
];

export const Route = createFileRoute("/ipmat/profile-building")({
  head: () =>
    pageHead({
      title: `IPM Profile Building for Interviews | ${BRAND_SHORT}`,
      description:
        "IPM profile-building — develop genuine, defensible depth (academics, interests, awareness) that strengthens your Personal Interview.",
      path: "/ipmat/profile-building",
      ogType: "article",
    }),
  component: ProfileBuilding,
});

function ProfileBuilding() {
  return (
    <ContentPage
      canonicalPath="/ipmat/profile-building"
      crumbs={[{ name: "Home", item: "/" }, { name: "IPMAT", item: "/ipmat" }, { name: "Profile building" }]}
      title="IPM Profile Building for Interviews"
      introLead="Direct answer:"
      intro={
        <>
          Strong IPM profiles have genuine, defensible depth — solid academics, a few interests or
          activities you can discuss credibly, and basic awareness of current affairs. Panels reward
          authenticity and reflection over long lists. Build substance you can actually talk about under
          follow-up questions.
        </>
      }
      toc={[{ id: "what", label: "What to build" }, { id: "how", label: "How to use it" }]}
      ctaMessage="Hi LPT Delhi-NCR, help me build my IPM profile"
      faqs={faqs}
      schema={[articleSchema({ headline: "IPM Profile Building for Interviews", dateModified: LAST_UPDATED })]}
    >
      <Section id="what" heading="What to build">
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-ink">Academic readiness:</strong> know your subjects and recent results.</li>
          <li><strong className="text-ink">A few genuine interests:</strong> depth you can reflect on, not breadth you can't.</li>
          <li><strong className="text-ink">Awareness:</strong> basic current affairs and your stated areas of interest.</li>
        </ul>
      </Section>

      <Section id="how" heading="How to use it in the interview">
        <p>
          <strong className="text-ink">Be ready to defend your choices.</strong> Connect your profile
          to a credible "why management". Practise in <a href="/ipmat/interview/indore" className="text-brand hover:underline">mock interviews</a>{" "}
          and prepare the <a href="/ipmat/wat" className="text-brand hover:underline">WAT</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
