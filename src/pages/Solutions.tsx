import { PATHS } from '@/config/routes'
import { TRIAL_CTA } from '@/config/business'
import { definitionFor } from '@/data/seo'
import { Button } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/layout'
import { PageHero } from '@/components/site/PageHero'
import { Marquee } from '@/components/site/Marquee'
import { TrialNote } from '@/components/site/TrialNote'
import { SolutionStack } from '@/components/story/SolutionStack'
import { ClosingScene } from '@/components/story/ClosingScene'

export default function Solutions() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        lines={['Built for the way']}
        accent="your team runs events."
        lede={definitionFor(PATHS.solutions)}
      >
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button route="signup" size="lg" arrow>
            {TRIAL_CTA}
          </Button>
          <Button to={PATHS.useCases} variant="ghost" size="lg">
            See use cases
          </Button>
        </div>
        <TrialNote className="mt-5" />
      </PageHero>
      <Section className="pt-0 md:pt-0">
        <Container>
          <SolutionStack />
        </Container>
      </Section>
      <Section className="overflow-hidden py-10 md:py-16">
        <Marquee words={['Conferences', 'Offsites', 'EOFY functions', 'Weddings', 'Expos', 'Launches']} />
      </Section>
      <ClosingScene />
    </>
  )
}
