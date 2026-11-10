import { STEPS } from '@/data/content'
import { Eyebrow } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'

/** Compact five-step strip: prompt → budget → suppliers → proposals → expenses. */
export function HowItWorks({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Eyebrow>How it works</Eyebrow>
      <ol className="m-0 mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            className="relative flex items-center gap-4 rounded-2xl border border-line bg-paper p-4 lg:flex-col lg:items-start lg:gap-3 lg:p-5"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-coral font-display text-sm font-bold text-white">{i + 1}</span>
            <span className="font-display text-[15px] leading-snug font-bold">{s.title}</span>
            {i < STEPS.length - 1 && (
              <Icon name="arrow" size={16} className="absolute top-1/2 -right-[14px] z-[1] hidden -translate-y-1/2 text-coral lg:block" />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
