import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeftRight, Check, Database, FileText, Bot, Code2, ShieldCheck, Users, Package } from "lucide-react";
import { SiteLayout, ContactBand, Section, Badge, IconBox, btnPrimary, btnSecondary, btnLine } from "@/components/site";
import { Reveal } from "@/components/motion";
import { SERVICES, PHASES, INDUSTRIES } from "@/lib/content";
import { PLATFORMS } from "@/components/platform-logos";
import { BriklineCaseStudy } from "@/components/brikline-case-study";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tensra AI — Enterprise AI & ERP Systems Integration Engineering" },
      { name: "description", content: "Tensra AI designs, builds and operates automated data pipelines between your CRM, ERP, financial ledger and operational workflows." },
      { property: "og:title", content: "Tensra AI — Enterprise AI & ERP Systems Integration Engineering" },
      { property: "og:description", content: "Resilient integrations between CRM, ERP and finance. No more manual re-keying." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const ICONS = [Database, FileText, Bot, Code2];

function Layer({ title, items, tone }: { title: string; items: string[]; tone: "edge" | "core" }) {
  return (
    <div className={`rounded-xl border p-4 ${tone === "core" ? "border-primary/40 bg-navy text-on-navy shadow-lg" : "border-border bg-card shadow-sm"}`}>
      <div className={`text-[11px] font-semibold uppercase tracking-wider ${tone === "core" ? "text-signal" : "text-muted-foreground"}`}>{title}</div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {items.map((i) => (
          <div key={i} className={`flex items-center justify-between rounded-md px-2.5 py-2 text-xs font-medium ${tone === "core" ? "bg-on-navy/5" : "bg-secondary"}`}>
            {i}<span className="size-1.5 rounded-full bg-success" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Pathway({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-2 text-[11px] font-medium text-muted-foreground">
      <span className="h-6 w-px bg-primary/40" /><ArrowLeftRight className="size-3.5 rotate-90 text-primary" />{label}<span className="h-6 w-px bg-primary/40" />
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="rounded-2xl border border-border bg-secondary p-5 shadow-md" aria-label="Integration architecture diagram">
      <div className="mb-4 flex items-center justify-between text-xs">
        <span className="font-semibold text-navy">Reference integration architecture</span>
        <span className="flex items-center gap-1.5 text-success"><span className="size-1.5 rounded-full bg-success" />Healthy</span>
      </div>
      <Layer title="Sales & CRM layer" items={["Salesforce", "HubSpot", "Email intake", "Web forms"]} tone="edge" />
      <Pathway label="Accounts · Deals · Orders" />
      <div className="rounded-xl border border-primary/40 bg-navy p-4 text-on-navy shadow-lg">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-signal">Tensra integration & automation middleware</div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
          {["Schema mapping", "Validation rules", "Conflict resolution", "AI extraction", "Human approvals", "Retry & audit log"].map((r) => (
            <div key={r} className="flex items-center gap-1.5 rounded-md bg-on-navy/5 px-2 py-2"><Check className="size-3 shrink-0 text-signal" />{r}</div>
          ))}
        </div>
      </div>
      <Pathway label="Invoices · Inventory · Ledger" />
      <Layer title="Finance, operations & ERP layer" items={["NetSuite", "SAP Business One", "Dynamics 365", "Xero / QuickBooks"]} tone="edge" />
    </div>
  );
}

function Home() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-6 py-14 md:py-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal><Badge>Integration & AI engineering studio</Badge></Reveal>
            <Reveal delay={90} className="mt-4">
              <h1 className="text-[42px] font-semibold leading-[1.05] text-navy md:text-[60px]">
                Enterprise AI & ERP Systems <span className="text-primary">Integration Engineering</span>
              </h1>
            </Reveal>
            <Reveal delay={180} className="mt-6">
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                We design, build, and operate resilient automated data pipelines between your CRM, ERP, financial ledger, and operational workflows — eliminating manual data re-keying and accelerating business velocity.
              </p>
            </Reveal>
            <Reveal delay={260} className="mt-8">
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className={btnPrimary}>Schedule a Consultation <ArrowRight className="size-4" /></Link>
                <Link to="/work" className={btnSecondary}>Explore Client Work</Link>
              </div>
            </Reveal>
            <Reveal delay={340} className="mt-8">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {["Built by founding engineers", "Human-in-the-loop AI", "Private deployment options"].map((t) => <li key={t} className="flex items-center gap-2"><Check className="size-4 text-primary" />{t}</li>)}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={220}><ArchitectureDiagram /></Reveal>
        </div>
        <div className="relative border-t border-border bg-secondary/80">
          <Reveal>
            <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:gap-10">
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Platforms we integrate</span>
              <ul className="flex flex-wrap items-center gap-2.5">
                {PLATFORMS.map((p) => (
                  <li key={p.name} className="group flex items-center gap-2.5 rounded-lg border border-border bg-card py-2 pl-3.5 pr-4 shadow-sm transition hover:border-primary/50 hover:shadow-md">
                    <span className={`flex h-5 items-center justify-center transition duration-300 ${p.fullColor ? "" : "opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0"}`}>{p.mark}</span>
                    {p.label !== false && <span className="text-[13px] font-semibold text-navy/80">{p.name}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <Section label="Services" title="Four core service pillars" lede="Every engagement starts from the systems you already run. We make them work together — reliably, observably and securely.">
        <div className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((s, i) => {
            const I = ICONS[i]!;
            return (
              <article key={s.n} className="group rounded-xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <div className="flex items-start justify-between"><IconBox><I className="size-5" /></IconBox><span className="text-xs font-semibold text-muted-foreground">{s.n}</span></div>
                <h3 className="mt-5 text-xl font-semibold text-navy">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                <ul className="mt-5 space-y-2 text-sm">{s.pts.slice(0, 3).map((p) => <li key={p} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{p}</li>)}</ul>
              </article>
            );
          })}
        </div>
        <Link to="/services" className={btnLine + " mt-8"}>View full capabilities <ArrowRight className="size-4" /></Link>
      </Section>

      <Section tone="slate" label="Engagement models" title="Two flexible ways to work with us">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            [Package, "Turnkey Project Delivery", "End-to-end architecture, development, deployment and documentation for a defined business outcome."],
            [Users, "Dedicated Integration Engineers", "Senior engineers embedded into your internal tech and operations team to scale integration capacity."],
          ].map(([I, t, d]) => {
            const Icon = I as typeof Package;
            return (
              <div key={t as string} className="rounded-xl border border-border bg-card p-8 shadow-sm">
                <IconBox><Icon className="size-5" /></IconBox>
                <h3 className="mt-5 text-xl font-semibold text-navy">{t as string}</h3>
                <p className="mt-2 text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
        <Link to="/engagement" className={btnLine + " mt-8"}>Compare engagement models <ArrowRight className="size-4" /></Link>
      </Section>

      <Section tone="navy" label="Delivery framework" title="A structured four-phase delivery" lede="Predictable from the first audit to long-term production support.">
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PHASES.map(([t, d], i) => (
            <li key={t} className="rounded-xl border border-on-navy/10 bg-navy-2 p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-signal">Phase {String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-3 font-semibold leading-snug">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-on-navy/60">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="mx-auto max-w-[1240px] px-6 py-10 md:py-12">
        <Reveal>
          <div className="mb-6">
            <p className="text-xs font-semibold text-primary">Client Impact</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-navy md:text-[42px]">Production systems. Real business operations.</h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <BriklineCaseStudy compact />
        </Reveal>
      </section>

      <Section tone="slate" label="Industries" title="Industries we serve">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((x) => (
            <Link key={x.t} to="/solutions" className="rounded-xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md">
              <h3 className="font-semibold text-navy">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section label="Why Tensra">
        <div className="grid gap-8 md:grid-cols-3">
          {[[ShieldCheck, "Security by design", "Permissions, secrets handling, audit trails and private deployment options from day one."], [Users, "Direct engineer access", "You work with the people who design and build your system — no junior handoffs."], [Database, "Integration first", "Reliable data foundations come before AI, so automation has trustworthy inputs."]].map(([I, t, d]) => {
            const Icon = I as typeof ShieldCheck;
            return <div key={t as string} className="flex gap-4"><IconBox><Icon className="size-5" /></IconBox><div><h3 className="font-semibold text-navy">{t as string}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d as string}</p></div></div>;
          })}
        </div>
      </Section>

      <ContactBand />
    </SiteLayout>
  );
}
