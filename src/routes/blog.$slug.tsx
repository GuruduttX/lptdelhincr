import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { articleSchema } from "@/lib/schema";
import { BRAND_SHORT } from "@/config/site";
import { getPost } from "@/data/posts";

// Blog post (SOP H8). Article schema, dated, with an anchor TOC from sections.
// Emits only for real published posts (getPost gates on isPostPublishable).
export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post || post.type !== "blog") throw notFound();
    return { post };
  },
  head: ({ params }) => {
    const post = getPost(params.slug);
    return pageHead({
      title: `${post?.seoTitle ?? "Blog"} | ${BRAND_SHORT}`,
      description: post?.excerpt ?? "CUET & IPMAT strategy from LPT Delhi-NCR.",
      path: `/blog/${params.slug}`,
      ogType: "article",
    });
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  return (
    <ContentPage
      canonicalPath={`/blog/${post.slug}`}
      crumbs={[
        { name: "Home", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: post.title },
      ]}
      title={post.title}
      introLead={`${post.vertical} · ${post.dateDisplay}:`}
      intro={<>{post.intro}</>}
      toc={post.sections.map((s, i) => ({ id: `s${i}`, label: s.heading }))}
      ctaMessage="Hi LPT Delhi-NCR, I have a question about this"
      schema={[articleSchema({ headline: post.title, datePublished: post.date, dateModified: post.date })]}
    >
      {post.sections.map((s, i) => (
        <Section key={i} id={`s${i}`} heading={s.heading}>
          {s.body.map((p, j) => <p key={j}>{p}</p>)}
        </Section>
      ))}
    </ContentPage>
  );
}
