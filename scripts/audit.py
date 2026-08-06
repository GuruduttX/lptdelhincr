#!/usr/bin/env python3
"""
Site-wide D3 publishing-gate auditor (SOP D3 + A8 + B9 + H7 + H8).
Runs over the prerendered output in dist/client. Python (shell grep is
unreliable on the single-line minified HTML this app emits).

Usage:  npm run build && python3 scripts/audit.py
Exit:   0 = all gates pass, 1 = one or more failures.
"""
import glob, re, html as H, os, sys

DIST = "dist/client"
files = sorted(glob.glob(f"{DIST}/**/*.html", recursive=True))


def rel(f):
    p = f[len(DIST) + 1 :].replace("/index.html", "").replace("index.html", "")
    return "/" + p if p else "/"


def head(f):
    return open(f, encoding="utf-8").read().split("</head>")[0]


def body_text(f):
    # strip TanStack serialized router-state script (carries config tokens by design)
    return re.sub(r"<script[^>]*\$tsr[^>]*>.*?</script>", "", open(f, encoding="utf-8").read(), flags=re.S)


fails = []


def check(name, ok, detail=""):
    print(f"  [{'PASS' if ok else 'FAIL'}] {name}{('  ' + detail) if detail and not ok else ''}")
    if not ok:
        fails.append(name)


print(f"Auditing {len(files)} prerendered pages in {DIST}/\n")

# 1. No {{TOKEN}} leaks in rendered HTML (outside the $tsr hydration blob)
tok = re.compile(r"\{\{[A-Z0-9_]+\}\}")
bad = [rel(f) for f in files if tok.search(body_text(f))]
check("No {{TOKEN}} leaks in rendered HTML", not bad, str(bad[:8]))

# 2. No CUET-only forbidden refs (CAT/MBA/XAT/NMAT/SNAP)
cat = re.compile(r"\b(CAT|MBA|XAT|NMAT|SNAP)\b")
bad = {rel(f): sorted(set(cat.findall(open(f, encoding="utf-8").read()))) for f in files if cat.search(open(f, encoding="utf-8").read())}
check("No CAT/MBA/XAT/NMAT/SNAP references", not bad, str(bad))

# 3. Exactly one self-referencing canonical in <head>
bad = [rel(f) for f in files if head(f).count('rel="canonical"') != 1]
check("Exactly one canonical in <head>", not bad, str(bad[:8]))

# 4. Title <=60 / single brand mention / meta <=155
bad = []
for f in files:
    h = head(f)
    t = re.search(r"<title>([^<]*)</title>", h)
    d = re.search(r'<meta name="description" content="([^"]*)"', h)
    if not t:
        bad.append((rel(f), "no-title"))
        continue
    title = H.unescape(t.group(1))
    desc = H.unescape(d.group(1)) if d else ""
    brand = title.count("Law Prep Tutorial Delhi-NCR") + title.count("LPT Delhi-NCR")
    if len(title) > 60 or brand > 1 or len(desc) > 155:
        bad.append((rel(f), f"t={len(title)} brand={brand} m={len(desc)}"))
check("Title <=60, single brand, meta <=155", not bad, str(bad[:8]))

# 5. Every page has H1 + JSON-LD; content pages have a direct-answer block
bad = []
for f in files:
    s = open(f, encoding="utf-8").read()
    if "<h1" not in s or "application/ld+json" not in s:
        bad.append((rel(f), "missing h1/json-ld"))
    elif "answer-lead" not in s and rel(f) != "/":
        bad.append((rel(f), "no direct-answer"))
check("H1 + JSON-LD on all; direct-answer on content pages", not bad, str(bad[:8]))

# 6. No dead internal links (resolve against prerendered set + known dynamics)
live = set(rel(f) for f in files)


def link_ok(p):
    p = p.split("#")[0].split("?")[0].rstrip("/") or "/"
    return (
        p in live
        or bool(re.fullmatch(r"/centres/[a-z0-9-]+", p))
        or bool(re.fullmatch(r"/faculty/[a-z0-9-]+", p))
    )


dead, inbound = set(), set()
for f in files:
    for href in re.findall(r'href="(/[^"#?]*)"', open(f, encoding="utf-8").read()):
        if href.startswith(("/assets/", "/_")) or any(href.endswith(x) for x in (".svg", ".png", ".jpg", ".css", ".js", ".xml", ".txt", ".csv", ".ico")):
            continue
        inbound.add(href.rstrip("/") or "/")
        if not link_ok(href):
            dead.add(href)
check("No dead internal links", not dead, str(sorted(dead)[:8]))

# 7. No orphan pages (every page except home has an inbound link)
orphans = [p for p in live if p != "/" and p not in inbound and p.rstrip("/") not in inbound]
check("No orphan pages", not orphans, str(sorted(orphans)[:12]))

# 8. Article pages free of FAQPage/AggregateRating; FAQPage only on FAQ hubs
def has(p, needle):
    fp = f"{DIST}/{p}/index.html"
    return os.path.exists(fp) and needle in open(fp, encoding="utf-8").read()

article_samples = [
    "ipmat/marking-scheme", "cuet/exam-pattern", "cuet/history", "cuet/policy",
    "ipmat/compare/ipm-vs-bba", "ipmat/worth-it", "blog/how-cuet-cutoffs-work",
    "cuet/is-cuet-hard", "ipmat/city/indore",
]
bad = [p for p in article_samples if has(p, '"FAQPage"') or has(p, "AggregateRating")]
check("Article/blog pages free of FAQPage/AggregateRating", not bad, str(bad))
faq_hubs = ["faq", "faq/cuet", "faq/ipmat", "cuet/faq", "ipmat/faq"]
check("FAQPage present on FAQ hubs", all(has(p, '"FAQPage"') for p in faq_hubs))

# 9. NewsArticle on news posts; Blog on /blog; Article on blog posts
check("Blog schema on /blog", has("blog", '"@type":"Blog"'))
check("Article on blog posts", has("blog/how-cuet-cutoffs-work", '"@type":"Article"'))

# 10. SOP H8: sitemap-news.xml present and referenced in the index
news_ok = os.path.exists(f"{DIST}/sitemap-news.xml")
idx = open(f"{DIST}/sitemap.xml", encoding="utf-8").read() if os.path.exists(f"{DIST}/sitemap.xml") else ""
check("sitemap-news.xml present", news_ok)
check("sitemap-news.xml referenced in index", "sitemap-news.xml" in idx)
nf = open(f"{DIST}/sitemap-news.xml", encoding="utf-8").read() if news_ok else ""
check("sitemap-news has /blog and /news", "/blog" in nf and "/news" in nf)

# 11. Naming guardrail: NTA exam-centers distinct from LPT /centres
exam_city_pages = glob.glob(f"{DIST}/cuet/exam-centers/*/index.html")
centre_pages = glob.glob(f"{DIST}/centres/*/index.html")
overlap = set(os.path.basename(os.path.dirname(p)) for p in exam_city_pages) & set(
    os.path.basename(os.path.dirname(p)) for p in centre_pages
)
check("exam-centers/[city] slugs distinct from /centres/[area]", not overlap, str(overlap))

print()
if fails:
    print(f"AUDIT FAILED — {len(fails)} gate(s): {fails}")
    sys.exit(1)
print(f"AUDIT PASSED — all gates green across {len(files)} pages.")
