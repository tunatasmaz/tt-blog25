'use client'

import { useState } from 'react'

interface Book {
  id: number
  title: string
  author: string
  description?: string
}

interface BookListProps {
  books: Book[]
}

export default function BookList({ books }: BookListProps) {
  const [expandedBook, setExpandedBook] = useState<number | null>(null)

  const toggleDescription = (bookId: number) => {
    setExpandedBook(expandedBook === bookId ? null : bookId)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div 
          key={book.id}
          className={`group bg-white border-b border-gray-100 p-3 hover:bg-gray-50 transition-all duration-200 ${
            expandedBook === book.id ? 'shadow-sm' : ''
          }`}
        >
          <div className="flex flex-col h-full">
            <h2 className="text-base font-medium mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
              {book.title}
            </h2>
            <p className="text-sm text-gray-500 mb-2 line-clamp-1">{book.author}</p>
            
            {book.description && (
              <div className="mt-auto">
                {expandedBook === book.id ? (
                  <>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                      {book.description}
                    </p>
                    <button 
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={() => toggleDescription(book.id)}
                    >
                      Gizle
                    </button>
                  </>
                ) : (
                  <button 
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => toggleDescription(book.id)}
                  >
                    Detaylar
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
