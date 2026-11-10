import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/cn'
import { PATHS, SUPPORT_EMAIL } from '@/config/routes'
import { TRIAL_CTA } from '@/config/business'
import { definitionFor } from '@/data/seo'
import { TrialNote } from '@/components/site/TrialNote'
import { requestDemo, type DemoRequest, type DemoResult } from '@/services/demo'
import { Button } from '@/components/ui/Button'
import { Container, Eyebrow } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'
import { MaskedLine } from '@/components/site/PageHero'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { useRef } from 'react'

const TEAM_SIZES = ['Just me', '2–5', '6–20', '21–100', '100+']
const EVENT_TYPES = ['Corporate events', 'Conferences', 'Festivals & expos', 'Weddings', 'Community, club or school events', 'Not-for-profit fundraisers', 'Agency / multiple clients', 'Other']

const BENEFITS = [
  'A walkthrough built around your next event',
  'Watch AI turn a prompt into a category-by-category budget',
  'See expense tracking, supplier quotes and proposals working together',
  'Ask anything: setup, pricing in AUD and GST',
]

type Errors = Partial<Record<keyof DemoRequest, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const field =
  'h-12 w-full rounded-xl border border-line bg-ivory px-4 text-[15px] transition-colors focus:border-coral focus:bg-paper aria-[invalid=true]:border-[#D9435F]'

export default function Demo() {
  const root = useRef<HTMLElement>(null)
  const [values, setValues] = useState<DemoRequest>({ name: '', email: '', company: '', teamSize: TEAM_SIZES[1], eventType: EVENT_TYPES[0], message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<DemoResult | null>(null)
  const [failure, setFailure] = useState<string | null>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap
        .timeline({ delay: 0.15, defaults: { ease: 'power4.out' } })
        .from('[data-w]', { yPercent: 115, duration: 1.1, stagger: 0.1 })
        .from('[data-in]', { y: 24, opacity: 0, duration: 0.8, stagger: 0.09 }, '-=0.6')
    },
    { scope: root },
  )

  const set = <K extends keyof DemoRequest>(key: K, value: DemoRequest[K]) => setValues((v) => ({ ...v, [key]: value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Tell us your name.'
    if (!EMAIL_PATTERN.test(values.email.trim())) next.email = 'Enter a valid work email, like name@company.com.au.'
    if (!values.company.trim()) next.company = 'Which company or team are you with?'
    setErrors(next)
    if (Object.keys(next).length) return

    setSubmitting(true)
    setFailure(null)
    try {
      setResult(await requestDemo({ ...values, name: values.name.trim(), email: values.email.trim(), company: values.company.trim() }))
    } catch {
      setFailure(`We couldn't send that just now. Please email ${SUPPORT_EMAIL} and we'll set up your demo.`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section ref={root} className="relative overflow-hidden bg-ivory pt-36 pb-24 md:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <i className="absolute -top-40 -right-40 size-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(233,90,120,.18),transparent)]" />
      </div>
      <Container className="relative grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,.9fr)] lg:gap-20">
        <div>
          <div data-in>
            <Eyebrow>Book a demo</Eyebrow>
          </div>
          <h1 className="mt-5 font-serif text-[clamp(32px,4.5vw,70px)] leading-[1.04] font-medium tracking-[-0.03em]">
            <MaskedLine>See AI event</MaskedLine>
            <MaskedLine>budgeting in</MaskedLine>
            <MaskedLine accent>action.</MaskedLine>
          </h1>
          <p data-in className="mt-8 max-w-[48ch] text-lg text-muted md:text-xl">
            {definitionFor(PATHS.demo)}
          </p>
          <ul data-in className="m-0 mt-8 grid list-none gap-3.5 p-0">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[16px]">
                <Icon name="check" size={20} className="mt-0.5 shrink-0 text-coral" />
                {b}
              </li>
            ))}
          </ul>
          <div data-in className="mt-6">
            <TrialNote />
          </div>
        </div>

        <div data-in className="self-start rounded-[28px] border border-line bg-paper p-6 shadow-lift md:p-9">
          {result ? (
            <div role="status" className="grid gap-4 py-6 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-ok-soft text-ok-ink">
                <Icon name="check" size={28} />
              </span>
              <h2 className="font-serif text-3xl font-medium">
                {result === 'sent' ? 'Request received' : 'Your email is ready to send'}
              </h2>
              <p className="text-muted">
                {result === 'sent'
                  ? `Thanks, ${values.name.split(' ')[0]}. We'll be in touch to schedule your demo.`
                  : `We've opened an email to ${SUPPORT_EMAIL} with your details filled in. Press send in your email app to complete the request.`}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <Button route="signup" arrow>
                  {TRIAL_CTA} meanwhile
                </Button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="grid gap-5">
              <h2 className="font-serif text-3xl leading-tight font-medium">Tell us about your events</h2>

              <label className="grid gap-1.5 text-sm font-semibold">
                Full name
                <input
                  className={field}
                  aria-invalid={!!errors.name}
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => set('name', e.target.value)}
                />
                {errors.name && <span className="text-[13px] font-medium text-[#C2304F]">{errors.name}</span>}
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm font-semibold">
                  Work email
                  <input
                    type="email"
                    className={field}
                    aria-invalid={!!errors.email}
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => set('email', e.target.value)}
                  />
                  {errors.email && <span className="text-[13px] font-medium text-[#C2304F]">{errors.email}</span>}
                </label>
                <label className="grid gap-1.5 text-sm font-semibold">
                  Company
                  <input
                    className={field}
                    aria-invalid={!!errors.company}
                    autoComplete="organization"
                    value={values.company}
                    onChange={(e) => set('company', e.target.value)}
                  />
                  {errors.company && <span className="text-[13px] font-medium text-[#C2304F]">{errors.company}</span>}
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm font-semibold">
                  Team size
                  <select className={field} value={values.teamSize} onChange={(e) => set('teamSize', e.target.value)}>
                    {TEAM_SIZES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1.5 text-sm font-semibold">
                  What do you plan?
                  <select className={field} value={values.eventType} onChange={(e) => set('eventType', e.target.value)}>
                    {EVENT_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="grid gap-1.5 text-sm font-semibold">
                Anything we should know? <span className="font-normal text-muted">(optional)</span>
                <textarea
                  rows={3}
                  className={cn(field, 'h-auto resize-y py-3')}
                  value={values.message}
                  onChange={(e) => set('message', e.target.value)}
                />
              </label>

              {failure && (
                <p role="alert" className="rounded-xl bg-coral-soft px-4 py-3 text-sm font-medium text-coral-deep">
                  {failure}
                </p>
              )}

              <Button type="submit" size="lg" arrow disabled={submitting} className="disabled:opacity-60">
                {submitting ? 'Sending…' : 'Request my demo'}
              </Button>
              <p className="text-center text-[13px] text-muted">Prefer email? Write to {SUPPORT_EMAIL}.</p>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
