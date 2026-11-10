import { cn } from '@/lib/cn'
import { CORE_FEATURES, type UseCase } from '@/data/content'
import { PATHS } from '@/config/routes'
import { Button } from '@/components/ui/Button'
import { CheckList, MegaIcon } from '@/components/ui/atoms'
import { Container, Eyebrow, Section } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'
import { TrialCallout } from '@/components/site/TrialNote'

function Block({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div data-reveal className={cn('rounded-card-lg border border-line bg-paper p-6', className)}>
      <small className="block font-display text-xs font-bold tracking-[.12em] text-coral-deep uppercase">{label}</small>
      <div className="mt-2.5 text-[15.5px] leading-relaxed">{children}</div>
    </div>
  )
}

/** One audience: who it is for, the problem, how we solve it, the (sample) result, and the four core features. */
export function UseCaseSection({ useCase: u, index, className }: { useCase: UseCase; index: number; className?: string }) {
  return (
    <Section id={u.id} className={cn(index % 2 ? 'bg-sand/60' : 'bg-ivory', className)}>
      <Container>
        <Eyebrow>Use case 0{index + 1}</Eyebrow>
        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:items-end lg:gap-14">
          <div>
            <div className="mb-5 flex items-center gap-3.5">
              <MegaIcon name={u.icon} size={48} iconSize={22} rounded="rounded-xl" />
              <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] leading-[1.08] font-medium tracking-[-0.03em]">{u.title}</h2>
            </div>
            <p className="text-xl text-muted">{u.headline}</p>
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0 lg:justify-end" aria-label="Event types">
            {u.eventTypes.map((t) => (
              <li key={t} className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm font-semibold">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
          <Block label="Who it’s for">
            <p>{u.who}</p>
            <div className="mt-4">
              <small className="mb-2 block text-xs font-semibold tracking-[.08em] text-muted uppercase">Focus</small>
              <CheckList items={u.focus} />
            </div>
          </Block>
          <Block label="The problem">
            <p>{u.problem}</p>
          </Block>
          <Block label="How we solve it">
            <p>{u.solution}</p>
          </Block>
          <Block label="The result" className="border-coral/40 bg-coral-soft">
            <strong className="block font-serif text-[clamp(26px,3vw,38px)] leading-tight font-medium tracking-[-0.02em]">{u.result.metric}</strong>
            <span className="mt-2 inline-block rounded-full bg-warn-soft px-2.5 py-1 font-display text-[11px] font-bold tracking-[.06em] text-warn-ink uppercase">
              {u.result.label}
            </span>
          </Block>
        </div>

        <div data-reveal className="mt-8 rounded-card-lg bg-navy p-6 text-white md:p-8">
          <small className="flex items-center gap-2 font-display text-xs font-bold tracking-[.12em] text-coral-light uppercase">
            <Icon name="spark" size={14} /> Try a prompt like this
          </small>
          <p className="mt-3 font-display text-[clamp(17px,2vw,22px)] leading-snug font-semibold">“{u.prompt}”</p>
        </div>

        <h3 className="mt-12 mb-5 font-serif text-2xl font-medium">What you get</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_FEATURES.map((f, i) => (
            <div key={f.id} data-reveal className="grid content-start gap-3 rounded-card-lg border border-line bg-paper p-6">
              <MegaIcon name={f.icon} size={42} iconSize={19} rounded="rounded-xl" />
              <h4 className="font-serif text-lg leading-tight font-medium">{f.title}</h4>
              <p className="text-[14.5px] text-muted">{f.text}</p>
              <p className="border-t border-line pt-3 text-[14.5px]">{u.featureNotes[i]}</p>
            </div>
          ))}
        </div>

        <TrialCallout className="mt-8" />
        <div className="mt-5">
          <Button to={PATHS.demo} variant="ghost">
            Book a demo
          </Button>
        </div>
      </Container>
    </Section>
  )
}
