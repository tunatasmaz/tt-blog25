import { Metadata } from 'next'
import Image from 'next/image'
import { getBooks } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Kitap Tavsiyeleri | Okuma Listesi',
  description: 'Okuduğum ve tavsiye ettiğim kitaplar',
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Kitap Tavsiyeleri</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div key={book.id} className="border rounded-lg overflow-hidden">
            {book.cover_image && (
              <Image
                src={book.cover_image}
                alt={book.title}
                width={400}
                height={600}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {book.author}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {book.description}
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Neden Okumalısınız?</h3>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  {book.recommendation_note}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
