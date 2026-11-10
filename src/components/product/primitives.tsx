import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { AvatarKey } from '@/types'
import { Avatar, Bar } from '@/components/ui/atoms'

/** Heading row at the top of a product screen. */
export function EvHead({ title, sub, chip }: { title: string; sub: string; chip?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h4 className="text-[17px] font-extrabold">{title}</h4>
        <small className="text-xs text-muted">{sub}</small>
      </div>
      {chip}
    </div>
  )
}

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('min-w-0 rounded-xl border border-line p-3', className)}>{children}</div>
}

export function PanelTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <h6 className="mb-2 flex justify-between font-display text-[12.5px] font-bold">
      {children}
      {aside && <span className="font-medium text-muted">{aside}</span>}
    </h6>
  )
}

interface KpiProps {
  label: string
  children: ReactNode
  bar?: { value: number; tone?: string }
}

export function Kpi({ label, children, bar }: KpiProps) {
  return (
    <div className="rounded-xl border border-line p-3">
      <small className="block text-[11.5px] text-muted">{label}</small>
      <strong className="mt-0.5 block font-display text-[17px] font-extrabold tabular-nums sm:text-xl">{children}</strong>
      {bar && <Bar value={bar.value} tone={bar.tone} />}
    </div>
  )
}

export function KpiGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-3 gap-2.5">{children}</div>
}

/** Two-column grid that stacks on phones. */
export function TwoCol({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 gap-2.5 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]', className)}>{children}</div>
  )
}

export function Checkbox({ done }: { done?: boolean }) {
  return (
    <span
      className={cn('size-3.5 shrink-0 rounded-[4px] border-[1.5px]', done ? 'border-ok bg-ok' : 'border-[#CFC7BB]')}
    />
  )
}

interface TaskRowProps {
  label: string
  done?: boolean
  owner?: AvatarKey
  trailing?: ReactNode
  withCheckbox?: boolean
  /** Marks the row as a target for the hero intro animation. */
  animate?: boolean
}

export function TaskRow({ label, done, owner, trailing, withCheckbox = true, animate }: TaskRowProps) {
  return (
    <div
      data-hero-task={animate ? '' : undefined}
      className="flex items-center gap-2 border-t border-sand py-1.5 text-[12.5px] first-of-type:border-t-0"
    >
      {withCheckbox && <Checkbox done={done} />}
      <span className={cn('min-w-0 flex-1 truncate', done && 'text-muted line-through')}>{label}</span>
      {trailing}
      {owner && <Avatar who={owner} />}
    </div>
  )
}

interface DataTableProps {
  head: string[]
  /** Indexes of columns that are right-aligned. */
  right?: number[]
  rows: ReactNode[][]
  tabular?: boolean
}

/** Horizontally scrollable table used in several product screens. */
export function DataTable({ head, right = [], rows, tabular }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cn('w-full border-collapse text-[12.5px]', tabular && 'tabular-nums')}>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th
                key={h}
                className={cn(
                  'border-b border-line px-2 py-1.5 text-[11.5px] font-semibold text-muted',
                  right.includes(i) ? 'text-right' : 'text-left',
                )}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c} className={cn('border-b border-sand p-2 whitespace-nowrap', right.includes(c) && 'text-right')}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function SampleNote() {
  return <small className="text-muted">Sample data</small>
}
