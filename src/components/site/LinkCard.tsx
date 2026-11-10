import { cn } from '@/lib/cn'
import type { IconName } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { MegaIcon } from '@/components/ui/atoms'
import { SiteLink } from './SiteLink'

interface LinkCardProps {
  to: string
  icon: IconName
  title: string
  text: string
  cta?: string
  className?: string
}

/** Card that links to an inner page; lifts and fills with coral on hover. */
export function LinkCard({ to, icon, title, text, cta = 'Explore', className }: LinkCardProps) {
  return (
    <SiteLink
      to={to}
      data-reveal
      className={cn(
        'group grid content-start gap-3.5 rounded-card-lg border border-line bg-paper p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-coral hover:shadow-lift',
        className,
      )}
    >
      <MegaIcon name={icon} size={44} iconSize={20} rounded="rounded-xl" />
      <h3 className="font-serif text-2xl leading-tight font-medium">{title}</h3>
      <p className="text-[15px] text-muted">{text}</p>
      <span className="mt-1 inline-flex items-center gap-1.5 font-display text-sm font-bold text-coral-deep">
        {cta}
        <Icon name="arrow" size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </SiteLink>
  )
}
