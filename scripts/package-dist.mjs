#!/usr/bin/env node
/**
 * Package `dist/` as a zip for a hand upload through hPanel → File Manager.
 *
 * The deploy tree is ~175 directories; uploading it file by file is slow and
 * half-finishes. One zip, extracted into public_html, lands the whole site at
 * once. CI uploads over FTPS instead (.github/workflows/deploy.yml) — this is
 * the manual path, for when you just want the site live now.
 *
 * The archive holds the CONTENTS of dist/, not dist/ itself, so extracting it
 * inside public_html puts index.html at the web root.
 *
 * Deliberately not PowerShell's Compress-Archive: on Windows PowerShell 5.1 it
 * writes entry names with backslashes ("about\index.html"), which the zip spec
 * forbids and which Linux extractors turn into flat files with backslashes in
 * the name rather than a directory tree. bsdtar (System32\tar.exe on Windows 10
 * 1803+, and the default tar on macOS) and Info-ZIP both write conformant names.
 *
 * Run: npm run package
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const ZIP = path.join(ROOT, "lptdelhincr-dist.zip");

// .htaccess is the whole reason extensionless URLs work; an archiver that drops
// dotfiles would publish a site where every page 301s off its own canonical.
const MUST_CONTAIN = ["index.html", "404.html", ".htaccess", "robots.txt", "sitemap.xml"];

/** Read the real entry names out of a zip's central directory. */
function zipEntryNames(file) {
  const buf = readFileSync(file);

  // End-of-central-directory record: PK\5\6, near the end. dist/ carries no
  // archive comment, so a short backward scan reaches it.
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i > buf.length - 66_000; i -= 1) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("not a zip file — no end-of-central-directory record");

  const count = buf.readUInt16LE(eocd + 10);
  let at = buf.readUInt32LE(eocd + 16);
  const names = [];

  for (let i = 0; i < count; i += 1) {
    if (buf.readUInt32LE(at) !== 0x02014b50) throw new Error(`central directory cut off at ${i}`);
    const nameLen = buf.readUInt16LE(at + 28);
    const extraLen = buf.readUInt16LE(at + 30);
    const commentLen = buf.readUInt16LE(at + 32);
    names.push(buf.toString("utf8", at + 46, at + 46 + nameLen));
    at += 46 + nameLen + extraLen + commentLen;
  }

  return names;
}

/** Refuse to hand over an archive that would extract into a broken site. */
function verifyArchive(names) {
  const backslashed = names.filter((n) => n.includes("\\"));
  if (backslashed.length) {
    return (
      `${backslashed.length} entries use backslash separators (e.g. ${backslashed[0]}) — ` +
      "extracting this would produce flat files, not folders"
    );
  }

  const missing = MUST_CONTAIN.filter((f) => !names.includes(f));
  if (missing.length) return `not in the archive root: ${missing.join(", ")}`;

  const pages = names.filter((n) => n.endsWith(".html")).length;
  if (pages < 100) return `only ${pages} pages in the archive, expected 100+`;

  return null;
}

async function main() {
  if (!existsSync(DIST)) {
    console.error("[package] dist/ not found — run `npm run build` first.");
    process.exit(1);
  }

  await rm(ZIP, { force: true });

  // Naming the children explicitly (rather than ".") keeps entries as
  // "about/index.html" with no "./" prefix, and picks up dotfiles.
  const children = readdirSync(DIST);
  const run = (cmd, args) =>
    execFileSync(cmd, args, { cwd: DIST, stdio: ["ignore", "inherit", "inherit"] });
  const bsdtarArgs = ["--format=zip", "-c", "-f", ZIP, ...children];

  try {
    if (process.platform === "win32") {
      const tar = path.join(process.env.SystemRoot ?? "C:\\Windows", "System32", "tar.exe");
      run(tar, bsdtarArgs);
    } else {
      try {
        run("zip", ["-r", "-q", ZIP, ...children]);
      } catch {
        // macOS ships no Info-ZIP by default, but its tar is bsdtar.
        run("tar", bsdtarArgs);
      }
    }
  } catch (err) {
    console.error(`[package] could not create the archive: ${err.message}`);
    console.error("[package] install a zip tool, or zip dist/'s contents by hand.");
    process.exit(1);
  }

  // Check what actually landed in the archive, not what we asked for.
  const names = zipEntryNames(ZIP);
  const problem = verifyArchive(names);
  if (problem) {
    console.error(`[package] refusing to ship — ${problem}.`);
    await rm(ZIP, { force: true });
    process.exit(1);
  }

  const pages = names.filter((n) => n.endsWith(".html")).length;
  const mb = (statSync(ZIP).size / 1024 / 1024).toFixed(1);
  console.log(`[package] ${path.basename(ZIP)} — ${pages} pages, ${names.length} entries, ${mb} MB`);
  console.log("[package] hPanel → File Manager → public_html → Upload → Extract here.");
}

await main();
