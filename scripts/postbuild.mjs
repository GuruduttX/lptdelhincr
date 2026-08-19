#!/usr/bin/env node
/**
 * Postbuild — reshape Next's static export into the layout this site ships.
 *
 * `next build` (output: "export") writes flat files: out/about.html,
 * out/cuet/cutoff.html. The site has always been deployed as directory-style
 * pages — /about/index.html — so that a plain static host serves
 * https://lptdelhincr.com/about with no trailing slash and no .html suffix,
 * matching the self-referencing canonicals (SOP A1.2).
 *
 * This converts every `X.html` (except the root index) into `X/index.html`,
 * then publishes the result to:
 *   dist/         — the deploy directory
 *   dist/client/  — where scripts/audit.py reads the prerendered HTML
 */
import { cp, mkdir, readdir, rename, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const OUT = "out";
const DIST = "dist";

/** Recursively turn `dir/name.html` into `dir/name/index.html`. */
async function foldHtmlIntoDirectories(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // _next holds hashed build assets, never pages.
      if (entry.name === "_next") continue;
      await foldHtmlIntoDirectories(full);
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    // out/index.html is already the root page; 404.html must stay a bare file
    // so static hosts can find it.
    if (entry.name === "index.html" || entry.name === "404.html") continue;

    const target = full.slice(0, -".html".length);
    await mkdir(target, { recursive: true });
    await rename(full, path.join(target, "index.html"));
  }
}

async function main() {
  if (!existsSync(OUT)) {
    console.error(`[postbuild] ${OUT}/ not found — did \`next build\` run?`);
    process.exit(1);
  }

  await foldHtmlIntoDirectories(OUT);

  await rm(DIST, { recursive: true, force: true });
  await cp(OUT, DIST, { recursive: true });
  // audit.py reads dist/client — keep that path populated.
  await cp(OUT, path.join(DIST, "client"), { recursive: true });

  const pages = await countHtml(DIST, path.join(DIST, "client"));
  console.log(
    `[postbuild] ${pages} pages published to ${DIST}/ (and ${DIST}/client/)`,
  );
}

async function countHtml(dir, skip) {
  let n = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (full === skip) continue;
    if (entry.isDirectory()) n += await countHtml(full, skip);
    else if (entry.name.endsWith(".html")) n += 1;
  }
  return n;
}

await main();
