import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/head";
import { ContentPage, Section } from "@/components/seo/ContentPage";
import { BRAND_SHORT } from "@/config/site";
import type { FAQItem } from "@/components/seo/FAQ";

const faqs: FAQItem[] = [
  { q: "Should I pick CUET or IPMAT?", a: <>Choose CUET for a broad undergraduate degree at a central university; choose IPMAT for a five-year integrated management programme at an IIM straight after Class 12. This quiz suggests a direction based on your goal — then read the full comparison before deciding.</> },
];

export const Route = createFileRoute("/cuet/compare/quiz")({
  head: () =>
    pageHead({
      title: `CUET or IPMAT? Exam Selector Quiz | ${BRAND_SHORT}`,
      description:
        "Not sure whether to target CUET or IPMAT? Answer two quick questions for a suggested direction, then read the full comparison. Guidance, not advice.",
      path: "/cuet/compare/quiz",
    }),
  component: Quiz,
});

function Quiz() {
  const [goal, setGoal] = useState("");
  const rec = goal === "management" ? "IPMAT" : goal === "broad" ? "CUET" : "";
  return (
    <ContentPage
      canonicalPath="/cuet/compare/quiz"
      crumbs={[
        { name: "Home", item: "/" },
        { name: "CUET", item: "/cuet" },
        { name: "Compare", item: "/cuet/compare" },
        { name: "Quiz" },
      ]}
      title="CUET or IPMAT? A 30-Second Selector"
      introLead="Direct answer:"
      intro={
        <>
          The choice comes down to the degree you want: a broad undergraduate course (CUET) or a
          five-year integrated management programme at an IIM (IPMAT). Pick your goal below for a
          suggested direction, then read the full comparison before committing.
        </>
      }
      toc={[{ id: "quiz", label: "Selector" }]}
      ctaMessage="Hi LPT Delhi-NCR, help me choose between CUET and IPMAT"
      faqs={faqs}
    >
      <Section id="quiz" heading="What do you want after Class 12?">
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setGoal("broad")} className={goal === "broad" ? "btn-primary" : "btn-secondary"}>
            A broad UG degree (eco/commerce/humanities/sciences)
          </button>
          <button onClick={() => setGoal("management")} className={goal === "management" ? "btn-primary" : "btn-secondary"}>
            A 5-year management programme at an IIM
          </button>
        </div>
        {rec && (
          <div className="rounded-xl border border-hairline bg-white p-4">
            <p>
              <strong className="text-ink">Suggested direction: {rec}.</strong>{" "}
              {rec === "CUET" ? (
                <>Explore the <a href="/cuet" className="text-brand hover:underline">CUET hub</a> and{" "}
                <a href="/courses/cuet" className="text-brand hover:underline">CUET coaching</a>.</>
              ) : (
                <>Explore the <a href="/ipmat" className="text-brand hover:underline">IPMAT hub</a> and{" "}
                <a href="/courses/ipmat" className="text-brand hover:underline">IPMAT coaching</a>.</>
              )}
            </p>
          </div>
        )}
        <p className="text-sm">
          Read the full <a href="/cuet/compare/cuet-vs-ipmat" className="text-brand hover:underline">CUET vs IPMAT comparison</a>.
        </p>
      </Section>
    </ContentPage>
  );
}
