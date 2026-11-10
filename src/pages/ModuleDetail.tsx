import { useRef } from 'react'
import { useParams } from 'react-router'
import { PATHS } from '@/config/routes'
import { MODULES, MODULE_RELATED, type PlatformModule } from '@/data/content'
import { definitionFor } from '@/data/seo'
import { TRIAL_CTA } from '@/config/business'
import { TrialNote } from '@/components/site/TrialNote'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { AppFrame, AppMain } from '@/components/ui/AppFrame'
import { Container, Eyebrow, Section } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'
import { MODULE_VIEWS } from '@/components/product/ModuleViews'
import { PageHero } from '@/components/site/PageHero'
import { LinkCard } from '@/components/site/LinkCard'
import { SiteLink } from '@/components/site/SiteLink'
import { ClosingScene } from '@/components/story/ClosingScene'
import NotFound from './NotFound'

function ModuleView({ module, index }: { module: PlatformModule; index: number }) {
  const root = useRef<HTMLDivElement>(null)
  useScrollReveal(root, '[data-reveal]')

  const View = MODULE_VIEWS[module.id]
  const prev = MODULES[(index - 1 + MODULES.length) % MODULES.length]
  const next = MODULES[(index + 1) % MODULES.length]
  const related = MODULE_RELATED[module.id].map((id) => MODULES.find((m) => m.id === id)!)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-tilt]',
        { rotateX: 14, y: 60, scale: 0.95, transformOrigin: '50% 0%' },
        { rotateX: 0, y: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: '[data-tilt]', start: 'top 95%', end: 'top 35%', scrub: 0.5 } },
      )
    },
    { scope: root },
  )

  return (
    <div ref={root}>
      <PageHero eyebrow={`Platform · ${module.label}`} lines={[module.title]} lede={definitionFor(`${PATHS.platform}/${module.id}`)}>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button route="signup" size="lg" arrow>
            {TRIAL_CTA}
          </Button>
          <Button to={PATHS.demo} variant="ghost" size="lg">
            See it in a demo
          </Button>
        </div>
        <TrialNote className="mt-5" />
      </PageHero>

      <Section className="bg-ivory pt-0 md:pt-0">
        <Container className="[perspective:1600px]">
          <div data-tilt className="mx-auto max-w-[1040px] will-change-transform">
            <AppFrame url={`app.eventplanon.com/${module.id}`}>
              <AppMain className="min-h-[360px] content-start p-4 md:p-[22px]">
                <View />
              </AppMain>
            </AppFrame>
          </div>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container>
          <Eyebrow>What you get</Eyebrow>
          <ol className="m-0 mt-8 grid list-none border-t border-line p-0">
            {module.points.map((p, i) => (
              <li
                key={p}
                data-reveal
                className="group grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-6 border-b border-line py-8 transition-colors hover:bg-ivory md:gap-12 md:px-4"
              >
                <span className="font-serif text-[clamp(32px,4.8vw,70px)] leading-none text-coral/30 transition-colors group-hover:text-coral">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-serif text-[clamp(22px,2.7vw,38px)] leading-[1.15] font-medium tracking-[-0.02em]">{p}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-ivory">
        <Container>
          <Eyebrow>Pairs well with</Eyebrow>
          <h2 className="mt-3 mb-10 max-w-[18ch] font-serif text-[clamp(30px,3.7vw,51px)] leading-none font-medium tracking-[-0.03em]">
            Change one number. <em className="text-coral">Everything updates.</em>
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((m) => (
              <LinkCard key={m.id} to={`${PATHS.platform}/${m.id}`} icon={m.icon} title={m.label} text={m.text} />
            ))}
          </div>

          <div className="mt-14 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
            {[
              { label: 'Previous', m: prev, dir: 'left' as const },
              { label: 'Next', m: next, dir: 'right' as const },
            ].map(({ label, m, dir }) => (
              <SiteLink
                key={label}
                to={`${PATHS.platform}/${m.id}`}
                className={`group flex items-center gap-4 rounded-card-lg border border-line bg-paper p-6 transition-colors hover:border-coral ${dir === 'right' ? 'sm:flex-row-reverse sm:text-right' : ''}`}
              >
                <Icon name="arrow" size={20} className={`text-coral transition-transform ${dir === 'left' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                <span>
                  <span className="block text-xs font-semibold tracking-[.14em] text-muted uppercase">{label}</span>
                  <strong className="font-serif text-2xl font-medium">{m.label}</strong>
                </span>
              </SiteLink>
            ))}
          </div>
        </Container>
      </Section>

      <ClosingScene />
    </div>
  )
}

export default function ModuleDetail() {
  const { id } = useParams<{ id: string }>()
  const index = MODULES.findIndex((m) => m.id === id)
  if (index < 0) return <NotFound />
  return <ModuleView key={MODULES[index].id} module={MODULES[index]} index={index} />
}
