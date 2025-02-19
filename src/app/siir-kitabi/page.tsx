import { Metadata } from 'next'

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
        
        <div className="w-full aspect-[1/1.4] relative">
          <iframe
            src="/pdf/bir-ki-cumle-kitap.pdf"
            className="w-full h-full absolute"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}
