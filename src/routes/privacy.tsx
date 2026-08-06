import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { BRAND, EMAIL } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy",
      description: `Privacy policy for ${BRAND} (lptdelhincr.com) — how we collect and use enquiry information.`,
      path: "/privacy",
    }),
  component: Privacy,
});

function Privacy() {
  return (
    <ContentPage
      canonicalPath="/privacy"
      crumbs={[{ name: "Home", item: "/" }, { name: "Privacy" }]}
      title="Privacy Policy"
      intro={
        <>
          This page explains how {BRAND} collects, uses and protects the information you share when
          you enquire about CUET or IPMAT coaching. The full policy text is to be finalised with legal
          review before launch.
        </>
      }
    >
      <Section id="overview" heading="Overview">
        <p>
          We collect contact details you submit (name, phone, email, city) only to respond to your
          enquiry and provide counselling. We do not sell your data. For any request relating to your
          information, contact <a href={`mailto:${EMAIL}`} className="text-brand hover:underline">{EMAIL}</a>.
        </p>
        <p className="text-sm italic">Full, legally-reviewed policy text pending.</p>
      </Section>
    </ContentPage>
  );
}
