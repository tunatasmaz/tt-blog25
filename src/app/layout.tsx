import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tuna Taşmaz | Portfolio',
  description: 'Product Designer Portfolio and Blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <Header />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
