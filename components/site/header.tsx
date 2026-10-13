'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from './logo'
import { mainNav, services } from '@/lib/site'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  const ddRef = useRef<HTMLDivElement>(null)

  if (lastPath !== pathname) {
    setLastPath(pathname)
    setServicesOpen(false)
    setMobileOpen(false)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setServicesOpen(false)
        setMobileOpen(false)
      }
    }
    function onClick(e: MouseEvent) {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setServicesOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  const servicesActive = isActive(pathname, '/services')
  const linkClass = (active: boolean) =>
    cn(
      'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
    )

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5 md:px-8">
        <Logo />

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <Link href="/" className={linkClass(pathname === '/')} aria-current={pathname === '/' ? 'page' : undefined}>
                Home
              </Link>
            </li>
            <li>
              <div
                ref={ddRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  className={cn(linkClass(servicesActive), 'flex items-center gap-1')}
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  Services
                  <ChevronDown
                    className={cn('size-4 transition-transform', servicesOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id="services-menu"
                  className={cn(
                    'absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 transition-all duration-200',
                    servicesOpen
                      ? 'visible translate-y-0 opacity-100'
                      : 'invisible -translate-y-1 opacity-0',
                  )}
                >
                  <div className="rounded-2xl border border-border bg-popover p-2 shadow-2xl shadow-black/60">
                    <div className="grid grid-cols-2 gap-1">
                      {services.map((s) => {
                        const Icon = s.icon
                        return (
                          <Link
                            key={s.slug}
                            href={s.href}
                            className={cn(
                              'flex gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]',
                              pathname === s.href && 'bg-white/[0.05]',
                            )}
                          >
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                              <Icon className="size-4" aria-hidden="true" />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-foreground">
                                {s.shortTitle}
                              </span>
                              <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                                {s.menuBlurb}
                              </span>
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                    <Link
                      href="/services"
                      className="mt-1 flex items-center justify-between rounded-xl border-t border-border px-3 py-3 text-sm font-medium text-primary hover:bg-white/[0.04]"
                    >
                      View all services
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            {mainNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={linkClass(isActive(pathname, item.href))}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/#live-demo"
          className="hidden min-h-10 items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 text-sm font-semibold text-primary transition hover:bg-primary/20 lg:inline-flex"
        >
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Live Demo
        </Link>

        <Link
          href="/contact"
          className="hidden min-h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:brightness-110 lg:inline-flex"
        >
          Discuss a Project
        </Link>

        <button
          type="button"
          className="ml-auto flex size-11 items-center justify-center rounded-lg border border-border lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background px-5 pb-8 pt-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/" className="block rounded-lg px-3 py-3 font-medium" aria-current={pathname === '/' ? 'page' : undefined}>
                Home
              </Link>
            </li>
            <li>
              <p className="px-3 pb-1 pt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Services
              </p>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={s.href}
                      className={cn(
                        'block rounded-lg px-3 py-3',
                        pathname === s.href ? 'bg-white/[0.05] text-primary' : 'text-foreground',
                      )}
                    >
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services" className="block rounded-lg px-3 py-3 text-primary">
                    All services
                  </Link>
                </li>
              </ul>
            </li>
            {mainNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded-lg px-3 py-3 font-medium',
                    isActive(pathname, item.href) && 'bg-white/[0.05] text-primary',
                  )}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#live-demo"
            onClick={() => setMobileOpen(false)}
            className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 font-semibold text-primary"
          >
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
            Live Demo
          </Link>
          <Link
            href="/contact"
            className="mt-3 flex min-h-12 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground"
          >
            Discuss a Project
          </Link>
        </nav>
      )}
    </header>
  )
}
