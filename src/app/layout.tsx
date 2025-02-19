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
      <body className="font-sans antialiased bg-white text-black">
        <Header />
        {children}
      </body>
    </html>
  )
}
