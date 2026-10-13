import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { services } from '@/lib/site'
import { Spotlight, StaggerItem, StaggerList } from './motion'

export function ServiceCards() {
  return (
    <StaggerList className="grid gap-4 md:grid-cols-2">
      {services.map((s, i) => {
        const Icon = s.icon
        return (
          <StaggerItem key={s.slug}>
            <Spotlight className="rounded-3xl">
              <Link
                href={s.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-[#0c1019] p-7 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_30px_80px_-30px_rgba(26,197,255,0.35)] md:p-9"
              >
                <div
                  className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(26,197,255,0.16),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 to-transparent text-primary transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.summary}</p>
                <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                  {s.capabilities.map((c, ci) => (
                    <li
                      key={c}
                      className="flex items-center gap-2.5 text-sm transition-transform duration-300 group-hover:translate-x-1"
                      style={{ transitionDelay: `${ci * 40}ms` }}
                    >
                      <Check className="size-4 text-primary" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-primary">
                  Explore Service
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Spotlight>
          </StaggerItem>
        )
      })}
    </StaggerList>
  )
}
