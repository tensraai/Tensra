import { processSteps } from '@/lib/site'

export function ProcessTimeline() {
  return (
    <ol className="relative grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {processSteps.map((s) => (
        <li key={s.n} className="group relative bg-background p-7 transition-colors hover:bg-[#0c1019] md:p-8">
          <div className="flex items-center gap-3">
            <span className="font-display text-4xl font-bold text-white/10 transition-colors group-hover:text-primary/70">
              {s.n}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" aria-hidden="true" />
          </div>
          <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
        </li>
      ))}
    </ol>
  )
}
