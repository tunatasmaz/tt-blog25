import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Hakkımda | Tuna Taşmaz',
  description: 'Product Designer',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <section className="mb-12">
          <h1 className="text-2xl font-medium mb-6">Hakkımda</h1>
          
          <div className="leading-snug space-y-1">
            <p className="text-gray-600">
              Her şeye istediğin, bedel ödemeden, acı çekmeden erişemezsin.
            </p>
            <p className="text-gray-600">
              Çok çalışmalı ve denemekten vazgeçmemelisin
            </p>
          </div>
        </section>

        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Sol Taraf - Bilgiler */}
            <div className="md:col-span-2">
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-2">Tuna Taşmaz</h2>
                  <p className="text-gray-600">Product Designer</p>
                </div>

                <div className="space-y-6 text-gray-600">
                  <p>2015 yılından bu zamana kadar Web Programlama ve Tasarım endüstrisi içerisindeyim. Html, css ile başlayan serüvenim js, c#, MVC projeleriyle devam etti.</p>
                  
                  <p>Sonra illustrator, Photoshop derken serüvene yeni 'chapter' lar eklendi 🙂</p>
                  
                  <p>Tasarım yapmak, bir şeylerin oluşumuna tanıklık etmek ve yaratmak aldığım en büyük keyif oldu hep. Yaratıcı bir insan olduğuma hep inandım, hayal gücümü kullanmayı ve zorlamayı ilke edindim.</p>
                  
                  <p>Mobil uygulama tasarımı ise benim en çok sevdiğim, en çok içerisinde bulunmak istediğim alan oldu. Mobil uygulama ile insanların ihtiyaçlarına dokunabilmek, fikirlerine ışık tutabilmek çok değerli.</p>
                </div>
              </div>
            </div>

            {/* Sağ Taraf - Görsel */}
            <div className="relative h-[700px] md:col-span-3">
              <Image
                src="/image/vsco_061724.jpg"
                alt="Marina gün batımı"
                fill
                className="object-cover rounded-lg"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
