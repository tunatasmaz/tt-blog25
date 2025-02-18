import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Tt.
        </Link>
        
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/portfolyo" className="hover:text-gray-600 dark:hover:text-gray-300">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/hakkimda" className="hover:text-gray-600 dark:hover:text-gray-300">
                Hakkımda
              </Link>
            </li>
            <li>
              <Link href="/makaleler" className="hover:text-gray-600 dark:hover:text-gray-300">
                Makaleler
              </Link>
            </li>
            <li>
              <Link href="/kitap-tavsiyeleri" className="hover:text-gray-600 dark:hover:text-gray-300">
                Kitap Önerileri
              </Link>
            </li>
            <li>
              <Link href="/siir-kitabi" className="hover:text-gray-600 dark:hover:text-gray-300">
                Bir Ki Cümle Şiir Kitabı
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
