import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { BRAND_SHORT } from "@/config/site";
import { newsPosts } from "@/data/posts";
import { Tbd } from "@/components/lpt/shared";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Where can I find the latest CUET & IPMAT updates?", a: <>Time-sensitive, sourced updates appear here and on each vertical's changes page, while evergreen guides live in our journal. We date every update and verify it against the official source before publishing — never rumours.</> },
];

export const Route = createFileRoute("/news")({
  head: () =>
    pageHead({
      title: `CUET & IPMAT News & Updates | ${BRAND_SHORT}`,
      description:
        "Latest CUET & IPMAT news and updates — dated, sourced, fast-published. We verify every update against the official source before posting.",
      path: "/news",
    }),
  component: News,
});

function News() {
  const items = newsPosts();
  return (
    <ContentPage
      canonicalPath="/news"
      crumbs={[{ name: "Home", item: "/" }, { name: "News" }]}
      title="CUET & IPMAT News & Updates"
      introLead="In short:"
      intro={
        <>
          Time-sensitive CUET and IPMAT updates, dated and sourced. We publish a news item only after
          verifying it against the official source. For evergreen strategy, see the{" "}
          <a href="/blog" className="text-brand hover:underline">journal</a>.
        </>
      }
      toc={[{ id: "latest", label: "Latest updates" }]}
      ctaMessage="Hi LPT Delhi-NCR, I have a question about a CUET/IPMAT update"
      faqs={faqs}
    >
      <Section id="latest" heading="Latest updates">
        {items.length === 0 ? (
          <p>
            <strong className="text-ink">Verified, dated updates appear here</strong> as official notices
            land: <Tbd label="news items" />. We never post unverified rumours. Meanwhile, track{" "}
            <a href="/cuet/changes" className="text-brand hover:underline">CUET changes</a> and the{" "}
            <a href="/blog" className="text-brand hover:underline">journal</a>.
          </p>
        ) : (
          <ul className="space-y-3">
            {items.map((p) => (
              <li key={p.slug}>
                <a href={`/${p.vertical.toLowerCase()}/news/${p.slug}`} className="font-semibold text-brand hover:underline">{p.title}</a>
                <span className="ml-2 text-xs text-body">{p.dateDisplay}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </ContentPage>
  );
}
