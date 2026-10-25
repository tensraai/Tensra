import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Package, Users, ArrowRight } from "lucide-react";
import { SiteLayout, PageHead, Section, ContactBand, IconBox, btnPrimary } from "@/components/site";
import { PHASES } from "@/lib/content";

export const Route = createFileRoute("/engagement")({
  head: () => ({
    meta: [
      { title: "Engagement Models — Tensra AI" },
      { name: "description", content: "Turnkey project delivery or dedicated integration engineers, delivered through a structured four-phase framework." },
      { property: "og:title", content: "Engagement Models — Tensra AI" },
      { property: "og:description", content: "Two flexible engagement models and a four-phase delivery framework." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Engagement,
});

const MODELS = [
  { I: Package, t: "Turnkey Project Delivery", d: "End-to-end architecture, development, deployment and documentation for a dedicated business outcome.", best: "Best for a defined integration or automation goal.", pts: ["Fixed scope and milestones", "Architecture through go-live", "Full documentation & handover", "Optional ongoing SLA"] },
  { I: Users, t: "Dedicated Integration Engineers", d: "Senior engineers embedded into your internal tech and operations team to scale integration capacity.", best: "Best for continuous roadmaps and in-house teams.", pts: ["Senior engineers only", "Works in your tools & rituals", "Flexible monthly capacity", "Knowledge stays in your team"] },
];

function Engagement() {
  return (
    <SiteLayout>
      <PageHead label="Engagement Models" title="Two ways to work with Tensra." lede="Choose a defined project outcome or embed our engineers with your team. Both follow the same disciplined delivery framework." />
      <section className="mx-auto grid max-w-[1240px] gap-6 px-6 py-16 md:grid-cols-2">
        {MODELS.map(({ I, t, d, best, pts }) => (
          <article key={t} className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
            <IconBox><I className="size-5" /></IconBox>
            <h2 className="mt-5 text-2xl font-semibold text-navy">{t}</h2>
            <p className="mt-2 text-muted-foreground">{d}</p>
            <p className="mt-4 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground">{best}</p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">{pts.map((p) => <li key={p} className="flex gap-2"><Check className="mt-0.5 size-4 text-primary" />{p}</li>)}</ul>
            <Link to="/contact" className={btnPrimary + " mt-8 self-start"}>Discuss this model <ArrowRight className="size-4" /></Link>
          </article>
        ))}
      </section>
      <Section tone="slate" label="Delivery framework" title="Four phases, from audit to SLA">
        <ol className="space-y-4">
          {PHASES.map(([t, d, out], i) => (
            <li key={t} className="grid gap-4 rounded-xl border border-border bg-card p-6 shadow-sm md:grid-cols-[120px_1fr_1fr] md:items-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-primary">Phase {String(i + 1).padStart(2, "0")}</div>
              <div><h3 className="font-semibold text-navy">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
              <div className="flex flex-wrap gap-2">{out.map((o) => <span key={o} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium">{o}</span>)}</div>
            </li>
          ))}
        </ol>
      </Section>
      <ContactBand />
    </SiteLayout>
  );
}
