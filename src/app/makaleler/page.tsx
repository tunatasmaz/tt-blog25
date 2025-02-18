import { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Makaleler | Blog',
  description: 'Teknoloji, yazılım ve kişisel deneyimler hakkında yazılar',
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Makaleler</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link 
            key={article.id}
            href={`/makaleler/${article.slug}`}
            className="group block"
          >
            <article className="border rounded-lg p-6 transition-shadow hover:shadow-lg">
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                {article.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {article.excerpt}
              </p>
              <time className="text-sm text-gray-500 mt-2 block">
                {new Date(article.created_at).toLocaleDateString('tr-TR')}
              </time>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
