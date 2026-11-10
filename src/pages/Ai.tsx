import { useRef } from 'react'
import { PATHS } from '@/config/routes'
import { TRIAL_CTA } from '@/config/business'
import { definitionFor } from '@/data/seo'
import { TrialNote } from '@/components/site/TrialNote'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Button } from '@/components/ui/Button'
import { Container, Eyebrow, Section } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'
import { PageHero } from '@/components/site/PageHero'
import { WordReveal } from '@/components/site/WordReveal'
import { AiAssistant } from '@/components/sections/AiAssistant'
import { ClosingScene } from '@/components/story/ClosingScene'
import type { IconName } from '@/types'

const STEPS: { icon: IconName; title: string; text: string }[] = [
  { icon: 'spark', title: 'Understands your event', text: 'Event type, guest count, city and total budget are picked up from your prompt.' },
  { icon: 'budget', title: 'Builds your category budget', text: 'Your total is spread across venue, catering, AV, décor and more, with contingency held back.' },
  { icon: 'shield', title: 'Flags overspend early', text: 'Lines trending over budget are highlighted, with options for where to rebalance.' },
  { icon: 'send', title: 'Drafts the paperwork', text: 'Quotes are compared and proposals drafted, so you review instead of retyping.' },
]

export default function Ai() {
  const root = useRef<HTMLDivElement>(null)
  useScrollReveal(root, '[data-reveal]')

  return (
    <div ref={root}>
      <PageHero
        tone="dark"
        eyebrow="AI event budgeting"
        lines={['Describe your event.']}
        accent="Get your budget."
        lede={definitionFor(PATHS.ai)}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button route="signup" size="lg" arrow>
            {TRIAL_CTA}
          </Button>
          <Button to={PATHS.demo} variant="line" size="lg">
            See it in a demo
          </Button>
        </div>
        <TrialNote dark className="mt-5" />
      </PageHero>

      <AiAssistant act="Try a prompt" compact />

      <Section>
        <Container>
          <Eyebrow>What the AI does</Eyebrow>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} data-reveal className="relative grid content-start gap-4 rounded-card-lg border border-line bg-paper p-7">
                <span className="font-serif text-6xl leading-none text-coral/25">{String(i + 1).padStart(2, '0')}</span>
                <span className="grid size-11 place-items-center rounded-xl bg-coral-soft text-coral-deep">
                  <Icon name={s.icon} size={20} />
                </span>
                <h3 className="font-serif text-2xl leading-tight font-medium">{s.title}</h3>
                <p className="text-[15px] text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container>
          <Eyebrow>Our principle</Eyebrow>
          <WordReveal
            className="mt-6 font-serif text-[clamp(30px,4.8vw,77px)] leading-[1] font-medium tracking-[-0.035em]"
            text="Suggestions, never surprises. You approve every number."
          />
        </Container>
      </Section>

      <ClosingScene />
    </div>
  )
}
