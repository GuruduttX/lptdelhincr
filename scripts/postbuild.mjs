#!/usr/bin/env node
/**
 * Postbuild — finish whichever build `next build` actually produced.
 *
 * Two shapes reach this script, and both are deployments we support:
 *
 * 1. STATIC EXPORT (our next.config.mjs, `output: "export"`). Next writes flat
 *    files — out/about.html, out/cuet/cutoff.html. The site ships as
 *    directory-style pages — /about/index.html — so a plain static host serves
 *    https://lptdelhincr.com/about with no trailing slash and no .html suffix,
 *    matching the self-referencing canonicals (SOP A1.2). Published to `dist/`.
 *
 * 2. SERVER BUILD (hPanel's Next.js deployment, which substitutes its own
 *    config with `output: "standalone"`). Nothing to publish — the host runs
 *    the app — but the standalone bundle needs assets Next declines to copy.
 *
 * Insisting on shape 1 is what used to break the hPanel deploy: the build
 * succeeded and this script then failed it. Detect, don't assume.
 *
 * `dist/` holds nothing but deployable files: the whole tree goes to
 * public_html, so a second copy of the site inside it would be crawlable
 * duplicate content.
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
 * What did `next build` actually produce?
 *
 * We ask rather than assume, because the config we ship is not always the
 * config that runs. hPanel's Next.js deployment sets next.config.mjs aside as
 * `<hash>.next.config.mjs` (a fresh hash every run) and substitutes its own
 * before building, so the output shape is the host's decision, not ours.
 *
 *   "export"     — out/ exists. Our config: a static site for public_html.
 *   "standalone" — .next/standalone/server.js. The host's `output: "standalone"`.
 *   "server"     — a plain server build, launched with `next start`.
 *   null         — nothing usable.
 */
function detectBuild() {
  const next = path.join(ROOT, ".next");
  if (existsSync(OUT)) return "export";
  if (existsSync(path.join(next, "standalone", "server.js"))) return "standalone";
  if (existsSync(path.join(next, "required-server-files.json"))) return "server";
  return null;
}

/** The host's leftover config backups, which say who changed the build mode. */
function displacedConfigs() {
  try {
    // Our own next.config.mjs does not match: the pattern needs a name in
    // front of the dot.
    return readdirSync(ROOT).filter((f) => /.\.next\.config\.(mjs|js)$/.test(f));
  } catch {
    return []; // An unreadable root is already reported by diagnose().
  }
}

/**
 * Finish a server build that a managed host asked for.
 *
 * hPanel's Next.js deployment replaces next.config.mjs with its own
 * `output: "standalone"` and then runs `node server.js`. That is a legitimate
 * way to serve this site — every page is prerendered either way, and nothing in
 * our config is load-bearing in server mode: the project uses no next/image and
 * no next/font, and `trailingSlash: false` is Next's default, so canonicals stay
 * correct (SOP A1.2).
 *
 * Next does NOT copy `public/` or `.next/static` into the standalone bundle —
 * whoever deploys it has to. Doing it here means the bundle is runnable the
 * moment the build ends, whether the host launches `node server.js` or
 * `next start`. Copying is idempotent, so a host that also does it is harmless.
 */
async function finishServerBuild(mode) {
  if (mode === "standalone") {
    const standalone = path.join(ROOT, ".next", "standalone");
    // .htaccess configures Apache. In a Node bundle it is dead weight that the
    // static handler answers with a 500, so it does not travel with public/.
    const keep = (src) => path.basename(src) !== ".htaccess";
    const copies = [
      [path.join(ROOT, "public"), path.join(standalone, "public"), keep],
      [path.join(ROOT, ".next", "static"), path.join(standalone, ".next", "static")],
    ];
    for (const [from, to, filter] of copies) {
      if (existsSync(from)) await cp(from, to, { recursive: true, filter });
    }
  }

  // Same paranoia as the static path: a build that prerendered almost nothing
  // is a broken deploy, not a successful one.
  const appDir = path.join(ROOT, ".next", "server", "app");
  const pages = existsSync(appDir) ? await countHtml(appDir) : 0;
  const FLOOR = 100;
  if (pages < FLOOR) {
    console.error(
      `[postbuild] refusing to pass a server build with only ${pages} prerendered pages, ` +
        `expected ${FLOOR}+.`,
    );
    process.exit(1);
  }

  const displaced = displacedConfigs();
  console.log(`[postbuild] ${mode} build — ${pages} pages prerendered, served by the host.`);
  if (displaced.length) {
    console.log(`[postbuild] the host is using its own config; ours is ${displaced.join(", ")}.`);
  }
  if (mode === "standalone") {
    console.log("[postbuild] copied public/ and .next/static into .next/standalone.");
  }
  console.log("[postbuild] no dist/ for this mode — nothing to upload, the host runs the app.");
}

async function main() {
  // The host swaps our config for its own, so the build mode is its decision,
  // not ours. Handle whichever shape actually came out.
  const mode = detectBuild();

  if (mode === "standalone" || mode === "server") {
    await finishServerBuild(mode);
    return;
  }

  if (mode === null) {
    console.error("[postbuild] `next build` produced neither a static export nor a server build.");
    diagnose();
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
