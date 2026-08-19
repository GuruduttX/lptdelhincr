import type { Metadata } from "next";
import { pageHead } from "@/lib/head";
import { BRAND_SHORT } from "@/config/site";
import Content from "./content";

export const metadata: Metadata = pageHead({
  title: `CUET or IPMAT? Exam Selector Quiz | ${BRAND_SHORT}`,
  description:
    "Not sure whether to target CUET or IPMAT? Answer two quick questions for a suggested direction, then read the full comparison. Guidance, not advice.",
  path: "/cuet/compare/quiz",
});

export default function Page() {
  return <Content />;
}
