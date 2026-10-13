import { ButtonLink, Container, Eyebrow } from '@/components/site/primitives'
import { SystemsVisual } from '@/components/site/systems-visual'
import { FloatIn, HeroItem, HeroSequence, Tilt, WordReveal } from '@/components/site/motion'

const capabilities = [
  'CRM & ERP Integration',
  'AI Workflow Automation',
  'AI Agents',
  'Custom APIs & Backend Systems',
  'Production AI Engineering',
  'Document Intelligence',
  'Monitoring & Observability',
]

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora-blob left-[50%] top-[-30%] size-[760px] text-primary/25" />
        <div className="aurora-blob aurora-delay left-[-15%] top-[30%] size-[640px] text-slate-brand/30" />
        <div className="aurora-blob aurora-delay-2 left-[25%] top-[55%] size-[520px] text-[#8fe3ff]/10" />
      </div>
      <div
        className="grid-bg grid-drift pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]"
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-14 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[1.05fr_1fr]">
        <HeroSequence>
          <HeroItem>
            <Eyebrow>AI systems & integration engineering</Eyebrow>
          </HeroItem>
          <h1 id="hero-title" className="text-[2.6rem] font-bold leading-[1.05] sm:text-6xl lg:text-[4.25rem]">
            <WordReveal text="AI Systems That" />{' '}
            <WordReveal text="Connect." className="text-shimmer" /> <WordReveal text="Automate. Deliver." />
          </h1>
          <HeroItem>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We engineer AI-powered integrations, business workflows, and intelligent software systems that
              connect your tools and eliminate manual operational work.
            </p>
          </HeroItem>
          <HeroItem className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact" arrow className="btn-sheen">
              Discuss a Project
            </ButtonLink>
            <ButtonLink href="/case-studies" variant="ghost">
              Explore Our Work
            </ButtonLink>
          </HeroItem>
          <HeroItem>
            <p className="mt-8 flex items-center gap-2.5 text-sm text-muted-foreground">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              Built by the founding engineers. No outsourcing, no junior handoffs.
            </p>
          </HeroItem>
        </HeroSequence>
        <FloatIn>
          <Tilt>
            <SystemsVisual />
          </Tilt>
        </FloatIn>
      </Container>

      <div className="relative border-t border-border bg-[#0a0d15]/70">
        <h2 className="sr-only">Engineering capabilities</h2>
        <ul className="sr-only">
          {capabilities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div
          className="flex overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          aria-hidden="true"
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee flex shrink-0 items-center gap-12 pr-12">
              {capabilities.map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-foreground/75"
                >
                  <span className="size-1.5 rounded-[2px] bg-primary" />
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
