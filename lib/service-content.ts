import type { WorkflowStep } from '@/components/site/workflow-explorer'
import { agentWorkflow, automationWorkflow, crmErpWorkflow, productWorkflow } from './workflows'

export type ServiceContent = {
  slug: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  headline: string
  intro: string
  problems: string[]
  deliverables: { title: string; body: string }[]
  workflow: WorkflowStep[]
  workflowTitle: string
  tools: string[]
  toolsNote: string
  safeguards: string[]
  faq: { q: string; a: string }[]
  contactType: string
}

export const serviceContent: Record<string, ServiceContent> = {
  'crm-erp-integration': {
    slug: 'crm-erp-integration',
    metaTitle: 'CRM & ERP Integration Engineering',
    metaDescription:
      'Two-way integrations between HubSpot, Salesforce, ERP and accounting systems, with field mapping, validation, duplicate prevention and error recovery.',
    eyebrow: 'CRM & ERP Integration',
    headline: 'Sales, operations and finance, working from the same data.',
    intro:
      'We engineer integrations between your CRM, ERP and accounting systems so customer, deal, order and invoice data moves accurately, without re-typing or spreadsheets.',
    problems: [
      'Closed deals are re-entered into the ERP by hand.',
      'Customer details differ between CRM, ERP and accounting.',
      'Off-the-shelf connectors break on custom fields or edge cases.',
      'Nobody knows when a sync silently fails.',
    ],
    deliverables: [
      { title: 'Field mapping & data model', body: 'A documented mapping of every synced field, its source of truth and transformation rules.' },
      { title: 'Two-way synchronization', body: 'Event-driven sync via webhooks, with scheduled reconciliation as a safety net.' },
      { title: 'Validation & deduplication', body: 'Required-field checks, customer matching and idempotency keys to prevent duplicates.' },
      { title: 'Error recovery', body: 'Queued retries with backoff, dead-letter handling and safe replays.' },
      { title: 'Monitoring & alerts', body: 'Sync dashboards and alerts that tell you what failed and why.' },
      { title: 'Documentation & handover', body: 'Runbooks and architecture notes your team can maintain.' },
    ],
    workflowTitle: 'Closed deal to ERP sales order',
    workflow: crmErpWorkflow,
    tools: ['HubSpot', 'Salesforce', 'Pipedrive', 'Zoho', 'NetSuite', 'Odoo', 'SAP Business One', 'Dynamics 365', 'Xero', 'QuickBooks', 'Custom REST APIs', 'Webhooks'],
    toolsNote: 'Examples of systems we can integrate with. Any system with a documented API is a candidate.',
    safeguards: ['Idempotent writes', 'Field-level source of truth', 'Retry with backoff', 'Audit log of every change'],
    faq: [
      { q: 'Can you integrate with our custom or legacy ERP?', a: 'Usually, yes. If the system exposes an API, database access or file exports, we can design a reliable integration around it. We assess this in the first call.' },
      { q: 'Why not use an off-the-shelf connector?', a: 'Connectors are a good fit for simple cases. Custom engineering makes sense when you have custom fields, complex rules, high volumes or need reliable error handling and visibility.' },
      { q: 'Who owns the code?', a: 'You do. We deploy to your infrastructure or ours and hand over the code and documentation.' },
      { q: 'What happens when one system is down?', a: 'Changes are queued and retried automatically using the same idempotency key, so nothing is lost or duplicated once the system recovers.' },
    ],
    contactType: 'crm-erp',
  },
  'ai-workflow-automation': {
    slug: 'ai-workflow-automation',
    metaTitle: 'AI Workflow Automation',
    metaDescription:
      'Automate emails, documents, invoices, quotations and approvals with AI extraction, business rules and human checkpoints.',
    eyebrow: 'AI Workflow Automation',
    headline: 'Automate the repetitive work. Keep people on the decisions.',
    intro:
      'We automate the workflows around emails, documents, invoices and approvals. AI handles reading and extraction, deterministic rules handle decisions, and people approve what matters.',
    problems: [
      'Staff spend hours reading emails and keying in documents.',
      'Invoices and quotes are compared by hand in spreadsheets.',
      'Approvals happen in chat threads with no record.',
      'Simple automations break as soon as a document looks different.',
    ],
    deliverables: [
      { title: 'Email & document classification', body: 'Incoming messages and files are classified and routed to the right queue or system.' },
      { title: 'Structured data extraction', body: 'Fields, line items and totals extracted with per-field confidence scores.' },
      { title: 'Business rule engine', body: 'Thresholds, matching and routing logic expressed as clear, testable rules.' },
      { title: 'Approval workflows', body: 'Approvers notified with context, decisions recorded with timestamps.' },
      { title: 'System actions', body: 'Records created or updated in your CRM, ERP or accounting tools.' },
      { title: 'Exception dashboard', body: 'One place to see what needs review, what failed and how accurate the workflow is.' },
    ],
    workflowTitle: 'Invoice received to approved bill',
    workflow: automationWorkflow,
    tools: ['Gmail', 'Outlook', 'Google Drive', 'SharePoint', 'Slack', 'Microsoft Teams', 'Xero', 'QuickBooks', 'HubSpot', 'Salesforce', 'OpenAI', 'Anthropic'],
    toolsNote: 'Examples of tools and model providers we commonly work with.',
    safeguards: ['Confidence thresholds', 'Human review for uncertain cases', 'Rules make decisions, not models', 'Full run history'],
    faq: [
      { q: 'How accurate is AI extraction?', a: 'It depends on your documents. We measure accuracy on your real samples before launch and route anything below a confidence threshold to a person.' },
      { q: 'What if a document format changes?', a: 'AI extraction is more resilient than template-based tools, and low-confidence results are flagged rather than silently accepted.' },
      { q: 'Is our data used to train models?', a: 'We use providers and settings that do not train on your data, and can deploy private models when required.' },
    ],
    contactType: 'automation',
  },
  'ai-agents': {
    slug: 'ai-agents',
    metaTitle: 'AI Agents & Internal Systems',
    metaDescription:
      'Permission-aware AI assistants and tool-connected agents with approvals and audit trails, built for internal operations.',
    eyebrow: 'AI Agents & Internal Systems',
    headline: 'AI that works inside your tools, within the rules you set.',
    intro:
      'We build internal assistants and agents that search authorized knowledge and take actions inside your systems, with permissions, approval gates and audit trails.',
    problems: [
      'Answers are scattered across documents, wikis and tickets.',
      'Generic chatbots cannot access or act on your systems.',
      'Giving AI access to tools feels risky without controls.',
      'There is no record of what an assistant did or why.',
    ],
    deliverables: [
      { title: 'Knowledge assistant (RAG)', body: 'Answers grounded in your documents and records, with citations.' },
      { title: 'Permission-aware retrieval', body: 'Each user only sees content they are already allowed to access.' },
      { title: 'Tool-connected agents', body: 'Agents that read and write to your CRM, ERP, ticketing or internal APIs.' },
      { title: 'Approval gates', body: 'Risk-based rules decide which actions run automatically and which need sign-off.' },
      { title: 'Audit trails', body: 'Every query, source, tool call and approval logged for review.' },
      { title: 'Evaluation', body: 'Test sets to measure answer quality and agent behavior before release.' },
    ],
    workflowTitle: 'A permission-aware agent request',
    workflow: agentWorkflow,
    tools: ['Slack', 'Microsoft Teams', 'Notion', 'Confluence', 'Google Workspace', 'Jira', 'HubSpot', 'Salesforce', 'Postgres', 'Vector databases', 'OpenAI', 'Anthropic'],
    toolsNote: 'Examples of knowledge sources, channels and providers we can connect.',
    safeguards: ['Inherited user permissions', 'Risk-based approval', 'Cited sources', 'Complete audit log'],
    faq: [
      { q: 'Can the agent take actions on its own?', a: 'Only within limits you define. Low-risk actions can run automatically; anything consequential waits for approval.' },
      { q: 'Where does the assistant live?', a: 'Wherever your team works: Slack, Teams, a web app, or embedded inside an existing internal tool.' },
      { q: 'How do you prevent made-up answers?', a: 'Answers are grounded in retrieved sources with citations, and the assistant is instructed and evaluated to say when it does not know.' },
    ],
    contactType: 'agents',
  },
  'ai-product-engineering': {
    slug: 'ai-product-engineering',
    metaTitle: 'AI Product Engineering',
    metaDescription:
      'Take an AI prototype to production or add reliable AI features to your SaaS: backend architecture, model integration, evaluation and secure deployment.',
    eyebrow: 'AI Product Engineering',
    headline: 'From promising prototype to production product.',
    intro:
      'We help startups and SaaS teams ship AI features that are reliable, secure and cost-aware, from backend architecture to evaluation and deployment.',
    problems: [
      'The demo works, but is not secure, tested or scalable.',
      'AI features are slow, expensive or inconsistent in production.',
      'There is no way to know if a prompt change made things worse.',
      'The team lacks time or experience to productionize AI.',
    ],
    deliverables: [
      { title: 'Backend & API architecture', body: 'Services, queues and data stores designed for real traffic.' },
      { title: 'Model integration', body: 'Provider-agnostic integration with streaming, structured output and fallbacks.' },
      { title: 'Evaluation pipeline', body: 'Automated evals on representative data to catch regressions.' },
      { title: 'Security & access control', body: 'Authentication, rate limiting, secrets and tenant isolation.' },
      { title: 'Deployment & CI/CD', body: 'Repeatable deploys with preview environments and rollbacks.' },
      { title: 'Observability', body: 'Latency, cost, error and quality metrics with alerting.' },
    ],
    workflowTitle: 'Prototype to production',
    workflow: productWorkflow,
    tools: ['Next.js', 'Node.js', 'Python', 'FastAPI', 'Postgres', 'Redis', 'Vercel', 'AWS', 'Docker', 'OpenAI', 'Anthropic', 'Vector databases'],
    toolsNote: 'Examples of technologies we commonly use. We adapt to your existing stack.',
    safeguards: ['Evals before every release', 'Fallback models', 'Cost & rate limits', 'Tenant data isolation'],
    faq: [
      { q: 'Do you work with our existing team?', a: 'Yes. We can lead the work, pair with your engineers, or build a specific component and hand it over.' },
      { q: 'Which model providers do you use?', a: 'Whichever fits the task and your constraints. We design integrations so providers can be swapped without rewriting the product.' },
      { q: 'Can you rescue a project that stalled?', a: 'Often. We start with a short audit to identify what can be kept and what needs rebuilding.' },
    ],
    contactType: 'product',
  },
}
