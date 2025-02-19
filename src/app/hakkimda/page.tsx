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
          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Sol Taraf - Bilgiler */}
            <div className="md:col-span-2 sticky top-8">
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium mb-1">Tuna Taşmaz</h2>
                  <p className="text-gray-600 text-sm"><b>Girişimci & Ürün Tasarımcısı</b></p>
                </div>

                <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                  <p>2015 yılından bu zamana kadar Web Programlama ve Tasarım
                  endüstrisi içerisindeyim. Html, css ile başlayan serüvenim
                  js, c#, MVC projeleriyle devam etti.</p>
                  
                  <p>Sonra illustrator, Photoshop gibi tasarım araçlarıyla ilgilenirken
                  serüvenime yeni 'chapter' lar eklendi 🙂</p>
                  
                  <p>Bir çok projede rol almak bir yana,
                  Bir yandan tasarım yapıyor olmak ve
                  tasarladığım hikayeyi koda dökebilmek beni cezbeden bir olaydı.
                  Freelance ya da çalıştığım şirtketlerde yaptığım işlerde hep bu
                  prensibi devam ettirdim.</p>
                  
                  <p>Tasarım yapmak, bir şeylerin oluşumuna tanıklık etmek ve yaratmak,
                  aldığım en büyük keyif oldu hep. Yaratıcı bir insan olduğuma hep inandım,
                  hayal gücümü kullanmayı ve zorlamayı ilke edindim. Bu sebepten
                  farklı tasarımlar yapmaktan hiç çekinmedim. Kartvizit, broşür, katalog hatta
                  Taraftar gruplarına pankartlar bile tasarladım.</p>
                  
                  <p>Mobil uygulama tasarımı ise benim en çok sevdiğim, en çok içerisinde
                  bulunmak istediğim alan oldu.
                  Mobil uygulama ile insanların ihtiyaçlarına dokunabilmek,
                  fikirlerine ışık tutabilmek çok değerli.</p>
                  
                  <p>Yapay zeka araçlarıyla tasarım yapıyor olmak, proje geliştiriyor olmanın verdiği
                  hız ve yenilikçi yaklaşım beni her geçen gün daha heyecanlandırıyor. 
                  Bu sebepten kendi projem olan{' '}
                  <a 
                    href="https://connectlist.me" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-bold hover:text-gray-900 transition-colors"
                  >
                    connectlist
                  </a>'i geliştirmekten de çok mutluyum.</p>
                </div>
              </div>
            </div>

            {/* Sağ Taraf - Görsel */}
            <div className="relative h-[800px] md:col-span-3">
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
