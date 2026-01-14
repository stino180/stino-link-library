import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'new' | 'wip' | 'drop'
  className?: string
}

export function Badge({ children, variant = 'new', className }: BadgeProps) {
  const variants = {
    new: 'bg-badge-new text-white',
    wip: 'bg-badge-wip text-white',
    drop: 'bg-badge-drop text-white',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-sm',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}