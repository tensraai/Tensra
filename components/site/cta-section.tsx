import { Mail } from 'lucide-react'
import { ButtonLink, Container } from './primitives'
import { site } from '@/lib/site'
import { Reveal } from './motion'

export function CtaSection({
  title = 'Have a workflow worth automating?',
  description = "Tell us what systems you use and what your team wants to improve. We'll help you identify a practical engineering approach.",
  cta = 'Discuss Your Project',
}: {
  title?: string
  description?: string
  cta?: string
}) {
  return (
    <section aria-labelledby="cta-title" className="py-20 md:py-28">
      <Container>
        <Reveal>
        <div className="glow-border relative overflow-hidden rounded-3xl border border-primary/20 bg-[#0a0e17] px-6 py-14 md:px-16 md:py-20">
          <div
            className="aurora-blob pointer-events-none right-[-10%] top-[-40%] size-[520px] text-primary/20"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_85%_0%,rgba(26,197,255,0.18),transparent_70%),radial-gradient(500px_300px_at_0%_100%,rgba(107,117,145,0.2),transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_left,black,transparent_60%)]"
            aria-hidden="true"
          />
          <div className="relative grid items-end gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 id="cta-title" className="text-3xl font-semibold leading-tight md:text-5xl">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <ButtonLink href="/contact" arrow className="w-full md:w-auto">
                {cta}
              </ButtonLink>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="size-4" aria-hidden="true" />
                {site.email}
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Follow Tensra AI on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
        </Reveal>
      </Container>
    </section>
  )
}
