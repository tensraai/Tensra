import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { UseCase } from '@/lib/site'

export function UseCaseCard({ uc }: { uc: UseCase }) {
  return (
    <article
      id={uc.id}
      className="spotlight flex h-full scroll-mt-24 flex-col rounded-2xl border border-border bg-[#0c1019] p-6 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_60px_-28px_rgba(26,197,255,0.35)] target:border-primary/60"
    >
      <span className="w-fit rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {uc.category}
      </span>
      <h3 className="mt-4 text-lg font-semibold leading-snug">{uc.title}</h3>
      <dl className="mt-4 space-y-3 text-sm leading-relaxed">
        <div>
          <dt className="font-medium text-foreground/90">Problem</dt>
          <dd className="text-muted-foreground">{uc.problem}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground/90">Solution</dt>
          <dd className="text-muted-foreground">{uc.solution}</dd>
        </div>
      </dl>
      <ol className="mt-5 flex flex-wrap items-center gap-1.5" aria-label="Workflow">
        {uc.workflow.map((w, i) => (
          <li key={w} className="flex items-center gap-1.5">
            <span className="rounded-md bg-white/[0.05] px-2 py-1 text-[11px] text-foreground/85">{w}</span>
            {i < uc.workflow.length - 1 && <ArrowRight className="size-3 text-primary/70" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <p className="mt-5 border-t border-border pt-4 text-sm">
        <span className="font-medium text-primary">Benefit: </span>
        <span className="text-foreground/85">{uc.benefit}</span>
      </p>
      <Link href={uc.service} className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-primary hover:underline">
        Related service <ArrowRight className="size-3.5" aria-hidden="true" />
      </Link>
    </article>
  )
}
