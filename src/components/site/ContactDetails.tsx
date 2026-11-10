import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { BUSINESS, CITIES, addressLine, mailHref, telHref } from '@/config/business'
import { PATHS } from '@/config/routes'
import { Button } from '@/components/ui/Button'
import { Container, Eyebrow, Section } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'
import type { IconName } from '@/types'

/** Wraps a value in a tel:/mailto: link once it is a real value; plain text while it is still a placeholder. */
export function Linked({ href, children, className }: { href?: string; children: ReactNode; className?: string }) {
  return href ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <span className={className}>{children}</span>
  )
}

export const PhoneLink = ({ className }: { className?: string }) => (
  <Linked href={telHref(BUSINESS.phone)} className={className}>
    {BUSINESS.phone}
  </Linked>
)

export const EmailLink = ({ className }: { className?: string }) => (
  <Linked href={mailHref(BUSINESS.email)} className={className}>
    {BUSINESS.email}
  </Linked>
)

function Row({ icon, label, children, dark }: { icon: IconName; label: string; children: ReactNode; dark?: boolean }) {
  return (
    <li className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-3.5">
      <span className={cn('grid size-10 place-items-center rounded-[11px]', dark ? 'bg-white/10 text-coral-light' : 'bg-coral-soft text-coral-deep')}>
        <Icon name={icon} size={18} />
      </span>
      <div className="min-w-0">
        <small className={cn('block text-xs font-semibold tracking-[.1em] uppercase', dark ? 'text-navy-text' : 'text-muted')}>{label}</small>
        <span className="block break-words">{children}</span>
      </div>
    </li>
  )
}

/** Full contact list: phone, email, office address and business hours. */
export function ContactList({ dark, className }: { dark?: boolean; className?: string }) {
  const link = dark ? 'hover:text-white' : 'hover:text-coral-deep'
  return (
    <ul className={cn('m-0 grid list-none gap-5 p-0', className)}>
      <Row icon="phone" label="Phone" dark={dark}>
        <PhoneLink className={link} />
      </Row>
      <Row icon="mail" label="Email" dark={dark}>
        <EmailLink className={link} />
      </Row>
      <Row icon="pin" label="Office" dark={dark}>
        <address className="not-italic">{addressLine()}</address>
      </Row>
      <Row icon="clock" label="Business hours" dark={dark}>
        {BUSINESS.hours}
      </Row>
    </ul>
  )
}

/** Contact section used on Home, About and the Contact page. */
export function ContactSection({ className, heading = true }: { className?: string; heading?: boolean }) {
  return (
    <Section id="contact" className={cn('bg-paper', className)}>
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Eyebrow>Contact</Eyebrow>
          {heading && (
            <h2 className="mt-3.5 font-serif text-[clamp(30px,4vw,54px)] leading-[1.05] font-medium tracking-[-0.03em]">
              Talk to our <em className="text-coral">Australian team.</em>
            </h2>
          )}
          <p className="mt-5 max-w-[52ch] text-lg text-muted">
            Questions about budgeting, setup or pricing? Call, email or book a demo. We help event teams in{' '}
            {CITIES.slice(0, -1).join(', ')} and {CITIES[CITIES.length - 1]} get started.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={PATHS.demo} size="lg" arrow>
              Book a demo
            </Button>
            <Button route="signup" variant="ghost" size="lg">
              Start free trial
            </Button>
          </div>
        </div>

        <div className="rounded-[28px] border border-line bg-ivory p-7 md:p-9">
          <div className="mb-6 border-b border-line pb-5 text-[15px]">
            <strong className="block font-display text-base">{BUSINESS.legalName}</strong>
            <span className="text-muted">Trading as {BUSINESS.brand}</span>
            <span className="block text-muted">ABN {BUSINESS.abn}</span>
          </div>
          <ContactList />
        </div>
      </Container>
    </Section>
  )
}
