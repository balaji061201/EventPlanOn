import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { cn } from '@/lib/cn'
import { PATHS } from '@/config/routes'
import { MODULES, SOLUTIONS, USE_CASES } from '@/data/content'
import { BUSINESS, TRIAL_CTA } from '@/config/business'
import { ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { lockScroll } from '@/lib/smooth'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'
import { MegaIcon } from '@/components/ui/atoms'
import type { IconName } from '@/types'
import logo from '@/assets/logo.png'
import { SiteLink } from './SiteLink'
import { ContactList, EmailLink, PhoneLink } from './ContactDetails'

interface DropItem {
  to: string
  label: string
  icon: IconName
  text: string
}

interface NavItem {
  label: string
  to: string
  items?: DropItem[]
  cols?: string
}

const NAV: NavItem[] = [
  {
    label: 'Platform',
    to: PATHS.platform,
    cols: 'w-[600px] grid-cols-2',
    items: MODULES.map((m) => ({ to: `${PATHS.platform}/${m.id}`, label: m.label, icon: m.icon, text: m.title })),
  },
  {
    label: 'Solutions',
    to: PATHS.solutions,
    cols: 'w-[440px] grid-cols-1',
    items: SOLUTIONS.map((x) => ({ to: `${PATHS.solutions}/${x.id}`, label: x.title, icon: x.icon, text: x.headline })),
  },
  { label: 'AI', to: PATHS.ai },
  {
    label: 'Use cases',
    to: PATHS.useCases,
    cols: 'w-[440px] grid-cols-1',
    items: USE_CASES.map((u) => ({ to: `${PATHS.useCases}#${u.id}`, label: u.label, icon: u.icon, text: u.headline })),
  },
  { label: 'Blog', to: PATHS.blog },
  { label: 'About', to: PATHS.about },
]

export function Logo({ className }: { className?: string }) {
  return (
    <SiteLink to={PATHS.home} aria-label="Event Plan On home" className={cn('block shrink-0', className)}>
      <img src={logo} alt="Event Plan On logo" width={1600} height={306} className="h-6 w-auto min-[375px]:h-7 sm:h-8" />
    </SiteLink>
  )
}

export function Header() {
  const { pathname } = useLocation()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  /** True while a dark section sits behind the header, so it switches to light text. */
  const [dark, setDark] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const busy = useRef(false)

  useEffect(() => {
    busy.current = openMenu !== null || mobileOpen
  }, [openMenu, mobileOpen])

  /* Close menus whenever the page changes */
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    lockScroll(mobileOpen)
    return () => lockScroll(false)
  }, [mobileOpen])

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      setScrolled(window.scrollY > 12)
      const header = headerRef.current
      if (!header) return
      const under = document.elementsFromPoint(window.innerWidth / 2, 36).find((el) => !header.contains(el))
      setDark(!!under?.closest('[data-tone="dark"]'))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  /* Re-check what is behind the header after each page change (once the new page has mounted) */
  useEffect(() => {
    const check = () => {
      const header = headerRef.current
      if (!header) return
      const under = document.elementsFromPoint(window.innerWidth / 2, 36).find((el) => !header.contains(el))
      setDark(!!under?.closest('[data-tone="dark"]'))
    }
    const ids = [150, 700, 1500].map((ms) => window.setTimeout(check, ms))
    return () => ids.forEach((id) => window.clearTimeout(id))
  }, [pathname])

  /* Header tucks away on scroll down, returns on scroll up */
  useGSAP(
    () => {
      if (prefersReducedMotion() || !headerRef.current) return
      const el = headerRef.current
      let hidden = false
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const hide = self.direction === 1 && self.scroll() > 600 && !busy.current
          if (hide === hidden) return
          hidden = hide
          gsap.to(el, { yPercent: hide ? -100 : 0, duration: 0.45, ease: 'power3.out', overwrite: true })
        },
      })
    },
    { scope: headerRef },
  )

  const enter = (label: string) => {
    window.clearTimeout(closeTimer.current)
    setOpenMenu(label)
  }
  const leave = (label: string) => {
    closeTimer.current = window.setTimeout(() => setOpenMenu((cur) => (cur === label ? null : cur)), 140)
  }

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`)

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed inset-x-0 top-0 border-b transition-[background,border-color] duration-300',
          mobileOpen ? 'z-[120]' : 'z-[100]',
          !scrolled && 'border-transparent bg-transparent',
          scrolled && !dark && 'border-line bg-ivory/85 backdrop-blur-[14px]',
          scrolled && dark && 'border-navy-line bg-navy/80 backdrop-blur-[14px]',
          // While the full-screen menu is open the header floats transparently above it.
          mobileOpen && 'border-transparent bg-transparent backdrop-blur-none',
        )}
      >
        {/* Contact strip: phone and email stay one tap away on every page. */}
        <div className="border-b border-navy-line bg-navy text-[12.5px] text-navy-text">
          <Container className="flex h-9 items-center justify-between gap-4">
            <span className="hidden items-center gap-1.5 sm:flex">
              <Icon name="clock" size={13} /> Australian support · {BUSINESS.hours}
            </span>
            <span className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end sm:gap-6">
              <span className="flex min-w-0 items-center gap-1.5">
                <Icon name="phone" size={13} className="shrink-0" />
                <PhoneLink className="truncate font-semibold text-white hover:text-coral-light" />
              </span>
              <span className="flex min-w-0 items-center gap-1.5">
                <Icon name="mail" size={13} className="shrink-0" />
                <EmailLink className="truncate font-semibold text-white hover:text-coral-light" />
              </span>
            </span>
          </Container>
        </div>
        <Container className="flex h-[72px] items-center gap-3 sm:gap-6">
          <Logo />

          <nav aria-label="Primary" className="ml-6 hidden nav:block">
            <ul className="m-0 flex list-none items-center gap-1 p-0">
              {NAV.map((item) => {
                const open = openMenu === item.label
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.items && enter(item.label)}
                    onMouseLeave={() => item.items && leave(item.label)}
                    onFocus={() => item.items && enter(item.label)}
                    onBlur={(e) => {
                      if (item.items && !e.currentTarget.contains(e.relatedTarget as Node)) leave(item.label)
                    }}
                  >
                    <SiteLink
                      to={item.to}
                      aria-haspopup={item.items ? 'true' : undefined}
                      aria-expanded={item.items ? open : undefined}
                      className={cn(
                        'group relative flex h-10 items-center gap-1.5 rounded-full px-3.5 text-[15px] font-medium transition-colors',
                        dark ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-sand',
                        isActive(item.to) && (dark ? 'text-coral-light' : 'text-coral-deep'),
                      )}
                    >
                      {item.label}
                      {item.items && <Icon name="chev" size={10} className={cn('transition-transform', open && 'rotate-180')} />}
                    </SiteLink>

                    {item.items && (
                      <div
                        className={cn(
                          'absolute top-[calc(100%+8px)] left-0 grid gap-1 rounded-card-lg border border-line bg-paper p-3 shadow-lift transition-[opacity,transform,visibility] duration-200',
                          item.cols,
                          open ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1.5 opacity-0',
                        )}
                      >
                        {item.items.map((d) => (
                          <SiteLink
                            key={d.to}
                            to={d.to}
                            className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-ivory"
                          >
                            <MegaIcon name={d.icon} size={34} />
                            <span className="min-w-0">
                              <strong className="block font-display text-sm font-bold">{d.label}</strong>
                              <span className="block truncate text-[12.5px] text-muted">{d.text}</span>
                            </span>
                          </SiteLink>
                        ))}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2.5">
            <Button route="login" variant="ghost" size="sm" className="hidden sm:inline-flex">
              Log in
            </Button>
            <Button to={PATHS.demo} variant={dark ? 'line' : 'dark'} size="sm" className="hidden md:inline-flex">
              Book a demo
            </Button>
            {/* Phones: compact pill. Under 340px there's no room, and the CTA is the first button in the menu. */}
            <Button
              route="signup"
              size="sm"
              className="max-sm:h-9 max-sm:px-3.5 max-sm:text-[13px] max-[374px]:px-3 max-[374px]:text-[12.5px] max-[339px]:hidden"
            >
              Start free trial
            </Button>
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((o) => !o)}
              className={cn(
                'relative z-[110] grid size-11 place-items-center rounded-full nav:hidden',
                dark || mobileOpen ? 'text-white hover:bg-white/10' : 'hover:bg-sand',
              )}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={cn(
          'fixed inset-0 z-[105] overflow-y-auto bg-navy px-6 pt-36 pb-10 text-white transition-[clip-path,visibility] duration-700 ease-[cubic-bezier(.76,0,.24,1)] nav:hidden',
          mobileOpen
            ? 'visible [clip-path:circle(150%_at_calc(100%-44px)_72px)]'
            : 'invisible [clip-path:circle(0%_at_calc(100%-44px)_72px)]',
        )}
      >
        <ul className="m-0 grid list-none gap-1 p-0">
          {[{ label: 'Home', to: PATHS.home }, ...NAV, { label: 'Contact', to: PATHS.contact }].map((item, i) => (
            <li key={item.label}>
              <SiteLink
                to={item.to}
                style={{ transitionDelay: mobileOpen ? `${250 + i * 60}ms` : '0ms' }}
                className={cn(
                  'flex items-baseline gap-4 border-b border-navy-line py-4 font-serif text-[clamp(30px,7.2vw,38px)] leading-none transition-[opacity,transform] duration-500',
                  mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                )}
              >
                <span className="font-display text-xs tracking-widest text-coral-light">0{i + 1}</span>
                {item.label}
              </SiteLink>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-3">
          <Button route="signup" size="lg">
            {TRIAL_CTA}
          </Button>
          <Button to={PATHS.demo} variant="line" size="lg">
            Book a demo
          </Button>
          <Button route="login" variant="line" size="lg">
            Log in
          </Button>
        </div>
        <div className="mt-10 border-t border-navy-line pt-8 text-[15px] text-navy-text">
          <ContactList dark />
        </div>
      </div>
    </>
  )
}
