'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Makaleler', href: '/' },
  { name: 'Portfolyo', href: '/portfolyo' },
  { name: 'Hakkımda', href: '/hakkimda' },
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
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-1 text-sm transition-all duration-300 ${
                  isActive 
                    ? 'text-black font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-black after:scale-x-100' 
                    : 'text-gray-600 hover:text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-black after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
