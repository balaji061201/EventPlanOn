import { SUPPORT_EMAIL } from '@/config/routes'

export interface DemoRequest {
  name: string
  email: string
  company: string
  teamSize: string
  eventType: string
  message: string
}

export type DemoResult = 'sent' | 'email-draft'

/**
 * Submits a demo request.
 *
 * - If `VITE_DEMO_ENDPOINT` is set, the request is POSTed there as JSON.
 * - Otherwise there is no backend to receive it, so we open a pre-filled email to support instead
 *   and report `email-draft` so the UI can say so truthfully.
 */
export async function requestDemo(req: DemoRequest): Promise<DemoResult> {
  const endpoint = import.meta.env.VITE_DEMO_ENDPOINT as string | undefined

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    })
    if (!res.ok) throw new Error(`Demo request failed (${res.status})`)
    return 'sent'
  }

  const body = [
    `Name: ${req.name}`,
    `Work email: ${req.email}`,
    `Company: ${req.company}`,
    `Team size: ${req.teamSize}`,
    `Event type: ${req.eventType}`,
    '',
    req.message,
  ].join('\n')
  window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Demo request')}&body=${encodeURIComponent(body)}`
  return 'email-draft'
}
