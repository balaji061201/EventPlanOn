import { useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { PATHS } from '@/config/routes'
import { MODULES } from '@/data/content'
import { definitionFor } from '@/data/seo'
import { ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { scrollToElement } from '@/lib/smooth'
import { AppFrame, AppMain } from '@/components/ui/AppFrame'
import { CheckList, MegaIcon } from '@/components/ui/atoms'
import { Container, Eyebrow } from '@/components/ui/layout'
import { MODULE_VIEWS } from '@/components/product/ModuleViews'
import { PageHero } from '@/components/site/PageHero'
import { PageLink } from '@/components/site/PageLink'
import { ClosingScene } from '@/components/story/ClosingScene'

/** The platform as a guided tour: a sticky index on the left follows you through each tool. */
export default function Platform() {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      if (!root.current) return
      gsap.utils.toArray<HTMLElement>('[data-chapter]').forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActive(i),
        })
      })
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('[data-tilt]').forEach((el) => {
        gsap.fromTo(
          el,
          { rotateX: 12, y: 50, transformOrigin: '50% 0%' },
          { rotateX: 0, y: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 45%', scrub: 0.5 } },
        )
      })
      gsap.utils.toArray<HTMLElement>('[data-chapter-text]').forEach((el) => {
        gsap.from(el.children, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <div ref={root}>
      <PageHero
        eyebrow="The platform"
        lines={['One platform for']}
        accent="every event dollar."
        lede={definitionFor(PATHS.platform)}
      />

      <Container className="grid gap-12 pb-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Platform tools" className="sticky top-28 hidden self-start lg:block">
          <Eyebrow>On this page</Eyebrow>
          <ol className="m-0 mt-5 grid list-none gap-1 p-0">
            {MODULES.map((m, i) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(`chapter-${m.id}`)
                    if (el) scrollToElement(el)
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-full px-3 py-2 text-left text-sm font-semibold transition-colors',
                    i === active ? 'bg-ink text-white' : 'text-muted hover:text-ink',
                  )}
                >
                  <span className="font-display text-[11px] tracking-widest opacity-60">{String(i + 1).padStart(2, '0')}</span>
                  {m.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-10 lg:gap-0">
          {MODULES.map((m, i) => {
            const View = MODULE_VIEWS[m.id]
            return (
              <section
                key={m.id}
                id={`chapter-${m.id}`}
                data-chapter
                className="grid items-center gap-8 py-10 lg:min-h-[85vh] lg:py-16 xl:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] xl:gap-12"
              >
                <div data-chapter-text className="grid gap-5">
                  <span className="font-serif text-7xl leading-none text-coral/25">{String(i + 1).padStart(2, '0')}</span>
                  <MegaIcon name={m.icon} size={44} iconSize={20} rounded="rounded-xl" />
                  <h2 className="font-serif text-[clamp(30px,2.9vw,42px)] leading-[1.02] font-medium tracking-[-0.03em]">{m.title}</h2>
                  <p className="text-[17px] text-muted">{m.text}</p>
                  <CheckList items={m.points} />
                  <PageLink to={`${PATHS.platform}/${m.id}`}>Explore {m.label.toLowerCase()}</PageLink>
                </div>
                <div className="[perspective:1500px]">
                  <div data-tilt className="will-change-transform">
                    <AppFrame url={`app.eventplanon.com/${m.id}`}>
                      <AppMain className="min-h-[320px] content-start">
                        <View />
                      </AppMain>
                    </AppFrame>
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </Container>

      <ClosingScene />
    </div>
  )
}

