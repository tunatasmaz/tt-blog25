'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './theme-toggle'

export default function Header() {
  const pathname = usePathname()

  const navigation = [
    { name: 'Portfolyo', href: '/' },
    { name: 'Hakkımda', href: '/hakkimda' },
    { name: 'Makaleler', href: '/makaleler' },
    { name: 'Kitap Tavsiyeleri', href: '/kitap-tavsiyeleri' },
    { name: 'Şiir Kitabı', href: '/siir-kitabi' },
  ]

  return (
    <header className="border-b dark:border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold mr-8">
            Tt.
          </Link>
          <div className="flex space-x-8">
            {navigation.map((item) => {
              const isActive = 
                item.href === '/' 
                  ? pathname === '/'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative py-2 text-base font-medium transition-colors
                    ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                    }
                  `}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400" />
                  )}
                </Link>
              )
            })}
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
