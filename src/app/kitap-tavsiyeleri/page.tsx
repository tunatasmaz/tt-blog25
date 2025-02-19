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
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-2xl font-medium mb-8">Kitap Önerileri</h1>

      <div className="space-y-4 mb-12">
        <p className="text-gray-600">
          Okuduğum ya da okuma listemde olan kitapları burada listeliyorum.
        </p>
        <p className="text-gray-600">
          Keyifli okumalar...
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div 
            key={book.id}
            className="bg-gray-50 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100"
          >
            <h2 className="text-lg font-medium mb-2">{book.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{book.author}</p>
            <p className="text-gray-600 text-sm line-clamp-3">{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
