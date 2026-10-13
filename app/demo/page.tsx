import type { Metadata } from 'next'
import { PageHero, Section, SectionHeading } from '@/components/site/primitives'
import { CrmErpDemo } from '@/components/site/crm-erp-demo'
import { WorkflowExplorer } from '@/components/site/workflow-explorer'
import { CtaSection } from '@/components/site/cta-section'
import { crmErpWorkflow } from '@/lib/workflows'

export const metadata: Metadata = {
  title: 'CRM to ERP Integration Demo',
  description: 'An interactive, simulated CRM to ERP integration showing validation, customer matching, duplicate prevention and error recovery.',
  alternates: { canonical: '/demo' },
}

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Interactive demo"
        title="CRM to ERP, with the failure cases included."
        description="This is a simulation with sample data. It shows how we engineer an integration to validate data, prevent duplicates and recover from outages."
        breadcrumbs={[{ label: 'Demo' }]}
      />
      <Section labelledBy="run-title">
        <h2 id="run-title" className="sr-only">Run the demo</h2>
        <CrmErpDemo />
      </Section>
      <Section tone="alt" labelledBy="explain-title">
        <SectionHeading id="explain-title" eyebrow="Under the hood" title="What each step does." />
        <WorkflowExplorer steps={crmErpWorkflow} label="demo" />
      </Section>
      <CtaSection cta="Discuss an Integration" />
    </>
  )
}
