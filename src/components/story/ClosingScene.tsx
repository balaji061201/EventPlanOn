import { useRef } from 'react'
import { PATHS } from '@/config/routes'
import { BUSINESS, TRIAL_CTA, TRIAL_LINE } from '@/config/business'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'

const perks = [
  TRIAL_LINE,
  'Pricing in AUD, GST included',
  `Australian support team, ${BUSINESS.hours}`,
  'Upgrade, downgrade or cancel anytime',
]

/** Final act: a coral circle expands from the bottom of the page to fill the screen. */
export function ClosingScene({ lead = 'Your next event budget' }: { lead?: string }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return
      gsap.fromTo(
        '[data-closing-bg]',
        { clipPath: 'circle(14% at 50% 100%)' },
        {
          clipPath: 'circle(150% at 50% 100%)',
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 10%', scrub: 0.5 },
        },
      )
      gsap.from('[data-closing-in]', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 35%', once: true },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-label="Get started" className="relative overflow-hidden bg-ivory">
      <div data-closing-bg className="bg-coral py-28 text-white md:py-40">
        <Container className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,.7fr)]">
          <div>
            <h2 data-closing-in className="font-serif text-[clamp(35px,6.4vw,102px)] leading-[1.04] font-medium tracking-[-0.035em]">
              {lead} <em>starts here.</em>
            </h2>
            <p data-closing-in className="mt-8 max-w-[50ch] text-lg opacity-90 md:text-xl">
              Describe your event, get an AI-built budget in minutes, and keep every dollar on track. Or book a demo and we will walk through it with you.
            </p>
            <div data-closing-in className="mt-9 flex flex-wrap gap-3">
              <Button route="signup" variant="white" size="lg" arrow>
                {TRIAL_CTA}
              </Button>
              <Button to={PATHS.demo} variant="line" size="lg">
                Book a demo
              </Button>
            </div>
          </div>
          <ul data-closing-in className="m-0 grid list-none gap-3.5 rounded-[22px] border border-white/25 bg-white/12 p-6">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3 font-medium">
                <Icon name="check" size={18} className="mt-[3px] shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  )
}
