import { createFileRoute } from "@tanstack/react-router";
import { Building2, Truck, Factory, Briefcase, Check } from "lucide-react";
import { SiteLayout, PageHead, ContactBand, IconBox } from "@/components/site";
import { INDUSTRIES } from "@/lib/content";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions & Industries — Tensra AI" },
      { name: "description", content: "Integration and automation solutions for construction, distribution, manufacturing and professional services." },
      { property: "og:title", content: "Solutions & Industries — Tensra AI" },
      { property: "og:description", content: "Industry-specific integration solutions built around your operations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Solutions,
});

const ICONS = [Building2, Truck, Factory, Briefcase];

function Solutions() {
  return (
    <SiteLayout>
      <PageHead label="Solutions & Industries" title="Built for operations-heavy industries." lede="Where orders, documents and money move between many systems, small gaps become large costs. These are the industries where we focus." />
      <section className="mx-auto grid max-w-[1240px] gap-6 px-6 py-16 md:grid-cols-2">
        {INDUSTRIES.map((x, i) => {
          const I = ICONS[i]!;
          return (
            <article key={x.t} className="rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:shadow-md">
              <IconBox><I className="size-5" /></IconBox>
              <h2 className="mt-5 text-2xl font-semibold text-navy">{x.t}</h2>
              <p className="mt-2 text-muted-foreground">{x.d}</p>
              <div className="mt-6 border-t border-border pt-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Typical solutions</div>
                <ul className="mt-3 space-y-2 text-sm">{x.ex.map((e) => <li key={e} className="flex gap-2"><Check className="mt-0.5 size-4 text-primary" />{e}</li>)}</ul>
              </div>
            </article>
          );
        })}
      </section>
      <ContactBand />
    </SiteLayout>
  );
}
