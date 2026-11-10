import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { ScrollTrigger, gsap, prefersReducedMotion } from '@/lib/gsap'
import { scrollToElement, scrollToTopNow } from '@/lib/smooth'
import logo from '@/assets/logo.png'

interface TransitionValue {
  /** Navigate to an internal path with the curtain wipe. */
  go: (to: string) => void
}

const TransitionContext = createContext<TransitionValue | null>(null)

/** Owns the full-screen curtain that wipes between pages and resets scroll/triggers on every route change. */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { pathname, hash } = useLocation()
  const curtain = useRef<HTMLDivElement>(null)
  const busy = useRef(false)
  const current = useRef(pathname)

  /* New page: start at the top and let ScrollTrigger re-measure once it has mounted. */
  useEffect(() => {
    current.current = pathname
    scrollToTopNow()
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    // Arriving on /page#section: scroll to the section once the page has mounted and measured.
    const jump = hash
      ? window.setTimeout(() => {
          const el = document.getElementById(hash.slice(1))
          if (el) scrollToElement(el)
        }, 900)
      : undefined
    return () => {
      window.clearTimeout(id)
      window.clearTimeout(jump)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const go = useCallback(
    (to: string) => {
      const target = to.split('#')[0] || current.current
      if (busy.current) return
      if (target === current.current) {
        const id = to.split('#')[1]
        const el = id ? document.getElementById(id) : null
        if (el) scrollToElement(el)
        else scrollToTopNow()
        return
      }
      if (prefersReducedMotion() || !curtain.current) {
        navigate(to)
        return
      }
      busy.current = true
      const el = curtain.current
      gsap
        .timeline({ onComplete: () => { busy.current = false } })
        .set(el, { display: 'grid', yPercent: 100 })
        .set('[data-curtain-logo]', { opacity: 0, y: 20 })
        .to(el, { yPercent: 0, duration: 0.65, ease: 'power4.inOut' })
        .to('[data-curtain-logo]', { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.25')
        .add(() => navigate(to))
        .to({}, { duration: 0.45 })
        .to(el, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' })
        .set(el, { display: 'none' })
    },
    [navigate],
  )

  const value = useMemo(() => ({ go }), [go])

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        ref={curtain}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[300] hidden place-items-center bg-navy"
      >
        <img data-curtain-logo src={logo} alt="" className="h-9 w-auto md:h-12" />
      </div>
    </TransitionContext.Provider>
  )
}

export function useTransition(): TransitionValue {
  const ctx = useContext(TransitionContext)
  if (!ctx) throw new Error('useTransition must be used inside <TransitionProvider>')
  return ctx
}
