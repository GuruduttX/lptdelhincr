import type { Metadata } from "next";
import { pageHead } from "@/lib/head";
import { BRAND_SHORT } from "@/config/site";
import Content from "./content";

export const metadata: Metadata = pageHead({
  title: `CUET Score Calculator (Estimate) | ${BRAND_SHORT}`,
  description:
    "Free CUET score calculator — enter your score percentage for an estimated percentile band. Estimate only; confirm on your official scorecard.",
  path: "/cuet/results/score-calculator",
});

export default function Page() {
  return <Content />;
}
