import { Reveal } from "./Reveal";
import { SectionHeader } from "./shared";
import b1 from "@/assets/blog-1.jpg";
import b2 from "@/assets/blog-2.jpg";
import b3 from "@/assets/blog-3.jpg";

/**
 * Blog — insights teaser. CUET + IPMAT only (no CAT). These are planned topics,
 * not published posts: dates render as placeholders and cards don't link to
 * non-existent posts. Wire to /blog/[slug] once posts are authored.
 */
const posts = [
  { img: b1, title: "How CUET Cutoffs Work: CSAS, Categories & Rounds", excerpt: "Why universities (not NTA) release CUET cutoffs, and how they move across CSAS allotment rounds." },
  { img: b2, title: "IPMAT QA: Question Types You'll See Every Year", excerpt: "Pattern-spotting beats memorising — the QA archetypes IPMAT keeps recycling, and how to solve them fast." },
  { img: b3, title: "CUET Subject Strategy: Picking the Right Combination", excerpt: "Your subject combination decides your university shortlist. The strategy nobody tells you about." },
];

export function Blog() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-lpt">
        <SectionHeader
          align="left"
          eyebrow="Insights"
          title={<>From the <span className="text-brand">LPT Journal</span></>}
          subtitle="CUET & IPMAT strategy guides written by the people who teach. Articles publishing soon."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <article className="lift-card group block h-full overflow-hidden rounded-3xl border border-hairline bg-white">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.img} alt={p.title} width={1024} height={640} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-brand backdrop-blur">
                    Guide
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="h-display text-lg leading-snug">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-body">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand/70">Publishing soon</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
