# Which ASIN and which surface actually earn the affiliate clicks

Board item: `itm_coopventilationcalc_monetization_0003` (lane: monetization)
Read on: 2026-10-12
Window: rolling 30 days, 2026-09-12 to 2026-10-12 (read at 15:49 UTC)

This is a reading, not a change. Nothing in the product surface was moved. Moving it is
`itm_coopventilationcalc_monetization_0004`, and the point of reading first is that the
answer below is not the one the surface was built on.

## Source and exact query

PostHog project 416122, key from keychain `posthog-personal-coopventilationcalc-key`.
Every figure here comes from one HogQL predicate, the same one the registered metric uses:

```sql
event = 'affiliate_click'
  and timestamp > now() - interval 30 day
  and properties.internal != true
```

## Total, reconciled against the metric reader

| Reading | Value |
|---|---|
| This breakdown, summed | 29 |
| `readMetric` with `{kind: posthog-event-count, days: 30, filter: properties.internal != true}` | 29 |
| Same reader at the plan's registered 7 days (obj6) | 6 |

The 30-day total matches the metric reader exactly, and every breakdown below sums to 29.

29 clicks came from 17 distinct people. First click in the window landed 2026-09-14,
the last 2026-10-11, and only 13 of the 30 days carry any click at all.

### The internal filter is applied, and on this site it is inert

The filter excluded 0 of 29 events. `properties.internal` is NULL on every affiliate_click
this site has ever sent, because `components/AffiliateLink.tsx` does not set it. There is no
crawler self-identification here of the kind isthereasbestos has, where the same filter drops
about 75 percent of raw volume.

Two consequences worth stating plainly:

1. The filter is not protecting this number. It is syntactically correct and currently a no-op.
   Any bot that executes JavaScript and clicks is inside the 29.
2. It is not silently zeroing the number either. PostHog compiles `properties.internal != true`
   to `ifNull(notEquals(...), 1)`, so NULL rows are kept, not dropped. Verified against the raw
   unfiltered count (29) and an explicit `ifNull(properties.internal, false) != true` (29).

## By surface

| Surface | Component | Clicks | Share | People |
|---|---|---|---|---|
| `related-products` | RelatedProducts, after the calculator result | 27 | 93.1% | 15 |
| `affiliate-products` | AffiliateProducts, homepage and posts | 2 | 6.9% | 2 |

## By surface and page, which is the actual finding

| Surface | Page | Clicks | Pageviews (30d) |
|---|---|---|---|
| `related-products` | `/` | 27 | 142 |
| `affiliate-products` | `/blog/chicken-coop-ventilation-requirements` | 1 | 25 |
| `affiliate-products` | `/blog/types-of-chicken-coop-ventilation` | 1 | 18 |
| `affiliate-products` | `/` | **0** | 142 |

The homepage carries both blocks. `app/page.tsx` renders `<AffiliateProducts max={6} />`, and
the live homepage HTML does serve all six outbound links (B0GKDJ9QDP, B0GGMX47HP, B0DKF5ZXRM,
B0D2VNZV61, B0B11JXN7T, B00658O1HE), so this is not a rendering failure. Over 142 pageviews and
111 unique visitors, that six-product grid earned nothing, while the three-product panel below
the calculator result on the same page earned 27.

Both blocks route through the same `AffiliateLink` and the same capture call, so the gap is not
an instrumentation asymmetry. What differs is position and intent: one sits after a number the
visitor asked for, the other sits in the page furniture.

## By ASIN

`rel` and `aff` split the same click total by surface. "Grid" marks the six products the
homepage AffiliateProducts block currently renders.

| ASIN | Product | Clicks | People | rel | aff | Grid |
|---|---|---|---|---|---|---|
| B0DKF5ZXRM | Forestchill 6x6 Louvered Vent with Screen, Black | 9 | 8 | 8 | 1 | yes |
| B00658O1HE | Shed Louvered Exhaust Vent 4x16, White (set of 2) | 5 | 5 | 5 | 0 | yes |
| B0BM45GHZV | Thinkahead Hardware Cloth 1/2-inch, 36x100ft | 4 | 4 | 4 | 0 | no |
| B0D2VNZV61 | Yaocom 10x10 Aluminum Gable Vent (2-pack) | 3 | 2 | 2 | 1 | yes |
| B0BBVHZKM9 | Weewooday Mini Thermometer-Hygrometer, 3-pack | 2 | 2 | 2 | 0 | no |
| B0DKF5L3C2 | Forestchill 6x12 Louvered Vent with Screen, White | 2 | 2 | 2 | 0 | no |
| B0CSN7RZ1B | ecoCalm Solar Fan with Thermostat, 4-inch | 1 | 1 | 1 | 0 | no |
| B0B11JXN7T | HG Power 6-inch Exhaust Fan with Damper | 1 | 1 | 1 | 0 | yes |
| B015PD9F52 | AMAGABELI Hardware Cloth 1/4-inch, 48x50ft | 1 | 1 | 1 | 0 | no |
| B0G2XDCFXQ | Wintcomfort 12x12 Adjustable Gable Vent (2-pack) | 1 | 1 | 1 | 0 | no |

One louvered vent, B0DKF5ZXRM, takes 9 of 29 clicks (31%). The top three take 18 of 29 (62%).

Eight of the 18 catalogued products took zero clicks on any surface: B0DK511FPQ, B0GGMX47HP,
B09VNS1DSZ, B0GKDJ9QDP, B092QXC6CC, B0BM4LXD26, B0CRRFCHJ2, B01ACID0LA.

### The concentration is not one person

Checked, because 29 clicks from 17 people could be one enthusiastic visitor.

- Clicks per person: 12 people clicked once, 3 clicked three times, 2 clicked four times.
- Most clicks from any single person: 4.
- B0DKF5ZXRM's 9 clicks come from 8 distinct people, so its lead is a product signal rather
  than one session.

## What this licenses, and what it does not

Two facts are now committed and reconciled, and item 0004 can act on them:

1. The post-result surface earns 93% of clicks. The homepage product grid earns 0 of 142.
2. Two of the six homepage grid slots (B0GGMX47HP, B0GKDJ9QDP) have never been clicked anywhere,
   while three products that earn (B0BM45GHZV with 4, B0DKF5L3C2 with 2, B0BBVHZKM9 with 2) are
   absent from that grid. Category diversification in `filterProducts`, not demand, decides what
   the grid shows.

Limits that a decision has to carry:

- **29 clicks is a small sample.** No ASIN difference below roughly 4 clicks is distinguishable
  from noise here, and the long tail of 1-click products should not be ranked against each other.
- **There is no revenue in this.** Amazon order and commission data is not wired to anything.
  A click is a proxy for earnings, so "earns" throughout this document means clicks, not dollars,
  and a high-click low-conversion product cannot currently be told apart from a good one.
- **`related-products` has no honest denominator.** The 30-day event inventory is `$autocapture`,
  `$pageview`, `$pageleave`, `affiliate_click`, `$rageclick`. Nothing records a calculator
  submission, so the block's real exposure is unknown and 27/142 pageviews understates its rate
  by an unknown factor. Comparing the two surfaces by click share is sound; quoting either as a
  conversion rate is not.
