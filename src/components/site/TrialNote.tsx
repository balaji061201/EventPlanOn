import { cn } from '@/lib/cn'
import { TRIAL_CTA, TRIAL_LINE } from '@/config/business'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

/** One-line free-trial reminder with a tick. */
export function TrialNote({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <p className={cn('flex items-center gap-2 text-[15px] font-medium', dark ? 'text-white' : 'text-ink', className)}>
      <Icon name="check" size={18} className={dark ? 'text-coral-light' : 'text-ok'} />
      {TRIAL_LINE}
    </p>
  )
}

/** Reminder band with a trial button: used inside use cases, pricing and FAQ sections. */
export function TrialCallout({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-4 rounded-card-lg border border-coral/30 bg-coral-soft px-6 py-5',
        className,
      )}
    >
      <TrialNote />
      <Button route="signup" arrow>
        {TRIAL_CTA}
      </Button>
    </div>
  )
}
