import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { SiteLink } from './SiteLink'

/** Inline "text →" link to another page, with the page-wipe transition. */
export function PageLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return (
    <SiteLink to={to} className={cn('group inline-flex w-fit items-center gap-1.5 font-display font-bold text-coral-deep', className)}>
      {children}
      <Icon name="arrow" size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
    </SiteLink>
  )
}
