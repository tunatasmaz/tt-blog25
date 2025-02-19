'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'

interface Portfolio {
  id: string
  title: string
  description: string
  cover_image?: string
  gallery_images?: string[]
  video_url?: string
  published: boolean
  created_at: string
}

export default function PortfolioPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkSession = async () => {
      const { session } = await getSession()
      if (!session) {
        router.push('/admin/login')
        return
      }

      loadProjects()
    }

    checkSession()
  }, [router])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setProjects(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id)

      if (error) throw error

      setProjects(projects.filter(project => project.id !== id))
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6 px-4">
        <h1 className="text-2xl font-bold">Portfolio Projeleri</h1>
        <Link
          href="/admin/portfolio/new"
          className="px-4 py-2 text-sm text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Yeni Proje
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 p-4 mb-6 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {project.cover_image && (
              <div className="aspect-video relative">
                <Image
                  src={project.cover_image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {project.title}
                </h2>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.published
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {project.published ? 'Yayında' : 'Taslak'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>

              {project.gallery_images && project.gallery_images.length > 0 && (
                <div className="mb-4">
                  <div className="grid grid-cols-3 gap-2">
                    {project.gallery_images.slice(0, 3).map((image, index) => (
                      <div key={index} className="aspect-video relative rounded overflow-hidden">
                        <Image
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <Link
                  href={`/admin/dashboard/edit-portfolio/${project.id}`}
                  className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Düzenle
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
            Henüz hiç proje eklenmemiş.
          </div>
        )}
      </div>
    </div>
  )
}
