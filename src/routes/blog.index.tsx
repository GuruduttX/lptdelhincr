import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { blogSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import { blogPosts } from "@/data/posts";

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead({
      title: `CUET & IPMAT Journal (Blog) | ${BRAND_SHORT}`,
      description:
        "The LPT Delhi-NCR journal — evergreen CUET & IPMAT strategy guides written by the people who teach. Dated, sourced, never inflated.",
      path: "/blog",
    }),
  component: BlogIndex,
});

function BlogIndex() {
  const items = blogPosts();
  return (
    <ContentPage
      canonicalPath="/blog"
      crumbs={[{ name: "Home", item: "/" }, { name: "Blog" }]}
      title="CUET & IPMAT Journal"
      introLead="In short:"
      intro={
        <>
          Strategy guides and decoded patterns for CUET and IPMAT, written by the people who teach. Every
          post is dated and sourced; we explain process and method, never inflated stats.
        </>
      }
      toc={[{ id: "posts", label: "Latest posts" }]}
      ctaMessage="Hi LPT Delhi-NCR, I have a CUET/IPMAT question"
      schema={[blogSchema()]}
    >
      <Section id="posts" heading="Latest posts">
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((p) => (
            <a key={p.slug} href={`/blog/${p.slug}`} className="lift-card block rounded-2xl border border-hairline bg-white p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-body">{p.vertical} · {p.dateDisplay}</div>
              <h3 className="mt-1 h-display text-lg leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-body">{p.excerpt}</p>
              <span className="mt-2 inline-block text-sm font-semibold text-brand">Read →</span>
            </a>
          ))}
        </div>
        <p className="text-sm">
          Looking for time-sensitive updates? See <a href="/news" className="text-brand hover:underline">news &amp; updates</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
