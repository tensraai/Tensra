import { ArrowRight, Check, X } from 'lucide-react'
import { Section, SectionHeading } from '@/components/site/primitives'

const rows = [
  {
    before: 'Teams manually transfer data between applications.',
    after: 'Event-driven integrations move data the moment it changes, with field mapping and validation.',
    tag: 'Integration',
  },
  {
    before: 'Customer information becomes inconsistent across tools.',
    after: 'A defined source of truth per field, two-way sync and conflict rules keep records aligned.',
    tag: 'Validation',
  },
  {
    before: 'Documents and emails require repetitive processing.',
    after: 'AI classifies and extracts data; uncertain cases are routed to a person for review.',
    tag: 'Automation',
  },
  {
    before: 'Sales and operations use disconnected systems.',
    after: 'Closed deals become orders, orders become invoices, and every system reflects the same status.',
    tag: 'Integration',
  },
  {
    before: 'AI prototypes fail to integrate with real business processes.',
    after: 'AI actions run inside permissions, approvals and audit logs, connected to the tools you already use.',
    tag: 'Controlled AI',
  },
]

export function ProblemSolution() {
  return (
    <Section tone="light" labelledBy="problem-title">
      <SectionHeading
        light
        id="problem-title"
        eyebrow="The problem"
        title="Your business tools should work as one system."
        description="Most operational friction comes from the gaps between systems. We engineer those gaps away."
      />
      <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_30px_80px_-40px_rgba(11,16,32,0.35)]">
        <div className="hidden grid-cols-[1fr_auto_1.2fr] gap-6 border-b border-ink/10 bg-paper/60 px-8 py-4 font-mono text-xs uppercase tracking-widest text-ink-muted md:grid">
          <span>Today</span>
          <span className="w-8" />
          <span>With Tensra</span>
        </div>
        <ul className="divide-y divide-ink/10">
          {rows.map((r) => (
            <li
              key={r.before}
              className="grid gap-4 px-6 py-6 md:grid-cols-[1fr_auto_1.2fr] md:items-center md:gap-6 md:px-8"
            >
              <p className="flex gap-3 text-ink-muted">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#fde8e8] text-[#b42318]">
                  <X className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">Problem:</span>
                </span>
                {r.before}
              </p>
              <ArrowRight className="hidden size-5 text-accent-ink md:block" aria-hidden="true" />
              <div className="flex gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#dff5fd] text-accent-ink">
                  <Check className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">Solution:</span>
                </span>
                <div>
                  <p className="font-medium text-ink">{r.after}</p>
                  <span className="mt-2 inline-block rounded-full border border-ink/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                    {r.tag}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
