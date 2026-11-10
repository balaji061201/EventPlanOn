import { useState } from 'react'
import { cn } from '@/lib/cn'
import { TRIAL_CTA } from '@/config/business'
import { PLANS, PLAN_BUDGET, PLAN_VOLUME } from '@/data/content'
import { Button } from '@/components/ui/Button'
import { CheckList } from '@/components/ui/atoms'
import { Container, Eyebrow, Section } from '@/components/ui/layout'
import { TrialCallout } from '@/components/site/TrialNote'

const REASONS = [
  'You run a few events a year on modest budgets, so you need simple tracking without paying for volume you will not use.',
  'You run events regularly, so you benefit from templates, supplier allocation and proposals across several budgets.',
  'You manage many events or client budgets at once, so you need room to scale and clear reporting across the portfolio.',
]

function Choice({ legend, options, value, onChange }: { legend: string; options: readonly string[]; value: number; onChange: (i: number) => void }) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-3 font-display text-[15px] font-bold">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((o, i) => (
          <label
            key={o}
            className={cn(
              'cursor-pointer rounded-xl border px-4 py-3 text-[14.5px] font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-coral',
              i === value ? 'border-coral bg-coral-soft text-coral-deep' : 'border-line bg-paper hover:border-ink',
            )}
          >
            <input type="radio" name={legend} className="sr-only" checked={i === value} onChange={() => onChange(i)} />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** Short guide: pick event volume and typical budget, get a suggested plan. */
function PlanGuide() {
  const [volume, setVolume] = useState(0)
  const [budget, setBudget] = useState(0)
  const pick = Math.round((volume + budget) / 2)

  return (
    <div className="mt-16 rounded-[28px] border border-line bg-paper p-6 md:p-10">
      <Eyebrow>Which plan is right for you?</Eyebrow>
      <h3 className="mt-3 font-serif text-[clamp(24px,3vw,36px)] leading-tight font-medium tracking-[-0.02em]">
        Match a plan to your events and budgets
      </h3>
      <div className="mt-8 grid gap-7 lg:grid-cols-2">
        <Choice legend="How many events do you run a year?" options={PLAN_VOLUME} value={volume} onChange={setVolume} />
        <Choice legend="What is a typical event budget?" options={PLAN_BUDGET} value={budget} onChange={setBudget} />
      </div>
      <div role="status" aria-live="polite" className="mt-8 rounded-2xl bg-ivory p-5 md:p-6">
        <small className="block text-xs font-semibold tracking-[.1em] text-muted uppercase">We would start you on</small>
        <strong className="mt-1 block font-serif text-2xl font-medium">{PLANS[pick].name}</strong>
        <p className="mt-2 max-w-[62ch] text-muted">{REASONS[pick]}</p>
      </div>
      <p className="mt-4 text-sm text-muted">You can upgrade or downgrade at any time, so there is no risk in starting small.</p>
    </div>
  )
}

/** Plans in AUD including GST (placeholders), the plan guide and a free-trial reminder. */
export function PricingPlans({ className }: { className?: string }) {
  return (
    <Section className={className}>
      <Container>
        <Eyebrow>Plans</Eyebrow>
        <h2 className="mt-3.5 font-serif text-[clamp(30px,4vw,54px)] leading-[1.05] font-medium tracking-[-0.03em]">
          Simple pricing in <em className="text-coral">Australian dollars.</em>
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg text-muted">Every price is in AUD and includes 10% GST. Sample plans and prices: confirm before launch.</p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PLANS.map((p) => (
            <article
              key={p.name}
              data-reveal
              className={cn(
                'relative flex flex-col rounded-card-lg border bg-paper p-7',
                p.popular ? 'border-coral shadow-lift' : 'border-line',
              )}
            >
              {p.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-coral px-3 py-1 font-display text-[11px] font-bold tracking-[.08em] text-white uppercase">
                  Most popular
                </span>
              )}
              <h3 className="font-serif text-2xl font-medium">{p.name}</h3>
              <p className="mt-1 text-[14.5px] text-muted">{p.blurb}</p>
              <p className="mt-6 flex items-baseline gap-1.5">
                <strong className="font-serif text-5xl leading-none font-medium tracking-[-0.03em]">{p.price}</strong>
                <span className="text-sm text-muted">/ month</span>
              </p>
              <small className="mt-1 block text-[13px] text-muted">AUD, including GST</small>
              <div className="my-6 border-t border-line" />
              <CheckList items={p.features} />
              <Button route="signup" variant={p.popular ? 'primary' : 'ghost'} className="mt-8 w-full">
                {TRIAL_CTA}
              </Button>
            </article>
          ))}
        </div>

        <PlanGuide />
        <TrialCallout className="mt-8" />
      </Container>
    </Section>
  )
}
