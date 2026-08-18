// FAQ data for Coop Ventilation Calculator homepage + blog scope.
// Append-only. Ordering is stable so FAQ schema output does not churn.

export type Faq = {
  q: string
  a: string
  topic?: string
}

export const faqs: Faq[] = [
  {
    q: 'How much ventilation does a chicken coop need?',
    a: 'Plan for 5 CFM of airflow per adult standard hen in summer, dropping to about 1 CFM per bird in winter for moisture removal. In square inches of vent area, the cooperative-extension rule of thumb is 144 sq in per 10 sq ft of coop floor, split roughly half low inlets and half high outlets.',
    topic: 'sizing',
  },
  {
    q: 'How many square inches of ventilation do I need per chicken?',
    a: 'There is no clean per-bird square-inch rule because vent area scales with coop floor, not birds alone. The simplest answer: target 1 sq ft (144 sq in) of total vent area for every 10 sq ft of coop floor. The calculator reconciles flock size, floor area, and climate so you do not have to do it twice.',
    topic: 'sizing',
  },
  {
    q: 'What is CFM and why does it matter for my coop?',
    a: 'CFM stands for cubic feet per minute, the unit that measures how much air moves through a space. A coop without enough CFM holds humidity, ammonia from droppings, and respiratory irritants. The University of Kentucky small-flock standard is 5 CFM per bird in summer, 1 CFM in winter. Most coops fail the summer number, which is why heat stress and respiratory illness show up in July.',
    topic: 'basics',
  },
  {
    q: 'How do I ventilate a chicken coop in winter without freezing my chickens?',
    a: 'Cold is rarely the killer in a winter coop. Trapped moisture is. Keep the high outlets open above roost height so warm humid air rises out, and reduce low inlets so cold drafts do not blow across the birds. Aim for 1 CFM per bird, not zero. A coop sealed shut against the cold builds humidity, which causes frostbite faster than dry cold alone.',
    topic: 'seasonal',
  },
  {
    q: 'How do I ventilate a chicken coop in summer to prevent heat stress?',
    a: 'Open everything you can: low inlets near the floor, high outlets at the ridge, and any window vents on the shaded side. The extension-service summer target is 5 CFM per bird, which most passive coops cannot hit without help. Above 85°F, add a small DC fan on the outlet side rather than relying on cross-breeze.',
    topic: 'seasonal',
  },
  {
    q: 'What are the signs of bad ventilation in a chicken coop?',
    a: 'Three signals: a sharp ammonia smell when you walk in, condensation on the ceiling or windows in the morning, and damp bedding that stays damp. Combs that look pale or pasty in winter are also a moisture indicator. If any of those are present, your CFM is below target.',
    topic: 'troubleshooting',
  },
  {
    q: 'Why does my chicken coop smell like ammonia and how do I fix it?',
    a: 'Ammonia rises from wet droppings as bacteria break them down. The smell means moisture is not leaving the coop fast enough. Two fixes, in order: increase high-outlet vent area (you almost certainly need more than you have), then reduce moisture input by changing bedding more often or moving waterers outside.',
    topic: 'troubleshooting',
  },
  {
    q: 'How many vents does a coop for 10 chickens actually need?',
    a: 'For 10 standard hens in a typical 4×8 (32 sq ft) coop in a temperate climate, the calculator returns about 460 sq in of total vent area: 230 low and 230 high. That is roughly two 6×12 louvered vents low and two 6×12 high, or one continuous ridge vent plus two soffit vents. Specifics depend on your climate.',
    topic: 'sizing',
  },
  {
    q: 'Where should I put vents in my chicken coop, high, low, or both?',
    a: 'Both. Low inlets near the floor pull cool fresh air in. High outlets at the ridge let warm humid air leave. A coop with only one or the other does not move air, it traps it. Split your total vent area roughly 50/50 between low and high.',
    topic: 'placement',
  },
  {
    q: 'Do I need a fan in my chicken coop, or will passive vents work?',
    a: 'Passive vents handle most temperate climates if they are sized correctly. Add a fan when summer highs regularly exceed 85°F, when humidity stays above 70%, or when the coop sits in a wind-shadow that kills natural airflow. A small 4-inch DC fan on the outlet side is plenty for flocks under 20.',
    topic: 'hardware',
  },
  {
    q: 'What is the difference between ventilation and a draft, and why does it matter?',
    a: 'A draft is moving air across the birds at roost height. Ventilation is air entering low and leaving high without crossing the roost. The same opening can be either, depending on placement. Vents at roost height become drafts in winter. The same vents 12 inches lower stop being a problem.',
    topic: 'basics',
  },
  {
    q: 'Can too much ventilation make my chickens sick?',
    a: 'Not directly. The risk is wind chill from drafts at roost level, not from total airflow. As long as the inlets stay below roost height, you cannot really overdo total vent area. Most failing coops err the other direction by sealing too much.',
    topic: 'basics',
  },
  {
    q: 'What counts as good ventilation in a chicken coop?',
    a: 'Good ventilation means continuous airflow that removes moisture and ammonia without blowing directly on the birds. In practice that means low inlets near the floor and high outlets at the ridge, split roughly 50/50, sized to the cooperative-extension rule of 144 sq in of vent area per 10 sq ft of coop floor. If the coop smells clean and stays dry inside on a humid morning, the ventilation is working.',
    topic: 'basics',
  },
  {
    q: 'Why is chicken coop ventilation important?',
    a: 'Chickens produce moisture and ammonia every day through respiration and droppings, and a sealed coop traps both. Poor ventilation is the leading cause of respiratory illness, frostbite (moisture, not cold, is the real driver), and heat stress in backyard flocks. Proper airflow, sized to 5 CFM per bird in summer and 1 CFM per bird in winter, keeps the air breathable year-round.',
    topic: 'basics',
  },
]

export const faqsForHomepage: Faq[] = faqs.slice(0, 10)
