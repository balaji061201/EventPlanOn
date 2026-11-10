import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { AvatarKey, IconName, Tone } from '@/types'
import { Icon } from './Icon'

/* ---------- Chip ---------- */
const chipTones: Record<Tone, string> = {
  default: 'bg-sand text-ink',
  ok: 'bg-ok-soft text-ok-ink',
  warn: 'bg-warn-soft text-warn-ink',
  coral: 'bg-coral-soft text-coral-deep',
  info: 'bg-info-soft text-info-ink',
}

export function Chip({ tone = 'default', className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[5px] rounded-full px-[9px] py-[3px] text-[11.5px] font-semibold whitespace-nowrap',
        chipTones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ---------- Avatar ---------- */
const avatarColors: Record<AvatarKey, string> = {
  RK: 'bg-info',
  AM: 'bg-coral',
  SL: 'bg-ok',
  JP: 'bg-warn',
  DN: 'bg-violet',
  EP: 'bg-coral',
}

export function Avatar({ who, className }: { who: AvatarKey; className?: string }) {
  return (
    <span
      className={cn(
        'grid size-5 shrink-0 place-items-center rounded-full text-[9px] font-bold text-white',
        avatarColors[who],
        className,
      )}
    >
      {who}
    </span>
  )
}

/* ---------- MegaIcon: the rounded coral icon tile used all over the site ---------- */
interface MegaIconProps {
  name: IconName
  /** Tile size in px. */
  size?: number
  /** Glyph size in px. */
  iconSize?: number
  rounded?: string
  className?: string
}

export function MegaIcon({ name, size = 34, iconSize = 17, rounded = 'rounded-[9px]', className }: MegaIconProps) {
  const style: CSSProperties = { width: size, height: size }
  return (
    <span
      style={style}
      className={cn('grid shrink-0 place-items-center bg-coral-soft text-coral-deep', rounded, className)}
    >
      <Icon name={name} size={iconSize} />
    </span>
  )
}

/* ---------- Progress bar ---------- */
export function Bar({ value, tone = 'bg-coral', className }: { value: number; tone?: string; className?: string }) {
  return (
    <div className={cn('mt-2 h-1.5 overflow-hidden rounded-full bg-sand', className)}>
      <i data-bar className={cn('block h-full rounded-full', tone)} style={{ width: `${value}%` }} />
    </div>
  )
}

/* ---------- Check list ---------- */
export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="m-0 grid list-none gap-3 p-0">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[22px_minmax(0,1fr)] gap-2.5 text-[15.5px]">
          <Icon name="check" size={18} className="mt-[3px] text-coral" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ---------- Inline text link with arrow ---------- */
interface TextLinkProps {
  href: string
  children: ReactNode
  external?: boolean
  className?: string
}

export function TextLink({ href, children, external, className }: TextLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      className={cn('group inline-flex items-center gap-1.5 font-display font-bold text-coral-deep', className)}
    >
      {children}
      <Icon name="arrow" size={14} className="transition-transform duration-200 group-hover:translate-x-[3px]" />
    </a>
  )
}
