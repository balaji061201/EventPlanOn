import type { HubKey, IconName, ModuleId, SolutionId, UseCaseId } from '@/types'
// Relative (not '@/') so the build-time prerender script can import this file under plain Node.
import { BUSINESS, TRIAL_DAYS } from '../config/business'

/*
 * All marketing copy lives here. Australian English throughout; prices are AUD.
 * Business details, plans, testimonials and the team are SAMPLE data: replace them before launch.
 */

/* ---------- Platform modules ---------- */
export interface PlatformModule {
  id: ModuleId
  label: string
  icon: IconName
  title: string
  text: string
  points: string[]
}

export const MODULES: PlatformModule[] = [
  {
    id: 'budget',
    label: 'Budgets & expenses',
    icon: 'budget',
    title: 'See where every dollar goes',
    text: 'Track planned vs actual event costs in real time, and get an alert before a budget line runs over.',
    points: [
      'Planned vs actual spend by category, updated as you log costs',
      'Overspend alerts on every budget line',
      'Totals shown ex-GST and inc-GST for your finance team',
    ],
  },
  {
    id: 'vendors',
    label: 'Supplier allocation',
    icon: 'vendor',
    title: 'Compare quotes. Allocate suppliers.',
    text: 'Assign venue, catering, AV, décor and transport suppliers to budget lines and compare quotes side by side.',
    points: [
      'Quotes from different suppliers compared side by side',
      'Every supplier linked to the budget line it affects',
      'Deposits and payment dates tracked in one place',
    ],
  },
  {
    id: 'proposals',
    label: 'Proposals',
    icon: 'form',
    title: 'Send professional proposals in minutes',
    text: 'Turn a finished budget into a polished proposal and send it to clients or suppliers without leaving the platform.',
    points: [
      'Generate a proposal straight from your budget',
      'Send to clients or suppliers by email',
      'See which proposals are sent, approved or waiting',
    ],
  },
  {
    id: 'analytics',
    label: 'Reports',
    icon: 'chart',
    title: 'Finance-ready reports on demand',
    text: 'Share budget-vs-actual reports that finance teams, clients and committees can read at a glance.',
    points: [
      'Budget vs actual by event and category',
      'Compare costs across your events to improve the next budget',
      'Export reports for finance, clients or grant acquittals',
    ],
  },
  {
    id: 'planning',
    label: 'Event planning',
    icon: 'plan',
    title: 'Every event in one place',
    text: 'Start from a template and see all your events, budgets and deadlines in one portfolio.',
    points: [
      'Templates for conferences, offsites, weddings and fundraisers',
      'Files and notes kept with the event they belong to',
      'One view of every event your team is running',
    ],
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: 'task',
    title: 'Tasks with owners and deadlines',
    text: 'Break the event into tasks, assign owners and watch progress roll up, so nothing stalls a payment or a booking.',
    points: ['Assign to staff, volunteers or suppliers', 'Due-date reminders', 'Board, list and calendar views'],
  },
  {
    id: 'timeline',
    label: 'Timelines',
    icon: 'time',
    title: 'Timelines and day-of agendas',
    text: 'Map milestones from first booking to event day, then share a minute-by-minute run sheet with your crew.',
    points: [
      'Milestone timeline across the planning cycle',
      'Day-of run sheet shared with the whole crew',
      'Last-minute changes reach everyone instantly',
    ],
  },
  {
    id: 'collab',
    label: 'Approvals & collaboration',
    icon: 'team',
    title: 'Get budgets approved faster',
    text: 'Invite managers, clients and suppliers, and control who sees which numbers.',
    points: [
      'Role-based access for finance, clients and suppliers',
      'Comments and approvals on the budget line they relate to',
      'Shared files everyone can find',
    ],
  },
  {
    id: 'guests',
    label: 'Guests',
    icon: 'guest',
    title: 'Headcount that updates your costs',
    text: 'Manage RSVPs, dietary needs and check-in from one list, and see catering costs move as numbers change.',
    points: [
      'RSVP status updates automatically',
      'Groups, seating and dietary notes',
      'Fast check-in on event day',
    ],
  },
  {
    id: 'registration',
    label: 'Registration',
    icon: 'form',
    title: 'Registration forms, no code',
    text: 'Publish branded RSVP and registration forms that feed straight into your guest list.',
    points: [
      'Templates for RSVP, registration and feedback',
      'Responses sync to your guest list in real time',
      'Shareable links and embeds for your website',
    ],
  },
]

/** Modules that work most closely together: drives the "pairs well with" blocks. */
export const MODULE_RELATED: Record<ModuleId, ModuleId[]> = {
  budget: ['vendors', 'proposals', 'analytics'],
  vendors: ['budget', 'proposals', 'tasks'],
  proposals: ['budget', 'vendors', 'collab'],
  analytics: ['budget', 'planning', 'guests'],
  planning: ['budget', 'tasks', 'timeline'],
  tasks: ['timeline', 'collab', 'vendors'],
  timeline: ['tasks', 'collab', 'guests'],
  collab: ['proposals', 'budget', 'tasks'],
  guests: ['registration', 'budget', 'timeline'],
  registration: ['guests', 'analytics', 'collab'],
}

/* ---------- How it works ---------- */
export interface HowStep {
  title: string
  short: string
  description: string
  tools: string[]
}

/** The five-step flow shown on the home page and the use cases page. */
export const STEPS: HowStep[] = [
  {
    title: 'Describe your event in a prompt',
    short: 'Describe your event',
    description: 'Type what you are planning, where, for how many guests and your total budget. Plain English is fine.',
    tools: ['Event type', 'Guest count', 'Location', 'Total budget'],
  },
  {
    title: 'AI builds your budget',
    short: 'AI builds your budget',
    description: 'Get an instant category-by-category budget with contingency built in. Edit any line before you save.',
    tools: ['Category budget', 'Contingency', 'GST totals', 'Edit any line'],
  },
  {
    title: 'Allocate suppliers',
    short: 'Allocate suppliers',
    description: 'Assign venue, catering, AV, décor and transport suppliers to budget lines and compare quotes side by side.',
    tools: ['Venue', 'Catering', 'AV', 'Quote comparison'],
  },
  {
    title: 'Send proposals',
    short: 'Send proposals',
    description: 'Generate a professional proposal from your budget and send it to a client or supplier in a few clicks.',
    tools: ['Proposal builder', 'Send by email', 'Approval status', 'Branding'],
  },
  {
    title: 'Track every expense',
    short: 'Track every expense',
    description: 'Log costs as they happen. Planned vs actual updates instantly, and you are alerted before you overspend.',
    tools: ['Planned vs actual', 'Overspend alerts', 'Receipts', 'Finance reports'],
  },
]

/* ---------- AI assistant ---------- */
export interface AiCapability {
  title: string
  description: string
  icon: IconName
  prompt: string
  replies: { label: string; parts: { text: string; bold?: boolean }[] }[]
}

const t = (text: string) => ({ text })
const b = (text: string) => ({ text, bold: true })

export const AI_CAPABILITIES: AiCapability[] = [
  {
    title: 'Prompt to budget',
    description: 'Describe your event and get an instant, category-by-category budget.',
    icon: 'spark',
    prompt: 'Plan a 200-guest corporate conference in Sydney with a $50,000 budget.',
    replies: [
      { label: 'Budget', parts: [b('9 categories'), t(' built in seconds, totalling '), b('$50,000')] },
      { label: 'Biggest lines', parts: [t('Catering '), b('$17,000'), t(' · Venue '), b('$15,000'), t(' · AV '), b('$5,500')] },
      { label: 'Safety net', parts: [t('Contingency of '), b('$2,000'), t(' held back for surprises')] },
    ],
  },
  {
    title: 'Overspend alerts',
    description: 'Spot overruns early and see where to rebalance.',
    icon: 'budget',
    prompt: 'Are we on track with the budget?',
    replies: [
      { label: 'Alert', parts: [t('AV is '), b('$1,200 over'), t(' its planned $5,500 after the stage upgrade')] },
      { label: 'Option', parts: [t('Décor is $900 under; moving '), b('$900'), t(' covers most of the gap')] },
      { label: 'Forecast', parts: [t('Projected final spend: '), b('$49,300'), t(' of $50,000')] },
    ],
  },
  {
    title: 'Quote comparison',
    description: 'Compare supplier quotes side by side, with GST shown.',
    icon: 'vendor',
    prompt: 'Compare the three catering quotes for the conference.',
    replies: [
      { label: 'Lowest', parts: [t('Harbour Catering: '), b('$15,800'), t(' inc. GST')] },
      { label: 'Best fit', parts: [t('Saffron Kitchens: '), b('$17,000'), t(', includes staffing and dietary options')] },
      { label: 'Watch out', parts: [t('The lowest quote excludes staffing; allow about '), b('$1,400'), t(' more')] },
    ],
  },
  {
    title: 'Proposal drafts',
    description: 'Turn a finished budget into a client-ready proposal.',
    icon: 'send',
    prompt: 'Draft a proposal for the client from this budget.',
    replies: [
      { label: 'Draft', parts: [t('Proposal ready: '), b('6 pages'), t(' with budget summary, inclusions and timeline')] },
      { label: 'Option', parts: [t('Add a premium AV package as an optional '), b('$2,400'), t(' extra')] },
      { label: 'Next', parts: [t('Send to the client, then track approval from your dashboard')] },
    ],
  },
]

/* ---------- Core features highlighted in every use case ---------- */
export interface CoreFeature {
  id: 'ai' | 'expenses' | 'suppliers' | 'proposals'
  title: string
  icon: IconName
  text: string
}

export const CORE_FEATURES: CoreFeature[] = [
  {
    id: 'ai',
    title: 'AI-automated budgeting',
    icon: 'spark',
    text: 'Type a prompt like “Plan a 200-guest corporate conference in Sydney with a $50,000 budget” and get an instant category-wise budget.',
  },
  {
    id: 'expenses',
    title: 'Expense tracking',
    icon: 'chart',
    text: 'See planned vs actual spend in real time, with overspend alerts before a line goes over.',
  },
  {
    id: 'suppliers',
    title: 'Supplier allocation',
    icon: 'vendor',
    text: 'Assign suppliers (venue, catering, AV, décor, transport) to budget lines and compare quotes side by side.',
  },
  {
    id: 'proposals',
    title: 'Send proposals',
    icon: 'send',
    text: 'Generate and send professional proposals to clients or suppliers from the platform.',
  },
]

/* ---------- Use cases ---------- */
export interface UseCase {
  id: UseCaseId
  /** Full audience name, used as the page section heading. */
  title: string
  /** Short label for nav, chips and cards. */
  label: string
  icon: IconName
  headline: string
  eventTypes: string[]
  who: string
  focus: string[]
  problem: string
  solution: string
  /** Sample metric: clearly a placeholder until real results are available. */
  result: { metric: string; label: string }
  /** The example AI prompt shown for this audience. */
  prompt: string
  /** One audience-specific line per core feature, in CORE_FEATURES order. */
  featureNotes: [string, string, string, string]
}

export const USE_CASES: UseCase[] = [
  {
    id: 'corporate',
    title: 'Corporate event management teams',
    label: 'Corporate teams',
    icon: 'building',
    headline: 'Get event budgets approved and keep every dollar in check.',
    eventTypes: ['Conferences', 'Offsites', 'EOFY functions', 'Product launches', 'Christmas parties'],
    who: 'In-house event, marketing and people teams who run several events a year and answer to finance.',
    focus: ['Budget approvals', 'Cost control across multiple events', 'Finance-ready reports'],
    problem:
      'Budgets live in spreadsheets, approvals drag on, and finance cannot see what you have committed across your events until it is too late.',
    solution:
      'Build each budget from a prompt, send it for approval, then track spend across every event in one portfolio. Finance gets clean reports with GST shown.',
    result: { metric: '40% faster budget approvals', label: 'Sample metric' },
    prompt: 'Plan a 200-guest corporate conference in Sydney with a $50,000 budget.',
    featureNotes: [
      'Start every EOFY function or product launch from a budget that is ready for sign-off.',
      'Watch spend across all your events and get alerted before a cost centre blows out.',
      'Keep approved suppliers against each line so finance can match invoices fast.',
      'Send approval packs to managers and external partners as proposals.',
    ],
  },
  {
    id: 'agencies',
    title: 'Event organisers & agencies',
    label: 'Agencies & organisers',
    icon: 'team',
    headline: 'Run every client budget in one place and win work faster.',
    eventTypes: ['Weddings', 'Festivals', 'Expos', 'Client events'],
    who: 'Event organisers, wedding planners and agencies running many events for many clients at once.',
    focus: ['Many client budgets', 'Supplier allocation', 'Faster proposals'],
    problem:
      'Every client has a different budget, a different supplier list and a deadline that was yesterday. Quoting takes hours and margins slip.',
    solution:
      'Keep each client’s budget separate, allocate suppliers to every line, and turn a finished budget into a proposal in minutes.',
    result: { metric: '3 hours saved per proposal', label: 'Sample metric' },
    prompt: 'Budget a 3,000-person food and wine festival in Brisbane with a $250,000 budget.',
    featureNotes: [
      'Draft a first-pass budget for a new enquiry before the client call ends.',
      'Track each client’s costs separately so you know your margin on every job.',
      'Reuse trusted suppliers across clients and compare their quotes in seconds.',
      'Send branded proposals to clients and booking requests to suppliers.',
    ],
  },
  {
    id: 'community',
    title: 'Non-corporate teams',
    label: 'Community & not-for-profit',
    icon: 'heart',
    headline: 'Plan events that stay within your funds and grants.',
    eventTypes: ['Community groups', 'Sporting clubs', 'Schools', 'Universities', 'Not-for-profits', 'Charities'],
    who: 'Committees, volunteers and small teams running fundraisers, carnivals, formals and community days.',
    focus: ['Simple budgeting', 'Shared expense tracking', 'Staying within limited funds or grants'],
    problem:
      'Funds and grants are limited, several volunteers add costs to one spreadsheet, and a surprise bill can sink the event.',
    solution:
      'Describe the event, get a simple budget, and let your committee log expenses in one shared place with alerts before you overspend.',
    result: { metric: '9 in 10 events finished within budget', label: 'Sample metric' },
    prompt: 'Plan a school fundraiser for 120 guests in Adelaide with an $8,000 budget.',
    featureNotes: [
      'Get a sensible starting budget even if you have never planned an event before.',
      'Everyone on the committee logs costs in one place, with alerts as you near your limit.',
      'Compare quotes from local suppliers so limited funds go further.',
      'Send sponsorship and donation proposals to local businesses.',
    ],
  },
]

/* ---------- Connected hub ---------- */
export interface HubNode {
  key: HubKey
  label: string
  icon: IconName
  /** Position as a percentage of the hub canvas. */
  x: number
  y: number
  initial: string
}

export const HUB_NODES: HubNode[] = [
  { key: 'budget', label: 'Budget', icon: 'budget', x: 12, y: 15.2, initial: '$50,000 budget' },
  { key: 'suppliers', label: 'Suppliers', icon: 'vendor', x: 12, y: 39.1, initial: '6 of 8 allocated' },
  { key: 'proposals', label: 'Proposals', icon: 'send', x: 12, y: 63, initial: '3 sent' },
  { key: 'expenses', label: 'Expenses', icon: 'chart', x: 12, y: 87, initial: '$31,200 spent' },
  { key: 'guests', label: 'Guest list', icon: 'guest', x: 88, y: 15.2, initial: '200 guests' },
  { key: 'tasks', label: 'Tasks', icon: 'task', x: 88, y: 39.1, initial: '12 of 18 done' },
  { key: 'approvals', label: 'Approvals', icon: 'team', x: 88, y: 63, initial: '2 pending' },
  { key: 'reports', label: 'Reports', icon: 'book', x: 88, y: 87, initial: 'Ready for finance' },
]

/* ---------- Testimonials (placeholders) ---------- */
export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  city: string
}

/** Sample testimonials. Replace every field with a real, approved customer quote before launch. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'We built our EOFY function budget from one prompt and had it approved the same week. Finance can finally see what we have committed across every event.',
    name: 'Sarah Mitchell',
    role: 'Head of Events',
    company: 'Harbourline Group',
    city: 'Melbourne',
  },
  {
    quote:
      'Comparing supplier quotes and sending proposals from one place has saved us hours on every client event. Our margins are much easier to see.',
    name: 'James Nguyen',
    role: 'Director',
    company: 'Brightside Events',
    city: 'Sydney',
  },
  {
    quote:
      'Our committee all log expenses in one place now. We stayed inside our grant for the first time, and the report made the acquittal easy.',
    name: 'Priya Raman',
    role: 'Event Coordinator',
    company: 'Southbank Community Club',
    city: 'Brisbane',
  },
]

/* ---------- Pricing (placeholders) ---------- */
export interface Plan {
  name: string
  price: string
  blurb: string
  features: string[]
  popular?: boolean
}

/** Sample plans. Prices are AUD per month and include GST. */
export const PLANS: Plan[] = [
  {
    name: 'Starter',
    price: '$29',
    blurb: 'For occasional events and small committees.',
    features: ['Up to 5 events a year', 'AI-built budgets', 'Expense tracking with alerts', '1 user'],
  },
  {
    name: 'Team',
    price: '$79',
    blurb: 'For teams and planners running events all year.',
    features: ['Up to 25 events a year', 'Supplier allocation and quote comparison', 'Proposals and approvals', 'Up to 5 users'],
    popular: true,
  },
  {
    name: 'Agency',
    price: '$199',
    blurb: 'For agencies and organisations with many events.',
    features: ['Unlimited events', 'Separate client workspaces', 'Branded proposals and reports', 'Unlimited users'],
  },
]

export const PLAN_VOLUME = ['1–5 events a year', '6–20 events a year', 'More than 20 events a year'] as const
export const PLAN_BUDGET = ['Under $20,000', '$20,000 – $100,000', 'Over $100,000'] as const

/* ---------- FAQ ---------- */
export interface Faq {
  q: string
  /** Direct 1–2 sentence answer. Answer engines quote this first. */
  short: string
  /** Supporting detail. */
  detail: string
}

export const FAQS: Faq[] = [
  {
    q: 'How does AI create an event budget?',
    short:
      'You describe your event in a plain-English prompt, and the AI returns a category-by-category budget in seconds. You can edit every line before you save it.',
    detail:
      'For example, “Plan a 200-guest corporate conference in Sydney with a $50,000 budget”. The AI uses your event type, guest count, location and total to split the money across venue, catering, AV, décor, speakers, marketing, transport, staffing and contingency. Nothing is locked in until you approve it.',
  },
  {
    q: 'Can I track event expenses in real time?',
    short:
      'Yes. Every expense you log updates planned vs actual spend straight away, and you get an overspend alert when a budget line goes over.',
    detail:
      'Your whole team can add costs as they happen, so finance and managers always see the current position instead of waiting for a month-end spreadsheet.',
  },
  {
    q: 'How does supplier allocation work?',
    short:
      'You assign each supplier (venue, catering, AV, décor, transport) to a budget line, then compare their quotes side by side.',
    detail:
      'Each supplier’s quote, deposit and payment date stays linked to its budget line, so you always know what is committed and what is still available to spend.',
  },
  {
    q: 'Can I send proposals from the platform?',
    short:
      'Yes. Generate a professional proposal from your budget and send it to a client or supplier without leaving the platform.',
    detail:
      'Clients receive a clear summary of costs and inclusions, and you can see which proposals are sent, approved or still waiting.',
  },
  {
    q: 'How much does it cost, and is GST included?',
    short: 'Plans are priced in Australian dollars (AUD) and every price shown includes 10% GST.',
    detail:
      'You can upgrade or downgrade at any time. See the pricing page for plan details, and use the plan guide to match a plan to your event volume and budgets.',
  },
  {
    q: 'How does the free trial work?',
    short: `Start a ${TRIAL_DAYS}-day free trial with no credit card required, and choose a plan only if you want to continue.`,
    detail:
      'Use every feature on a real event. At the end of the trial you can pick a plan or let it lapse, and you can export your data either way.',
  },
  {
    q: 'Is my data secure, and where is it stored?',
    short:
      'Your data is stored in data centres in Sydney, Australia, and is protected with encryption in transit and at rest.',
    detail:
      'Access is controlled by role, so finance, clients and suppliers only see what you allow. You can export your data at any time.',
  },
  {
    q: 'What support do you offer, and when is it available?',
    short: `Our Australian support team is available ${BUSINESS.hours}.`,
    detail: `Reach us by email at ${BUSINESS.email} or call ${BUSINESS.phone}. We will also help you set up your first event during the free trial.`,
  },
  {
    q: 'Can not-for-profits, schools and community groups use it?',
    short:
      'Yes. Event Plan On works for community groups, sporting clubs, schools, universities, not-for-profits and charities as well as corporate teams.',
    detail:
      'Simple budgeting, shared expense tracking and overspend alerts help limited funds and grants go further, and reports make acquittals easier.',
  },
  {
    q: 'Do you support events in every Australian city?',
    short:
      'Yes. Teams use Event Plan On for events in Sydney, Melbourne, Brisbane, Perth, Adelaide and anywhere else in Australia.',
    detail:
      'Budgets are in AUD with GST shown, and AI budgets reflect typical Australian event costs for your location.',
  },
]

/* ---------- About (sample copy: replace with your own) ---------- */
export const ABOUT = {
  story: [
    'Event Plan On began when Alex Morgan spent a weekend rebuilding the same event budget spreadsheet for the fifth time, then watched a client event run over because nobody could see the real numbers.',
    'We built Event Plan On so Australian event teams can describe an event, get a budget instantly, and stay in control of every dollar from the first quote to the final invoice.',
  ],
  mission: 'Give every Australian event team the confidence to budget well, spend wisely and deliver events that finish on budget.',
  vision: 'Event budgets that are as easy to build as a conversation, and as clear to read as a bank statement.',
  values: [
    { title: 'Clarity first', text: 'We make costs easy to see and easy to explain, to finance, clients and committees alike.', icon: 'chart' as IconName },
    { title: 'Built for Australia', text: 'AUD pricing, GST shown clearly and support that works on Australian time.', icon: 'pin' as IconName },
    { title: 'People in control', text: 'AI suggests; you decide. Every number is yours to edit and approve.', icon: 'shield' as IconName },
    { title: 'Useful over clever', text: 'We ship features that save you time on a real event, not ones that only look good in a demo.', icon: 'bolt' as IconName },
  ],
  team: [
    {
      name: 'Alex Morgan',
      role: 'Founder & CEO',
      bio: 'Fifteen years running corporate events across Sydney and Melbourne. Started Event Plan On after one too many budget spreadsheets.',
    },
    {
      name: 'Mei Tanaka',
      role: 'Head of Product',
      bio: 'Previously built finance tools for growing teams. Cares about making numbers easy to understand for people who are not accountants.',
    },
    {
      name: 'Daniel Okafor',
      role: 'Customer Success Lead',
      bio: 'Helps Australian teams get set up and get value in their first event, from corporate offsites to school fundraisers.',
    },
  ],
}

/* ---------- Solutions (by team and event type) ---------- */
export interface Solution {
  id: SolutionId
  title: string
  icon: IconName
  headline: string
  text: string
  points: string[]
  quote: [string, string]
  stats: [IconName, string, string][]
}

export const SOLUTIONS: Solution[] = [
  {
    id: 'corporate',
    title: 'Corporate Event Teams',
    icon: 'building',
    headline: 'Run every event to one budget standard.',
    text: 'Give your events team one system for conferences, offsites, EOFY functions and launches, with the cost visibility finance asks for.',
    points: [
      'Portfolio view of spend across every event',
      'Budget approvals and finance-ready reports',
      'Templates that keep every event consistent',
    ],
    quote: ['For corporate teams', 'Bring budgets, suppliers and approvals out of separate spreadsheets and into one clear view.'],
    stats: [
      ['chart', 'Portfolio reporting', 'Spend across all your events'],
      ['shield', 'Role-based access', 'Share numbers with stakeholders safely'],
    ],
  },
  {
    id: 'planners',
    title: 'Professional Planners',
    icon: 'plan',
    headline: 'Manage many client budgets without losing track of one.',
    text: "Keep each client's budget, suppliers and timeline separate but easy to switch between.",
    points: [
      'A separate budget for every client',
      'Reusable supplier lists and quote comparisons',
      'Proposals built from your budget in minutes',
    ],
    quote: ['For independent planners', 'Spend your time on the creative work instead of rebuilding the same spreadsheets.'],
    stats: [
      ['task', 'Reusable templates', 'Start each event from a proven budget'],
      ['vendor', 'Supplier directory', 'Your trusted suppliers, saved'],
    ],
  },
  {
    id: 'agencies',
    title: 'Event Agencies',
    icon: 'team',
    headline: 'One workspace for your staff, clients and suppliers.',
    text: 'Coordinate multiple teams and client accounts with shared workspaces, permissions and a clear view of every margin.',
    points: [
      'A workspace for each client account',
      'Team workload and task ownership',
      'Professional reports and proposals to send clients',
    ],
    quote: ['For agencies', 'Show clients live budget progress without another status meeting.'],
    stats: [
      ['team', 'Multi-team collaboration', 'Staff, clients and suppliers'],
      ['chart', 'Client reports', 'Budget vs actual in one click'],
    ],
  },
  {
    id: 'conferences',
    title: 'Conferences',
    icon: 'stage',
    headline: 'Keep sessions, speakers and attendees inside budget.',
    text: 'Control costs across venues, speakers, catering and AV as registrations and headcount change.',
    points: [
      'Catering and venue costs that follow your headcount',
      'Speaker and session costs on one budget',
      'Run sheets for every room and day',
    ],
    quote: ['For conference hosts', 'When registrations change, your catering and venue costs update with them.'],
    stats: [
      ['form', 'Registration', 'Branded forms, no code'],
      ['time', 'Multi-track run sheets', 'Every room, every day'],
    ],
  },
  {
    id: 'exhibitions',
    title: 'Exhibitions & Expos',
    icon: 'booth',
    headline: 'Coordinate exhibitors, booths and floor costs.',
    text: 'Track exhibitor deliverables, floor logistics and supplier quotes against one clear event budget.',
    points: [
      'Supplier quotes compared side by side',
      'Floor and booth costs tracked against budget',
      'Visitor registration and check-in',
    ],
    quote: ['For exhibition organisers', 'Keep exhibitor deadlines, floor logistics and costs on one timeline.'],
    stats: [
      ['booth', 'Floor planning', 'Assignments and costs'],
      ['vendor', 'Supplier management', 'Quotes, deposits and documents'],
    ],
  },
]

/** The platform tools each audience leans on most. */
export const SOLUTION_MODULES: Record<SolutionId, ModuleId[]> = {
  corporate: ['budget', 'analytics', 'collab', 'planning'],
  planners: ['budget', 'vendors', 'proposals', 'timeline'],
  agencies: ['proposals', 'collab', 'analytics', 'vendors'],
  conferences: ['registration', 'timeline', 'guests', 'budget'],
  exhibitions: ['vendors', 'guests', 'timeline', 'registration'],
}
