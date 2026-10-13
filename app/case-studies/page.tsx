import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FlaskConical } from 'lucide-react'
import { PageHero, Section, SectionHeading } from '@/components/site/primitives'
import { BriklineFeature } from '@/components/site/brikline-feature'
import { CtaSection } from '@/components/site/cta-section'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Production systems engineered by Tensra AI, including Brikline, a connected operations platform for residential construction.',
  alternates: { canonical: '/case-studies' },
}

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Work running in production."
        description="We only publish systems we have actually built and deployed. Demos are clearly labeled as demos."
        breadcrumbs={[{ label: 'Case Studies' }]}
      />
      <Section labelledBy="featured-title">
        <h2 id="featured-title" className="sr-only">Featured case study</h2>
        <BriklineFeature />
      </Section>
      <Section tone="alt" labelledBy="demo-link-title">
        <SectionHeading id="demo-link-title" eyebrow="Interactive" title="See how we approach integrations." />
        <Link
          href="/demo"
          className="group flex flex-col justify-between gap-6 rounded-3xl border border-border bg-background p-7 transition-colors hover:border-primary/40 md:flex-row md:items-center md:p-9"
        >
          <div className="flex gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-warning/40 bg-warning/10 text-warning">
              <FlaskConical className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-semibold">CRM to ERP integration demo</h3>
              <p className="mt-1 text-muted-foreground">A simulated walkthrough with sample data, including failure recovery and duplicate prevention.</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 font-semibold text-primary">
            Open demo <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>
      </Section>
      <CtaSection />
    </>
  )
}
