import { useRef, useState, type ComponentType } from 'react'
import { cn } from '@/lib/cn'
import { STEPS } from '@/data/content'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { AppFrame, AppMain } from '@/components/ui/AppFrame'
import { Eyebrow } from '@/components/ui/layout'
import { MODULE_VIEWS } from '@/components/product/ModuleViews'
import { BuiltBudgetView, PromptView } from '@/components/product/BudgetViews'

/** Which product screen illustrates each step of the flow. */
const SCREENS: { url: string; View: ComponentType }[] = [
  { url: 'events/new', View: PromptView },
  { url: 'events/sydney-conference/budget', View: BuiltBudgetView },
  { url: 'events/sydney-conference/suppliers', View: MODULE_VIEWS.vendors },
  { url: 'events/sydney-conference/proposals', View: MODULE_VIEWS.proposals },
  { url: 'events/sydney-conference/expenses', View: MODULE_VIEWS.budget },
]

/**
 * How it works: prompt → budget → suppliers → proposals → expenses. On desktop the page pins and the five steps
 * slide past horizontally as you scroll; on phones they simply stack.
 */
export function JourneyScene() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current || !track.current) return
      const mm = gsap.matchMedia()

      // Must match the `pinned:` variant in index.css. Phones, short landscape screens and
      // reduced-motion visitors get the plain stacked layout instead.
      mm.add('(min-width: 768px) and (min-height: 640px)', () => {
        const el = track.current!
        const distance = () => el.scrollWidth - window.innerWidth
        gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.round(self.progress * (STEPS.length - 1))),
          },
        })
        gsap.to('[data-journey-bar]', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="journey" className="relative overflow-hidden bg-ivory pinned:h-screen">
      {/* Fixed chapter header + progress while the track moves */}
      <div className="px-4 pt-16 md:px-8 pinned:absolute pinned:inset-x-0 pinned:top-0 pinned:z-10 pinned:pt-24">
        <div className="mx-auto flex max-w-[1200px] items-end justify-between gap-6">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 font-serif text-[clamp(30px,3.2vw,45px)] leading-none font-medium tracking-[-0.03em]">
              From a prompt to <em className="text-coral">every expense.</em>
            </h2>
          </div>
          <ol className="m-0 hidden list-none gap-2 p-0 pinned:flex" aria-label="How it works progress">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className={cn(
                  'grid size-9 place-items-center rounded-full border font-display text-xs font-bold transition-colors duration-300',
                  i <= active ? 'border-coral bg-coral text-white' : 'border-line bg-paper text-muted',
                )}
                aria-current={i === active ? 'step' : undefined}
              >
                {i + 1}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div ref={track} className="flex flex-col pinned:h-full pinned:w-[500vw] pinned:flex-row">
        {STEPS.map((s, i) => {
          const { View, url } = SCREENS[i]
          const on = i === active
          return (
            <article
              key={s.title}
              className="relative mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,1fr)] items-center gap-8 px-4 py-14 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] md:gap-14 md:px-8 pinned:mx-0 pinned:h-full pinned:w-screen pinned:max-w-none pinned:px-[max(32px,calc((100vw-1136px)/2))] pinned:pt-40 pinned:pb-20"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-2 right-3 font-serif text-[clamp(112px,20.8vw,304px)] leading-none font-medium text-coral/10 select-none md:right-10 pinned:top-24"
              >
                0{i + 1}
              </span>
              <div
                className={cn(
                  'relative grid content-center gap-5 transition-[opacity,transform] duration-500 md:max-w-[520px]',
                  on ? 'pinned:translate-y-0 pinned:opacity-100' : 'pinned:translate-y-4 pinned:opacity-30',
                )}
              >
                <Eyebrow>
                  Step {i + 1} of {STEPS.length}
                </Eyebrow>
                <h3 className="font-serif text-[clamp(30px,4vw,54px)] leading-[.98] font-medium tracking-[-0.03em]">{s.title}</h3>
                <p className="text-lg text-muted">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tools.map((t) => (
                    <span key={t} className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-3.5 py-2 text-sm font-semibold">
                      <i className="size-2 rounded-full bg-coral" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className={cn(
                  'relative transition-[opacity,transform] duration-700',
                  on ? 'pinned:translate-y-0 pinned:scale-100 pinned:opacity-100' : 'pinned:translate-y-8 pinned:scale-[.96] pinned:opacity-40',
                )}
              >
                <AppFrame url={`app.eventplanon.com/${url}`}>
                  <AppMain className="min-h-[300px] content-start">
                    <View />
                  </AppMain>
                </AppFrame>
              </div>
            </article>
          )
        })}
      </div>

      <div className="absolute inset-x-0 bottom-0 hidden h-1 bg-line pinned:block" aria-hidden="true">
        <div data-journey-bar className="h-full origin-left scale-x-0 bg-coral" />
      </div>
    </section>
  )
}
