import type { WorkflowStep } from '@/components/site/workflow-explorer'

export const homeWorkflow: WorkflowStep[] = [
  {
    title: 'Incoming customer email',
    icon: 'mail',
    kind: 'Trigger',
    detail: 'A customer emails the shared inbox asking to reorder and change their delivery address.',
    example: 'from: ops@customer.example\nsubject: Reorder + new site address',
  },
  {
    title: 'AI classification',
    icon: 'brain',
    kind: 'AI',
    detail:
      'A language model classifies intent and extracts structured fields. Low-confidence results are flagged instead of guessed.',
    example: '{\n  "intent": "reorder",\n  "confidence": 0.94,\n  "address_change": true\n}',
  },
  {
    title: 'CRM record',
    icon: 'users',
    kind: 'System',
    detail: 'The matching contact and account are found in the CRM and the request is logged against them.',
    example: 'crm.contacts.find(email)\n→ account A-2291',
  },
  {
    title: 'Business rules',
    icon: 'scale',
    kind: 'Rule',
    detail:
      'Deterministic rules check credit status, stock and whether an address change needs sign-off. AI does not make these decisions.',
    example: 'if address_changed → require_approval\nif credit_hold → stop',
  },
  {
    title: 'ERP update',
    icon: 'database',
    kind: 'System',
    detail: 'A draft sales order is created in the ERP using an idempotency key so retries never duplicate it.',
    example: 'erp.orders.create({ key: "msg-8812" })',
  },
  {
    title: 'Human approval',
    icon: 'approve',
    kind: 'Human',
    detail: 'Because the address changed, an operations lead approves the order from a single notification.',
    example: 'approver: ops-lead\nstatus: approved',
  },
  {
    title: 'Monitoring',
    icon: 'monitor',
    kind: 'Monitor',
    detail: 'Every step is logged. Failures alert the team with enough context to fix and replay safely.',
    example: 'run 8812 ✓ 7/7 steps · 4.2s',
  },
]

export const crmErpWorkflow: WorkflowStep[] = [
  { title: 'Deal closed', icon: 'zap', kind: 'Trigger', detail: 'A CRM webhook fires when a deal moves to Closed Won.', example: 'POST /webhooks/crm\n{ "deal": "DL-20418" }' },
  { title: 'Validate & map', icon: 'shield', kind: 'Rule', detail: 'Required fields are validated and CRM fields are mapped to ERP fields, including currency and tax codes.', example: 'deal.amount → order.total\nproduct.sku → item.code' },
  { title: 'Match customer', icon: 'users', kind: 'System', detail: 'The customer is matched by ID, domain or tax number. A new account is only created when no confident match exists.' },
  { title: 'Prevent duplicates', icon: 'check', kind: 'Rule', detail: 'An idempotency key guarantees one deal produces at most one sales order, even across retries.' },
  { title: 'Create order', icon: 'database', kind: 'System', detail: 'The sales order is created in the ERP. Errors are queued and retried with backoff.' },
  { title: 'Sync back', icon: 'send', kind: 'System', detail: 'The ERP order ID and status are written back to the CRM so sales sees fulfilment progress.' },
]

export const automationWorkflow: WorkflowStep[] = [
  { title: 'Trigger', icon: 'mail', kind: 'Trigger', detail: 'An invoice arrives by email, or a document is uploaded to a shared folder.', example: 'attachment: INV-3391.pdf' },
  { title: 'Processing', icon: 'search', kind: 'AI', detail: 'Document AI extracts supplier, line items, totals and tax, returning a confidence score per field.', example: '{ "total": 4210.50,\n  "confidence": 0.97 }' },
  { title: 'Decision', icon: 'branch', kind: 'Rule', detail: 'Rules match the invoice to a purchase order. Mismatches above a tolerance are sent for review.', example: 'abs(inv - po) > 2% → review' },
  { title: 'Approval', icon: 'approve', kind: 'Human', detail: 'Exceptions reach the right approver with the extracted data and source document side by side.' },
  { title: 'Action', icon: 'send', kind: 'System', detail: 'An approved bill is drafted in the accounting system and the team is notified.' },
  { title: 'Monitoring', icon: 'monitor', kind: 'Monitor', detail: 'Runs, exceptions and accuracy are tracked on a dashboard so the workflow can be tuned over time.' },
]

export const agentWorkflow: WorkflowStep[] = [
  { title: 'User request', icon: 'users', kind: 'Trigger', detail: 'A team member asks: "Which open POs for the Hillside project are over budget?"' },
  { title: 'Permission check', icon: 'shield', kind: 'Rule', detail: 'The agent inherits the user’s permissions. It can only read projects and records this person is allowed to see.' },
  { title: 'Retrieve context', icon: 'search', kind: 'AI', detail: 'Relevant records and documents are retrieved from authorized sources (retrieval-augmented generation).' },
  { title: 'Plan & answer', icon: 'brain', kind: 'AI', detail: 'The model answers with citations, or proposes an action such as flagging a PO for review.' },
  { title: 'Approval gate', icon: 'approve', kind: 'Human', detail: 'Read-only answers return immediately. Any write action above a defined risk level waits for human approval.' },
  { title: 'Audit trail', icon: 'monitor', kind: 'Monitor', detail: 'Questions, sources, tool calls and approvals are logged for review and compliance.' },
]

export const productWorkflow: WorkflowStep[] = [
  { title: 'Prototype audit', icon: 'search', kind: 'Trigger', detail: 'We review your prototype, data, prompts and current architecture to find what must change for production.' },
  { title: 'Architecture', icon: 'branch', kind: 'Rule', detail: 'Backend services, API contracts, queues, data stores and model providers are designed for reliability and cost.' },
  { title: 'Model integration', icon: 'brain', kind: 'AI', detail: 'Models are integrated behind a clean interface with fallbacks, timeouts, streaming and structured outputs.' },
  { title: 'Evaluation', icon: 'check', kind: 'Rule', detail: 'Test sets and automated evals measure quality before every release, so regressions are caught early.' },
  { title: 'Security & deploy', icon: 'shield', kind: 'System', detail: 'Authentication, rate limiting, secrets management and CI/CD pipelines are put in place.' },
  { title: 'Monitor', icon: 'monitor', kind: 'Monitor', detail: 'Latency, cost, errors and output quality are monitored in production with alerting.' },
]
