import { useRef, useState, type CSSProperties } from 'react'
import { cn } from '@/lib/cn'
import { HUB_NODES } from '@/data/content'
import { EASE_OUT, ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import type { HubKey } from '@/types'
import { Container, Section, SectionHead } from '@/components/ui/layout'
import { MegaIcon } from '@/components/ui/atoms'

/** The hub canvas is 1000×460 in SVG space; node positions are percentages of it. */
const CANVAS_W = 1000
const CANVAS_H = 460
const CENTER = { x: 500, y: 230 }

const pathFor = (x: number, y: number): string => {
  const px = (x / 100) * CANVAS_W
  const py = (y / 100) * CANVAS_H
  const left = px < CENTER.x
  return `M${CENTER.x} ${CENTER.y} C ${left ? 330 : 670} ${CENTER.y} ${left ? 300 : 700} ${py} ${px} ${py}`
}

type Values = Record<HubKey, string>

const initialValues = (): Values =>
  Object.fromEntries(HUB_NODES.map((n) => [n.key, n.initial])) as Values

interface Step {
  from: HubKey
  to: HubKey[]
  msg: string
  /** Runs when the source node lights up. */
  pre?: () => void
  /** New label for each destination node once the data arrives. */
  vals: Partial<Record<HubKey, string | (() => string)>>
}

export function ConnectedHub({ className, act = 'Always in sync' }: { className?: string; act?: string }) {
  const root = useRef<HTMLElement>(null)
  const [values, setValues] = useState<Values>(initialValues)
  const [lit, setLit] = useState<HubKey[]>([])
  const [message, setMessage] = useState('Budget, suppliers and expenses in sync')

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return
      const q = <T extends Element>(sel: string) => root.current!.querySelector<T>(sel)!

      const setLitKey = (k: HubKey, on: boolean) =>
        setLit((cur) => (on ? (cur.includes(k) ? cur : [...cur, k]) : cur.filter((x) => x !== k)))
      const setVal = (k: HubKey, v: string | (() => string)) =>
        setValues((cur) => ({ ...cur, [k]: typeof v === 'function' ? v() : v }))

      const path = (k: HubKey) => q<SVGPathElement>(`[data-hub-path="${k}"]`)
      const hl = (k: HubKey) => q<SVGPathElement>(`[data-hub-hl="${k}"]`)
      const pulse = (k: HubKey) => q<SVGCircleElement>(`[data-hub-pulse="${k}"]`)
      const card = (k: HubKey) => q<HTMLElement>(`[data-hub-node="${k}"] [data-hub-card]`)
      const ring = q<HTMLElement>('[data-hub-ring]')
      const msgEl = q<HTMLElement>('[data-hub-msg]')

      const STEPS: Step[] = [
        {
          from: 'guests',
          to: ['budget'],
          msg: 'Headcount +20 · catering line updated',
          pre: () => setVal('guests', '220 guests'),
          vals: { budget: '$52,400 forecast' },
        },
        {
          from: 'suppliers',
          to: ['expenses', 'tasks'],
          msg: 'Catering quote accepted · $17,000 allocated',
          vals: { expenses: '$48,200 committed', tasks: 'Deposit due 14 Mar' },
        },
        {
          from: 'proposals',
          to: ['approvals'],
          msg: 'Proposal sent · approval requested',
          vals: { approvals: '3 pending' },
        },
        {
          from: 'expenses',
          to: ['budget', 'reports'],
          msg: 'Overspend alert · AV is $1,200 over',
          vals: { budget: '$1,200 over on AV', reports: 'Report updated' },
        },
      ]

      const stepTl = (s: Step) => {
        const t = gsap.timeline()
        t.call(() => {
          setLitKey(s.from, true)
          s.pre?.()
        })
          .fromTo(card(s.from), { scale: 1 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'power1.out' })
          .fromTo(hl(s.from), { strokeDashoffset: -1, opacity: 1 }, { strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut' }, '<')
          .set(pulse(s.from), { opacity: 1, immediateRender: false }, '<')
          .to(pulse(s.from), { motionPath: { path: path(s.from), start: 1, end: 0 }, duration: 0.85, ease: 'power2.inOut' }, '<')
          .set(pulse(s.from), { opacity: 0 })
          .call(() => setMessage(s.msg))
          .fromTo(ring, { scale: 0.97, opacity: 0.9 }, { scale: 1.12, opacity: 0, duration: 0.8, ease: 'power2.out' })
          .fromTo(msgEl, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, '<')
          .addLabel('out', '<.2')

        s.to.forEach((k) => {
          t.fromTo(hl(k), { strokeDashoffset: 1, opacity: 1 }, { strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut' }, 'out')
            .set(pulse(k), { opacity: 1, immediateRender: false }, 'out')
            .to(pulse(k), { motionPath: { path: path(k), start: 0, end: 1 }, duration: 0.85, ease: 'power2.inOut' }, 'out')
            .set(pulse(k), { opacity: 0 }, 'out+=.85')
            .call(
              () => {
                setLitKey(k, true)
                const v = s.vals[k]
                if (v) setVal(k, v)
              },
              undefined,
              'out+=.85',
            )
            .fromTo(card(k), { scale: 1 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'power1.out' }, 'out+=.85')
        })

        const keys = [s.from, ...s.to]
        t.to(keys.map(hl), { opacity: 0, duration: 0.5 }, '+=1.2').call(() => keys.forEach((k) => setLitKey(k, false)), undefined, '<')
        return t
      }

      const loop = gsap.timeline({ repeat: -1, paused: true })
      STEPS.forEach((s) => loop.add(stepTl(s)))
      const dashFlow = gsap.to('[data-hub-path]', { strokeDashoffset: -200, duration: 14, repeat: -1, ease: 'none', paused: true })

      gsap.from('[data-hub-card], [data-hub-core]', {
        y: 20,
        opacity: 0.25,
        duration: 0.8,
        stagger: 0.05,
        ease: EASE_OUT,
        scrollTrigger: { trigger: '[data-hub-wrap]', start: 'top 85%', once: true },
      })

      ScrollTrigger.create({
        trigger: '[data-hub-wrap]',
        start: 'top 85%',
        end: 'bottom 10%',
        onToggle: (self) => {
          if (self.isActive) {
            loop.play()
            dashFlow.play()
          } else {
            loop.pause()
            dashFlow.pause()
          }
        },
      })
    },
    { scope: root },
  )

  return (
    <Section ref={root} id="connected" className={cn('pt-0 md:pt-0', className)}>
      <Container>
        <SectionHead
          center
          eyebrow={act}
          title="Change one number. Everything updates."
          lede="A guest-count change updates your catering budget, forecast and reports at once. An accepted quote updates your spend. Your team never re-types a number."
        />

        <div
          data-hub-wrap
          className="grid grid-cols-2 gap-2.5 min-[900px]:relative min-[900px]:block min-[900px]:aspect-[1000/460]"
        >
          <svg
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-0 hidden size-full overflow-visible min-[900px]:block"
          >
            {HUB_NODES.map((n) => (
              <path key={`p-${n.key}`} data-hub-path={n.key} d={pathFor(n.x, n.y)} className="fill-none stroke-[#D8D0C4] stroke-[1.5] [stroke-dasharray:3_7]" />
            ))}
            {HUB_NODES.map((n) => (
              <path
                key={`h-${n.key}`}
                data-hub-hl={n.key}
                d={pathFor(n.x, n.y)}
                pathLength={1}
                className="fill-none stroke-coral stroke-[2.5] [stroke-dasharray:1_1] [stroke-dashoffset:1] [stroke-linecap:round]"
              />
            ))}
            {HUB_NODES.map((n) => (
              <circle
                key={`c-${n.key}`}
                data-hub-pulse={n.key}
                r="5"
                cx="0"
                cy="0"
                className="fill-coral opacity-0 [filter:drop-shadow(0_0_6px_rgba(233,90,120,.85))]"
              />
            ))}
          </svg>

          <div className="z-[1] order-first col-span-2 mb-2 grid justify-items-center min-[900px]:absolute min-[900px]:top-1/2 min-[900px]:left-1/2 min-[900px]:mb-0 min-[900px]:-translate-x-1/2 min-[900px]:-translate-y-1/2">
            <div
              data-hub-core
              className="relative grid w-full max-w-[340px] justify-items-center gap-2 rounded-[20px] bg-navy p-5 text-center text-white shadow-[0_30px_60px_-24px_rgba(20,26,42,.6)] min-[900px]:w-[250px]"
            >
              <span data-hub-ring aria-hidden="true" className="pointer-events-none absolute -inset-3 rounded-[28px] border-2 border-coral opacity-0" />
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[.12em] text-navy-text uppercase">
                <i className="size-[7px] rounded-full bg-[#3FD39A] shadow-[0_0_0_3px_rgba(63,211,154,.2)]" />
                Live sync
              </span>
              <strong className="font-display text-base">Sydney Conference 2027</strong>
              <span data-hub-msg aria-live="off" className="block min-h-[2.6em] text-[13px] leading-[1.3] text-rose">
                {message}
              </span>
            </div>
          </div>

          {HUB_NODES.map((n) => {
            const on = lit.includes(n.key)
            const pos = { '--x': `${n.x}%`, '--y': `${n.y}%` } as CSSProperties
            return (
              <div
                key={n.key}
                data-hub-node={n.key}
                style={pos}
                className="z-[1] min-[900px]:absolute min-[900px]:top-[var(--y)] min-[900px]:left-[var(--x)] min-[900px]:-translate-x-1/2 min-[900px]:-translate-y-1/2"
              >
                <div
                  data-hub-card
                  className={cn(
                    'flex items-center gap-2 rounded-card border bg-paper p-[9px] shadow-soft transition-[border-color,box-shadow] duration-300 min-[420px]:gap-2.5 min-[420px]:px-3 min-[420px]:py-2.5 min-[900px]:w-[190px]',
                    on ? 'border-coral shadow-[0_0_0_4px_var(--color-coral-soft),var(--shadow-soft)]' : 'border-line',
                  )}
                >
                  <MegaIcon
                    name={n.icon}
                    className={cn('transition-colors duration-300', on && 'bg-coral text-white')}
                  />
                  <span className="min-w-0">
                    <strong className="block font-display text-[13px] leading-tight min-[420px]:text-sm">{n.label}</strong>
                    <small className="block text-xs text-muted tabular-nums min-[900px]:whitespace-nowrap">{values[n.key]}</small>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
