'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Portfolyo', href: '/' },
  { name: 'Hakkımda', href: '/hakkimda' },
  { name: 'Makaleler', href: '/makaleler' },
  { name: 'Kitap Tavsiyeleri', href: '/kitap-tavsiyeleri' },
  { name: 'Bir ki cümle Şiir Kitabı', href: '/siir-kitabi' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-4xl font-bold">
          Tt.
        </Link>
        
        <nav className="flex items-center space-x-8">
          {navigation.map((item) => {
            const isActive = 
              item.href === '/' 
                ? pathname === '/' || pathname === '/portfolyo'
                : pathname?.startsWith(item.href)

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-1 text-sm transition-colors ${
                  isActive ? 'text-black' : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-px bg-black" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
