import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'

type Status = { kind: 'idle' } | { kind: 'error' | 'success'; message: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Footer signup. Pass `onSubmit` to connect it to your email provider. */
export function NewsletterForm({ onSubmit }: { onSubmit?: (email: string) => void }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    if (!EMAIL_PATTERN.test(value)) {
      setStatus({ kind: 'error', message: 'Enter a valid email address, like name@company.com.' })
      return
    }
    onSubmit?.(value)
    setStatus({ kind: 'success', message: 'Demo form: connect this to your newsletter provider to collect signups.' })
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit} className="mt-6 flex max-w-[380px] gap-2">
        <label htmlFor="newsEmail" className="sr-only">
          Email address
        </label>
        <input
          id="newsEmail"
          type="email"
          required
          autoComplete="email"
          placeholder="Your work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 min-w-0 flex-1 rounded-full border border-navy-line bg-navy-2 px-4 text-sm text-white placeholder:text-[#7D88A6]"
        />
        <Button type="submit" size="sm" className="h-11">
          Subscribe
        </Button>
      </form>
      <p role="status" className={cn('mt-2 min-h-4 text-[13px]', status.kind === 'error' ? 'text-[#FFB4C3]' : 'text-[#9FE0C2]')}>
        {status.kind !== 'idle' && status.message}
      </p>
    </>
  )
}
