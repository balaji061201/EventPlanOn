import { TRIAL_DAYS } from '@/config/business'
import { Container, Eyebrow, Section } from '@/components/ui/layout'
import { CountUp } from '@/components/ui/CountUp'
import { WordReveal } from '@/components/site/WordReveal'

const stats: { value?: number; text?: string; suffix?: string; label: string }[] = [
  { value: 5, label: 'steps from a prompt to every expense tracked' },
  { value: 4, label: 'core tools: AI budgeting, expenses, suppliers and proposals' },
  { text: 'AUD', label: 'pricing in Australian dollars, GST included' },
  { text: TRIAL_DAYS, suffix: '-day', label: 'free trial, no credit card required' },
]

/** The point of the product in one line, then the numbers. */
export function ProofScene() {
  return (
    <Section className="bg-ivory">
      <Container>
        <Eyebrow>Why teams switch</Eyebrow>
        <WordReveal
          className="mt-8 max-w-[22ch] font-serif text-[clamp(30px,5.1vw,83px)] leading-[1.05] font-medium tracking-[-0.03em] sm:max-w-none"
          text="Build the budget in minutes. Know where every dollar is going."
        />

        <div className="mt-20 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`px-1 py-8 md:px-8 ${i ? 'md:border-l md:border-line' : ''} ${i % 2 ? 'pl-6' : ''}`}>
              <strong className="block font-serif text-[clamp(35px,4.8vw,67px)] leading-none font-medium tracking-[-0.03em]">
                {s.value !== undefined ? <CountUp value={s.value} onScroll /> : s.text}
                {s.suffix && <span className="text-[.4em] text-coral">{s.suffix}</span>}
              </strong>
              <span className="mt-3 block max-w-[24ch] text-sm text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
