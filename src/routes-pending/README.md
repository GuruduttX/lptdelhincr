# Pending routes (SOP H7 — no thin spawns)

These are finished App Router pages for programmatic patterns whose datasets
have **no verified rows yet**. Under the previous TanStack build they were
routed but emitted **0 URLs**, because `src/lib/programmatic.ts` gates every
pattern on real (non-`illustrative`) data. They emit 0 URLs today too — so
parking them here changes nothing about the published site.

They live outside `app/` only because `output: "export"` fails the build if a
dynamic route's `generateStaticParams()` returns an empty array. Keeping them
here means the code stays in the repo and stays type-checked, without shipping
a thin page or blocking the build.

| Route | Emits when… |
| --- | --- |
| `cuet/colleges/[university]/[college]` | a `colleges` row passes `isCollegePublishable` |
| `cuet/colleges/best-for/[course]` | ≥1 publishable college offers the course |
| `cuet/results/college-predictor/[university]/[course]` | ≥1 publishable college backs the pair |
| `cuet/exam-centers/[city]` | an `examCities` row passes `isExamCityPublishable` |
| `cuet/news/[slug]` | a real, dated, sourced CUET `news` post exists |
| `ipmat/placements/[institute]` | a `placements` row passes `isPlacementPublishable` |
| `ipmat/programme/[institute]/fees` | a `fees` row passes `isFeePublishable` |

## Activating one

1. Add the verified rows to the matching file in `src/data/`.
2. Confirm the builder in `src/lib/static-params.ts` now returns a non-empty
   array for that pattern.
3. Move the directory into `app/`, preserving the path:

   ```bash
   mv "src/routes-pending/cuet/news/[slug]" "app/cuet/news/[slug]"
   ```

4. Add the new paths to `scripts/gen-sitemaps.mjs` and run `npm run sitemaps`.
5. `npm run gate` (build + D3 audit).
