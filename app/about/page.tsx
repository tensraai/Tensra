import type { Metadata } from 'next'
import { ButtonLink, PageHero, Section, SectionHeading } from '@/components/site/primitives'
import { WhyTensra } from '@/components/site/why-tensra'
import { TensraMark } from '@/components/site/logo'
import { CtaSection } from '@/components/site/cta-section'

export const metadata: Metadata = {
  title: 'About',
  description: 'Tensra AI is an engineering-led company building AI systems and integrations that connect the software businesses already use.',
  alternates: { canonical: '/about' },
}

const beliefs = [
  { title: 'Integration before intelligence', body: 'AI is only as useful as the data and systems it can reach. We get the plumbing right first.' },
  { title: 'Rules decide, AI assists', body: 'Models read, extract and suggest. Business rules and people make consequential decisions.' },
  { title: 'Production is the goal', body: 'A demo is a starting point. We measure success by systems running reliably for real teams.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Tensra AI"
        title="An engineering team, not an agency."
        description="Tensra AI builds AI-powered integrations, workflows and software systems for businesses that run on many tools. You work directly with the founding engineers who design and build your system."
        breadcrumbs={[{ label: 'About' }]}
        actions={<ButtonLink href="/contact" arrow>Talk to the team</ButtonLink>}
        visual={
          <div className="flex aspect-square max-h-[420px] w-full items-center justify-center rounded-3xl border border-border bg-[#0a0d15]">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse-node rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
              <TensraMark className="relative size-40" />
            </div>
          </div>
        }
      />
      <Section labelledBy="beliefs-title">
        <SectionHeading id="beliefs-title" eyebrow="What we believe" title="Practical AI, engineered properly." />
        <ul className="grid gap-4 md:grid-cols-3">
          {beliefs.map((b, i) => (
            <li key={b.title} className="rounded-3xl border border-border bg-[#0c1019] p-7">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{b.body}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="alt" labelledBy="why2-title">
        <SectionHeading id="why2-title" eyebrow="Why teams choose us" title="What you can expect." />
        <WhyTensra />
      </Section>
      <CtaSection />
    </>
  )
}
