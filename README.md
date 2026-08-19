# lptdelhincr.com

Next.js (App Router) compiled to **static HTML**. There are no API routes, no
middleware, no server actions — `next build` with `output: "export"` writes
every page as a finished file, and `scripts/postbuild.mjs` reshapes the export
into the directory layout the site ships (`/cuet/cutoff/index.html`) and puts it
in `dist/`.

The consequence worth remembering: **the live site does not run Node.** It is
files in `public_html`, served by Apache/LiteSpeed under `public/.htaccess`.

## Commands

| Command           | What it does                                             |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Dev server on http://localhost:3000                      |
| `npm run build`   | H7 report → static export → `dist/` (the deploy tree)    |
| `npm run preview` | Serve the built `dist/` locally, exactly as it will ship |
| `npm run package` | Zip `dist/` for a hand upload through hPanel             |
| `npm run lint`    | ESLint                                                   |

`npm run build` refuses to publish a broken tree: it fails if `index.html`,
`404.html`, `.htaccess`, `sitemap.xml` or `robots.txt` are missing, or if the
page count collapses below 100.

## Deploying

### Do not use Hostinger's Next.js deployment

hPanel's **Deployment from source files** with _Framework: Next.js_ cannot ship
this site, and the failure is not a bug in the repo:

1. It moves `next.config.mjs` aside (leaving a `<hash>.next.config.mjs` backup)
   and substitutes its own with `output: "standalone"`.
2. So the build produces `.next/standalone` — a Node server app — and never
   writes `out/`. `postbuild` then correctly refuses to publish, and the
   deployment is reported as `Failed to build the application`.
3. Even if the export were forced back on, that pipeline boots a `server.js`
   a static export does not contain. It is the wrong runtime for this site.

That build box is also on glibc < 2.29, so Next falls back to the WASM compiler
— slow and memory-hungry — which is a second reason not to build there.

**In hPanel, remove or disable the Next.js deployment for this domain** so it
stops overwriting `public_html` and stops routing the domain at a Node process.
Then use one of the two paths below.

### Path 1 — push to `main` (automatic)

`.github/workflows/deploy.yml` builds on an Ubuntu runner and mirrors `dist/`
into `public_html` over FTPS. One-time setup, under
**GitHub → Settings → Secrets and variables → Actions**:

| Secret     | Value                                           |
| ---------- | ----------------------------------------------- |
| `FTP_HOST` | FTP hostname from hPanel → Files → FTP Accounts |
| `FTP_USER` | FTP username from the same page                 |
| `FTP_PASS` | That account's password                         |
| `FTP_DIR`  | Target directory — normally `/public_html`      |

After that every push to `main` deploys, and **Actions → Deploy to Hostinger →
Run workflow** re-deploys on demand. The upload uses `mirror --delete`, so the
server ends up an exact copy of `dist/`; pages you delete really disappear.
`.well-known/` is left alone because Hostinger keeps SSL validation files there.

### Path 2 — build here, upload by hand

```bash
npm run build
npm run package
```

That writes `lptdelhincr-dist.zip` (the _contents_ of `dist/`, dotfiles
included). Then in hPanel → File Manager → `public_html`: upload the zip,
extract it there, delete the zip. `index.html` must end up at the root of
`public_html`, not inside a subfolder.

### Checking a deploy

- `https://lptdelhincr.com/cuet/cutoff` must return **200**, not a 301 to a
  trailing-slash URL. A 301 means `.htaccess` did not make it up.
- A random deep page such as `/ipmat/syllabus/verbal-ability` must render with
  JavaScript disabled.
