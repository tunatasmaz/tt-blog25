'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Book {
  id: string
  title: string
  author: string
  created_at: string
}

export default function EditBookPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookId = searchParams.get('id')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Book>({
    id: '',
    title: '',
    author: '',
    created_at: ''
  })

  useEffect(() => {
    async function fetchBook() {
      try {
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .eq('id', bookId)
          .single()

        if (error) throw error

        if (data) {
          setFormData(data)
        }
      } catch (error) {
        console.error('Error fetching book:', error)
        alert('Kitap bilgileri alınırken bir hata oluştu.')
      }
    }

    if (bookId) {
      fetchBook()
    }
  }, [bookId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('books')
        .update({
          title: formData.title,
          author: formData.author
        })
        .eq('id', bookId)

      if (error) throw error

      router.push('/admin/dashboard')
      router.refresh()
    } catch (error) {
      console.error('Error updating book:', error)
      alert('Kitap güncellenirken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Kitabı Düzenle</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Kitap Adı</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Yazar</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full p-2 border rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  )
}
