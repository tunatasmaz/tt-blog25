'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navigation = [
  { name: 'Makaleler', href: '/' },
  { name: 'Portfolyo', href: '/portfolyo' },
  { name: 'Hakkımda', href: '/hakkimda' },
  { name: 'Kitap Tavsiyeleri', href: '/kitap-tavsiyeleri' },
  { name: 'Bir ki cümle Şiir Kitabı', href: '/siir-kitabi' },
]

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Menü açıkken scroll'u engelle
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <div className="relative z-50 border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 sm:px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-4xl font-bold relative z-50">
          Tt.
        </Link>
        
        {/* Hamburger menü butonu - sadece mobilde görünür */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 relative z-50"
          aria-label="Menu"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="relative w-full">
              <span 
                className={`absolute h-0.5 w-full bg-black transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                }`}
              />
              <span 
                className={`absolute h-0.5 w-full bg-black transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`absolute h-0.5 w-full bg-black transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                }`}
              />
            </div>
          </div>
        </button>

        {/* Desktop menü */}
        <nav className="hidden md:flex items-center space-x-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-1 text-sm transition-all duration-300 ${
                  isActive 
                    ? 'text-black font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black' 
                    : 'text-gray-600 hover:text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Mobil menü - tam ekran */}
        <div
          className={`fixed md:hidden inset-0 bg-white transition-all duration-500 ease-in-out ${
            isMenuOpen 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-light transition-colors duration-300 ${
                    isActive
                      ? 'text-black font-normal'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
