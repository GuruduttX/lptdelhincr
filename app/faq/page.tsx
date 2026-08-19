import type { Metadata } from "next";
import { pageHead } from "@/lib/head";
import { BRAND_SHORT } from "@/config/site";
import Content from "./content";

export const metadata: Metadata = pageHead({
  title: `CUET & IPMAT Master FAQ | ${BRAND_SHORT}`,
  description:
    "Searchable CUET & IPMAT master FAQ — direct, sourced answers on exams, cutoffs, results, eligibility and admission. Filter by vertical or search.",
  path: "/faq",
});

export default function Page() {
  return <Content />;
}
