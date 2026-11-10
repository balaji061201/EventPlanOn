import type { ReactNode, SVGProps } from 'react'
import type { IconName } from '@/types'

interface IconDef {
  strokeWidth?: number
  filled?: boolean
  paths: ReactNode
}

const ICONS: Record<IconName, IconDef> = {
  plan: {
    paths: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="3" />
        <path d="M8 2v4M16 2v4M3 10h18M8 14h3M8 17h6" />
      </>
    ),
  },
  budget: {
    paths: <path d="M12 2v20M17 6.5c0-1.9-2.2-3-5-3s-5 1.3-5 3.3S9 9.5 12 10s5 1.3 5 3.5-2.2 3.5-5 3.5-5-1.2-5-3" />,
  },
  task: {
    paths: (
      <>
        <path d="M9 11l3 3 8-8" />
        <path d="M20 12v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h9" />
      </>
    ),
  },
  time: {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  guest: {
    paths: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c.8-3.5 3.3-5.5 6.5-5.5s5.7 2 6.5 5.5" />
        <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.8c1.7.8 2.7 2.6 3 5.2" />
      </>
    ),
  },
  vendor: {
    paths: (
      <>
        <path d="M3 9l1.5-5h15L21 9" />
        <path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9z" />
        <path d="M5 13v8h14v-8M10 21v-5h4v5" />
      </>
    ),
  },
  form: {
    paths: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2.5" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
  },
  team: {
    paths: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
  },
  chart: {
    paths: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 6-6" />
      </>
    ),
  },
  spark: {
    paths: (
      <>
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
        <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
      </>
    ),
  },
  check: { strokeWidth: 2.6, paths: <path d="M5 12.5l4.5 4.5L19 7.5" /> },
  arrow: { strokeWidth: 2.2, paths: <path d="M5 12h14M13 6l6 6-6 6" /> },
  chev: { strokeWidth: 2.6, paths: <path d="M6 9l6 6 6-6" /> },
  building: {
    paths: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
      </>
    ),
  },
  star: { filled: true, paths: <path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6L2.5 9.3l6.6-.8z" /> },
  stage: {
    paths: (
      <>
        <path d="M3 20h18M5 20V9l7-5 7 5v11" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
  },
  booth: {
    paths: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  heart: {
    paths: <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1z" />,
  },
  bolt: { paths: <path d="M13 2L4 14h7l-1 8 9-12h-7z" /> },
  shield: {
    paths: (
      <>
        <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </>
    ),
  },
  book: { paths: <path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5A2.5 2.5 0 0 0 4 21.5 2.5 2.5 0 0 0 6.5 24" /> },
  play: {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8.5l5.5 3.5-5.5 3.5z" />
      </>
    ),
  },
  help: {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.6 2.6 0 0 1 5 1c0 1.8-2.5 2.2-2.5 4M12 17.5h.01" />
      </>
    ),
  },
  phone: {
    paths: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    ),
  },
  mail: {
    paths: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M3.5 7l8.5 6 8.5-6" />
      </>
    ),
  },
  pin: {
    paths: (
      <>
        <path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  clock: {
    paths: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  send: { paths: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /> },
  plug: {
    paths: (
      <>
        <path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0z" />
        <path d="M12 18v4" />
      </>
    ),
  },
}

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
}

export function Icon({ name, size = 16, ...rest }: IconProps) {
  const def = ICONS[name]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...(def.filled
        ? { fill: 'currentColor' }
        : {
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: def.strokeWidth ?? 2,
            strokeLinecap: 'round' as const,
            strokeLinejoin: 'round' as const,
          })}
      {...rest}
    >
      {def.paths}
    </svg>
  )
}
