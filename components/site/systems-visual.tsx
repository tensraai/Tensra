import { Calculator, Code2, Database, FileText, Mail, Users } from 'lucide-react'
import { TensraMark } from './logo'

const nodes = [
  { label: 'CRM', sub: 'Deals & contacts', x: 16, y: 16, icon: Users },
  { label: 'ERP', sub: 'Orders & stock', x: 84, y: 16, icon: Database },
  { label: 'Email', sub: 'Shared inbox', x: 9, y: 54, icon: Mail },
  { label: 'Accounting', sub: 'Invoices & ledger', x: 91, y: 54, icon: Calculator },
  { label: 'Documents', sub: 'PDFs & quotes', x: 20, y: 90, icon: FileText },
  { label: 'APIs', sub: 'Webhooks & REST', x: 80, y: 90, icon: Code2 },
]

const HUB = { x: 50, y: 53 }

function pathFor(x: number, y: number) {
  const cx = (x + HUB.x) / 2
  return `M ${x} ${y} C ${cx} ${y}, ${cx} ${HUB.y}, ${HUB.x} ${HUB.y}`
}

export function SystemsVisual() {
  return (
    <figure
      className="relative mx-auto aspect-square w-full max-w-[520px] rounded-3xl border border-border bg-[#0a0d15]/80 shadow-[0_40px_120px_-40px_rgba(26,197,255,0.35)]"
      aria-label="Diagram: Tensra AI connects CRM, ERP, email, accounting, documents and APIs through a central AI workflow layer"
    >
      <div className="grid-bg absolute inset-0 rounded-3xl opacity-60 [mask-image:radial-gradient(circle,black,transparent_75%)]" aria-hidden="true" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="line-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#6b7591" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1ac5ff" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {nodes.map((n) => (
          <path
            key={n.label}
            d={pathFor(n.x, n.y)}
            fill="none"
            stroke="url(#line-grad)"
            strokeWidth="0.35"
            vectorEffect="non-scaling-stroke"
            className="animate-dash"
            style={{ strokeWidth: 1.25 }}
          />
        ))}
        <g className="motion-hide">
          {nodes.map((n, i) => (
            <circle key={n.label} r="0.9" fill="#1ac5ff">
              <animateMotion
                dur={`${2.6 + (i % 3) * 0.5}s`}
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
                path={pathFor(n.x, n.y)}
                keyPoints={i % 2 ? '1;0' : '0;1'}
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          ))}
        </g>
      </svg>

      <div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
      >
        <div className="absolute size-36 animate-pulse-node rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
        <div className="relative flex flex-col items-center gap-2 rounded-2xl border border-primary/40 bg-[#0c1320] px-5 py-4 shadow-[0_0_40px_-6px_rgba(26,197,255,0.55)]">
          <TensraMark className="size-9" />
          <span className="font-display text-sm font-semibold">AI Workflow Layer</span>
          <span className="flex gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <span>Validate</span>
            <span className="text-primary">/</span>
            <span>Route</span>
            <span className="text-primary">/</span>
            <span>Act</span>
          </span>
        </div>
      </div>

      {nodes.map((n) => {
        const Icon = n.icon
        return (
          <div
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111622] px-2.5 py-2 shadow-lg shadow-black/40 sm:px-3">
              <span className="flex size-7 items-center justify-center rounded-lg bg-white/[0.06] text-primary">
                <Icon className="size-3.5" aria-hidden="true" />
              </span>
              <span className="hidden flex-col sm:flex">
                <span className="text-xs font-semibold leading-tight">{n.label}</span>
                <span className="text-[10px] leading-tight text-muted-foreground">{n.sub}</span>
              </span>
              <span className="text-xs font-semibold sm:hidden">{n.label}</span>
            </div>
          </div>
        )
      })}

      <figcaption className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
        Illustrative architecture
      </figcaption>
    </figure>
  )
}
