import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Database, FileText, Bot, Code2, ArrowRight } from "lucide-react";
import { SiteLayout, PageHead, ContactBand, IconBox, btnLine } from "@/components/site";
import { SERVICES, STACK } from "@/lib/content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Tensra AI" },
      { name: "description", content: "ERP & CRM integration, intelligent document processing, AI workflow automation and custom enterprise middleware." },
      { property: "og:title", content: "Services — Tensra AI" },
      { property: "og:description", content: "Four enterprise service pillars built around the systems you already use." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const ICONS = [Database, FileText, Bot, Code2];

function Services() {
  return (
    <SiteLayout>
      <PageHead label="Services" title="Enterprise integration and AI engineering services." lede="Four service pillars, each grounded in your existing CRM, ERP and finance platforms. We make them work as one system." />
      <section className="mx-auto max-w-[1240px] space-y-6 px-6 py-16">
        {SERVICES.map((s, i) => {
          const I = ICONS[i]!;
          return (
            <article key={s.n} id={s.key} className="grid gap-8 rounded-2xl border border-border bg-card p-8 shadow-sm md:grid-cols-[1fr_1fr] md:p-10">
              <div>
                <div className="flex items-center gap-4"><IconBox><I className="size-5" /></IconBox><span className="text-xs font-semibold uppercase tracking-wide text-primary">Pillar {s.n}</span></div>
                <h2 className="mt-5 text-3xl font-semibold text-navy">{s.t}</h2>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
              <div className="rounded-xl bg-secondary p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Capabilities</div>
                <ul className="mt-4 space-y-3">{s.pts.map((p) => <li key={p} className="flex gap-3 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{p}</li>)}</ul>
              </div>
            </article>
          );
        })}
        <div className="rounded-2xl border border-border bg-secondary p-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Platforms we integrate</div>
          <div className="mt-4 flex flex-wrap gap-2">{STACK.map((s) => <span key={s} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium shadow-sm">{s}</span>)}</div>
          <Link to="/contact" className={btnLine + " mt-6"}>Don't see your system? Ask us <ArrowRight className="size-4" /></Link>
        </div>
      </section>
      <ContactBand />
    </SiteLayout>
  );
}
