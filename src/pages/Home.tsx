import { PATHS } from '@/config/routes'
import { CITIES, TRIAL_CTA } from '@/config/business'
import { Button } from '@/components/ui/Button'
import { Container, Eyebrow, Section } from '@/components/ui/layout'
import { Marquee } from '@/components/site/Marquee'
import { ContactSection } from '@/components/site/ContactDetails'
import { TrialNote } from '@/components/site/TrialNote'
import { HeroScene } from '@/components/story/HeroScene'
import { ChaosScene } from '@/components/story/ChaosScene'
import { JourneyScene } from '@/components/story/JourneyScene'
import { UseCaseStack } from '@/components/story/UseCaseStack'
import { ProofScene } from '@/components/story/ProofScene'
import { ClosingScene } from '@/components/story/ClosingScene'
import { ConnectedHub } from '@/components/sections/ConnectedHub'
import { AiAssistant } from '@/components/sections/AiAssistant'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'

const AUDIENCES = ['Corporate teams', 'Event agencies', 'Wedding planners', 'Festivals & expos', 'Schools & clubs', 'Charities']

/**
 * The home page tells one story: the problem → how it works → everything stays in sync → AI help →
 * who it is for → proof → pricing, questions and contact. Each act is driven by scroll.
 */
export default function Home() {
  return (
    <>
      <HeroScene />
      <ChaosScene />
      <JourneyScene />
      <ConnectedHub className="bg-sand/60 pt-24 md:pt-32" act="Always in sync" />
      <AiAssistant act="AI event budgeting" />

      <Section className="overflow-hidden pb-10 md:pb-16">
        <Container>
          <Eyebrow>Built for people who make events happen</Eyebrow>
        </Container>
        <div className="mt-8 grid gap-2">
          <Marquee words={AUDIENCES} />
          <Marquee words={[...AUDIENCES].reverse()} reverse />
        </div>
      </Section>

      <Section className="pt-6 md:pt-10">
        <Container>
          <div className="mb-12 max-w-[760px]">
            <Eyebrow>Use cases</Eyebrow>
            <h2 className="mt-3 font-serif text-[clamp(30px,4vw,58px)] leading-[1.05] font-medium tracking-[-0.03em]">
              A budget for every kind of team, <em className="text-coral">from boardroom to community hall.</em>
            </h2>
            <p className="mt-5 text-lg text-muted">
              Event management software for corporate teams, agencies, schools, clubs and charities in{' '}
              {CITIES.slice(0, -1).join(', ')} and {CITIES[CITIES.length - 1]}.
            </p>
          </div>
          <UseCaseStack />
        </Container>
      </Section>

      <ProofScene />
      <Testimonials />

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-3 font-serif text-[clamp(28px,3.6vw,46px)] leading-[1.08] font-medium tracking-[-0.03em]">
              Simple pricing in <em className="text-coral">Australian dollars.</em>
            </h2>
            <p className="mt-4 max-w-[56ch] text-lg text-muted">
              Every plan is priced in AUD and includes GST. Use our plan guide to match a plan to your event volume and budgets.
            </p>
            <TrialNote className="mt-5" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button route="signup" size="lg" arrow>
              {TRIAL_CTA}
            </Button>
            <Button to={PATHS.pricing} variant="ghost" size="lg">
              See pricing
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Container>
          <Faq />
        </Container>
      </Section>

      <ContactSection />
      <ClosingScene />
    </>
  )
}
