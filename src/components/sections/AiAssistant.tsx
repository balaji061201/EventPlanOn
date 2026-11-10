import { useEffect, useRef, useState } from 'react'
import { AI_CAPABILITIES } from '@/data/content'
import { handleTabKeys } from '@/hooks/useTabKeys'
import { EASE_OUT, ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { Container, Eyebrow, Section } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'

const footButton =
  'rounded-full border border-navy-line px-3 py-[7px] text-[12.5px] font-semibold text-[#D7DCE8] first:border-coral first:bg-coral first:text-white'

export function AiAssistant({ act = 'AI event budgeting', compact }: { act?: string; compact?: boolean }) {
  const [active, setActive] = useState(0)
  const root = useRef<HTMLElement>(null)
  const promptRef = useRef<HTMLSpanElement>(null)
  const replyRef = useRef<HTMLDivElement>(null)
  const inView = useRef(false)
  const activeRef = useRef(0)
  const timeline = useRef<gsap.core.Timeline | null>(null)

  const capability = AI_CAPABILITIES[active]

  /** Types the prompt, then reveals each suggestion. */
  const play = (index: number) => {
    const prompt = promptRef.current
    const sugs = replyRef.current?.querySelectorAll<HTMLElement>('[data-sug]')
    if (!prompt || !sugs) return
    const full = AI_CAPABILITIES[index].prompt
    timeline.current?.kill()
    if (prefersReducedMotion()) {
      prompt.textContent = full
      return
    }
    const state = { n: 0 }
    prompt.textContent = ''
    gsap.set(sugs, { opacity: 0, y: 10 })
    timeline.current = gsap
      .timeline()
      .to(state, {
        n: full.length,
        duration: Math.min(1.1, full.length * 0.02),
        ease: 'none',
        onUpdate: () => {
          prompt.textContent = full.slice(0, Math.round(state.n))
        },
      })
      .to(sugs, { opacity: 1, y: 0, duration: 0.45, stagger: 0.14, ease: EASE_OUT }, '+=.12')
  }

  /* Show the full prompt immediately; once the console scrolls into view, animate it */
  useEffect(() => {
    activeRef.current = active
    if (promptRef.current) promptRef.current.textContent = AI_CAPABILITIES[active].prompt
    if (inView.current) play(active)
    return () => {
      timeline.current?.kill()
    }
  }, [active])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      ScrollTrigger.create({
        trigger: '[data-console]',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          inView.current = true
          play(activeRef.current)
        },
      })
      gsap.to('[data-ai-glow]', { x: 120, y: -60, duration: 14, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    },
    { scope: root },
  )

  return (
    <Section ref={root} id="ai" data-tone="dark" className="relative overflow-hidden bg-navy text-white">
      <div
        data-ai-glow
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[380px] -left-[260px] size-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(59,111,216,.2),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[380px] -right-[300px] size-[900px] bg-[radial-gradient(closest-side,rgba(233,90,120,.22),transparent)]"
      />

      <Container className="relative grid grid-cols-1 items-center gap-10 min-[940px]:grid-cols-2 min-[940px]:gap-14">
        <div>
          <Eyebrow className="text-coral-light">{act}</Eyebrow>
          {!compact && (
            <>
              <h2 className="mt-3.5 font-serif text-[clamp(30px,4vw,54px)] leading-[1] font-medium tracking-[-0.03em]">
                Describe it. <em className="text-coral-light">Get your budget.</em>
              </h2>
              <p className="mt-4 max-w-[60ch] text-lg text-navy-text">
                Type a prompt and get an instant category-by-category budget, then let the AI flag overspend, compare
                supplier quotes and draft proposals. You approve every number.
              </p>
            </>
          )}

          <div
            role="tablist"
            aria-label="AI budgeting capabilities"
            onKeyDown={(e) => handleTabKeys(e, '[role="tab"]')}
            className={compact ? 'mt-6 grid gap-1' : 'mt-9 grid gap-1'}
          >
            {AI_CAPABILITIES.map((c, i) => (
              <button
                key={c.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className="grid w-full grid-cols-[40px_minmax(0,1fr)] gap-4 rounded-2xl p-[18px] text-left transition-colors duration-200 hover:bg-navy-2 aria-selected:bg-navy-2"
              >
                <span className="grid size-10 place-items-center rounded-[11px] bg-coral/15 text-coral-light">
                  <Icon name={c.icon} size={19} />
                </span>
                <span>
                  <strong className="block font-display text-[17px]">{c.title}</strong>
                  <span className="mt-0.5 block text-[14.5px] text-navy-text">{c.description}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          data-console
          className="grid min-w-0 gap-3.5 rounded-card-lg border border-navy-line bg-navy-2 p-[22px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]"
        >
          <div className="flex items-center gap-2.5 text-[13px] text-navy-text">
            <span className="grid size-7 place-items-center rounded-lg bg-linear-to-br from-coral to-[#F59A6B] text-white">
              <Icon name="spark" size={15} />
            </span>
            Event Plan On AI · Sydney Conference 2027
          </div>
          <div className="rounded-xl border border-navy-line bg-[#0F1422] p-3.5 text-sm text-[#E6E9F2]">
            <small className="mb-1 block text-[11.5px] font-semibold tracking-widest text-[#7D88A6] uppercase">You asked</small>
            <span ref={promptRef} />
          </div>
          <div ref={replyRef} key={active} className="grid gap-2">
            {capability.replies.map((r) => (
              <div
                key={r.label}
                data-sug
                className="flex items-start gap-2.5 rounded-xl border border-navy-line bg-[#0F1422] px-3.5 py-3 text-[13.5px] text-[#D7DCE8]"
              >
                <span className="mt-px shrink-0 rounded-md bg-coral/15 px-[7px] py-[3px] font-display text-[11px] font-bold text-coral-light">
                  {r.label}
                </span>
                <span>
                  {r.parts.map((p, i) => (p.bold ? <b key={i} className="text-white">{p.text}</b> : <span key={i}>{p.text}</span>))}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={footButton}>Apply suggestions</button>
            <button type="button" className={footButton}>Edit</button>
            <button type="button" className={footButton}>Dismiss</button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
