# LPT Delhi-NCR — Complete Website Build SOP (Distilled Spec)

> **Source:** `docs/lptdelhincr-build-SOP.pdf` (33 pages, prepared 15 June 2026, status: Build-ready).
> This markdown is the working reference for all future build phases. It captures **every rule, template, worked example, data-table definition, page-inventory slug, and Definition-of-Done checklist** from the PDF so the PDF never needs re-reading.
>
> **Brand:** Law Prep Tutorial Delhi-NCR · **Domain:** `https://lptdelhincr.com` · **Verticals:** CUET, IPMAT (NO CAT references).
> **Audience of SOP:** the Developer (Part A) and the SEO / Content Writer (Part B). Part C = clone-ready example pages. Part D = workflow + QA gate.

---

## ⚠️ Cardinal honesty rule (applies everywhere)
Everything is copy-paste. Fill `{{TOKENS}}` and `[ILLUSTRATIVE]` rows with **real, verified data**. **Never invent numbers, reviews, results, or credentials.** Re-verify perishable figures (dates, pattern, cutoffs, fees, eligibility) against official sources before publishing:
- CUET → `cuet.nta.nic.in`
- IPMAT → `iimidr.ac.in`, `iimrohtak.ac.in`, official JIPMAT portal

If a value isn't verified → **omit it**. No fabricated data/reviews/results. No CAT references anywhere.

---

## 0. GLOBAL TOKENS (set once in a config file, reuse everywhere)

| Token | Value |
|---|---|
| `{{BRAND}}` | Law Prep Tutorial Delhi-NCR |
| `{{BRAND_SHORT}}` | LPT Delhi-NCR |
| `{{DOMAIN}}` | https://lptdelhincr.com |
| `{{PHONE}}` | +91-XXXXXXXXXX ← real, NAP-consistent everywhere |
| `{{WHATSAPP}}` | https://wa.me/91XXXXXXXXXX |
| `{{EMAIL}}` | info@lptdelhincr.com |
| `{{HEAD_OFFICE}}` | {{full registered address}} |
| `{{GST}}` | {{GST / registration no.}} |
| `{{FOUNDED_YEAR}}` | {{year}} |
| `{{CENTRES}}` | 4 centres — Noida (Sec 62), Hauz Khas, GTB Nagar, Gurugram (Sec 14) → full NAP + per-centre schema in Appendix E |
| `{{REAL_RESULTS}}` | [verified selections/IIM calls only — no inflation] |
| `{{SOCIAL}}` | [YouTube, Instagram, LinkedIn, X URLs] |

**NAP rule:** the exact same business name, phone, and address string must appear **identically** on the site, every centre page, footer, Google Business Profile, and every social bio. Inconsistency is a top-3 local-SEO killer.

---

# PART A — DEVELOPER SOP

## A1. Hard requirements (non-negotiable)
1. **Server-side render (SSR/SSG) all critical content** — H1, intro answer, tables, predictor results, FAQ answers, steps must exist in the raw HTML before any JS runs. Test with JS disabled: if the answer disappears, it's broken. (This is the #1 indexing fix.)
2. **Deterministic canonical:** pick ONE host (`https://lptdelhincr.com`, non-www recommended), 301 the other permanently. One `<link rel="canonical">` per page, self-referencing, absolute URL, never flipping between www/non-www.
3. **Core Web Vitals budget:** LCP < 2.5s, INP < 200ms, CLS < 0.1 on mobile. Lazy-load below-fold, paginate FAQ hubs > ~40 Q&As.
4. **Mobile-first**, HTTPS, no redirect chains, no indexable URL parameters.
5. **Do not block AI crawlers** (see A3 robots.txt).

## A2. URL & template rules
- Lowercase, hyphenated, **no year in evergreen slugs**. Year-specific content is dated **in-body**, not in the URL.
- Each URL = one canonical page = one breadcrumb path.
- Separate **evergreen templates** (concepts, syllabus) from **perishable data blocks** (dates, cutoffs, fees) — perishable values are injected from the shared datasets (A6) so one update propagates sitewide. Never hardcode a cutoff into prose in many places.

## A3. Root files — copy-paste

### `/robots.txt`
```
User-agent: *
Allow: /

# AI crawlers — explicitly allowed for GEO
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: CCBot
Allow: /

Sitemap: https://lptdelhincr.com/sitemap.xml
```

### `/llms.txt` (root — points LLMs to your best, most citable assets)
```
# Law Prep Tutorial Delhi-NCR (lptdelhincr.com)
> CUET & IPMAT coaching and the most comprehensive, sourced CUET + IPMAT knowledge base in India.

## Datasets (citable, sourced, dated)
- CUET Cutoff Dataset: https://lptdelhincr.com/cuet/cutoff/dataset/
- Institution Dataset: https://lptdelhincr.com/resources/institution-dataset/
- Syllabus Dataset: https://lptdelhincr.com/resources/syllabus-dataset/

## Key hubs
- CUET hub: https://lptdelhincr.com/cuet/
- IPMAT hub: https://lptdelhincr.com/ipmat/
- CUET College Predictor: https://lptdelhincr.com/cuet/results/college-predictor/
- IPMAT Marking & Strategy: https://lptdelhincr.com/ipmat/marking-scheme/
- Master FAQ: https://lptdelhincr.com/faq/
```

### `/sitemap.xml`
Segment by section (`sitemap-cuet.xml`, `sitemap-ipmat.xml`, `sitemap-courses.xml`, `sitemap-news.xml`) in a sitemap index. Auto-generate; include `lastmod`. News sitemap for `/blog/` and `/news/`.

## A4. Global components — copy-paste HTML skeletons
Build once as reusable components. Every page is assembled from them.

### A4.1 Breadcrumb (every page; matches URL)
```html
<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/cuet/">CUET</a></li>
    <li><a href="/cuet/cutoff/">Cutoffs</a></li>
    <li aria-current="page">DU Cutoffs</li>
  </ol>
</nav>
```

### A4.2 Anchor Table of Contents (every long page — earns "Jump to" sitelinks)
```html
<nav class="toc" aria-label="On this page">
  <h2 class="toc__title">On this page</h2>
  <ul>
    <li><a href="#what-is">What it is</a></li>
    <li><a href="#cutoffs-2026">2026 cutoffs by college</a></li>
    <li><a href="#how-calculated">How cutoffs are decided</a></li>
    <li><a href="#faq">FAQs</a></li>
  </ul>
</nav>
```
**Rule:** every `<h2>`/`<h3>` gets a **stable, descriptive `id`** matching its text (`id="cutoffs-2026"`, never `id="section-3"`). One `<h1>` per page; logical H2→H3 nesting.

### A4.3 Direct-answer block (immediately after each H2 question — the AEO/snippet/LLM target)
```html
<h2 id="how-percentile">How is the CUET percentile calculated?</h2>
<p class="answer-lead"><strong>Direct answer (40–60 words):</strong>
{{40–60-word self-contained answer that fully answers the heading}}</p>
<!-- deeper explanation follows -->
```

### A4.4 Comparison table (extractability — LLMs lift these wholesale)
```html
<div class="table-wrap">
<table>
  <caption>{{descriptive caption}} — updated {{date}}, source: {{official source}}</caption>
  <thead><tr><th>{{col}}</th><th>{{col}}</th></tr></thead>
  <tbody>
    <tr><td>{{val}}</td><td>{{val}}</td></tr>
  </tbody>
</table>
</div>
```

### A4.5 FAQ block (server-rendered; answers in HTML, not JS-injected)
```html
<section id="faq" class="faq">
  <h2>Frequently asked questions</h2>
  <div class="faq__item">
    <h3 class="faq__q">{{question phrased exactly as users search}}</h3>
    <div class="faq__a"><p>{{40–60-word direct answer}} {{optional extra sentence}}</p></div>
  </div>
  <!-- repeat 8–20 items on leaf pages; 50–200 on FAQ hub pages -->
</section>
```
**FAQPage rich results are deprecated (≈May 7 2026).** These FAQs win featured snippets, PAA, voice, and LLM citations — **not** FAQ rich snippets. Optional minimal `FAQPage` JSON-LD only where it has on-page value; **never on Article/blog pages.**

### A4.6 Conversion block — WhatsApp-first (Indian edu leads convert on WhatsApp, not email forms)
```html
<aside class="cta">
  <h2>Talk to {{BRAND_SHORT}} about {{CUET/IPMAT}} coaching</h2>
  <a class="btn btn--whatsapp"
     href="https://wa.me/91XXXXXXXXXX?text=Hi%20{{BRAND_SHORT}},%20I%20want%20{{course}}%20batch%20details"
     rel="nofollow">Chat on WhatsApp</a>
  <a class="btn btn--call" href="tel:+91XXXXXXXXXX">Call {{PHONE}}</a>
  <!-- optional ≤5-field form -->
  <ul class="trust">
    <li>Since {{FOUNDED_YEAR}}</li>
    <li>{{REAL_RESULTS}}</li>
    <li>{{CENTRES count}} Delhi-NCR centres</li>
    <li>GST {{GST}}</li>
  </ul>
</aside>
```
Trust list uses **real, verified values only**. If a value isn't verified, omit it.

### A4.7 Author byline (E-E-A-T + GEO)
```html
<div class="byline">
  By <a href="/faculty/{{slug}}/">{{Faculty Name}}</a>, {{role/credential}} ·
  <time datetime="{{YYYY-MM-DD}}">Last updated {{D MMM YYYY}}</time>
</div>
```

## A5. Schema library — copy-paste JSON-LD (apply per page type)
**Honor:** no fake `AggregateRating`; `AggregateRating`/`Review` only on real `Course`/`Organization` with genuine reviews; no `FAQPage`/`AggregateRating` on `Article` pages. Validate every block in Google's Rich Results Test.

### A5.1 Global (every page, in `<head>` or global block) — Organization
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Law Prep Tutorial Delhi-NCR",
  "url": "https://lptdelhincr.com",
  "logo": "https://lptdelhincr.com/logo.png",
  "telephone": "{{PHONE}}",
  "email": "{{EMAIL}}",
  "foundingDate": "{{FOUNDED_YEAR}}",
  "address": {"@type": "PostalAddress", "streetAddress": "{{...}}", "addressLocality": "{{city}}", "addressRegion": "Delhi-NCR", "postalCode": "{{...}}", "addressCountry": "IN"},
  "sameAs": ["{{YouTube}}","{{Instagram}}","{{LinkedIn}}"]
}
```

### A5.2 Breadcrumb (every page)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"Home","item":"https://lptdelhincr.com/"},
    {"@type":"ListItem","position":2,"name":"CUET","item":"https://lptdelhincr.com/cuet/"},
    {"@type":"ListItem","position":3,"name":"Cutoffs","item":"https://lptdelhincr.com/cuet/cutoff/"}
  ]
}
```

### A5.3 Course / batch page
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "{{Batch name}} — CUET Coaching",
  "description": "{{1-2 sentence real description}}",
  "provider": {"@type":"EducationalOrganization","name":"Law Prep Tutorial Delhi-NCR","url":"https://lptdelhincr.com"},
  "hasCourseInstance": {
    "@type":"CourseInstance",
    "courseMode": "{{Offline|Online|Blended}}",
    "location": {"@type":"Place","name":"{{centre}}","address":"{{address}}"},
    "startDate": "{{YYYY-MM-DD}}",
    "endDate": "{{YYYY-MM-DD}}"
  },
  "offers": {"@type":"Offer","price":"{{real fee}}","priceCurrency":"INR","url":"{{page url}}","availability":"https://schema.org/InStock"}
}
```
Add `aggregateRating` **only** with genuine, collectible review data:
`"aggregateRating": {"@type":"AggregateRating","ratingValue":"{{real}}","reviewCount":"{{real}}"}`. No real reviews yet → omit entirely.

### A5.4 Cutoff / dataset page — Dataset (the GEO crown jewel)
```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "CUET Cutoff Dataset (college × course × category × round)",
  "description": "Multi-year CUET cutoffs sourced from official university CSAS releases.",
  "creator": {"@type":"Organization","name":"Law Prep Tutorial Delhi-NCR"},
  "license": "https://lptdelhincr.com/terms/",
  "temporalCoverage": "2022/{{current year}}",
  "distribution": [{"@type":"DataDownload","encodingFormat":"text/csv","contentUrl":"https://lptdelhincr.com/cuet/cutoff/dataset.csv"}],
  "dateModified": "{{YYYY-MM-DD}}"
}
```

### A5.5 How-to (CSAS / application processes)
```json
{
  "@context":"https://schema.org","@type":"HowTo",
  "name":"How to fill CUET CSAS preferences",
  "step":[
    {"@type":"HowToStep","name":"{{step}}","text":"{{instruction}}"}
  ]
}
```

### A5.6 Guide / pillar page — Article (no FAQPage/AggregateRating here)
```json
{
  "@context":"https://schema.org","@type":"Article",
  "headline":"{{title}}",
  "author":{"@type":"Person","name":"{{Faculty}}","url":"https://lptdelhincr.com/faculty/{{slug}}/"},
  "publisher":{"@type":"Organization","name":"Law Prep Tutorial Delhi-NCR","logo":{"@type":"ImageObject","url":"https://lptdelhincr.com/logo.png"}},
  "datePublished":"{{YYYY-MM-DD}}","dateModified":"{{YYYY-MM-DD}}"
}
```

### A5.7 Faculty bio — Person
```json
{
  "@context":"https://schema.org","@type":"Person",
  "name":"{{Faculty Name}}","jobTitle":"{{role}}",
  "worksFor":{"@type":"EducationalOrganization","name":"Law Prep Tutorial Delhi-NCR"},
  "alumniOf":"{{real}}","knowsAbout":["CUET","IPMAT","{{subject}}"],
  "url":"https://lptdelhincr.com/faculty/{{slug}}/"
}
```

### A5.8 Centre page — LocalBusiness (EducationalOrganization)
```json
{
  "@context":"https://schema.org","@type":"EducationalOrganization",
  "name":"Law Prep Tutorial Delhi-NCR — {{Area}}",
  "telephone":"{{PHONE}}",
  "address":{"@type":"PostalAddress","streetAddress":"{{...}}","addressLocality":"{{area}}","addressRegion":"{{state}}","postalCode":"{{...}}"},
  "geo":{"@type":"GeoCoordinates","latitude":"{{lat}}","longitude":"{{lng}}"},
  "openingHours":"{{Mo-Su 09:00-19:00}}"
}
```
(Full per-centre blocks with exact coordinates in Appendix E3.)

## A6. The three shared datasets (build once, power everything)
Store as structured data (DB tables or versioned JSON/CSV); pages read from them so figures stay consistent and update once.

1. **CUET Cutoff dataset** — columns: `year, university, college, course, category, round, cutoff, source_url, verified_date`. Rendered as HTML table + downloadable CSV + `Dataset` schema. Powers every cutoff page and the predictor.
2. **Institution dataset** — one row per university/college/IIM: `name, type, NIRF, courses, seats, fees, required_subjects, source_url`. Powers college profiles, predictor options, comparison pages. `EducationalOrganization` schema.
3. **Syllabus dataset** — `vertical, subject/section, unit, topic, pyq_weightage_tag`. Powers all syllabus pages + Learning Units for both verticals. `Course`/`ItemList` schema.

## A7. Performance & rendering checklist (per page)
- [ ] Renders fully with JS disabled (SSR/SSG verified).
- [ ] Self-referencing absolute canonical; correct host; no chains.
- [ ] LCP/INP/CLS within budget on throttled mobile.
- [ ] Images: descriptive `alt`, `width`/`height` set (no CLS), original photos get `ImageObject`.
- [ ] In sitemap with `lastmod`; breadcrumb + schema validate.

## A8. Developer Definition-of-Done (every page) ✅
Page ships only when:
- [ ] SSR verified
- [ ] canonical correct
- [ ] all required schema present + validates
- [ ] breadcrumb + anchor-TOC present with stable IDs
- [ ] FAQ answers in raw HTML
- [ ] WhatsApp/call CTA wired
- [ ] CWV in budget
- [ ] in segmented sitemap
- [ ] perishable values pulled from datasets (not hardcoded)

---

# PART B — SEO / CONTENT WRITER SOP

## B1. The page-writing workflow (run for every page)
1. **Identify the page's primary query + intent** (informational vs commercial — never blur them).
2. **Pull the cluster** from the taxonomy (CUET §3 / IPMAT §4 of architecture prompt) so you know its siblings and conversion target.
3. **SERP + PAA recon:** note top-ranking format, the PAA questions, autosuggest variants. These become your H2s and FAQ set.
4. **Ground the facts** from `CUET_Master_Super_Module` / `IPMAT_Complete_Module`; verify perishable figures against the official source; label estimates as estimates.
5. **Write to the universal template (B4).** Direct answers first, then depth.
6. **Build the intent-matched FAQ set (B6)** from the page's PAA cluster — deduplicated.
7. **Wire internal links (B7).**
8. **Fill title/meta/slug (B3).**
9. **Log the page in the coverage matrix (B2).**
10. **Run the writer DoD (B9).**

## B2. Keyword → cluster → page map + coverage matrix
Maintain ONE spreadsheet. One row per cluster/sub-topic from the CUET 10 pillars and IPMAT 10 pillars. Columns:
```
vertical | pillar | cluster | sub-topic | target query | intent | page URL | status |
direct-answer? | FAQ set count | master-KB Q&As | internal links done? | conversion target | last verified
```
A cluster is **"covered"** only when it has: a live page + a direct-answer block + an intent-matched FAQ set + master-KB entries + wired internal links. **No empty rows ship.** This matrix is the definition of "every topic/keyword cluster covered."

## B3. Title / meta / slug formulas (copy-paste patterns)

| Page type | Title pattern | Example |
|---|---|---|
| Cutoff | `{{Entity}} CUET Cutoff {{Year}}: {{College/Course}} Cutoffs` | DU CUET Cutoff 2026: College & Course Cutoffs |
| Predictor | `CUET College Predictor {{Year}} — Predict by Marks/Percentile` | — |
| Syllabus | `CUET {{Subject}} Syllabus {{Year}}: Topics, Weightage & PYQs` | — |
| Comparison | `{{A}} vs {{B}}: Which to Choose ({{Year}})` | IPM vs BBA: Which to Choose |
| Exam/marking | `IPMAT {{Institute}} Exam Pattern & Marking {{Year}}` | IPMAT Indore Exam Pattern & Marking 2026 |
| Course | `{{Exam}} Coaching in Delhi-NCR — {{Batch}} \| {{BRAND_SHORT}}` | — |
| FAQ hub | `{{Topic}} FAQs: {{N}} Questions Answered` | — |

**Rules:** front-load the primary keyword; ≤60 chars where possible; add year only when the query is year-sensitive. **Meta description:** ≤155 chars = primary keyword + concrete value + soft CTA (e.g. `See exact 2026 cutoffs by college, category & round →`). No duplicate titles/metas sitewide. **Slug:** lowercase-hyphenated, no year, matches breadcrumb.

## B4. Universal page content template (copy-paste — fill every page)
```
# {{H1 — primary keyword, intent-matched}}

By [{{Faculty}}](/faculty/{{slug}}/) · Last updated {{D MMM YYYY}}

**{{40–60-word answer-shaped intro that fully answers the page's core query.}}**

## On this page
- [{{H2 a}}](#a) · [{{H2 b}}](#b) · [{{H2 c}}](#c) · [FAQs](#faq)

## {{H2 question a}}   <!-- id="a" -->
**{{40–60-word direct answer}}**
{{depth: lists, table, definition, example}}

## {{H2 question b}}   <!-- id="b" -->
**{{direct answer}}**
{{include ONE of: comparison table / original stat / first-hand marker — for GEO}}

## {{H2 question c}}   <!-- id="c" -->
...

## Frequently asked questions  <!-- id="faq" -->
**{{Q1}}** — {{40–60-word answer}}
**{{Q2}}** — {{...}}
<!-- 8–20 deduplicated, intent-matched questions -->

> **Talk to {{BRAND_SHORT}}** about {{CUET/IPMAT}} coaching → WhatsApp / Call CTA
> Trust: since {{FOUNDED_YEAR}} · {{REAL_RESULTS}} · {{centres}} centres
```

## B5. Direct-answer rules (AEO — wins snippets, voice, AI Overviews)
- First 40–60 words after the H1, and after every H2 question, must be a **self-contained answer** a person (or LLM) can lift without reading further.
- Lead with the answer, then the reasoning ("Yes — IPMAT Indore has negative marking in QA-MCQ and Verbal (−1 each); QA-SA has none.").
- **Bold the key term/definition** near the top.
- Use the user's exact phrasing in the heading ("Does IPMAT have negative marking?").

## B6. FAQ system authoring (tiered — total coverage, no penalty)
**Three tiers:**
1. **Master FAQ KB** (`/faq/`, `/faq/cuet/`, `/faq/ipmat/`): the full deduplicated corpus — target **1,000+ Q&As** across both verticals, every one tied to a cluster. Single source of truth; on-page search/filter.
2. **FAQ hub pages** (per major cluster, e.g. `/faq/cuet/cutoffs/`): **50–200 Q&As** — legitimate because the page's whole job is reference. Heavy anchor TOC.
3. **Leaf-page FAQ sets:** **8–20 Q&As** — the page's actual PAA cluster only.

**Rules (all tiers):**
- Every answer = 40–60-word direct answer first, optional depth after.
- Question phrased exactly as searched/asked.
- **De-duplicate ruthlessly:** one canonical answer per question on its best-fit page; other pages link to it, never re-paste verbatim (duplicate-content risk).
- Source questions from: live PAA boxes, autosuggest, the IPMAT module's **aspirant question-set**, and the CUET pillar clusters.
- Date perishable answers; pull figures from datasets.
- No padding with near-identical question variants. Cover real distinct intents.

**Where the "200" lives:** in the master KB (1,000+) and the hub pages (50–200) — **not** stamped on every leaf page.

## B7. Internal-linking rules (the conversion wiring)
- **CUET in-season chain:** every cutoff page → predictor → counselling/course; predictor result → relevant cutoff + admission pages; college/university hub → its cutoff + predictor. (cutoff ↔ predictor ↔ colleges = closed triangle.)
- **IPMAT chain:** syllabus/section → section-strategy → prep-plan → course; cutoff/composite → "safe score" → course; PI/WAT → mock-PI course CTA.
- **TOFU handoff:** "how to prepare"/syllabus → study-plan → (in-season) predictor/course.
- **Cross-vertical bridges:** every comparison conclusion → that vertical's syllabus + course.
- **Authority cascade:** mechanics/FAQ/news → the relevant demand pillar.
- **Anchors:** descriptive, varied, intent-matched ("predict your DU college", "IIM Indore sectional cutoffs"); never "click here"; no identical anchor sitewide.
- Every page links **down** (to clusters), **across** (to siblings), and **forward** (to a conversion page).

## B8. Per-page-type quick briefs (combine with the Part C examples)

| Page type | Primary intent | Must contain | Conversion target | Schema |
|---|---|---|---|---|
| CUET Cutoff | Commercial-info | Dataset table (college×course×category×round), "how cutoffs decided", trend note, disambiguation (NTA ≠ cutoff release) | Predictor → counselling | Dataset + Breadcrumb |
| CUET Predictor | Transactional | Ungated tool, marks↔percentile explainer, result → cutoff/colleges, estimate disclaimer | Counselling/course | (tool) + Breadcrumb |
| CUET Syllabus (subject) | Informational | Topic list + weightage from syllabus dataset, PYQ link, how-to-prepare link | Study-plan → course | Course/ItemList |
| CUET CSAS / Admission | Info → revenue | HowTo steps, freeze-vs-upgrade, mistakes, per-university | Paid counselling | HowTo + Breadcrumb |
| CUET Comparison (vs X) | Commercial | Comparison table, "who should choose which", route conclusion → vertical | CUET or IPMAT course | Article + Breadcrumb |
| IPMAT Exam/Marking | Info (citation) | Three-exam table, marking math (no-neg SA / −1 rest / sectional lock), strategy | Course/mock | Article + Breadcrumb |
| IPMAT Cutoff/Selection | Commercial-info | Sectional cutoffs (cleared independently), composite weights (65/35; 55/15/30), safe-score | Course | Article/Dataset |
| IPMAT Comparison | Commercial | IPM vs BBA / Indore vs Rohtak / worth-₹35–40L tables | Course | Article |
| IPMAT PI & WAT | Info → revenue | What panels probe, profile-building, WAT, mock-PI | Mock-PI course | Article |
| Course/Batch | Transactional | Real fee, mode, dates, faculty, syllabus, real reviews | Enroll/WhatsApp | Course + Offer (+real AggregateRating) |
| College/Institute | Info | Institution-dataset profile (seats/fees/NIRF/subjects), placements, comparisons | Predictor/course | EducationalOrganization |
| News/Update | Freshness | Fast-publish, dated, sourced | Relevant demand pillar | NewsArticle |
| FAQ hub | Info (AEO/GEO) | 50–200 Q&As, anchor TOC, direct answers | Relevant course | (optional minimal FAQPage) |

## B9. Content-writer Definition-of-Done (every page) ✅
- [ ] Intent correct; H1 + 40–60-word intro answer the core query.
- [ ] Every H2 has a direct-answer block; ≥1 table/list/definition.
- [ ] ≥1 GEO asset (original stat / comparison table / first-hand marker).
- [ ] Intent-matched, deduplicated FAQ set; logged in coverage matrix.
- [ ] Internal links: down + across + forward; descriptive anchors.
- [ ] Title ≤60 (keyword + hook), unique meta ≤155, clean slug.
- [ ] Perishable figures verified vs official source + dated; estimates labelled.
- [ ] Byline → real faculty; "Last updated" present.
- [ ] No fabricated data/reviews/results; no CAT references.

---

# PART C — WORKED EXAMPLE PAGES (copy-paste, full standard)
> Clone these patterns across the site. Replace `{{TOKENS}}` and `[ILLUSTRATIVE]` rows with **verified** data. Numbers shown are from the 2026-cycle modules and must be re-verified before publishing.

## C1. CUET EXAMPLE — Cutoff page
```
URL (slug):  /cuet/cutoff/du/
Title:       DU CUET Cutoff 2026: College & Course Cutoffs (All Categories)
Meta:        See DU CUET 2026 cutoffs by college, course, category & round — sourced from official CSAS data. Predict your college →
```
```
# DU CUET Cutoff 2026 — College & Course Cutoffs

By [{{Faculty}}](/faculty/{{slug}}/) · Last updated {{D MMM YYYY}}

**DU CUET cutoffs are released by Delhi University through CSAS (not by NTA), as category-wise CUET
scores for each college–course combination, falling across multiple allotment rounds. Below are the
{{year}} cutoffs by college, course, category and round, sourced from official CSAS releases.**

## On this page
- [How DU cutoffs work](#how) · [2026 cutoffs by college](#cutoffs) · [Category-wise](#category) ·
  [Predict your college](#predict) · [FAQs](#faq)

## How DU CUET cutoffs work  <!-- id="how" -->
**DU CUET cutoffs are the minimum CUET scores at which a college–course closed in a given CSAS
round, set separately for each category. They are not fixed in advance — they emerge from demand,
seats, and applicant scores, and typically drop across later rounds and spot rounds.**
Key disambiguation: NTA conducts CUET and releases scores; **universities (here, DU via CSAS)
release the cutoffs.** Clearing CUET ≠ admission — you must complete CSAS allotment and seat acceptance.

## 2026 cutoffs by college  <!-- id="cutoffs" -->
{{Table injected from CUET Cutoff dataset — college × course × category × round.}}

| College | Course | Category | Round 1 | Round 2 | Source |
|---|---|---|---|---|---|
| [ILLUSTRATIVE — replace with verified dataset rows] | B.A. (H) Eco | General | — | — | CSAS |

[Download the full CUET cutoff dataset (CSV) →](/cuet/cutoff/dataset/)

## Category-wise cutoffs  <!-- id="category" -->
**Cutoffs differ by category (General / OBC-NCL / SC / ST / EWS / PwBD); reserved-category cutoffs
are usually lower than General for the same college–course.** {{depth}}

## Predict your DU college  <!-- id="predict" -->
Not sure which college your score secures? [Use the free CUET College Predictor →](/cuet/results/college-predictor/du/)
— enter your marks/percentile to see realistic DU options, then plan your CSAS preference order.

## Frequently asked questions  <!-- id="faq" -->
**Does NTA release CUET cutoffs?** — No. NTA conducts CUET and releases scores; cutoffs are released by each university. For DU, cutoffs come through CSAS across allotment rounds. {{...}}
**Do DU cutoffs drop in later rounds?** — Usually yes. As higher-scoring applicants accept seats, later CSAS rounds and spot rounds often close at lower scores, though popular college–course combinations stay competitive. {{...}}
**Is a high CUET score enough for DU admission?** — No. You must also register for CSAS, fill preferences, receive an allotment, and accept the seat. A high score with no CSAS action gets no admission. {{...}}
<!-- add 8–20 deduplicated DU-cutoff-cluster questions -->

> **Plan your DU admission with {{BRAND_SHORT}}.** [Chat on WhatsApp →]({{WHATSAPP}}) · Call {{PHONE}}
> Since {{FOUNDED_YEAR}} · {{REAL_RESULTS}} · {{CENTRES}}

INTERNAL LINKS (wire these): → College Predictor (/cuet/results/college-predictor/du/) · → CSAS process (/cuet/admission/du/) · → DU colleges hub (/cuet/colleges/du/) · → Marks vs percentile (/cuet/results/marks-vs-percentile/)
SCHEMA: Dataset (A5.4) + Breadcrumb (A5.2)
```

## C2. IPMAT EXAMPLE — Exam pattern & marking page
```
URL (slug):  /ipmat/marking-scheme/
Title:       IPMAT Marking Scheme & Negative Marking 2026 (Indore, Rohtak)
Meta:        How IPMAT marking works — QA-SA has no negative marking, −1 elsewhere, 40-min sectional lock at Indore. The strategy that makes ranks →
```
```
# IPMAT Marking Scheme & Negative Marking — Indore vs Rohtak

By [{{Faculty}}](/faculty/{{slug}}/) · Last updated {{D MMM YYYY}} · *Verify against iimidr.ac.in / iimrohtak.ac.in for the current cycle*

**IPMAT uses different marking across its sections. At IIM Indore, the Quant Short-Answer section
(15 type-in questions) has no negative marking, while QA-MCQ (30Q) and Verbal (45Q) deduct −1 per
wrong answer. Indore also runs a 40-minute sectional lock. IIM Rohtak applies −1 across all sections
with no lock and adds Logical Reasoning.**

## On this page
- [The three exams](#exams) · [Indore marking](#indore) · [Rohtak marking](#rohtak) · [The marking math](#math) · [FAQs](#faq)

## The three IPMAT exams at a glance  <!-- id="exams" -->
| Exam | Questions | Sections | Sectional lock | Negative marking |
|---|---|---|---|---|
| IIM Indore | 90 / 360 marks / 120 min | QA-SA (15) · QA-MCQ (30) · VA (45) | 40 min/section | SA: none · MCQ & VA: −1 |
| IIM Rohtak | 120 / 480 marks / 120 min | QA · VA · LR (40 each) | None | All −1 |
| JIPMAT (Jammu, Bodh Gaya) | QA + VA | — | — | per official bulletin |
*2026-cycle figures from the IPMAT module — re-verify before publishing.*

## Indore marking — where ranks are made  <!-- id="indore" -->
**QA-SA (15 questions, type-in) has no negative marking — leaving any blank is a guaranteed loss
versus a reasoned attempt, so attempt all 15. QA-MCQ and Verbal deduct −1, so guess only after
eliminating at least one option.** The 40-minute sectional lock means you cannot bank time between
sections — pace per section, not overall.

## Rohtak marking  <!-- id="rohtak" -->
**Rohtak deducts −1 everywhere and has no sectional lock, so you control your own time across QA,
VA and LR — which means the risk is over-investing in one section. Sequence strength-first to bank a cushion.**

## The marking math (strategy core)  <!-- id="math" -->
**A blind 4-option guess under −1 has an expected value of (0.25×4) + (0.75×−1) = +0.25 — barely
positive and high-variance. Eliminating even one option shifts the odds decisively in your favour;
that is the entire guessing strategy.** {{first-hand marker: "In our {{year}} IPMAT batch, candidates who drilled elimination-then-guess on QA-MCQ…" — real data only}}

## Frequently asked questions  <!-- id="faq" -->
**Does IPMAT have negative marking?** — Yes, mostly. IIM Indore deducts −1 in QA-MCQ and Verbal but not in QA Short-Answer; IIM Rohtak deducts −1 in all sections. Always attempt the no-negative SA section fully. {{...}}
**Should I attempt all questions in IPMAT QA-SA?** — Yes. The Indore Short-Answer section has no negative marking, so every blank is a guaranteed loss. Attempt all 15 with reasoned approximations. {{...}}
**What is the IPMAT Indore sectional time lock?** — Indore locks each of its three sections to 40 minutes; you cannot carry unused time forward. Prepare per-section pacing rather than overall pacing. {{...}}
<!-- 8–20 deduplicated marking-cluster questions -->

> **Crack IPMAT marking strategy with {{BRAND_SHORT}}.** [Chat on WhatsApp →]({{WHATSAPP}}) · Call {{PHONE}}
> {{REAL_RESULTS}} · since {{FOUNDED_YEAR}}

INTERNAL LINKS: → Section strategy (/ipmat/section-strategy/) · → Cutoffs & composite score (/ipmat/cutoff/indore/) · → Prep master plan (/ipmat/preparation/) · → IPMAT course (/courses/ipmat/)
SCHEMA: Article (A5.6) + Breadcrumb (A5.2) — NOTE: no AggregateRating/FAQPage on this Article page.
```

## C3. COMMERCIAL EXAMPLE — Course/batch page
```
URL (slug):  /courses/ipmat/foundation-2-year/
Title:       IPMAT Coaching in Delhi-NCR — 2-Year Foundation | LPT Delhi-NCR
Meta:        IPMAT 2-year foundation batch at LPT Delhi-NCR — IIM Indore & Rohtak focused, real faculty, offline + online. See fees & dates →
```
```
# IPMAT 2-Year Foundation Batch — Delhi-NCR

By {{BRAND}} · Last updated {{D MMM YYYY}}

**The {{BRAND_SHORT}} IPMAT 2-Year Foundation batch prepares Class 11 students for IIM Indore, Rohtak
and JIPMAT through QA, Verbal and Logical Reasoning, with sectional strategy, full mocks, and PI/WAT
prep. Mode: {{offline/online/hybrid}}. Fee: from ₹{{real fee}}. Next batch starts {{date}}.**

## On this page
- [Who it's for](#who) · [What's covered](#syllabus) · [Fees & dates](#fees) · [Faculty](#faculty) · [Results](#results) · [FAQs](#faq)

## Who this batch is for  <!-- id="who" -->
{{honest fit description — Class 11 starters targeting IPM}}

## What's covered  <!-- id="syllabus" -->
{{pull from syllabus dataset — QA tiers, Verbal, LR (Rohtak), mocks, PI/WAT}}. Linked deep dives:
[IPMAT syllabus](/ipmat/syllabus/) · [marking strategy](/ipmat/marking-scheme/).

## Fees & dates  <!-- id="fees" -->
| Batch | Mode | Duration | Start | Fee |
|---|---|---|---|---|
| 2-Year Foundation | {{mode}} | {{months}} | {{date}} | from ₹{{real fee}} |
*Transparent fee shown — no "enquire for price."*

## Faculty  <!-- id="faculty" -->
{{Named real faculty}} → [bios](/faculty/).

## Results  <!-- id="results" -->
{{REAL_RESULTS — verified selections/IIM calls only, with year. No inflation.}}

## Frequently asked questions  <!-- id="faq" -->
**What is the fee for the IPMAT 2-year batch?** — The {{BRAND_SHORT}} IPMAT 2-Year Foundation batch starts from ₹{{real fee}}, payable {{terms}}. {{...}}
**Does this batch cover both IIM Indore and Rohtak patterns?** — Yes. It covers QA-SA and QA-MCQ for Indore plus Logical Reasoning for Rohtak, with section-specific strategy for each pattern. {{...}}
<!-- 8–15 batch-specific questions -->

> **Book a free demo / counselling.** [Chat on WhatsApp →]({{WHATSAPP}}) · Call {{PHONE}}
> Since {{FOUNDED_YEAR}} · {{CENTRES}} · GST {{GST}}

INTERNAL LINKS: → IPMAT hub (/ipmat/) · → marking strategy · → cutoffs · → results
SCHEMA: Course + Offer (A5.3). Add AggregateRating ONLY if real reviews exist.
```

---

# PART D — WORKFLOW, ROLES & PUBLISHING GATE

## D1. Who does what
- **SEO/Content writer:** B1 workflow → writes page to B4 template → builds FAQ set → wires internal links → fills title/meta/slug → logs coverage matrix → passes B9 DoD.
- **Developer:** implements A4 components + A5 schema → injects perishable values from A6 datasets → SSR + canonical + CWV → adds to sitemap → passes A8 DoD.
- **Reviewer (you / lead):** runs the combined publishing gate (D3) before anything goes live.

## D2. Build order (phased — match the live exam calendar)
- **Phase 0 (Wk 1–2):** root files (robots/llms/sitemap), global schema, three datasets scaffolded, brand hub + course/faculty/centre pages live with real data, WhatsApp CTA, measurement (GSC, Bing, GBP, rank tracker, baseline LLM-citation check).
- **Phase 1 (Wk 3–8):** CUET P1–P3 (predictor, cutoffs, CSAS) + IPMAT I1–I4 (exam/marking, cutoffs/selection, eligibility, admission) — P0/seasonal. FAQ hubs for these. Comparison bridges.
- **Phase 2 (Wk 9–16):** CUET P4–P7 + IPMAT I5–I8 (colleges, syllabus/Learning Units, mechanics, PI/WAT). Programmatic rollout from datasets (real distinct data only). Master FAQ KB → 1,000+.
- **Phase 3 (ongoing):** P8–P10 / I9–I10 (cities, history/policy, experience/wellbeing); news cadence; link-building/digital PR around the cutoff dataset; monthly LLM-citation testing + gap-closing.

## D3. Publishing gate (combined — page goes live only if ALL pass) ✅
- [ ] **Intent + answer:** correct intent; H1 + 40–60-word intro answer the core query.
- [ ] **AEO:** direct-answer block under every H2; ≥1 list/table/definition.
- [ ] **GEO:** ≥1 original stat / comparison table / first-hand marker; dated; sourced.
- [ ] **FAQ:** intent-matched, deduplicated set; in coverage matrix; answers in raw HTML.
- [ ] **Jump-links:** anchor TOC + stable descriptive H2 IDs.
- [ ] **Internal links:** down + across + forward; descriptive anchors.
- [ ] **Title/meta/slug:** keyword-front-loaded title ≤60, unique meta ≤155, clean slug.
- [ ] **Schema:** correct for page type; validates; no fake AggregateRating; no FAQPage/AggregateRating on Article pages.
- [ ] **Tech:** SSR verified (JS-off test), correct canonical, CWV in budget, in sitemap.
- [ ] **Trust + conversion:** WhatsApp/call CTA; real trust signals; transparent fee on commercial pages.
- [ ] **Honesty:** every perishable figure verified vs official source + dated; estimates labelled; no fabricated data/reviews/results; no CAT references.

## D4. Maintenance cadence
- **Each cycle / mid-season:** refresh perishable data (dates, pattern, cutoffs, fees, eligibility) — update the dataset once; it propagates.
- **Weekly in-season:** news cadence (NewsArticle) for Discover/freshness; GBP posts.
- **Monthly:** LLM-citation test on top BOFU questions; close gaps with datasets + direct answers. Content-refresh underperformers (often beats new content for ROI).
- **Always:** keep evergreen concept pages stable; only perishable blocks change.

---

# APPENDIX E — CENTRES & LOCAL SEO (4 physical locations)
Four real, verified Delhi-NCR centres. Major ranking + trust asset: they unlock "[exam] coaching near me", "[exam] coaching in [area]", Google Business Profile (map pack), and `LocalBusiness` schema — and are genuine E-E-A-T proof for SEO and LLM citation. Build one dedicated, indexable centre page per location and one Google Business Profile per location.

## E1. Canonical NAP (copy these EXACTLY — same string everywhere)
NAP must be **byte-identical** across each centre page, footer, contact page, every GBP, JustDial/Sulekha/IndiaMART listings, and all social bios. Any variation splits local authority. Add a **centre-specific phone** per location where available (best for GBP); otherwise use the main `{{PHONE}}` consistently.

| Centre | Full address | Pincode | Landmark (use in local content) |
|---|---|---|---|
| **LPT Noida** | Ground Floor, Sandesh Tower, C-56/31, C Block, Phase 2, Sector 62, Noida, Uttar Pradesh | 201309 | Sector 62; Sandesh Tower |
| **LPT Hauz Khas** | Second Floor, 14, Kaushalya Park, Block R, Kharera, Hauz Khas, New Delhi, Delhi | 110016 | Near Vadilal Hangout; Hauz Khas |
| **LPT GTB Nagar** | 73-75, Ring Road, Mall Road, GTB Nagar, New Delhi, Delhi | 110033 | Metro Gate No. 1, above Bank of Baroda |
| **LPT Gurugram** | Second Floor, M-35, Block M, Old DLF Colony, Sector 14, Gurugram, Haryana | 122007 | Above HDFC Bank; Sector 14 |

## E2. Centre URLs + page template
Slugs (evergreen, lowercase): `/centres/noida/` · `/centres/hauz-khas/` · `/centres/gtb-nagar/` · `/centres/gurugram/` plus a parent index `/centres/`.

**Centre page template (copy-paste — one per location):**
```
# {{Exam(s)}} Coaching in {{Area}} — {{BRAND_SHORT}} {{Centre}}

Last updated {{D MMM YYYY}}

**{{BRAND_SHORT}}'s {{Area}} centre offers CUET and IPMAT coaching at {{full address}}. {{Landmark
sentence — e.g. "Right above Bank of Baroda at GTB Nagar Metro Gate No. 1."}} Offline, online and
hybrid batches; book a free demo on WhatsApp.**

## On this page
- [Address & directions](#address) · [Batches here](#batches) · [Why this centre](#why) · [FAQs](#faq)

## Address & directions  <!-- id="address" -->
**Address:** {{full NAP}} — {{pincode}}.
**Nearest landmark / metro:** {{landmark}}.
{{Embedded Google Map for THIS centre}}
[Get directions →]({{google maps link}}) · [Chat on WhatsApp →]({{WHATSAPP}}) · Call {{centre phone}}

## CUET & IPMAT batches at {{Area}}  <!-- id="batches" -->
{{batch table for this centre — link to /courses/cuet/ and /courses/ipmat/}}

## Why students choose the {{Area}} centre  <!-- id="why" -->
{{real differentiators: faculty, results, accessibility from {{nearby areas}}}}

## Frequently asked questions  <!-- id="faq" -->
**Where is {{BRAND_SHORT}}'s {{Area}} centre located?** — {{full address}}, near {{landmark}}. {{...}}
**Which exams are coached at the {{Area}} centre?** — CUET and IPMAT, in offline, online and hybrid modes. {{...}}
**Does the {{Area}} centre offer a free demo class?** — {{yes/terms}}. Book on WhatsApp at {{WHATSAPP}}. {{...}}
<!-- 6–12 location-specific questions, including "near me" phrasings -->

INTERNAL LINKS: → /centres/ (all centres) · → /courses/cuet/ · → /courses/ipmat/ · → other 3 centres
SCHEMA: LocalBusiness/EducationalOrganization (E3) + Breadcrumb
```

## E3. Per-centre LocalBusiness JSON-LD (copy-paste — 4 blocks)
> Replace approximate `latitude`/`longitude` with the **exact pin from each centre's GBP** before publishing (approximate values flagged below). Add `telephone` per centre and real `openingHours`.

**Noida — `/centres/noida/`**
```json
{
  "@context":"https://schema.org","@type":"EducationalOrganization",
  "name":"Law Prep Tutorial Delhi-NCR — Noida",
  "url":"https://lptdelhincr.com/centres/noida/",
  "telephone":"{{centre phone}}",
  "parentOrganization":{"@type":"EducationalOrganization","name":"Law Prep Tutorial Delhi-NCR","url":"https://lptdelhincr.com"},
  "address":{"@type":"PostalAddress","streetAddress":"Ground Floor, Sandesh Tower, C-56/31, C Block, Phase 2, Sector 62","addressLocality":"Noida","addressRegion":"Uttar Pradesh","postalCode":"201309","addressCountry":"IN"},
  "geo":{"@type":"GeoCoordinates","latitude":"28.6276","longitude":"77.3649"},
  "areaServed":["Noida","Greater Noida","Sector 62","Indirapuram","Ghaziabad"],
  "openingHours":"{{Mo-Su 09:00-19:00}}"
}
```
*(geo approximate — Sector 62; set exact pin from GBP.)*

**Hauz Khas — `/centres/hauz-khas/`**
```json
{
  "@context":"https://schema.org","@type":"EducationalOrganization",
  "name":"Law Prep Tutorial Delhi-NCR — Hauz Khas",
  "url":"https://lptdelhincr.com/centres/hauz-khas/",
  "telephone":"{{centre phone}}",
  "parentOrganization":{"@type":"EducationalOrganization","name":"Law Prep Tutorial Delhi-NCR","url":"https://lptdelhincr.com"},
  "address":{"@type":"PostalAddress","streetAddress":"Second Floor, 14, Kaushalya Park, Block R, Kharera, Hauz Khas (near Vadilal Hangout)","addressLocality":"New Delhi","addressRegion":"Delhi","postalCode":"110016","addressCountry":"IN"},
  "geo":{"@type":"GeoCoordinates","latitude":"28.5478","longitude":"77.2030"},
  "areaServed":["Hauz Khas","South Delhi","Green Park","Malviya Nagar","SDA"],
  "openingHours":"{{Mo-Su 09:00-19:00}}"
}
```
*(geo approximate — Hauz Khas/Kharera; set exact pin from GBP.)*

**GTB Nagar — `/centres/gtb-nagar/`**
```json
{
  "@context":"https://schema.org","@type":"EducationalOrganization",
  "name":"Law Prep Tutorial Delhi-NCR — GTB Nagar",
  "url":"https://lptdelhincr.com/centres/gtb-nagar/",
  "telephone":"{{centre phone}}",
  "parentOrganization":{"@type":"EducationalOrganization","name":"Law Prep Tutorial Delhi-NCR","url":"https://lptdelhincr.com"},
  "address":{"@type":"PostalAddress","streetAddress":"73-75, Ring Road, Mall Road, GTB Nagar (Metro Gate No. 1, above Bank of Baroda)","addressLocality":"New Delhi","addressRegion":"Delhi","postalCode":"110033","addressCountry":"IN"},
  "geo":{"@type":"GeoCoordinates","latitude":"28.6989","longitude":"77.2070"},
  "areaServed":["GTB Nagar","North Campus","Kingsway Camp","Model Town","Mukherjee Nagar"],
  "openingHours":"{{Mo-Su 09:00-19:00}}"
}
```
*(geo approximate — GTB Nagar Metro/Ring Road; set exact pin from GBP.)*

**Gurugram — `/centres/gurugram/`**
```json
{
  "@context":"https://schema.org","@type":"EducationalOrganization",
  "name":"Law Prep Tutorial Delhi-NCR — Gurugram",
  "url":"https://lptdelhincr.com/centres/gurugram/",
  "telephone":"{{centre phone}}",
  "parentOrganization":{"@type":"EducationalOrganization","name":"Law Prep Tutorial Delhi-NCR","url":"https://lptdelhincr.com"},
  "address":{"@type":"PostalAddress","streetAddress":"Second Floor, M-35, Block M, Old DLF Colony, Sector 14 (above HDFC Bank)","addressLocality":"Gurugram","addressRegion":"Haryana","postalCode":"122007","addressCountry":"IN"},
  "geo":{"@type":"GeoCoordinates","latitude":"28.4669","longitude":"77.0387"},
  "areaServed":["Gurugram","Sector 14","Old DLF Colony","DLF Phase 1-3","Sushant Lok"],
  "openingHours":"{{Mo-Su 09:00-19:00}}"
}
```
*(geo approximate — Sector 14 Old DLF Colony; set exact pin from GBP.)*

## E4. Local SEO checklist (per centre)
- [ ] **Google Business Profile** claimed + fully completed for each of the 4 centres: correct primary category (e.g. "Coaching center"/"Education center"), exact NAP, hours, 20+ photos, weekly posts, Q&A populated, 100% review responses within 24h. Use the centre's exact map pin to fill `geo` in E3.
- [ ] **Dedicated centre page** live and indexed (E2 template), interlinked from `/centres/`, footer, and both course pages.
- [ ] **NAP-consistent citations:** JustDial, Sulekha, IndiaMART, local directories — identical name/address/phone to E1.
- [ ] **"Near me" / area pages:** target "CUET coaching in {{area}}", "IPMAT coaching near {{landmark}}", "best CUET coaching in Noida/Hauz Khas/GTB Nagar/Gurugram" — answered on the centre page with landmark + metro references.
- [ ] **Local content using the landmarks:** Sector 62/Sandesh Tower, Hauz Khas/Vadilal Hangout, GTB Nagar Metro Gate 1/Bank of Baroda, Sector 14/HDFC — use in copy, alt text, and GBP.
- [ ] **Embedded Google Map** (this centre only) + "Get directions" link on each page.
- [ ] **Reviews engine:** collect genuine Google reviews per centre post-demo/enrolment (no fabrication). Real `AggregateRating` may surface only on legitimate entities with real reviews.
- [ ] **Internal linking:** course/batch pages link to the nearest centre(s); centre pages link to relevant CUET/IPMAT course pages and to the other 3 centres.
- [ ] **`/centres/` index page:** lists all 4 with map, NAP, and links — `ItemList` of the 4 `EducationalOrganization` entities.
- [ ] **Footer:** show all 4 centres with NAP sitewide (consistent string).

---

# APPENDIX F — LOCATION TAXONOMY & LOCAL LANDING PAGES
The 4 centres are a formal **Local pillar (L)** in the taxonomy, beside CUET and IPMAT, feeding the same enrolment funnel. Two distinct page families — keep them separate (different query, different job):
- **Physical centre pages** `/centres/[area]/` — the location/contact/directions page (NAP, map, GBP parity, all exams at this centre). Defined in Appendix E.
- **Local commercial landing pages** `/[exam]/coaching-in-[area]/` — the *"[exam] coaching in [area]"* search-intent page (batches, fees, faculty, results, local FAQ). New here.

## F1. Where Local sits in the taxonomy
```
/                          Brand hub
├── /cuet/                 CUET vertical (P1–P10)
├── /ipmat/                IPMAT vertical (I1–I10)
├── /courses/              Commercial (batches)
├── /centres/             ← LOCAL PILLAR (physical) — Appendix E
│   ├── /noida/  /hauz-khas/  /gtb-nagar/  /gurugram/
└── /[exam]/coaching-in-[area]/   ← LOCAL LANDINGS (commercial intent)
```

## F2. Local landing matrix (area × exam)
Four real centre areas + one NCR overview, per exam. **Honesty guardrail:** build a local landing ONLY where there is genuinely distinct content (a real centre, real local batches, real local results). Do **not** spawn thin near-duplicate pages for every micro-locality — that is doorway-page behaviour and gets demoted. Secondary localities (from `areaServed`) are mentioned *within* the nearest centre's landing, not given their own thin pages.

| Area | Centre page | CUET landing | IPMAT landing | Primary query |
|---|---|---|---|---|
| Noida (Sec 62) | /centres/noida/ | /cuet/coaching-in-noida/ | /ipmat/coaching-in-noida/ | "[exam] coaching in Noida" |
| Hauz Khas | /centres/hauz-khas/ | /cuet/coaching-in-hauz-khas/ | /ipmat/coaching-in-hauz-khas/ | "[exam] coaching in Hauz Khas / South Delhi" |
| GTB Nagar | /centres/gtb-nagar/ | /cuet/coaching-in-gtb-nagar/ | /ipmat/coaching-in-gtb-nagar/ | "[exam] coaching in GTB Nagar / North Campus" |
| Gurugram (Sec 14) | /centres/gurugram/ | /cuet/coaching-in-gurugram/ | /ipmat/coaching-in-gurugram/ | "[exam] coaching in Gurgaon" |
| Delhi-NCR (overview) | /centres/ | /cuet/coaching-in-delhi-ncr/ | /ipmat/coaching-in-delhi-ncr/ | "best [exam] coaching in Delhi NCR" |

**Totals added by Local pillar:** 1 centres index + 4 centre pages + 10 local landings = **15 location pages.**

## F3. Local landing page template (copy-paste — one per area × exam)
```
# {{Exam}} Coaching in {{Area}} — {{BRAND_SHORT}}

By {{BRAND}} · Last updated {{D MMM YYYY}}

**{{BRAND_SHORT}} offers {{Exam}} coaching in {{Area}} at {{centre address}}, {{landmark}}. Offline,
online and hybrid batches with {{real faculty/result marker}}. Book a free demo on WhatsApp.**

## On this page
- [Batches & fees](#batches) · [Why {{BRAND_SHORT}} {{Area}}](#why) · [Centre & directions](#centre) · [Results](#results) · [FAQs](#faq)

## {{Exam}} batches & fees in {{Area}}  <!-- id="batches" -->
[T-LOCAL-BATCH] table → links to /courses/{{exam}}/

## Why {{BRAND_SHORT}} {{Area}}  <!-- id="why" -->
{{real differentiators; areas served nearby: {{secondary localities}}}}

## Centre & directions  <!-- id="centre" -->
{{NAP + embedded map}} → full details: [/centres/{{area}}/](/centres/{{area}}/)

## Results  <!-- id="results" -->
{{REAL local/overall results — no fabrication}}

## Frequently asked questions  <!-- id="faq" -->
**Where is {{BRAND_SHORT}}'s {{Exam}} coaching in {{Area}}?** — {{address}}, {{landmark}}. {{...}}
**What is the fee for {{Exam}} coaching in {{Area}}?** — From ₹{{real fee}}; see batches above. {{...}}
**Do you offer online {{Exam}} classes for {{Area}} students?** — {{yes/terms}}. {{...}}
<!-- 6–12 location + exam specific questions, incl. "near me" phrasings -->

> Book a free demo → WhatsApp {{WHATSAPP}} · Call {{centre phone}}

INTERNAL LINKS: → /centres/{{area}}/ · → /courses/{{exam}}/ · → /{{exam}}/ hub · → other area landings
SCHEMA: Course + Offer (real) + LocalBusiness reference + Breadcrumb. NO fake AggregateRating.
CANONICAL NOTE: self-canonical. This page targets "[exam] coaching in [area]" (commercial); the
/centres/[area]/ page targets location/contact. Cross-link, never duplicate body copy.
```

## F4. Local internal-linking & sitemap
- Every **course/batch page** links to the nearest centre(s) + matching local landing.
- Every **local landing** links to: its centre page, the exam course page, the exam hub, and sibling area landings.
- Footer shows all 4 centres (NAP) sitewide.
- Add `/sitemap-local.xml` (centres + local landings) to the sitemap index.

---

# APPENDIX G — DATA-BLOCK & TABLE LIBRARY
Define each reusable table once (columns below); reference by code in the inventory (Appendix H). All tables: server-rendered HTML, "Last updated + source" caption, perishable values pulled from the shared datasets (A6).

| Code | Table | Columns |
|---|---|---|
| **T-CUTOFF-CUET** | CUET cutoffs | College · Course · Category · Round 1 · Round 2 · … · Source |
| **T-MARKS-PCTILE** | Marks ↔ percentile | Subject · Raw-marks band · Percentile band · Note (estimate) |
| **T-PREDICT** | Predictor I/O | *Inputs:* marks/percentile, category, subjects → *Output:* college–course list with likelihood band + cutoff ref |
| **T-COLLEGE-CUET** | College profile | College · Courses via CUET · Required CUET subjects · Last Gen cutoff · Seats · NIRF |
| **T-INSTITUTION** | Institution dataset row | Name · Type · NIRF · Courses · Seats · Fees · Required subjects · Source |
| **T-EXAM-IPMAT** | IPMAT exam compare | Exam · Qs/Marks/Time · Sections · Sectional lock · Negative marking |
| **T-IPMAT-CUTOFF** | IPMAT sectional cutoffs | Institute · Section · Gen · EWS · OBC-NC · SC · ST · PwD · Year |
| **T-COMPOSITE** | Composite scoring | Institute · Test % · PI % · Academics % · Notes |
| **T-FEES** | Programme fees | Institute · Duration · Total fee · International fee · Source |
| **T-PLACEMENT** | Placements | Institute · Batch · Placement % · Recruiters · (official CTC only) |
| **T-SYLLABUS** | Syllabus / weightage | Section/Subject · Topic · Tier/Weightage · PYQ frequency |
| **T-COMPARE** | Decision compare | Dimension · Option A · Option B |
| **T-IMPORTANT-DATES** | Timeline | Event · Date/Window · Source |
| **T-BATCH** | Course batches | Batch · Mode · Duration · Start date · Fee |
| **T-LOCAL-BATCH** | Local batches | Batch · Mode · Timing · Fee · Book (WhatsApp) |
| **T-CENTRE** | Centre NAP | Centre · Address · Pincode · Landmark · Phone · Hours · Map |

**Standard data blocks (non-table, from Part A):** direct-answer (40–60w) · disambiguation block · estimate-disclaimer · "Last updated [date]" · author byline · WhatsApp-first CTA · trust block. Every page composes from these + the relevant table(s).

---

# APPENDIX H — MASTER PAGE INVENTORY (complete)
Every page family with slug, type/intent, on-page data blocks & tables, schema, FAQ tier.
**Fixed** = one page. **Programmatic** = one pattern × N (generated from datasets; one real distinct page per row — no thin spawns).
FAQ tiers: **Leaf** 8–20 Q&As · **Hub** 50–200 · **KB** master corpus.

## H1. Global / brand
| Page | Slug | Type · Intent | Data blocks & tables | Schema | FAQ |
|---|---|---|---|---|---|
| Home | `/` | Brand hub · nav | Hero, vertical cards, results strip (real), centres strip [T-CENTRE], CTA | EducationalOrganization, WebSite | — |
| About | `/about/` | Trust | Story, founding year, faculty/centre links | Organization | Leaf |
| Contact | `/contact/` | NAP/convert | All 4 centres [T-CENTRE], map, form, WhatsApp | Organization + LocalBusiness×4 | Leaf |
| Faculty index | `/faculty/` | E-E-A-T | Faculty grid | ItemList | — |
| Faculty bio | `/faculty/[name]/` | E-E-A-T · prog. | Bio, credentials, subjects, byline links | Person | — |
| Results | `/results/` | Proof | Real selections/toppers (verified) | — | Leaf |
| Resources hub | `/resources/` | Tools/lead-magnet | Links to predictor, datasets, downloads | ItemList | — |
| Master FAQ | `/faq/` | AEO/GEO | Filterable KB; links to vertical FAQ hubs | (optional FAQPage) | KB |
| Blog index | `/blog/` | Freshness | Article list | Blog | — |
| Blog post | `/blog/[slug]` | Info · prog. | Article body, byline, TOC | Article | — |
| Legal | `/privacy/`, `/terms/` | Trust | — | — | — |
| Root files | `/robots.txt`, `/llms.txt`, `/sitemap.xml` | Tech | — | — | — |

## H2. Commercial / courses
| Page | Slug | Type · Intent | Data blocks & tables | Schema | FAQ |
|---|---|---|---|---|---|
| Courses hub | `/courses/` | Commercial | Both verticals, batch links | ItemList | Leaf |
| CUET courses | `/courses/cuet/` | Commercial | [T-BATCH], faculty, results, fee | Course | Leaf |
| CUET batch | `/courses/cuet/[batch]` | Transactional · prog. | [T-BATCH], syllabus, faculty, real reviews | Course + Offer (+real AggregateRating) | Leaf |
| IPMAT courses | `/courses/ipmat/` | Commercial | [T-BATCH] (foundation/crash/test-series/PI-WAT/online) | Course | Leaf |
| IPMAT batch | `/courses/ipmat/[batch]` | Transactional · prog. | [T-BATCH], syllabus, faculty, reviews | Course + Offer | Leaf |
| Test series | `/courses/[exam]/test-series/` | Transactional | Mock count, pattern, pricing | Course + Offer | Leaf |
| Free demo | `/free-demo/` | Convert | Booking form, WhatsApp | — | — |

## H3. Local pillar (Appendix E + F)
| Page | Slug | Type · Intent | Data blocks & tables | Schema | FAQ |
|---|---|---|---|---|---|
| Centres index | `/centres/` | Local hub | All 4 [T-CENTRE], map | ItemList + LocalBusiness×4 | Leaf |
| Centre page ×4 | `/centres/{noida,hauz-khas,gtb-nagar,gurugram}/` | Local/contact | [T-CENTRE], directions, map, local batches | EducationalOrganization/LocalBusiness | Leaf |
| CUET local landing ×5 | `/cuet/coaching-in-[area]/` | Local commercial | [T-LOCAL-BATCH], why-us, results, centre ref | Course + Offer + LocalBusiness ref | Leaf |
| IPMAT local landing ×5 | `/ipmat/coaching-in-[area]/` | Local commercial | [T-LOCAL-BATCH], why-us, results, centre ref | Course + Offer + LocalBusiness ref | Leaf |

*(areas: noida, hauz-khas, gtb-nagar, gurugram, delhi-ncr)*

## H4. CUET vertical (P1–P10)
| Page family | Slug | Type · Intent | Data blocks & tables | Schema | FAQ |
|---|---|---|---|---|---|
| **CUET hub** | `/cuet/` | Vertical hub | Pillar nav, key facts, CTA | EducationalOrganization | Hub |
| **P1** Results hub | `/cuet/results/` | Info/lead | Links, predictor CTA | — | Hub |
| P1 Marks↔percentile | `/cuet/results/marks-vs-percentile/[subject]` *prog.* | Info | [T-MARKS-PCTILE] (estimate-labelled) | Article | Leaf |
| P1 Normalization | `/cuet/results/normalization/` | Info/citation | Direct answer, worked example | Article | Leaf |
| P1 Scorecard | `/cuet/results/scorecard/` | Info | HowTo steps | HowTo | Leaf |
| P1 Score calculator | `/cuet/results/score-calculator/` | Tool | Calculator (server-rendered result) | — | Leaf |
| P1 College predictor | `/cuet/results/college-predictor/[university]/[course]` *prog.* | Lead magnet | [T-PREDICT] + estimate disclaimer | — | Leaf |
| **P2** Cutoff hub | `/cuet/cutoff/` | Commercial-info | [T-CUTOFF-CUET] sample, how-it-works | Dataset | Hub |
| P2 Cutoff by college | `/cuet/cutoff/[university]/[college]/[course]` *prog.* | Commercial-info | [T-CUTOFF-CUET] | Dataset | Leaf |
| P2 Cutoff by category | `/cuet/cutoff/[university]/[college]/[category]` *prog.* | Info | [T-CUTOFF-CUET] | Dataset | Leaf |
| P2 Colleges-for-score | `/cuet/cutoff/colleges-for/[score-band]` *prog.* | Commercial | [T-COLLEGE-CUET] | Dataset | Leaf |
| P2 Cutoff dataset | `/cuet/cutoff/dataset/` | GEO | Full [T-CUTOFF-CUET] + CSV | Dataset | — |
| P2 How cutoffs work | `/cuet/cutoff/how-cutoffs-work/` | Info/citation | Direct answer, disambiguation | Article | Leaf |
| **P3** Admission hub | `/cuet/admission/` | Revenue | CSAS [T-IMPORTANT-DATES], steps | HowTo | Hub |
| P3 Per-university | `/cuet/admission/[university]/[phase]` *prog.* | Revenue | HowTo, mistakes | HowTo | Leaf |
| P3 Preference strategy | `/cuet/admission/preference-strategy/[score-band]` *prog.* | Revenue | Strategy block, predictor link | Article | Leaf |
| P3 Freeze-vs-upgrade | `/cuet/admission/freeze-vs-upgrade/` | Revenue | Decision block | Article | Leaf |
| P3 Spot round | `/cuet/admission/spot-round/` | Revenue | HowTo | HowTo | Leaf |
| **P4** Colleges hub | `/cuet/colleges/` | Authority | Participating-univ list [T-INSTITUTION] | ItemList | Hub |
| P4 University/college | `/cuet/colleges/[university]/[college]` *prog.* | Info | [T-COLLEGE-CUET], placements | EducationalOrganization | Leaf |
| P4 Best-for-course | `/cuet/colleges/best-for/[course]` *prog.* | Commercial | Ranked [T-COLLEGE-CUET] | ItemList | Leaf |
| P4 College vs college | `/cuet/colleges/[a]-vs-[b]` *prog.* | Commercial | [T-COMPARE] | Article | Leaf |
| **P5** Compare hub | `/cuet/compare/` | Commercial | Route map, quiz CTA | — | Hub |
| P5 CUET vs exam | `/cuet/compare/cuet-vs-[exam]/` *prog.* | Commercial | [T-COMPARE] + difficulty | Article | Leaf |
| P5 Exam-selector quiz | `/cuet/compare/quiz/` | Tool | Quiz → vertical handoff | — | — |
| **P6** Syllabus hub | `/cuet/syllabus/` | Evergreen | Subject grid [T-SYLLABUS] | Course | Hub |
| P6 Subject pages | `/cuet/[subject]/{syllabus,pyq,important-topics,how-to-prepare,books,weightage}` *prog.* | Info/product | [T-SYLLABUS], [T-WEIGHTAGE], PYQ list | Course/ItemList | Leaf |
| P6 Learning Unit | `/cuet/[subject]/[chapter]` *prog.* | Product | 7-part unit (teach→MCQ→traps→practice→recall→self-check) | LearningResource | Leaf |
| P6 Study plan | `/cuet/study-plan/[duration]/` *prog.* | Info | Phased plan | Article | Leaf |
| **P7** Exam mechanics | `/cuet/{exam-pattern,marking,eligibility,subject-rules,languages}/` | Citation | Direct answers, tables | Article | Leaf |
| **P8** Exam centres (NTA) | `/cuet/exam-centers/[city]/` *prog.* | Seasonal | City info, slip/admit-card links | Article | Leaf |
| P8 Slip/admit/exam-day | `/cuet/{city-slip,admit-card,exam-day}/` | Seasonal | HowTo, checklist | HowTo | Leaf |
| **P9** History/policy/news | `/cuet/{history,policy,changes}/`, `/cuet/news/[slug]` *prog.* | Authority/fresh | Explainers; news feed | Article/NewsArticle | Leaf |
| **P10** Experience/FAQ | `/cuet/faq/`, `/cuet/{is-cuet-hard,without-coaching,toppers,parents-guide}/` | Trust | FAQ hub + guides; disambiguation | Article | Hub/Leaf |

> **Naming caution:** CUET P8 exam-centres = NTA *exam* cities (`/cuet/exam-centers/[city]/`). LPT *coaching* centres = `/centres/[area]/` (Local pillar). Keep slugs and copy distinct.

## H5. IPMAT vertical (I1–I10)
| Page family | Slug | Type · Intent | Data blocks & tables | Schema | FAQ |
|---|---|---|---|---|---|
| **IPMAT hub** | `/ipmat/` | Vertical hub | Pillar nav, fact sheet, CTA | EducationalOrganization | Hub |
| **I1** Exam hub | `/ipmat/exam/` | Info | [T-EXAM-IPMAT] (3 exams) | Article | Hub |
| I1 Per-institute pattern | `/ipmat/{indore,rohtak,jipmat}/pattern` | Info/citation | [T-EXAM-IPMAT] row detail | Article | Leaf |
| I1 Marking scheme | `/ipmat/marking-scheme/` | Citation (flagship) | Marking math, EV block, [T-EXAM-IPMAT] | Article | Leaf |
| I1 Sectional lock | `/ipmat/sectional-lock/` | Info | Direct answer, timing | Article | Leaf |
| **I2** Cutoff hub | `/ipmat/cutoff/` | Commercial-info | [T-IPMAT-CUTOFF], [T-COMPOSITE] | Article | Hub |
| I2 Per-institute cutoff | `/ipmat/cutoff/[institute]/[category]` *prog.* | Info | [T-IPMAT-CUTOFF] | Article | Leaf |
| I2 Composite score | `/ipmat/composite-score/[institute]` *prog.* | Info | [T-COMPOSITE] | Article | Leaf |
| I2 Safe score | `/ipmat/safe-score/` | Commercial | Buffer bands (estimate) | Article | Leaf |
| **I3** Eligibility | `/ipmat/eligibility/`, `/ipmat/eligibility/droppers/`, `/[category]/` *prog.* | Info | Criteria block, age/edge-cases | Article | Leaf |
| **I4** Admission | `/ipmat/admission/[institute]/`, `/ipmat/important-dates/`, `/application-process/` | Seasonal | [T-IMPORTANT-DATES], HowTo | HowTo | Leaf |
| **I5** Colleges hub | `/ipmat/colleges/` | Authority | [T-INSTITUTION] (Indore/Rohtak/Jammu/Bodh Gaya/newer) | ItemList | Hub |
| I5 Per-institute | `/ipmat/colleges/[institute]/` *prog.* | Info | [T-INSTITUTION], [T-PLACEMENT] | EducationalOrganization | Leaf |
| I5 Programme structure | `/ipmat/programme/structure/` | Info/citation | 3+2, AMBA, exit-option block | Article | Leaf |
| I5 Fees | `/ipmat/programme/[institute]/fees` *prog.* | Commercial-info | [T-FEES] | Article | Leaf |
| I5 Placements | `/ipmat/placements/[institute]/` *prog.* | Info | [T-PLACEMENT] (official only) | Article | Leaf |
| I5 ROI | `/ipmat/roi/` | Commercial | [T-FEES] + ROI framing | Article | Leaf |
| **I6** Syllabus hub | `/ipmat/syllabus/` | Evergreen | [T-SYLLABUS] (QA/VA/LR tiers) | Course | Hub |
| I6 Section pages | `/ipmat/syllabus/[section]/` *prog.* | Info | [T-SYLLABUS]/[T-WEIGHTAGE] | Course | Leaf |
| I6 Topic Learning Unit | `/ipmat/[section]/[topic]` *prog.* | Product | 7-part unit | LearningResource | Leaf |
| I6 Prep plan | `/ipmat/preparation/[duration]-plan` *prog.* | Info | Phased plan, daily cadence | Article | Leaf |
| I6 Section strategy | `/ipmat/section-strategy/[section]` *prog.* | Info | Test-day execution block | Article | Leaf |
| I6 Books & mocks | `/ipmat/books-mocks/` | Info | Resource list | ItemList | Leaf |
| **I7** Comparisons | `/ipmat/compare/{ipm-vs-bba,indore-vs-rohtak,ipm-vs-cat-route}/`, `/ipmat/worth-it/` | Commercial | [T-COMPARE], ROI | Article | Leaf |
| **I8** PI & WAT | `/ipmat/interview/[institute]/`, `/ipmat/wat/`, `/ipmat/profile-building/` | Revenue | Panel topics, profile block, mock-PI CTA | Article | Leaf |
| **I9** City/campus | `/ipmat/city/{indore,rohtak}/`, `/ipmat/campus-life/` | Info | City block, hostel reality | Article | Leaf |
| **I10** FAQ/wellbeing | `/ipmat/faq/`, `/ipmat/self-study-vs-coaching/`, `/ipmat/parents-guide/`, `/ipmat/wellbeing/` | Trust | Aspirant question-set hub | Article | Hub/Leaf |

## H6. Shared datasets & FAQ hubs
| Page | Slug | Type | Data | Schema |
|---|---|---|---|---|
| CUET cutoff dataset | `/cuet/cutoff/dataset/` | Dataset | [T-CUTOFF-CUET] + CSV | Dataset |
| Institution dataset | `/resources/institution-dataset/` | Dataset | [T-INSTITUTION] + CSV | Dataset |
| Syllabus dataset | `/resources/syllabus-dataset/` | Dataset | [T-SYLLABUS] + CSV | Dataset |
| Vertical FAQ hubs | `/faq/cuet/`, `/faq/ipmat/` | Hub | 50–200 Q&As each | (opt) FAQPage |
| Cluster FAQ hubs | `/faq/cuet/cutoffs/`, `/faq/ipmat/preparation/`, … | Hub | 50–200 Q&As | (opt) FAQPage |

## H7. Programmatic scale (generate only with real distinct data)
| Cluster | Pattern | Source | Est. URLs* |
|---|---|---|---|
| CUET cutoffs | `/cuet/cutoff/[univ]/[college]/[course]` | Cutoff dataset | high (100s–1000s) |
| CUET predictor | `/cuet/results/college-predictor/[univ]/[course]` | Institution + cutoff | medium |
| CUET colleges | `/cuet/colleges/[univ]/[college]` | Institution dataset | 100s |
| CUET subjects | `/cuet/[subject]/{6 page types}` | Syllabus dataset | subjects × 6 |
| CUET Learning Units | `/cuet/[subject]/[chapter]` | Syllabus dataset | high |
| CUET comparisons | `/cuet/compare/cuet-vs-[exam]/` | curated | ~10–20 |
| IPMAT cutoffs/fees/placements | `/ipmat/...[institute]` | Institution dataset | dozens |
| IPMAT Learning Units | `/ipmat/[section]/[topic]` | Syllabus dataset | dozens |
| Local landings | `/[exam]/coaching-in-[area]/` | centres | 10 |
| Faculty / Blog / News | `/faculty/[x]`, `/blog/[x]`, `/[exam]/news/[x]` | CMS | ongoing |

*Estimates — every programmatic URL must carry real, distinct data or it is not built (no thin spawns).*

## H8. Sitemap segmentation
`/sitemap.xml` (index) → `sitemap-core.xml` (global+commercial) · `sitemap-cuet.xml` · `sitemap-ipmat.xml` · `sitemap-local.xml` (centres + local landings) · `sitemap-news.xml` (blog/news, with `lastmod`).

## H9. Build-priority map (which pages first)
- **P0 (Phase 0–1):** Home, courses hubs+batches, 4 centre pages, 10 local landings, CUET P1–P3 hubs+core, IPMAT I1–I4 hubs+core, faculty, results, contact, root files, 3 datasets scaffolded.
- **P1 (Phase 2):** CUET P4–P7, IPMAT I5–I8, FAQ hubs, programmatic cutoff/college/syllabus rollout, comparisons.
- **P2 (Phase 3):** CUET P8–P10, IPMAT I9–I10, Learning Units, city/history/wellbeing, news cadence, link-building.

---

## Quick cross-reference index
- **Honesty/no-fabrication rule** → top of doc, A5 honor note, B9, D3, F2 guardrail.
- **NAP consistency** → §0, E1, E4, F4.
- **SSR / JS-off test** → A1.1, A7, A8, D3 (Tech).
- **Direct-answer 40–60 words** → A4.3, B4, B5, B9, D3 (AEO).
- **GEO assets (stat/table/first-hand)** → B4, B5, B9, D3 (GEO), Dataset schema A5.4.
- **Schema-by-page-type** → A5.1–A5.8, E3, the Schema column of every H-table.
- **FAQ tiers (Leaf 8–20 / Hub 50–200 / KB 1,000+)** → A4.5, B6, H6.
- **Worked examples to clone** → Part C (C1 cutoff, C2 IPMAT marking, C3 course/batch); centre = E2; local landing = F3.
- **Reusable tables** → Appendix G (T-* codes), referenced in Appendix H.
- **All slugs / page inventory** → Appendix H (H1–H7).
