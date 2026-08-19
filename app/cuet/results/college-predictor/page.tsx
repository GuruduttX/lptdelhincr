import type { Metadata } from "next";
import { pageHead } from "@/lib/head";
import { BRAND_SHORT } from "@/config/site";
import Content from "./content";

export const metadata: Metadata = pageHead({
  title: `CUET College Predictor (Estimate) | ${BRAND_SHORT}`,
  description:
    "Free CUET college predictor — estimate a realistic college shortlist from your percentile and category, based on past cutoffs. Estimate only.",
  path: "/cuet/results/college-predictor",
});

export default function Page() {
  return <Content />;
}
