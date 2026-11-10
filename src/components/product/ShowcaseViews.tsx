import type { ComponentType } from 'react'
import { cn } from '@/lib/cn'
import type { AvatarKey, Tone } from '@/types'
import { Avatar, Chip } from '@/components/ui/atoms'
import { DataTable, EvHead, Panel, PanelTitle, SampleNote, TaskRow, TwoCol } from './primitives'

function TaskBoardView() {
  const columns: { title: string; cards: [string, AvatarKey, string][] }[] = [
    {
      title: 'To do',
      cards: [
        ['Book shuttle buses', 'DN', '20 Feb'],
        ['Order lanyards', 'SL', '24 Feb'],
        ['Brief volunteers', 'JP', '10 Mar'],
      ],
    },
    {
      title: 'In progress',
      cards: [
        ['Keynote run of show', 'AM', '12 Feb'],
        ['Badge proofs', 'SL', '14 Feb'],
        ['Catering headcount', 'JP', '14 Feb'],
      ],
    },
    {
      title: 'Done',
      cards: [
        ['Confirm AV vendor', 'RK', '1 Feb'],
        ['Publish schedule', 'AM', '28 Jan'],
      ],
    },
  ]
  return (
    <>
      <EvHead title="Partner Summit 2027 · Tasks" sub="Board view" chip={<Chip>Filter: All owners</Chip>} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {columns.map((col) => (
          <div key={col.title} className="grid content-start gap-2 rounded-xl bg-ivory p-2.5">
            <h6 className="mb-0.5 flex justify-between font-display text-xs text-muted">
              {col.title} <span>{col.cards.length}</span>
            </h6>
            {col.cards.map(([title, who, due]) => (
              <div key={title} className="grid gap-1.5 rounded-[10px] border border-line bg-paper p-2.5 text-[12.5px]">
                <strong>{title}</strong>
                <div className="flex items-center justify-between gap-1.5">
                  <Chip>{due}</Chip>
                  <Avatar who={who} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

function BudgetOverviewView() {
  const slices: [number, string, number][] = [
    [47, '#E95A78', 0],
    [23, '#3B6FD8', 47],
    [16, '#1F9D6B', 70],
    [7, '#C98A12', 86],
    [7, '#7A5AE0', 93],
  ]
  const legend: [string, string][] = [
    ['Venue', 'bg-coral'],
    ['Catering', 'bg-info'],
    ['AV', 'bg-ok'],
    ['Décor', 'bg-warn'],
    ['Marketing', 'bg-violet'],
  ]
  const payments: [string, string, string][] = [
    ['Harbour AV', '1 Feb', '$2,750'],
    ['Saffron Kitchens', '15 Feb', '$8,500'],
    ['Darling Venue Co.', '1 Mar', '$7,500'],
  ]
  return (
    <>
      <EvHead title="Budget overview" sub="$31,200 of $50,000 spent · inc. GST" chip={<Chip tone="ok">On budget</Chip>} />
      <TwoCol>
        <Panel>
          <PanelTitle>Spend by category</PanelTitle>
          <div className="flex flex-wrap items-center gap-[18px]">
            <svg width="140" height="140" viewBox="0 0 42 42" aria-hidden="true">
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="#F4EFE8" strokeWidth="6" />
              {slices.map(([len, color, offset]) => (
                <circle
                  key={color}
                  cx="21"
                  cy="21"
                  r="15.9"
                  fill="none"
                  stroke={color}
                  strokeWidth="6"
                  strokeDasharray={`${len} ${100 - len}`}
                  strokeDashoffset={25 - offset}
                />
              ))}
              <text x="21" y="22.5" textAnchor="middle" fontSize="5" fontWeight="800" fill="#17203A" fontFamily="Manrope Variable, sans-serif">
                62%
              </text>
            </svg>
            <div className="grid gap-1.5 text-[12.5px]">
              {legend.map(([label, color]) => (
                <div key={label} className="flex items-center gap-2">
                  <i className={cn('size-[9px] rounded-[3px]', color)} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <Panel>
          <PanelTitle>Upcoming payments</PanelTitle>
          {payments.map(([name, date, amount]) => (
            <TaskRow
              key={name}
              withCheckbox={false}
              label={name}
              trailing={
                <>
                  <Chip>{date}</Chip>
                  <strong className="text-[12.5px] tabular-nums">{amount}</strong>
                </>
              }
            />
          ))}
        </Panel>
      </TwoCol>
    </>
  )
}

function RunOfShowView() {
  const rows: { time: string; color: string; title: string; where: string; now?: boolean }[] = [
    { time: '7:30', color: 'bg-warn', title: 'AV load-in and sound check', where: 'Crew' },
    { time: '8:30', color: 'bg-ok', title: 'Doors open · registration and coffee', where: 'Front desk' },
    { time: '9:30', color: 'bg-coral', title: 'Opening keynote', where: 'Main Hall', now: true },
    { time: '10:30', color: 'bg-info', title: 'Partner roadmap breakout', where: 'Room B' },
    { time: '12:00', color: 'bg-warn', title: 'Lunch service', where: 'Terrace' },
    { time: '13:30', color: 'bg-violet', title: 'Workshops (3 tracks)', where: 'Rooms C–E' },
  ]
  return (
    <>
      <EvHead title="Day 1 · Run of show" sub="Wed 18 Mar · Main Hall" chip={<Chip tone="coral">● Live</Chip>} />
      <div className="grid gap-1.5">
        {rows.map((r) => (
          <div
            key={r.time}
            className={cn(
              'grid grid-cols-[54px_4px_minmax(0,1fr)] items-center gap-3 rounded-[10px] border px-3 py-2.5 text-[13px] sm:grid-cols-[64px_4px_minmax(0,1fr)_auto]',
              r.now ? 'border-coral bg-[#FFF7F9]' : 'border-line',
            )}
          >
            <span className="font-semibold tabular-nums">{r.time}</span>
            <span className={cn('self-stretch rounded-[2px]', r.color)} />
            <span>{r.title}</span>
            <Chip tone={r.now ? 'coral' : 'default'} className="max-sm:hidden">
              {r.where}
            </Chip>
          </div>
        ))}
      </div>
    </>
  )
}

function CheckInView() {
  const rows: [string, string, string, Tone, string][] = [
    ['Priya Nair', 'VIP', 'Vegetarian', 'ok', 'Checked in'],
    ['Daniel Ortiz', 'Partner', '—', 'ok', 'Checked in'],
    ['Aisha Khan', 'Partner', 'Halal', 'default', 'Not arrived'],
    ['Tom Becker', 'Standard', '—', 'ok', 'Checked in'],
    ['Mei Lin', 'Speaker', 'Vegan', 'coral', 'Speaker desk'],
  ]
  return (
    <>
      <EvHead title="Check-in" sub="Main entrance" chip={<Chip tone="ok" className="tabular-nums">604 / 842 checked in</Chip>} />
      <div className="flex h-[38px] items-center rounded-[10px] border border-line bg-ivory px-3 text-[13px] text-muted">
        Search by name, company or ticket…
      </div>
      <DataTable
        head={['Name', 'Ticket', 'Dietary', 'Status']}
        rows={rows.map(([n, t, d, tone, s]) => [n, t, d, <Chip key={n} tone={tone}>{s}</Chip>])}
      />
      <SampleNote />
    </>
  )
}

export interface ShowcaseItem {
  label: string
  url: string
  caption: string
  View: ComponentType
}

export const SHOWCASE: ShowcaseItem[] = [
  {
    label: 'Task board',
    url: 'tasks/board',
    caption: 'Drag tasks between stages and see who owns what, across every workstream.',
    View: TaskBoardView,
  },
  {
    label: 'Budget overview',
    url: 'budget',
    caption: 'Estimated versus actual spend by category, updated as invoices and payments come in.',
    View: BudgetOverviewView,
  },
  {
    label: 'Run of show',
    url: 'agenda/day-1',
    caption: 'A minute-by-minute itinerary the whole crew sees on event day, including live changes.',
    View: RunOfShowView,
  },
  {
    label: 'Attendee check-in',
    url: 'guests/check-in',
    caption: 'Search, check in and update guests on event day, with totals that update live.',
    View: CheckInView,
  },
]
