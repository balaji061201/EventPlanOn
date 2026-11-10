import { useRef, type CSSProperties } from 'react'
import { cn } from '@/lib/cn'
import { PATHS } from '@/config/routes'
import { SOLUTIONS } from '@/data/content'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import type { SolutionId } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { MegaIcon } from '@/components/ui/atoms'
import { SiteLink } from '@/components/site/SiteLink'

/** Card palettes (full literals so Tailwind can see every class). */
const PALETTE: Record<SolutionId, { card: string; sub: string; chip: string }> = {
  corporate: { card: 'bg-coral text-white', sub: 'text-white/80', chip: 'bg-white/15 text-white' },
  planners: { card: 'bg-navy text-white', sub: 'text-navy-text', chip: 'bg-white/10 text-white' },
  agencies: { card: 'bg-sand text-ink', sub: 'text-muted', chip: 'bg-paper text-ink' },
  conferences: { card: 'bg-ink text-white', sub: 'text-navy-text', chip: 'bg-white/10 text-white' },
  exhibitions: { card: 'bg-coral-soft text-ink', sub: 'text-muted', chip: 'bg-paper text-ink' },
}

/** Cards that stack on top of each other as you scroll; each links to its solution page. */
export function SolutionStack() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return
      const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]')
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        // As the next card slides over this one, this one recedes.
        gsap.to(card, {
          scale: 0.94,
          filter: 'brightness(0.78)',
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 25%', scrub: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="grid gap-6">
      {SOLUTIONS.map((s, i) => {
        const p = PALETTE[s.id]
        return (
          <article
            key={s.id}
            data-stack-card
            style={{ '--i': i } as CSSProperties}
            className={cn(
              'sticky top-[calc(88px+var(--i)*16px)] grid min-h-[62vh] origin-top gap-8 overflow-hidden rounded-[28px] p-7 md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] md:p-12',
              p.card,
            )}
          >
            <div className="flex flex-col">
              <span className={cn('font-display text-sm font-bold tracking-[.14em] uppercase', p.sub)}>
                0{i + 1} · {s.title}
              </span>
              <h3 className="mt-5 font-serif text-[clamp(26px,3.4vw,46px)] leading-[1.05] font-medium tracking-[-0.03em]">{s.headline}</h3>
              <p className={cn('mt-5 max-w-[48ch] text-base md:text-lg', p.sub)}>{s.text}</p>
              <SiteLink
                to={`${PATHS.solutions}/${s.id}`}
                className="group mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 pt-3 font-display text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
              >
                Explore {s.title}
                <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-1" />
              </SiteLink>
            </div>
            <div className="grid content-center gap-3">
              <div className="mb-2 hidden justify-end md:flex">
                <MegaIcon name={s.icon} size={96} iconSize={44} rounded="rounded-[28px]" className="bg-white/90 text-coral-deep" />
              </div>
              {s.points.map((pt) => (
                <div key={pt} className={cn('flex items-center gap-3 rounded-2xl px-5 py-4 text-[15px] font-medium', p.chip)}>
                  <Icon name="check" size={18} className="shrink-0" />
                  {pt}
                </div>
              ))}
            </div>
          </article>
        )
      })}
    </div>
  )
}
