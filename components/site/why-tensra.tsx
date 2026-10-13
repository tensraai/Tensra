import { Activity, Cable, FileCheck2, ShieldCheck, UserCheck, Wrench } from 'lucide-react'
import { StaggerItem, StaggerList } from './motion'

const reasons = [
  { icon: UserCheck, title: 'Direct access to the engineering team', body: 'You speak with the people who design and build your system. No account managers in between.' },
  { icon: Wrench, title: 'Built around your existing systems', body: 'We work with the CRM, ERP and tools you already use rather than asking you to replace them.' },
  { icon: Cable, title: 'Integration-first engineering', body: 'APIs, data mapping and failure handling come first, so AI has reliable data to work with.' },
  { icon: FileCheck2, title: 'AI with validation and oversight', body: 'Rules validate AI output and humans approve consequential actions. AI never runs unchecked.' },
  { icon: ShieldCheck, title: 'Security considered from the start', body: 'Permissions, secrets handling, audit trails and private deployment options are part of the design.' },
  { icon: Activity, title: 'Production deployment & documentation', body: 'Systems ship with monitoring, alerting and documentation your team can maintain.' },
]

export function WhyTensra() {
  return (
    <StaggerList className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {reasons.map((r) => {
        const Icon = r.icon
        return (
          <StaggerItem key={r.title} className="group relative border-t border-border pt-6">
            <span
              className="absolute left-0 top-[-1px] h-px w-0 bg-gradient-to-r from-primary to-transparent transition-[width] duration-700 ease-out group-hover:w-full"
              aria-hidden="true"
            />
            <span className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:border-primary/50 group-hover:bg-primary/15 group-hover:shadow-[0_0_24px_-4px_rgba(26,197,255,0.6)]">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
          </StaggerItem>
        )
      })}
    </StaggerList>
  )
}
