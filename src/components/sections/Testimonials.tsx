import { TESTIMONIALS } from '@/data/content'
import { Container, Eyebrow, Section } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'

/** Photo stand-in. Swap for an <img> with real, descriptive alt text once photos are supplied. */
export function PhotoPlaceholder({ label, className = 'size-14' }: { label: string; className?: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`grid shrink-0 place-items-center rounded-full border border-dashed border-coral/50 bg-coral-soft text-coral-deep ${className}`}
    >
      <Icon name="guest" size={22} />
    </span>
  )
}

/** Three placeholder testimonial cards, clearly marked so they are replaced with real quotes before launch. */
export function Testimonials() {
  return (
    <Section className="bg-sand/60">
      <Container>
        <Eyebrow>Customer stories</Eyebrow>
        <h2 className="mt-3.5 max-w-[22ch] font-serif text-[clamp(30px,4vw,54px)] leading-[1.05] font-medium tracking-[-0.03em]">
          Australian event teams <em className="text-coral">on budget.</em>
        </h2>
        <p className="mt-4 max-w-[60ch] text-muted">
          Sample testimonials: replace each card with a real, approved customer quote before launch.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} data-reveal className="m-0 flex flex-col rounded-card-lg border border-line bg-paper p-7">
              <span className="mb-4 w-fit rounded-full bg-warn-soft px-2.5 py-1 font-display text-[11px] font-bold tracking-[.08em] text-warn-ink uppercase">
                Sample testimonial
              </span>
              <blockquote className="m-0 flex-1 text-[16px] leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3.5 border-t border-line pt-5">
                <PhotoPlaceholder label={`Photo placeholder for ${t.name}, ${t.role} at ${t.company} in ${t.city}`} />
                <span className="text-[14.5px] text-muted">
                  <strong className="block font-display text-ink">{t.name}</strong>
                  {t.role}, {t.company}
                  <span className="block">{t.city}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  )
}
