import type { BlogPost } from './blog-posts'

// Genesis content-handler append target.
//
// The genesis-content-handler heartbeat skill appends new BlogPost entries to the
// `genesisBlogPosts` array below (roster mode, per site-config.json blog_storage="roster").
// Do NOT hand-curate posts here; hand-written posts live in lib/posts.ts. This file is
// machine-writable and starts empty. Keep the export name and the BlogPost type exactly
// as-is so the handler's append logic and grep-preconditions keep working.
export const genesisBlogPosts: BlogPost[] = [
  {
    slug: 'roosting-bar-setup',
    title: 'Roosting Bar Setup: Space, Height, and Vent Placement',
    description:
      'A roosting bar needs about 6 inches per standard hen at 18 to 24 inches high, placed so no vent blows across the birds.',
    publishedAt: '2026-07-21',
    body: `A roosting bar needs about 6 inches of bar per standard hen, mounted 18 to 24 inches above the coop floor, with bars set a foot apart and positioned so no vent blows directly across them. Bantams need roughly 4 inches each, mounted lower at 12 to 18 inches.

Those numbers are the easy part. What most first coops get wrong is where the roost sits relative to the vents. Your flock spends 8 to 14 hours a night on that bar, breathing and dropping manure in one concentrated spot. Get the geometry right and that moisture leaves through the roof. Get it wrong and it condenses on combs.

## How Much Roost Space Does Each Chicken Need?

[Penn State Extension](https://extension.psu.edu/small-scale-poultry-housing) sets the standard at six inches per bird, with roosts spaced one foot apart and mounted 18 to 24 inches above the floor. Bantams only need four inches of roost space per bird and should sit lower, 12 to 18 inches off the floor.

Multiply and round up to the next board length:

- 4 standard hens: 24 inches, one 2 foot bar
- 6 standard hens: 36 inches, one 3 foot bar
- 10 standard hens: 60 inches, one 5 foot bar or two 30 inch bars
- 15 standard hens: 90 inches, two 4 foot bars

Size for summer, not winter. Birds press shoulder to shoulder in cold weather and use less bar than the formula predicts, then spread out in July. A roost sized to the winter huddle leaves the lowest hen in the pecking order on the floor in August, which is where feather picking and floor eggs start. Add an inch per bird for heavy breeds like Orpingtons and Brahmas.

## How High to Mount Roosting Bars

Eighteen to twenty four inches covers most standard flocks. Heavy breeds do better near 18 inches, because a 9 pound bird dropping from a high bar onto packed bedding is how bumblefoot starts. Bantams and young pullets belong at 12 to 18 inches.

A few placement rules that save rework:

- **Keep bars a foot apart horizontally.** Closer and the birds on the back bar foul the ones in front.
- **Do not stack bars like a ladder** unless you offset them. Chickens fight for the highest perch, so a vertical stack means every bird below wears the droppings of the bird above.
- **Put the roost higher than the nesting boxes.** Chickens sleep at the highest point they can reach, and if that point is a nest box you get filthy eggs every morning. Penn State advises locating nests at least 2 feet off the ground and at least four feet away from the roosts.

For the bar itself, a wide flat wooden surface beats a narrow round dowel. A chicken does not wrap its foot around a perch the way a songbird does. It squats with its toes flat and covers them with breast feathers, which is how it keeps them from freezing on a cold night. Two to four inches of flat bearing surface, edges sanded, is the common build.

## Winter Ventilation Without Drafts Starts at the Roost

According to [Poultry Extension](https://poultry.extension.org/articles/getting-started-with-small-and-backyard-poultry/housing-for-small-and-backyard-poultry-flocks/ventilation-in-small-and-backyard-poultry-flock-housing/), written by Dr. Jacquie Jacob at the University of Kentucky, summer airflow runs on the chimney effect through a ridge or eave opening, while in winter incoming fresh air enters through the roof and warms as it drops toward the floor, picking up moisture on the way down. That is the whole design rule: air comes in high, falls, collects moisture, and has to exit higher still.

So the roost has to live in the calm zone between those two paths:

- **Outlet vents go above roost height**, at the ridge or high on the gable, so the warm wet air your flock exhales all night can leave without crossing the birds first.
- **Inlet vents go low and off to the side**, never on the wall the roost backs onto and never pointed at it.
- **Nothing opens directly over the roost.** A vent above the bar drops cold incoming air straight onto the flock, which is a draft, not ventilation.

[Poultry Extension's frostbite guidance](https://poultry.extension.org/articles/poultry-health/frostbite-in-chickens/) notes that combs, wattles, and possibly toes are the most vulnerable to freezing, that chickens generate a great deal of moisture from their breathing, feces, and water spillage, and that proper ventilation is necessary to prevent moisture and ammonia increases. Frostbite in a backyard coop is usually a humidity failure rather than a temperature failure, and the humidity is densest right where the birds sleep.

A [droppings board](/blog/droppings-board-guide) under the bar catches the wettest output in the coop and lets you scrape it out each morning instead of letting it soak the litter. If you are working out winter openings, [ventilating without creating drafts](/blog/winter-ventilation-without-drafts) and [high, low, and ridge vent placement](/blog/vent-placement-high-low-ridge) both assume you already know where the birds sleep.

## Set Your Roost, Then Size Your Vents

Work in this order and you only build once:

1. Count your birds and multiply by 6 inches, or 4 for bantams, to get total bar length.
2. Pick a height, 18 to 24 inches for standard birds.
3. Mark the nest boxes lower than the roost and at least four feet away.
4. Place vents: outlets above the roost line, inlets low and off to the side.
5. Size those openings to your actual coop, because vent area is driven by floor area and flock size, not by guesswork.

Run your coop dimensions and bird count through the [ventilation calculator](/) and it returns the vent area and airflow your build actually needs. Do that before you cut any holes, because moving a ridge vent after the fact is far more work than moving a roosting bar.

## Frequently Asked Questions

**How much roost space does each chicken need?**
Six inches of bar per standard-size chicken and about four inches per bantam, according to Penn State Extension. Size for summer spacing rather than the tighter winter huddle, and add an inch per bird for heavy breeds.

**How high should a roosting bar be?**
Eighteen to twenty four inches above the floor for standard breeds, and 12 to 18 inches for bantams. Keep heavy breeds toward the lower end so they are not landing hard every morning.

**Should roosts be higher than the nesting boxes?**
Yes. Chickens sleep at the highest point they can reach, so a nest box at or above roost height becomes a bed and the eggs get dirty. Penn State advises nests at least 2 feet off the ground and at least four feet from the roosts.

**Can a vent go directly above the roost?**
No. Incoming air falls as it enters, so a vent over the bar drops cold air onto the flock and creates a draft. Put outlets above roost height but offset, and keep inlets low and to the side.

**What is the best material for a roosting bar?**
A wide, flat, sanded wooden bar with two to four inches of bearing surface. Chickens roost flat-footed and cover their toes with breast feathers, so flat wood protects feet better than a narrow dowel or a cold metal pipe.`,
    image: { src: '/images/post/post-roosting-bar-setup-ecc0.png', alt: 'Wooden roosting bars mounted at staggered heights inside a chicken coop with a droppings board below and a covered vent above' },
  },
]
