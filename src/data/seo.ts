/*
 * SEO + AEO data for every page: unique title (<60 chars), meta description (<155 chars), a one-line
 * definition shown at the top of the page, and schema.org JSON-LD.
 *
 * Used by the app (src/hooks/usePageMeta.ts) and by scripts/prerender.mjs, which bakes the same tags into
 * static HTML for crawlers that do not run JavaScript. Keep this file free of '@/' imports.
 */
import { BUSINESS, TRIAL_LINE } from '../config/business'
import { BLOG_AUTHOR, BLOG_POSTS, getPost } from './blog'
import { FAQS, MODULES, SOLUTIONS } from './content'

export const BRAND = BUSINESS.brand
export const SITE_URL = BUSINESS.siteUrl
export const OG_IMAGE = `${SITE_URL}/og-image.png`

export interface PageSeo {
  path: string
  title: string
  description: string
  /** One-line definition shown near the top of the page (answer engines quote this). */
  definition: string
  jsonLd: Record<string, unknown>[]
  /** Visible FAQs on this page, mirrored into FAQPage schema. */
  faq: boolean
}

const DEF_CORE = `${BRAND} is an AI-powered event budgeting tool for Australian event teams that`

interface Entry {
  title: string
  description: string
  definition: string
}

const STATIC: Record<string, Entry> = {
  '/': {
    title: 'Event Budget Software Australia | Event Plan On',
    description:
      'AI event budgeting and expense tracking for Australian teams. Build a budget from a prompt, track planned vs actual costs and send proposals. AUD.',
    definition: `${DEF_CORE} builds a budget from a single prompt, tracks every expense in real time and sends proposals to clients and suppliers.`,
  },
  '/platform': {
    title: 'Event Budget Management Software | Event Plan On',
    description:
      'Budgets, expense tracking, supplier allocation, proposals and reports in one event budget management platform built for Australian event teams.',
    definition: `${DEF_CORE} keeps budgets, suppliers, proposals and reports in one place, so every cost is visible from first quote to final invoice.`,
  },
  '/solutions': {
    title: 'Event Management Software for Every Team | Event Plan On',
    description:
      'Event budget software for corporate teams, planners, agencies, conferences and expos in Sydney, Melbourne, Brisbane, Perth and Adelaide.',
    definition: `${DEF_CORE} fits corporate teams, planners, agencies, conferences and expos with the budget tools each one needs.`,
  },
  '/use-cases': {
    title: 'Corporate Event Budget Planner Australia | Event Plan On',
    description:
      'See how corporate event planners in Australia, event management agencies, schools, clubs and not-for-profits use AI budgeting and expense tracking.',
    definition: `${DEF_CORE} helps corporate teams, agencies and community groups build budgets faster, control costs and stay within funds.`,
  },
  '/ai': {
    title: 'AI Event Budgeting & Planning Tool | Event Plan On',
    description:
      'Describe your event in a prompt and get an instant category-wise budget. An AI event planning tool with overspend alerts, quote comparison and proposals.',
    definition: `${DEF_CORE} turns a plain-English prompt into a category-by-category budget, then flags overspend and compares supplier quotes for you.`,
  },
  '/pricing': {
    title: 'Event Budget Software Pricing in AUD | Event Plan On',
    description:
      'Event budget software pricing in AUD, GST included. Compare plans, match one to your event volume and budgets, and start a free trial with no credit card.',
    definition: `${DEF_CORE} is priced in Australian dollars with GST included, so you know exactly what your team will pay.`,
  },
  '/about': {
    title: 'About Event Plan On | Event Software Australia',
    description:
      'Meet the Australian team behind Event Plan On, the AI event budgeting platform that helps event teams plan, track and control costs with confidence.',
    definition: `${DEF_CORE} was built to make event budgets as easy to create as a conversation and as clear to read as a bank statement.`,
  },
  '/contact': {
    title: 'Contact Event Plan On | Event Management Software',
    description:
      'Contact Event Plan On for event management software in Sydney, Melbourne, Brisbane, Perth and Adelaide. Call, email or visit our Australian office.',
    definition: `${DEF_CORE} is supported by a local team in Australia, ready to help with setup, questions and demos.`,
  },
  '/demo': {
    title: 'Book a Demo | AI Event Budgeting | Event Plan On',
    description:
      'Book a personalised demo of Event Plan On and see AI event budgeting, real-time expense tracking and proposals built around your next event.',
    definition: `${DEF_CORE} you can see in action in a short demo, using the kind of event you actually run.`,
  },
  '/blog': {
    title: 'Event Budgeting Blog & Guides | Event Plan On',
    description:
      'Practical guides on event budgeting, cost control, supplier quotes and proposals for Australian event teams, agencies and community groups.',
    definition: `${DEF_CORE} shares practical guides on budgeting, cost control, suppliers and proposals for Australian event teams.`,
  },
  '/resources': {
    title: 'Event Budget Guides & Checklists | Event Plan On',
    description:
      'Guides, checklists and live demos for event budget management, from EOFY functions to community fundraisers, written for Australian event teams.',
    definition: `${DEF_CORE} offers guides, checklists and live demos to help you plan events that finish on budget.`,
  },
}

const MODULE_SEO: Record<string, { title: string; description: string; does: string }> = {
  budget: {
    title: 'Event Expense Tracking Software | Event Plan On',
    description:
      'Real-time event expense tracking with planned vs actual event costs, overspend alerts and GST-ready totals. Keep every budget line under control.',
    does:
      'tracks planned vs actual event costs in real time and alerts you before a budget line runs over.',
  },
  vendors: {
    title: 'Event Supplier Management Software | Event Plan On',
    description:
      'Allocate suppliers to budget lines and compare venue, catering, AV and décor quotes side by side. Event supplier management for Australian teams.',
    does:
      'lets you assign suppliers to budget lines and compare quotes side by side.',
  },
  proposals: {
    title: 'Event Proposal Software | Event Plan On',
    description:
      'Create and send professional event proposals from your budget in minutes. Event proposal software for agencies, organisers and corporate teams.',
    does:
      'turns a finished budget into a professional proposal you can send to clients or suppliers.',
  },
  analytics: {
    title: 'Event Budget Reports & Analytics | Event Plan On',
    description:
      'Budget-vs-actual reports for finance, clients and committees. Compare costs across events and improve every budget with event cost control insights.',
    does:
      'creates budget-vs-actual reports that finance teams, clients and committees can read at a glance.',
  },
  planning: {
    title: 'Event Planning Software Australia | Event Plan On',
    description:
      'Plan every event in one place with templates, files and a portfolio view that links straight to your event budget tracker. Built for Australian teams.',
    does:
      'keeps every event, budget and deadline together in one portfolio.',
  },
  tasks: {
    title: 'Event Task Management Tool | Event Plan On',
    description:
      'Assign event tasks to staff, volunteers and suppliers, set due dates and track progress so nothing delays a payment, booking or budget approval.',
    does:
      'assigns tasks to staff, volunteers and suppliers so nothing delays a payment or booking.',
  },
  timeline: {
    title: 'Event Timeline & Run Sheet Tool | Event Plan On',
    description:
      'Map milestones from first booking to event day and share a minute-by-minute run sheet with your crew. Changes reach everyone instantly.',
    does:
      'maps milestones and shares a minute-by-minute run sheet with your crew.',
  },
  collab: {
    title: 'Event Budget Approvals & Collaboration | Event Plan On',
    description:
      'Get event budgets approved faster. Invite managers, clients and suppliers, control who sees which numbers and keep comments next to each budget line.',
    does:
      'gets budgets approved faster by giving managers, clients and suppliers the right access.',
  },
  guests: {
    title: 'Event Guest List Management | Event Plan On',
    description:
      'Manage RSVPs, dietary needs and check-in in one guest list, and see catering costs update as your headcount changes. Made for Australian events.',
    does:
      'manages RSVPs and dietary needs and updates catering costs as your headcount changes.',
  },
  registration: {
    title: 'Event Registration Forms | Event Plan On',
    description:
      'Publish branded event registration and RSVP forms with no code. Responses sync to your guest list and your headcount-driven budget in real time.',
    does:
      'publishes branded registration forms that feed your guest list and budget.',
  },
}

const SOLUTION_SEO: Record<string, { title: string; description: string; does: string }> = {
  corporate: {
    title: 'Corporate Event Budget Software | Event Plan On',
    description:
      'Corporate event budget software for Australian teams: faster approvals, cost control across events and finance-ready reports with GST shown.',
    does: 'helps corporate teams get budgets approved, control costs across events and send finance-ready reports.',
  },
  planners: {
    title: 'Event Planner Budget Software | Event Plan On',
    description:
      'Budget software for professional event planners: manage many client budgets, allocate suppliers and send proposals faster.',
    does: 'helps professional planners manage many client budgets, allocate suppliers and send proposals faster.',
  },
  agencies: {
    title: 'Event Agency Management Software | Event Plan On',
    description:
      'Event management software for agencies: separate client budgets, supplier allocation, proposals and client-ready reports in one workspace.',
    does: 'gives agencies a separate budget for every client, plus supplier allocation, proposals and client-ready reports.',
  },
  conferences: {
    title: 'Conference Budget Planner Software | Event Plan On',
    description:
      'Conference budget planner for Australian teams: control costs across speakers, venues and catering as registrations and headcount change.',
    does: 'keeps conference costs under control as registrations and headcount change.',
  },
  exhibitions: {
    title: 'Expo & Exhibition Budget Software | Event Plan On',
    description:
      'Budget software for exhibitions and expos: track exhibitor costs, floor logistics and supplier quotes against one clear event budget.',
    does: 'tracks exhibitor costs, floor logistics and supplier quotes against one clear event budget.',
  },
}

const NOT_FOUND: Entry = {
  title: 'Page Not Found | Event Plan On',
  description: 'This page could not be found. Head back to Event Plan On, the AI event budgeting tool for Australian event teams.',
  definition: `${DEF_CORE} helps you plan, track and control event costs.`,
}

/* ---------- JSON-LD ---------- */
const abs = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`

export const organizationSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: BRAND,
  legalName: BUSINESS.legalName,
  taxID: BUSINESS.abn,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: BUSINESS.email,
  telephone: BUSINESS.phone,
  description: `${BRAND} is an AI-powered event budgeting tool for Australian event teams.`,
  areaServed: { '@type': 'Country', name: 'Australia' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.postcode,
    addressCountry: BUSINESS.address.country,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    areaServed: 'AU',
    availableLanguage: 'English',
    hoursAvailable: BUSINESS.hours,
  },
})

export const softwareSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#software`,
  name: BRAND,
  url: SITE_URL,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Event budget management software',
  operatingSystem: 'Web',
  inLanguage: 'en-AU',
  description:
    'AI-powered event budgeting and expense tracking for Australian event teams: build a budget from a prompt, track planned vs actual costs, allocate suppliers and send proposals.',
  featureList: [
    'AI-automated budgeting from a prompt',
    'Real-time expense tracking with overspend alerts',
    'Supplier allocation and side-by-side quote comparison',
    'Professional proposals sent from the platform',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'AUD',
    description: TRIAL_LINE,
    eligibleRegion: { '@type': 'Country', name: 'Australia' },
  },
  publisher: { '@id': `${SITE_URL}/#organization` },
})

export const faqSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: `${f.short} ${f.detail}` },
  })),
})

const articleSchema = (slug: string, path: string): Record<string, unknown> | null => {
  const post = getPost(slug)
  if (!post) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'en-AU',
    mainEntityOfPage: abs(path),
    author: { '@type': 'Organization', name: BLOG_AUTHOR },
    publisher: { '@id': `${SITE_URL}/#organization` },
    image: OG_IMAGE,
  }
}

const breadcrumb = (items: [string, string][]): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
})

/** Pages that render the FAQ accordion (and so carry FAQPage schema). */
const FAQ_PATHS = new Set(['/', '/pricing', '/resources'])

const withSuffix = (title: string) => (`${title} | ${BRAND}`.length <= 60 ? `${title} | ${BRAND}` : title)

/** Resolves SEO data for any route, including /platform/:id and /blog/:slug. */
export function getSeo(rawPath: string): PageSeo {
  const path = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath
  let entry: Entry | undefined = STATIC[path]
  const extra: Record<string, unknown>[] = []

  const mod = path.match(/^\/platform\/([^/]+)$/)
  if (mod) {
    const m = MODULES.find((x) => x.id === mod[1])
    if (m) {
      const seo = MODULE_SEO[m.id]
      entry = { title: seo.title, description: seo.description, definition: `${DEF_CORE} ${seo.does}` }
      extra.push(breadcrumb([['Home', '/'], ['Platform', '/platform'], [m.label, path]]))
    }
  }

  const sol = path.match(/^\/solutions\/([^/]+)$/)
  if (sol) {
    const x = SOLUTIONS.find((y) => y.id === sol[1])
    if (x) {
      const seo = SOLUTION_SEO[x.id]
      entry = { title: seo.title, description: seo.description, definition: `${DEF_CORE} ${seo.does}` }
      extra.push(breadcrumb([['Home', '/'], ['Solutions', '/solutions'], [x.title, path]]))
    }
  }

  const post = path.match(/^\/blog\/([^/]+)$/)
  if (post) {
    const p = getPost(post[1])
    if (p) {
      entry = { title: withSuffix(p.title), description: p.description, definition: `${DEF_CORE} shares practical guides like this one: ${p.excerpt.charAt(0).toLowerCase()}${p.excerpt.slice(1)}` }
      const a = articleSchema(p.slug, path)
      if (a) extra.push(a)
      extra.push(breadcrumb([['Home', '/'], ['Blog', '/blog'], [p.title, path]]))
    }
  }

  const found = !!entry
  const e = entry ?? NOT_FOUND
  const faq = FAQ_PATHS.has(path)
  const jsonLd = [organizationSchema(), softwareSchema(), ...(faq ? [faqSchema()] : []), ...extra]
  return { path: found ? path : '/404', title: e.title, description: e.description, definition: e.definition, jsonLd, faq }
}

/** Every real route, for prerendering and the sitemap. */
export const ALL_PATHS = (): string[] => [
  ...Object.keys(STATIC),
  ...MODULES.map((m) => `/platform/${m.id}`),
  ...SOLUTIONS.map((x) => `/solutions/${x.id}`),
  ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
]

export const definitionFor = (path: string): string => getSeo(path).definition

export const pageAbsoluteUrl = abs
