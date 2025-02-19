import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Tuna Taşmaz | Portfolio',
  description: 'Product Designer Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable}`}>
      <body
        className={`${inter.className} bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
