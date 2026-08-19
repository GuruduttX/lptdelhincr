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

/**
 * Name the cause that actually happens, instead of leaving a generic "export
 * missing" for someone to re-diagnose.
 *
 * A managed Next.js host — hPanel's "Deployment from source files" with
 * Framework: Next.js is the one that bit us — sets the project's config aside
 * as `<hash>.next.config.mjs`, drops in its own with `output: "standalone"`,
 * and builds a Node server app. That build succeeds; it just writes
 * `.next/standalone` instead of `out/`, so there is no export to publish.
 *
 * There is no repo-side fix for it. Even with the export forced back on, that
 * pipeline boots a `server.js` a static export does not contain. This site is
 * static HTML with no API routes and no middleware, so it has to be deployed
 * as plain files. See README.md → Deploying.
 */
function explainMissingExport() {
  const next = path.join(ROOT, ".next");
  const builtServerApp =
    existsSync(path.join(next, "standalone")) ||
    existsSync(path.join(next, "required-server-files.json"));

  let displacedConfigs = [];
  try {
    // Our own next.config.mjs does not match: the pattern needs a name in
    // front of the dot.
    displacedConfigs = readdirSync(ROOT).filter((f) => /.\.next\.config\.(mjs|js)$/.test(f));
  } catch {
    // An unreadable root is already reported by diagnose().
  }

  if (!builtServerApp && !displacedConfigs.length) {
    console.error(
      "[postbuild] `next build` reported success, so either output:'export' " +
        "is not active in next.config.mjs, or the export was written elsewhere.",
    );
    return;
  }

  console.error("");
  console.error("[postbuild] cause: this build ran in SERVER mode, not static-export mode.");
  if (builtServerApp) {
    console.error("[postbuild]   .next/standalone exists — that is an output:'standalone' build.");
  }
  if (displacedConfigs.length) {
    console.error(`[postbuild]   the host set our config aside as: ${displacedConfigs.join(", ")}`);
  }
  console.error("[postbuild]   next.config.mjs here asks for output:'export'; it was replaced.");
  console.error("");
  console.error("[postbuild] fix: do not build this site on a managed Next.js host.");
  console.error("[postbuild]   It has no API routes and no middleware — it is static HTML.");
  console.error("[postbuild]   Build it locally or in CI, then upload dist/ to public_html.");
  console.error("[postbuild]   Steps: README.md → Deploying.");
}

async function main() {
  if (!existsSync(OUT)) {
    console.error("[postbuild] static export not found.");
    diagnose();
    explainMissingExport();
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
