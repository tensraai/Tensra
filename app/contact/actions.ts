'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'email' | 'company' | 'type' | 'message', string>>
  values?: Record<string, string>
}

const projectTypes = ['crm-erp', 'automation', 'agents', 'product', 'other']
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? '').trim()
  const values = {
    name: get('name'),
    email: get('email'),
    company: get('company'),
    type: get('type'),
    message: get('message'),
  }

  // Honeypot check for spam bots
  if (get('website')) return { status: 'success' }

  // Validation
  const errors: ContactState['errors'] = {}
  if (values.name.length < 2 || values.name.length > 100) errors.name = 'Please enter your name.'
  if (!emailPattern.test(values.email) || values.email.length > 200) errors.email = 'Please enter a valid work email.'
  if (values.company.length > 120) errors.company = 'Company name is too long.'
  if (!projectTypes.includes(values.type)) errors.type = 'Please choose a project type.'
  if (values.message.length < 20) errors.message = 'Please describe your project in at least 20 characters.'
  if (values.message.length > 4000) errors.message = 'Please keep your message under 4,000 characters.'

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please fix the highlighted fields.', errors, values }
  }

  try {
    // Send email via Resend
    await resend.emails.send({
      from: 'Tensra AI Contact <onboarding@resend.dev>', // You can verify tensraai.com domain on Resend later to use hello@tensraai.com as sender
      to: 'hello@tensraai.com',
      replyTo: values.email, // Allows clicking 'Reply' in email client to email the client back directly
      subject: `[New Enquiry] ${values.name} - ${values.type}`,
      html: `
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${values.name}</p>
        <p><strong>Work Email:</strong> ${values.email}</p>
        <p><strong>Company:</strong> ${values.company || 'N/A'}</p>
        <p><strong>Project Type:</strong> ${values.type}</p>
        <hr />
        <h3>Message / Requirements:</h3>
        <p style="white-space: pre-wrap;">${values.message}</p>
      `,
    })

    return { status: 'success', values }
  } catch (error) {
    console.error('[contact] Failed to send email:', error)
    return {
      status: 'error',
      message: 'Failed to send message. Please try again or email us directly.',
      values,
    }
  }
}