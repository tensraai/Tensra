import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const briklineFlow = [
  'Email AI intake',
  'Leads & projects',
  'Procurement & quotes',
  'Purchase orders',
  'Invoices & Xero',
  'Scheduling & site ops',
  'Client portal',
]

export function BriklineFeature() {
  return (
    <article className="grid overflow-hidden rounded-3xl border border-border bg-[#0c1019] lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col p-7 md:p-10">
        <span className="w-fit rounded-full border border-success/40 bg-success/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-success">
          Production system
        </span>
        <h3 className="mt-6 text-3xl font-semibold">Brikline</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Built and deployed by Tensra AI for a residential homebuilder.
        </p>
        <p className="mt-5 leading-relaxed text-foreground/85">
          Connected operations for residential construction: email intake, procurement, accounting, scheduling
          and site operations in one system, with human approval where it applies.
        </p>
        <ul className="mt-6 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <li>AI email classification</li>
          <li>Quote comparison & POs</li>
          <li>Invoice matching, synced with Xero</li>
          <li>Dependency-aware scheduling</li>
        </ul>
        <Link
          href="/case-studies/brikline"
          className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-semibold text-primary hover:underline"
        >
          Read the case study <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="relative border-t border-border bg-[#f8f8f8] p-7 md:p-10 lg:border-l lg:border-t-0">
        <div className="flex h-full flex-col">
          <Image
            src="/images/brikline-logo.png"
            alt="Brikline logo"
            width={500}
            height={333}
            className="mx-auto h-28 w-auto object-contain"
          />
          <ol className="mt-6 grid gap-2" aria-label="Brikline simplified workflow">
            {briklineFlow.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-3 rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm text-ink shadow-sm"
              >
                <span className="font-mono text-xs text-[#e8731f]">{String(i + 1).padStart(2, '0')}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  )
}
