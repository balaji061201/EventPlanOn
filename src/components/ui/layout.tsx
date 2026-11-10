import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/** 1200px centred content column with responsive gutters. */
export function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1200px] px-4 md:px-8', className)} {...rest}>
      {children}
    </div>
  )
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>
  children: ReactNode
}

/** Page band with the standard vertical rhythm. Pass padding classes to override. */
export function Section({ className, children, ref, ...rest }: SectionProps) {
  return (
    <section ref={ref} className={cn('py-16 md:py-24', className)} {...rest}>
      {children}
    </section>
  )
}

export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span className={cn('font-display text-[12.5px] font-bold uppercase tracking-[.14em] text-coral-deep', className)}>
      {children}
    </span>
  )
}

interface SectionHeadProps {
  eyebrow: string
  title: ReactNode
  lede?: string
  center?: boolean
  className?: string
}

/** Eyebrow + H2 + lede block that opens most sections. */
export function SectionHead({ eyebrow, title, lede, center, className }: SectionHeadProps) {
  return (
    <div
      data-reveal
      className={cn('mb-14 grid max-w-[760px] gap-4', center && 'mx-auto justify-items-center text-center', className)}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-serif text-[clamp(30px,4vw,54px)] leading-[1] font-medium tracking-[-0.03em]">{title}</h2>
      {lede && <p className="max-w-[60ch] text-lg text-muted">{lede}</p>}
    </div>
  )
}
