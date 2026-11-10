import { useRef } from 'react'
import { PATHS } from '@/config/routes'
import { BUSINESS, addressLine } from '@/config/business'
import { ABOUT } from '@/data/content'
import { definitionFor } from '@/data/seo'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Button } from '@/components/ui/Button'
import { Container, Eyebrow, Section } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'
import { MegaIcon } from '@/components/ui/atoms'
import { PageHero } from '@/components/site/PageHero'
import { ContactSection } from '@/components/site/ContactDetails'
import { PhotoPlaceholder } from '@/components/sections/Testimonials'

const h2 = 'font-serif text-[clamp(28px,3.6vw,46px)] leading-[1.08] font-medium tracking-[-0.03em]'

export default function About() {
  const root = useRef<HTMLDivElement>(null)
  useScrollReveal(root, '[data-reveal]')

  return (
    <div ref={root}>
      <PageHero
        eyebrow="About us"
        lines={['Event budgets,']}
        accent="made clear."
        lede={definitionFor(PATHS.about)}
      >
        <p className="mt-5 text-sm text-muted">
          Sample content: replace the story, mission, vision and team with your own.
        </p>
      </PageHero>

      <Section className="bg-paper">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className={`mt-3.5 ${h2}`}>
              From messy spreadsheets to <em className="text-coral">one clear budget.</em>
            </h2>
          </div>
          <div className="grid gap-5 text-lg text-muted">
            {ABOUT.story.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-5 md:grid-cols-2">
          {[
            { label: 'Our mission', text: ABOUT.mission, icon: 'bolt' as const },
            { label: 'Our vision', text: ABOUT.vision, icon: 'spark' as const },
          ].map((b) => (
            <div key={b.label} data-reveal className="rounded-card-lg border border-line bg-paper p-8 md:p-10">
              <MegaIcon name={b.icon} size={48} iconSize={22} rounded="rounded-xl" />
              <small className="mt-5 block font-display text-xs font-bold tracking-[.12em] text-coral-deep uppercase">{b.label}</small>
              <p className="mt-3 font-serif text-[clamp(20px,2.2vw,28px)] leading-snug font-medium tracking-[-0.015em]">{b.text}</p>
            </div>
          ))}
        </Container>
      </Section>

      <Section className="bg-sand/60">
        <Container>
          <Eyebrow>Our values</Eyebrow>
          <h2 className={`mt-3.5 mb-10 ${h2}`}>
            What we <em className="text-coral">stand for.</em>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT.values.map((v) => (
              <div key={v.title} data-reveal className="grid content-start gap-3 rounded-card-lg border border-line bg-paper p-6">
                <MegaIcon name={v.icon} size={44} iconSize={20} rounded="rounded-xl" />
                <h3 className="font-serif text-xl leading-tight font-medium">{v.title}</h3>
                <p className="text-[15px] text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow>Founder & team</Eyebrow>
          <h2 className={`mt-3.5 mb-10 ${h2}`}>
            The people <em className="text-coral">behind it.</em>
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {ABOUT.team.map((m, i) => (
              <article key={i} data-reveal className="rounded-card-lg border border-line bg-paper p-7">
                <PhotoPlaceholder className="size-24" label={`Photo placeholder for ${m.name}, ${m.role}`} />
                <h3 className="mt-5 font-serif text-xl font-medium">{m.name}</h3>
                <p className="text-sm font-semibold text-coral-deep">{m.role}</p>
                <p className="mt-3 text-[15px] text-muted">{m.bio}</p>
                <a
                  href="#"
                  aria-label={`${m.name} on LinkedIn`}
                  className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-bold text-coral-deep hover:underline"
                >
                  LinkedIn <Icon name="arrow" size={13} />
                </a>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper py-14 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <Eyebrow>Our Australian office</Eyebrow>
            <p className="mt-3 font-serif text-[clamp(22px,2.6vw,32px)] leading-snug font-medium">{addressLine()}</p>
            <p className="mt-2 text-muted">
              {BUSINESS.legalName} · ABN {BUSINESS.abn} · {BUSINESS.hours}
            </p>
          </div>
          <Button to={PATHS.contact} size="lg" arrow>
            Contact us
          </Button>
        </Container>
      </Section>

      <ContactSection className="bg-ivory" heading={false} />
    </div>
  )
}
