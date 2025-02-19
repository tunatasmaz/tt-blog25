import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Hakkımda | Kişisel Blog',
  description: 'Kim olduğum ve neler yaptığım hakkında bilgiler',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid md:grid-cols-[2fr_3fr] gap-12 items-start">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src="/profile.jpg"
            alt="Profil fotoğrafı"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Merhaba, Ben [Adınız]</h1>
          
          <p className="text-lg text-gray-700 dark:text-gray-300">
            [Kısa bir giriş yazısı - kendinizi tanıtın]
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Deneyim</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="font-semibold">Şirket Adı</h3>
                <p className="text-gray-600 dark:text-gray-400">Pozisyon • 2020 - Günümüz</p>
                <p>Sorumluluklar ve başarılar</p>
              </li>
              {/* Diğer deneyimler */}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Eğitim</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="font-semibold">Üniversite Adı</h3>
                <p className="text-gray-600 dark:text-gray-400">Bölüm • 2016 - 2020</p>
              </li>
              {/* Diğer eğitimler */}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Yetenekler</h2>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">İletişim</h2>
            <div className="flex gap-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                LinkedIn
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                E-posta
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
