import type { Metadata } from 'next'
import { HomeHero } from '@/components/home/hero'
import { ProblemSolution } from '@/components/home/problem-solution'
import { ButtonLink, Section, SectionHeading } from '@/components/site/primitives'
import { WorkflowExplorer } from '@/components/site/workflow-explorer'
import { ServiceCards } from '@/components/site/service-cards'
import { UseCaseCard } from '@/components/site/use-case-card'
import { CrmErpDemo } from '@/components/site/crm-erp-demo'
import { BriklineFeature } from '@/components/site/brikline-feature'
import { ProcessTimeline } from '@/components/site/process-timeline'
import { WhyTensra } from '@/components/site/why-tensra'
import { CtaSection } from '@/components/site/cta-section'
import { homeWorkflow } from '@/lib/workflows'
import { useCases } from '@/lib/site'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const featuredUseCases = ['crm-to-erp-orders', 'invoice-extraction', 'lead-routing', 'quote-comparison', 'knowledge-assistant', 'saas-ai-features']

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProblemSolution />

      <Section labelledBy="workflow-title">
        <SectionHeading
          id="workflow-title"
          eyebrow="How a workflow runs"
          title="From an inbox message to a verified ERP update."
          description="Select each step to see what happens, and where AI, deterministic rules and people each take responsibility."
        />
        <WorkflowExplorer steps={homeWorkflow} label="home" />
      </Section>

      <Section tone="alt" labelledBy="services-title">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Services"
            title="Four ways we engineer AI into your operations."
            className="mb-0 md:mb-0"
          />
          <ButtonLink href="/services" variant="ghost" arrow className="mb-12 w-fit md:mb-16">
            All services
          </ButtonLink>
        </div>
        <ServiceCards />
      </Section>

      <Section labelledBy="usecases-title">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="usecases-title"
            eyebrow="Real-world use cases"
            title="Practical automations, not science projects."
            description="Each one pairs a clear problem with an engineered workflow and a realistic benefit."
            className="mb-0 md:mb-0"
          />
          <ButtonLink href="/solutions" variant="ghost" arrow className="mb-12 w-fit md:mb-16">
            Browse all solutions
          </ButtonLink>
        </div>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredUseCases.map((id) => {
            const uc = useCases.find((u) => u.id === id)!
            return (
              <li key={id}>
                <UseCaseCard uc={uc} />
              </li>
            )
          })}
        </ul>
      </Section>

      <Section tone="alt" id="live-demo" labelledBy="demo-title" className="scroll-mt-16">
        <SectionHeading
          id="demo-title"
          eyebrow="Live demo"
          title="Watch a CRM deal become an ERP sales order."
          description="Run the normal path, then simulate an ERP outage or a duplicate deal to see how a well-engineered integration recovers."
        />
        <CrmErpDemo />
      </Section>

      <Section labelledBy="work-title">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="work-title"
            eyebrow="Case studies"
            title="Systems running in production."
            className="mb-0 md:mb-0"
          />
          <ButtonLink href="/case-studies" variant="ghost" arrow className="mb-12 w-fit md:mb-16">
            All case studies
          </ButtonLink>
        </div>
        <BriklineFeature />
      </Section>

      <Section tone="alt" labelledBy="process-title">
        <SectionHeading
          id="process-title"
          eyebrow="How we work"
          title="A clear engineering process, from first call to monitoring."
        />
        <ProcessTimeline />
      </Section>

      <Section labelledBy="why-title">
        <SectionHeading id="why-title" eyebrow="Why Tensra AI" title="Engineering you can rely on after launch." />
        <WhyTensra />
      </Section>

      <CtaSection />
    </>
  )
}
