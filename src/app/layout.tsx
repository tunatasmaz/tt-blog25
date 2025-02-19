import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Tuna Taşmaz | Portfolio',
  description: 'Product Designer Portfolio',
  icons: {
    icon: [
      {
        url: '/image/favicon.png',
        type: 'image/png',
      }
    ]
  },
  openGraph: {
    title: 'Tuna Taşmaz | Portfolio',
    description: 'Product Designer Portfolio',
    url: 'https://tunatasmaz.com',
    siteName: 'Tuna Taşmaz',
    images: [
      {
        url: '/image/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tuna Taşmaz Portfolio',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tuna Taşmaz | Portfolio',
    description: 'Product Designer Portfolio',
    images: ['/image/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Tuna Taşmaz',
              url: 'https://tunatasmaz.com',
              sameAs: [
                'https://twitter.com/tunatasmaz',
                'https://linkedin.com/in/tunatasmaz'
              ],
              jobTitle: 'Product Designer',
              description: 'Ürün tasarımcısı ve UX/UI uzmanı',
              knowsAbout: ['UI Design', 'UX Design', 'Product Design', 'User Research']
            })
          }}
        />
      </head>
      <body className="bg-white text-gray-900 antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
