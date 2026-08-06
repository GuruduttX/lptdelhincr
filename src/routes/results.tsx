import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { BRAND, LAST_UPDATED } from "@/config/site";
import { articleSchema } from "@/lib/schema";
import {
  RESULT_HEADLINES,
  TOP_RANKS,
  SELECTIONS,
  TESTIMONIALS,
  CUET_TOPPERS,
} from "@/data/results";

export const Route = createFileRoute("/results")({
  head: () =>
    pageHead({
      title: `CUET & IPMAT Results — ${BRAND}`,
      description:
        "Verified IPMAT results: 140+ IIM selections in 2 years, incl. AIR 9, 22 & 24 at IIM Indore. Real, attributable selections only.",
      path: "/results",
    }),
  component: Results,
});

function Results() {
  return (
    <ContentPage
      canonicalPath="/results"
      crumbs={[{ name: "Home", item: "/" }, { name: "Results" }]}
      title="Our CUET & IPMAT Results"
      introLead="Direct answer:"
      intro={
        <>
          {BRAND} has earned <strong>140+ IIM selections in 2 years</strong>, including{" "}
          <strong>AIR 9, 22 and 24 at IIM Indore</strong> and 80+ IIM seats in 2025 alone. Every entry
          below names the student, exam and institute — we publish only verified, attributable selections,
          never inflated or fabricated numbers.
        </>
      }
      toc={[
        { id: "ranks", label: "Top IPMAT ranks" },
        { id: "selections", label: "Selections & calls" },
        { id: "cuet", label: "CUET 2025 toppers" },
        { id: "voices", label: "Student voices" },
      ]}
      ctaMessage="Hi LPT Delhi-NCR, I want to know about your IPMAT batches and results"
      schema={[articleSchema({ headline: "LPT Delhi-NCR — CUET & IPMAT Results", dateModified: LAST_UPDATED })]}
    >
      <Section id="ranks" heading="Top IPMAT Indore ranks">
        <div className="grid gap-4 sm:grid-cols-3">
          {TOP_RANKS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-hairline bg-white p-5 text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-body">AIR</div>
              <div className="h-display text-4xl text-brand">{t.air}</div>
              <div className="mt-2 font-bold text-ink">{t.name}</div>
              <div className="text-sm text-body">
                {t.institute} · {t.status}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {RESULT_HEADLINES.map((h) => (
            <div key={h.label} className="rounded-2xl bg-cream-soft p-5 text-center">
              <div className="h-display text-3xl text-brand">{h.value}</div>
              <div className="mt-1 text-sm font-medium text-body">{h.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="selections" heading="Selections & calls by institute">
        <p>
          A snapshot of named IPMAT and JIPMAT selections and interview calls from recent cycles — with
          many more across both years.
        </p>
        <div className="space-y-6">
          {SELECTIONS.map((group) => (
            <div key={group.institute} className="rounded-2xl border border-hairline bg-white p-5">
              <h3 className="font-bold text-ink">{group.institute}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.students.map((s, i) => (
                  <li
                    key={`${s.name}-${i}`}
                    className="rounded-full bg-cream-soft px-3 py-1 text-sm text-ink"
                  >
                    <span className="font-medium">{s.name}</span>
                    <span className="text-body"> — {s.percentile ? s.percentile : s.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="cuet" heading="CUET 2025 toppers">
        <p>
          Verified CUET 2025 percentiles from our students — named, with subject and school.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Percentile</th>
                <th className="px-4 py-3 font-semibold">Subject</th>
                <th className="px-4 py-3 font-semibold">School</th>
              </tr>
            </thead>
            <tbody>
              {CUET_TOPPERS.map((t) => (
                <tr key={t.name} className="border-t border-hairline">
                  <td className="px-4 py-3 font-medium text-ink">{t.name}</td>
                  <td className="px-4 py-3 font-semibold text-brand">{t.percentile}</td>
                  <td className="px-4 py-3 text-body">{t.subject}</td>
                  <td className="px-4 py-3 text-body">{t.school}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="voices" heading="Student voices">
        <div className="grid gap-4 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-hairline bg-white p-5">
              <blockquote className="text-body leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-3 text-sm font-bold text-ink">
                {t.name} <span className="font-medium text-body">· {t.institute}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </ContentPage>
  );
}
