import { Metadata } from 'next'
import { getArticleBySlug } from '@/lib/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }

  return {
    title: article.title,
    description: article.excerpt || article.title,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <article className="prose prose-lg mx-auto">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-2 mb-8 text-gray-600">
          <time className="text-sm">
            {new Intl.DateTimeFormat('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).format(new Date(article.created_at))}
          </time>
        </div>

        {article.image_url && (
          <div className="relative w-full aspect-[16/9] mb-8 rounded-xl overflow-hidden">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-lg prose-gray"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
      </article>
    </div>
  )
}
