import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { ROUTES, isExternal } from '@/config/routes'
import type { RouteKey } from '@/types'
import { SiteLink } from '@/components/site/SiteLink'
import { Icon } from './Icon'

type Variant = 'primary' | 'ghost' | 'dark' | 'white' | 'line'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-display font-bold whitespace-nowrap transition-[transform,background,box-shadow,color] duration-200'

const variants: Record<Variant, string> = {
  primary: 'bg-coral text-white shadow-[0_6px_18px_-6px_rgba(233,90,120,.6)] hover:-translate-y-px hover:bg-coral-deep',
  ghost: 'bg-paper text-ink shadow-[inset_0_0_0_1px_var(--color-line)] hover:shadow-[inset_0_0_0_1px_var(--color-ink)]',
  dark: 'bg-ink text-white hover:bg-black',
  white: 'bg-white text-ink hover:-translate-y-px',
  line: 'text-white shadow-[inset_0_0_0_1.5px_rgba(255,255,255,.7)] hover:bg-white/10',
}

const sizes: Record<Size, string> = {
  sm: 'h-[38px] px-4 text-sm',
  md: 'h-[46px] px-[22px] text-[15px]',
  lg: 'h-[52px] px-[26px] text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  /** Shows a trailing arrow that nudges on hover. */
  arrow?: boolean
  children: ReactNode
  className?: string
}

type LinkProps = CommonProps & { route?: RouteKey; to?: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'className' | 'children' | 'href'
  >
type NativeProps = CommonProps & { route?: undefined; to?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'children'
  >

/**
 * Pill button. `to` is an internal path, `route` resolves through the ROUTES config
 * (internal paths use the page transition, absolute URLs open in a new tab).
 * With neither it renders a native <button>.
 */
export function Button(props: LinkProps | NativeProps) {
  const { variant = 'primary', size = 'md', arrow, children, className, route, to, ...rest } = props
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow" size={16} className="transition-transform duration-200 group-hover:translate-x-[3px]" />}
    </>
  )

  const href = to ?? (route ? ROUTES[route] : undefined)
  if (href) {
    const anchor = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return isExternal(href) ? (
      <a href={href} target="_blank" rel="noopener" className={classes} {...anchor}>
        {content}
      </a>
    ) : (
      <SiteLink to={href} className={classes} {...anchor}>
        {content}
      </SiteLink>
    )
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
