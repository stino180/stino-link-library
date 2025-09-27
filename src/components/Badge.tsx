import { cn } from '@/lib/utils'

interface BadgeProps {
  variant: 'new' | 'wip' | 'drop'
  children: React.ReactNode
  className?: string
}

const badgeVariants = {
  new: 'bg-badge-new text-white',
  wip: 'bg-badge-wip text-black',
  drop: 'bg-badge-drop text-white',
}

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
        'shadow-sm border border-white/10',
        'backdrop-blur-sm',
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}