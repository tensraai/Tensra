// Brikline facts come from tensraai.com. Other case studies are representative engagement types.

export const STACK = ["NetSuite", "Salesforce", "Microsoft Dynamics 365", "SAP Business One", "HubSpot", "QuickBooks", "Xero", "PostgreSQL", "OpenAI", "Gemini"];

export const SERVICES = [
  {
    n: "01", key: "erp",
    t: "ERP & CRM Integration",
    d: "Bi-directional synchronization between sales, operations and finance so customers, deals, orders and invoices stay consistent across every system.",
    pts: ["Bi-directional sync with custom schema mapping", "Conflict resolution and source-of-truth rules", "NetSuite, Salesforce, SAP Business One, Dynamics 365", "Webhooks, retries and dead-letter recovery"],
  },
  {
    n: "02", key: "idp",
    t: "Intelligent Document Processing",
    d: "AI-assisted extraction of invoices, purchase orders and bills of lading, posted directly to the right ledger accounts after human verification.",
    pts: ["Invoice, PO and bill of lading extraction", "Line-item matching against purchase orders", "Confidence thresholds with reviewer queues", "Direct posting to the general ledger"],
  },
  {
    n: "03", key: "agents",
    t: "AI Workflow Automation & Custom Agents",
    d: "Event-driven automation and permission-aware agents that act inside your tools, with multi-tier approvals and a full audit trail.",
    pts: ["Event-driven triggers across systems", "Multi-tier approval chains", "Slack and Microsoft Teams bot operations", "Audit log for every automated action"],
  },
  {
    n: "04", key: "custom",
    t: "Custom Enterprise Software & Middleware",
    d: "The connective software your operations need: high-throughput APIs, webhook ingestion engines and internal portals built for production.",
    pts: ["REST and GraphQL API development", "Webhook ingestion and queueing engines", "Internal portals and operational dashboards", "Secure deployment and monitoring"],
  },
];

export const BRIKLINE_MODULES = [
  ["Estimating & lead intake", "Incoming enquiries are classified by AI and become projects with clients, sites and stages tracked in one place."],
  ["Procurement & quotes", "Supplier quotes are parsed and compared line by line so buyers can choose quickly."],
  ["Purchase orders", "Approved quotes become purchase orders tied to the project budget."],
  ["Subcontractor management", "Trades, packages and commitments managed against each project."],
  ["Site milestones & scheduling", "Dependency-aware scheduling of trades and deliveries, with site updates from the field."],
  ["Client portal", "Clients see progress, documents and approvals without chasing the team by email."],
  ["Accounting sync with Xero", "Supplier invoices are matched to purchase orders and synced with Xero."],
] as const;

export const PHASES = [
  ["Systems Audit & Schema Mapping", "We inventory every system, API and data owner, then map fields, edge cases and access requirements.", ["System inventory", "Field-level schema map", "Risk register"]],
  ["Architecture & Proof of Concept", "A documented design for data flow, validation and approvals, proven against your real data.", ["Architecture document", "Working proof of concept", "Delivery plan"]],
  ["Staged Rollout & Production Integration", "Incremental releases behind feature flags, tested with realistic and failing cases before go-live.", ["Staged releases", "Test suite", "Runbooks & documentation"]],
  ["SLA Management, Monitoring & Schema Drift Support", "Alerts, dashboards and ongoing support as vendors change APIs and your processes evolve.", ["Monitoring & alerting", "Agreed SLA", "Schema drift handling"]],
] as const;

export const INDUSTRIES = [
  { t: "Construction & Real Estate", d: "Estimating, procurement, subcontractors and site milestones connected to accounting.", ex: ["Project costing", "Supplier quote comparison", "Progress claims"] },
  { t: "Wholesale Distribution & Logistics", d: "Order intake, inventory and fulfilment kept in sync between CRM, warehouse and ERP.", ex: ["Sales order automation", "Stock reconciliation", "Shipping documents"] },
  { t: "Manufacturing & Supply Chain", d: "Purchasing, production planning and supplier data flowing cleanly into the ERP.", ex: ["BOM and PO sync", "Supplier onboarding", "Goods receipt matching"] },
  { t: "Professional & Financial Services", d: "Client onboarding, billing and accounts payable without manual re-keying.", ex: ["AP invoice routing", "Time-to-invoice sync", "Approval workflows"] },
];
