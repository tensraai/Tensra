import Link from 'next/link'
import { ArrowRight, ChevronRight, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FloatIn, HeroItem, HeroSequence, Reveal, Tilt } from './motion'

type ButtonLinkProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost' | 'ink'
  className?: string
  arrow?: boolean
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
  arrow,
}: ButtonLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')
  const classes = cn(
    'group relative isolate inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-sm font-semibold transition-all duration-300 active:scale-[0.97]',
    variant === 'primary' &&
      "bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(26,197,255,0.4),0_8px_30px_-8px_rgba(26,197,255,0.6)] before:absolute before:inset-y-0 before:-left-1/2 before:-z-10 before:w-1/3 before:skew-x-[-20deg] before:bg-white/40 before:transition-transform before:duration-700 before:content-[''] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(26,197,255,0.6),0_14px_40px_-8px_rgba(26,197,255,0.8)] hover:before:translate-x-[450%]",
    variant === 'ghost' &&
      'border border-white/15 bg-white/[0.03] text-foreground hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.06]',
    variant === 'ink' && 'bg-ink text-white hover:-translate-y-0.5 hover:bg-ink/90',
    className,
  )
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  )
  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 md:px-8', className)}>{children}</div>
}

export function Section({
  className,
  children,
  tone = 'dark',
  id,
  labelledBy,
}: {
  className?: string
  children: React.ReactNode
  tone?: 'dark' | 'alt' | 'light'
  id?: string
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'lazy-section py-20 md:py-28',
        tone === 'alt' && 'border-y border-border bg-[#0b0e16]',
        tone === 'light' && 'bg-paper text-ink',
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={cn(
        'mb-4 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em]',
        light ? 'text-accent-ink' : 'text-primary',
      )}
    >
      <span className={cn('h-px w-6', light ? 'bg-accent-ink' : 'bg-primary')} aria-hidden="true" />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  light,
  center,
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  id?: string
  light?: boolean
  center?: boolean
  className?: string
}) {
  return (
    <Reveal className={cn('mb-12 max-w-2xl md:mb-16', center && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-3xl font-semibold leading-[1.1] md:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed md:text-lg',
            light ? 'text-ink-muted' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="rounded hover:text-foreground">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />
            {item.href ? (
              <Link href={item.href} className="rounded hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  visual,
}: {
  eyebrow: string
  title: React.ReactNode
  description: React.ReactNode
  breadcrumbs: { label: string; href?: string }[]
  actions?: React.ReactNode
  visual?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        aria-hidden="true"
      />
      <Container className="relative py-16 md:py-24">
        <Breadcrumbs items={breadcrumbs} />
        <div
          className={cn(
            'grid items-center gap-12',
            visual ? 'lg:grid-cols-[1.05fr_1fr]' : 'max-w-3xl',
          )}
        >
          <HeroSequence>
            <HeroItem>
              <Eyebrow>{eyebrow}</Eyebrow>
            </HeroItem>
            <HeroItem>
              <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl">{title}</h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            </HeroItem>
            {actions && (
              <HeroItem>
                <div className="mt-9 flex flex-wrap gap-3">{actions}</div>
              </HeroItem>
            )}
          </HeroSequence>
          {visual && (
            <FloatIn className="min-w-0">
              <Tilt>{visual}</Tilt>
            </FloatIn>
          )}
        </div>
      </Container>
    </section>
  )
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((item) => (
        <details
          key={item.q}
          className="group px-6 py-5 transition-colors duration-300 open:bg-white/[0.02] hover:bg-white/[0.015] [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded font-medium">
            {item.q}
            <Plus
              className="size-5 shrink-0 text-primary transition-transform group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  )
}

export function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-gradient-to-b from-white/[0.035] to-transparent p-6 transition-[border-color,box-shadow] duration-500 hover:border-primary/25 hover:shadow-[0_20px_60px_-30px_rgba(26,197,255,0.3)] md:p-8',
        className,
      )}
    >
      {children}
    </div>
  )
}
