import Lenis from 'lenis'
import { ScrollTrigger, gsap, prefersReducedMotion } from '@/lib/gsap'

let instance: Lenis | null = null

/** Starts Lenis smooth scrolling and keeps GSAP's ScrollTrigger in sync. Returns a cleanup function. */
export function initSmoothScroll(): () => void {
  if (prefersReducedMotion()) return () => {}

  const lenis = new Lenis({ lerp: 0.1 })
  instance = lenis
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
    instance = null
  }
}

export function scrollToTopNow(): void {
  if (instance) instance.scrollTo(0, { immediate: true })
  window.scrollTo(0, 0)
}

export function scrollToElement(el: HTMLElement, offset = -128): void {
  if (instance) instance.scrollTo(el, { offset })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Freeze or release page scrolling (used by the mobile menu). */
export function lockScroll(locked: boolean): void {
  if (locked) instance?.stop()
  else instance?.start()
  document.body.style.overflow = locked ? 'hidden' : ''
}
