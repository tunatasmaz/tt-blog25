import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getArticles } from '@/lib/db'

// Her istekte sayfayı yeniden oluştur
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Makaleler | Blog',
  description: 'Teknoloji, yazılım ve kişisel deneyimler hakkında yazılar',
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-2xl font-medium mb-8">Makaleler</h1>

      <div className="space-y-4 mb-12">
        <p className="text-gray-600">
          Önce tasarlıyorum sonra anlam ve bütünlük olarak inceliyorum.
        </p>
        <p className="text-gray-600">
          Tasarım üzerine yazılar yazdığım da doğru. Kategorileri ileride çoğaltırız.
        </p>
        <p className="text-gray-600">
          Size edebiyat ile ilgilendiğimi söylemiş miydim 🙂
        </p>
      </div>

      <div className="space-y-8">
        {articles.map((article) => (
          <Link 
            key={article.id}
            href={`/makaleler/${article.slug}`}
            className="group block"
          >
            <article className="grid md:grid-cols-[280px,1fr] gap-6 bg-white rounded-lg overflow-hidden hover:bg-gray-50 transition-colors p-4">
              {article.image_url && (
                <div className="relative h-[200px] md:h-[200px] w-full">
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="py-2">
                <h2 className="text-xl font-medium mb-3">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="text-gray-600 mb-4 line-clamp-3 text-sm">
                  {article.content}
                </div>
                <time className="text-sm text-gray-500">
                  {new Date(article.created_at).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
