import { useRef } from 'react'
import { PATHS } from '@/config/routes'
import { BLOG_POSTS } from '@/data/blog'
import { definitionFor } from '@/data/seo'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Container, Section } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'
import { PageHero } from '@/components/site/PageHero'
import { SiteLink } from '@/components/site/SiteLink'
import { ClosingScene } from '@/components/story/ClosingScene'

export const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Blog() {
  const root = useRef<HTMLDivElement>(null)
  useScrollReveal(root, '[data-reveal]')
  const [featured, ...rest] = BLOG_POSTS

  return (
    <div ref={root}>
      <PageHero eyebrow="Blog" lines={['Practical guides for']} accent="better event budgets." lede={definitionFor(PATHS.blog)} />

      <Section className="pt-0 md:pt-0">
        <Container>
          <SiteLink
            to={`${PATHS.blog}/${featured.slug}`}
            data-reveal
            className="group grid gap-6 rounded-[28px] bg-navy p-7 text-white transition-transform duration-300 hover:-translate-y-1 md:p-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,.7fr)] lg:items-end"
          >
            <div>
              <span className="font-display text-xs font-bold tracking-[.14em] text-coral-light uppercase">Latest · {featured.category}</span>
              <h2 className="mt-4 font-serif text-[clamp(26px,3.6vw,48px)] leading-[1.08] font-medium tracking-[-0.03em]">{featured.title}</h2>
              <p className="mt-4 max-w-[56ch] text-lg text-navy-text">{featured.excerpt}</p>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm text-navy-text lg:flex-col lg:items-end lg:gap-6">
              <span>
                {formatDate(featured.date)} · {featured.readMinutes} min read
              </span>
              <span className="inline-flex items-center gap-2 font-display font-bold text-white">
                Read the guide <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </SiteLink>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <SiteLink
                key={p.slug}
                to={`${PATHS.blog}/${p.slug}`}
                data-reveal
                className="group flex flex-col rounded-card-lg border border-line bg-paper p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-coral hover:shadow-lift"
              >
                <span className="font-display text-xs font-bold tracking-[.12em] text-coral-deep uppercase">{p.category}</span>
                <h2 className="mt-3 font-serif text-[21px] leading-snug font-medium tracking-[-0.015em]">{p.title}</h2>
                <p className="mt-3 flex-1 text-[15px] text-muted">{p.excerpt}</p>
                <span className="mt-5 flex items-center justify-between border-t border-line pt-4 text-[13px] text-muted">
                  {formatDate(p.date)} · {p.readMinutes} min read
                  <Icon name="arrow" size={14} className="text-coral transition-transform group-hover:translate-x-1" />
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
