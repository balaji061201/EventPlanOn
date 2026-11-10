import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useGSAP } from '@gsap/react'

// Register plugins exactly once for the whole app.
gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin)

export { gsap, ScrollTrigger, MotionPathPlugin, useGSAP }

export const EASE_OUT = 'power3.out'

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const formatNumber = (value: number, decimals = 0): string =>
  value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
