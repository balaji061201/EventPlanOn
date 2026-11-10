import { useRef } from 'react'
import { PATHS } from '@/config/routes'
import { TRIAL_CTA, TRIAL_LINE } from '@/config/business'
import { definitionFor } from '@/data/seo'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { Container, Eyebrow } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'
import { MegaIcon } from '@/components/ui/atoms'
import { HeroDashboard } from '@/components/product/HeroDashboard'
import { MaskedLine } from '@/components/site/PageHero'

const assurances = [TRIAL_LINE, 'Pricing in AUD, GST included', 'Built for Australian event teams']

const chip =
  'absolute flex items-center gap-2.5 rounded-card border border-line bg-paper px-3.5 py-3 text-[12.5px] shadow-lift'

/** Act 0: the promise. A headline that rises line by line, then a dashboard that tilts flat as you scroll. */
export function HeroScene() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap
        .timeline({ delay: 0.1, defaults: { ease: 'power4.out' } })
        .from('[data-in="eyebrow"]', { y: 14, opacity: 0, duration: 0.6 })
        .from('[data-w]', { yPercent: 115, duration: 1.15, stagger: 0.11 }, '-=0.3')
        .from('[data-in="rest"]', { y: 22, opacity: 0, duration: 0.8, stagger: 0.09 }, '-=0.65')
        .from('[data-stage-intro]', { y: 90, opacity: 0, duration: 1.3 }, '-=0.7')
        .from('[data-chip]', { scale: 0.8, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.5')

      /* The dashboard tilts flat as it rises into view */
      gsap.fromTo(
        '[data-stage]',
        { rotateX: 16, scale: 0.93, transformOrigin: '50% 0%' },
        {
          rotateX: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-stage]', start: 'top 92%', end: 'top 25%', scrub: 0.6 },
        },
      )

      /* Floating cards drift at different speeds */
      gsap.utils.toArray<HTMLElement>('[data-par]').forEach((el) => {
        gsap.to(el, {
          y: -Number(el.dataset.par),
          ease: 'none',
          scrollTrigger: { trigger: '[data-stage]', start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      gsap.to('[data-glow]', { x: 60, y: -40, duration: 12, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className="relative overflow-hidden bg-ivory pt-32 pb-24 md:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <i data-glow className="absolute top-10 right-[2%] size-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(233,90,120,.2),transparent)]" />
        <i className="absolute top-[40%] -left-40 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(59,111,216,.08),transparent)]" />
      </div>

      <Container className="relative">
        <div data-in="eyebrow" className="flex items-center gap-3">
          <span className="rounded-full bg-coral-soft px-2.5 py-1 font-display text-[11px] font-bold tracking-[.08em] text-coral-deep uppercase">
            New
          </span>
          <Eyebrow>AI budgeting for Australian event teams</Eyebrow>
        </div>

        <h1 className="mt-6 font-serif text-[clamp(38px,6.9vw,106px)] leading-[1.02] font-medium tracking-[-0.035em]">
          <MaskedLine>AI event budgeting</MaskedLine>
          <MaskedLine>that keeps every</MaskedLine>
          <MaskedLine accent>dollar on track.</MaskedLine>
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p data-in="rest" className="max-w-[52ch] text-lg text-muted md:text-xl">
            {definitionFor(PATHS.home)}
          </p>
          <div data-in="rest" className="flex flex-wrap gap-3">
            <Button route="signup" size="lg" arrow>
              {TRIAL_CTA}
            </Button>
            <Button to={PATHS.demo} variant="ghost" size="lg">
              Book a demo
            </Button>
          </div>
        </div>

        <div data-in="rest" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {assurances.map((a) => (
            <span key={a} className="flex items-center gap-[7px]">
              <Icon name="check" size={16} className="text-ok" />
              {a}
            </span>
          ))}
        </div>

        <div data-stage-intro className="relative mx-auto mt-20 max-w-[1040px] [perspective:1700px]">
          <div data-stage className="will-change-transform">
            <HeroDashboard />
          </div>

          <div data-par="70" className="absolute -top-8 -left-2 hidden sm:block xl:-left-10">
            <div data-chip className={`${chip} static`}>
              <MegaIcon name="spark" size={30} />
              <div>
                <strong className="block font-display text-[13px]">AV is $1,200 over budget</strong>
                <span className="text-muted">Move $900 from décor?</span>
              </div>
            </div>
          </div>
          <div data-par="120" className="absolute top-24 -right-2 hidden sm:block xl:-right-12">
            <div data-chip className={`${chip} static`}>
              <span className="grid size-[30px] place-items-center rounded-[9px] bg-ok-soft text-ok-ink">
                <Icon name="vendor" size={17} />
              </span>
              <div>
                <strong className="block font-display text-[13px] tabular-nums">Quote accepted</strong>
                <span className="text-muted">Harbour AV · $5,200 inc. GST</span>
              </div>
            </div>
          </div>
          <div data-par="50" className="absolute -bottom-8 left-[18%] hidden md:block">
            <div data-chip className={`${chip} static`}>
              <MegaIcon name="send" size={30} />
              <div>
                <strong className="block font-display text-[13px]">Proposal approved</strong>
                <span className="text-muted">Sent to the client 2 days ago</span>
              </div>
            </div>
          </div>
        </div>

        <div data-in="rest" className="mt-24 flex items-center justify-center gap-3 text-xs font-semibold tracking-[.18em] text-muted uppercase">
          <span className="h-px w-10 bg-line" />
          Scroll to see how it works
          <span className="h-px w-10 bg-line" />
        </div>
      </Container>
    </section>
  )
}
