import { useRef } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { AppFrame, AppMain } from '@/components/ui/AppFrame'
import { Container, Eyebrow } from '@/components/ui/layout'
import { SHOWCASE } from '@/components/product/ShowcaseViews'

const SCRAPS: { label: string; x: number; y: number; r: number; tone: string }[] = [
  { label: 'budget_v7_FINAL.xlsx', x: 4, y: 58, r: -7, tone: 'bg-ok-soft text-ok-ink' },
  { label: 'RSVP tracker (copy)', x: 62, y: 70, r: 5, tone: 'bg-info-soft text-info-ink' },
  { label: '“Re: Re: vendor quote”', x: 30, y: 78, r: -4, tone: 'bg-paper text-ink' },
  { label: 'Sticky notes', x: 70, y: 50, r: 9, tone: 'bg-warn-soft text-warn-ink' },
  { label: 'Shared drive', x: 12, y: 80, r: 6, tone: 'bg-paper text-ink' },
  { label: 'Group chat (47 unread)', x: 48, y: 84, r: -6, tone: 'bg-coral-soft text-coral-deep' },
  { label: 'Seating draft v3', x: 66, y: 74, r: -9, tone: 'bg-paper text-ink' },
  { label: 'Run sheet (old)', x: 2, y: 36, r: 8, tone: 'bg-warn-soft text-warn-ink' },
  { label: 'Guest list (2).csv', x: 62, y: 34, r: -5, tone: 'bg-info-soft text-info-ink' },
  { label: 'Invoices.zip', x: 40, y: 62, r: 4, tone: 'bg-paper text-ink' },
  { label: 'who owns this??', x: 22, y: 44, r: -10, tone: 'bg-coral-soft text-coral-deep' },
  { label: 'Vendor contacts.pdf', x: 66, y: 62, r: 7, tone: 'bg-ok-soft text-ok-ink' },
]

const BudgetView = SHOWCASE[1].View

/**
 * Act 1: the problem and the fix. Pinned scene where scattered files fly together
 * and resolve into one dashboard, driven entirely by scroll.
 */
export function ChaosScene() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return
      const stage = root.current.querySelector<HTMLElement>('[data-chaos-stage]')!
      const scraps = gsap.utils.toArray<HTMLElement>('[data-scrap]')
      const mm = gsap.matchMedia()

      // Short viewports (phones in landscape) can't fit the pinned scene; they get the flat layout.
      mm.add('(min-height: 640px)', () => {
        gsap.set(scraps, { rotation: (i) => SCRAPS[i].r })
        gsap.set('[data-order]', { scale: 0.7, opacity: 0, y: 60 })
        gsap.set('[data-text-b]', { opacity: 0, y: 40 })

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=2400',
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        })

        /* a little shake of anxiety first */
        tl.to(scraps, { x: (i) => (i % 2 ? 14 : -14), y: (i) => (i % 3 ? -10 : 10), rotation: (i) => SCRAPS[i].r * 1.4, duration: 0.6, ease: 'sine.inOut' })
          .to(
            scraps,
            {
              // Fly each scrap from wherever it is now to the centre of the dashboard.
              x: (_i, el: HTMLElement) => {
                const r = el.getBoundingClientRect()
                const s = stage.getBoundingClientRect()
                return (gsap.getProperty(el, 'x') as number) + (s.left + s.width / 2 - (r.left + r.width / 2))
              },
              y: (_i, el: HTMLElement) => {
                const r = el.getBoundingClientRect()
                const s = stage.getBoundingClientRect()
                const targetY = s.top + Math.min(s.height * 0.4, 190)
                return (gsap.getProperty(el, 'y') as number) + (targetY - (r.top + r.height / 2))
              },
              rotation: 0,
              scale: 0.2,
              opacity: 0,
              duration: 1.6,
              ease: 'power3.in',
              stagger: { each: 0.06, from: 'random' },
            },
            '>0.1',
          )
          .to('[data-text-a]', { opacity: 0, y: -40, duration: 0.6 }, '<0.2')
          .to('[data-text-b]', { opacity: 1, y: 0, duration: 0.7 }, '<0.15')
          .to('[data-order]', { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '<-0.2')
          .to({}, { duration: 0.8 })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="problem" data-tone="dark" className="relative h-screen overflow-hidden bg-navy text-white flat:h-auto flat:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <i className="absolute -top-60 -right-40 size-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(233,90,120,.22),transparent)]" />
        <i className="absolute -bottom-60 -left-40 size-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(59,111,216,.2),transparent)]" />
      </div>

      <Container className="relative h-full flat:h-auto">
        <div className="absolute top-24 left-4 md:top-28 md:left-8 flat:static">
          <Eyebrow className="text-coral-light">The problem</Eyebrow>
          <div className="relative mt-4 h-[clamp(120px,20vw,260px)] w-[min(92vw,900px)] flat:h-auto flat:w-auto">
            <h2
              data-text-a
              className="absolute inset-0 font-serif flat:hidden text-[clamp(30px,4.8vw,74px)] leading-[.98] font-medium tracking-[-0.03em]"
            >
              Your event budget lives in <em className="text-coral-light">twelve spreadsheets.</em>
            </h2>
            <h2
              data-text-b
              className="absolute inset-0 font-serif flat:static text-[clamp(30px,4.8vw,74px)] leading-[.98] font-medium tracking-[-0.03em]"
            >
              Now it lives in <em className="text-coral-light">one place.</em>
            </h2>
          </div>
        </div>

        <div data-chaos-stage className="absolute inset-x-4 top-[38%] bottom-6 md:inset-x-8 md:top-[34%] flat:static flat:mt-10">
          {SCRAPS.map((s) => (
            <span
              key={s.label}
              data-scrap
              style={{ left: `${s.x}%`, top: `${s.y - 30}%` }}
              className={`absolute flat:hidden max-w-[46%] rounded-lg px-3 py-2 text-[12px] font-semibold shadow-[0_10px_30px_-10px_rgba(0,0,0,.6)] sm:text-[13.5px] ${s.tone}`}
            >
              {s.label}
            </span>
          ))}

          <div data-order className="absolute inset-x-0 top-0 mx-auto w-full max-w-[860px] flat:static">
            <AppFrame url="app.eventplanon.com/events/sydney-conference/budget" className="text-ink">
              <AppMain className="max-h-[52vh] overflow-hidden p-4 md:p-[22px] flat:max-h-none">
                <BudgetView />
              </AppMain>
            </AppFrame>
          </div>
        </div>
      </Container>
    </section>
  )
}
