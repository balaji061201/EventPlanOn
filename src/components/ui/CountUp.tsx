import { useRef } from 'react'
import { ScrollTrigger, formatNumber, gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

interface CountUpProps {
  value: number
  decimals?: number
  /** Seconds to wait before counting (used to sync with the hero intro). */
  delay?: number
  /** Count only once the element scrolls into view instead of immediately. */
  onScroll?: boolean
  className?: string
}

/** Number that counts up from 0. Renders the final value when motion is reduced. */
export function CountUp({ value, decimals = 0, delay = 0, onScroll, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return
      const state = { v: 0 }
      el.textContent = formatNumber(0, decimals)
      const tween = gsap.to(state, {
        v: value,
        duration: 1.4,
        delay,
        ease: 'power2.out',
        paused: !!onScroll,
        onUpdate: () => {
          el.textContent = formatNumber(state.v, decimals)
        },
      })
      if (onScroll) ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => tween.play() })
    },
    { scope: ref, dependencies: [value, decimals, delay, onScroll] },
  )

  return (
    <span ref={ref} className={className}>
      {formatNumber(value, decimals)}
    </span>
  )
}
