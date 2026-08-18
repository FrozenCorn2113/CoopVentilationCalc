# Coop Ventilation Calculator

Works out how much vent area a chicken coop actually needs, and where to put it,
from flock size, floor area, and climate.

**Live:** https://coopventilationcalc.com  ·  **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind 4

![Coop Ventilation Calculator](docs/screenshot.png)

## Why this exists

Every source on backyard-coop ventilation gives a different rule of thumb, and
they are not measured in the same units. Some are CFM per bird, some are square
inches of vent per square foot of floor, and the two disagree for most real
coops. Owners end up guessing, and the usual outcome is a coop sealed too tight
in winter, where trapped moisture causes frostbite faster than dry cold does.

This reconciles the rules into one answer: total vent area, split into low inlets
and high outlets, adjusted for climate.

## Running it

    npm install
    npm run dev

Opens on http://localhost:3000. No API keys required. The email capture, payment,
and analytics routes are inert until their environment variables are set.

## How it works

- **The math lives in `lib/formulas.ts`**, separate from any component, so the
  recommendation can be tested and cited independently of how it is rendered.
- **The calculator does not live-update.** Results are computed on submit.
- **Content pages are statically generated** from typed rosters in `lib/`
  (`posts.ts` for guides, `faqs.ts` for FAQ entries, `data.ts` for parameterized
  routes). Adding an entry to a roster adds a page, its sitemap row, and its
  structured data.
- **FAQ and article schema are generated from the same rosters** that render the
  page, in `lib/schema.ts`, so the structured data cannot drift from the visible
  content.
- `/go/[asin]` is a geo-aware affiliate redirect that picks a regional tag from
  the request country rather than shipping two sets of links.

## Design tradeoffs

**Rosters in TypeScript instead of a CMS or a database.** For a site this size a
CMS is a dependency, a monthly bill, and a network call on every build, in
exchange for an editing UI that one person does not need. Typed rosters mean a
malformed post fails at compile time rather than rendering broken in production.
The cost is real: a non-technical editor cannot publish, and the roster files get
long. If a second person ever edits this, that trade flips.

**Deliberate latency on the result.** The calculator waits ~1.5 to 2.2 seconds
before showing an answer, which is dishonest as engineering and correct as
interface design. The math is instant, and an instant answer reads as a lookup
table rather than a calculation, so people trust it less and re-run it more. This
is the one place where the code is slower on purpose, and it is worth flagging
rather than hiding.

**Schema generated from the render source, not written by hand.** Hand-authored
JSON-LD is faster to ship and silently goes stale the first time the copy
changes. Deriving it costs an abstraction layer and removes an entire category of
bug where the structured data claims something the page no longer says.

## License

MIT
