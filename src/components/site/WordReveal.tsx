import { useRef } from 'react'
import { cn } from '@/lib/cn'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

interface WordRevealProps {
  text: string
  className?: string
  /** Opacity the words start from before they are "read". */
  from?: number
}

/** Text that lights up word by word as the reader scrolls through it. */
export function WordReveal({ text, className, from = 0.14 }: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return
      gsap.fromTo(
        ref.current.querySelectorAll('[data-word]'),
        { opacity: from },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 50%', scrub: true },
        },
      )
    },
    { scope: ref },
  )

  return (
    <p ref={ref} className={cn(className)}>
      {text.split(' ').map((w, i) => (
        <span key={i} data-word className="inline-block">
          {w}&nbsp;
        </span>
      ))}
    </p>
  )
}
