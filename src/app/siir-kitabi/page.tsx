import { Metadata } from 'next'
import { getPoems } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Şiir Kitabı | Şiir Koleksiyonum',
  description: 'Yazdığım şiirler ve düşünceler',
}

export default async function PoemsPage() {
  const poems = await getPoems()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Şiir Kitabı</h1>
      <div className="space-y-12">
        {poems.map((poem) => (
          <article
            key={poem.id}
            className="prose prose-lg dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 p-8 rounded-lg"
          >
            <h2 className="mb-4 font-serif">{poem.title}</h2>
            <div 
              className="whitespace-pre-wrap font-serif"
              dangerouslySetInnerHTML={{ __html: poem.content }}
            />
            <time className="text-sm text-gray-500 mt-4 block">
              {new Date(poem.written_at).toLocaleDateString('tr-TR')}
            </time>
          </article>
        ))}
      </div>
    </div>
  )
}
