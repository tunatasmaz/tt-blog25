'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Portfolyo', href: '/portfolyo' },
  { name: 'Hakkımda', href: '/hakkimda' },
  { name: 'Makaleler', href: '/makaleler' },
  { name: 'Kitap Tavsiyeleri', href: '/kitap-tavsiyeleri' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-4xl font-bold">
          Tt.
        </Link>
        
        <div className="flex items-center space-x-8">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm transition-colors ${
                  isActive ? 'text-black' : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
