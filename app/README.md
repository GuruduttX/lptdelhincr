# Routes (Next.js App Router)

Every page lives in `app/` as a directory containing `page.tsx`. The directory
path **is** the URL. `app/layout.tsx` is the single app shell — it wraps every
page with `<SiteChrome>` (nav, footer, modals, toaster) and emits the global
Organization JSON-LD.

## Conventions

| Path | URL |
| --- | --- |
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/cuet/cutoff/page.tsx` | `/cuet/cutoff` |
| `app/blog/[slug]/page.tsx` | `/blog/:slug` (dynamic — square brackets) |
| `app/layout.tsx` | app shell — wraps every page |
| `app/not-found.tsx` | 404 page |
| `app/error.tsx` | error boundary (must be a client component) |

## Writing a page

A page is a **server component** by default. Export `metadata` (or
`generateMetadata` for dynamic routes) and a default component:

```tsx
import type { Metadata } from "next";
import { pageHead } from "@/lib/head";

export const metadata: Metadata = pageHead({
  title: `CUET Eligibility | ${BRAND_SHORT}`,
  description: "…", // ≤155 chars
  path: "/cuet/eligibility",
});

export default function Page() {
  return <ContentPage canonicalPath="/cuet/eligibility" …>…</ContentPage>;
}
```

`pageHead()` builds the title/description/OG tags (SOP A1.2, B3). The
self-referencing `<link rel="canonical">` is emitted separately by the
`<Canonical>` component, which `ContentPage`/`HubPage` render from
`canonicalPath` — exactly one per page.

## Dynamic routes

The build is a **static export**, so every dynamic route must declare the exact
set of URLs it publishes via `generateStaticParams()`. Always source those from
`@/lib/static-params`, never inline — that module applies the same SOP H7
publishability gates as `@/lib/programmatic`, so a page can never be emitted for
a row the registry would skip.

```tsx
import { blogParams } from "@/lib/static-params";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogParams();
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> { … }

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params; // params is a Promise in Next 15+
  …
}
```

A dynamic route whose params list is currently empty cannot live here — static
export fails the build on it. Those pages are parked in `src/routes-pending/`;
see the README there.

## Interactive pages

`metadata` can only be exported from a server component, so a page that needs
hooks or event handlers is split in two: `page.tsx` (server — exports
`metadata`, renders `<Content />`) and `content.tsx` (`"use client"` — the
interactive component). See `app/contact/` for the pattern.

## Build

```bash
npm run build   # H7 report → next build (static export) → dist/ + dist/client/
npm run gate    # build + scripts/audit.py publishing gates
```
