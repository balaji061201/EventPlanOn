import type { RouteKey } from '@/types'
import { BUSINESS } from './business'

/**
 * Internal pages use root-relative paths; links that leave the marketing site
 * (the web app itself) are absolute URLs. Point the absolute ones at the live app.
 */
export const ROUTES: Record<RouteKey, string> = {
  signup: 'https://www.eventplanon.com/signup',
  login: 'https://www.eventplanon.com/login',
  demo: '/demo',
  pricing: '/pricing',
}

export const PATHS = {
  home: '/',
  platform: '/platform',
  solutions: '/solutions',
  useCases: '/use-cases',
  ai: '/ai',
  blog: '/blog',
  resources: '/resources',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
  demo: '/demo',
} as const

export const SUPPORT_EMAIL = BUSINESS.email

export const isExternal = (href: string): boolean => /^https?:\/\//.test(href)
