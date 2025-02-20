import { Metadata } from 'next'
import { getBooks } from '@/lib/db'
import BookList from './book-list'

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
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-medium mb-6">Kitap Önerileri</h1>
        <p className="text-gray-600">Kitaplar yüklenirken bir hata oluştu.</p>
      </div>
    )
  }

  if (!books || books.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-medium mb-6">Kitap Önerileri</h1>
        <p className="text-gray-600">Henüz kitap tavsiyesi eklenmemiş.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium mb-2">Kitap Önerileri</h1>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Okuduğum ya da okuma listemde olan kitapları burada listeliyorum.</p>
            <p>Keyifli okumalar...</p>
          </div>
        </div>
      </div>

      <BookList books={books} />
    </div>
  )
}
