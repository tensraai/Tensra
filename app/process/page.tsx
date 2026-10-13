import type { Metadata } from 'next'
import { ButtonLink, Faq, PageHero, Section, SectionHeading } from '@/components/site/primitives'
import { ProcessTimeline } from '@/components/site/process-timeline'
import { CtaSection } from '@/components/site/cta-section'

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'The Tensra AI engineering process: discover, map systems, design architecture, build and test, deploy and document, monitor and improve.',
  alternates: { canonical: '/process' },
}

const faq = [
  { q: 'What does the first conversation involve?', a: 'A call with the engineers who would build your system. We discuss the workflow, the tools involved and what success looks like. There is no obligation.' },
  { q: 'Do you start with a fixed scope?', a: 'We start by mapping systems and requirements, then propose a scope and architecture. Larger projects are delivered in increments so you see working software early.' },
  { q: 'Where is the system deployed?', a: 'On your cloud account, a private environment, or infrastructure we manage. We design around your security and data residency requirements.' },
  { q: 'What happens after launch?', a: 'We monitor the system, fix issues and iterate as your processes change. You also receive documentation so your team can maintain it.' },
]

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="A clear process from first call to monitoring."
        description="No black boxes. You see the design, the trade-offs and the working system at every stage."
        breadcrumbs={[{ label: 'How We Work' }]}
        actions={<ButtonLink href="/contact" arrow>Start with a call</ButtonLink>}
      />
      <Section labelledBy="steps-title">
        <h2 id="steps-title" className="sr-only">Process steps</h2>
        <ProcessTimeline />
      </Section>
      <Section tone="alt" labelledBy="pfaq-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading id="pfaq-title" eyebrow="FAQ" title="Working with us." className="mb-0" />
          <Faq items={faq} />
        </div>
      </Section>
      <CtaSection />
    </>
  )
}
