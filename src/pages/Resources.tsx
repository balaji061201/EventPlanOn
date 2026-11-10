import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { PATHS } from '@/config/routes'
import { definitionFor } from '@/data/seo'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Container, Section } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'
import { PageHero } from '@/components/site/PageHero'
import { SiteLink } from '@/components/site/SiteLink'
import { ClosingScene } from '@/components/story/ClosingScene'
import { Faq } from '@/components/sections/Faq'
import type { IconName } from '@/types'

interface ResourceProps {
  kind: string
  title: string
  text: string
  artClass: string
  art: ReactNode
  /** Internal page this resource opens; omit while the content is being written. */
  to?: string
  cta?: string
  className?: string
}

function Resource({ kind, title, text, artClass, art, to, cta, className }: ResourceProps) {
  const body = (
    <>
      <div className={cn('relative aspect-video overflow-hidden', artClass)}>
        <div className="absolute inset-0 grid place-items-center">{art}</div>
        {!to && (
          <span className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 font-display text-[11px] font-bold tracking-[.1em] text-ink uppercase">
            Coming soon
          </span>
        )}
      </div>
      <div className="grid flex-1 content-start gap-2.5 p-6">
        <small className="font-display text-xs font-bold tracking-[.12em] text-coral-deep uppercase">{kind}</small>
        <h3 className="font-serif text-2xl leading-tight font-medium">{title}</h3>
        <p className="text-[15px] text-muted">{text}</p>
        {to && cta && (
          <span className="mt-2 inline-flex items-center gap-1.5 font-display text-sm font-bold text-coral-deep">
            {cta}
            <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </>
  )
  const shell = 'group flex flex-col overflow-hidden rounded-card-lg border border-line bg-paper transition-[transform,box-shadow] duration-300'
  return to ? (
    <SiteLink to={to} data-reveal className={cn(shell, 'hover:-translate-y-1 hover:shadow-lift', className)}>
      {body}
    </SiteLink>
  ) : (
    <article data-reveal className={cn(shell, className)}>
      {body}
    </article>
  )
}

const glyph = (name: IconName, color: string) => <Icon name={name} size={64} className={color} />

export default function Resources() {
  const root = useRef<HTMLDivElement>(null)
  useScrollReveal(root, '[data-reveal]')

  return (
    <div ref={root}>
      <PageHero
        eyebrow="Resources"
        lines={['Guides and checklists for']}
        accent="better event budgets."
        lede={definitionFor(PATHS.resources)}
      />

      <Section className="pt-0 md:pt-0">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <Resource
              kind="Blog"
              title="Practical guides for Australian event teams"
              text="Budgeting, cost control, supplier quotes and proposals, written in plain English."
              artClass="bg-linear-to-br from-[#20232B] to-[#3A2A44]"
              art={glyph('book', 'text-coral')}
              to={PATHS.blog}
              cta="Read the blog"
            />
            <Resource
              kind="Template"
              title="Event budget template (AUD, GST shown)"
              text="A category-by-category budget you can copy for your next event."
              artClass="bg-linear-to-br from-coral-soft to-[#F7CAD5]"
              art={glyph('budget', 'text-coral-deep')}
            />
            <Resource
              kind="Live demo"
              title="See AI event budgeting in action"
              text="Book a demo built around the kind of event you run, with time for questions."
              artClass="bg-linear-to-br from-[#E9EEF8] to-[#CFDBF2]"
              art={glyph('play', 'text-info-ink')}
              to={PATHS.demo}
              cta="Book a demo"
            />
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
