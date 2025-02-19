'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, signOut } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { Article, Book, Portfolio } from '@/types'

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('articles')
  const [articles, setArticles] = useState<Article[]>([])
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([])
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { session } = await getSession()
      if (!session) {
        router.push('/admin/login')
      } else {
        loadAll()
      }
    }
    checkSession()
  }, [router])

  const loadAll = async () => {
    try {
      const [articlesRes, portfolioRes, booksRes] = await Promise.all([
        supabase.from('articles').select('*').order('created_at', { ascending: false }),
        supabase.from('portfolio').select('*').order('created_at', { ascending: false }),
        supabase.from('books').select('*').order('created_at', { ascending: false })
      ])

      if (articlesRes.error) throw articlesRes.error
      if (portfolioRes.error) throw portfolioRes.error
      if (booksRes.error) throw booksRes.error

      setArticles(articlesRes.data || [])
      setPortfolioItems(portfolioRes.data || [])
      setBooks(booksRes.data || [])
    } catch (error) {
      console.error('Error loading data:', error)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string, type: 'articles' | 'portfolio' | 'books') => {
    if (window.confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) {
      const { error } = await supabase
        .from(type)
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting item:', error)
        alert('Öğe silinirken bir hata oluştu.')
      } else {
        loadAll()
        router.refresh()
      }
    }
  }

  const handlePublishToggle = async (item: Article | Portfolio, type: 'articles' | 'portfolio') => {
    const { error } = await supabase
      .from(type)
      .update({ published: !item.published })
      .eq('id', item.id)

    if (error) {
      console.error(`Error updating ${type}:`, error)
    } else {
      loadAll()
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return <div className="p-8">Yükleniyor...</div>
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <div className="space-x-4">
          {activeTab === 'articles' && (
            <button
              onClick={() => router.push('/admin/dashboard/new')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Yeni Makale
            </button>
          )}
          {activeTab === 'portfolio' && (
            <button
              onClick={() => router.push('/admin/dashboard/new-portfolio')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Yeni Portfolyo
            </button>
          )}
          {activeTab === 'books' && (
            <button
              onClick={() => router.push('/admin/dashboard/new-book')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Yeni Kitap
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('articles')}
              className={`${activeTab === 'articles' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Makaleler
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`${activeTab === 'portfolio' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Portfolyo
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className={`${activeTab === 'books' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Kitaplar
            </button>
          </nav>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {activeTab === 'articles' && (
          <table className="min-w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="px-6 py-3 text-left">Başlık</th>
                <th className="px-6 py-3 text-left">Slug</th>
                <th className="px-6 py-3 text-left">Durum</th>
                <th className="px-6 py-3 text-left">Tarih</th>
                <th className="px-6 py-3 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-6 py-4">{article.title}</td>
                  <td className="px-6 py-4">{article.slug}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handlePublishToggle(article, 'articles')}
                      className={`px-2 py-1 rounded ${article.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {article.published ? 'Yayında' : 'Taslak'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(article.created_at).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => router.push(`/admin/dashboard/edit/${article.id}?type=articles`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(article.id, 'articles')}
                      className="text-red-600 hover:text-red-900"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'portfolio' && (
          <table className="min-w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="px-6 py-3 text-left">Başlık</th>
                <th className="px-6 py-3 text-left">Slug</th>
                <th className="px-6 py-3 text-left">Durum</th>
                <th className="px-6 py-3 text-left">Tarih</th>
                <th className="px-6 py-3 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {portfolioItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4">{item.slug}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handlePublishToggle(item, 'portfolio')}
                      className={`px-2 py-1 rounded ${item.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {item.published ? 'Yayında' : 'Taslak'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.created_at).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => router.push(`/admin/dashboard/edit/${item.id}?type=portfolio`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, 'portfolio')}
                      className="text-red-600 hover:text-red-900"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'books' && (
          <table className="min-w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="px-6 py-3 text-left">Kitap Adı</th>
                <th className="px-6 py-3 text-left">Yazar</th>
                <th className="px-6 py-3 text-left">Tarih</th>
                <th className="px-6 py-3 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-6 py-4">{book.title}</td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">
                    {new Date(book.created_at).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => router.push(`/admin/dashboard/edit-book/${book.id}`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(book.id, 'books')}
                      className="text-red-600 hover:text-red-900"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
