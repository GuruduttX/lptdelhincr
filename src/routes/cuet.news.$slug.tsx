import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { newsArticleSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import { getPost } from "@/data/posts";

// Programmatic CUET news (SOP H7/H8, P9). NewsArticle. Emits ONLY for a real,
// dated, sourced news post. None are seeded → 0 emitted (intended).
export const Route = createFileRoute("/cuet/news/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post || post.type !== "news" || post.vertical !== "CUET") throw notFound();
    return { post };
  },
  head: ({ params }) => {
    const post = getPost(params.slug);
    return pageHead({
      title: `${post?.title ?? "CUET News"} | ${BRAND_SHORT}`,
      description: post?.excerpt ?? "CUET news update from LPT Delhi-NCR.",
      path: `/cuet/news/${params.slug}`,
      ogType: "article",
    });
  },
  component: NewsPost,
});

function NewsPost() {
  const { post } = Route.useLoaderData();
  return (
    <ContentPage
      canonicalPath={`/cuet/news/${post.slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "News" },
      ]}
      title={post.title}
      introLead={`Updated ${post.dateDisplay}:`}
      intro={<>{post.intro}</>}
      ctaMessage="Hi LPT Delhi-NCR, I have a question about this CUET update"
      schema={[newsArticleSchema({ headline: post.title, datePublished: post.date, source: post.source })]}
    >
      {post.sections.map((s, i) => (
        <Section key={i} id={`s${i}`} heading={s.heading}>
          {s.body.map((p, j) => <p key={j}>{p}</p>)}
        </Section>
      ))}
    </ContentPage>
  );
}
