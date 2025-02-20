import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Bir ki cümle Şiir Kitabı | Tuna Taşmaz',
  description: 'Yazdığım şiirler ve düşünceler',
}

export default function PoemsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <section className="mb-12">
          <h1 className="text-2xl font-medium mb-6">Bir ki cümle Şiir Kitabı</h1>
          
          <div className="leading-snug space-y-1">
            <p className="text-gray-600">2015 yılında çıkmış olan 'Bir Ki Cümle' kitabımı kendi sitemde yayınlamaya karar verdim.</p>
            <p className="text-gray-600">22 yaşında iken hayallerimden birini gerçekleştirmiş oldum. Yıl 2024 ve hala yazmaya devam ediyorum.</p>
            <p className="text-gray-600">İkinci kitap için hala yazacak çok şey olduğunu düşünüyorum.</p>
            <p className="text-gray-600">Kitabı 2015 yılındaki aynı ruhla yani, kitap üzerindeki yazım hatalarıyla, basıma giden haliyle paylaşıyorum.</p>
            <p className="text-gray-600">Keyifli okumalar...</p>
          </div>
        </section>
        
        {/* Masaüstü için PDF görüntüleyici */}
        <div className="hidden md:block w-full aspect-[1/1.4] relative">
          <iframe
            src="/pdf/bir-ki-cumle-kitap.pdf"
            className="w-full h-full absolute"
            style={{ border: 'none' }}
          />
        </div>

        {/* Mobil için kitap kapağı */}
        <div className="md:hidden">
          <a 
            href="/pdf/bir-ki-cumle-kitap.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src="/image/bir-ki-cumle-kitap.jpg"
                alt="Bir Ki Cümle - Kitap Kapağı"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              Kitabı okumak için kapağa tıklayın
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}
