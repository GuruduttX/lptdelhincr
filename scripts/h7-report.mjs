#!/usr/bin/env node
/**
 * Build-time H7 report — "no thin spawns" visibility.
 *
 * Prints, per programmatic pattern, how many dataset rows exist, how many URLs
 * are emitted, and how many are skipped for failing the publishability gate.
 * vite.config.ts used to print this at config time; `next build` never loads
 * project TypeScript outside the app graph, so it runs as its own build step.
 *
 * Run: node scripts/h7-report.mjs  (wired into `npm run build`)
 */
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const { programmaticReportLines } = await jiti.import("../src/lib/programmatic.ts");

console.log("[build] Programmatic emission (SOP H7 — no thin spawns):");
for (const line of programmaticReportLines()) console.log(line);
