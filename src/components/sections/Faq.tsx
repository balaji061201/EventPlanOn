import { useState } from 'react'
import { cn } from '@/lib/cn'
import { BUSINESS } from '@/config/business'
import { FAQS, type Faq as FaqEntry } from '@/data/content'
import { Eyebrow } from '@/components/ui/layout'
import { EmailLink, PhoneLink } from '@/components/site/ContactDetails'
import { TrialCallout } from '@/components/site/TrialNote'

function FaqItem({ faq, open, onToggle, id }: { faq: FaqEntry; open: boolean; onToggle: () => void; id: string }) {
  return (
    <div className="border-b border-line">
      <h3 className="text-[17px]">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-5 py-[22px] text-left font-heading font-semibold"
        >
          {faq.q}
          <span
            aria-hidden="true"
            className={cn(
              'grid size-[30px] shrink-0 place-items-center rounded-full border transition-[transform,background] duration-250',
              open ? 'rotate-45 border-coral bg-coral text-white' : 'border-line',
            )}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={cn('grid transition-[grid-template-rows] duration-250', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
      >
        <div className="overflow-hidden">
          <div className="max-w-[68ch] pr-[50px] pb-[22px]">
            <p className="font-medium">{faq.short}</p>
            <p className="mt-2 text-muted">{faq.detail}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Accordion where one question is open at a time. */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div id="faq" data-reveal className="mt-16 grid grid-cols-1 gap-7 md:mt-24 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] md:gap-14">
      <div>
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-3.5 font-serif text-[clamp(30px,4vw,51px)] leading-[1] font-medium tracking-[-0.03em]">Event budgeting, <em className="text-coral">answered.</em></h2>
        <div className="mt-6 grid gap-2 rounded-2xl border border-line bg-paper p-5">
          <strong className="font-display">Still have a question?</strong>
          <p className="text-[14.5px] text-muted">Our Australian team is available {BUSINESS.hours}.</p>
          <p className="text-[15px] font-semibold">
            <PhoneLink className="hover:text-coral-deep" />
            <span className="block">
              <EmailLink className="hover:text-coral-deep" />
            </span>
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        {FAQS.map((f, i) => (
          <FaqItem
            key={f.q}
            id={`faq-${i}`}
            faq={f}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
        <TrialCallout className="mt-8" />
      </div>
    </div>
  )
}
