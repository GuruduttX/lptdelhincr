import type { Metadata } from "next";
import { pageHead } from "@/lib/head";
import { FaqHub } from "@/components/lpt/FaqHub";
import { BRAND_SHORT } from "@/config/site";
import { ipmatFaqs } from "@/data/faqs";

export const metadata: Metadata = pageHead({
  title: `IPMAT FAQs: ${ipmatFaqs.length} Answered | ${BRAND_SHORT}`,
  description:
    "IPMAT FAQs answered — exam pattern, marking, cutoffs & selection, eligibility, admission and preparation for IIM Indore, Rohtak and JIPMAT.",
  path: "/faq/ipmat",
});

export default function Page() {
  return (
    <FaqHub
      vertical="IPMAT"
      faqs={ipmatFaqs}
      hubHref="/ipmat"
      courseHref="/courses/ipmat"
    />
  );
}
