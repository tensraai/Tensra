'use client'

import { useState } from 'react'
import {
  Activity,
  Bell,
  Brain,
  CheckCircle2,
  Database,
  FileSearch,
  GitBranch,
  Mail,
  Scale,
  Send,
  ShieldCheck,
  UserCheck,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const icons: Record<string, LucideIcon> = {
  mail: Mail,
  brain: Brain,
  users: Users,
  scale: Scale,
  database: Database,
  approve: UserCheck,
  monitor: Activity,
  zap: Zap,
  search: FileSearch,
  branch: GitBranch,
  send: Send,
  shield: ShieldCheck,
  bell: Bell,
  check: CheckCircle2,
}

export type WorkflowStep = {
  title: string
  icon: keyof typeof icons | string
  kind: 'Trigger' | 'AI' | 'Rule' | 'System' | 'Human' | 'Monitor'
  detail: string
  example?: string
}

const kindStyle: Record<WorkflowStep['kind'], string> = {
  Trigger: 'text-[#9ba5c0] border-white/15',
  AI: 'text-primary border-primary/40',
  Rule: 'text-[#c3cad9] border-white/20',
  System: 'text-[#8fa0c4] border-[#6b7591]/60',
  Human: 'text-warning border-warning/40',
  Monitor: 'text-success border-success/40',
}

export function WorkflowExplorer({
  steps,
  label,
}: {
  steps: WorkflowStep[]
  label: string
}) {
  const [active, setActive] = useState(0)
  const step = steps[active]
  const ActiveIcon = icons[step.icon] ?? Zap

  return (
    <div className="rounded-3xl border border-border bg-[#0a0d15] p-4 md:p-8">
      <div
        role="tablist"
        aria-label={label}
        className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0"
      >
        {steps.map((s, i) => {
          const Icon = icons[s.icon] ?? Zap
          const selected = i === active
          return (
            <div key={s.title} className="flex flex-col md:flex-1 md:flex-row md:items-center">
              <button
                type="button"
                role="tab"
                id={`wf-tab-${label}-${i}`}
                aria-selected={selected}
                aria-controls={`wf-panel-${label}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault()
                    const next = (i + 1) % steps.length
                    setActive(next)
                    document.getElementById(`wf-tab-${label}-${next}`)?.focus()
                  }
                  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault()
                    const prev = (i - 1 + steps.length) % steps.length
                    setActive(prev)
                    document.getElementById(`wf-tab-${label}-${prev}`)?.focus()
                  }
                }}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all md:flex-col md:items-center md:p-4 md:text-center',
                  selected
                    ? 'border-primary/60 bg-primary/[0.08] shadow-[0_0_30px_-10px_rgba(26,197,255,0.7)]'
                    : 'border-border bg-white/[0.02] hover:border-white/20',
                )}
              >
                <span
                  className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-lg border transition-colors',
                    selected ? 'border-primary/50 bg-primary/15 text-primary' : 'border-border text-muted-foreground',
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="block text-sm font-medium leading-snug">{s.title}</span>
                </span>
              </button>
              {i < steps.length - 1 && (
                <span
                  className="mx-auto h-3 w-px bg-gradient-to-b from-primary/50 to-white/10 md:mx-0 md:h-px md:w-4 md:shrink-0 md:bg-gradient-to-r"
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}
      </div>

      <div
        id={`wf-panel-${label}`}
        role="tabpanel"
        aria-labelledby={`wf-tab-${label}-${active}`}
        aria-live="polite"
        className="mt-6 grid gap-6 rounded-2xl border border-border bg-white/[0.02] p-6 md:grid-cols-[auto_1fr_1fr] md:items-start"
      >
        <span className="flex size-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
          <ActiveIcon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <span
            className={cn(
              'inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider',
              kindStyle[step.kind],
            )}
          >
            {step.kind === 'AI' ? 'AI step' : step.kind === 'Human' ? 'Human checkpoint' : `${step.kind} step`}
          </span>
          <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">{step.detail}</p>
        </div>
        {step.example && (
          <pre className="overflow-x-auto rounded-xl border border-border bg-black/40 p-4 font-mono text-xs leading-relaxed text-[#c3cad9]">
            <code>{step.example}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
