# CODE-MAP — `lpt-launchpad-main`

> Snapshot of the current codebase as of this writing. Reference for all future SOP build phases.
> **Scope of current code:** a single-page marketing landing page. The SOP (`docs/SOP-spec.md`) describes a much larger multi-route CUET/IPMAT site that does **not** exist yet — this app is the visual/brand starting point, not the SOP architecture.

---

## 1. Stack & tooling

| Concern | Choice |
|---|---|
| Framework | **TanStack Start** (SSR) + **TanStack Router** (file-based) + **TanStack Query** |
| UI runtime | **React 19**, TypeScript 5.8, strict | 
| Build | **Vite 8** (`vite dev` / `vite build` / `vite build --mode development` / `vite preview`) |
| Styling | **Tailwind CSS v4** (config-in-CSS via `@theme`, no `tailwind.config.js`) + `tw-animate-css` |
| Components | **shadcn/ui** (Radix primitives) — 46 files in `src/components/ui/` |
| Icons | `lucide-react` |
| Toasts | `sonner` (wrapped in `ui/sonner.tsx`) |
| Forms (available, mostly unused) | `react-hook-form` + `zod` + `@hookform/resolvers` |
| Server runtime | Nitro 3 beta (via TanStack Start) |
| Path alias | `@/` → `/src` (set in both `vite.config.ts` and `tsconfig.json`) |
| Lint/format | ESLint 9 (flat config) + Prettier |

**Scripts:** `dev`, `build`, `build:dev`, `preview`, `lint`, `format`.

---

## 2. Entry points & routing

| File | Role |
|---|---|
| `index.html` | Static shell; mounts `#root`, loads `/src/main.tsx`. Title: "LPT — India's Top Coaching". |
| `src/main.tsx` | Client entry. Creates `QueryClient`, `createRouter({ routeTree, defaultPreload: 'intent' })`, renders inside `<StrictMode>` + `<QueryClientProvider>`. Guards on `rootElement.innerHTML` (hydration-safe). |
| `src/router.tsx` | `getRouter()` factory for SSR — separate `QueryClient`, `scrollRestoration: true`, `defaultPreloadStaleTime: 0`. |
| `src/routeTree.gen.ts` | **Auto-generated** by `@tanstack/router-plugin`. Never hand-edit. |
| `src/routes/__root.tsx` | App shell + `<head>` (SEO meta + Google Fonts), 404 (`NotFoundComponent`), error boundary (`ErrorComponent`), `RootShell` (html/body + `<Scripts>`), `RootComponent` (wraps `<Outlet/>` in `QueryClientProvider`). Root context typed `{ queryClient: QueryClient }`. |
| `src/routes/index.tsx` | The **only content route** (`/`). Composes all LPT sections + modals. Holds `signIn`/`enquiry` modal state; `book()` opens the enquiry modal. |
| `src/routes/README.md` | TanStack file-routing conventions cheat-sheet. |

**Server/error infra:** `src/server.ts` (fetch handler, normalizes h3-swallowed SSR 500s → `renderErrorPage()`), `src/start.ts` (`createStart` + error middleware), `src/lib/error-capture.ts` (out-of-band error capture, 5s TTL), `src/lib/error-page.ts` (static HTML error page).

**Routing note for SOP phases:** new pages = new `.tsx` files under `src/routes/` (e.g. `src/routes/cuet/index.tsx` → `/cuet/`). Dynamic = `$param.tsx`, optional = `{-$param}.tsx`, splat = `$.tsx`. `routeTree.gen.ts` regenerates automatically. Currently there is **no** `/cuet`, `/ipmat`, `/courses`, `/centres`, `/faq` etc. — all SOP routes are greenfield.

---

## 3. Design tokens (from `src/styles.css`)

Tailwind v4 `@theme inline` + `:root` custom properties. **Brand = confident red on warm cream/white.**

### Brand palette
| Token | Value | Use |
|---|---|---|
| `--brand` | `#DA202F` | primary brand red |
| `--brand-dark` | `#A8121F` | hover/pressed red |
| `--brand-wash` | `#FFF5F5` | faint red hover bg |
| `--cream` | `#FFEED7` | warm panel bg |
| `--cream-soft` | `#FDF6EC` | alternating section bg |
| `--ink` | `#16181D` | headings/near-black text |
| `--body` | `#5A5F6B` | body text |
| `--hairline` | `#ECECEC` | borders/dividers (default border color for `*`) |

> Note: many components also hardcode `#DA202F`, `#0F1015` (dark bars/footer), `#FDF6EC`, `#FFEED7`, `#DE2B3A` directly rather than via tokens — watch for drift.

### shadcn tokens (retuned for LPT, OKLCH)
`--background`, `--foreground`, `--card`, `--popover`, `--primary` (= brand red `oklch(0.58 0.21 24)`), `--secondary`, `--muted`, `--accent`, `--destructive` (= brand red), `--border`, `--input`, `--ring`. `--radius: 0.75rem` with `-sm/-md/-lg/-xl/-2xl/-3xl/-4xl` derivations.

### Typography
- `--font-display`: **Plus Jakarta Sans** (headings; weights 500–800)
- `--font-sans`: **Inter** (body; 400–700)
- **Caveat** (cursive accent, e.g. Hero "Why")
- Loaded via Google Fonts `<link>` in `__root.tsx`. Headings get `letter-spacing: -0.02em`, weight 700.

### Shadows
`--shadow-soft`, `--shadow-lift` (hover), `--shadow-red` (brand glow).

### Custom utilities (defined with `@utility` — use these, don't re-roll)
| Utility | Purpose |
|---|---|
| `container-lpt` | max-width 1200px, centered, 1.5rem inline padding — **the standard page container** |
| `eyebrow` | uppercase brand-red label with a leading dash; section kicker |
| `h-display` | display font + tight tracking for big headings |
| `text-body` | body color + 1.65 line-height |
| `lift-card` | soft shadow + translateY(-6px) lift on hover |
| `btn-primary` | pill, brand-red fill, white text, red glow, arrow nudge on hover |
| `btn-secondary` | pill, white bg, brand-red border/text, inverts on hover |
| `btn-pill` | small neutral pill, brand hover |
| `icon-bubble` | 56px cream circle with brand-red icon |
| `nav-link` | nav item with animated underline |
| `reveal` | opacity/translate hidden → `.in` reveals (paired with `Reveal` component) |
| `marquee-track` | infinite horizontal scroll (40s), pauses on hover |
| `dot-grid` | subtle radial-dot background |
| `fade-up` | keyframe entrance animation |

Keyframes: `lpt-marquee`, `lpt-fade-up`. Base layer sets `scroll-behavior: smooth`, `overflow-x: hidden`, flex-column `#root` with `min-height: 100vh`.

---

## 4. LPT components (`src/components/lpt/`) — the actual page

Order on the homepage (from `routes/index.tsx`): `Navbar` → `Hero` → `Categories` → `Results` → `WhyLPT` → `TrackRecord` → `MockAndMaterial` → `Scholarship` → `VideoTestimonials` → `Reviews` → `CounsellingCTA` → `Mentors` → `Blog` → `SupportYoutubeTelegram` → `Footer` → `MobileCTA` + modals (`SignInModal`, `EnquiryModal`, `PromoModal`) + `Toaster`.

| Component | What it is | Props / state | Notes |
|---|---|---|---|
| `Navbar.tsx` | Sticky top nav + mega-menu + mobile drawer | `onBook`, `onSignIn` | Mega-menu data hardcoded (`megaContent`: ipm/cuet/cat/resources). Scroll-aware bg. Renders `UtilityBar`. **Contains CAT menu items — SOP forbids CAT.** |
| `UtilityBar.tsx` | Top dark strip: promo + phone numbers + helpdesk | — | Phone numbers hardcoded (IPM/CAT). |
| `Hero.tsx` | Hero: badge, headline, stats, image card | `onBook` | Stats (150K+, 100+ IIM, 30+ centres) hardcoded. Uses `hero-1.jpg`. |
| `Categories.tsx` | 3 program cards (IPM/BBA, CUET, CAT/MBA) | — | `programs` array hardcoded; CUET is "featured". **Includes CAT.** |
| `Results.tsx` | Tabbed toppers + animated stat cards | local `tab` state | `data` per tab hardcoded (IPM/CAT/CUET). Uses `CountUp`. Tabs include CAT/MBA. |
| `WhyLPT.tsx` | Bento "why us" grid (hero card + pillars) | — | `pillars` hardcoded. |
| `TrackRecord.tsx` | Cream panel, 4 bento stats | `onBook` | `CountUp` stats hardcoded. |
| `MockAndMaterial.tsx` | Mock-test list + CSS-art book composition | — | `tests`/`material` hardcoded; elaborate pure-CSS 3D book. |
| `Scholarship.tsx` | Cream CTA panel, scholarship stats | — | Uses `scholarship.png`. |
| `VideoTestimonials.tsx` | Marquee of video cards + YouTube modal | local `open` state | All `vids` use placeholder YouTube id `dQw4w9WgXcQ`. |
| `Reviews.tsx` | Single-quote carousel | local `i` index | `reviews` hardcoded; prev/next. |
| `CounsellingCTA.tsx` | Full-width red gradient CTA | `onBook` | — |
| `Mentors.tsx` | Faculty carousel (4 visible, slide) | local `start` state | `mentors` hardcoded; transform-based slider. |
| `Blog.tsx` | 3 article cards | — | `posts` hardcoded; uses `blog-1/2/3.jpg`. |
| `SupportYoutubeTelegram.tsx` | 3 stacked sections: support desks + YouTube channels + Telegram | — | `desks`/`channels` hardcoded; uses `telegram-phone.png`. |
| `Footer.tsx` | Dark footer: links, contact NAP, SEO city clusters, socials | — | NAP + SEO clusters hardcoded (Jaipur HQ — **not the Delhi-NCR NAP from SOP §E1**). `new Date().getFullYear()`. |
| `MobileCTA.tsx` | Fixed bottom "Book Free Demo" bar (mobile) | `onBook` | — |

### Reusable LPT helpers (use these in new pages)
| Helper | Export | Purpose |
|---|---|---|
| `shared.tsx` | `Eyebrow`, `SectionHeader` | `SectionHeader({ eyebrow, title, subtitle, align: "center"\|"left", action })` — the standard section heading. |
| `Reveal.tsx` | `Reveal`, `CountUp` | `Reveal({ children, delay, className })` — IntersectionObserver scroll-in wrapper. `CountUp({ to, suffix, duration })` — animated counter on scroll-in. |
| `Modal.tsx` | `Modal` | `Modal({ open, onClose, children, size: "sm"\|"md"\|"lg" })` — accessible overlay (Esc to close, body scroll lock, backdrop click, close button). Base for all modals. |

### Modals
| Modal | Props | Behavior |
|---|---|---|
| `SignInModal.tsx` | `open`, `onClose` | Two-step phone → OTP (6 boxes). Toast feedback. **No real auth backend** — UI only. |
| `EnquiryModal.tsx` | `open`, `onClose` | Two-panel counselling form (name/email/phone/city/student-of/state) → OTP step. Conditional fields by "student of". **No backend submit.** |
| `PromoModal.tsx` | `onBook` | Self-managing; auto-opens after 3.5s (per mount, no persistence — re-shows every load). Scholarship/LSAT promo. |

---

## 5. shadcn/ui library (`src/components/ui/`)

46 standard shadcn primitives present (Radix-backed). Available but **mostly unused** by the current landing page (the LPT components use raw markup + custom utilities instead). Inventory:

`accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toggle, toggle-group, tooltip`.

- `button.tsx` — `cva` variants: `default | destructive | outline | secondary | ghost | link`; sizes `default | sm | lg | icon`; supports `asChild` (Radix `Slot`). Uses `--primary` (brand red).
- `sonner.tsx` — themed `Toaster` wrapper; mounted in `routes/index.tsx` as `position="top-center"`.
- `cn()` helper in `src/lib/utils.ts` = `twMerge(clsx(...))` — class-merge utility used throughout shadcn components.

> For SOP `breadcrumb`, `table`, `accordion` (FAQ), `tabs`, `dialog` etc., these shadcn primitives already exist and can be adopted — but note the SOP requires **server-rendered, semantic HTML** (`<nav class="breadcrumb">`, `<table>`, `<section class="faq">` with answers in raw HTML), so plain semantic markup may be preferable to JS-driven Radix components for AEO/GEO compliance.

---

## 6. Assets (`src/assets/`)
Photos/images imported via `@/assets/...` (Vite-hashed): `hero-1/2/3.jpg`, `cat-cat/cuet/ipm.jpg`, `mentor-1..4.jpg`, `blog-1..3.jpg`, `scholarship.png`, `telegram-phone.png`. Public: `public/logo.svg`.

---

## 7. Gaps vs the SOP (for planning, not action now)

The current app is brand/visual scaffolding only. Notable deltas from `docs/SOP-spec.md`:
1. **CAT references throughout** (Navbar, Categories, Results, UtilityBar) — SOP is CUET + IPMAT only, **no CAT**.
2. **Wrong NAP** — Footer/UtilityBar show a Jaipur address & generic phones; SOP §E1 mandates the 4 Delhi-NCR centres with byte-identical NAP.
3. **No routes** for `/cuet`, `/ipmat`, `/courses`, `/centres`, `/faq`, `/blog`, `/faculty`, datasets, etc. (Appendix H inventory is entirely unbuilt).
4. **No schema/JSON-LD, no robots.txt/llms.txt/sitemap, no breadcrumb/anchor-TOC/Article/Dataset markup.**
5. **No datasets** (CUET cutoff / institution / syllabus).
6. **All content hardcoded & largely placeholder** (fabricated stats, `dQw4w9WgXcQ` videos) — SOP forbids fabricated data; everything must be real/verified.
7. **Modals have no backend** — forms/OTP are UI stubs.
8. **Domain/brand mismatch** — title says "India's Top Coaching"; SOP brand is "Law Prep Tutorial Delhi-NCR" @ `lptdelhincr.com`.

These are observations to inform later phases; **no app code was changed in this step.**
