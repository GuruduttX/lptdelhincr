# lptdelhincr.com

Next.js (App Router). Every page is prerendered at build time — there are no API
routes, no middleware and no server actions, so all 175 pages are finished HTML
before a single request arrives.

That means the site can be served two different ways, and **both are supported**:

- **As a Node app** — hPanel builds the repo and runs it. This is the default
  when you upload the source zip.
- **As plain files** — `output: "export"` writes the whole site to `dist/`, which
  can be dropped into `public_html` with no Node at all.

`scripts/postbuild.mjs` detects which build actually ran and finishes the job
accordingly, so the same `npm run build` works in both places.

## Commands

| Command           | What it does                                              |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Dev server on http://localhost:3000                        |
| `npm run build`   | H7 report → build → `dist/` (or finishes a server build)   |
| `npm run package` | Build, then zip the finished site for a manual upload      |
| `npm run preview` | Serve the built `dist/` locally, exactly as it will ship   |
| `npm run lint`    | ESLint                                                     |

## Deploying

### Upload the source zip to hPanel (the normal way)

GitHub → **Code → Download ZIP**, then hPanel → **Deployment from source files**
→ upload `lptdelhincr-main.zip`. Framework: **Next.js**. That's it.

Worth knowing what happens, because the build log looks alarming:

1. hPanel sets `next.config.mjs` aside as `<hash>.next.config.mjs` — a fresh
   hash every run — and substitutes its own with `output: "standalone"`.
2. `next build` therefore produces a Node server app in `.next/standalone`
   rather than a static export in `out/`.
3. `postbuild` recognises that, copies `public/` and `.next/static` into the
   standalone bundle — Next does not do this itself, and the app cannot serve
   its own assets without it — and reports success.
4. hPanel runs the app and points the domain at it.

Nothing in our config is load-bearing in that mode: the project uses no
`next/image` and no `next/font`, and `trailingSlash: false` is Next's own
default, so canonicals stay correct (SOP A1.2) and `/cuet/cutoff/` still 308s to
`/cuet/cutoff`.

The build box runs glibc < 2.29, so Next falls back to its WASM compiler and
prints a wall of `Attempted to load @next/swc-linux-x64-gnu` warnings. They are
noise — the build works, it is just slower.

### Or upload the finished site (no build on the server)

```bash
npm run package
```

Writes **`lptdelhincr-site.zip`** — the finished static site, nothing to build.
hPanel → File Manager → `public_html` → upload → extract → delete the zip.
`index.html` must land directly in `public_html`.

This is the faster, cheaper option: no Node process, no cold starts, and
`public/.htaccess` handles extensionless URLs and cache headers. Use it if the
Node deployment ever gives trouble.

### Or deploy on every push

`.github/workflows/deploy.yml` builds on an Ubuntu runner and mirrors `dist/`
into `public_html` over FTPS. Dormant until these secrets exist under
**GitHub → Settings → Secrets and variables → Actions**:

| Secret     | Value                                                          |
| ---------- | -------------------------------------------------------------- |
| `FTP_HOST` | FTP hostname from hPanel → Files → FTP Accounts                 |
| `FTP_USER` | FTP username from the same page                                 |
| `FTP_PASS` | That account's password                                         |
| `FTP_DIR`  | Target directory — normally `/public_html`                      |

Entirely optional.

### Checking a deploy

- `https://lptdelhincr.com/cuet/cutoff` must return **200**, not a 301/308 to a
  trailing-slash URL.
- A deep page such as `/ipmat/syllabus/verbal-ability` must render with
  JavaScript disabled.
