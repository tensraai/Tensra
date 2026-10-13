import type { Metadata } from 'next'
import { ButtonLink, PageHero, Section } from '@/components/site/primitives'
import { SolutionsBrowser } from '@/components/site/solutions-browser'
import { CtaSection } from '@/components/site/cta-section'

export const metadata: Metadata = {
  title: 'Solutions & Use Cases',
  description:
    'Practical AI automation and integration use cases across sales, finance, procurement, documents, internal knowledge and SaaS products.',
  alternates: { canonical: '/solutions' },
}

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Use cases we engineer for real operations."
        description="Browse by department. Each use case shows the problem, the engineered workflow and the expected benefit."
        breadcrumbs={[{ label: 'Solutions' }]}
        actions={<ButtonLink href="/contact" arrow>Discuss your workflow</ButtonLink>}
      />
      <Section labelledBy="uc-title">
        <h2 id="uc-title" className="sr-only">Use cases</h2>
        <SolutionsBrowser />
      </Section>
      <CtaSection title="Don't see your workflow here?" description="Most of our work starts with a process that is specific to your business. Tell us about it." />
    </>
  )
}
