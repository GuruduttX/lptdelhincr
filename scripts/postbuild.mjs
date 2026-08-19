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
 * Publishes to `dist/` — the deploy directory. Nothing but deployable files may
 * live in there: the whole tree is uploaded to public_html, so a second copy of
 * the site inside it would be crawlable duplicate content.
 *
 * Paths resolve from THIS FILE, never from process.cwd(). Hostinger's build
 * runner invokes npm scripts from a different working directory than the one
 * Next uses as its project root, so a relative "out" silently resolved to
 * nothing there and the build failed with `out/ not found` after a successful
 * `next build`.
 */
import { cp, mkdir, readdir, rename, rm } from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "out");
const DIST = path.join(ROOT, "dist");

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

/** Everything needed to tell a missing export apart from a wrong path. */
function diagnose() {
  const ls = (d) => {
    try {
      return readdirSync(d).slice(0, 25).join(" ") || "(empty)";
    } catch {
      return "(does not exist)";
    }
  };
  console.error(`[postbuild] expected export at: ${OUT}`);
  console.error(`[postbuild] project root:       ${ROOT}`);
  console.error(`[postbuild] process.cwd():      ${process.cwd()}`);
  console.error(`[postbuild] contents of root:   ${ls(ROOT)}`);
  console.error(`[postbuild] contents of .next:  ${ls(path.join(ROOT, ".next"))}`);
}

async function main() {
  if (!existsSync(OUT)) {
    console.error("[postbuild] static export not found.");
    diagnose();
    console.error(
      "[postbuild] `next build` reported success, so either output:'export' " +
        "is not active in next.config.mjs, or the export was written elsewhere.",
    );
    process.exit(1);
  }

  await foldHtmlIntoDirectories(OUT);

  await rm(DIST, { recursive: true, force: true });
  await cp(OUT, DIST, { recursive: true });

  const pages = await countHtml(DIST);
  verifyDeployable(pages);
  console.log(`[postbuild] ${pages} pages published to ${DIST}`);
}

/**
 * Refuse to hand a broken tree to the deploy step. A build that half-succeeds
 * is worse than one that fails: it publishes silently. Every check here is
 * something whose absence breaks the live site.
 */
function verifyDeployable(pages) {
  const required = [
    ["index.html", "the home page"],
    ["404.html", "the error page ErrorDocument points at"],
    [".htaccess", "extensionless URLs — without it every page 301s off its canonical"],
    ["sitemap.xml", "the sitemap referenced by robots.txt"],
    ["robots.txt", "crawler directives"],
  ];

  const missing = required.filter(([f]) => !existsSync(path.join(DIST, f)));
  if (missing.length) {
    console.error("[postbuild] refusing to publish — deploy tree is incomplete:");
    for (const [f, why] of missing) console.error(`  missing ${f} — ${why}`);
    process.exit(1);
  }

  // A real build emits ~175 pages. A collapse to a handful means the export
  // silently produced almost nothing.
  const FLOOR = 100;
  if (pages < FLOOR) {
    console.error(
      `[postbuild] refusing to publish — only ${pages} pages found, expected ${FLOOR}+.`,
    );
    process.exit(1);
  }

  // dist/ is uploaded verbatim to public_html; a nested copy of the site would
  // be crawlable duplicate content.
  if (existsSync(path.join(DIST, "client"))) {
    console.error("[postbuild] refusing to publish — dist/client/ would ship a duplicate site.");
    process.exit(1);
  }
}

async function countHtml(dir) {
  let n = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) n += await countHtml(full);
    else if (entry.name.endsWith(".html")) n += 1;
  }
  return n;
}

await main();
