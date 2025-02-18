import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/db'

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  
  if (!article) {
    return {
      title: 'Makale Bulunamadı',
    }
  }

  return {
    title: `${article.title} | Blog`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      {article.image_url && (
        <Image
          src={article.image_url}
          alt={article.title}
          width={1200}
          height={600}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <time className="text-gray-500 mb-8 block">
        {new Date(article.created_at).toLocaleDateString('tr-TR')}
      </time>
      <div 
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  )
}
