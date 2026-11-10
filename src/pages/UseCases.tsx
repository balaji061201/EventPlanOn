import { useRef } from 'react'
import { PATHS } from '@/config/routes'
import { TRIAL_CTA } from '@/config/business'
import { USE_CASES } from '@/data/content'
import { definitionFor } from '@/data/seo'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Button } from '@/components/ui/Button'
import { AppFrame, AppMain } from '@/components/ui/AppFrame'
import { Container, Section } from '@/components/ui/layout'
import { BuiltBudgetView, PromptView } from '@/components/product/BudgetViews'
import { PageHero } from '@/components/site/PageHero'
import { SiteLink } from '@/components/site/SiteLink'
import { TrialNote } from '@/components/site/TrialNote'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { UseCaseSection } from '@/components/sections/UseCaseSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { ClosingScene } from '@/components/story/ClosingScene'

export default function UseCases() {
  const root = useRef<HTMLDivElement>(null)
  useScrollReveal(root, '[data-reveal]')

  return (
    <div ref={root}>
      <PageHero
        eyebrow="Use cases"
        lines={['A budget for every']}
        accent="kind of event."
        lede={definitionFor(PATHS.useCases)}
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
        <nav aria-label="Use cases" className="mt-8 flex flex-wrap gap-2">
          {USE_CASES.map((u) => (
            <SiteLink
              key={u.id}
              to={`${PATHS.useCases}#${u.id}`}
              className="rounded-full border border-line bg-paper px-4 py-2 font-display text-sm font-bold transition-colors hover:border-coral hover:text-coral-deep"
            >
              {u.label}
            </SiteLink>
          ))}
        </nav>
      </PageHero>

      <Section className="bg-paper pt-12 md:pt-16">
        <Container>
          <HowItWorks />
          <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
            <div data-reveal className="min-w-0">
              <AppFrame url="app.eventplanon.com/events/new">
                <AppMain className="min-h-[300px] content-start">
                  <PromptView />
                </AppMain>
              </AppFrame>
            </div>
            <div data-reveal className="min-w-0">
              <AppFrame url="app.eventplanon.com/events/sydney-conference/budget">
                <AppMain className="min-h-[300px] content-start">
                  <BuiltBudgetView />
                </AppMain>
              </AppFrame>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">Example: a prompt and the budget the AI builds from it. Sample data.</p>
        </Container>
      </Section>

      {USE_CASES.map((u, i) => (
        <UseCaseSection key={u.id} useCase={u} index={i} />
      ))}

      <Testimonials />
      <ClosingScene />
    </div>
  )
}
