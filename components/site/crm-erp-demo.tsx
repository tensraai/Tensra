'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  FlaskConical,
  Loader2,
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type StepState = 'idle' | 'running' | 'done' | 'error' | 'skipped'
type Scenario = 'success' | 'failure' | 'duplicate'

const STEPS = [
  { key: 'trigger', label: 'Deal marked Closed Won', sys: 'CRM webhook' },
  { key: 'validate', label: 'Validate required fields', sys: 'Rules engine' },
  { key: 'match', label: 'Match customer in ERP', sys: 'ERP lookup' },
  { key: 'dedupe', label: 'Check for duplicate order', sys: 'Idempotency key' },
  { key: 'create', label: 'Create ERP sales order', sys: 'ERP API' },
  { key: 'update', label: 'Write order ID back to CRM', sys: 'CRM API' },
] as const

const deal = {
  id: 'DL-20418',
  company: 'Northwind Fabrication (sample)',
  contact: 'J. Rivera',
  email: 'j.rivera@northwind.example',
  amount: '$18,400.00',
  lines: [
    { sku: 'STL-PL-10', name: 'Steel plate 10mm', qty: 40 },
    { sku: 'CUT-SVC', name: 'Laser cutting service', qty: 1 },
  ],
}

type Log = { t: string; msg: string; tone: 'info' | 'ok' | 'warn' | 'err' }

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function CrmErpDemo() {
  const [states, setStates] = useState<StepState[]>(STEPS.map(() => 'idle'))
  const [logs, setLogs] = useState<Log[]>([])
  const [running, setRunning] = useState(false)
  const [scenario, setScenario] = useState<Scenario>('success')
  const [orderId, setOrderId] = useState<string | null>(null)
  const runId = useRef(0)
  const logRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    return () => {
      runId.current++
    }
  }, [])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [logs])

  function setStep(i: number, s: StepState) {
    setStates((prev) => prev.map((v, idx) => (idx === i ? s : v)))
  }

  function log(msg: string, tone: Log['tone'] = 'info') {
    const t = new Date().toLocaleTimeString('en-GB', { hour12: false })
    setLogs((prev) => [...prev, { t, msg, tone }])
  }

  function reset() {
    runId.current++
    setStates(STEPS.map(() => 'idle'))
    setLogs([])
    setOrderId(null)
    setRunning(false)
  }

  async function run() {
    const id = ++runId.current
    setStates(STEPS.map(() => 'idle'))
    setLogs([])
    setOrderId(null)
    setRunning(true)
    const alive = () => runId.current === id
    const step = async (i: number, ms = 650) => {
      setStep(i, 'running')
      await wait(ms)
      return alive()
    }

    if (!(await step(0))) return
    log(`Webhook received: deal ${deal.id} stage → Closed Won`)
    setStep(0, 'done')

    if (!(await step(1))) return
    log('Validated 7/7 required fields (customer, currency, lines, tax code)', 'ok')
    setStep(1, 'done')

    if (!(await step(2))) return
    log('Customer matched by domain northwind.example → ERP account C-1182', 'ok')
    setStep(2, 'done')

    if (!(await step(3))) return
    if (scenario === 'duplicate') {
      log(`Idempotency key ${deal.id} already processed → existing order SO-55102`, 'warn')
      setStep(3, 'error')
      setStep(4, 'skipped')
      setStep(5, 'running')
      await wait(600)
      if (!alive()) return
      log('Duplicate prevented. CRM linked to existing order instead of creating a new one.', 'ok')
      setStep(5, 'done')
      setOrderId('SO-55102')
      setRunning(false)
      return
    }
    log('No existing order for this deal. Safe to create.', 'ok')
    setStep(3, 'done')

    if (!(await step(4, 800))) return
    if (scenario === 'failure') {
      setStep(4, 'error')
      log('ERP API responded 503 Service Unavailable', 'err')
      log('Order not created. Deal queued for retry with exponential backoff (attempt 1/5)', 'warn')
      await wait(1200)
      if (!alive()) return
      setStep(4, 'running')
      log('Retry attempt 2/5 using the same idempotency key…')
      await wait(900)
      if (!alive()) return
      log('ERP API responded 201 Created', 'ok')
    }
    const newId = 'SO-55219'
    log(`Sales order ${newId} created with 2 lines, total ${deal.amount}`, 'ok')
    setStep(4, 'done')

    if (!(await step(5))) return
    log(`CRM deal updated: erp_order_id=${newId}, sync_status=synced`, 'ok')
    setStep(5, 'done')
    setOrderId(newId)
    setRunning(false)
  }

  const scenarios: { key: Scenario; label: string }[] = [
    { key: 'success', label: 'Normal run' },
    { key: 'failure', label: 'ERP outage & recovery' },
    { key: 'duplicate', label: 'Duplicate deal' },
  ]

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-[#0a0d15]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 md:px-6">
        <div className="flex items-center gap-2">
          <FlaskConical className="size-4 text-warning" aria-hidden="true" />
          <span className="text-sm font-medium">Simulated demo</span>
          <span className="text-xs text-muted-foreground">
            Sample data only. No live systems are connected.
          </span>
        </div>
        <fieldset className="flex flex-wrap gap-1 rounded-full border border-border p-1" disabled={running}>
          <legend className="sr-only">Choose a scenario</legend>
          {scenarios.map((s) => (
            <label
              key={s.key}
              className={cn(
                'cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary',
                scenario === s.key ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground',
                running && 'cursor-not-allowed opacity-60',
              )}
            >
              <input
                type="radio"
                name="scenario"
                value={s.key}
                checked={scenario === s.key}
                onChange={() => setScenario(s.key)}
                className="sr-only"
              />
              {s.label}
            </label>
          ))}
        </fieldset>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-border p-5 md:p-6 lg:border-b-0 lg:border-r">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">CRM deal</p>
          <div className="mt-3 rounded-xl border border-border bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">{deal.id}</span>
              <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
                Closed Won
              </span>
            </div>
            <p className="mt-2 font-semibold">{deal.company}</p>
            <p className="text-sm text-muted-foreground">
              {deal.contact} · {deal.email}
            </p>
            <ul className="mt-4 space-y-1.5 border-t border-border pt-3 text-sm">
              {deal.lines.map((l) => (
                <li key={l.sku} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">
                    <span className="font-mono text-xs">{l.sku}</span> {l.name}
                  </span>
                  <span>×{l.qty}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex justify-between border-t border-border pt-3 text-sm font-semibold">
              <span>Total</span>
              <span>{deal.amount}</span>
            </p>
          </div>

          <div
            className={cn(
              'mt-4 rounded-xl border p-4 transition-colors',
              orderId ? 'border-primary/40 bg-primary/[0.06]' : 'border-dashed border-border',
            )}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">ERP sales order</p>
            <p className="mt-2 font-mono text-lg font-semibold" aria-live="polite">
              {orderId ?? <span className="text-muted-foreground">Not created yet</span>}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={run}
              disabled={running}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
            >
              {running ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
              {running ? 'Running…' : 'Run Demo'}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-medium hover:border-white/30"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Reset
            </button>
            <Link
              href="/contact?type=crm-erp"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-primary hover:underline"
            >
              Discuss an Integration
            </Link>
          </div>
        </div>

        <div className="p-5 md:p-6">
          <ol className="space-y-2">
            {STEPS.map((s, i) => {
              const st = states[i]
              return (
                <li
                  key={s.key}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors',
                    st === 'running' && 'border-primary/50 bg-primary/[0.06]',
                    st === 'done' && 'border-border bg-white/[0.02]',
                    st === 'error' && 'border-warning/40 bg-warning/[0.06]',
                    (st === 'idle' || st === 'skipped') && 'border-border/60',
                  )}
                >
                  <StatusIcon state={st} />
                  <span className="flex-1 text-sm">
                    <span className={cn(st === 'skipped' && 'text-muted-foreground line-through')}>{s.label}</span>
                  </span>
                  <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">
                    {s.sys}
                  </span>
                </li>
              )
            })}
          </ol>

          <div className="mt-4 rounded-xl border border-border bg-black/50">
            <p className="flex items-center gap-2 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <Zap className="size-3" aria-hidden="true" /> Integration log
            </p>
            <ol
              ref={logRef}
              className="h-44 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed"
              aria-live="polite"
              aria-label="Integration log"
            >
              {logs.length === 0 && (
                <li className="text-muted-foreground">Choose a scenario and press Run Demo.</li>
              )}
              {logs.map((l, i) => (
                <li
                  key={i}
                  className={cn(
                    l.tone === 'ok' && 'text-success',
                    l.tone === 'warn' && 'text-warning',
                    l.tone === 'err' && 'text-destructive',
                    l.tone === 'info' && 'text-[#c3cad9]',
                  )}
                >
                  <span className="text-muted-foreground">{l.t}</span> {l.msg}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusIcon({ state }: { state: StepState }) {
  if (state === 'running') return <Loader2 className="size-4 animate-spin text-primary" aria-label="Running" />
  if (state === 'done') return <CheckCircle2 className="size-4 text-success" aria-label="Done" />
  if (state === 'error') return <AlertTriangle className="size-4 text-warning" aria-label="Needs attention" />
  return <Circle className="size-4 text-muted-foreground/50" aria-label={state === 'skipped' ? 'Skipped' : 'Pending'} />
}
