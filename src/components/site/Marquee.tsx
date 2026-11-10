import { useRef } from 'react'
import { cn } from '@/lib/cn'
import { ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

interface MarqueeProps {
  words: string[]
  reverse?: boolean
  className?: string
}

/** Endless ticker whose speed (and direction) responds to how fast the page is scrolled. */
export function Marquee({ words, reverse, className }: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !track.current) return
      const tween = gsap.fromTo(
        track.current,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration: 45, ease: 'none', repeat: -1 },
      )
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          // Speed up with scroll velocity, then ease back to the resting pace.
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 5)
          gsap.killTweensOf(tween)
          tween.timeScale(boost)
          gsap.to(tween, { timeScale: 1, duration: 0.9, delay: 0.1, ease: 'power2.out' })
        },
      })
    },
    { scope: root },
  )

  const items = [...words, ...words]
  return (
    <div ref={root} className={cn('overflow-hidden whitespace-nowrap', className)} aria-hidden="true">
      <div ref={track} className="flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((w, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span
                  className={cn(
                    'px-6 font-serif text-[clamp(44px,7vw,104px)] leading-[1.05] font-medium tracking-[-0.03em] md:px-10',
                    i % 2 ? 'text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]' : 'text-ink',
                  )}
                >
                  {w}
                </span>
                <i className="size-3 shrink-0 rounded-full bg-coral md:size-5" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
