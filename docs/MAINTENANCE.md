# Maintenance & Measurement — Law Prep Tutorial Delhi-NCR

Operating manual for keeping the site fresh, accurate and citable (SOP **D4** maintenance cadence + **D3** publishing gate). The guiding rule from every phase still holds: **never fabricate** — perishable values come from `src/data/*`, estimates are labelled, and a page that can't be backed by verified data is not published.

---

## 1. The golden rule: one dataset update propagates everywhere

Perishable values are **never hardcoded in pages**. They live in typed datasets under `src/data/` and are read by routes + the programmatic generator. Update the dataset once and every consuming page + the sitemap update on the next build.

| Dataset (`src/data/`) | Powers | Update when |
|---|---|---|
| `cutoffs.ts` (T-CUTOFF-CUET) | CUET cutoff hub, dataset page, cutoff-by-course, colleges-for-band, predictor | each CSAS cycle |
| `colleges.ts` (T-COLLEGE-CUET) | college profiles, best-for, colleges hub | when verified |
| `institutions.ts` (T-INSTITUTION) | IPM institute profiles | when verified |
| `fees.ts` (T-FEES) | IPM fees pages, ROI | each cycle |
| `placements.ts` (T-PLACEMENT) | IPM placements (official CTC only) | on official report |
| `ipmat.ts` (exam/cutoff/composite) | exam, marking-scheme, cutoff, composite | each cycle (verify iimidr/iimrohtak) |
| `syllabus.ts` (T-SYLLABUS) | syllabus hubs; subject/learning-unit pages (deferred routes) | when verified |
| `dates.ts` (T-IMPORTANT-DATES) | CUET/IPMAT admission & important-dates | each cycle |
| `marksPercentile.ts` (T-MARKS-PCTILE) | marks-vs-percentile, score calculator | each cycle (estimate) |
| `examCenters.ts` | CUET exam-city pages | when NTA list verified |
| `faqs.ts` | FAQ hubs + vertical FAQ | ongoing |
| `posts.ts` | /blog, /blog/[slug], /[exam]/news/[slug] | weekly in-season |

**Flip `illustrative: false` (and fill required fields) → the page emits automatically.** Nothing else to wire (see §4).

---

## 2. Cadence (SOP D4)

- **Each cycle / mid-season** — refresh perishable data (dates, pattern, cutoffs, fees, eligibility) by editing the relevant dataset. Bump `LAST_UPDATED` / `LAST_UPDATED_DISPLAY` in `src/config/site.ts` so Article/Dataset `dateModified` and "Last updated" labels move. Re-run `npm run gate`.
- **Weekly (in-season)** — publish a dated, sourced **NewsArticle** by adding a `type: "news"` row to `posts.ts` (it emits at `/[exam]/news/[slug]` and enters `sitemap-news.xml`). Post the same update to the Google Business Profiles (4 centres). Keep `/cuet/changes` current.
- **Monthly** — run the **LLM-citation test** on top BOFU questions (see §3). Close gaps with dataset rows + direct-answer blocks. Content-refresh underperformers (often beats new content for ROI).
- **Always** — keep evergreen concept pages stable; only perishable blocks change. Don't churn URLs or titles without reason.

---

## 3. Monthly LLM-citation test (BOFU)

Ask the top bottom-of-funnel questions in the major assistants/AI Overviews and check whether `lptdelhincr.com` is cited; log gaps and fix the source page.

Seed question set (expand over time):
1. "DU CUET cutoff for [college] [course] [category]" → `/cuet/cutoff/*`
2. "How are CUET cutoffs decided / does NTA release them?" → `/cuet/cutoff/how-cutoffs-work`
3. "Does IPMAT have negative marking? / IIM Indore sectional lock" → `/ipmat/marking-scheme`
4. "CUET college predictor by percentile" → `/cuet/results/college-predictor`
5. "IPM vs BBA / is IPMAT worth it" → `/ipmat/compare/*`, `/ipmat/worth-it`
6. "CUET coaching in Noida / Hauz Khas / GTB Nagar / Gurugram" → local landings + `/centres/*`

For each miss: confirm the page has a 40–60-word direct answer to the exact question, a GEO asset (table/stat), correct schema, and is in the sitemap. Add a verified dataset row if the gap is data-shaped.

---

## 4. How the generators scale (SOP H7 — no thin spawns)

`src/lib/programmatic.ts` is the single registry. Each pattern emits a URL **only** for a real, non-illustrative row (or a curated evergreen item). Today most dataset-gated patterns emit 0 — intended.

- **Add real data** → `npm run build` prints the per-pattern `[H7]` line (`rows → emitted / skipped`) and the new page prerenders.
- **Prerender list**: `vite.config.ts` spreads `programmaticEmittedPaths()`, so emitted pages are picked up with no manual edit.
- **Sitemaps**: `npm run sitemaps` (`scripts/gen-sitemaps.mjs`) regenerates `public/sitemap*.xml`. The dataset-gated programmatic paths are added there as they go live (keep the script's lists in step with `programmatic.ts`; the gated paths are 0 until data lands).
- **Deferred routes**: subject pages (`/cuet/[subject]/{6}`) and learning units (`/[exam]/[section]/[topic]`) have generators but no route file yet (a dynamic `/[exam]/[seg]` would shadow literal children). Build those route files when real syllabus rows exist.

---

## 5. The publishing gate (run before anything goes live)

```bash
npm run gate     # = npm run build && python3 scripts/audit.py
```

`scripts/audit.py` runs the **whole-site D3 gate** over `dist/client` (python3, because shell `grep` is unreliable on the minified single-line HTML). It checks, across every prerendered page:

1. No `{{TOKEN}}` leaks in rendered HTML (the `$tsr` hydration blob is excluded by design)
2. No CAT/MBA/XAT/NMAT/SNAP references
3. Exactly one self-referencing canonical in `<head>`
4. Title ≤60 (single brand) / meta ≤155
5. H1 + JSON-LD on every page; direct-answer block on content pages
6. No dead internal links
7. No orphan pages
8. No FAQPage/AggregateRating on Article/blog pages; FAQPage only on FAQ hubs
9. Blog schema on `/blog`, Article on blog posts, NewsArticle on news posts
10. `sitemap-news.xml` present and referenced in the index; carries `/blog` and `/news`
11. NTA exam-city slugs (`/cuet/exam-centers/[city]`) distinct from LPT coaching `/centres/[area]`

A non-zero exit means a gate failed — fix before publishing. Extend the seed/sample lists in `audit.py` as new page types ship.

---

## 6. Still blocking publish (NEEDS-REAL-DATA)

See the header of `src/config/site.ts` and the `illustrative`/`{{…}}` flags in `src/data/*`. Until replaced with verified values, the corresponding pages render clearly-marked placeholders and dataset-gated programmatic pages stay unemitted. Key items: brand phone/WhatsApp/GST/founding-year/social URLs; per-centre phone/maps/geo; all cutoff/college/fee/placement/institution datasets; perishable dates; faculty profiles (Article author currently falls back to the Organization). News posts: none seeded — add real dated, sourced rows.
