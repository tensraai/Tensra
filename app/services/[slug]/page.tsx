import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CircleAlert, ShieldCheck } from 'lucide-react'
import { ButtonLink, Faq, PageHero, Section, SectionHeading } from '@/components/site/primitives'
import { WorkflowExplorer } from '@/components/site/workflow-explorer'
import { CtaSection } from '@/components/site/cta-section'
import { UseCaseCard } from '@/components/site/use-case-card'
import { serviceContent } from '@/lib/service-content'
import { services, useCases } from '@/lib/site'

export function generateStaticParams() {
  return Object.keys(serviceContent).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = serviceContent[slug]
  if (!c) return {}
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/services/${slug}` },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = serviceContent[slug]
  const service = services.find((s) => s.slug === slug)
  if (!c || !service) notFound()
  const Icon = service.icon
  const related = useCases.filter((u) => u.service === service.href).slice(0, 3)
  const others = services.filter((s) => s.slug !== slug)

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.headline}
        description={c.intro}
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: service.shortTitle }]}
        actions={
          <>
            <ButtonLink href={`/contact?type=${c.contactType}`} arrow>
              Discuss Your Project
            </ButtonLink>
            <ButtonLink href="#workflow" variant="ghost">
              See the workflow
            </ButtonLink>
          </>
        }
        visual={
          <div className="rounded-3xl border border-border bg-[#0a0d15] p-7">
            <span className="flex size-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <CircleAlert className="size-3.5 text-warning" aria-hidden="true" />
              Sound familiar?
            </h2>
            <ul className="mt-4 space-y-3">
              {c.problems.map((p) => (
                <li key={p} className="rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-sm text-foreground/85">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section labelledBy="deliver-title">
        <SectionHeading id="deliver-title" eyebrow="What we deliver" title="Engineered for production, not just the demo." />
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {c.deliverables.map((d, i) => (
            <li key={d.title} className="bg-background p-7">
              <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-lg font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="alt" id="workflow" labelledBy="wf-title" className="scroll-mt-16">
        <SectionHeading
          id="wf-title"
          eyebrow="Example workflow"
          title={c.workflowTitle}
          description="Select a step to see what happens and who, or what, is responsible."
        />
        <WorkflowExplorer steps={c.workflow} label={slug} />
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Safeguards">
          {c.safeguards.map((s) => (
            <li key={s} className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-sm">
              <ShieldCheck className="size-4 text-success" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="tools-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading id="tools-title" eyebrow="Systems & tools" title="Works with what you already use." description={c.toolsNote} className="mb-0" />
          <ul className="flex flex-wrap content-start gap-2">
            {c.tools.map((t) => (
              <li key={t} className="rounded-xl border border-border bg-[#0c1019] px-4 py-2.5 text-sm font-medium">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="alt" labelledBy="rel-title">
          <SectionHeading id="rel-title" eyebrow="Use cases" title="Where this applies." />
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {related.map((uc) => (
              <li key={uc.id}>
                <UseCaseCard uc={uc} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section labelledBy="faq-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Common questions." className="mb-0" />
          <Faq items={c.faq} />
        </div>
      </Section>

      <Section tone="alt" labelledBy="other-title" className="py-16 md:py-20">
        <h2 id="other-title" className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Other services
        </h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {others.map((s) => (
            <li key={s.slug}>
              <Link href={s.href} className="group flex items-center justify-between rounded-2xl border border-border bg-background px-5 py-4 hover:border-primary/40">
                <span className="font-medium">{s.shortTitle}</span>
                <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection cta="Discuss Your Project" />
    </>
  )
}
