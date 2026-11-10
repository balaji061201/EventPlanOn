import type { Tone } from '@/types'
import { Bar, Chip } from '@/components/ui/atoms'
import { DataTable, EvHead, Kpi, KpiGrid, Panel, PanelTitle, SampleNote } from './primitives'

/* Product screens for the prompt → budget → quotes → proposal → expenses flow. Inside an <AppMain>. */

/** The example budget the AI builds from the prompt. Totals $50,000 inc. GST. */
export const SAMPLE_BUDGET: { category: string; amount: number }[] = [
  { category: 'Catering & beverages', amount: 17000 },
  { category: 'Venue & hire', amount: 15000 },
  { category: 'AV & production', amount: 5500 },
  { category: 'Speakers & entertainment', amount: 3500 },
  { category: 'Décor & styling', amount: 2500 },
  { category: 'Marketing', amount: 2000 },
  { category: 'Contingency', amount: 2000 },
  { category: 'Transport', amount: 1500 },
  { category: 'Staffing & registration', amount: 1000 },
]

export const SAMPLE_PROMPT = 'Plan a 200-guest corporate conference in Sydney with a $50,000 budget.'

const money = (n: number) => `$${n.toLocaleString('en-AU')}`

export function PromptView() {
  return (
    <>
      <EvHead title="New event" sub="Describe it in your own words" chip={<Chip tone="coral">AI budgeting</Chip>} />
      <Panel className="grid gap-2.5">
        <small className="text-[11.5px] font-semibold tracking-widest text-muted uppercase">Your prompt</small>
        <p className="rounded-lg border border-line bg-ivory px-3 py-2.5 text-[13.5px] leading-snug">{SAMPLE_PROMPT}</p>
        <div className="grid h-[34px] place-items-center rounded-full bg-coral text-[13px] font-bold text-white">Build my budget</div>
      </Panel>
      <Panel className="grid grid-cols-2 gap-2 text-[12.5px] sm:grid-cols-4">
        {[
          ['Event', 'Conference'],
          ['Guests', '200'],
          ['City', 'Sydney'],
          ['Budget', '$50,000'],
        ].map(([k, v]) => (
          <div key={k}>
            <small className="block text-muted">{k}</small>
            <strong className="font-display">{v}</strong>
          </div>
        ))}
      </Panel>
    </>
  )
}

export function BuiltBudgetView() {
  return (
    <>
      <EvHead title="Budget · Sydney Conference" sub="Built by AI · totals include GST" chip={<Chip tone="ok">$50,000 allocated</Chip>} />
      <Panel className="grid gap-2">
        {SAMPLE_BUDGET.map((r) => (
          <div key={r.category} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 text-[12.5px]">
            <span className="truncate">{r.category}</span>
            <strong className="font-display tabular-nums">{money(r.amount)}</strong>
            <Bar value={(r.amount / 17000) * 100} className="col-span-2 mt-0.5 h-1" />
          </div>
        ))}
      </Panel>
      <SampleNote />
    </>
  )
}

export function QuotesView() {
  const rows: [string, string, string, string, Tone][] = [
    ['Harbour Catering', '$15,800', 'No staffing', 'Lowest', 'ok'],
    ['Saffron Kitchens', '$17,000', 'Staffing included', 'Best fit', 'coral'],
    ['Bayside Events', '$18,900', 'Staffing + bar', 'Over budget', 'warn'],
  ]
  return (
    <>
      <EvHead title="Catering quotes" sub="Compared inc. GST · budget line $17,000" chip={<Chip tone="info">3 quotes</Chip>} />
      <DataTable
        tabular
        right={[1]}
        head={['Supplier', 'Quote', 'Includes', 'Status']}
        rows={rows.map(([s, q, i, label, tone]) => [s, q, i, <Chip key={s} tone={tone}>{label}</Chip>])}
      />
      <SampleNote />
    </>
  )
}

export function ProposalView() {
  return (
    <>
      <EvHead title="Proposal · Sydney Conference" sub="For Harbourline Group" chip={<Chip tone="ok">Approved</Chip>} />
      <Panel className="grid gap-2 text-[12.5px]">
        <PanelTitle aside="Inc. GST">Summary</PanelTitle>
        {[
          ['Venue & hire', '$15,000'],
          ['Catering & beverages', '$17,000'],
          ['AV & production', '$5,500'],
          ['Other inclusions', '$12,500'],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between border-t border-sand pt-1.5 first-of-type:border-t-0">
            <span>{k}</span>
            <strong className="font-display tabular-nums">{v}</strong>
          </div>
        ))}
        <div className="flex justify-between border-t border-line pt-2 text-[13.5px]">
          <strong className="font-display">Total</strong>
          <strong className="font-display tabular-nums">$50,000</strong>
        </div>
      </Panel>
      <div className="flex flex-wrap gap-1.5">
        <Chip tone="info">Sent 3 Mar</Chip>
        <Chip tone="warn">Viewed</Chip>
        <Chip tone="ok">Approved 6 Mar</Chip>
      </div>
    </>
  )
}

export function ExpensesView() {
  const rows: [string, string, string, string, Tone][] = [
    ['Venue & hire', '$15,000', '$15,000', '$0', 'ok'],
    ['Catering & beverages', '$17,000', '$15,800', '−$1,200', 'ok'],
    ['AV & production', '$5,500', '$6,700', '+$1,200', 'warn'],
    ['Décor & styling', '$2,500', '$1,600', '−$900', 'ok'],
    ['Marketing', '$2,000', '$1,300', '−$700', 'ok'],
  ]
  return (
    <>
      <EvHead title="Expenses · Sydney Conference" sub="Planned vs actual · inc. GST" chip={<Chip tone="warn">1 overspend alert</Chip>} />
      <KpiGrid>
        <Kpi label="Planned" bar={{ value: 100, tone: 'bg-info' }}>
          $50,000
        </Kpi>
        <Kpi label="Spent so far" bar={{ value: 78, tone: 'bg-coral' }}>
          $39,000
        </Kpi>
        <Kpi label="Left to spend" bar={{ value: 22, tone: 'bg-ok' }}>
          $11,000
        </Kpi>
      </KpiGrid>
      <DataTable
        tabular
        right={[1, 2, 3]}
        head={['Category', 'Planned', 'Actual', 'Variance']}
        rows={rows.map(([c, p, a, v, tone]) => [c, p, a, <Chip key={c} tone={tone}>{v}</Chip>])}
      />
    </>
  )
}
