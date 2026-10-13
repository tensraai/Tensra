import Link from 'next/link'
import { cn } from '@/lib/utils'

export function TensraMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={cn('size-8', className)} aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={2 + i * 29} y={2} width={24} height={24} rx={5} fill="#d9dadf" />
      ))}
      <rect x={31} y={31} width={24} height={24} rx={5} fill="#1ac5ff" />
      <rect x={31} y={60} width={24} height={24} rx={5} fill="#6b7591" />
      <rect x={31} y={89} width={24} height={24} rx={5} fill="#5a6480" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2.5 rounded-md', className)}
      aria-label="Tensra AI home"
    >
      <TensraMark />
      <span className="font-display text-lg font-bold tracking-wide">
        TENSRA <span className="text-primary">AI</span>
      </span>
    </Link>
  )
}
