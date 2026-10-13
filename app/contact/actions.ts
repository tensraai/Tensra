'use server'

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

  if (get('website')) return { status: 'success' }

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

  console.log('[contact] New enquiry', {
    name: values.name,
    email: values.email,
    company: values.company,
    type: values.type,
    length: values.message.length,
  })

  return { status: 'success', values }
}
