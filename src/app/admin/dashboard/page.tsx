'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, signOut } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { Article } from '@/types'

export default function DashboardPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { session } = await getSession()
      if (!session) {
        router.push('/admin/login')
      } else {
        loadArticles()
      }
    }
    checkSession()
  }, [router])

  const loadArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading articles:', error)
    } else {
      setArticles(data || [])
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu makaleyi silmek istediğinize emin misiniz?')) {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting article:', error)
      } else {
        loadArticles()
      }
    }
  }

  const handlePublishToggle = async (article: Article) => {
    const { error } = await supabase
      .from('articles')
      .update({ published: !article.published })
      .eq('id', article.id)

    if (error) {
      console.error('Error updating article:', error)
    } else {
      loadArticles()
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
          <button
            onClick={() => router.push('/admin/dashboard/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Yeni Makale
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="px-6 py-3 text-left">Başlık</th>
              <th className="px-6 py-3 text-left">Durum</th>
              <th className="px-6 py-3 text-left">Tarih</th>
              <th className="px-6 py-3 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b dark:border-gray-700">
                <td className="px-6 py-4">{article.title}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      article.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {article.published ? 'Yayında' : 'Taslak'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(article.created_at).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handlePublishToggle(article)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {article.published ? 'Taslağa Al' : 'Yayınla'}
                  </button>
                  <button
                    onClick={() => router.push(`/admin/dashboard/edit/${article.id}`)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
