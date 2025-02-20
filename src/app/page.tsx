import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getArticles } from '@/lib/db'

// Her istekte sayfayı yeniden oluştur
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Tt.',
  description: 'Product Designer Portfolio',
}

export default async function HomePage() {
  const articles = await getArticles()

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <section className="mb-16">
        <h1 className="text-xl font-medium mb-2">Tuna Taşmaz</h1>
        <h2 className="text-lg text-gray-800 mb-1 font-bold">Girişimci & Ürün Tasarımcısı</h2>
        <p className="text-gray-600 mb-6">İstanbul, Türkiye</p>

        <div className="text-gray-600 space-y-4">
          <p>
            <a 
              href="https://connectlist.me" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 font-bold hover:text-gray-700 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gray-600 after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Connectlist
            </a> adında bir proje geliştiriyorum. Aynı zamanda Yapay zeka araçları ve dijital ürün tasarımıyla ilgileniyorum.
          </p>
          
          <p>
            Kendi projelerim ve zaman buldukça bilgi içerikli tasarımları hayata geçiriyorum.
          </p>
          
          <p>
            Okuduğum kitapları öneriyor, farklı konularda makaleler yazıyorum. 2015 yılında yazdığım Şiir kitabımı da burada bulabilirsin.
          </p>
          
          <p>
            Projeler, tasarımlar ve sektör üzerinde konuşmak için,{' '}
            <a 
              href="mailto:tunatasmaz@gmail.com"
              className="text-gray-500 font-bold hover:text-gray-700 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gray-600 after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              benimle iletişime geçebilirsin.
            </a>
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-8">Makaleler</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles && articles.map((article) => (
            <Link 
              key={article.id}
              href={`/${article.slug}`}
              className="group block"
            >
              <article className="flex flex-col h-full bg-white rounded-xl overflow-hidden hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:shadow-sm">
                {article.image_url && (
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-between flex-grow p-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <time className="text-sm font-medium text-gray-400 tracking-wide">
                        {new Intl.DateTimeFormat('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }).format(new Date(article.created_at))}
                      </time>
                    </div>
                    <h2 className="text-lg font-semibold mb-3 group-hover:text-gray-600 transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-gray-600 line-clamp-2 leading-relaxed text-sm">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 text-sm font-medium text-gray-600">
                    <span>Devamını Oku</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
