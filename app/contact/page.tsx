import type { Metadata } from 'next'
import { ExternalLink as Linkedin, Mail } from 'lucide-react'
import { Eyebrow, Section } from '@/components/site/primitives'
import { ContactForm } from '@/components/site/contact-form'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell Tensra AI about the workflow you want to automate or the systems you want to connect. An engineer will reply within one business day.',
  alternates: { canonical: '/contact' },
}

const next = [
  'We read your message and reply within one business day.',
  'A call with the engineers who would build your system.',
  'A written proposal with scope, architecture and next steps.',
]

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams
  return (
    <Section labelledBy="contact-title" className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.2fr]">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 id="contact-title" className="text-4xl font-bold leading-tight md:text-5xl">
            Tell us what you want to connect or automate.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Describe the workflow and the systems involved. You will hear back from an engineer, not a salesperson.
          </p>
          <h2 className="mt-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">What happens next</h2>
          <ol className="mt-4 space-y-4">
            {next.map((n, i) => (
              <li key={n} className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/40 font-mono text-xs text-primary">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-foreground/85">{n}</span>
              </li>
            ))}
          </ol>
          <ul className="mt-10 space-y-3 border-t border-border pt-8">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 hover:text-primary">
                <Mail className="size-4 text-primary" aria-hidden="true" /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-primary">
                <Linkedin className="size-4 text-primary" aria-hidden="true" /> Tensra AI on LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <ContactForm defaultType={type} />
      </div>
    </Section>
  )
}
