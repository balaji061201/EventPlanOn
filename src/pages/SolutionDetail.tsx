import { useRef } from 'react'
import { useParams } from 'react-router'
import { PATHS } from '@/config/routes'
import { MODULES, SOLUTIONS, SOLUTION_MODULES, type Solution } from '@/data/content'
import { TRIAL_CTA } from '@/config/business'
import { definitionFor } from '@/data/seo'
import { TrialNote } from '@/components/site/TrialNote'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Button } from '@/components/ui/Button'
import { Container, Eyebrow, Section } from '@/components/ui/layout'
import { MegaIcon } from '@/components/ui/atoms'
import { PageHero } from '@/components/site/PageHero'
import { LinkCard } from '@/components/site/LinkCard'
import { WordReveal } from '@/components/site/WordReveal'
import { SiteLink } from '@/components/site/SiteLink'
import { ClosingScene } from '@/components/story/ClosingScene'
import NotFound from './NotFound'

function SolutionView({ solution }: { solution: Solution }) {
  const root = useRef<HTMLDivElement>(null)
  useScrollReveal(root, '[data-reveal]')

  const tools = SOLUTION_MODULES[solution.id].map((id) => MODULES.find((m) => m.id === id)!)
  const others = SOLUTIONS.filter((s) => s.id !== solution.id)

  return (
    <div ref={root}>
      <PageHero eyebrow={`Solutions · ${solution.title}`} lines={[solution.headline]} lede={definitionFor(`${PATHS.solutions}/${solution.id}`)}>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button route="signup" size="lg" arrow>
            {TRIAL_CTA}
          </Button>
          <Button to={PATHS.demo} variant="ghost" size="lg">
            See it for your team
          </Button>
        </div>
        <TrialNote className="mt-5" />
      </PageHero>

      <Section className="bg-paper">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] lg:gap-16">
          <div>
            <Eyebrow>{solution.quote[0]}</Eyebrow>
            <WordReveal
              className="mt-6 font-serif text-[clamp(24px,3.4vw,46px)] leading-[1.12] font-medium tracking-[-0.03em]"
              text={solution.quote[1]}
            />
          </div>
          <div className="grid content-start gap-4">
            {solution.stats.map(([icon, title, text]) => (
              <div key={title} data-reveal className="flex items-center gap-4 rounded-card-lg bg-sand p-6">
                <MegaIcon name={icon} size={52} iconSize={24} rounded="rounded-2xl" />
                <div>
                  <strong className="block font-serif text-2xl font-medium">{title}</strong>
                  <span className="text-[15px] text-muted">{text}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow>What you get</Eyebrow>
          <ol className="m-0 mt-8 grid list-none border-t border-line p-0">
            {solution.points.map((p, i) => (
              <li key={p} data-reveal className="group grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-6 border-b border-line py-8 md:gap-12 md:px-4">
                <span className="font-serif text-[clamp(32px,4.8vw,70px)] leading-none text-coral/30 transition-colors group-hover:text-coral">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-serif text-[clamp(22px,2.7vw,38px)] leading-[1.15] font-medium tracking-[-0.02em]">{p}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-sand/60">
        <Container>
          <Eyebrow>Tools you will lean on</Eyebrow>
          <h2 className="mt-3 mb-10 max-w-[20ch] font-serif text-[clamp(28px,3.6vw,50px)] leading-[1.05] font-medium tracking-[-0.03em]">
            The tools <em className="text-coral">made for this.</em>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((m) => (
              <LinkCard key={m.id} to={`${PATHS.platform}/${m.id}`} icon={m.icon} title={m.label} text={m.text} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-12 md:py-16">
        <Container>
          <Eyebrow>Other teams</Eyebrow>
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((s) => (
              <SiteLink
                key={s.id}
                to={`${PATHS.solutions}/${s.id}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper px-5 py-3 font-display text-sm font-bold transition-colors hover:border-coral hover:text-coral-deep"
              >
                {s.title}
              </SiteLink>
            ))}
          </div>
        </Container>
      </Section>

      <ClosingScene />
    </div>
  )
}

export default function SolutionDetail() {
  const { id } = useParams<{ id: string }>()
  const solution = SOLUTIONS.find((s) => s.id === id)
  if (!solution) return <NotFound />
  return <SolutionView key={solution.id} solution={solution} />
}
