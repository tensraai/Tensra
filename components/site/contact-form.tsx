'use client'

import { useActionState } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { submitContact, type ContactState } from '@/app/contact/actions'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

const types = [
  { value: 'crm-erp', label: 'CRM & ERP Integration' },
  { value: 'automation', label: 'AI Workflow Automation' },
  { value: 'agents', label: 'AI Agents & Internal Systems' },
  { value: 'product', label: 'AI Product Engineering' },
  { value: 'other', label: 'Something else' },
]

const field =
  'mt-2 w-full rounded-xl border border-border bg-[#0a0d15] px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/70 focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-destructive'

export function ContactForm({ defaultType }: { defaultType?: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, { status: 'idle' })

  if (state.status === 'success') {
    const v = state.values
    const mailto = v
      ? `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry from ${v.name}`)}&body=${encodeURIComponent(
          `${v.message}\n\n${v.name}${v.company ? `, ${v.company}` : ''}\n${v.email}`,
        )}`
      : `mailto:${site.email}`
    return (
      <div role="status" className="rounded-3xl border border-success/40 bg-success/5 p-8 md:p-10">
        <CheckCircle2 className="size-8 text-success" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-semibold">Thanks{v?.name ? `, ${v.name.split(' ')[0]}` : ''}. We have your details.</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          An engineer will reply within one business day. If it is urgent, you can also email us directly.
        </p>
        <a href={mailto} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
          Email {site.email} <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    )
  }

  const err = state.errors ?? {}
  const val = state.values ?? {}

  return (
    <form action={action} noValidate className="rounded-3xl border border-border bg-[#0c1019] p-6 md:p-9">
      {state.status === 'error' && state.message && (
        <p role="alert" className="mb-6 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm">
          {state.message}
        </p>
      )}
      <div className="hidden" aria-hidden="true">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={err.name}>
          <input id="name" name="name" autoComplete="name" required defaultValue={val.name} aria-invalid={!!err.name} aria-describedby={err.name ? 'name-error' : undefined} className={field} />
        </Field>
        <Field label="Work email" name="email" error={err.email}>
          <input id="email" name="email" type="email" autoComplete="email" required defaultValue={val.email} aria-invalid={!!err.email} aria-describedby={err.email ? 'email-error' : undefined} className={field} />
        </Field>
        <Field label="Company" name="company" optional error={err.company}>
          <input id="company" name="company" autoComplete="organization" defaultValue={val.company} aria-invalid={!!err.company} className={field} />
        </Field>
        <Field label="Project type" name="type" error={err.type}>
          <select id="type" name="type" required defaultValue={val.type ?? defaultType ?? ''} aria-invalid={!!err.type} aria-describedby={err.type ? 'type-error' : undefined} className={cn(field, 'appearance-none')}>
            <option value="" disabled>Select one</option>
            {types.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-5">
        <Field label="What would you like to automate or connect?" name="message" error={err.message}>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            defaultValue={val.message}
            placeholder="E.g. We re-enter closed HubSpot deals into NetSuite by hand and want that automated."
            aria-invalid={!!err.message}
            aria-describedby={err.message ? 'message-error' : undefined}
            className={cn(field, 'resize-y')}
          />
        </Field>
      </div>
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">We reply within one business day. No sales sequences.</p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
        >
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          {pending ? 'Sending' : 'Send enquiry'}
          {!pending && <ArrowRight className="size-4" aria-hidden="true" />}
        </button>
      </div>
    </form>
  )
}

function Field({ label, name, error, optional, children }: { label: string; name: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
