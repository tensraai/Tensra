import type { Metadata } from 'next'
import Image from 'next/image'
import { ShieldCheck } from 'lucide-react'
import { ButtonLink, PageHero, Section, SectionHeading } from '@/components/site/primitives'
import { WorkflowExplorer, type WorkflowStep } from '@/components/site/workflow-explorer'
import { CtaSection } from '@/components/site/cta-section'

export const metadata: Metadata = {
  title: 'Brikline Case Study',
  description:
    'How Tensra AI built Brikline, a production operations platform for residential construction: AI email intake, procurement, invoices synced with Xero, scheduling and a client portal.',
  alternates: { canonical: '/case-studies/brikline' },
}

const modules = [
  { title: 'AI email intake', body: 'Incoming emails are classified as leads, supplier quotes, invoices or general correspondence, and routed accordingly.' },
  { title: 'Leads & projects', body: 'Qualified enquiries become projects with clients, sites and stages tracked in one place.' },
  { title: 'Procurement & quotes', body: 'Supplier quotes are parsed and compared line by line so buyers can choose quickly.' },
  { title: 'Purchase orders', body: 'Approved quotes become purchase orders tied to the project budget.' },
  { title: 'Invoices & Xero', body: 'Supplier invoices are matched to POs and synced with Xero for accounting.' },
  { title: 'Scheduling & site ops', body: 'Dependency-aware scheduling of trades and deliveries, with site updates from the field.' },
  { title: 'Client portal', body: 'Clients see progress, documents and approvals without chasing the team by email.' },
]

const flow: WorkflowStep[] = [
  { title: 'Supplier emails a quote', icon: 'mail', kind: 'Trigger', detail: 'A supplier replies to an RFQ with a PDF quotation attached.' },
  { title: 'Classify & extract', icon: 'brain', kind: 'AI', detail: 'AI identifies it as a quote, links it to the right project and RFQ, and extracts line items and prices.' },
  { title: 'Compare quotes', icon: 'scale', kind: 'Rule', detail: 'Quotes are normalized and compared line by line against other suppliers and the budget.' },
  { title: 'Buyer approves', icon: 'approve', kind: 'Human', detail: 'A buyer reviews the comparison and approves the preferred supplier.' },
  { title: 'Purchase order', icon: 'database', kind: 'System', detail: 'A purchase order is generated and sent, and the schedule is updated with delivery dates.' },
  { title: 'Invoice to Xero', icon: 'send', kind: 'System', detail: 'When the invoice arrives it is matched to the PO and synced with Xero after approval.' },
]

const principles = ['Human approval on spend', 'Role-based access', 'Audit trail on every document', 'AI suggestions, not silent decisions']

export default function BriklinePage() {
  return (
    <>
      <PageHero
        eyebrow="Case study · Production system"
        title="Brikline: connected operations for residential construction."
        description="A single system that connects email, procurement, accounting, scheduling and site operations for a residential homebuilder. Designed, built and deployed by Tensra AI."
        breadcrumbs={[{ label: 'Case Studies', href: '/case-studies' }, { label: 'Brikline' }]}
        actions={<ButtonLink href="/contact" arrow>Discuss a similar system</ButtonLink>}
        visual={
          <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-border bg-[#f8f8f8] p-10">
            <Image src="/images/brikline-logo.png" alt="Brikline logo" width={500} height={333} priority className="h-auto w-full max-w-sm object-contain" />
          </div>
        }
      />

      <Section labelledBy="challenge-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="challenge-title" eyebrow="The challenge" title="Operations spread across inboxes and spreadsheets." className="mb-6" />
            <p className="leading-relaxed text-muted-foreground">
              Building homes means coordinating clients, suppliers, trades and finance at the same time. Quotes,
              invoices and updates arrived by email and were tracked manually, making it hard to see project status,
              compare suppliers or keep accounting current.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="The approach" title="One system, with AI where it helps." className="mb-6" />
            <p className="leading-relaxed text-muted-foreground">
              We designed Brikline around the existing workflow rather than replacing it. AI handles reading and
              classifying email and documents; business rules and people handle approvals and spend. Accounting stays
              in Xero, kept in sync automatically.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="alt" labelledBy="modules-title">
        <SectionHeading id="modules-title" eyebrow="What we built" title="Seven connected modules." />
        <ol className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m, i) => (
            <li key={m.title} className="bg-background p-6">
              <span className="font-mono text-xs text-[#f07a26]">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
            </li>
          ))}
          <li className="flex flex-col justify-center bg-[#0c1019] p-6">
            <p className="text-sm text-muted-foreground">Accounting system</p>
            <p className="mt-1 font-display text-2xl font-semibold">Xero</p>
            <p className="mt-2 text-sm text-muted-foreground">kept in sync, not replaced</p>
          </li>
        </ol>
      </Section>

      <Section labelledBy="flow-title">
        <SectionHeading id="flow-title" eyebrow="Example flow" title="From supplier quote to accounting." description="A simplified view of one procurement workflow inside Brikline." />
        <WorkflowExplorer steps={flow} label="brikline" />
      </Section>

      <Section tone="alt" labelledBy="principles-title">
        <SectionHeading id="principles-title" eyebrow="Design principles" title="Built for control and accountability." />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <li key={p} className="flex items-start gap-3 rounded-2xl border border-border bg-background p-5">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
              <span className="font-medium">{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection title="Running operations across disconnected tools?" />
    </>
  )
}
