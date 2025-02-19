import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

// Her istekte sayfayı yeniden oluştur
export const revalidate = 0

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  noStore();
  const article = await getArticleBySlug(params.slug)
  
  if (!article) {
    return {
      title: 'Makale Bulunamadı - Tt.',
      description: 'İstediğiniz makale bulunamadı veya yayından kaldırılmış olabilir.',
    }
  }

  return {
    title: `${article.title} - Tt.`,
    description: article.excerpt || article.title,
  }
}

export default async function ArticlePage({ params }: Props) {
  noStore();
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Makale Bulunamadı</h1>
        <p className="text-gray-600">
          İstediğiniz makale bulunamadı veya yayından kaldırılmış olabilir.
        </p>
      </div>
    )
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      {article.image_url && (
        <div className="relative aspect-[2/1] mb-8">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <time className="text-gray-500 mb-8 block">
        {new Date(article.created_at).toLocaleDateString('tr-TR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
      <div 
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  )
}
