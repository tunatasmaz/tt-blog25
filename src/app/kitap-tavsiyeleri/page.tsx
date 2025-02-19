import { Metadata } from 'next'
import { getBooks } from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Kitap Tavsiyeleri | Okuma Listesi',
  description: 'Okuduğum ve tavsiye ettiğim kitaplar',
}

export default async function BooksPage() {
  const { data: books, error } = await getBooks()

  if (error) {
    console.error('Error fetching books:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Kitap Tavsiyeleri</h1>
        <p>Kitaplar yüklenirken bir hata oluştu.</p>
      </div>
    )
  }

  if (!books || books.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Kitap Tavsiyeleri</h1>
        <p>Henüz kitap tavsiyesi eklenmemiş.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Kitap Tavsiyeleri</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div key={book.id} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {book.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
