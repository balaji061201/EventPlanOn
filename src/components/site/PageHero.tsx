import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Container, Eyebrow } from '@/components/ui/layout'

/** One headline line, masked so its text can slide up into view (animated via `[data-w]`). */
export function MaskedLine({ children, accent, className }: { children: ReactNode; accent?: boolean; className?: string }) {
  return (
    <span className={cn('block overflow-hidden pb-[.2em] -mb-[.2em]', className)}>
      <span data-w className={cn('inline-block', accent && 'text-coral italic')}>
        {children}
      </span>
    </span>
  )
}

interface PageHeroProps {
  eyebrow: string
  lines: string[]
  /** Final line, set in coral italic. */
  accent?: string
  lede?: string
  tone?: 'light' | 'dark'
  children?: ReactNode
  className?: string
}

/** Opening band of every inner page: big serif headline that rises line by line. */
export function PageHero({ eyebrow, lines, accent, lede, tone = 'light', children, className }: PageHeroProps) {
  const root = useRef<HTMLElement>(null)
  const dark = tone === 'dark'

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap
        .timeline({ delay: 0.15, defaults: { ease: 'power4.out' } })
        .from('[data-in="eyebrow"]', { y: 14, opacity: 0, duration: 0.6 })
        .from('[data-w]', { yPercent: 115, duration: 1.1, stagger: 0.1 }, '-=0.3')
        .from('[data-in="rest"]', { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.6')
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      data-tone={dark ? 'dark' : undefined}
      className={cn(
        'relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24',
        dark ? 'bg-navy text-white' : 'bg-ivory text-ink',
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <i className="absolute -top-40 -right-40 size-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(233,90,120,.18),transparent)]" />
        <i className={cn('absolute bottom-0 -left-40 size-[520px] rounded-full', dark ? 'bg-[radial-gradient(closest-side,rgba(59,111,216,.2),transparent)]' : 'bg-[radial-gradient(closest-side,rgba(59,111,216,.07),transparent)]')} />
      </div>
      <Container className="relative">
        <div data-in="eyebrow">
          <Eyebrow className={dark ? 'text-coral-light' : undefined}>{eyebrow}</Eyebrow>
        </div>
        <h1 className="mt-5 font-serif text-[clamp(37px,6.4vw,96px)] leading-[1.04] font-medium tracking-[-0.03em]">
          {lines.map((l) => (
            <MaskedLine key={l}>{l}</MaskedLine>
          ))}
          {accent && <MaskedLine accent>{accent}</MaskedLine>}
        </h1>
        {lede && (
          <p data-in="rest" className={cn('mt-8 max-w-[56ch] text-lg md:text-xl', dark ? 'text-navy-text' : 'text-muted')}>
            {lede}
          </p>
        )}
        {children && <div data-in="rest">{children}</div>}
      </Container>
    </section>
  )
}
