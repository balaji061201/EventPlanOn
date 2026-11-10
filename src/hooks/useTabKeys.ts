import type { KeyboardEvent } from 'react'

/**
 * Roving-focus arrow-key handling for a WAI-ARIA tablist.
 * Attach the returned handler to the element that has role="tablist".
 */
export function handleTabKeys(e: KeyboardEvent<HTMLElement>, itemSelector: string): void {
  const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>(itemSelector))
  const index = items.indexOf(document.activeElement as HTMLElement)
  if (index < 0) return

  let next: number | null = null
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % items.length
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + items.length) % items.length
  if (next === null) return

  e.preventDefault()
  items[next].focus()
  items[next].click()
}
