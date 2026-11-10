/**
 * Business details and trial wording, in one place.
 *
 * These are SAMPLE values (phone numbers in the 02 5550 range are reserved for fictional use).
 * Replace them with your real details and they update in the header, footer, contact section, About
 * page, FAQs and the schema.org markup. Any value left in [square brackets] is reported by `npm run build`.
 */
export const BUSINESS = {
  brand: 'Event Plan On',
  legalName: 'Event Plan On Pty Ltd',
  abn: '12 345 678 901',
  phone: '+61 2 5550 1234',
  email: 'support@eventplanon.com',
  address: {
    street: 'Level 5, 123 Example Street',
    city: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    country: 'AU',
  },
  hours: 'Mon–Fri, 9am–5pm AEST/AEDT',
  /** Canonical site origin used in meta tags and schema. */
  siteUrl: 'https://www.eventplanon.com',
} as const

/** Free-trial length in days. */
export const TRIAL_DAYS = '60'
export const TRIAL_LINE = `${TRIAL_DAYS}-day free trial, no credit card required`
export const TRIAL_CTA = `Start your ${TRIAL_DAYS}-day free trial`

/** Cities the product is marketed to; used for local-intent copy. */
export const CITIES = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'] as const

export const isPlaceholder = (value: string): boolean => value.includes('[')

/** `tel:` link, or undefined while the number is still a placeholder. */
export const telHref = (phone: string): string | undefined =>
  isPlaceholder(phone) ? undefined : `tel:${phone.replace(/[^\d+]/g, '')}`

/** `mailto:` link, or undefined while the address is still a placeholder. */
export const mailHref = (email: string): string | undefined => (isPlaceholder(email) ? undefined : `mailto:${email}`)

export const addressLine = (): string => {
  const a = BUSINESS.address
  return `${a.street}, ${a.city} ${a.state} ${a.postcode}`
}
