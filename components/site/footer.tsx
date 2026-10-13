import Link from 'next/link'
import { Logo } from './logo'
import { services, site } from '@/lib/site'

const columns = [
  {
    title: 'Services',
    links: services.map((s) => ({ label: s.shortTitle, href: s.href })),
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'How we work', href: '/process' },
      { label: 'Case studies', href: '/case-studies' },
      { label: 'Solutions', href: '/solutions' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'CRM to ERP demo', href: '/demo' },
      { label: 'Brikline case study', href: '/case-studies/brikline' },
      { label: 'Start a project', href: '/contact' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#06080d]">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">{site.tagline}</p>
          <div className="mt-6 flex flex-col gap-2 text-sm">
            <a href={`mailto:${site.email}`} className="w-fit text-foreground hover:text-primary">
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-muted-foreground hover:text-primary"
            >
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {col.title}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-foreground/85 hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-2 px-5 py-6 text-xs text-muted-foreground md:flex-row md:px-8">
          <p>&copy; {new Date().getFullYear()} Tensra AI. All rights reserved.</p>
          <p>Designed and engineered by the Tensra founding team.</p>
        </div>
      </div>
    </footer>
  )
}
