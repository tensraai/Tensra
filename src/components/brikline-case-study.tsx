import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BRIKLINE_MODULES } from "@/lib/content";
import logo from "@/assets/brikline-logo-cropped.png";
import { btnLine } from "@/components/site";

const IMPACT = [
  ["7", "Connected Modules", "Full lifecycle from intake to accounting"],
  ["Xero", "General Ledger", "Automated PO and invoice reconciliation"],
  ["Zero", "Manual Re-Keying", "Deterministic sync and validation"],
] as const;

export function BriklineCaseStudy({ compact = false }: { compact?: boolean }) {
  return (
    <article aria-label="Brikline case study" className="border-y border-border">
      <header className="flex flex-col gap-5 border-b border-border py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
          <img src={logo} alt="Brikline" width={238} height={178} className="h-[88px] w-[118px] shrink-0 object-contain" />
          <div className="sm:border-l sm:border-border sm:pl-7">
            <p className="text-base font-semibold text-navy">Residential Construction</p>
            <p className="mt-1 text-sm text-muted-foreground">Xero Accounting Integration</p>
          </div>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-xs font-medium text-navy">
          <CheckCircle2 className="size-4 text-primary" /> Live production deployment
        </span>
      </header>

      <div className="py-7 md:py-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <h2 className="max-w-3xl text-2xl font-semibold leading-tight text-navy md:text-3xl">Field operations and finance.<br className="hidden sm:block" /> Connected in one platform.</h2>
          {compact && <Link to="/work" className={btnLine + " shrink-0 sm:mt-2"}>Read the case study <ArrowRight className="size-4" /></Link>}
        </div>
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <div>
            <h3 className="text-sm font-semibold text-navy">The Operational Bottleneck</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Project information was fragmented across inboxes, spreadsheets and accounting software. Manual re-entry disconnected procurement, site activity and financial records.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-navy">The Engineering Solution</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">A centralized platform connecting seven operational modules, from lead intake to site milestones, with purchase orders and supplier invoices synchronized to Xero.</p>
          </div>
        </div>
      </div>

      {!compact && (
        <section aria-label="Modular capabilities" className="border-t border-border py-6">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-base font-semibold text-navy">Seven modules. One operational lifecycle.</h3>
            <span className="text-xs text-muted-foreground">Intake → Procurement → Delivery → Accounting</span>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BRIKLINE_MODULES.map(([title, outcome], index) => (
              <li key={title} className="flex gap-3 rounded-md border border-border bg-secondary p-4">
                <span className="pt-0.5 text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4 className="text-sm font-semibold text-navy">{title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{outcome}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <dl className="grid border-t border-border bg-navy text-on-navy md:grid-cols-3">
        {IMPACT.map(([value, label, detail]) => (
          <div key={value} className="border-b border-on-navy/15 px-6 py-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
            <dt className="flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="text-3xl font-semibold text-signal">{value}</span><span className="text-base font-semibold">{label}</span></dt>
            <dd className="mt-2 text-sm leading-relaxed text-on-navy/70">{detail}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}