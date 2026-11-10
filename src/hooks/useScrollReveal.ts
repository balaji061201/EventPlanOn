import type { RefObject } from 'react'
import { EASE_OUT, ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

/**
 * Below-the-fold elements matching `selector` rise into place as they scroll into view.
 * They start from a visible (25% opacity) state so content is never hidden if JS is slow.
 */
export function useScrollReveal(scope: RefObject<HTMLElement | null>, selector: string): void {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const els = gsap.utils
        .toArray<HTMLElement>(selector, scope.current ?? undefined)
        .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9)
      if (!els.length) return

      gsap.set(els, { y: 32, opacity: 0.25 })
      ScrollTrigger.batch(els, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 0.85, stagger: 0.08, ease: EASE_OUT, overwrite: true }),
      })
    },
    { scope },
  )
}
