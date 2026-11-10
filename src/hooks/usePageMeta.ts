import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { OG_IMAGE, getSeo, pageAbsoluteUrl } from '@/data/seo'

function upsert(selector: string, create: () => HTMLElement, set: (el: HTMLElement) => void): void {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  set(el)
}

const meta = (attr: 'name' | 'property', key: string, content: string) =>
  upsert(
    `meta[${attr}="${key}"]`,
    () => {
      const m = document.createElement('meta')
      m.setAttribute(attr, key)
      return m
    },
    (m) => m.setAttribute('content', content),
  )

/**
 * Applies the current route's SEO title, description, canonical URL, social tags and JSON-LD.
 * The same data is baked into static HTML at build time (scripts/prerender.mjs) for crawlers without JavaScript.
 */
export function usePageMeta(): void {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = getSeo(pathname)
    const url = pageAbsoluteUrl(pathname === '/' ? '/' : pathname.replace(/\/+$/, ''))

    document.title = seo.title
    meta('name', 'description', seo.description)
    meta('property', 'og:title', seo.title)
    meta('property', 'og:description', seo.description)
    meta('property', 'og:url', url)
    meta('property', 'og:image', OG_IMAGE)
    meta('name', 'twitter:title', seo.title)
    meta('name', 'twitter:description', seo.description)
    meta('name', 'twitter:image', OG_IMAGE)
    meta('name', 'robots', seo.path === '/404' ? 'noindex' : 'index, follow')
    upsert(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link')
        l.rel = 'canonical'
        return l
      },
      (l) => l.setAttribute('href', url),
    )

    document.head.querySelectorAll('script[data-seo]').forEach((s) => s.remove())
    seo.jsonLd.forEach((data) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.dataset.seo = ''
      s.textContent = JSON.stringify(data)
      document.head.appendChild(s)
    })
  }, [pathname])
}
