import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface AppFrameProps {
  url: string
  children: ReactNode
  className?: string
}

/** Browser-window chrome that wraps every product screenshot recreation. */
export function AppFrame({ url, children, className }: AppFrameProps) {
  return (
    <div className={cn('min-w-0 overflow-hidden rounded-card-lg border border-line bg-paper text-[13px] shadow-lift', className)}>
      <div className="flex h-10 items-center gap-2 border-b border-line bg-[#FBF9F6] px-3.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <i className="size-2.5 rounded-full bg-[#E4DDD3]" />
          <i className="size-2.5 rounded-full bg-[#E4DDD3]" />
          <i className="size-2.5 rounded-full bg-[#E4DDD3]" />
        </div>
        <div className="ml-3 flex h-6 max-w-[320px] flex-1 items-center overflow-hidden rounded-[7px] bg-sand px-2.5 text-[11.5px] whitespace-nowrap text-muted">
          {url}
        </div>
      </div>
      {children}
    </div>
  )
}

/** Padded content area inside an <AppFrame>. Direct children are staggered in by GSAP. */
export function AppMain({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-app-main className={cn('grid min-w-0 gap-3.5 p-[18px]', className)} {...rest}>
      {children}
    </div>
  )
}
