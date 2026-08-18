import type { Metadata } from 'next'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

// Without its own metadata this page inherited the root layout's
// `alternates: { canonical: '/' }` and the homepage <title>, i.e. it told Google
// "I am the homepage" while serving unrelated transactional content. Google
// routinely ignores a cross-canonical like that and indexes the page under the
// borrowed title instead. It is a utility route with no search value, so:
// noindex, and a self-referential canonical rather than a pointer at `/`.
export const metadata: Metadata = {
  title: { absolute: 'Unsubscribe · Coop Vent Calc' },
  robots: { index: false, follow: true },
  alternates: { canonical: '/unsubscribe' },
}

async function unsubscribe(email: string): Promise<'ok' | 'invalid' | 'not-configured' | 'error'> {
  if (!email || !/.+@.+\..+/.test(email)) return 'invalid'
  const key = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!key || !audienceId) return 'not-configured'
  try {
    const resend = new Resend(key)
    await resend.contacts.update({ audienceId, email, unsubscribed: true })
    return 'ok'
  } catch {
    return 'error'
  }
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const sp = await searchParams
  const email = sp.email || ''
  const result = await unsubscribe(email)

  const messages: Record<typeof result, { title: string; body: string }> = {
    ok: {
      title: 'You are unsubscribed.',
      body: `${email} will not receive further emails from coopventilationcalc.com.`,
    },
    invalid: {
      title: 'No email provided.',
      body: 'This link is missing an email address. If you believe this is in error, reply to the email you received and we will remove you manually.',
    },
    'not-configured': {
      title: 'Unsubscribe temporarily unavailable.',
      body: 'Reply to any email from coopventilationcalc.com with the word UNSUBSCRIBE and we will remove you manually within one business day.',
    },
    error: {
      title: 'Something went wrong.',
      body: `We could not unsubscribe ${email} automatically. Reply to any email from coopventilationcalc.com with the word UNSUBSCRIBE and we will remove you manually within one business day.`,
    },
  }

  const m = messages[result]

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center">
        <h1 className="font-serif text-4xl sm:text-5xl mb-6">{m.title}</h1>
        <p className="text-lg leading-relaxed">{m.body}</p>
        <p className="mt-10">
          <a href="/" className="underline">
            Back to coopventilationcalc.com
          </a>
        </p>
      </div>
    </main>
  )
}
