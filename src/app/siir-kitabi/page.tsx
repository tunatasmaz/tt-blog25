import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bir ki cümle Şiir Kitabı | Tuna Taşmaz',
  description: 'Yazdığım şiirler ve düşünceler',
}

export default function PoemsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Bir ki cümle Şiir Kitabı</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 mb-8">
        <p>2015 yılında çıkmış olan 'Bir Ki Cümle' kitabımı kendi sitemde yayınlamaya karar verdim.</p>
        <p>22 yaşında iken hayallerimden birini gerçekleştirmiş oldum. Yıl 2024 ve hala yazmaya devam ediyorum.</p>
        <p>İkinci kitap için hala yazacak çok şey olduğunu düşünüyorum.</p>
        <p>Kitabı 2015 yılındaki aynı ruhla yani, kitap üzerindeki yazım hatalarıyla, basıma giden haliyle paylaşıyorum.</p>
        <p>Keyifli okumalar...</p>
      </div>
      
      <div className="w-full aspect-[1/1.4] relative">
        <iframe
          src="/pdf/bir-ki-cumle-kitap.pdf"
          className="w-full h-full absolute"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  )
}
