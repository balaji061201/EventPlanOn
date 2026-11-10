import { useRef } from 'react'
import { PATHS } from '@/config/routes'
import { TRIAL_CTA, TRIAL_DAYS } from '@/config/business'
import { MODULES } from '@/data/content'
import { definitionFor } from '@/data/seo'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Button } from '@/components/ui/Button'
import { Container, Eyebrow, Section } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'
import { PageHero } from '@/components/site/PageHero'
import { SiteLink } from '@/components/site/SiteLink'
import { TrialNote } from '@/components/site/TrialNote'
import { ClosingScene } from '@/components/story/ClosingScene'
import { Faq } from '@/components/sections/Faq'
import { PricingPlans } from '@/components/sections/PricingPlans'

const STEPS = [
  { title: 'Sign up', text: 'Start your free trial. No credit card, no commitment.' },
  { title: 'Budget a real event', text: 'Describe an event in a prompt and let the AI build your first budget.' },
  { title: 'Choose a plan', text: 'Pick a plan if it works for you, or let the trial lapse and export your data.' },
]

export default function Pricing() {
  const root = useRef<HTMLDivElement>(null)
  useScrollReveal(root, '[data-reveal]')

  return (
    <div ref={root}>
      <PageHero
        eyebrow="Pricing"
        lines={['Event budget software,']}
        accent="priced in AUD."
        lede={definitionFor(PATHS.pricing)}
      >
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button route="signup" size="lg" arrow>
            {TRIAL_CTA}
          </Button>
          <Button to={PATHS.demo} variant="ghost" size="lg">
            Book a demo
          </Button>
        </div>
        <TrialNote className="mt-5" />
      </PageHero>

      <PricingPlans className="pt-0 md:pt-0" />

      <Section className="bg-paper">
        <Container>
          <Eyebrow>How the {TRIAL_DAYS}-day trial works</Eyebrow>
          <ol className="m-0 mt-10 grid list-none gap-5 p-0 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} data-reveal className="grid content-start gap-3 rounded-card-lg bg-sand p-8">
                <span className="font-serif text-6xl leading-none text-coral">{i + 1}</span>
                <h3 className="font-serif text-2xl leading-tight font-medium">{s.title}</h3>
                <p className="text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow>Included in your trial</Eyebrow>
          <h2 className="mt-3 mb-10 max-w-[20ch] font-serif text-[clamp(30px,3.7vw,51px)] leading-[1.05] font-medium tracking-[-0.03em]">
            Every feature. <em className="text-coral">No locked doors.</em>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => (
              <SiteLink
                key={m.id}
                to={`${PATHS.platform}/${m.id}`}
                data-reveal
                className="group flex items-center gap-4 rounded-2xl border border-line bg-paper px-5 py-4 transition-colors hover:border-coral"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-[11px] bg-coral-soft text-coral-deep">
                  <Icon name={m.icon} size={18} />
                </span>
                <strong className="font-display text-[15px]">{m.label}</strong>
                <Icon name="arrow" size={15} className="ml-auto text-coral opacity-0 transition-opacity group-hover:opacity-100" />
              </SiteLink>
            ))}
            <div data-reveal className="flex items-center gap-4 rounded-2xl border border-coral bg-coral-soft px-5 py-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-[11px] bg-coral text-white">
                <Icon name="spark" size={18} />
              </span>
              <strong className="font-display text-[15px]">AI-automated budgeting</strong>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Container>
          <Faq />
        </Container>
      </Section>

      <ClosingScene />
    </div>
  )
}
