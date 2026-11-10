import type { MouseEvent } from 'react'
import { Link, type LinkProps } from 'react-router'
import { useTransition } from './TransitionProvider'

/** Router link that plays the page-wipe transition before navigating. */
export function SiteLink({ to, onClick, ...rest }: Omit<LinkProps, 'to'> & { to: string }) {
  const { go } = useTransition()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    go(to)
  }

  return <Link to={to} onClick={handleClick} {...rest} />
}
