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
    <div className="container max-w-5xl mx-auto px-4 sm:px-8 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Panel</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {activeTab === 'articles' && (
            <button
              onClick={() => router.push('/admin/dashboard/new')}
              className="bg-blue-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md hover:bg-blue-700"
            >
              Yeni Makale
            </button>
          )}
          {activeTab === 'portfolio' && (
            <button
              onClick={() => router.push('/admin/dashboard/new-portfolio')}
              className="bg-blue-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md hover:bg-blue-700"
            >
              Yeni Portfolyo
            </button>
          )}
          {activeTab === 'books' && (
            <button
              onClick={() => router.push('/admin/dashboard/new-book')}
              className="bg-blue-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md hover:bg-blue-700"
            >
              Yeni Kitap
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md hover:bg-gray-700"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 sm:space-x-8">
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

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        {activeTab === 'articles' && (
          <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <div className="hidden sm:grid sm:grid-cols-5 gap-4 px-4 py-3 text-sm font-medium text-gray-500">
              <div className="col-span-1">Başlık</div>
              <div className="col-span-1">Slug</div>
              <div className="col-span-1">Durum</div>
              <div className="col-span-1">Tarih</div>
              <div className="col-span-1 text-right">İşlemler</div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <div className="sm:col-span-1">
                    <div className="sm:hidden font-medium text-gray-500 mb-1">Başlık:</div>
                    <div className="break-words">{article.title}</div>
                  </div>
                  <div className="sm:col-span-1">
                    <div className="sm:hidden font-medium text-gray-500 mb-1">Slug:</div>
                    <div className="break-words">{article.slug}</div>
                  </div>
                  <div className="sm:col-span-1">
                    <div className="sm:hidden font-medium text-gray-500 mb-1">Durum:</div>
                    <button
                      onClick={() => handlePublishToggle(article, 'articles')}
                      className={`px-2 py-1 text-sm rounded ${article.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {article.published ? 'Yayında' : 'Taslak'}
                    </button>
                  </div>
                  <div className="sm:col-span-1">
                    <div className="sm:hidden font-medium text-gray-500 mb-1">Tarih:</div>
                    {new Date(article.created_at).toLocaleDateString('tr-TR')}
                  </div>
                  <div className="sm:col-span-1 flex sm:justify-end space-x-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => router.push(`/admin/dashboard/edit/${article.id}?type=articles`)}
                      className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(article.id, 'articles')}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <div className="hidden sm:grid sm:grid-cols-5 gap-4 px-4 py-3 text-sm font-medium text-gray-500">
              <div className="col-span-1">Başlık</div>
              <div className="col-span-1">Slug</div>
              <div className="col-span-1">Durum</div>
              <div className="col-span-1">Tarih</div>
              <div className="col-span-1 text-right">İşlemler</div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <div className="sm:col-span-1">
                    <div className="sm:hidden font-medium text-gray-500 mb-1">Başlık:</div>
                    <div className="break-words">{item.title}</div>
                  </div>
                  <div className="sm:col-span-1">
                    <div className="sm:hidden font-medium text-gray-500 mb-1">Slug:</div>
                    <div className="break-words">{item.slug}</div>
                  </div>
                  <div className="sm:col-span-1">
                    <div className="sm:hidden font-medium text-gray-500 mb-1">Durum:</div>
                    <button
                      onClick={() => handlePublishToggle(item, 'portfolio')}
                      className={`px-2 py-1 text-sm rounded ${item.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {item.published ? 'Yayında' : 'Taslak'}
                    </button>
                  </div>
                  <div className="sm:col-span-1">
                    <div className="sm:hidden font-medium text-gray-500 mb-1">Tarih:</div>
                    {new Date(item.created_at).toLocaleDateString('tr-TR')}
                  </div>
                  <div className="sm:col-span-1 flex sm:justify-end space-x-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => router.push(`/admin/dashboard/edit/${item.id}?type=portfolio`)}
                      className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, 'portfolio')}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'books' && (
          <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <div className="hidden sm:grid sm:grid-cols-4 gap-4 px-4 py-3 text-sm font-medium text-gray-500">
              <div className="col-span-1">Kitap Adı</div>
              <div className="col-span-1">Yazar</div>
              <div className="col-span-1">Tarih</div>
              <div className="col-span-1 text-right">İşlemler</div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <div className="sm:col-span-1">
                    <div className="sm:hidden font-medium text-gray-500 mb-1">Kitap Adı:</div>
                    <div className="break-words">{book.title}</div>
                  </div>
                  <div className="sm:col-span-1">
                    <div className="sm:hidden font-medium text-gray-500 mb-1">Yazar:</div>
                    <div className="break-words">{book.author}</div>
                  </div>
                  <div className="sm:col-span-1">
                    <div className="sm:hidden font-medium text-gray-500 mb-1">Tarih:</div>
                    {new Date(book.created_at).toLocaleDateString('tr-TR')}
                  </div>
                  <div className="sm:col-span-1 flex sm:justify-end space-x-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => router.push(`/admin/dashboard/edit-book?id=${book.id}`)}
                      className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(book.id, 'books')}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
