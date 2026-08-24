# Correctness audit: unshipped drafts vs lib/formulas.ts

itm_coopventilationcalc_correctness_0003 — audit all unshipped drafts for figures that
disagree with `lib/formulas.ts`.

**Unshipped** = present in `content-drafts/` (33 total) but not yet integrated into the live
roster (`lib/posts.ts` + `lib/genesis-blog-posts.ts`). Diffing draft slugs against the live
roster slugs found exactly 10 unshipped drafts. All 10 were checked against the calculator's
actual constants:

- Summer: 5 CFM/bird base, x climate multiplier (1.00–1.50) → 5.0–7.5 CFM/bird, never below 5
  or above 7.5.
- Winter: 1 CFM/bird flat, no multiplier.
- Vent area: 144 sq in per 10 sq ft floor (= 1 sq ft per 10 sq ft — this ratio is fine as
  stated in prose).
- Inlet/outlet split: exactly 50/50 of total vent area (PSU 1083). Never a fixed per-bird
  square-inch number, never 60/40.

## 8 of 10 drafts have a conflicting figure

1. **`content-drafts/chicken-coop-vent-sizing-recommendations.md`**
   - States a 60/40 high/low split (lines 10, 18, 26 table, 68) vs. the calculator's 50/50.
   - States summer airflow as "4 to 8 CFM per bird" (lines 55, 71) vs. the calculator's actual
     5.0–7.5 CFM/bird range.

2. **`content-drafts/chicken-coop-ventilation-for-10-chickens.md`**
   - 60/40 split (line 10) vs. 50/50.
   - "40 to 80 CFM that 10 hens need" (line 24) vs. the calculator's actual 50–75 CFM for 10
     birds across all five climate zones.

3. **`content-drafts/cold-weather-chicken-coop-ventilation.md`**
   - Line 34: "convert that to roughly 1 square inch of open outlet area per bird as a floor.
     A 6-hen coop needs at least 6 square inches of outlet open at all times." The calculator
     has no fixed per-bird outlet minimum — outlet area is always half of total vent area,
     which is floor-driven. For a 6-hen, 32 sq ft coop the tool's outlet area is ~230 sq in,
     not 6. Same bug class already fixed once in the live `preventing-frostbite-chickens` post
     (commit 45375c9).

4. **`content-drafts/how-much-ventilation-per-chicken-coop-square-footage.md`**
   - "4 to 8 CFM per bird" summer (line 43) vs. actual 5.0–7.5 CFM/bird.
   - 60/40 split (line 49) vs. 50/50.

5. **`content-drafts/how-to-calculate-chicken-coop-ventilation.md`**
   - "4 to 8 CFM in summer" (lines 49, 77) vs. actual 5.0–7.5 CFM/bird.
   - 60/40 split (lines 37, 74) vs. 50/50.

6. **`content-drafts/how-to-keep-chicken-coop-cool-in-summer.md`**
   - Presents an "air change per minute" method yielding 144 CFM for a 6-hen, 4x6 ft coop as a
     valid summer target. The calculator tops out at 45 CFM for 6 birds (humid-coastal, the
     highest multiplier) — 144 CFM is over 3x anything the tool would ever return for that
     flock. The per-pound-of-bodyweight method in the same table (29–36 CFM) is closer to but
     still not reconciled with the tool's 30–45 CFM range for 6 birds.

7. **`content-drafts/ventilation-for-10-chickens-coop.md`**
   - 60/40 split (table rows, lines 24–25) vs. 50/50.
   - "40 to 80 CFM" for 10 birds (lines 27, 37, 59, 68) vs. actual 50–75 CFM.

8. **`content-drafts/ventilation-for-10-chickens-in-coop.md`**
   - 60/40 split (table rows, lines 18–19) vs. 50/50.
   - "40 to 80 CFM" for 10 birds (lines 21, 55, 68) vs. actual 50–75 CFM.

## 2 of 10 drafts reconcile clean

9. **`content-drafts/minimum-temperature-for-chickens-in-winter.md`** — only states 1 CFM/bird
   winter, no split or summer figure. Matches.

10. **`content-drafts/signs-of-poor-ventilation-in-chicken-coop.md`** — only states the 1 sq
    ft per 10 sq ft floor ratio, no split or CFM figure. Matches.

## Scope note

This item's done_when is the list above, not the fix. Correcting the 8 flagged drafts (and
deciding whether the 60/40 figure is a stale pre-PSU-1083 convention worth purging site-wide,
since it also shows up in already-shipped posts) is separate work for whichever item picks up
the `site-publish` gate on these slugs.
