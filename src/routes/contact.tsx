import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Check, CheckCircle2, Mail } from "lucide-react";
import { SiteLayout, PageHead, EMAIL, btnPrimary, btnSecondary } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Schedule a Consultation — Tensra AI" },
      { name: "description", content: "Tell Tensra AI about your organization, systems and integration needs, then book a consultation or request a quote." },
      { property: "og:title", content: "Schedule a Consultation — Tensra AI" },
      { property: "og:description", content: "A three-step project intake for integration and AI engineering work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const STACKS = ["NetSuite", "Salesforce", "Dynamics 365", "SAP Business One", "HubSpot", "QuickBooks", "Xero", "PostgreSQL", "Other"];
const NEEDS = ["ERP & CRM sync", "Document processing", "Workflow automation", "Custom middleware / APIs"];
const SIZES = ["1–50", "51–200", "201–1000", "1000+"];
const SLOTS = ["Mon 10:00", "Mon 15:00", "Tue 11:00", "Wed 09:30", "Wed 14:00", "Thu 16:00"];
const STEPS = ["Organization Details", "Tech Stack & Needs", "Meeting or Quote"];

const orgSchema = z.object({
  name: z.string().trim().min(1, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid work email").max(255),
  company: z.string().trim().min(1, "Enter your company name").max(120),
  size: z.string().min(1, "Select company size"),
});
const notesSchema = z.string().trim().min(10, "Describe the bottleneck in a sentence or two").max(1000);

function Contact() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ name: "", email: "", company: "", size: "" });
  const [stack, setStack] = useState<string[]>([]);
  const [needs, setNeeds] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState<"call" | "quote">("call");
  const [slot, setSlot] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const next = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      const r = orgSchema.safeParse(f);
      if (!r.success) r.error.issues.forEach((i) => (e[String(i.path[0])] = i.message));
    } else if (step === 1) {
      if (!stack.length) e["stack"] = "Select at least one system";
      if (!needs.length) e["needs"] = "Select at least one need";
      const n = notesSchema.safeParse(notes);
      if (!n.success) e["notes"] = n.error.issues[0]!.message;
    } else if (mode === "call" && !slot) e["slot"] = "Pick a time slot";
    setErr(e);
    if (Object.keys(e).length) return;
    if (step < 2) setStep(step + 1);
    else setDone(true);
  };

  const chip = (on: boolean) => `flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition ${on ? "border-primary bg-accent text-accent-foreground" : "border-border bg-card hover:border-primary/50"}`;
  const input = "mt-1.5 w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
  const label = "text-sm font-medium text-navy";
  const Err = ({ k }: { k: string }) => (err[k] ? <p className="mt-1.5 text-xs text-destructive">{err[k]}</p> : null);

  return (
    <SiteLayout>
      <PageHead label="Contact" title="Schedule a consultation." lede="Three short steps. Tell us about your organization and systems, then book a call with a founding engineer or request a written quote." />
      <section className="mx-auto grid max-w-[1240px] gap-10 px-6 py-16 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <ol className="space-y-2">
            {STEPS.map((s, i) => {
              const state = done || i < step ? "done" : i === step ? "active" : "todo";
              return (
                <li key={s} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${state === "active" ? "bg-accent font-semibold text-accent-foreground" : "text-muted-foreground"}`}>
                  <span className={`flex size-6 items-center justify-center rounded-full border text-xs ${state === "done" ? "border-primary bg-primary text-primary-foreground" : state === "active" ? "border-primary text-primary" : "border-input"}`}>
                    {state === "done" ? <Check className="size-3.5" /> : i + 1}
                  </span>{s}
                </li>
              );
            })}
          </ol>
          <div className="rounded-xl border border-border bg-secondary p-5 text-sm text-muted-foreground">
            <Mail className="size-4 text-primary" />
            <p className="mt-2">Prefer email?</p>
            <a href={`mailto:${EMAIL}`} className="font-medium text-foreground hover:text-primary">{EMAIL}</a>
          </div>
        </aside>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-md md:p-10">
          {done ? (
            <div className="animate-in fade-in">
              <CheckCircle2 className="size-10 text-success" />
              <h2 className="mt-5 text-3xl font-semibold text-navy">Request received, {f.name.trim().split(" ")[0]}.</h2>
              <p className="mt-3 text-muted-foreground">
                {mode === "call" ? <>We've noted your preferred consultation slot (<b className="text-foreground">{slot}</b>) and will send a calendar invite to {f.email}.</> : <>We'll prepare a written quote and send it to {f.email}.</>}
              </p>
              <dl className="mt-8 divide-y divide-border rounded-xl border border-border text-sm">
                {[["Company", `${f.company} (${f.size} employees)`], ["Systems", stack.join(", ")], ["Needs", needs.join(", ")]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 px-4 py-3"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
                ))}
              </dl>
              <Link to="/work" className={btnSecondary + " mt-8"}>Explore client work</Link>
            </div>
          ) : (
            <div key={step} className="animate-in fade-in">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">Step {step + 1} of 3</div>
              <h2 className="mt-2 text-2xl font-semibold text-navy">{STEPS[step]}</h2>

              {step === 0 && (
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {([["name", "Full name", "text"], ["email", "Work email", "email"], ["company", "Company name", "text"]] as const).map(([k, l, t]) => (
                    <label key={k} className={k === "company" ? "sm:col-span-2" : ""}>
                      <span className={label}>{l}</span>
                      <input type={t} value={f[k]} maxLength={255} onChange={(e) => setF({ ...f, [k]: e.target.value })} className={input} />
                      <Err k={k} />
                    </label>
                  ))}
                  <div className="sm:col-span-2">
                    <span className={label}>Company size</span>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">{SIZES.map((s) => <button type="button" key={s} onClick={() => setF({ ...f, size: s })} className={chip(f.size === s)}>{s}</button>)}</div>
                    <Err k="size" />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="mt-8 space-y-7">
                  <div>
                    <span className={label}>Systems in your stack</span>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">{STACKS.map((s) => <button type="button" key={s} onClick={() => toggle(stack, setStack, s)} className={chip(stack.includes(s))}>{s}{stack.includes(s) && <Check className="size-4" />}</button>)}</div>
                    <Err k="stack" />
                  </div>
                  <div>
                    <span className={label}>Integration needs</span>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">{NEEDS.map((s) => <button type="button" key={s} onClick={() => toggle(needs, setNeeds, s)} className={chip(needs.includes(s))}>{s}{needs.includes(s) && <Check className="size-4" />}</button>)}</div>
                    <Err k="needs" />
                  </div>
                  <label className="block">
                    <span className={label}>Primary operational bottleneck</span>
                    <textarea rows={4} value={notes} maxLength={1000} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Sales orders are re-keyed from Salesforce into NetSuite every day." className={input} />
                    <Err k="notes" />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="mt-8 space-y-7">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {([["call", "Book a 30-minute consultation", "Talk through your systems with a founding engineer."], ["quote", "Request a written quote", "Receive a scoped estimate by email."]] as const).map(([k, t, d]) => (
                      <button type="button" key={k} onClick={() => setMode(k)} className={`rounded-xl border p-5 text-left transition ${mode === k ? "border-primary bg-accent" : "border-border hover:border-primary/50"}`}>
                        <div className="font-semibold text-navy">{t}</div><div className="mt-1 text-sm text-muted-foreground">{d}</div>
                      </button>
                    ))}
                  </div>
                  {mode === "call" && (
                    <div>
                      <span className={label}>Preferred time (your local time)</span>
                      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">{SLOTS.map((s) => <button type="button" key={s} onClick={() => setSlot(s)} className={chip(slot === s)}>{s}</button>)}</div>
                      <Err k="slot" />
                    </div>
                  )}
                </div>
              )}

              <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className="text-sm font-medium text-muted-foreground hover:text-foreground">← Back</button> : <span />}
                <button type="button" onClick={next} className={btnPrimary}>{step < 2 ? "Continue" : mode === "call" ? "Confirm consultation" : "Request quote"}</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
