import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { BRAND } from "@/config/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms of Use",
      description: `Terms of use for ${BRAND} (lptdelhincr.com).`,
      path: "/terms",
    }),
  component: Terms,
});

function Terms() {
  return (
    <ContentPage
      canonicalPath="/terms"
      crumbs={[{ name: "Home", item: "/" }, { name: "Terms" }]}
      title="Terms of Use"
      intro={
        <>
          These terms govern your use of the {BRAND} website and services. The full terms (including
          refund policy and enrolment conditions) are to be finalised with legal review before launch.
        </>
      }
    >
      <Section id="use" heading="Use of this site">
        <p>
          Content on this site is for general information about CUET and IPMAT coaching. Course fees,
          dates and outcomes are confirmed during counselling. Full terms text pending legal review.
        </p>
      </Section>
    </ContentPage>
  );
}
