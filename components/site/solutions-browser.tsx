'use client'

import { useState } from 'react'
import { UseCaseCard } from './use-case-card'
import { useCaseCategories, useCases, type UseCaseCategory } from '@/lib/site'
import { cn } from '@/lib/utils'

export function SolutionsBrowser() {
  const [filter, setFilter] = useState<UseCaseCategory | 'All'>('All')
  const list = filter === 'All' ? useCases : useCases.filter((u) => u.category === filter)
  const options: (UseCaseCategory | 'All')[] = ['All', ...useCaseCategories]

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={filter === o}
            onClick={() => setFilter(o)}
            className={cn(
              'min-h-10 rounded-full border px-4 text-sm font-medium transition-colors',
              filter === o
                ? 'border-primary/60 bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-white/25 hover:text-foreground',
            )}
          >
            {o}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {list.length} use cases
      </p>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((uc) => (
          <li key={uc.id}>
            <UseCaseCard uc={uc} />
          </li>
        ))}
      </ul>
    </div>
  )
}
