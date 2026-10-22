# Moving the product surface against the click data

Board item: `itm_coopventilationcalc_monetization_0004` (lane: monetization)
Changed on: 2026-10-22
Reads from: [`monetization-0003-affiliate-click-reading.md`](./monetization-0003-affiliate-click-reading.md)

The reading came first on purpose, and it did not say what the surface was built on. The
homepage's six-product grid earned 0 affiliate clicks across 142 pageviews, while the
three-product panel below the calculator result, on the same page, earned 27 of 29. Category
diversification, not demand, was choosing which product represented each category, which is how
two ASINs nobody has ever clicked ended up holding two of the six homepage slots.

## The attribution reading

`affiliate_clicks_7d` is this objective's registered metric: `affiliate_click` events in PostHog
over 7 days, excluding `internal = true`.

| Read | When | Value |
|---|---|---|
| Immediately before the change | 2026-10-22T20:49:58Z | **11** |
| First weekly wake after | due 2026-10-29 | _not yet read_ |
| Second weekly wake after | due 2026-11-05 | _not yet read_ |

Objective baseline is 12 and target is 20 by 2026-12-01, so the pre-change read of 11 sits
slightly below the baseline it was registered at. Both later reads are the same reader on the
same 7-day window, so they are comparable to this one and to each other.

Neither later read is a verdict on its own. Weekly volume here is 6 to 12 clicks, 13 of the last
30 days carried no click at all, and traffic is flat but not fixed. A move from 11 to 13 is
inside that noise; a move to 20 or to 4 is not.

## What changed

**1. Demand decides which product represents a category** (`lib/affiliate-demand.ts`, used by
`filterProducts`). The 30-day click counts are committed as a table and the catalog is ordered by
them before any product is chosen. Previously the order was the order products were typed into
`data/affiliate-products.json`.

**2. Airflow hardware still outranks demand** (`relevanceBand`). Ordering on clicks alone put a
hygrometer above a solar exhaust fan for a hot-summer keeper, because hygrometers took 2 clicks
and that fan took 1. A monitor does not move a CFM, and this site's only asset is being right
about the number the calculator just produced, so measurement-only categories sort last and
demand ranks inside that split rather than across it.

**3. The homepage grid drops from six slots to three** (`app/page.tsx`). Six slots earning nothing
is page furniture, not inventory. The block stays, at a third of the weight and demand-ordered, so
the position keeps being counted instead of being written off on one 30-day read.

**4. The crawler filter now does something** (`lib/internal-traffic.ts`). The metric excludes
`internal = true`, but `AffiliateLink` never set the property, so every row was NULL and the
filter dropped nothing. It is now set on every click, opt-in by `?internal=1` for the session and
never inferred from a user agent, so an operator test click can be kept out of the graded number
without risking a real click being marked internal.

**5. The calculator reports its submissions** (`calculator_submit`). The panel that earns 93% of
the clicks had no denominator: pageviews are not submissions, so nothing could say whether a
change moved the panel's rate or only its traffic. The next read gets to tell those apart.

### Shortlist before and after

Unfiltered, as the homepage and blog blocks render it:

| Surface | Before | After |
|---|---|---|
| Homepage grid | B0DKF5ZXRM, B0D2VNZV61, B00658O1HE, B0GGMX47HP (0 clicks), B0B11JXN7T, B0GKDJ9QDP (0 clicks) | B0DKF5ZXRM, B00658O1HE, B0BM45GHZV |
| Blog block | B0DKF5ZXRM, B0D2VNZV61, B00658O1HE | B0DKF5ZXRM, B00658O1HE, B0BM45GHZV |

The result panel filters by flock size and climate, so its shortlist varies. Across seven sampled
input combinations it changed in five, and in every one of those the product it dropped had fewer
clicks than the product it gained. Two examples:

- 4 birds, hot-summer: a never-clicked fan kit is replaced by half-inch hardware cloth (4 clicks),
  and the solar fan stays, because airflow hardware outranks a hygrometer.
- 12 birds, humid-coastal: a never-clicked solar fan is replaced by half-inch hardware cloth.

## What this cannot claim

- **Not a conversion rate.** `calculator_submit` starts recording today, so it gives the next read
  a denominator and says nothing about the 29 clicks already banked.
- **Not revenue.** Amazon order and commission data is still wired to nothing. Every number here
  is clicks, and a high-click low-conversion product still cannot be told from a good one.
- **Not a clean experiment.** Five changes shipped in one commit because they are one decision,
  which means the two later reads grade the decision and not any single part of it. If clicks move,
  the demand ordering and the dropped slots cannot be separated from each other.
- **Not a verdict on the homepage position.** The block was cut, not moved. Whether that position
  can earn at all is still untested, and three slots is what keeps the question countable.
