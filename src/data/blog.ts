/*
 * Blog content. Keep this file free of '@/' imports: the build-time prerender script reads it under plain Node.
 * Cost ranges are rules of thumb, not quotes. Tax comments are general; readers are pointed to the ATO or an accountant.
 */

export interface BlogSection {
  heading: string
  paragraphs: string[]
  list?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  /** Meta description, under 155 characters. */
  description: string
  category: 'Budgeting' | 'Planning' | 'Suppliers' | 'Community' | 'Seasonal'
  /** ISO date. */
  date: string
  readMinutes: number
  excerpt: string
  intro: string
  sections: BlogSection[]
  takeaway: string
}

export const BLOG_AUTHOR = 'Event Plan On team'

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-build-an-event-budget',
    title: 'How to build an event budget: a step-by-step guide',
    description:
      'A practical guide to event budget management for Australian teams: set a total, split it by category, add contingency and track planned vs actual.',
    category: 'Budgeting',
    date: '2026-11-03',
    readMinutes: 6,
    excerpt: 'Set a total, split it into categories, hold back contingency and track every cost. Here is the method, step by step.',
    intro:
      'A good event budget does two jobs: it tells you what you can afford, and it warns you early when you are drifting off course. Whether you use a spreadsheet or event budget management software, the method is the same.',
    sections: [
      {
        heading: '1. Start with the total, not the wish list',
        paragraphs: [
          'Confirm the number you can actually spend, and who has to approve it. Work backwards from that total instead of adding up everything you would like and hoping it fits.',
          'Write down the event goal, the guest count and the date. These three facts drive most of your costs.',
        ],
      },
      {
        heading: '2. Split the total into categories',
        paragraphs: ['Give every dollar a home before you start collecting quotes. Most events need some version of these categories:'],
        list: [
          'Venue and hire',
          'Catering and beverages',
          'AV, staging and production',
          'Décor and styling',
          'Speakers, talent or entertainment',
          'Marketing and registration',
          'Transport and accommodation',
          'Staffing and volunteers',
          'Contingency',
        ],
      },
      {
        heading: '3. Hold back a contingency',
        paragraphs: [
          'Set aside a slice of the total for surprises, often somewhere around 5 to 10 per cent depending on how many unknowns you have. Treat it as untouchable until a real need appears.',
        ],
      },
      {
        heading: '4. Record costs ex-GST and inc-GST',
        paragraphs: [
          'Supplier quotes in Australia arrive both ways. Decide on one basis for comparison, and keep the GST amount visible so your finance team can reconcile it later. If you are unsure how GST applies to your event costs, check current ATO guidance or ask your accountant.',
        ],
      },
      {
        heading: '5. Track planned vs actual as you go',
        paragraphs: [
          'Log each quote, deposit and invoice against its budget line. Comparing planned vs actual weekly, not at the end, is what lets you move money between lines before an overspend becomes a problem.',
        ],
      },
    ],
    takeaway:
      'Total first, categories second, contingency always, and track planned vs actual from day one. AI budgeting tools can build the first draft from a one-line prompt, so you spend your time on decisions rather than data entry.',
  },
  {
    slug: 'event-budget-categories-checklist',
    title: 'Event budget categories: what every Australian event needs',
    description:
      'A checklist of event budget categories, with rough allocation guides, so you do not forget costs like insurance, permits, GST and contingency.',
    category: 'Budgeting',
    date: '2026-10-27',
    readMinutes: 5,
    excerpt: 'The cost lines that catch teams out, from insurance and permits to staffing and contingency, with a rough guide to how much to allow.',
    intro:
      'Most budget blow-outs come from costs nobody listed, not from costs that rose. Use this checklist to make sure every category has a line before you start planning.',
    sections: [
      {
        heading: 'The big four',
        paragraphs: [
          'For many events, venue, catering, AV and staffing make up the bulk of spend. As a rough rule of thumb, catering and venue together often take around half the total, but your event type and city will change that.',
        ],
        list: ['Venue and hire, including set-up and pack-down time', 'Catering, beverages and dietary requirements', 'AV, staging, lighting and a technician', 'Event staff, security and volunteers'],
      },
      {
        heading: 'The lines people forget',
        paragraphs: ['These are the costs that quietly appear after the budget is signed off:'],
        list: [
          'Public liability and event insurance',
          'Council permits and licences, such as liquor or road closures',
          'Signage, printing and name badges',
          'Parking, transport and accessibility needs',
          'Payment and booking fees',
          'Photography and video',
          'Waste, cleaning and amenities for outdoor events',
        ],
      },
      {
        heading: 'Do not skip contingency',
        paragraphs: [
          'Give contingency its own line so it is visible and defended. If you use it, record what it was spent on, so next time you can budget for that cost directly.',
        ],
      },
      {
        heading: 'Add GST consistently',
        paragraphs: [
          'Pick ex-GST or inc-GST for every line and stick to it. Mixing the two is one of the easiest ways to be out by thousands when the invoices land.',
        ],
      },
    ],
    takeaway:
      'Start from a full category list every time. A budget tool that generates category-wise budgets from your event details gives you a complete first draft, so nothing is missing before you begin.',
  },
  {
    slug: 'how-to-plan-an-eofy-function',
    title: 'How to plan an EOFY function and keep it on budget',
    description:
      'Plan an EOFY function in Australia: pick the date, set the budget, book suppliers early and track costs so your end-of-year event stays on budget.',
    category: 'Seasonal',
    date: '2026-10-14',
    readMinutes: 5,
    excerpt: 'EOFY is busy for venues and finance teams alike. Here is how to book early, budget clearly and avoid a 30 June scramble.',
    intro:
      'An end-of-financial-year function is a chance to thank clients and your team, but it lands when budgets are tight and venues are busy. A clear timeline and a tracked budget make it far easier.',
    sections: [
      {
        heading: 'Pick the date and format early',
        paragraphs: [
          'Late June is popular, so venues and caterers book out. Decide on format (lunch, cocktail evening or client breakfast) and lock the date as soon as you have approval.',
        ],
      },
      {
        heading: 'Agree the budget with finance first',
        paragraphs: [
          'EOFY spending often sits close to year-end reporting, so confirm which cost centre pays and when costs need to be recorded. Keep a running list of committed and paid amounts.',
        ],
      },
      {
        heading: 'Work backwards from event day',
        paragraphs: ['A simple timeline keeps things calm:'],
        list: [
          '10 to 12 weeks out: approve budget, shortlist venues',
          '8 weeks out: confirm venue, send save-the-dates',
          '6 weeks out: lock catering and AV, compare quotes',
          '4 weeks out: send invitations and open RSVPs',
          '1 week out: final numbers to caterer and venue',
        ],
      },
      {
        heading: 'Track costs, not just quotes',
        paragraphs: [
          'A quote is a promise, an invoice is a cost. Log both, and keep the GST amount visible so your finance team can reconcile quickly after the event.',
        ],
      },
    ],
    takeaway:
      'Book early, agree the budget with finance, and track planned vs actual from the first deposit. Overspend alerts help you spot a problem long before 30 June.',
  },
  {
    slug: 'compare-event-supplier-quotes',
    title: 'How to compare event supplier quotes fairly',
    description:
      'Event supplier management tips: compare venue, catering and AV quotes on the same basis so you choose the best value, not just the lowest price.',
    category: 'Suppliers',
    date: '2026-10-01',
    readMinutes: 5,
    excerpt: 'The lowest quote is rarely the cheapest. Compare like for like on inclusions, GST, staffing and payment terms.',
    intro:
      'Three quotes for the same event can look wildly different, and the cheapest one often leaves things out. Good event supplier management means comparing like with like.',
    sections: [
      {
        heading: 'Ask every supplier the same brief',
        paragraphs: ['Send one written brief with the date, guest count, run time, location and any must-haves. Quotes based on the same brief are far easier to compare.'],
      },
      {
        heading: 'Line up the same inclusions',
        paragraphs: ['Check each quote against the same list before you compare totals:'],
        list: [
          'Is staffing included, and for how many hours?',
          'Are equipment, set-up and pack-down included?',
          'Is GST included or added on top?',
          'What are the deposit, payment dates and cancellation terms?',
          'What happens if guest numbers change?',
        ],
      },
      {
        heading: 'Compare side by side',
        paragraphs: [
          'Put the quotes in one view, with GST on the same basis, and note what is missing from each. Often the lowest quote needs a few hundred dollars of add-ons to match the others.',
        ],
      },
      {
        heading: 'Link the winner to a budget line',
        paragraphs: [
          'Once you choose, allocate the supplier to its budget line so you can see committed cost against what you planned. That is what keeps cost control honest.',
        ],
      },
    ],
    takeaway:
      'Same brief, same inclusions, same GST basis. A tool that lets you compare quotes side by side and allocate the winner to a budget line saves hours and avoids surprises.',
  },
  {
    slug: 'event-cost-control-tips',
    title: 'Event cost control: 7 ways to catch overspend early',
    description:
      'Seven practical event cost control habits, from real-time budget tracking to overspend alerts, that help you spot budget problems before they grow.',
    category: 'Budgeting',
    date: '2026-09-22',
    readMinutes: 5,
    excerpt: 'Overspend rarely arrives in one big hit. These seven habits help you notice it while there is still time to act.',
    intro:
      'Most events do not go over budget on one dramatic decision. They drift, a few hundred dollars at a time. These habits make the drift visible.',
    sections: [
      {
        heading: 'Seven habits that work',
        paragraphs: ['Pick the ones that fit your team and make them routine:'],
        list: [
          'Give every cost a budget line and an owner.',
          'Log quotes as soon as you receive them, not when you pay.',
          'Review planned vs actual every week.',
          'Set an alert threshold, such as 90 per cent of a line.',
          'Keep contingency as a separate, protected line.',
          'Record every change request with its cost before approving it.',
          'Hold a short budget review a week before the event.',
        ],
      },
      {
        heading: 'Why real-time tracking matters',
        paragraphs: [
          'A month-end spreadsheet tells you what went wrong. Real-time budget tracking tells you while you can still renegotiate, swap a supplier or move money from a line that is running under.',
        ],
      },
      {
        heading: 'Make it a team habit',
        paragraphs: [
          'Cost control works when everyone who spends money can see the budget. Give your team access to log expenses, and give approvers a clear view of what is committed.',
        ],
      },
    ],
    takeaway:
      'Visibility beats willpower. Put planned vs actual where the whole team can see it and set overspend alerts, so a small drift becomes a quick decision instead of a big problem.',
  },
  {
    slug: 'budgeting-for-not-for-profits-and-community-events',
    title: 'Budgeting for not-for-profits and community events',
    description:
      'Budgeting for not-for-profits and community groups: make limited funds and grants go further with a simple budget and shared expense tracking.',
    category: 'Community',
    date: '2026-09-09',
    readMinutes: 5,
    excerpt: 'Limited funds and shared spreadsheets are a risky mix. A simple budget and shared tracking keep committees on the same page.',
    intro:
      'Community groups, sporting clubs, schools and charities often run great events on very little money. The challenge is making sure every dollar, and every volunteer, stays on the same page.',
    sections: [
      {
        heading: 'Know your funding sources',
        paragraphs: [
          'List where the money comes from (grants, sponsorship, ticket sales, donations) and any conditions attached. Some grants limit what you can spend on, so tag each cost to its source.',
        ],
      },
      {
        heading: 'Keep the budget simple',
        paragraphs: ['A short, clear budget beats a detailed one nobody updates. Start with:'],
        list: ['Venue and equipment hire', 'Food and drink', 'Insurance and permits', 'Promotion', 'Prizes or thank-you gifts', 'A contingency of your own'],
      },
      {
        heading: 'Track expenses in one place',
        paragraphs: [
          'When several volunteers buy things, costs end up in group chats and personal receipts. Give the committee one shared place to log every expense, with a photo of the receipt where possible.',
        ],
      },
      {
        heading: 'Report back clearly',
        paragraphs: [
          'Funders and committees want to see planned vs actual. A simple report at the end makes acquittals easier and builds trust for next year’s funding.',
        ],
      },
    ],
    takeaway:
      'Simple budget, one shared expense list, early warnings and a clear report. That is how limited funds go further, without adding to the volunteers’ workload.',
  },
  {
    slug: 'what-to-include-in-an-event-proposal',
    title: 'What to include in an event proposal (and send it faster)',
    description:
      'What to include in an event proposal for clients and sponsors, plus how event proposal software helps agencies and organisers send quotes faster.',
    category: 'Planning',
    date: '2026-08-26',
    readMinutes: 5,
    excerpt: 'A clear proposal wins work. Here is what to include, and how to stop rebuilding it from scratch every time.',
    intro:
      'Clients and sponsors decide quickly. A clear, well-structured proposal makes the decision easy, and building it from your budget makes it fast.',
    sections: [
      {
        heading: 'The essentials',
        paragraphs: ['Keep it short and easy to scan. Most winning proposals include:'],
        list: [
          'A one-paragraph summary of the event and its goal',
          'Date, venue and guest numbers',
          'What is included, and what is not',
          'A clear cost breakdown with GST shown',
          'Payment terms and a deposit',
          'Timeline and next steps',
          'An optional extras list, such as premium AV',
        ],
      },
      {
        heading: 'Lead with the result',
        paragraphs: ['Open with what the client gets, not with your company history. Put the total and the key inclusions near the top.'],
      },
      {
        heading: 'Make options easy to choose',
        paragraphs: ['Offer two or three clear packages rather than a long menu. It helps clients decide and helps you protect your margin.'],
      },
      {
        heading: 'Build from your budget',
        paragraphs: [
          'If your proposal is built from the same budget you will track, there is no re-typing and no mismatch between what you quoted and what you spend. Event proposal software that generates a proposal from your budget turns an afternoon into minutes.',
        ],
      },
    ],
    takeaway:
      'Summarise, price clearly with GST, offer options and send quickly. Building proposals directly from your budget keeps the quote and the plan in sync.',
  },
  {
    slug: 'christmas-party-budget-timeline',
    title: 'Christmas party budget and timeline for Australian teams',
    description:
      'Plan a workplace Christmas party in Australia: a budget checklist and timeline covering venue, catering, entertainment and GST, so you stay on budget.',
    category: 'Seasonal',
    date: '2026-08-12',
    readMinutes: 5,
    excerpt: 'Summer Christmas parties book out fast. Use this budget checklist and timeline to plan one that stays on budget.',
    intro:
      'Workplace Christmas parties in Australia compete for the same venues and caterers, often in the same few weeks. Starting early and tracking costs keeps the fun in it for everyone, including finance.',
    sections: [
      {
        heading: 'Decide the format and the number',
        paragraphs: [
          'A long lunch, a harbourside cruise, an office party or a team activity all have very different costs. Agree the format, the guest count (including partners, if invited) and the total with your approver first.',
        ],
      },
      {
        heading: 'Budget checklist',
        paragraphs: ['Make sure each of these has a line:'],
        list: [
          'Venue or space hire',
          'Food and drinks, including non-alcoholic and dietary options',
          'Entertainment or activities',
          'Décor and styling',
          'Transport home, such as shuttles or rideshare credits',
          'Gifts or Secret Santa',
          'Contingency',
        ],
      },
      {
        heading: 'Check tax treatment early',
        paragraphs: [
          'Fringe benefits tax and GST credits can depend on the cost per head and who attends. Check current ATO guidance or ask your accountant before you commit to a per-head budget.',
        ],
      },
      {
        heading: 'Timeline',
        paragraphs: ['Work backwards from the date:'],
        list: [
          'Early August to September: confirm format and budget, book venue',
          'October: lock catering and entertainment, compare quotes',
          'Early November: send invitations and collect RSVPs and dietary needs',
          'Early December: confirm final numbers with the venue',
        ],
      },
    ],
    takeaway:
      'Book early, check tax treatment, and track planned vs actual from the first deposit. A prompt-built budget gives you a starting point in seconds, so you can focus on making the day enjoyable.',
  },
]

export const getPost = (slug: string): BlogPost | undefined => BLOG_POSTS.find((p) => p.slug === slug)
