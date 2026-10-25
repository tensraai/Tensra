import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Menu, X, Mail, Linkedin } from "lucide-react";
import { Reveal } from "@/components/motion";

export const EMAIL = "hello@tensraai.com";
export const LINKEDIN = "https://www.linkedin.com/company/tensra/";

export function Logo({ className = "size-7", light = false }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {[2, 31, 60, 89].map((x) => <rect key={x} x={x} y="2" width="24" height="24" rx="5" fill={light ? "var(--silver)" : "currentColor"} />)}
      <rect x="31" y="31" width="24" height="24" rx="5" fill="var(--signal)" />
      <rect x="31" y="60" width="24" height="24" rx="5" fill="var(--steel)" />
      <rect x="31" y="89" width="24" height="24" rx="5" fill="var(--slate)" />
    </svg>
  );
}

export const NAV = [
  { to: "/services", label: "Services" },
  { to: "/solutions", label: "Solutions & Industries" },
  { to: "/work", label: "Case Studies" },
  { to: "/engagement", label: "Engagement Models" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md active:translate-y-px";
export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary hover:text-primary";
export const btnLine =
  "inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:gap-2.5";

export function Badge({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return <span className={`block text-[11px] font-semibold uppercase tracking-wider ${tone === "dark" ? "text-signal" : "text-primary"}`}>{children}</span>;
}

export function IconBox({ children }: { children: ReactNode }) {
  return <div className="flex size-11 items-center justify-center rounded-lg border border-accent bg-accent text-primary">{children}</div>;
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5 text-base font-semibold tracking-tight text-navy">
            <Logo /> Tensra AI
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {NAV.filter((n) => n.to !== "/contact").map((n) => (
              <Link key={n.to} to={n.to} className="text-muted-foreground transition hover:text-foreground" activeProps={{ className: "!text-primary" }}>{n.label}</Link>
            ))}
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            <Link to="/contact" className={btnPrimary + " py-2.5"}>Discuss a Project</Link>
          </div>
          <button onClick={() => setMenu(true)} aria-label="Open menu" className="rounded-md p-2 hover:bg-muted lg:hidden"><Menu className="size-5" /></button>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-navy/50 animate-in fade-in" onClick={() => setMenu(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-background shadow-2xl animate-in slide-in-from-right">
            <div className="flex h-16 items-center justify-between border-b border-border px-6">
              <span className="flex items-center gap-2.5 font-semibold text-navy"><Logo /> Tensra AI</span>
              <button onClick={() => setMenu(false)} aria-label="Close menu" className="rounded-md p-2 hover:bg-muted"><X className="size-5" /></button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
              {NAV.filter((n) => n.to !== "/contact").map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setMenu(false)} className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium hover:bg-muted" activeProps={{ className: "bg-accent text-accent-foreground" }}>
                  {n.label} <ArrowRight className="size-4 text-muted-foreground" />
                </Link>
              ))}
            </nav>
            <div className="border-t border-border p-4">
              <Link to="/contact" onClick={() => setMenu(false)} className={btnPrimary + " w-full"}>Discuss a Project</Link>
              <a href={`mailto:${EMAIL}`} className="mt-3 block text-center text-sm text-muted-foreground">{EMAIL}</a>
            </div>
          </div>
        </div>
      )}

      <main>{children}</main>

      <footer className="bg-navy text-on-navy">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5 text-lg font-semibold"><Logo light /> Tensra AI</div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-navy/60">Enterprise AI and ERP systems integration engineering. Designed and built by the founding engineers.</p>
          </div>
          <FooterCol title="Services" links={[["/services", "ERP & CRM Integration"], ["/services", "Document Processing"], ["/services", "AI Workflow Automation"], ["/services", "Custom Middleware"]]} />
          <FooterCol title="Solutions" links={[["/solutions", "Construction & Real Estate"], ["/solutions", "Distribution & Logistics"], ["/solutions", "Manufacturing"], ["/solutions", "Professional Services"]]} />
          <FooterCol title="Company" links={[["/about", "About Us"], ["/work", "Case Studies"], ["/engagement", "Engagement Models"], ["/contact", "Contact"]]} />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-on-navy/50">Contact</h4>
            <a href={`mailto:${EMAIL}`} className="mt-4 flex items-center gap-2 text-sm hover:text-signal"><Mail className="size-4" />{EMAIL}</a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-2 text-sm text-on-navy/70 hover:text-signal"><Linkedin className="size-4" />LinkedIn</a>
            <Link to="/contact" className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Discuss a Project</Link>
          </div>
        </div>
        <div className="border-t border-on-navy/10">
          <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-3 px-6 py-6 text-xs text-on-navy/50 sm:flex-row">
            <span>© 2026 Tensra AI. All rights reserved.</span>
            <span className="flex items-center gap-2"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" /><span className="relative size-2 rounded-full bg-success" /></span>All systems operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-on-navy/50">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map(([to, l]) => <li key={l}><Link to={to} className="text-on-navy/75 hover:text-signal">{l}</Link></li>)}
      </ul>
    </div>
  );
}

export function PageHead({ label, title, lede }: { label: string; title: ReactNode; lede?: string }) {
  return (
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto max-w-[1240px] px-6 py-14 md:py-16">
        <Reveal>
          <Badge>{label}</Badge>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] text-navy md:text-6xl">{title}</h1>
          {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lede}</p>}
        </Reveal>
      </div>
    </section>
  );
}

export function Section({ label, title, lede, children, tone = "white", id }: { label?: string; title?: ReactNode; lede?: string; children: ReactNode; tone?: "white" | "slate" | "navy"; id?: string }) {
  const bg = tone === "slate" ? "bg-secondary border-y border-border" : tone === "navy" ? "bg-navy text-on-navy" : "";
  return (
    <section id={id} className={bg}>
      <div className="mx-auto max-w-[1240px] px-6 py-14 md:py-16">
        {(label || title) && (
          <div className="mb-10 max-w-3xl">
            {label && <div className={`text-xs font-semibold uppercase tracking-[0.14em] ${tone === "navy" ? "text-signal" : "text-primary"}`}>{label}</div>}
            {title && <h2 className={`mt-3 text-3xl font-semibold leading-tight md:text-[42px] ${tone === "navy" ? "" : "text-navy"}`}>{title}</h2>}
            {lede && <p className={`mt-4 text-lg leading-relaxed ${tone === "navy" ? "text-on-navy/65" : "text-muted-foreground"}`}>{lede}</p>}
          </div>
        )}
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}

/** Legacy alias kept for simple label + content blocks. */
export function Row({ label, children }: { label: string; children: ReactNode; className?: string }) {
  return <Section label={label}>{children}</Section>;
}

export function ContactBand() {
  return (
    <section className="px-6 py-16">
      <Reveal>
      <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 rounded-2xl bg-navy p-10 text-on-navy shadow-xl md:flex-row md:items-center md:p-14">
        <div>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">Ready to connect your systems?</h2>
          <p className="mt-3 max-w-xl text-on-navy/65">Book a 30-minute consultation with a founding engineer. We'll map your stack and recommend a practical path.</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link to="/contact" className={btnPrimary}>Schedule a Consultation <ArrowRight className="size-4" /></Link>
          <a href={`mailto:${EMAIL}`} className="inline-flex items-center justify-center rounded-lg border border-on-navy/20 px-5 py-3 text-sm font-semibold hover:bg-on-navy/10">Email us</a>
        </div>
      </div>
      </Reveal>
    </section>
  );
}
