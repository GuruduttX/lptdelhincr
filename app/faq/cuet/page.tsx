import type { Metadata } from "next";
import { pageHead } from "@/lib/head";
import { FaqHub } from "@/components/lpt/FaqHub";
import { BRAND_SHORT } from "@/config/site";
import { cuetFaqs } from "@/data/faqs";

export const metadata: Metadata = pageHead({
  title: `CUET FAQs: ${cuetFaqs.length} Answered | ${BRAND_SHORT}`,
  description:
    "CUET FAQs answered — basics, cutoffs, results & percentile, CSAS admission, syllabus and preparation. Direct answers from official processes.",
  path: "/faq/cuet",
});

export default function Page() {
  return (
    <FaqHub
      vertical="CUET"
      faqs={cuetFaqs}
      hubHref="/cuet"
      courseHref="/courses/cuet"
    />
  );
}
