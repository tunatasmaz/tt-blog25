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
        <h1 className="text-2xl font-medium mb-8">Hakkımda</h1>
        
        <p className="text-gray-600 mb-4">
          Her şeye istediğin, bedel ödemeden, acı çekmeden erişemezsin.
        </p>
        <p className="text-gray-600 mb-12">
          Çok çalışmalı ve denemekten vazgeçmemelisin
        </p>

        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Sol Taraf - Bilgiler */}
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-2">Tuna Taşmaz</h2>
                <p className="text-gray-600">Product Designer</p>
              </div>

              <div className="space-y-4 text-gray-600">
                <p>2015 yılından bu zamana kadar Web Programlama ve Tasarım endüstrisi içerisindeyim.Html, css ile başlayan serüvenim js, c#, MVC projeleriyle devam etti.</p>
                
                <p>Sonra illustrator, Photoshop derken serüvene yeni 'chapter' lar eklendi 🙂</p>
                
                <p>Bir çok projede rol almak bir yana,<br />
                Bir yandan tasarım yapıyor olmak ve<br />
                tasarladığım hikayeyi koda dökebilmek beni cezbeden bir olaydı.<br />
                Freelance ya da çalıştığım şirketlerde yaptığım işlerde hep bu prensibi devam ettirdim.</p>
                
                <p>Tasarım yapmak, bir şeylerin oluşumuna tanıklık etmek ve yaratmak,<br />
                aldığım en büyük keyif oldu hep. Yaratıcı bir insan olduğuma hep inandım,<br />
                hayal gücümü kullanmayı ve zorlamayı ilke edindim. Bu sebepten<br />
                farklı tasarımlar yapmaktan hiç çekinmedim. Kartvizit, broşür, katalog hatta<br />
                Taraftar uygulanma pankarttlar bile tasarladım.</p>
                
                <p>Mobil uygulama tasarımı ise benim en çok sevdiğim, en çok içerisinde<br />
                bulunmak istediğim alan oldu.</p>
                
                <p>Mobil uygulama ile insanların ihtiyaçlarına dokunabilmek,<br />
                fikirlerine ışık tutabilmek çok değerli.</p>
                
                <p>En önemlisi tasarladığın bir hikayenin parçası olmak ve onun insanlara<br />
                ulaştığını görmek tarif edilmesi zor bir duygu.</p>
              </div>
            </div>

            {/* Sağ Taraf - Görsel */}
            <div className="relative h-full min-h-[600px]">
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
