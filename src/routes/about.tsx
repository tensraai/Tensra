import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHead, Section, ContactBand, EMAIL, LINKEDIN } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Tensra AI" },
      { name: "description", content: "Tensra AI is an engineering firm run by its founding engineers, building integrations and AI systems around the tools businesses already use." },
      { property: "og:title", content: "About Us — Tensra AI" },
      { property: "og:description", content: "Built by the founding engineers. No outsourcing, no junior handoffs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const PRINCIPLES = [
  ["Direct access to the engineers", "You speak with the people who design and build your system. No account managers in between."],
  ["Built around your existing systems", "We work with the CRM, ERP and tools you already use rather than asking you to replace them."],
  ["Integration first", "APIs, data mapping and failure handling come first, so AI has reliable data to work with."],
  ["AI with oversight", "Rules check AI output and people approve consequential actions."],
  ["Security from the start", "Permissions, secrets handling, audit trails and private deployment options are part of the design."],
  ["Maintainable after launch", "Systems ship with monitoring, alerting and documentation your team can maintain."],
] as const;

function About() {
  return (
    <SiteLayout>
      <PageHead label="About Us" title="Built by the founding engineers." lede="Tensra AI is an engineering firm building integrations, workflow automation and AI systems for businesses whose operations are spread across disconnected tools. No outsourcing, no junior handoffs." />
      <Section label="Our principles" title="How we work">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map(([t, d], i) => (
            <div key={t} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="text-xs font-semibold tracking-wide text-primary">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-3 font-semibold text-navy">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="slate" label="Get in touch">
        <a href={`mailto:${EMAIL}`} className="text-3xl font-semibold text-navy hover:text-primary md:text-4xl">{EMAIL}</a>
        <div className="mt-4"><a href={LINKEDIN} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary">Tensra AI on LinkedIn →</a></div>
      </Section>
      <ContactBand />
    </SiteLayout>
  );
}
