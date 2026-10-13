import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, IBM_Plex_Sans } from 'next/font/google'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { MotionProvider, ScrollProgress } from '@/components/site/motion'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-bricolage',
  display: 'swap',
})

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tensraai.com'),
  title: {
    default: 'Tensra AI | AI Systems That Connect, Automate and Deliver',
    template: '%s | Tensra AI',
  },
  description:
    'Tensra AI engineers AI-powered integrations, business workflows and intelligent software systems that connect CRM, ERP, accounting and internal tools.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Tensra AI',
    url: 'https://tensraai.com',
    title: 'Tensra AI | AI Systems That Connect, Automate and Deliver',
    description:
      'CRM & ERP integration, AI workflow automation, AI agents and AI product engineering.',
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/images/tensra-logo.png', apple: '/images/tensra-logo.png' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080a10',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plex.variable} bg-background`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
