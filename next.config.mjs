/**
 * Next.js config — static export (SSG), the direct replacement for the previous
 * TanStack Start prerender setup. Every route in `app/` is rendered to static
 * HTML at build time so critical content is present with JS disabled (SOP A1).
 *
 * `next build` writes the exported site to `out/`; `scripts/postbuild.mjs` then
 * reshapes it into the directory-style layout the site has always shipped
 * (`/cuet/cutoff/index.html`, not `/cuet/cutoff.html`) and copies it to `dist/`
 * for deployment and `dist/client/` for the D3 auditor.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  // Static export cannot run the on-demand image optimizer.
  images: { unoptimized: true },
  // Canonicals are emitted without a trailing slash (SOP A1.2), so keep Next's
  // internal links matching them.
  trailingSlash: false,
};

export default nextConfig;
