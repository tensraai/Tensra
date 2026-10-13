import type { Metadata } from 'next'
import { ButtonLink, PageHero, Section, SectionHeading } from '@/components/site/primitives'
import { ServiceCards } from '@/components/site/service-cards'
import { ProcessTimeline } from '@/components/site/process-timeline'
import { CtaSection } from '@/components/site/cta-section'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'CRM & ERP integration, AI workflow automation, AI agents and AI product engineering from Tensra AI.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Engineering services for connected, AI-enabled operations."
        description="Every engagement starts with your existing systems and a specific workflow. We design, build, deploy and monitor the result."
        breadcrumbs={[{ label: 'Services' }]}
        actions={
          <>
            <ButtonLink href="/contact" arrow>Discuss a Project</ButtonLink>
            <ButtonLink href="/solutions" variant="ghost">Browse solutions</ButtonLink>
          </>
        }
      />
      <Section labelledBy="svc-title">
        <h2 id="svc-title" className="sr-only">All services</h2>
        <ServiceCards />
      </Section>
      <Section tone="alt" labelledBy="proc-title">
        <SectionHeading id="proc-title" eyebrow="How every engagement runs" title="Six steps from problem to production." />
        <ProcessTimeline />
      </Section>
      <CtaSection />
    </>
  )
}
