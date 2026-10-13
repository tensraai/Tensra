import {
  Bot,
  Boxes,
  Cable,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

export const site = {
  name: 'Tensra AI',
  url: 'https://tensraai.com',
  email: 'hello@tensraai.com',
  linkedin: 'https://www.linkedin.com/company/tensra/',
  tagline:
    'AI systems and integration engineering for the software your business already uses.',
}

export type Service = {
  slug: string
  href: string
  title: string
  shortTitle: string
  summary: string
  menuBlurb: string
  capabilities: string[]
  icon: LucideIcon
}

export const services: Service[] = [
  {
    slug: 'crm-erp-integration',
    href: '/services/crm-erp-integration',
    title: 'CRM & ERP Integration Engineering',
    shortTitle: 'CRM & ERP Integration',
    menuBlurb: 'Two-way sync between HubSpot, Salesforce, your ERP and accounting.',
    summary:
      'Connect sales, operations and finance so customer, deal and order data moves between systems accurately, without re-typing.',
    capabilities: [
      'Two-way sync with field mapping',
      'Validation & duplicate prevention',
      'Webhooks, retries & error recovery',
    ],
    icon: Cable,
  },
  {
    slug: 'ai-workflow-automation',
    href: '/services/ai-workflow-automation',
    title: 'AI Workflow Automation',
    shortTitle: 'AI Workflow Automation',
    menuBlurb: 'Turn emails, documents and repeat tasks into automated workflows.',
    summary:
      'Automate the repetitive work around emails, documents, invoices and approvals, with rules and human checkpoints where they matter.',
    capabilities: [
      'Email & document classification',
      'Invoice and quotation processing',
      'Approvals and notifications',
    ],
    icon: Workflow,
  },
  {
    slug: 'ai-agents',
    href: '/services/ai-agents',
    title: 'AI Agents & Internal Systems',
    shortTitle: 'AI Agents & Internal Systems',
    menuBlurb: 'AI that acts inside your tools, with permissions and audit trails.',
    summary:
      'Assistants and agents that search authorized knowledge and act inside your tools, with permissions, approvals and full audit trails.',
    capabilities: [
      'Permission-aware knowledge search (RAG)',
      'Tool-connected agents with approvals',
      'Audit trails for every action',
    ],
    icon: Bot,
  },
  {
    slug: 'ai-product-engineering',
    href: '/services/ai-product-engineering',
    title: 'AI Product Engineering',
    shortTitle: 'AI Product Engineering',
    menuBlurb: 'Take an AI prototype to production, or add AI to your SaaS.',
    summary:
      'Turn a promising prototype into a production product, or add reliable AI features to an existing SaaS platform.',
    capabilities: [
      'Backend & API architecture',
      'Model integration & evaluation',
      'Secure deployment & monitoring',
    ],
    icon: Boxes,
  },
]

export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const processSteps = [
  {
    n: '01',
    title: 'Discover the problem',
    body: 'We talk through the workflow, where time is lost and what a good outcome looks like for your team.',
  },
  {
    n: '02',
    title: 'Map systems and requirements',
    body: 'We document the tools involved, their APIs, data ownership, edge cases and access requirements.',
  },
  {
    n: '03',
    title: 'Design the architecture',
    body: 'A clear design covering data flow, validation, AI boundaries, human approvals and failure handling.',
  },
  {
    n: '04',
    title: 'Build and test',
    body: 'We build in small increments and test against realistic data, including the cases that should fail.',
  },
  {
    n: '05',
    title: 'Deploy and document',
    body: 'Production deployment on your infrastructure or ours, with documentation your team can actually use.',
  },
  {
    n: '06',
    title: 'Monitor and improve',
    body: 'Logging, alerts and dashboards so issues surface early, plus iteration as your processes evolve.',
  },
]

export type UseCaseCategory =
  | 'Sales & CRM'
  | 'Finance & Accounting'
  | 'Procurement & Operations'
  | 'Documents & Email'
  | 'Internal Knowledge'
  | 'SaaS & Product Engineering'

export const useCaseCategories: UseCaseCategory[] = [
  'Sales & CRM',
  'Finance & Accounting',
  'Procurement & Operations',
  'Documents & Email',
  'Internal Knowledge',
  'SaaS & Product Engineering',
]

export type UseCase = {
  id: string
  title: string
  category: UseCaseCategory
  problem: string
  solution: string
  workflow: string[]
  benefit: string
  service: string
}

export const useCases: UseCase[] = [
  {
    id: 'crm-to-erp-orders',
    title: 'Closed deals become ERP sales orders',
    category: 'Sales & CRM',
    problem:
      'When a deal closes, someone re-enters customer, product and pricing data into the ERP by hand.',
    solution:
      'A webhook-driven integration validates the deal, matches or creates the customer and creates the sales order automatically.',
    workflow: ['Deal closed in CRM', 'Validate fields', 'Match customer', 'Create ERP order', 'Write order ID back to CRM'],
    benefit: 'Orders reach operations consistently, without copy-paste errors or delays.',
    service: '/services/crm-erp-integration',
  },
  {
    id: 'lead-routing',
    title: 'Lead routing by qualification rules',
    category: 'Sales & CRM',
    problem: 'Inbound leads sit in a shared inbox until someone has time to read, qualify and assign them.',
    solution:
      'AI extracts company, intent and urgency; deterministic rules score and route each lead to the right owner.',
    workflow: ['Form or email arrives', 'AI extracts details', 'Rules score lead', 'Assign owner in CRM', 'Notify rep'],
    benefit: 'Qualified leads reach the right person quickly with context attached.',
    service: '/services/ai-workflow-automation',
  },
  {
    id: 'customer-sync',
    title: 'Customer records kept consistent',
    category: 'Sales & CRM',
    problem: 'Addresses, contacts and terms drift apart between CRM, ERP and accounting.',
    solution:
      'Two-way sync with a defined source of truth per field, conflict rules and an audit log of every change.',
    workflow: ['Record changes', 'Check field ownership', 'Resolve conflicts', 'Update other systems', 'Log change'],
    benefit: 'Every team works from the same customer data.',
    service: '/services/crm-erp-integration',
  },
  {
    id: 'invoice-extraction',
    title: 'Invoice data extracted from incoming documents',
    category: 'Finance & Accounting',
    problem: 'Supplier invoices arrive as PDFs and are keyed into accounting manually.',
    solution:
      'Document AI extracts line items and totals, matches them against purchase orders and drafts the bill for approval.',
    workflow: ['Invoice email', 'Extract fields', 'Match to PO', 'Flag mismatches', 'Draft bill in accounting'],
    benefit: 'Less manual keying, with discrepancies surfaced before payment.',
    service: '/services/ai-workflow-automation',
  },
  {
    id: 'accounting-sync',
    title: 'Accounting synchronization',
    category: 'Finance & Accounting',
    problem: 'Orders, invoices and payments are reconciled across systems in spreadsheets.',
    solution:
      'Scheduled and event-driven sync between your ERP or operations system and tools like Xero or QuickBooks.',
    workflow: ['Order or payment event', 'Map accounts & tax', 'Post to accounting', 'Reconcile status', 'Alert on errors'],
    benefit: 'Finance sees current numbers without manual reconciliation.',
    service: '/services/crm-erp-integration',
  },
  {
    id: 'quote-comparison',
    title: 'Supplier quotation comparison',
    category: 'Procurement & Operations',
    problem: 'Comparing supplier quotes means reading PDFs side by side and building a spreadsheet.',
    solution:
      'Quotes are parsed into a normalized structure, compared line by line and summarized for a buyer to approve.',
    workflow: ['RFQ sent', 'Quotes received', 'Normalize line items', 'Compare & summarize', 'Buyer approves PO'],
    benefit: 'Faster, more consistent purchasing decisions with a clear record.',
    service: '/services/ai-workflow-automation',
  },
  {
    id: 'approvals',
    title: 'Approval workflows with clear thresholds',
    category: 'Procurement & Operations',
    problem: 'Approvals happen over chat and email, with no record of who approved what.',
    solution:
      'Rules decide what needs approval, route it to the right person and record every decision.',
    workflow: ['Request created', 'Check thresholds', 'Route to approver', 'Approve or reject', 'Continue workflow'],
    benefit: 'Control without slowing routine work down.',
    service: '/services/ai-workflow-automation',
  },
  {
    id: 'email-triage',
    title: 'Shared inbox triage',
    category: 'Documents & Email',
    problem: 'A single inbox mixes leads, quotes, invoices and general mail.',
    solution:
      'AI classifies each message, extracts key fields and pushes it into the right system or queue.',
    workflow: ['Email arrives', 'AI classifies', 'Extract fields', 'Create record', 'Human review if uncertain'],
    benefit: 'The right work reaches the right place, with uncertain cases kept for people.',
    service: '/services/ai-workflow-automation',
  },
  {
    id: 'knowledge-assistant',
    title: 'Assistant for authorized internal knowledge',
    category: 'Internal Knowledge',
    problem: 'Answers live across documents, wikis and tickets that are hard to search.',
    solution:
      'Retrieval-augmented assistant that only searches content each user is allowed to see, with cited sources.',
    workflow: ['User asks', 'Check permissions', 'Retrieve sources', 'Generate cited answer', 'Log query'],
    benefit: 'Faster answers that can be verified against the source.',
    service: '/services/ai-agents',
  },
  {
    id: 'ops-agent',
    title: 'Operations agent with human approval',
    category: 'Internal Knowledge',
    problem: 'Routine updates across tools take staff time but need oversight.',
    solution:
      'An agent drafts actions inside connected tools; anything above a defined risk level waits for approval.',
    workflow: ['Request', 'Agent plans', 'Low-risk: execute', 'High-risk: approval', 'Audit trail'],
    benefit: 'Routine work handled, with people in control of consequential actions.',
    service: '/services/ai-agents',
  },
  {
    id: 'saas-ai-features',
    title: 'AI features in an existing SaaS product',
    category: 'SaaS & Product Engineering',
    problem: 'Your product needs AI features that are reliable, fast and cost-aware.',
    solution:
      'We design the API layer, model integration, evaluation and guardrails to ship AI features your users can trust.',
    workflow: ['Define feature', 'Prototype & evaluate', 'Build API', 'Ship behind flag', 'Monitor quality'],
    benefit: 'AI features that behave predictably in production.',
    service: '/services/ai-product-engineering',
  },
  {
    id: 'prototype-to-production',
    title: 'Prototype to production',
    category: 'SaaS & Product Engineering',
    problem: 'An AI demo works on a laptop but is not secure, tested or scalable.',
    solution:
      'We rebuild the core with proper backend architecture, authentication, evaluation and deployment pipelines.',
    workflow: ['Audit prototype', 'Design architecture', 'Rebuild core', 'Test & evaluate', 'Deploy & monitor'],
    benefit: 'A product you can put in front of real customers.',
    service: '/services/ai-product-engineering',
  },
]
